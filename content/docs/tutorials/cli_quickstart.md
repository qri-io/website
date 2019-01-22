---
title: "CLI quickstart"
description: ""
date: 2018-01-30T00:00:00-04:00
section: tutorials
---

# CLI Tutorial
_(last updated Nov 12, 2018, using qri version 0.6.0)_

Welcome to the wonderful world of the Qri Command Line Interface. Here we'll get you started with using qri's command-line tools, giving a brief overview of what qri's CLI can do.

The whole tutorial is divided into six sections. The topics are as follows:

1. [QLI Quickstart](#1.0)  
  1.1 [`qri help`](#1.1)  
  1.2 [`qri version`](#1.2)  
  1.3 [`qri setup`](#1.3)  
  1.4 [`qri save`](#1.4)  
  1.5 [`qri list`](#1.5)  
  1.6 [`qri export`](#1.6)  

2. [Editing Datasets](#2.0)   
  2.1 [`qri remove`](#2.1)  
  2.2 [`qri save`](#2.2) - adding a new dataset while using a dataset.yaml file (add metadata and commit info using dataset.yaml file)  
  2.3 [`qri validate`](#2.3)  
  2.4 [`qri save, pt. 2`](#2.4)  
  2.5 [`qri log`](#2.5) - how to find the hash of a previous dataset version  

3. [Exploring Datasets](#3.0)  
  3.1 [components of a dataset](#3.1)  
  3.2 [what is a dataset ref and how is it formatted?](#3.2)  
  3.3 [`qri info`](#3.3)  
  3.4 [`qri get` and `qri-use`](#3.4)   
  3.5 [`qri body`](#3.5)

4. [peer-2-peer & networking commands](#4.0)  
  4.1 [`qri connect`](#4.1)  
  4.2 [`qri peers list`](#4.2)  
  4.3 [`qri list <peername>`](#4.3)  
  4.4 [`qri add`](#4.4)  
  4.5 [`qri peers info`](#4.5)  

5. [Search and the Registry](#5.0)  
  5.1 [what is the registry and why do we need it?](#5.1)  
  5.2 [`qri registry publish`](#5.2)  
  5.3 [`qri search`](#5.3)  

6. [Config](#6.0)  
  6.1 [`qri config get`](#6.1)  
  6.2 [`qri config set`](#6.2)  

<a id="1.0"></a>
## 1. QLI Tutorial, Part 1 - Quickstart

Download the latest version of the Qri installer [here.](https://github.com/qri-io/qri/releases/download/v0.6.0/qri_os_x_cli_darwin_amd64.pkg)

Once you've gone through the install process, open up your terminal.

Let's start by teaching you how to fish, so to speak. 

<a id="1.1"></a>
### 1.1 qri help
Type the command `qri help`

You should see something like this:

```shell
qri ("query") is a dataset version control system on the distributed web.
More info: https://qri.io

Feedback, questions, bug reports, and contributions are welcome!
https://github.com/qri-io/qri/issues

Usage:
  qri [command]

Dataset Commands:
  add         Add a dataset from another peer
  body        Get the body of a dataset
  diff        Compare differences between two datasets
  export      Copy datasets to your local filesystem
  get         Get elements of qri datasets
  info        Show summarized description of a dataset
  list        Show a list of datasets
  log         Show log of dataset history
  remove      Remove a dataset from your local repository
  rename      Change the name of a dataset
  render      Execute a template against a dataset
  save        Save changes to a dataset
  update      add/create the lastest version of a dataset
  use         Select datasets for use with the qri get command
  validate    Show schema validation errors

Network Commands:
  connect     Connect to the distributed web by spinning up a Qri node
  peers       Commands for working with peers
  publish     set dataset publicity
  search      Search qri

Other Commands:
  config      Get and set local configuration information
  help        Help about any command
  setup       Initialize qri and IPFS repositories, provision a new qri ID
  version     Print the version number

Flags:
  -h, --help        help for qri
      --no-color    disable colorized output
      --no-prompt   disable all interactive prompts

Use "qri [command] --help" for more information about a command.
```

By just typing `qri`, `qri help`, or `qri --help`, you can get a list of all the commands that are at your fingertips. 

You can also add the  `--help` flag after any Qri command to get more info on the command. `--help` will print a list of all the flags and options available for that command, as well as example usage. For example, running `qri diff --help` gives you a summary of what the command does, some examples on how to use that command, and the flags you can use to elicit different behaviors:

```shell
$ qri diff --help

Diff compares two datasets from your repo and prints a representation
of the differences between them.  You can specifify the datasets
either by name or by their hash

Usage:
  qri diff [flags]

Examples:
  show diff between two versions of the same dataset:
  $ qri diff me/annual_pop@/ipfs/QmcBZoEQ7ot4UYKn1JM3gwd4LHorj6FJ4Ep19rfLBT3VZ8
  me/annual_pop@/ipfs/QmVvqsge5wqp4piJbLArwVB6iJSTrdM8ZRpHY7fikASrr8

  show diff between two different datasets:
  $ qri diff me/population_2016 me/population_2017

Flags:
  -d, --display string   set display format [reg|short|delta|detail]
  -h, --help             help for diff
```

<a id="1.2"></a>
### 1.2 qri version

If you are ever having trouble with something that is supposed to be working just fine, or you and a friend are getting different behaviors while using the same command, it could be that you are not using the most recent version of Qri.

Since Qri is in active and rapid development, we're making changes to the app all the time. Updating Qri to the latest version should not have an effect on your repo, unless specified in the release notes. Breaking changes will be outlined, as well as information on what you should do to ease the transition.

The most current version of Qri will be specified by the latest [release](https://github.com/qri-io/qri/releases). A list of what's changed from version to version is available in the [changelog](https://github.com/qri-io/qri/blob/master/CHANGELOG.md).

At the last update of this tutorial, the most current version is `0.6.0`.

To view the version number of the qri software you are running, run the command `qri version`

```shell
$ qri version
0.6.0
```

<a id="1.3"></a>
### 1.3 qri setup

Okay, okay, enough stringing you along. Time to start _doing_ things. A _repository_ (_repo_ for short) is a special place on your hard drive in which Qri keeps all your data. The command for creating a new repository is `qri setup`. When you run the `qri setup` command, you are actually doing a few things:

* **New repo check:** <br />
First, Qri will check to see if there is already a Qri repo on your machine. If not, Qri attempts to creates a new repo, using the configuration details in the default config file (unless overridden with the `--ipfs-config` and/or `--config-data` flags, type `qri setup --help` for more details)

* **Setting a peername:** <br />
Setup will prompt you for a peername (if you have not provided one using the `--peername` flag or used a custom config file that has the peername provided). It will ping the registry to see if that peername is currently taken. If it is taken, it will prompt you for another one.

* **Create QRI_PATH Directory** <br />
Setup will create the repo directories on your QRI_PATH. QRI_PATH is an environment variable. We recommend that you leave the QRI_PATH variable as is, unless you have a good reason to change it.

* **Init IPFS** <br />
If IPFS (the network protocol that allows Qri to be a peer to peer service) does not exist on your system, Qri will install it for you. It will create the IPFS repo on your IPFS_PATH. IPFS_PATH is an environment variable. We recommend that you leave the IPFS_PATH variable as is.

* **Create a default configuration** <br />
Qri creates a config file and saves it in your Qri repo folder.

So let's get to it. Open a terminal and run `qri setup`. I am going to create a qri repo and choose the peername `tutorial`. Whenever you see `tutorial`, please substitute it with a peername of your choice.

When we run `qri setup`, Qri will come up with a randomized peername (a mix between colors and dog breeds). If you do not set your own peername, it will use this randomized name as your peername. You can also change your peername later using the `qri config set` command (check out [section 6](#6.0) of this tutorial)

```shell
$ qri setup
choose a peername: [pearl_aqua_bichon_frise]:
tutorial
set up qri repo at: /Users/home/.qri
```

If you try to set up a repo that has a peername which has already been taken, it will error. For example, if I try to set up a repo with the same peername as before:

```shell
$ qri setup
choose a peername: [pistachio_beagle]:
tutorial
peername 'tutorial' already taken
choose a peername: [pistachio_beagle]:
new_tutorial
set up qri repo at: /Users/home/.qri
```

<a id="1.4"></a>
### 1.4 Creating your first dataset with `qri save`

Yay! You've made a Qri repo. Congratulations :) You now have a dataset version control system on your computer. Now let's learn how to use it.

So you wanna add a new dataset that you've created to Qri? That's super easy. For this method of adding a new dataset to Qri, we only need a body file.

If you have a csv, json, or cbor file you would like to add, more power to you. If not, take a moment now to save the following text to your computer as `body.csv`:

```csv
1,Team Liquid,TL,8,4
1,100 Thieves,100,8,4
3,Echo Fox,EF,7,5
3,FlyQuest,FQ,7,5
5,OpTic Gaming,OG,6,6
6,TSM,TSM,5,7
6,Cloud9,C9,5,7
6,Counter Logic Gaming,CLG,5,7
6,Golden Guardians,GG,5,7
10,Clutch Gaming,CG,4,8
```

The text is the week 6 standings for the North American Professional League of Legends Teams in the 2018 Summer split.

In order to add this very important dataset to your Qri repo, we are going to use the `qri save` command. We will use the `--body` flag to add data to the dataset. Qri calls the "data" part of a dataset `body` to make it distinct from other "data" like `meta` and `structure`, which we'll learn about later on.

We also have to pass in a dataset name. I am going to use the name `nalcs_standings`, but feel free to name it whatever you like. A dataset reference also includes the peername of the peer that initially added the dataset to Qri, so the dataset reference will actually be `tutorial/nalcs_standings`. We can use `me`, as a shorthand for any datasets we ourselves have added to Qri, so we can also use `me/nalcs_standings` as a dataset reference. Putting it all this is what our command looks like:

```shell
# first, navigate to the folder that contains your datasets
$ cd /path/to/my/dataset

# then save a new dataset
$ qri save --body body.csv me/nalcs_standings
created new dataset me/nalcs_standings@QmTXF6LzpCFK87Ykq7WR7hjzCvNXWGXZ2ssJZwRiPiMSN9/ipfs/QmdoCnuMDQp2VfEEXkrX7QpkVuYD4kMJ7PvRw9XaeYJUAT
```

This bit: `me/nalcs_standings@QmTXF6LzpCFK87Ykq7WR7hjzCvNXWGXZ2ssJZwRiPiMSN9/ipfs/QmdoCnuMDQp2VfEEXkrX7QpkVuYD4kMJ7PvRw9XaeYJUAT` is the full dataset _reference_. Everything on left side of the `@` sign is the human readable _alias_. The right side of the `@` symbol is for referring to this exact dataset, this exact version. The first garbled set of number & letters is your Qri id. `/ipfs` is the network your dataset is saved on (in this case: ipfs), and finally the the _hash_ of your dataset. You can read more about hashes and content-addressing in our [content addressing doc](/docs/concepts/content-addressing)

Your Qri id and your dataset hash should and will be different than mine.

And that is the simplest, no frills way to add a dataset to qri! Continue on to see how to view all the datasets you have on Qri, and how to export them from Qri.

<a id="1.5"></a>
### 1.5 qri list

The first thing we'll want to do is list all of the datasets we have in our repository. This is nice and simple. To view the list of datasets you have on Qri, run `qri list`

```shell
$ qri list
1  tutorial/nalcs_standings
    /ipfs/QmdoCnuMDQp2VfEEXkrX7QpkVuYD4kMJ7PvRw9XaeYJUAT
    211 bytes, 10 entries, 0 errors
```
The first line is the dataset name.
The second is the hash, or unique id, of this particular version of the dataset.
The third line contains some stats on your dataset

As you add more datasets to qri, they'll show up here. As usual, use `qri list --help` to see more details and tricks with the list command.

<a id="1.6"></a>
### 1.6 qri export

Getting your data out of Qri is simple. Just use the `qri export` command. The dataset will be saved to the current folder in a directory named with the dataset name as a `.zip` archive. If you've been following the example, the archive will be called `nalcs_standings.zip`. Run `qri export --help` for details on what export can do.

```shell
$ qri export me/nalcs_standings

# run ls to list the files in your current directory
$ ls
Applications
Desktop
Documents
Movies
nalcs_standings.zip
Pictures

# to double check all is well in the zip file, let's unzip and explore
# unzip nalcs_standings.zip -d nalcs_standings
Archive:  nalcs_standings.zip
  inflating: nalcs_standings/dataset.json
  inflating: nalcs_standings/ref.txt
  inflating: nalcs_standings/body.csv
```

If you open the .zip archive, you'll notice that three files are saved when exported. `body.csv`, `dataset.yaml`, and `ref.txt`.

The `body.csv` file is the body of the dataset that we initially added.

The `dataset.json` file contains all the other dataset information if it exists: metadata, structure, commit, viz, and transform. It contains a field called `bodyPath`, which is the path on ipfs at which the body file is saved. It also contains a field called `qri`, which you will notice exists imbedded in other sections as well. This is an internal reference that makes sure Qri is using the correct version to read your dataset.

The `ref.txt` contains a string with the exact dataset reference of this dataset.

If you continue to the next section, don't delete these files yet! In the next section we will learn how to create a dataset full of detail using a `dataset.json` file.

<a id="2.0"></a>
# 2. Editing Datasets

This tutorial assumes you have worked through [Part 1](/docs/tutorials/cli_quickstart/#part1). You should be fine to follow along with this document, but you may miss some references.

So, you should have added a dataset (which I titled `nalcs_standings`) using the `qri save` command. You should also see that dataset listed when running `qri list`, and you should have the exported `nalcs_standings.zip` dataset.

Next we are going to learn to remove a dataset, add a dataset with meta and structure using a `dataset.json` file, add new data and validate that dataset, and save the newer version of the dataset.

<a id="2.1"></a>
### 2.1 qri remove

Removing a dataset from Qri is quite simple:

```shell
$ qri remove me/nalcs_standings
removed dataset 'tutorial/nalcs_standings@QmTXF6LzpCFK87Ykq7WR7hjzCvNXWGXZ2ssJZwRiPiMSN9/ipfs/QmdoCnuMDQp2VfEEXkrX7QpkVuYD4kMJ7PvRw9XaeYJUAT'
```
 
If you run `qri list` again, you will see it is removed from your list of datasets.

<a id="2.2"></a>
### 2.2 qri save --file

Now for some added fanciness. Remember that `dataset.json` file that was created when we used `qri export me/nalcs_standings`, let's open that up now and check it out.

You should get something that looks like this:

```json
{
  "commit": {
    "author": {
      "id": "QmXrCvaZkMXSPEFrpy3xMghgrkxFAsYoqcLogt3dU6c1RX"
    },
    "qri": "cm:0",
    "signature": "RccSIHOZ2gR3dxMwyY32kkTL9HcNxneCY3sMQUs8yq/XzQfbCdfFj01sUlD0gprWK7lHOGbdQUlWr5yTg+avQnjb0u9Wyfi8zGkP6WtEwIuKn179j44HWxjKoc9+4CaiNjrgBhrhTBf+yXW68GX4LA04qISgIu0lSg/CAf8xuYe5eQ7CuQDPBLKi7plJzt/tbPRRX79uxoQQk9g9oNyQf52UYBodaIbsy57YLOmOUD7B7eTgU+JHg5yH0xivL0HtvINsOUtVfZEeGHBQlZv7o5KHP8H19IqWvwhPrYQE5btCrZsSjT0Tp9NlgpJzogWJKZexuB5TGNOgX3xhKN0YPw==",
    "timestamp": "2018-11-30T19:08:45.70823323Z",
    "title": "created dataset"
  },
  "bodyPath": "/ipfs/QmbsSSNuWq4w7E4JgpzjghRfQeWeRcowMaFDKyy5j33gFu",
  "qri": "ds:0",
  "structure": {
    "checksum": "QmZx6AwxGgkeZDaZb9NaVxvB8NZVzjo7CiyRMWGwynnNmj",
    "entries": 10,
    "errCount": 0,
    "format": "csv",
    "formatConfig": {
      "lazyQuotes": true
    },
    "length": 211,
    "qri": "st:0",
    "schema": {
      "items": {
        "items": [
          {
            "title": "field_1",
            "type": "integer"
          },
          {
            "title": "field_2",
            "type": "string"
          },
          {
            "title": "field_3",
            "type": "string"
          },
          {
            "title": "field_4",
            "type": "integer"
          },
          {
            "title": "field_5",
            "type": "integer"
          }
        ],
        "type": "array"
      },
      "type": "array"
    }
  }
}
```

There's more than just a csv file here! When we created this dataset, Qri did a bunch of work behind the scenes to make sure your data is as portable and usable as possible. Qri stores your data in _immutable versions_ so you have a clear record of how your data looked. The top-level parts of this dataset.yaml file are called _components_ of a dataset.

Right now, this dataset contains `body` (recorded as `bodyPath`), `commit`, and `structure` components. It's a nice start, but let's add some detail. First, let's add some proper column names to the `schema` section of the `structure`.

The dataset contains the standings, names, abbreviation, wins and losses, for the North American League Championship Series, or the North American pro League of Legends esports league. Let's fill in the column names.

Datasets can be written as `json` or ` yaml` files. We have been using `json`, as that is the Qri export default, but `yaml` can often times be more user-friendly. This is the same dataset file, but written in yaml. For more on the structure of yaml files, check out [this page on yaml syntax](https://docs.ansible.com/ansible/latest/reference_appendices/YAMLSyntax.html).


```yaml
# dataset.yaml file:
commit:
  author:
    id: QmXrCvaZkMXSPEFrpy3xMghgrkxFAsYoqcLogt3dU6c1RX
  qri: cm:0,
  signature: RccSIHOZ2gR3dxMwyY32kkTL9HcNxneCY3sMQUs8yq/XzQfbCdfFj01sUlD0gprWK7lHOGbdQUlWr5yTg+avQnjb0u9Wyfi8zGkP6WtEwIuKn179j44HWxjKoc9+4CaiNjrgBhrhTBf+yXW68GX4LA04qISgIu0lSg/CAf8xuYe5eQ7CuQDPBLKi7plJzt/tbPRRX79uxoQQk9g9oNyQf52UYBodaIbsy57YLOmOUD7B7eTgU+JHg5yH0xivL0HtvINsOUtVfZEeGHBQlZv7o5KHP8H19IqWvwhPrYQE5btCrZsSjT0Tp9NlgpJzogWJKZexuB5TGNOgX3xhKN0YPw==,
  timestamp: 2018-11-30T19:08:45.70823323Z,
  title: created dataset
bodyPath: /ipfs/QmbsSSNuWq4w7E4JgpzjghRfQeWeRcowMaFDKyy5j33gFu,
qri: ds:0,
structure:
  checksum: QmZx6AwxGgkeZDaZb9NaVxvB8NZVzjo7CiyRMWGwynnNmj
  entries: 10
  errCount: 0
  format: csv
  length: 211
  qri: st:0
  schema:
    items:
      items:
      - title: field_1
        type: integer
      - title: field_2
        type: string
      - title: field_3
        type: string
      - title: field_4
        type: integer
      - title: field_5
        type: integer
      type: array
    type: array
```

Notice how, when we saved this new dataset, we didn't have to write our own schema or structure. If not provided, Qri will determine the structure of a file itself. JSON files will be recorded as an array or an object, but not more specific than that as of the time this tutorial was written. CSV files will be traversed and Qri will try to guess the correct column names. In this case it's fallen back to numbered column names, so let's fix them!

Let's edit our new `dataset.yaml` file, and fill out our structure component. Let's also remove unneeded components for creating a new dataset: bodyPath and commit. The correct column titles in the schema have been filled in below: 

```yaml
qri: ds:0,
structure:
  checksum: QmZx6AwxGgkeZDaZb9NaVxvB8NZVzjo7CiyRMWGwynnNmj
  entries: 10
  errCount: 0
  format: csv
  length: 211
  qri: st:0
  schema:
    items:
      items:
      - title: rank
        type: integer
      - title: team name
        type: string
      - title: abbreviation
        type: string
      - title: wins
        type: integer
      - title: losses
        type: integer
      type: array
    type: array
```

Next, let's talk metadata. Metadata is super important. It's the place where whomever gathered the data (or whomever is augmenting it) can give background and context on what the data contains, how it was collected, who collected it, and any other details that need recording.

Let's add a dataset title (a human readable title), description, and tags to this new `dataset.yaml` file. We record all descriptive metadata in the `meta` component. 

```yaml
qri: ds:0,
structure:
  checksum: QmZx6AwxGgkeZDaZb9NaVxvB8NZVzjo7CiyRMWGwynnNmj
  entries: 10
  errCount: 0
  format: csv
  length: 211
  qri: st:0
  schema:
    items:
      items:
      - title: rank
        type: integer
      - title: team
        type: string
      - title: abbreviation
        type: string
      - title: wins
        type: integer
      - title: losses
        type: integer
      type: array
    type: array
meta:
  title: NALCS Summer Split Standings 2018
  description: The standings for the North American League Championship Series, the professional League of Legends league. Data taken from Riot's esports website.
  downloadPage: https://www.lolesports.com/en_US/na-lcs/na_2018_summer/standings/regular_season
  keywords:
    - league of legends
    - riot games
    - nalcs
```
 

Save your new and improved `dataset.yaml` file, and you are ready to go.

Go back to your trusty terminal. My `dataset.yaml` file still lives in my nalcs_standings folder, along with the body file:`body.csv`. We are going to need both a dataset file and a body file to run this next step:

```shell
$ qri save --file dataset.yaml --body body.csv me/nalcs_standings
created new dataset me/nalcs_standings@QmTXF6LzpCFK87Ykq7WR7hjzCvNXWGXZ2ssJZwRiPiMSN9/ipfs/QmbQqBFc3HLHXwEKssYr4W9AayUJRe8sPZjUtZZ31uNntW
```

Note, you can also add a commit message and title using the command line flags `title` and `--message`

For example:

```shell
$ qri save --file dataset.yaml --body  body.csv me/nalcs_standings --title 'initial dataset' --message 'week 7 NALCS standings for the 2018 summer split' me/nalcs_standings
```

...would give you the same dataset, but with a custom title and message. If no title or message are given, Qri will generate a title for you.

You can also add a commit message and title to the dataset itself by adding a `commit` component to `dataset.yaml`:

```yaml
commit:
  title: initial dataset
  message: week 7 NALCS standings for the 2018 summer split
```

Note!!! Any flags given in the command will override the message given in the `dataset.yaml` file!!!

HOLD UP. We began this `qri save --file` adventure by using an already existing `dataset.yaml` file. What if we don't have one?? What if I want some guidance on how to create my own `dataset.yaml` file??? You're in luck. Using the command `qri export --blank` will create an empty `dataset.yaml` file with instructions :)

<a id="2.3"></a>
### 2.3 qri validate

Okay, so we've added a new dataset into Qri. What happens when you want to update that dataset?

The stats from the sample dataset I gave were the NALCS standings until week 6. After week 7 the standing shifted. Let's update the `nalcs_standings` dataset to include the week 7 results.

Save this as a new file `NALCS_Summer_2018_Week_7_Standings.csv` (or you can save over your old file with this new data, since the old version is in Qri, you can export the standings from week 6 any time you like):

```csv
1,Team Liquid,TL,10,4
2,Echo Fox,EF,9,5
2,100 Thieves,100,9,5
4,FlyQuest,FQ,7,7
4,Cloud9,C9,7,7
4,OpTic Gaming,OG,7,7
7,TSM,TSM,6,8
8,Counter Logic Gaming,CLG,5,9
8,Golden Guardians,GG,5,9
8,Clutch Gaming,CG,5,9
```

Now, to make sure we haven't made any silly mistakes let's validate this new body of data against the schema already present in the `nalcs_standings` dataset.

```shell
$ qri validate --body NALCS_Summer_2018_Week_7_Standings.csv me/nalcs_standings
✔ All good!
```

Notice that, like the `qri save` command or the `qri remove` command, we pass the peername and dataset name (in this case `me/nalcs_standings` or `tutorial/nalcs_standings`) as an argument to the command.

Let's say instead, we have a dummy file called `dummy.csv` that we want to validate against the structure of the `nalcs_standings` dataset. Let's say this file contains the following:

```csv
Bad,data
that,doesn't
make,any
sense,
```

We can check to see how well this `dummy.csv` file would work if checked against our `nalcs_standings` dataset with:

```shell
$ qri validate --body dummy.csv me/nalcs_standings
0: /0/0: "Bad" type should be integer
1: /1/0: "that" type should be integer
2: /2/0: "make" type should be integer
3: /3/0: "sense" type should be integer
```

The output of the command gives the errors that need to be fixed in order for the schema to match. This is super helpful when you're working on correcting data before adding to Qri.

<a id="2.4"></a>
### 2.4 qri save

Now that we know the dataset has no validation errors, let's save this version to Qri.

I want to update this dataset with new data in the body. I also want to add a title and message to this version of the dataset, which we call a `commit` (those of you familiar with other version control systems, specifically [git](https://git-scm.com/) will recognize that lingo).

We can add a title and message in two ways. We can add a `dataset.yaml` file that contains a `commit` section with a `title` and a `message` field. Or we can fill in a `title` and `message` using the `--title` and `--message` flags when we run the command.

Here is the potential dataset.yaml file:

```yaml
commit:
  title: body update
  message: dataset has been updated with the week 7 match results
```

```shell
$ qri save --file dataset.yaml --body NALCS_Summer_2018_Week_7_Standings.csv me/nalcs_standings
```

And without the `dataset.yaml` file:
```shell
$ qri save --body NALCS_Summer_2018_Week_7_Standings.csv --title 'body update' --message 'dataset has been updated with the week 7 match results' me/nalcs_standings
```

How do we know that the commit message saved correctly? To check, let's use the `qri get` command (which we will go over in more detail in section 4)  

```shell
$ qri get me/nalcs_standings
tutorial/nalcs_standings@QmTXF6LzpCFK87Ykq7WR7hjzCvNXWGXZ2ssJZwRiPiMSN9/ipfs/QmfWruGxeQZtqy4513G2agKka9GX6f2CuQ88Mjp31wwwtu:
  bodyPath: /ipfs/QmbZdKCJLF2jRKhbRaRknFjxsPYTwEvE4jGWQfZYu52iFY
  commit:
    author:
      id: QmTXF6LzpCFK87Ykq7WR7hjzCvNXWGXZ2ssJZwRiPiMSN9
    path: /ipfs/QmTK4CsgohfUSzmCd6PDtGd34wC5CrSZktbJMBVYzKpbNt
    qri: cm:0
    signature: wZe5queKi3drhecadkTrIHZGq+JD9AvOQpiT0l4fLd7jZvgBG7/T91LhhqTY2do2Au01IpthGdqg4Y1gT9Ec1+2TYADr3nFqtKO/wuey95/p0O99NP6MfTh97z6jtZs0T/gpnTGgSNgqDo96chcyauJfRm9LtlnpNm9H2RmaRMX2tSrGrbFeHFwm2BtLQKAFAcj/zK+QsohBc+Uz6Xr3lRdkG1y/Iyz9RMbDfDWPKQqZZH/QU27npbXD7zU9AeiY2YASSgXhD6hzVneGutiKdreiG6pvWvWEhZzyPhxMsnAn23jD5DOiZ02ytwaZiYcC4cfksIS7lZ/IPdWkNehB5Q==
    timestamp: "2018-08-09T16:11:59.644134156Z"
    title: body update
    message: dataset has been updated with the week 7 match results
  meta:
    description: The standings for the North American League Championship Series,
      the professional League of Legends league. Data taken from Riot's esports website.
    keywords:
    - league of legends
    - riot games
    - nalcs
    qri: md:0
    title: NALCS Summer Split Standings 2018
  path: /ipfs/QmZ8XgfLkM4vwMgTNG1NXmUer5pF5SvsparxSnk37DeBhJ/dataset.json
  qri: ds:0
  structure:
    checksum: QmXbeDBKs9HtWK4UpA9woKXDXtr75gbLJxjxyVNBjN2jvn
    entries: 10
    errCount: 0
    format: csv
    length: 212
    path: /ipfs/QmWRAsGrTqs1zvgdMJn42cwchrygAymoDNnZrKiHj6PL8e
    qri: st:0
    schema:
      items:
        items:
        - title: rank
          type: integer
        - title: team
          type: string
        - title: abbreviation
          type: string
        - title: wins
          type: integer
        - title: losses
          type: integer
        type: array
      type: array
```

The `commit` section has the `title` and `message` fields adjusted correctly!

<a id="2.5"></a>
### 2.5 qri log

Qri is a dataset version control system. That means each time you make an update and `qri save` a dataset, a snapshot is created. It means that even though you have made changes to the dataset, you can always retrieve any previous version you have saved before. Let's take a look at how we can view these previous versions using the `qri log` command.

```shell
$ qri log me/nalcs_standings
Aug  8 19:05:41 - /ipfs/QmfWruGxeQZtqy4513G2agKka9GX6f2CuQ88Mjp31wwwtu
  dataset update

Aug  8 18:17:39 - /ipfs/QmbQqBFc3HLHXwEKssYr4W9AayUJRe8sPZjUtZZ31uNntW
  created dataset

```

First, the date and time is displayed. Next, the dataset hash. The hash is the id, so to speak, of this particular version of the dataset. It is unique. Last is the commit title, so you have a little bit of context when looking through the log about what was added during that update.

In the next section, we'll go over the dataset reference and how to explore a dataset using the command line.

<a id="3.0"></a>
# 3. CLI Tutorial, Part 3 - Exploring the dataset

In part three of our tutorial (which assumes you have read through [Part 1]((/docs/tutorials/cli_quickstart/#part1)) and [Part 2]((/docs/tutorials/cli_quickstart/#part2))), we are doing to learn about the dataset reference and the tools we can use in the Qri command line client to explore your datasets.

<a id="3.1"></a>
### Components of a Dataset

Let's start by briefly going over what we at Qri mean when we say 'dataset'. We've listened to a bunch of folks who are smarter and more entrenched in the data world than we are, and combined their ideas and principles to make our definition of a dataset. You can read about what constitutes a dataset in detail on the [dataset reference](/docs/reference/dataset) page.

In short, a dataset is made up of a body, metadata, structure, a commit, a viz, and a transform.

The `body` is the _data_ associated with the dataset. In the case of a spreadsheet format, this would be the column/row names, the values inside each cell, etc.

The `meta` is all the information and details _about_ that data, including the title, description, contributors, and any other biographical or logistical details.  

The `structure` is what it sounds like. It holds information about the structure of the data, the number of entries, the number of bytes, the shape of the data, or the schema. We use the schema to validate future iterations of the dataset. You can use the same schema for multiple datasets.  

The `commit` is all the pertinent information about that specific version of the dataset, for example, details about what changed from the last version to this version (usually found in the `title` and `message` sections), as well as the timestamp, and signature of the peer that made the commit.  

The `viz` is the go/html template that should be used to render that dataset into a visual representation of that data (chart, graph, etc.).

And the `transform` is the (optional) code used to create that dataset (e.g., the code that was used to take the file from somewhere on the web and generate a dataset in qri). We won't be talking about transforms here, you can read all about them in the [starlark transform tutorial](/docs/tutorials/starlark_transfomations).

<a id="3.2"></a>
### 3.2 Dataset References

In Qri, we have a specific convention for naming datasets, we often call this name the dataset reference. The dataset reference is used by Qri to locate the specific version of the dataset you are trying to access.

Here is an example of a dataset reference:
`tutorial/nalcs_standings@QmTXF6LzpCFK87Ykq7WR7hjzCvNXWGXZ2ssJZwRiPiMSN9/ipfs/QmfWruGxeQZtqy4513G2agKka9GX6f2CuQ88Mjp31wwwtu`

Whoa, that's a lot, right? Well, once you know how to read it, it is way less intimidating.

Let's start by splitting up this dataset reference into two main parts on either side of the `@` symbol, and look at each piece one at a time.

The first part is the human readable reference: `tutorial/nalcs_standings`. Often times, it is the only part of the dataset reference we need. __It will always point to the most recent version of the dataset__. We have been using this form of dataset references for this whole tutorial.

This human readable portion can be further divided into two sections along the forward slash (`/`): the peername, and the dataset name.

For example, in the above dataset reference, `tutorial` is the peername, and `nalcs_standings` is the dataset name.

Now onto the second part, containing the `@` symbol and everything after.

`@QmTXF6LzpCFK87Ykq7WR7hjzCvNXWGXZ2ssJZwRiPiMSN9/ipfs/QmfWruGxeQZtqy4513G2agKka9GX6f2CuQ88Mjp31wwwtu`

From the `@` symbol to the `/` forward slash, you have your `peerID`, this is the unique id for the peer that added the dataset originally. In this case the peerID is `QmTXF6LzpCFK87Ykq7WR7hjzCvNXWGXZ2ssJZwRiPiMSN9`.

From the first `/` to the second `/`, you have the network id that the dataset is saved on. In almost all cases, as well as in this example, the network is `ipfs`.

From the second `/` to the end of the dataset reference, you have the hash of the dataset, or the specific id that references this particular version of the dataset. In this example, the dataset ID is `QmfWruGxeQZtqy4513G2agKka9GX6f2CuQ88Mjp31wwwtu`.

Although I have it listed above for veracity, often the peerID is left out of dataset references, as you do not need it to get a dataset that is in your own repo:

`tutorial/nalcs_standings@/ipfs/QmfWruGxeQZtqy4513G2agKka9GX6f2CuQ88Mjp31wwwtu`

In fact, you do not even need the human readable portion:

`@/ipfs/QmfWruGxeQZtqy4513G2agKka9GX6f2CuQ88Mjp31wwwtu`

will work just fine.

The difference between using `peername/dataset_name` and `@/network/dataset_hash`, is that the human readable portion will always only give you the most recent version of the dataset, where any dataset reference with a network and dataset hash will give you the dataset at the specific save point.

The dataset hash is how we view the previous versions of our dataset.

_Note: if you are using just the machine readable portion of the dataset reference, be sure to precede the peerID or the network with the `at` symbol._

Now, let's use the dataset reference to explore the dataset.

<a id="3.3"></a>
### 3.3 qri info

Let's get some basic info on our qri dataset:

```shell
$ qri info me/nalcs_standings
0  tutorial/nalcs_standings
    /ipfs/QmfWruGxeQZtqy4513G2agKka9GX6f2CuQ88Mjp31wwwtu
    211 bytes, 10 entries, 0 errors
```

You'll notice, it's a very similar format to what the info we receive when we use `qri list`.

<a id="3.3"></a>
### 3.3 qri get and qri use

We've looked at `qri get` briefly, but only to get a whole flood of information about a dataset. We can also use it to get specific pieces of information. We can use the `qri get` command to explore the `bodyPath`, `commit`, `qri`, `structure`, `meta`, `viz`, and `transform`.

For example, let's say we want to know what the metadata description is for our dataset:

```shell
$ qri get meta.description me/nalcs_standings
tutorial/nalcs_standings@QmTXF6LzpCFK87Ykq7WR7hjzCvNXWGXZ2ssJZwRiPiMSN9/ipfs/QmfWruGxeQZtqy4513G2agKka9GX6f2CuQ88Mjp31wwwtu: 
  The standings for the North American League Championship Series, the professional League of Legends league. Data taken from Riot Games' esports website.
```

Okay, now let's look at the commit:

```shell
$ qri get commit me/nalcs_standings
tutorial/nalcs_standings@QmTXF6LzpCFK87Ykq7WR7hjzCvNXWGXZ2ssJZwRiPiMSN9/ipfs/QmZ8XgfLkM4vwMgTNG1NXmUer5pF5SvsparxSnk37DeBhJ:
  author:
    id: QmTXF6LzpCFK87Ykq7WR7hjzCvNXWGXZ2ssJZwRiPiMSN9
  path: /ipfs/QmTK4CsgohfUSzmCd6PDtGd34wC5CrSZktbJMBVYzKpbNt
  qri: cm:0
  signature: wZe5queKi3drhecadkTrIHZGq+JD9AvOQpiT0l4fLd7jZvgBG7/T91LhhqTY2do2Au01IpthGdqg4Y1gT9Ec1+2TYADr3nFqtKO/wuey95/p0O99NP6MfTh97z6jtZs0T/gpnTGgSNgqDo96chcyauJfRm9LtlnpNm9H2RmaRMX2tSrGrbFeHFwm2BtLQKAFAcj/zK+QsohBc+Uz6Xr3lRdkG1y/Iyz9RMbDfDWPKQqZZH/QU27npbXD7zU9AeiY2YASSgXhD6hzVneGutiKdreiG6pvWvWEhZzyPhxMsnAn23jD5DOiZ02ytwaZiYcC4cfksIS7lZ/IPdWkNehB5Q==
  timestamp: "2018-08-09T16:11:59.644134156Z"
  title: body update
  message: dataset has been updated with the week 7 match results
```

Great. Now, what if I want to know the title and message of the first commit, or the commit that was created when we first added the dataset using `qri save`?

In order to do that, we would have to use the hash of the first version of the dataset. We can get that hash by using `qri log`. This command gives us the history of our datasets:


```shell
$ qri log me/nalcs_standings
Aug  8 19:05:41 - /ipfs/QmfWruGxeQZtqy4513G2agKka9GX6f2CuQ88Mjp31wwwtu
  dataset update

Aug  8 18:17:39 - /ipfs/QmbQqBFc3HLHXwEKssYr4W9AayUJRe8sPZjUtZZ31uNntW
  created dataset

```

As a reminder, the hash of your datasets, even if you name them the same as we do in the tutorials, will be different than the ones presented here. In order to look at previous versions of your dataset, you must use the hashes that get printed to your terminal when you run `qri log` yourself.

So, let's get the commit of the previous dataset using its particular hash: `QmbQqBFc3HLHXwEKssYr4W9AayUJRe8sPZjUtZZ31uNntW`

```shell
$ qri get commit me/nalcs_standings@/ipfs/QmbQqBFc3HLHXwEKssYr4W9AayUJRe8sPZjUtZZ31uNntW
tutorial/nalcs_standings@QmTXF6LzpCFK87Ykq7WR7hjzCvNXWGXZ2ssJZwRiPiMSN9/ipfs/QmbQqBFc3HLHXwEKssYr4W9AayUJRe8sPZjUtZZ31uNntW:
  author:
    id: QmTXF6LzpCFK87Ykq7WR7hjzCvNXWGXZ2ssJZwRiPiMSN9
  path: /ipfs/QmTK4CsgohfUSzmCd6PDtGd34wC5CrSZktbJMBVYzKpbNt
  qri: cm:0
  signature: wZe5queKi3drhecadkTrIHZGq+JD9AvOQpiT0l4fLd7jZvgBG7/T91LhhqTY2do2Au01IpthGdqg4Y1gT9Ec1+2TYADr3nFqtKO/wuey95/p0O99NP6MfTh97z6jtZs0T/gpnTGgSNgqDo96chcyauJfRm9LtlnpNm9H2RmaRMX2tSrGrbFeHFwm2BtLQKAFAcj/zK+QsohBc+Uz6Xr3lRdkG1y/Iyz9RMbDfDWPKQqZZH/QU27npbXD7zU9AeiY2YASSgXhD6hzVneGutiKdreiG6pvWvWEhZzyPhxMsnAn23jD5DOiZ02ytwaZiYcC4cfksIS7lZ/IPdWkNehB5Q==
  timestamp: "2018-08-09T16:11:59.644134156Z"
  title: created dataset
```

We did not have a message when we used `qri save`, we only had a title: 'created dataset'.

Cool! So you just explored the dataset using a dataset reference with a dataset hash.

Now, having to repeatedly copy and paste the same dataset reference every time you want to `qri get` something seems a little tedious. We felt that way, too.

In order to streamline things a bit, we created the `qri use` command. Whatever dataset reference you give to the `qri use` command can be used in any subsequent `qri get` commands, until the `qri use` list is cleared using the `qri use --clear` command.

```shell
$ qri use me/nalcs_standings@/ipfs/QmbQqBFc3HLHXwEKssYr4W9AayUJRe8sPZjUtZZ31uNntW
me/nalcs_standings@/ipfs/QmbQqBFc3HLHXwEKssYr4W9AayUJRe8sPZjUtZZ31uNntW

$ qri get commit.title
tutorial/nalcs_standings@QmTXF6LzpCFK87Ykq7WR7hjzCvNXWGXZ2ssJZwRiPiMSN9/ipfs/QmbQqBFc3HLHXwEKssYr4W9AayUJRe8sPZjUtZZ31uNntW:
  created dataset
```

You can view the dataset reference stored in use by running the `qri use --list` command

```shell
$ qri use --list
me/nalcs_standings@/ipfs/QmbQqBFc3HLHXwEKssYr4W9AayUJRe8sPZjUtZZ31uNntW
```

<a id="3.4"></a>
### qri body

Okay, so we know now we can use the `qri get` command to explore the `bodyPath`, `commit`, `qri`, `structure`, `metadata`, `viz`, and `transform`. But what if you want to view the body itself?

That's where the `qri body` command comes in.

Like the `qri get` command, you can view the body at different points in time by using a dataset reference with a dataset hash. As of writing this tutorial, however, `qri use` does not work with `qri body`, this is a known discrepancy.

Let's use `qri body` to look at the most recent version of `me/nalcs_standings`

```shell
$ qri body me/nalcs_standings
[[1,"Team Liquid","TL",10,4],[2,"Echo Fox","EF",9,5],[2,"100 Thieves","100",9,5],[4,"FlyQuest","FQ",7,7],[4,"Cloud9","C9",7,7],[4,"OpTic Gaming","OG",7,7],[7,"TSM","TSM",6,8],[8,"Counter Logic Gaming","CLG",5,9],[8,"Golden Guardians","GG",5,9],[8,"Clutch Gaming","CG",5,9]]
```

You'll notice, that even though the data is correct, that doesn't look much like the csv we imported. That's because the `qri body` command defaults to showing the data in JSON format. Using the `--format` flag, we can print as csv.

```shell
$ qri body --format csv me/nalcs_standings
1,Team Liquid,TL,10,4
2,Echo Fox,EF,9,5
2,100 Thieves,100,9,5
4,FlyQuest,FQ,7,7
4,Cloud9,C9,7,7
4,OpTic Gaming,OG,7,7
7,TSM,TSM,6,8
8,Counter Logic Gaming,CLG,5,9
8,Golden Guardians,GG,5,9
8,Clutch Gaming,CG,5,9
```

You can use `--limit` and `--offset` to get different parts of the dataset body:

```shell
$ qri body --format csv --limit 5 me/nalcs_standings
1,Team Liquid,TL,10,4
2,Echo Fox,EF,9,5
2,100 Thieves,100,9,5
4,FlyQuest,FQ,7,7
4,Cloud9,C9,7,7
```

```shell
$ qri body --format csv --limit 5 --offset 5 me/nalcs_standings
4,OpTic Gaming,OG,7,7
7,TSM,TSM,6,8
8,Counter Logic Gaming,CLG,5,9
8,Golden Guardians,GG,5,9
8,Clutch Gaming,CG,5,9
```

Now, to see the body of the previous version of the dataset, we will use `qri log` to get the hash, and then use the hash to get the body:

```shell
$ qri log me/nalcs_standings
Aug  8 19:05:41 - /ipfs/QmfWruGxeQZtqy4513G2agKka9GX6f2CuQ88Mjp31wwwtu
  dataset update

Aug  8 18:17:39 - /ipfs/QmbQqBFc3HLHXwEKssYr4W9AayUJRe8sPZjUtZZ31uNntW
  created dataset

$ qri body --format csv me/nalcs_standings@/ipfs/QmbQqBFc3HLHXwEKssYr4W9AayUJRe8sPZjUtZZ31uNntW
1,Team Liquid,TL,8,4
1,100 Thieves,100,8,4
3,Echo Fox,EF,7,5
3,FlyQuest,FQ,7,5
5,OpTic Gaming,OG,6,6
6,TSM,TSM,5,7
6,Cloud9,C9,5,7
6,Counter Logic Gaming,CLG,5,7
6,Golden Guardians,GG,5,7
10,Clutch Gaming,CG,4,8
```

<a id="4.0"></a>
# CLI Tutorial, Part 4 - Peer commands

So now that you can create, update, and examine your own datasets, how do you look for datasets on others' Qri nodes?

We are now going to look at the `qri connect` and `qri peers` commands, starting with how to spin up your Qri node to connect with other, get a list of your peers, get info about them, list their datasets, and add their datasets to your own repository.

Unfortunately, it will be less straightforward to follow along on this section of the tutorial. Because you can only view a Qri node of a peer who is currently online, the list of peers that I have and the peers that will be connected to your qri node will be different.

<a id="4.1"></a>
### 4.1 qri connect

In order for others to view your datasets, or for you to view a peer's dataset, you need to have a Qri node running. This is super easy. All you need to do is open up a terminal window and run the command `qri connect`

```shell
$ qri connect
16:04:36.076  INFO     qrip2p: boostrapping to: QmTZxETL4YCCzB1yFx4GT1te68henVHD1XPQMkHZ1N22mm bootstrap.go:28
16:04:36.078  INFO     qrip2p: boostrapping to: QmNX9nSos8sRFvqGTwdEme6LQ8R1eJ8EuFgW32F9jjp2Pb bootstrap.go:28
16:04:36.079  INFO     qriapi:
peername: tutorial
profileID:  QmTXF6LzpCFK87Ykq7WR7hjzCvNXWGXZ2ssJZwRiPiMSN9
API port: 2503
RPC port: 2504
IPFS Addresses:
  /ip4/127.0.0.1/tcp/4001/ipfs/QmZnDzTmoQZSt7hVhJAqsaoGCqx4VUVbYpZnyxmKJWy5pe
  /ip4/192.168.0.8/tcp/4001/ipfs/QmZnDzTmoQZSt7hVhJAqsaoGCqx4VUVbYpZnyxmKJWy5pe
  /ip6/::1/tcp/4001/ipfs/QmZnDzTmoQZSt7hVhJAqsaoGCqx4VUVbYpZnyxmKJWy5pe
  /ip4/24.104.245.18/tcp/32666/ipfs/QmZnDzTmoQZSt7hVhJAqsaoGCqx4VUVbYpZnyxmKJWy5
```

You may also see other activity in this terminal window. Whenever you connect to a new peer, or exchange data with a peer, there will be output to the terminal describing the activity.

With `qri connect` running in the terminal, you now have access to all the `qri peers` commands.

<a id="4.2"></a>
### 4.2 qri peers list

Now that we have a Qri node running, we can find out what peers we are connected to!

Using the `qri peers list` command, we will get a list of the currently connected peers. Note, this list will contain different peers than the list printed here.

```shell
$ qri peers list

tutorial_peer | online
QmQDAHk8jx6mJ1migbC6oEij52odepBV7RHBoGoGFWUr7F


mojo | online
QmfREVLKSKngemAQLJJEdNbm2ha71uRZhvXdNquCJA86eP
@qri_io
Mojo is a qri gateway.

epa | online
QmXKaJKveAc4ZKm4ys9zXWutPaqr2F3Jm34YqfU1dWmDmh
@EPA
The Environmental Protection Agency protects people and the environment from significant health risks, sponsors and conducts research, and develops and enforces environmental regulations.
```

Now that we have some peer names and ids, we can take a look at another peer's datasets!

<a id="4.3"></a>
### 4.3 qri list <peername>

To view the list of datasets currently on a peer's node, use the `qri list <peername>` command. This is the same command we use to list our own datasets! Let's say I want to view the datasets on the `tutorial_peer`:

```shell
$ qri list tutorial_peer
1  tutorial_peer/paris_energy_pledges
    /ipfs/QmbbULznAxYWmq3v5wgD2czb9eQeEfK74pJakN6VE42zCi
    Renewable/Low-Carbon Energy Production Pledges from NDCs of Paris Accord
    *under construction* a listing of the pledges made by countries to shift thei...
    87 KBs, 168 entries, 383 errors
2  fivethirtyeight/weather_ksea
    /ipfs/QmVi6Li9usDQMtW5wVPDMpAa7Xx2jpKd25bKCWoz8e3Suu
    20 KBs, 365 entries, 0 errors
```

You can see this peer has two datasets. If you take a look at the dataset references, you will see a distinct difference. The `tutorial_peer/paris_energy_pledges` dataset was added by this peer, the `tutorial_peer`. The `fivethirtyeight/weather_ksea` dataset, however, was originally added by the `fivethirtyeight` peer. The `tutorial_peer` added the `fivethirtyeight/weather_ksea` dataset by connecting to the `fivethirtyeight` peer and adding that datasets to its own repository.

In the next section, we are going to learn how to add a peer's dataset to our own node.

<a id="4.4"></a>
### 4.4 qri add

Now, to `qri add`!

First, you must still have `qri connect` running in another terminal. This allows us access to the Qri network.

Second, you must have the dataset reference for the dataset you want to add. By running the `qri peers list` command, we found we have a peer called `tutorial_peer`. By running the `qri list tutorial_peer` command, we found that peer has a dataset called `tutorial_peer/paris_energy_pledges`. Let's add that dataset :)

```shell
$ qri add tutorial_peer/paris_energy_pledges
1  tutorial_peer/paris_energy_pledges
    /ipfs/QmbbULznAxYWmq3v5wgD2czb9eQeEfK74pJakN6VE42zCi
    Renewable/Low-Carbon Energy Production Pledges from NDCs of Paris Accord
    *under construction* a listing of the pledges made by countries to shift thei...
    87 KBs, 168 entries, 383 errors
Successfully added dataset tutorial_peer/paris_energy_pledges
```

If we run `qri list` to see our datasets, we will see this new dataset in our repository:

```shell
$ qri list
1  tutorial/nalcs_standings
    /ipfs/Qmager6xdesYPTgcgQwUPyPtQVddxCy6fLXKZhnKku9ra2
    NALCS Summer Split Standings 2018
    The standings for the North American League Championship Series, the professi...
    211 bytes, 10 entries, 0 errors
2  tutorial_peer/paris_energy_pledges
    /ipfs/QmbbULznAxYWmq3v5wgD2czb9eQeEfK74pJakN6VE42zCi
    Renewable/Low-Carbon Energy Production Pledges from NDCs of Paris Accord
    *under construction* a listing of the pledges made by countries to shift thei...
    87 KBs, 168 entries, 383 errors
```

You can now use any of the Qri commands you normally use for exploring or exporting datasets to checkout out this added `tutorial_peer/paris_energy_pledges` dataset.

One note: if you make a change or update to a peer's dataset using the `qri save` command, the dataset will now be renamed from `<other_peername>/<dataset_name>` to `<my_peername>/<dataset_name>`

<a id="4.5"></a>
### 4.5 qri peers info

To get details about a peer, such as their real name, twitter handle, or email address, you can use the `qri peers info` command:

```shell
$ qri peers info tutorial_peer
color: ""
created: "2018-07-26T14:35:39.614543043-04:00"
description: ""
email: "test@test.com"
homeurl: ""
id: QmQDAHk8jx6mJ1migbC6oEij52odepBV7RHBoGoGFWUr7F
name: "tutorial example peer"
peerIDs:
- /ipfs/QmaZN1jED9KGzso8d2PdyrA1U9VyA8hVZ3RkRnatzJumrX
peername: tutorial_peer
photo: ""
poster: ""
thumb: ""
twitter: ""
type: peer
updated: "2018-07-26T14:35:39.614543043-04:00"
```

You can learn how to update your own profile in [Part 6]((/docs/tutorials/cli_quickstart/#part6)) of this tutorial.

<a id="5.0"></a>
# CLI Tutorial, Part 5 - Search and the Registry

<a id="5.1"></a>
### 5.1 What is the registry

The registry is a light weight centralized service for two purposes.

First, the registry has a list of peer IDs. We keep this list so that when a new person joins Qri, their peer ID does not conflict with anyone elses.

Second, the registry supplements our search results. Once a dataset is published to the registry, it is indexed and other peers can use the `qri search` command to find it.

Before we move forward, I want to clarify something. Once you add a dataset into Qri, any peer that connects to your Qri node can look at and add your dataset using the `qri peers` and `qri list <peername>` commands. They can view your dataset regardless of whether or not that dataset is published to the registry. 

Publishing the dataset to the registry determines whether or not the dataset will show up in search results, not whether it is accessible by other Qri peers.

<a id="5.2"></a>
### 5.2 qri registry publish

In order to make sure a dataset is published to the registry, use the command `qri registry publish`

```shell
$ qri registry publish me/nalcs_standings
published dataset me/nalcs_standings
```

To remove it from the registry:

```shell
$ qri registry unpublish me/nalcs_standings
unpublished dataset me/nalcs_standings
```

However, since we are going to use the search command in the next section, I want to make sure that my `nalcs_standings` dataset is published:

```shell
$ qri registry publish me/nalcs_standings
published dataset me/nalcs_standings
```

<a id="5.3"></a>
### 5.3 qri search

Keywords, titles, descriptions, and dataset names are all indexed for search. So, for example, I will try using the search term `nalcs` to look for our sample dataset.

```shell
$ qri search nalcs
showing 1 results for 'nalcs'
1. tutorial/nalcs_standings
   NALCS Summer Split Standings 2018
   The standings for the North American League Championship Series, the professional League of Legends league. Data taken from Riot's esports website.
```

<a id="6.0"></a>
# CLI Tutorial, Part 6 - Profile and Config

Now, let's say you want to change your peername (which we do not recommend), or add your email address or twitter handle to your profile. You can do all those actions and more using the `qri config set` command.

First, however, let's learn how to view the config using `qri config get`!

<a id="6.1"></a>
### 6.1 qri config get

To view all the config details, run `qri config get`

```shell
$ qri config get
API:
  allowedorigins:
  - http://localhost:2505
  - http://app.qri.io
  - https://app.qri.io
  enabled: true
  port: 2503
  proxyforcehttps: false
  readonly: false
  tls: false
  urlroot: ""
CLI:
  colorizeoutput: true
Logging:
  levels:
    qriapi: debug
    qrip2p: debug
P2P:
  addrs: null
  bootstrapaddrs: []
  enabled: true
  httpgatewayaddr: ""
  peerid: QmbiT5cJgxTZd2AV19bFJMA3zXMV1aDf8oEzfNc8qjMJwx
  port: 0
  privkey: ""
  profilereplication: full
  pubkey: ""
  qribootstrapaddrs:
  - /ip4/130.211.198.23/tcp/4001/ipfs/QmNX9nSos8sRFvqGTwdEme6LQ8R1eJ8EuFgW32F9jjp2Pb
  - /ip4/35.193.162.149/tcp/4001/ipfs/QmTZxETL4YCCzB1yFx4GT1te68henVHD1XPQMkHZ1N22mm
Profile:
  color: ""
  created: "2018-04-25T11:49:15.88838293-04:00"
  description: ""
  email: ""
  homeurl: ""
  id: QmTXF6LzpCFK87Ykq7WR7hjzCvNXWGXZ2ssJZwRiPiMSN9
  name: ""
  peername: tutorial
  photo: ""
  poster: ""
  thumb: ""
  twitter: ""
  type: peer
  updated: "2018-04-25T11:49:15.88838293-04:00"
RPC:
  enabled: true
  port: 2504
Registry:
  location: https://registry.qri.io
Render:
  defaultTemplateHash: /ipfs/QmeqeRTf2Cvkqdx4xUdWi1nJB2TgCyxmemsL3H4f1eTBaw
  templateUpdateAddress: /ipns/defaulttmpl.qri.io
Repo:
  middleware: []
  type: fs
Store:
  type: ipfs
Webapp:
  analyticstoken: ""
  enabled: true
  entrypointhash: QmP99mprLUGhMqrh5gyqt4McrgfTJCKCSh5eGJaZw2LycF
  entrypointupdateaddress: /ipns/webapp.qri.io
  port: 2505
```

Note that in the P2P section, there is a field called privkey. This should never be shared with anyone, and by default, is stripped from the content. Run `qri config --help` to learn more.

Most of these fields you will never care about or change. However, the profile section will probably be of interest.

Like the `qri get` command, we can use the section names to show only part of the config. So, to get just the profile from the config: `qri config get profile`.

```shell
$ qri config get profile
color: ""
created: "2018-04-25T11:49:15.88838293-04:00"
description: ""
email: ""
homeurl: ""
id: QmTXF6LzpCFK87Ykq7WR7hjzCvNXWGXZ2ssJZwRiPiMSN9
name: ""
peername: tutorial
photo: ""
poster: ""
thumb: ""
twitter: ""
type: peer
updated: "2018-04-25T11:49:15.88838293-04:00"

$ qri config get profile.peername
tutorial

```

<a id="6.2"></a>
### 6.2 qri config set

Now, let's say you want to add a name and a description to your profile. I'm going to add 'example peer' as the name and 'This peer was created to teach people how to use Qri' as the description.

```shell
$ qri config set profile.name 'example peer' profile.description 'This peer was created to teach people how to use Qri'
config updated

$ qri config get profile
color: ""
created: "2018-04-25T11:49:15.88838293-04:00"
description: "This peer was created to teach people how to use Qri"
email: ""
homeurl: ""
id: QmTXF6LzpCFK87Ykq7WR7hjzCvNXWGXZ2ssJZwRiPiMSN9
name: "example peer"
peername: tutorial
photo: ""
poster: ""
thumb: ""
twitter: ""
type: peer
updated: "2018-04-25T11:49:15.88838293-04:00"
```

To learn more about the Config, please check out the config package [readme](https://github.com/qri-io/qri/blob/master/config/readme.md).

# End!

That's all for now of our tutorial. We will be updating this as the code and functionality of Qri changes.

If you find any errors or are having trouble following along with the tutorial, please file an issue at our [website github repo](https://github.com/qri-io/website).