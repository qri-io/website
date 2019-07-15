---
title: "Starlark Language"
description: "starlark transformations"
date: 2018-01-30T00:00:00-04:00
---

# Starlark Syntax
Qri ("query") is about datasets. Transformations are repeatable scripts for generating a dataset. [Starlark](https://github.com/google/skylark/blob/master/doc/spec.md) is a scripting language from Google that feels a lot like python. This package implements skylark as a _transformation syntax_. Starlark transformations are about as close as one can get to the full power of a programming language as a transformation syntax. Often you need this degree of control to generate a dataset.

Typical examples of a starlark transformation include:

* combining paginated calls to an API into a single dataset
* downloading unstructured structured data from the internet to extract
* re-shaping raw input data before saving a dataset

### Differences from Python

**No While Loops**

**No Recursion**

**Set Variables Once**

**Can be run in parallel**

** **

### Starlark In Qri:

Starlark transformations have a few rules on top of skylark itself:

* Qri functions *always* get and return a dataset
* When you define a Qri function, qri calls it for you
* All transform functions are optional (you don't _need_ to define them), _but_
* A transformation must have at least one Qri function
* Qri functions are always called in the same order

** **

### Transform Functions

So far there are two predefined Qri functions, with more planned for future use:

* download
* transform

#### def download(ds):
  Download is the only function in which you can make an http request or get an http response, or download a xlsx file, aka the only place in a transform where you can get data from a website or server. You must then manipulate the response to get some structured data, which can be set as the body.

  The download function is always run before the transform function.

  The transform function will receive the dataset returned from the download function.


#### def transform(ds):
  The transform function can pull from a body file and config file, as well as set the metadata or schema of a dataset. It can also has access to the dataset returned from a download function.

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
  scriptpath: transform.sky
  config:
    name: Joe
    number: 5556578909
```

In your transform script, you can get the name and number by loading the `qri.sky` module and using the `get_config` function:

<!--
docrun:
  test:
    call: transform(ds, ctx)
-->
```python
load("qri.star", "qri")

def transform(ds, ctx):
  name = ctx.get_config("name")
  # casting number to an int just in case it was mistaken
  # for a string
  number = int(ctx.get_config("number") or 0)
  return ds
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
  scriptpath: transform.sky
  secrets:
    api_key: SOME-PRIVATE-KEY-HERE
```

To get that secret, load the `qri` module and use the `get_secret` method:

<!--
docrun:
  test:
    call: transform(ds, ctx)
-->
```python
load("qri.star", "qri")

def transform(ds, ctx):
  api_key = ctx.get_secret("api_key")
  # do something here to add to the dataset body
  return ds
```

** **

For information on the different modules of our starlark standard library, checkout our [starlib reference page](/docs/reference/starlib).
