---
title: "Skylark Transformations"
description: ""
date: 2018-01-30T00:00:00-04:00
section: tutorials
---

# Skylark Transformations

Qri ("query") is about datasets. A _transformation_ is a repeatable script for generating a dataset. [Starlark](https://github.com/google/skylark/blob/master/doc/spec.md), formerly "Skylark",  is a scripting language from Google that feels a lot like python. This package implements skylark as a _transformation syntax_. Skylark transformations are about as close as one can get to the full power of a programming language as a transformation syntax. Often you need this degree of control to generate a dataset.

Typical examples of a skylark transformation include:

* combining paginated calls to an API into a single dataset
* downloading unstructured structured data from the internet to extract
* re-shaping raw input data before saving a dataset

We're excited about skylark for a few reasons:
* **python syntax** - _many_ people working in data science these days write python, we like that, skylark likes that. dope.
* **deterministic subset of python** - unlike python, skylark removes properties that reduce introspection into code behaviour. things like `while` loops and recursive functions are omitted, making it possible for qri to infer how a given transformation will behave.
* **parallel execution** - thanks to this deterministic requirement (and lack of global interpreter lock) skylark functions can be executed in parallel. Combined with peer-2-peer networking, we're hoping to advance transformations toward peer-driven distributed computing. More on that in the coming months.

# Table of Contents

#### Quick start and the Transform Function
* [1.0 - Hello World](#hello_world) 
* [1.1 - Set the meta](#meta)
* [1.2 - Dataset Files and Transform Settings](#dataset_files)
* [1.3 - Deleting and Exporting Datasets](#delete_export)

#### Download Function, Config, Modules
* [2.0 - Download function](#download)
* [2.1 - Config and Secrets](#config)
* [2.2 - Modules and `qri`](#modules)
* [2.3 - http](#http)
* [2.4 - html](#html)

<a id="hello_world"></a>
## 1.0 '["Hello","World"]'

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
def transform(ds):
  ds.set_body(["hello","world"])
  return ds
```

From a terminal, navigate to the directory that contains these files, and run the transformation:
```bash
# navigate to where you've saved dataset.yaml and transform.sky
$ cd /wherever/you/saved/those/files

# add this dataset to qri
$ qri new --file=dataset.yaml
```

The output of `qri info me/hello_world` will look slightly different for you. My peername is "b5", instead of `b5/hello_world`, you'll see your own username followed by `/hello_world`. Also that `/ipfs/Qmbx59VBd9joyP4oLmqPAmL3HGQKeQ2pejXtHRnLQ3N5Za` bit will have different characters, and that's a good thing! For more info on those characters & what they mean, it's worth reading about content-addressing. But for now let's keep going.

Let's dig in on that `transform.sky` file a bit:
```python
def transform(ds):
  ds.set_body(["hello","world"])
  return ds
```

Here we've defined single function: `transform`, it takes an _argument_ named `ds` (which stands for 'dataset'), it sets the body of dataset `ds` to equal a list of two strings, `"hello"`, and `"world"`, and it returns the dataset `ds`. The name "transform" is special. `transform` is an example of a _qri function_. Qri functions are special functions that qri recognizes, `transform` is one, and we'll introduce you to another qri function later on. Qri functions have a few things in common:

* Qri functions *always* take and return datasets
* When you define a qri function, qri calls it for you
* All transform functions are optional (you don't _need_ to define them), _but_
* A transformation must have at least one qri function
* Qri functions are always called in the same order

When we ran `qri new` from the terminal qri opened this file, saw that we defined a `transform` function and called it, passing in a new dataset argument for us to play with. We must also return a dataset. The one thing we actually did was set the dataset body. In this case: `["hello", "world"]`.
  
<a id="meta"></a>
## 1.1 Using the dataset argument to set Metadata

Let's use the dataset argument to do something interesting by adding a line to our `transform.sky` that sets dataset metadata for us:
```python
def transform(ds):
  ds.set_meta("description", "this is an example dataset to learn about transformations")
  ds.set_body(["hello","world"])
  return ds
```

Save `transform.sky`, and let's update our dataset. From the same directory in a terminal run:
```shell
# update our dataset:
$ qri save --file=dataset.yaml
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

<a id="dataset_files"></a>
## 1.2 Dataset files override transform settings

While we're here, we might as well point out a potential gotcha, let's add a second call to `qri.set_meta` that sets title:
```python
# this is an example skylark transformation

def transform(ds):
  ds.set_meta("title", "I'm a title set by a transformation!")
  ds.set_meta("description", "this is an example dataset")
  ds.set_body(["hello","world"])
  return ds
```

Save that file, and let's update:
```shell
# add this dataset to qri
$ qri save --file=dataset.yaml

# add this dataset to qri
$ qri info me/hello_world
# 0  b5/hello_world
#     /ipfs/Qmb6GVSrNz2jyYjDaCEJJxN5tXUKMC255SX1gGK12kb8FT
#     hello world example
#     this is an example dataset to learn about transformations
#     17 bytes, 2 entries, 0 errors
```

In our transform we called `qri.set_meta("title", ...)`, but the title hasn't changed, what gives? That's because we have _also_ set the `title` in our `dataset.yaml` file. The thing to remember is **Settings in a dataset file override transformations**. This helps make transformation scripts more flexible. If later on you re-run this transform but wanted to change the title of the dataset, you can do so without digging into the transform code. This starts to make more sense when transform scripts get a little more complicated. Speaking of complicated, let's move on to a new transformation to do something a little more interesting.

<a id="delete_export"></a>
## 1.3 Deleting and Exporting a Dataset

Before we go, you may want to delete this tutorial data. Then again, maybe you'd like a copy of the data outside of qri for reference. Or, maybe you don't care. Who knows? You know. That's who. _Anyway_, if you'd like to export the full dataset that qri created feel free to run:
```shell
$ qri export me/hello_world
```

Then you can delete your data from qri for good with:
```shell
$ qri delete me/hello_world
```

<a id="download"></a>
## 2.0 Download function

In this section we are going to talk about the Qri function `download`. The `download` function takes a dataset and returns a datasets, like the `transform` function. Unlike the `transform` function, however, the `download` function is the only place where you have access to the network. This is the only place you can download that api, that json, that website's html.

The `download` function is always run before the `transform` step. The dataset returned from the `download` function, gets passed as the dataset parameter in the `transform` function.

<a id="config"></a>
## 2.1 Config and Secrets

When we came up with the idea of including transforms in Qri, the thing we were most excited about was a transforms ability to be customized for the person running it. In order to have customizability, we needed a way to inject variables into a transform script. For example, if there is a dataset that has a call to the github api, that can pull down the stats from one of my projects, but I want to also use that transform to pull down stats from a second project, one of the variables in my transform would probably be `repo_name`.

Often, when we try to get information from an api, that api requires us to have a special key that is only associated with our identity. It is, also, often  private and should not be shared in the dataset itself or made public in anyway.

This is where the config and secrets comes in. The following comes from a dataset whose purpose is to get data on the last 100 League of Legends matches a specific player (in this case called `summoner`) has played in a specific region (in this case, North America). Let's create a new folder called `lol_last_100_matches`, and a new `dataset.yaml` file within that folder:

```yaml
# lol_last_100_matches/dataset.yaml
name: league_player_matches
meta:
  title: Dataset created using the qri starlark tutorial. Pings the Riot Games (creator of the computer game League of Legends) api, gets a summoner's account id, and then a list of their last 100 matches.
transform:
  scriptpath: transform.sky
  config:
    summoner: sørenbjerg
    region: na1
  secrets:
    api_key: ****************************

```

Note, if you want to run this transform yourself, you will need to head over to the [Riot Games developer website](https://developer.riotgames.com/), and create a login. Then, you can generate your own api key right from your developer dashboard. You will replace the series of ***** in your dataset.yaml file with your own api key.

Okay, so that's how you add a config variable and a secrets variable into the transform, but how do you actually use it in the transform file? That's where the `qri` module comes in.

<a id="modules"></a>
## 2.2 Modules and `qri`

Chances are, if you are trying to do something cool with Qri, you will need more than just the basic functionality we've shown you so far.

You can also import modules from the starlark standard library ([Starlib](https://github.com/qri-io/starlib) we have been working on. [Here](/docs/reference/starlib) is our reference page that details each module and each function within that module.

For now, let's look at the `qri` module. Here is how you load a module into a transform:


```python
# lol_last_100_matches/transform.sky
load("qri.sky", "qri")

def download(ds):
  return ds
```

You might be asking yourself: why do we load the module with the extension `.sky`? Why not `.star`? Well, up until recently, the scripting language was called "Skylark", and not "Starlark", so there are some remnants of that original name still in our library. This is one of those remnants.

Great, now that we've loaded the `qri` module, let's actually use it to get the summoner name, region, and api_key, from the dataset.

```python
load("qri.sky", "qri")

def download(ds):
  summoner = qri.get_config("summoner")
  region = qri.get_config("region")
  api_key = qri.get_secret("api_key")
  print(summoner) # prints "sørenbjerg"
  print(region) # prints "na1"
  print(api_key) # prints the api_key
  return ds

def transform(ds):
  ds.set_body(["need to set a body or the will be an error"])
  return ds
```

Head over to the terminal. Change directories until you are in your `lol_last_100_matches` folder. We are going to use the `--dry-run` flag. This will allow us to see the output of the transform, without actually saving it to our Qri node.

```bash
$ qri new --file dataset.yaml me/lol_last_100_matches --dry-run
```

<a id="http"></a>
## 2.3 http module

Now that we can get config and secrets variables, let's use those to grab some data from an API endpoint using the http package.

The http package can only be used in the `download` function. You do not have access to the network in any the `transform` function. If you try to download something in the `transform` function, you will get an error.

You have access to the `get`, `put`, `post`, `delete`, `patch`, and `options` methods from the `http` module. We are going to use the `get` method to grab some json for the Riot Games json api.

Note: you can use the `text`, `content`, and `json` methods on a response to get the response body. `text` and `content` will return a string representation, `json` will convert it to json. Please see the [starlib reference page](/docs/reference/starlib) for more info.


```python
load("qri.sky", "qri")
load("http.sky", "http")

def download(ds):
  # get config and secrets variables from dataset
  summoner = qri.get_config("summoner")
  region = qri.get_config("region")
  api_key = qri.get_secret("api_key")
  #
  # get response from api endpoint
  #
  res = http.get("https://" + region + ".api.riotgames.com/lol/summoner/v3/summoners/by-name/" + summoner + "?api_key=" + api_key)
  #
  # get json from body, get accountId from json
  # note: when the response gets converted to json, it automatically gives the 
  # accountId and id fields a float type. If we were to convert straight to 
  # a string, it would appear in scientific notation. To combat this, I am 
  # casting it to int type, before finally settling on string type.
  #
  data = res.json()
  accountId = str(int(data["accountId"]))
  #
  # get match data and set as the body of the dataset
  #
  res = http.get("https://" + region + ".api.riotgames.com/lol/match/v3/matchlists/by-account/" + accountId + "?api_key=" + api_key)
  #
  # the response is a python dictionary with the dictionary key "matches"
  # that points to a list of dictionaries. Each item in the list contains 
  # information on a specific match. We only want to keep the actual list
  # of matches:
  #
  matches = res.json()["matches"]
  print(matches) # prints a long list of dictionaries containing match data
  ds.set_body(matches)
  return ds
```

First double check that this works by running

```bash
$ qri new --file dataset.yaml --dry-run
🏃🏽‍♀️ dry run
🤖 executing transform
📡 running download...
⚙️  running transform...
# HERE THE OUTPUT OF THE `print(matches)` CALL
✅ transform complete
created new dataset me/league_player_matches@QmTXF6LzpCFK87Ykq7WR7hjzCvNXWGXZ2ssJZwRiPiMSN9/map/QmV9jSavMgEFnC2METNKUvJLb4sVvoMTf6EthuAKmqzbfg
```

If you are running into problems, double check that your api key is up to date!

To get this dataset into your qri node, run the same command, without the `--dry-run` flag.

<a id="html"></a>
## 2.4 html module

Let's take a cursory look at the html module. The `html` module allows you use methods to grab elements from an html page, much like you would using jquery. Take a look at the [starlib reference page](/docs/reference/starlib) to find out more.

Let's go to wikipedia, and get a list of all the languages that you can read wikipedia in!

We will download the main wikipedia page, parse it using the `html` method, then navigate down to the <a> element, get the language from the 'title' attribute, and add it to the list of languages.

```python
load("html.sky", "html")
load("http.sky", "http")

def download(ds):
  res = http.get("https://en.wikipedia.org/wiki/Main_Page")
  doc = html(res.content())
  # from inspecting the contents of the wikipedia page, I was able to 
  # determine that the list of languages was located in a div who's id 
  # is `#p-lang` 
  langElems = doc.find("#p-lang").find("li")
  langs = []
  for i in range(0, langElems.len()):
    # get the ith element in the list of <li>'s
    li = langElems.eq(i)
    # list of the children of the <li>, in this case it is a list of one
    # element, an <a> tag
    alist = li.children()
    # There is only one <a> in the list, but it is still a list
    # to get that first <a> element:
    a = alist.first()
    # the "title" attribute in the <a> element contains the language, written
    # in english
    language = a.attr("title")
    # append this to the list of languages
    langs.append(language)
    #
    # this can all be done, alittle more confusingly, in one line:
    # langs.append(langElems.eq(i).children().first().attr("title"))
  ds.set_body(langs)
  return ds
```

To learn more about our starlark standard library, check out the [reference page](/docs/reference/starlib) which details each module and all of it's methods.
