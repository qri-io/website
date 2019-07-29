---
title: "Starlark Language"
description: "starlark transformations"
date: 2018-01-30T00:00:00-04:00
---

# Starlark Syntax
Qri ("query") is about datasets. Transformations are runnable scripts for generating datasets. [Starlark](https://github.com/bazelbuild/starlark/blob/master/spec.md) is a scripting language from Google that is mostly a subset of python. This package implements skylark as a _transformation syntax_. Starlark transformations are about as close as one can get to the full power of a programming language for generating datasets.

Typical examples of a starlark transformation include:

* combining paginated calls to an API into a single dataset
* downloading unstructured structured data from the internet to extract
* re-shaping raw input data before saving a dataset

### Differences from Python

**No While Loops**

**No Recursion**

**Variables are frozen after mutation**

**Can be run in parallel**

**Strings are not iterable**

There are more, see https://docs.bazel.build/versions/0.23.0/skylark/language.html and https://github.com/google/skylark/blob/master/doc/spec.md

** **

### Starlark In Qri:

Qri transformations have a few rules on top of starlark itself:

* Qri defines special functions that act as entry points to the script. Qri will call them, your script does not need to
* These functions always receive a context
* The return value of these functions is available as part of the context passed to future functions
* Special functions are always called in the same order

** **

### Special Functions

So far there are two predefined Qri functions, with more planned for future use:

* download
* transform

#### def download(ctx):
  Download is the only function in which you can make an http request or get an http response, or download a xlsx file, aka the only place in a transform where you can get data from a website or server. You must then manipulate the response to get some structured data, which can then be returned.

  The download function is always run before the transform function.

  The transform function will receive the dataset returned from the download function as part of its context.


#### def transform(ds, ctx):
  The transform function receives the dataset as its previous version, if one exists. 
  
  The transform function can pull from the previous dataset and config file, as well as set the metadata or schema of the dataset. It can also has access to the value returned from a download function as part of the context.

** **

### Transform Configuration

You can inject variables into the transform through the transform config section in the dataset file. For example:

<!--
docrun:
  filltype: dataset.Dataset
-->
```yaml
# dataset.yaml file
transform:
  scriptpath: transform.star
  config:
    name: Joe
    number: 5556578909
```

In your transform script, you can get the name and number by using the context:

<!--
docrun:
  test:
    call: transform(ds, ctx)
# TODO(dlong): Save the above dataset.yaml and pass it to this transform
-->
```python
load("qri.star", "qri")

def transform(ds, ctx):
  name = ctx.get_config("name")
  number = ctx.get_config("number")
  ds.set_body({"name": name, "number": number})
```

** **

### Transform Secrets

Sometimes you need special keys or information that you want to exist in your transform, but you don't want anyone else to see or have access to. This is where transform secrets come in. You can add a private api key, for example, and not be worried that when another use looks at your dataset, that they will have access to your secret key.

You add secrets much in the same why that you add config variables.

<!--
docrun:
  filltype: dataset.Dataset
-->
```yaml
# in dataset.yaml file
transform:
  scriptpath: transform.star
  secrets:
    api_key: SOME-PRIVATE-KEY-HERE
```

To get that secret, use the context:

<!--
docrun:
  test:
    call: download(ctx)
-->
```python
def download(ctx):
  api_key = ctx.get_secret("api_key")
  # do something here to fetch from a server
  return {"webserver": "result"}
```

** **

For information on the different modules of our starlark standard library, checkout our [starlib reference page](/docs/reference/starlib).
