---
title: "CLI quickstart"
description: ""
date: 2018-01-30T00:00:00-04:00
section: tutorials
---

# CLI Tutorial

Welcome to the wonderful world of the Qri Command Line Interface. After the first section of this tutorial you will be able to set up your qri repo, check the version of qri you are running, create a new dataset, list your datasets, and export your datasets. Following is an index.

The whole tutorial is divided into eight sections. The topics are as follows:

1. QLI Quickstart  
  1.1 `qri help`  
  1.2 `qri version`  
  1.3 `qri setup`  
  1.4 `qri new`  
  1.5 `qri list`  
  1.6 `qri export`  

2. New and Save 
  2.1 `qri remove`  
  2.2 `qri new` - adding a new dataset while using a dataset.yaml file (add metadata and commit info using dataset.yaml file)  
  2.3 `qri validate`  
  2.4 `qri save`  

3. Dataset Reference (DatasetRefs)  
  3.1 what is a dataset ref and how is it formatted  
  3.2 `qri rename`  
  3.3 `qri log` - how to find the hash of a previous dataset version  

4. Exploring the dataset  
  4.1 `qri use`  
  4.2 `qri info`  
  4.3 `qri get`  
  4.4 `qri body`  
  4.5 `qri diff`  

5. Search and the Registry  
  5.1 what is the registry and why do we need it?  
  5.2 `qri registry publish`  
  5.3 `qri search`  

6. Render  
  6.1 `qri render` - default  
  6.2 creating your own template  

7. Config  
  7.1 `qri config get`  
  7.2 `qri config set`  
  7.3 more resources  

8. Peer commands  
  8.1 `qri peers list`  
  8.2 `qri peers info`  
  8.3 `qri list`  
  8.4 `qri add`  


## QLI Quickstart

