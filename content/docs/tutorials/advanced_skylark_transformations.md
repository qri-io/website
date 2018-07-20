---
title: "Skylark Transformations"
date: 2018-01-30T00:00:00-04:00
section: tutorials
draft: true
---

Qri ("query") is about datasets. A _transformion_ is a repeatable script for generating a dataset. [Skylark](https://github.com/google/skylark/blob/master/doc/spec.md) is a scripting langauge from Google that feels a lot like python. This package implements skylark as a _transformation syntax_. Skylark tranformations are about as close as one can get to the full power of a programming language as a transformation syntax. Often you need this degree of control to generate a dataset.

Typical examples of a skylark transformation include:
* combining paginated calls to an API into a single dataset
* downloading unstructured structured data from the internet to extract
* re-shaping raw input data before saving a dataset

We're excited about skylark for a few reasons:
* **python syntax** - _many_ people working in data science these days write python, we like that, skylark likes that. dope.
* **deterministic subset of python** - unlike python, skylark removes properties that reduce introspection into code behaviour. things like `while` loops and recursive functions are ommitted, making it possible for qri to infer how a given transformation will behave.
* **parallel execution** - thanks to this deterministic requirement (and lack of global interpreter lock) skylark functions can be executed in parallel. Combined with peer-2-peer networking, we're hoping to advance tranformations toward peer-driven distribed computing. More on that in the coming months.

## 1.0: Writing Skylark Transformations

To write our first transformation we're going to need two files. The first is a `dataset.yaml` file that will define our dataset, the second `transform.sky` file will hold our skylark transformation code. Both files should be in the same folder.

Save this in `dataset.yaml`:
```yaml
name: hello_world

meta:
  title: hello world example

transform:
  scriptpath: transform.sky
```

Save this in `transform.sky`:
```python
def transform(qri):
  return(["hello","world"])
```

From a terminal, navigate to the directory that contains these files, and run the transformation:
```shell
$ cd /wherever/you/saved/those/files

# add this dataset to qri
$ qri add --file=dataset.yaml
```

If everything goes according to plan, qri will see that you've specified a transformation, run it, and save the result as a dataset. We can examine our dataset with the `info` and `data` commands:
```shell
# show dataset info. the title "hello world example" comes from the meta we set in our dataset.yaml:
$ qri info me/hello_world
# result will look something like:
# 0  b5/hello_world
#    /ipfs/Qmbx59VBd9joyP4oLmqPAmL3HGQKeQ2pejXtHRnLQ3N5Za
#    hello world example
#    17 bytes, 2 entries, 0 errors

# show the body of our dataset, created by transform.sky:
$ qri data me/hello_world
# ["hello", "world"]

# skip the first entry of the body:
$ qri data -s 1 me/hello_world
# ["world"]
```

The output of `qri info me/hello_world` will look slightly different for you. My peername is "b5", instead of `b5/hello_world`, you'll see your own username followed by `/hello_world`. Also that `/ipfs/Qmbx59VBd9joyP4oLmqPAmL3HGQKeQ2pejXtHRnLQ3N5Za` bit will have different characters, and that's a good thing! For more info on those characters & what they mean, it's worth reading about content-addressing. But for now let's keep going.

Let's dig in on that `transform.sky` file a bit:
```python
def transform(qri):
  return(["hello","world"])
```
Here we've defined single function: `transform`, it takes an _argument_ named `qri` (we haven't actually _used_ this argument, but that's ok), and returns a set of two strings, `"hello"`, and `"world"`. The name "transform" is special. `transform` is an example of a _data function_. Data functions are special functions that qri recognizes, `transform` is one, and we'll introduce you to another data function later on. Data functions have a few things in common:

* Data functions *always* return data
* When you define a data function, qri calls it for you
* All tranform functions are optional (you don't _need_ to define them), _but_
* A transformation must have at least one data function
* Data functions are always called in the same order
* Data functions often get a `qri` parameter that lets them do special things

When we ran `qri add` from the terminal qri opened this file, saw that we defined a `transform` function and called it, passing in the `qri` argument for us to play with. We ignored the qri arugment entirely (that's ok, the `qri` arugment doesn't have feelings). The one thing we actually did was return data. In this case: `["hello", "world"]`.

### 1.1 Using the qri argument to set Metadata
Let's use the qri argument to do something interesting by adding a line to our `transform.sky` that sets dataset metadata for us:
```python
def transform(qri):
  qri.set_meta("description", "this is an example dataset to learn about transformations")
  return(["hello","world"])
```

Save `transform.sky`, and let's update our dataset. From the same directory in a terminal run:
```shell
# update our dataset:
$ qri update --file=dataset.yaml
# dataset saved: b5/hello_world@QmSyDX5LYTiwQi861F5NAwdHrrnd1iRGsoEvCyzQMUyZ4W/ipfs/QmScVmhSBkYN99Esh9UE1X6D81QQV6Cg5LQ6WKyr1t38J4

# see our new description:
$ qri info me/hello_world
# 0  b5/hello_world
#     /ipfs/QmScVmhSBkYN99Esh9UE1X6D81QQV6Cg5LQ6WKyr1t38J4
#     hello world example
#     this is an example dataset to learn about transformations
#     17 bytes, 2 entries, 0 errors
```

It's worth noting that the first version of your dataset & transform weren't lost. We can see the history of this dataset with `qri log`:
```shell
$ qri log me/hello_world
# Jun  8 14:20:35 - /ipfs/QmScVmhSBkYN99Esh9UE1X6D81QQV6Cg5LQ6WKyr1t38J4
#   Transform: 1 change
# Jun  8 12:51:09 - /ipfs/Qmbx59VBd9joyP4oLmqPAmL3HGQKeQ2pejXtHRnLQ3N5Za
#   created dataset
```

### 1.2 Dataset files override transform settings
While we're here, we might as well point out a potential gotcha, let's add a second call to `qri.set_meta` that sets title:
```python
# this is an example skylark transformation

def transform(qri):
  qri.set_meta("title", "I'm a title set by a transformation!")
  qri.set_meta("description", "this is an example dataset")
  return(["hello","world"])
```

Save that file, and let's update:
```shell
# add this dataset to qri
$ qri update --file=dataset.yaml

# add this dataset to qri
$ qri info me/hello_world
# 0  b5/hello_world
#     /ipfs/Qmb6GVSrNz2jyYjDaCEJJxN5tXUKMC255SX1gGK12kb8FT
#     hello world example
#     this is an example dataset to learn about transformations
#     17 bytes, 2 entries, 0 errors
```

In our transform we called `qri.set_meta("title", ...)`, but the title hasn't changed, what gives? That's because we have _also_ set the `title` in our `dataset.yaml` file. The thing to remember is **Settings in a dataset file override tranformations**. This helps make transformation scripts more flexible. If later on you re-run this transform but wanted to change the title of the dataset, you can do so without digging into the tranform code. This starts to make more sense when transform scripts get a little more complicated. Speaking of complicated, let's move on to a new transformation to do something a little more interesting.

#### 1.3 Deleting a Dataset

Before we go, you may want to delete this tutorial data. Then again, maybe you'd like a copy of the data outside of qri for reference. Or, maybe you don't care. Who knows? You know. That's who. _Anyway_, if you'd like to export the full dataset that qri created feel free to run:
```shell
$ qri export me/hello_world
```

Then you can delete your data from qri for good with:
```shell
$ qri delete me/hello_world
```


### 2.0 Transforms on input data
So far our transformation just produces `["hello", "world"]`, which isn't really that interesting. Let's write a transformation that accepts outside data. First, we're going to need some outside data. 

Let's start fresh create a new directory `continent_populations`. The name of the directory doesn't matter, but, you know, labeling things properly is a bit of a theme here. We're going to be creating three files:
```
continent_populations
├── continent_populations.csv
├── dataset.yaml
└── transform.sky
```

First, create a comma-separated values file, `continent_populations.csv`:
```
continent,population
Asia,4436224000
Africa,1216130000
Europe,738849000
North America,579024000
South America,422535000
Oceania,39901000
Antartica,1106
```

Let's also create our dataset file `dataset.yaml`:
```yaml
name: continent_populations

meta:
  title: 2018 Populations of World Continents
  citations:
    url: https://en.wikipedia.org/wiki/List_of_continents_by_population

transform:
  scriptpath: transform.sky

body: continent_populations.sky
```

Finally, create a new `transform.sky` file:
```python
# this is an example skylark transformation that adds the percentage

def transform(qri):
  qri.structure.set_schema(schema)
  data = qri.get_body()
  return qri.add_average(data)

# total_population sums the second column
def total_population(data):
  total = 0
  for item in data:
    total += item[1]
  return total

def add_average(data):
  total = total_population(data)
  for item in data:
    pct = (item[1] / total) * 100
    item.append(pct)
  return data

schema = {
  "type": "array",
  "items": {
    "type": "array",
    "items": [
      {"name": "continent", "type": "string"},
      {"name": "population", "type": "integer"},
      {"name": "percent", "type": "number"}
    ]
  }
}
```

Then let's add it to qri:
```shell
$ qri add --file=dataset.yaml
```


### 3.0 Getting data from the web
Transforms on input data are great, but
* less auditable
* 

```python

```

### 4.0 Building Datasets from other datasets

