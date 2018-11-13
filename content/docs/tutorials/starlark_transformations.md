---
title: "Starlark Transformations"
description: ""
date: 2018-01-30T00:00:00-04:00
updated: 2018-11-13T00:00:00-04:00
cliVerion: 0.6.0
section: tutorials
---

# Starlark Transformations

Qri ("query") is about datasets. A _transformation_ is a repeatable script for generating a dataset. [Starlark](https://github.com/google/starlark/blob/master/doc/spec.md). This package implements starlark as a _transformation syntax_. Starlark transformations are about as close as one can get to the full power of a programming language as a transformation syntax. Often you need this degree of control to generate a dataset.

Typical examples of a starlark transformation include:

* combining paginated calls to an API into a single dataset
* downloading unstructured structured data from the internet to extract

So let's dive in and learn about transforms!


# Table of Contents

#### 1. Transformation Basics
* [1.1 - What's a Transformation?](#1_1)  
* [1.2 - Manual Transforms](#1_2)  
* [1.3 - Scripted Transforms](#1_3) 
* [1.4 - The Transform Function](#1_4) 


#### 2. Transforms that Download Data
* [2.1 - Download function](#2_1)
* [2.2 - Config and Secrets](#2_2)
* [2.3 - Modules and `qri`](#2_3)
* [2.4 - http](#2_4)
* [2.5 - html](#2_5)
<!-- * [2.6 - Automating Updates](#2_6) --> 

<!--
### 3 Mixing Manual & Scripted Transforms
* [1.5 - Transforms & Histories](#1_5)
#### 4. One-off Scripts
#### 5. Combining Datasets 
-->

-- --

<a id="1_1"></a>
### 1.1 What's a Transformation?

Before we get started, let's understand what we mean by "transform". Here's the technical definition of a transform in Qri:

**A Transformation is a forward transition from one snapshot to another snapshot.**

In plain english: transformations are how datasets change. There are two types of transformation: _manual_ and _scripted_. Manual transforms are direct manipulations of data, scripted transformations use code to make changes.

There are some rules to how transformations work:

* transforms must mutate one or more non-computed fields of a dataset
* only one type of transform can be applied to any field per transform
* transforms can use one or more types of mutations to determine the next snapshot

It's totally ok if that sounds like nonsense for now. We'll be walking through all of this with real examples in this tutorial. 

<a id="1_2">
### 1.2 Manual Transforms

Before getting into scripts, let's create a dataset using only manual transformations. Manual transforms work by providing values directly to Qri. Let's start by manually creating a dataset. First we'll create a new (very simple) json file: an array of rational numbers called `body.json`:

```json
[1,2,3,4,5,6,7,8,9,10]
```

Next in the same folder we'll create a new file called `dataset.yaml` with the following contents:

```yaml
name: rational_numbers
meta:
  title: rational number series
bodypath: body.json
```

From a terminal, navigate to the folder that contains that file, and save it to Qri with `qri save`.

```text
$ cd path/to/that_folder
$ qri save --file=dataset.yaml
saved dataset b5/rational_numbers
```

Ok cool, you've just created a new dataset with a manual transformation that lists rational numbers. It's "manual" because you provided values directly to Qri. The "transform part" transitioned from nothing (an empty dataset) to a an initial snapshot of a datset.

<a id="1_3">
### 1.3 Transform Scripts

We can think of the above manual transform as a series of _assignments_ in a single _function call_. Written out as code, above example is telling Qri to do the following:

```python
def human_transform(ds):
  ds.set_meta("title", "rational number series")
  ds.set_body([1,2,3,4,5,6,7,8,9,10])
```

When you save a dataset, qri calls up the previous version (or crates an empty dataset when there is no previous version), and then applies all the changes provided to get to a new version.

There are _many_ situations where manual transforms are the right option (or the only option) for changing a dataset. But we're using a computer, and if we can describe the changes we want to make as code, the computer can do more work for us. That's where transform scripts come in.

With a transform script, instead of making manual changes, an algorithm _automates_ changes to fields of a dataset with programmatic instructions.


Before we get into what's going on, let's actually try this out. 

Transform scripts are written in _starlark_. Starlark is a subset of python, so if you can write python, you can write starlark. If you can't write python (or starlark), that's ok! We'll circle back later & explain the transform function, but for now let's just copy-paste our way to victory. From the same folder, create a new file called `transform.star` and save this into it:

```python
def transform(ds, ctx):
  ds.set_meta("title", "rational number series")
  # use the range function to automate setting the dataset body
  # range(1,11) will produce an array of numbers: [1,2,3,4,5,6,7,9,10]
  # which is the same as our manual transform, but with less typing!
  ds.set_body(range(1,11))
```

_note: if you're using a text editor and want syntax highlighting (colored text), try setting your editor to 'python' syntax._

This is a script that does the exact same thing as our manual transform from earlier. To use the script, let's modify our `dataset.yaml` use the script, deleting the `meta` and `body` components, and adding a new `transform` component that specifies our script file. Once `dataset.yaml` looks like this, save the file:
```yaml
name: rational_numbers
transform:
  scriptpath: transform.yaml
```

You can delete stuff in this file, because it's stored in Qri!

Now let's save a new snapshot to qri:
```text
$ qri save --file dataset.yaml
error saving: no changes detected
```

Wait, we got an error. what gives? This is because the result of running the transform _didn't change the dataset_. Transforms have to describe _changes_. This is a super important feature of Qri, and transforms. If nothing changes, Qri can tell you as much, and avoid creating uncessary versions of a dataset. 

To get this to work, let's change somthing! Let's open up our `transform.star` file and write a script that adds more numbers to our body:

```python
def transform(ds, ctx):
  ds.set_meta("title", "rational number series")
  # this time set the body to 1-1000 instead:
  ds.set_body(range(1,1001))
```

And re-run save:
```text
$ qri save --file dataset.yaml
dataset saved: b6/rational_numbers@QmQ7hA8gk...
```

Congrats! you've just run a transform with a dataset of the numbers 1 to 1000, without having to type the numbers by hand.

<a id="1_4">
### The transform function

Ok, we can't avoid the issue any longer, time to understand what's going on in this script:

```python
def transform(ds, ctx):
  ds.set_meta("title", "rational number series")
  # this time set the body to 1-1000 instead:
  ds.set_body(range(1,1001))
```

This script defines a _special function_: `transform` that Qri knows to look for. There are others, but `transform` is the main one (literally, if you're coming from an engineering background, `transform` is Qri's `main`). The transform function accepts two _arguments_: `ds` and `ctx`:
* ds represents the current _dataset snapshot_. Your mission, should you choose to accept it, is to change `ds` in some way
* ctx represents the _transform context_, it keeps info used while the transform script is running.

When we run `qri save` with a transform script specified, Qri will load it up and look for the transform function, which must be defined. When Qri finds that function, it loads up the existing version of the dataset (or makes an empty dataset if there's no history), and passes it to ds. Whatever changes are made to ds via method calls like `set_body` and `set_meta` are applied to the dataset, and the result is committed as a new snapshot.

Its possible to mix manual transforms and scripted transforms, but they can't affect the same parts of a dataset. We'll cover mixing transform types in another tutorial.

-- --

<a id="2_0"></a>
## 2. Transforms that Download Data

Transforms have another _special function_ called `download` that lets you create super-powered datasets that draw from the world wide web. `download` can do all sorts of stuff like grab resources from APIs, fetch & parse HTML, or pull raw `csv` data off the web. Combined with Qri versioning, you can make a dataset that knows how to update itself, and only records updates when the external resource changes.


<a id="2_1"></a>
## 2.1 Download function

In this section we are going to talk about the Qri function `download`. The `download` function is a _special function_ that gives your script access to the internet. The `download` function is the _only_ place where you have access to the web.

The `download` function is always run before the `transform` step, and places it's results in the _transform context_. The dataset returned from the `download` function, gets passed as the dataset parameter in the `transform` function.

<a id="2_2"></a>
## 2.2 Config and Secrets

When we came up with the idea of including transforms in Qri, the thing we were most excited about was a transforms ability to be customized for the person running it. In order to have customizability, we needed a way to _configure_ a transform script. For example, if there is a dataset that has a call to the github api, that can pull down the stats from one of my projects, but I want to also use that transform to pull down stats from a second project, one of the variables in my transform would probably be `repo_name`.

Related to configuratino are _secrets_. Often, when we try to get information from an api, that api requires us to have a special key that is only associated with our identity. It's often private and should not be shared in the dataset itself or made public in any way.

This is where the config and secrets comes in. `config` and `secrets` are both part of the transform dataset component.

To illustrate, we'll build an example that grabes the last 100 League of Legends matches a specific player (in this case called `summoner`) has played in a specific region (in this case, North America). Let's create a new folder called `lol_last_100_matches`, and a new `dataset.yaml` file within that folder:

```yaml
# lol_last_100_matches/dataset.yaml
name: league_player_matches
meta:
  title: Dataset created using the qri starlark tutorial. Pings the Riot Games (creator of the computer game League of Legends) api, gets a summoner's account id, and then a list of their last 100 matches.
transform:
  scriptpath: transform.star
  config:
    summoner: sørenbjerg
    region: na1
```

Config is set right on the transform component. Secrets, on the other hand, should be provided when calling the command:

```text
$ qri save --file=dataset.yaml --secrets=api_key,*******************
```



Note, if you want to run this transform yourself, you will need to head over to the [Riot Games developer website](https://developer.riotgames.com/), and create a login. Then, you can generate your own api key right from your developer dashboard. You will replace the series of `*****` in the command with your own api key.

Okay, so that's how you add a config variable and a secrets variable into the transform, but how do you actually use it in the transform file? That's where _transform context_ comes in.

<a id="2_3"></a>
## 2.3 Modules and `qri`

Chances are, if you are trying to do something cool with Qri, you will need more than just the basic functionality we've shown you so far.

You can also import modules from the starlark standard library ([Starlib](https://github.com/qri-io/starlib) we have been working on. [Here](/docs/reference/starlib) is our reference page that details each module and each function within that module.

For now, let's look at the `qri` module. Here is how you load a module into a transform:

```python
# lol_last_100_matches/transform.star
load("qri.star", "qri")

def download(ctx):
  return ds
```

Great, now that we've loaded the `qri` module, let's actually use it to get the summoner name, region, and api_key, from the dataset.

```python
def download(ctx):
  summoner = ctx.get_config("summoner")
  region = ctx.get_config("region")
  api_key = ctx.get_secret("api_key")
  print(summoner) # prints "sørenbjerg"
  print(region) # prints "na1"
  print(api_key) # prints the api_key

def transform(ds,ctx):
  # nothing yet
```

Head over to the terminal. Change directories until you are in your `lol_last_100_matches` folder. We are going to use the `--dry-run` flag. This will allow us to see the output of the transform, without actually saving it to our Qri node.

```text
$ qri save --file dataset.yaml me/lol_last_100_matches --secrets=api_key,******** --dry-run
```

<a id="2_4"></a>
## 2.4 http module

Now that we can get config and secrets variables, let's use those to grab some data from an API endpoint using the http package.

The http package can only be used in the `download` function. You do not have access to the network in any the `transform` function. If you try to download something in the `transform` function, you will get an error.

You have access to the `get`, `put`, `post`, `delete`, `patch`, and `options` methods from the `http` module. We are going to use the `get` method to grab some json for the Riot Games json api.

Note: you can use the `text`, `content`, and `json` methods on a response to get the response body. `text` and `content` will return a string representation, `json` will convert it to json. Please see the [starlib reference page](/docs/reference/starlib) for more info.


```python
load("qri.star", "qri")
load("http.star", "http")

def download(ctx):
  # get config and secrets variables from dataset
  summoner = ctx.get_config("summoner")
  region = ctx.get_config("region")
  api_key = ctx.get_secret("api_key")
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
  return matches

def transform(ds, ctx):
  # get matches from context
  matches = ctx.download
  # set the body to our matches data
  ds.set_body(matches)
```

First double check that this works by running

```text
$ qri save --file dataset.yaml --secrets=api_key,****** --dry-run
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

<a id="2_4"></a>
## 2.4 html module

Let's take a cursory look at the html module. The `html` module allows you use methods to grab elements from an html page, much like you would using jquery. Take a look at the [starlib reference page](/docs/reference/starlib) to find out more.

Let's go to wikipedia, and get a list of all the languages that you can read wikipedia in!

We will download the main wikipedia page, parse it using the `html` method, then navigate down to the <a> element, get the language from the 'title' attribute, and add it to the list of languages.

```python
load("html.star", "html")
load("http.star", "http")

def download(ctx):
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
  return langs

def transform(ds, ctx):
  langs = ctx.download
  ds.set_body(langs)
```

To learn more about our starlark standard library, check out the [reference page](/docs/reference/starlib) which details each module and all of it's methods.


<!-- <a id="3_0"></a>
## Mixing Manual & Scripted Transforms

### Transform types are mutually exclusive

Both types of transform are acting on the same components and fields of a dataset (`meta` and `body` components, a `title` field and body `rows`). To ensure reproducibility, we need a new rule: **each type of transform must only mutate the dataset in a way that is composable with all other transforms**. This means if both manual and scripted transforms are acting at the same time, only one transform can mutate a field between two snapshots.

With this rule in place, we can finally simplify the question "what is the passed in value of `ds` in `transform(ds,ctx)`?". The answer: the previous snapshot.

In the past, this was complicated. We can now simplify the story because it's an error to have two transform types act on a single field.


Here's an example flow:

`dataset.yaml`:
```yaml
meta:
  title: Prime Ministers of Canada
  description: A list of Canadian Prime Ministers
structure:
  format: json
  schema:
    type: array
    items:
      type: object
      properties:
        name:
          type: string
body: body.json
```

Let's run that through Qri save:
```
# create a new dataset, dataset.yaml contains no transform
$ qri save --file=dataset.yaml me/ca_prime_ministers
created new dataset b5/ca_prime_ministers
```

Pretty quickly we realize that manually constructing the body is a pain, so we write a transform script that grabs this data from a trusted source:

`transform.star`:
```python
load("http.star", "http")

def download(ctx):
  res = http.get("http://canada.ca/prime-ministers-list.json")
  return res.json()

def transform(ds, ctx):
  ds.set_body(ctx.download)
```

So we update our dataset.yaml to specify the transform script:

`dataset.yaml`:
```yaml
meta:
  title: Prime Ministers of Canada
  description: A list of Canadian Prime Ministers
structure:
  format: json
  schema:
    type: array
    items:
      type: object
      properties:
        name:
          type: string
transform:
  script: transform.star
body: body.json
```

But re-running save gives us an error:
```shell
$ qri save --file=dataset.yaml me/ca_prime_ministers
error: transform script and user-supplied dataset are both trying to set:
  body

please adjust either the transform script or remove the supplied body
```

So we do what the error tells us, and remove the `body` field from dataset.yaml, and re-save. This time it works, and the transform runs:

```shell
$ qri save --file=dataset.yaml me/ca_prime_ministers
🤖 executing transform
✅ transform complete
saved dataset b5/ca_prime_ministers
```

Some time later we want to get fresh data, so we run an update:

```shell
$ qri update me/ca_prime_ministers
🤖 executing transform
✅ transform complete
updated dataset b5/ca_prime_minsters
```

Dope. Now we realize that it's important to add themes to our metadata, to classify this info as being about government. In this case we're only trying to set meta, not get a new version of the data. So this time we trust that the data we've already specified is in qri, so we can delete all the stuff about structure in `dataset.yaml`, and just focus on the meta component:

`dataset.yaml`:
```yaml
meta:
  title: Prime Ministers of Canada
  description: A list of Canadian Prime Ministers
  theme:
  - government
  keywords:
  - canada
  - government
  - prime ministers
```

And we save the changes:

```shell
$ qri save --file=dataset.yaml me/ca_prime_ministers
saved dataset b5/ca_prime_minsters
```

The new part here is the transform didn't run, because _save only runs transforms the first time they're provided_. Further proof of this comes from the fact that the transform is now missing from the most recent snapshot:

```
$ qri get transform me/ca_prime_ministers
null
```

Also, `qri update` now gives us a new error:

```
$ qri update me/ca_prime_ministers
error: no transform script in most recent dataset. There is a transform script 2 commits back that adjusts:
  body

to run an update using the most recent transform, run:
  qri update --recall-tf me/ca_prime_ministers
```

This missing transform is vital for reproducibility reasons, the missing transform indicates that no transform script was executed to get from the snapshot that had the old meta to the new meta.

Resurrecting the transform is relatively easy, we follow the instructions from the error:
```
$ qri update --recall-tf me/ca_prime_ministers
🤖 executing transform
✅ transform complete
updated dataset b5/ca_prime_minsters
```

Finally, if we want to both re-run the existing transform _and_ change things about a dataset in a single commit, we can still do that so long as the transform doesn't affect any fields we're trying to manually change by running `qri save with --recall-tf`. In this example we'll adjust the schema to add more specificity, so we adjust dataset.yaml:

`dataset.yaml`:
```yaml
structure:
  format: json
  schema:
    type: array
    items:
      type: object
      properties:
        name:
          type: string
        description:
          type: string
          maxLength: 140
```

And run save with `--recall-tf`:

```
$ qri save --file=dataset.yaml --recall-tf me/ca_prime_ministers
🤖 executing transform
✅ transform complete
updated dataset b5/ca_prime_minsters
```

<a id="1_5"></a>
### Transforms & Histories

A transform is the opposite of a history, moving forwards in snapshots instead of backwards. A history is _reproducible_ when you can start at the first snapshot and re-execute each mutation described in the next snapshot. By enforcing the mutually-exclusive mutations, each snapshot is a deterministic record of both state and _how to arrive at that state_ from the previous snapshot. -->
