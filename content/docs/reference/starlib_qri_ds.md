---
title: "Starlark: qri & ds modules"
description: "descriptions of built-in modules and special objects in qri starlark"
date: 2018-12-20T00:00:00-04:00
section: reference
---

### qri and dataset modules
In Qri's starlark there are three "nonstandard" modules specific to qri. These modules are _not_ considered part of the standard library project, and are defined in a [different repository](https://github.com/qri-io/qri/tree/master/startf). They're described here to keep documentation complete:

* [qri](#qri_module)
* [ctx / context](#context_object)
* [ds / dataset](#dataset_object)

In addition, there are some special built-in functions.

* [built-ins](#builtins)

** **

<a id="qri_module"></a>

## qri module

_access this method from the `qri` module, eg `qri.list_datasets()`_

  * [list_datasets](#list_datasets)

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
```

** **

<a id="dataset_object"></a>
## context object - ctx
  _you can access these methods from the `context` object. A context object gets passed into the `transform` and `download` functions, and by convention is named `ctx`_

* [get_config](#get_config)
* [get_secret](#get_secret)  

<a id="get_config"></a>
#### get_config 
`ctx.get_config(key)`

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

Example usage:

<!--
docrun:
  test:
    call: transform(ds, ctx)
    actual: ds.get_body()
    expect: value
# TODO(dlong): Currently failing. Need to save the above dataset.yaml, then pass it to this script.
-->
```python
def transform(ds, ctx):
  ds.set_body([ctx.get_config("key")])
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

** **

<a id="dataset_object"></a>
## dataset object - ds
  _you can access these methods from the `dataset` object. A dataset object gets passed into the `transform` function, and by convention is named `ds`_

* [set_meta](#set_meta)
* [set_structure](#set_structure)
* [get_body](#get_body)
* [set_body](#set_body)  

** **

## Function Definitions:

<a id="get_body"></a>
#### get_body 
`ds.get_body()`

  returns the body of the previous version of the dataset as a list or dictionary

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
    expect: [["cat", 4.0], ["bird", 2.0], ["snake", 0.0]]
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
  structure = {
    "format": "json",
    "schema": schema
  }

  ds.set_structure(structure)
  ds.set_body([
    ["cat", 4],
    ["bird", 2],
    ["snake", 0]
  ])
  return ds
```

** **

<a id="dataset_object"></a>
## built-ins


* [load_dataset](#load_dataset_function)
* [error](#error_function)

** **

## Function Definitions:

<a id="load_dataset_function"></a>
#### load_dataset
`load_dataset(ref)`

  Loads a dataset from your repo or the distributed web using a reference string. Returns it as a [dataset](#dataset_object) object.

<a id="error_function"></a>
#### error
`error("message")`

  Halts program execution with an error

