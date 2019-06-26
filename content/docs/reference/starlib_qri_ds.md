---
title: "Starlark: qri & ds modules"
description: "list of all the functions and modules in starlark standard library"
date: 2018-12-20T00:00:00-04:00
section: reference
---

### qri and dataset modules
In Qri two "nonstandard" modules specific to qri are available. these modules are _not_ considered part of the standard library project, and are defined in a [different repository](https://github.com/qri-io/startf). They're described here to keep documentation complete:

* [qri](#qri_module)
* [ds or dataset](#dataset_object)

** **

<a id="qri_module"></a>
## qri module

_access these methods from the `qri` module, eg `qri.get_config()`_

  * [get_config](#get_config)
  * [get_secret](#get_secret)
  * [list_datasets](#list_datasets)
  * [load_dataset_body](#load_dataset_body)
  * [load_dataset_head](#load_dataset_head)

To load:

<!--
docrun:
  test:
-->
```python
load("qri.star", "qri")
```

** **

## Function Definitions:

<a id="get_config"></a>
#### get_config 
`qri.get_config(key)`

  returns the value of a config variable, declared in the dataset file:

<!--
docrun:
  filltype: dataset.Dataset
-->
```yaml
# in the dataset.yaml file:
transform:
  scriptpath: transform.star
  config:
    key: value
```

<a id="get_secret"></a>
#### get_secret 
`qri.get_secret(key)`

  returns the value of a secrets variable, declared in the dataset file:

<!--
docrun:
  filltype: dataset.Dataset
-->
```yaml
# in the dataset.yaml file:
transform:
  scriptpath: transform.star
  secrets:
    key: value
```

<a id="list_datasets"></a>
#### list_datasets
`qri.list_datasets()`

  returns list of datasets references available on your qri node

<!--
docrun:
  test:
    call: transform(ds, ctx)
    actual: ds.get_body()
    expect: ["test/ds_1@QmExample/ipfs/QmExample", "test/ds_2@QmSample/ipfs/QmSample"]
-->
```python
load("qri.star", "qri")

def transform(ds,ctx):
  datasets = qri.list_datasets()
  #
  # prints a list of string dataset references
  print(datasets) 
  #
  # create a dataset that contains a list of your datasets:
  ds.set_body(datasets)
  return ds
```

<a id="load_dataset_body"></a>
#### load_dataset_body
`qri.load_dataset_body(dataset_referece)`

  returns the body of the specified dataset as a list or dictionary. [Read more about dataset references](/docs/concepts/names)

<!--
docrun:
  pass: true
# TODO(dlong): Fix me
-->
```python
load("qri.star", "qri")

def transform(ds,ctx):
  # let's say there is a dataset named "2017_billboard_top_100" and a dataset named "2018_billboard_top_100"
  # let's create a dataset of the artists that are on both lists:
  billboard_2017 = qri.load_dataset_body("me/2017_billboard_top_100")
  billboard_2018 = qri.load_dataset_body("me/2018_billboard_top_100")
  #
  artists = []
  for i in range(0, len(billboard_2017)):
    artist = billboard_2017[i]['artist']
    #
    # if we've already encountered this artist,
    # move on to the next one
    if artist in artists:
      continue
    #
    # iterate through billboard_2018, if this artist
    # appears there, add it to the list of artists
    # and break out of the for loop
    for j in range(0, len(billboard_2018)):
      if artist == billboard_2018[j]['artist']:
        artists.append(artist)
        break
  #
  # ensure the list is unique
  artists = list(set(artists))
  ds.set_Body(artists)
  return ds
```

<a id="load_dataset_head"></a>
#### load_dataset_head
`qri.load_dataset_head()`

  loads all the parts of the dataset, except for the body, as a dictionary with all or some of these keys: `meta`, `structure`, `commit`, `transform`, `viz`. If the dataset does not contain a transform, for example, then the dataset head dictionary will not contain a `transform` field.

<!--
docrun:
  test:
    call: transform(ds, ctx)
    actual: ds.get_body()
    expect: {"title":"", "description":"", "format":""}
-->
```python
load("qri.star", "qri")

def transform(ds, ctx):
  # let's say you want to create a dataset that contains some
  # descriptive elements of a previous dataset
  # in this case, the meta, the description, and the format
  head = qri.load_dataset_head("me/previous_dataset")
  #
  title = ""
  description = ""
  format = ""
  #
  if "meta" in head:
    if "title" in head["meta"]:
      title = head["meta"]["title"]
    if "description" in head["meta"]:
      description = head["meta"]["description"]
  #
  if "structure" in head:
    if "format" in head["structure"]:
      format = head["structure"]["format"]
  #
  ds.set_body({"title":title, "description": description, "format": format})
  return ds
```

** **

<a id="dataset_object"></a>
## dataset object - ds
  _you can access these methods from the `dataset` object. A dataset object gets passed into and returned from the `transform` and `download` functions, usually referred to as `ds`_

* [set_meta](#set_meta)
* [set_schema](#set_schema)
* [get_body](#get_body)
* [set_body](#set_body)  

** **

## Function Definitions:

<a id="get_body"></a>
#### get_body 
`ds.get_body()`

  returns the body of the current dataset as a list or dictionary

<a id="set_body"></a>
#### set_body 
`ds.set_body(body, raw)`

`body` should usually be a list or a dictionary. `raw` is a boolean value. If true, it expects `body` to be a string and will store the body as byte data. Returns `None`.

<a id="set_meta"></a>
#### set_meta 
`ds.set_meta(field, value)`

  Sets a specific field of the meta to the value. `field` and `value` are both strings. Returns `None`.

<!--
docrun:
  test:
    call: transform(ds, ctx)
    actual: ds.get_meta()
    expect: {"qri": "md:0", "title": "Reference Transform"}
-->
```python
def transform(ds,ctx):
  ds.set_meta("title", "Reference Transform")
  return ds
```

<a id="set_schema"></a>
#### set_schema 
`ds.set_schema(value)`

`value` is a dictionary written as a [json schema](https://json-schema.org/). Returns `None`

<!--
docrun:
  test:
    call: transform(ds, ctx)
    actual: ds.get_body()
    expect: [["cat", 4], ["bird", 2], ["snake", 0]]
-->
```python
def transform(ds,ctx):
  schema = {
    "type": "array",
    "items": {
      "type": "array",
      "items": [{
          "description": "type of animal",
          "title": "Animal",
          "type": "string"
        }, {
          "description": "number of legs this animal has",
          "title": "Number of Legs",
          "type": "integer"
        }
      ]
    }
  }

  ds.set_schema(schema)
  ds.set_body([
    ["cat", 4],
    ["bird", 2],
    ["snake", 0]
  ])
  return ds
```
