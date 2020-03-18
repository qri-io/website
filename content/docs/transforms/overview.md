---
metaTitle: Transforms Overview
metaDescription: Qri uses a python-like syntax to bind code to datasets, allowing for automated updates from external sources or other datasets.
weight: 1
---

import InfoBlock from '../../../src/components/InfoBlock.js'

The __transform__ component binds code to a dataset. A transform _script_ is executed whenever a dataset version is saved with a transform specified, before persisting the dataset itself. Transform scripts by default only execute once, "on the way in". The script itself is embedded within the dataset version it's saved with, and is versioned along with all of the other [components](http://localhost:8000/docs/dataset-components/overview) of the dataset.

<InfoBlock>
  This documentation is for qri CLI (command line) only. Composing Transform scripts on Desktop is a work in progress.
</InfoBlock>

The __transform__ component binds code to a dataset. A transform _script_ is executed whenever a dataset version is saved with a transform is specified, before persisting the dataset itself. Transform scripts by default only execute once, "on the way in". The script itself is embedded within the dataset version it's saved with.

Qri executes transforms in a sandbox, with no access to the local filesystem and staged internet access. The Qri sandbox is intended to make scripts portable. In Qri you can fetch a dataset that someone else has written a transform for, and _recall_ that script, re-execute the transform to produce new dataset versions.

Scripts are written in [_starlark_](https://github.com/bazelbuild/starlark/blob/master/spec.md), which is a dialect of Python 3 with a number of features removed.

A transform script *must* define a function called `transform`. Qri will call this function as the "main function" of a script. Here's an example of a transform script that does nothing:

```python

def transform(ds,ctx):

```

the two _arguments_ to transform are `ds`: a dataset object and `ctx`: a transformation context.

## Dataset Argument `ds`

The dataset argument represents the _latest saved version_ of the dataset this script is running on. Any modifications to the `ds` are saved in the version that's being created.

Here's an example of a transform that sets the dataset's `title` in the `meta` component:

```python

def transform(ds, ctx):
  ds.set_meta("title", "My Great Dataset")
```

There are many other methods available for mutating a dataset (most transforms will call `ds.set_body` to update the body). For more details check the [starlark dataset package docs](./dataset) or the [transform examples docs page](http://localhost:8000/docs/transforms/examples).

## Context Argument `ctx`

The _context_ argument provides additional data a script can use in execution. A classic example are _secrets_, things like API keys. You can provide secrets to a save command like this:


```
qri save --file transform.star --secrets random_word,apples
```

<InfoBlock type='warning'>
  Providing secrets to a script is always a risk. Qri will warn you whenever you provide a secret to a transform.
</InfoBlock>

To get the secrets provided to a dataset, we use the context argument:

```python
def transform(ds, ctx):
  seed = ctx.get_secret("random_word")
```

Context can also be used for other things, like getting the results of a download function.


## Accessing the Web in a Transform script (HTTP access)

Transform scripts can also access the web. This allows you to create transforms that scrape websites or consume JSON or XML APIs. To call a url, we need to define the `download` function. Here's an example:

```python
# load the http.star package available as 'http' in our transform script
load("http.star", "http")

# download runs before transform(), and its return value becomes ctx.download
def download(ctx):
  res = http.get("https://example.com/asset.json")
  return res.json()

def transform(ds, ctx):
  # set the dataset's body to the json we got from the web
  ds.set_body(ctx.download)
```

If our script defines a `download` function, **qri will call `download` before `transform` and set the return value of `download` to `ctx.download`**. The above script passes the results of the download function directly to `ds.set_body()`, setting the body of the dataset to the result of the HTTP JSON response.

The only place where a script has open access to the internet is within the `download` function. The download function deliberately does not grant access to local datasets.

<InfoBlock>
  This Transform also loads the `http` package. For more info on the `http` module check the <a href='./starlib'>starlib docs</a>.
</InfoBlock>


## Blending Manual Edits & Transform Scripts

Qri is perfectly fine to include both manual manipulations and scripted edits in the same commit, with one caveat: **manual edits and transform scripts can't change the same field**. If you try to edit the title of a dataset, and write a script that _also_ tries to edit the title, Qri will yell at you.

We do this to preserve a meaningful audit trail. If Qri allowed both types of edits in the same commit, there would be no way to know how any edit was generated, which would weaken the provenance provided by scripted transforms. Transform scripts document in exacting detail how a dataset changed over time. By requiring mutually exclusive transforms within a commit transaction, Qri can provide stronger auditability for datasets that use transforms.