Head over to our [releases](https://github.com/qri-io/qri/releases) page and download the latest version of the Qri installer (the .pkg file).

Once you've gone through the install process, open up your terminal.

Let's start by teaching you how to fish, so to speak. 

### qri help
Type the command `qri help`

This is the output you should receive:

```
$ qri help
qri ("query") is a global dataset version control system
on the distributed web.

https://qri.io

Feedback, questions, bug reports, and contributions are welcome!
https://github.com/qri-io/qri/issues

Usage:
  qri [command]

Dataset Commands:
  add         Add a dataset
  body        Get the contents of a dataset
  diff        compare differences between two datasets
  export      copy datasets to your local filesystem
  get         get elements of qri datasets
  info        show summarized description of a dataset
  list        show a list of datasets
  log         show log of dataset history
  new         Create a new dataset
  remove      remove a dataset from your local repository
  rename      change the name of a dataset
  render      execute a template against a dataset
  save        save changes to a dataset
  use         select datasets for use with other commands
  validate    show schema validation errors

Network Commands:
  connect     connect to the distributed web, start a local API server
  peers       commands for working with peers
  registry    commands for working with a qri registry
  search      Search qri

Other Commands:
  config      get and set local configuration information
  help        Help about any command
  setup       initialize qri and IPFS repositories, provision a new qri ID
  version     print the version number

Flags:
  -h, --help        help for qri
      --no-color    disable colorized output
      --no-prompt   disable all interactive prompts

Use "qri [command] --help" for more information about a command.

```

By just typing `qri`, `qri help`, or `qri --help`,  you can get a list of all the commands that are at your fingertips.

And typing `--help` after any Qri command, you can get a list of all the flags and options available for that command, as well as example usage.

### qri version

If you are ever having trouble with something that is supposed to be working just fine, or you and a friend are getting different behaviors while using the same command, it could be that you are not using the most recent version of Qri.

Since Qri is in active and rapid development, changes happen often. Updating Qri to the latest version should not have an effect on your repo, unless specified in the release notes. Such breaking changes will be outlined, as well as information on what you should do to ease the transition.

The most current version of Qri will be specified by the latest [release](https://github.com/qri-io/qri/releases).

At the last update of this tutorial, the most current version is `0.5.1`

To get the version number of the qri software you are running, run the command `qri version`

```
$ qri version
0.5.1
```

### qri setup

Okay, okay, enough stringing you along. Time to get into what you are really here for. Let's set up our Qri repository, or repo, and create a new dataset.

When you run the `qri setup` command, you are actually doing a few things:

1. New repo check:  
  First, Qri will check to see if there is already a qri repo on your machine. If not, Qri attempts to creates a new repo, using the configuration details in the default config file (unless overriden with the `--ipfs-config` and/or `--config-data` flags, type `qri setup --help` for more details)

2. Peername:  
  It will prompt you for a peername, if you have not provided one using the `--peername` flag or used a custom config file that has the peername provided. It will ping the registry to see if that peername is currently taken. If it is taken, it will prompt you for another one.

3. Directories:  
  It will create the repo directories on your QRI_PATH. QRI_PATH is an environment variable. We recommend that you leave the QRI_PATH variable as is, unless you have a good reason to change it.

4. IPFS:  
  If IPFS (the network protocol that allows Qri to be a peer to peer service) does not exist on your system, Qri will install it for you. It will create the IPFS repo on your IPFS_PATH. IPFS_PATH is an environment variable. We recommend that you leave the IPFS_PATH variable as is.

5. Config:  
  Qri creates a config file and saves it in your Qri repo folder.

So let's get to it. I am going to create a qri repo called `tutorial`. Whenever you see `tutorial`, please substitute it with a peername of your choice.

When we run `qri setup`, Qri will come up with a randomized peername (a mix between colors and dog breeds, for more info on how that's determined check out the [qri-io/doggos](github.com/qri-io/doggos) github repo). If you do not set your own peername, it will use this randomized name as your peername. You can also change your peername later using the `qri config set` command (check out section 7 of this tutorial)


```
$ qri setup
choose a peername: [pearl_aqua_bichon_frise]:
tutorial
set up qri repo at: /Users/home/.qri
```

If you try to set up a repo that has a peername that has already been taken, it will error. For example, if I try to set up a repo with the same peername as before:

```
$ qri setup
choose a peername: [pistachio_beagle]:
tutorial
peername 'tutorial' already taken
choose a peername: [pistachio_beagle]:
new_tutorial
set up qri repo at: /Users/home/.qri
```

### qri new

Yay! You've make a Qri repo. Congratulations :) You now a dataset version control system on your computer. Now let's learn how to use it.

So you wanna add a new dataset that you've created to Qri? That's super easy.

Let's start by briefly going over what we at Qri mean when we say 'dataset'. We've listened to a bunch of folks who are smarter and more entrenched in the data world than us, and combined their ideas to make our definition of a dataset. You can read about what constitutes a dataset in detail on the [dataset reference](/docs/reference/dataset) page.

In short, a dataset is made up of a body, metadata, structure, a commit, a viz, and a transform.

The `body` is the _data_ associated with the dataset.  

The `metadata` is all the details surrounding that data, including the title, description, contributors, and any other biographical or logistical details.  
The `structure` is what it sounds like. It holds information about the structure of the data, the number of entries, the number of bytes, the shape of the data, or the schema. We use the schema to validate future interations of the dataset. You can use the same schema for multiple datasets.  
The `commit` is all the pertinate information about that specific version of the dataset, for example, details about what changed from the last version to this version (usually found in the `title` and `messsage` sections), as well as the timestamp, and signature of the peer that made the commit.  
The `viz` is the go/html template that should be used to render that dataset.
And the `transform` is the (optional) code used to create that dataset. 

We won't be talking about transforms here, you can read all about transforms in the [skylark transform tutorial](/docs/tutorials/skylark_transfomations).
  
Phew. Okay. That is a lot of information. And all you want is to create a dataset.

For this method of adding a new dataset to Qri, we only need a data file.

If you have a csv, json, or cbor file you would like to add, more power to you. If not, save the following text as `data.csv`:

```
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

The text is the current standings for the North American Professional League of Legends Teams in the 2018 Summer split.

In order to add this very import dataset to your Qri repo, we are going to use the `qri new` command. We will use the `--body` flag to add data to the dataset, and we will have to pass in a dataset name. I am going to use the name `nalcs_standings`, but feel free to name it whatever you like. A full dataset name includes the peername of the peer that initally added the dataset to Qri, so the full dataset name will actually be `tutorial/nalcs_standings`. We can use `me`, as a shorthand for any of our own datasets, so we can also use `me/nalcs_standings` as a dataset reference.

```
$ qri new --body ~path/to/data/data.csv me/nalcs_standings
created new dataset me/nalcs_standings@QmTXF6LzpCFK87Ykq7WR7hjzCvNXWGXZ2ssJZwRiPiMSN9/ipfs/QmdoCnuMDQp2VfEEXkrX7QpkVuYD4kMJ7PvRw9XaeYJUAT
```

This bit: `me/nalcs_standings@QmTXF6LzpCFK87Ykq7WR7hjzCvNXWGXZ2ssJZwRiPiMSN9/ipfs/QmdoCnuMDQp2VfEEXkrX7QpkVuYD4kMJ7PvRw9XaeYJUAT` is the dataset reference. Everything before the `@` sign is human readable. Everything after it is 1) your Qri id, 2) the network your dataset is saved on (in this case: ipfs), 3) the hash of your dataset.

Your Qri id, and your dataset hash should and will be different than mine.

And that is the simpliest, no frills way to add a dataset to qri! Continue on to see how to view all the datasets you have on Qri, and how to export them from Qri.

### qri list

This is nice a simple. To view the list of datasets you have on Qri, run `qri list`

```
$ qri list
1  tutorial/nalcs_standings
    /ipfs/QmdoCnuMDQp2VfEEXkrX7QpkVuYD4kMJ7PvRw9XaeYJUAT
    211 bytes, 10 entries, 0 errors
```
The first line is the dataset name.
The second is the hash of this particular version of the dataset.
The third line contains some stats on your dataset

### qri export

Getting your data out of Qri is simple. You just use the `qri export` command. The dataset will be saved to the current folder in a directory named with the dataset name. If you've been following the example, the directory will be called `nalcs_standings`

```
$ qri export me/nalcs_standings
exported data to: nalcs_standings/data.csv
exported dataset.json to: nalcs_standings/dataset.yaml
```

Notice that two files are saved when exported.

The `data.csv` file is the body of the dataset. 

The `dataset.yaml` file contains all the other dataset information if it exists: metadata, structure, commit, viz, and transform. It contains a field called `bodyPath`, which is the path on ipfs at which the body file is saved. It also contains a field called `qri`, which you will notice exists imbedded in other sections as well. This is an internal reference that makes sure Qri is using the correct version to read your dataset.

If you continue to the next section, you will learn how to create a dataset full of detail using a `dataset.yaml` file.

