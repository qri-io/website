---
title: "CLI quickstart"
description: ""
date: 2018-01-30T00:00:00-04:00
section: tutorials
---

# CLI Tutorial, Part 1
_(last updated August 8, 2018)_

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
  3.1 what is a dataset ref and how is it formatted?  
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


## 1. QLI Quickstart

Head over to our [releases](https://github.com/qri-io/qri/releases) page and download the latest version of the Qri installer (the .pkg file).

Once you've gone through the install process, open up your terminal.

Let's start by teaching you how to fish, so to speak. 

### 1.1 qri help
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

### 1.2 qri version

If you are ever having trouble with something that is supposed to be working just fine, or you and a friend are getting different behaviors while using the same command, it could be that you are not using the most recent version of Qri.

Since Qri is in active and rapid development, we're making changes to the app all the time. Updating Qri to the latest version should not have an effect on your repo, unless specified in the release notes. Such breaking changes will be outlined, as well as information on what you should do to ease the transition.

The most current version of Qri will be specified by the latest [release](https://github.com/qri-io/qri/releases).

At the last update of this tutorial, the most current version is `0.5.1`

To view the version number of the qri software you are running, run the command `qri version`

```
$ qri version
0.5.1
```

### 1.3 qri setup

Okay, okay, enough stringing you along. Time to get into what you are really here for. Let's set up our Qri repository, or repo, and create a new dataset.

When you run the `qri setup` command, you are actually doing a few things:

  A. New repo check:  
    First, Qri will check to see if there is already a qri repo on your machine. If not, Qri attempts to creates a new repo, using the configuration details in the default config file (unless overriden with the `--ipfs-config` and/or `--config-data` flags, type `qri setup --help` for more details)

  B. Peername:  
    It will prompt you for a peername, if you have not provided one using the `--peername` flag or used a custom config file that has the peername provided. It will ping the registry to see if that peername is currently taken. If it is taken, it will prompt you for another one.

  C. Directories:  
    It will create the repo directories on your QRI_PATH. QRI_PATH is an environment variable. We recommend that you leave the QRI_PATH variable as is, unless you have a good reason to change it.

  D. IPFS:  
    If IPFS (the network protocol that allows Qri to be a peer to peer service) does not exist on your system, Qri will install it for you. It will create the IPFS repo on your IPFS_PATH. IPFS_PATH is an environment variable. We recommend that you leave the IPFS_PATH variable as is.

  E. Config:  
    Qri creates a config file and saves it in your Qri repo folder.

So let's get to it. I am going to create a qri repo called `tutorial`. Whenever you see `tutorial`, please substitute it with a peername of your choice.

When we run `qri setup`, Qri will come up with a randomized peername (a mix between colors and dog breeds, for more info on how that's determined check out the [qri-io/doggos](github.com/qri-io/doggos) github repo). If you do not set your own peername, it will use this randomized name as your peername. You can also change your peername later using the `qri config set` command (check out section 7 of this tutorial)


```
$ qri setup
choose a peername: [pearl_aqua_bichon_frise]:
tutorial
set up qri repo at: /Users/home/.qri
```

If you try to set up a repo that has a peername which has already been taken, it will error. For example, if I try to set up a repo with the same peername as before:

```
$ qri setup
choose a peername: [pistachio_beagle]:
tutorial
peername 'tutorial' already taken
choose a peername: [pistachio_beagle]:
new_tutorial
set up qri repo at: /Users/home/.qri
```

### 1.4 qri new

Yay! You've made a Qri repo. Congratulations :) You now have a dataset version control system on your computer. Now let's learn how to use it.

So you wanna add a new dataset that you've created to Qri? That's super easy.

Let's start by briefly going over what we at Qri mean when we say 'dataset'. We've listened to a bunch of folks who are smarter and more entrenched in the data world than we are, and combined their ideas and principles to make our definition of a dataset. You can read about what constitutes a dataset in detail on the [dataset reference](/docs/reference/dataset) page.

In short, a dataset is made up of a body, metadata, structure, a commit, a viz, and a transform.

The `body` is the _data_ associated with the dataset. In the case of a spreadsheet format, this would be the column/row names, the values inside each cell, etc.

The `metadata` is all the information and details _about_ that data, including the title, description, contributors, and any other biographical or logistical details.  

The `structure` is what it sounds like. It holds information about the structure of the data, the number of entries, the number of bytes, the shape of the data, or the schema. We use the schema to validate future interations of the dataset. You can use the same schema for multiple datasets.  

The `commit` is all the pertinate information about that specific version of the dataset, for example, details about what changed from the last version to this version (usually found in the `title` and `messsage` sections), as well as the timestamp, and signature of the peer that made the commit.  

The `viz` is the go/html template that should be used to render that dataset into a visual representation of that data (chart, graph, etc.).

And the `transform` is the (optional) code used to create that dataset (e.g., the code that was used to take the file from somewhere on the web and generate a dataset in qri). 

We won't be talking about transforms here, you can read all about them in the [skylark transform tutorial](/docs/tutorials/skylark_transfomations).
  
Phew. Okay. That is a lot of information. And all you want is to create a dataset.

For this method of adding a new dataset to Qri, we only need a data file.

If you have a csv, json, or cbor file you would like to add, more power to you. If not, take a moment now to save the following text to your computer as `data.csv`:

```
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

The text is the current standings for the North American Professional League of Legends Teams in the 2018 Summer split.

In order to add this very important dataset to your Qri repo, we are going to use the `qri new` command. We will use the `--body` flag to add data to the dataset, and we will have to pass in a dataset name. I am going to use the name `nalcs_standings`, but feel free to name it whatever you like. A full dataset name includes the peername of the peer that initally added the dataset to Qri, so the full dataset name will actually be `tutorial/nalcs_standings`. We can use `me`, as a shorthand for any of our own datasets, so we can also use `me/nalcs_standings` as a dataset reference.

```
$ qri new --body ~path/to/data/data.csv me/nalcs_standings
created new dataset me/nalcs_standings@QmTXF6LzpCFK87Ykq7WR7hjzCvNXWGXZ2ssJZwRiPiMSN9/ipfs/QmdoCnuMDQp2VfEEXkrX7QpkVuYD4kMJ7PvRw9XaeYJUAT
```

This bit: `me/nalcs_standings@QmTXF6LzpCFK87Ykq7WR7hjzCvNXWGXZ2ssJZwRiPiMSN9/ipfs/QmdoCnuMDQp2VfEEXkrX7QpkVuYD4kMJ7PvRw9XaeYJUAT` is the dataset reference. Everything before the `@` sign is human readable. Everything after it is 1) your Qri id, 2) the network your dataset is saved on (in this case: ipfs), 3) the hash of your dataset.

Your Qri id, and your dataset hash should and will be different than mine.

And that is the simpliest, no frills way to add a dataset to qri! Continue on to see how to view all the datasets you have on Qri, and how to export them from Qri.

### 1.5 qri list

This is nice and simple. To view the list of datasets you have on Qri, run `qri list`

```
$ qri list
1  tutorial/nalcs_standings
    /ipfs/QmdoCnuMDQp2VfEEXkrX7QpkVuYD4kMJ7PvRw9XaeYJUAT
    211 bytes, 10 entries, 0 errors
```
The first line is the dataset name.
The second is the hash of this particular version of the dataset.
The third line contains some stats on your dataset

### 1.6 qri export

Getting your data out of Qri is simple. Just use the `qri export` command. The dataset will be saved to the current folder in a directory named with the dataset name. If you've been following the example, the directory will be called `nalcs_standings`

```
$ qri export me/nalcs_standings
exported data to: nalcs_standings/data.csv
exported dataset.json to: nalcs_standings/dataset.yaml
```

Notice that two files are saved when exported.

The `data.csv` file is the body of the dataset. 

The `dataset.yaml` file contains all the other dataset information if it exists: metadata, structure, commit, viz, and transform. It contains a field called `bodyPath`, which is the path on ipfs at which the body file is saved. It also contains a field called `qri`, which you will notice exists imbedded in other sections as well. This is an internal reference that makes sure Qri is using the correct version to read your dataset.

If you continue to the next section, don't delete those files yet! In the next section we will learn how to create a dataset full of detail using a `dataset.yaml` file.




# 2. CLI Tutorial, Part 2

This tutorial assumes you have worked through [Part 1](/docs/tutorials/cli_quickstart). You should be fine to follow along with this document, but you may miss some references.

So, you should have added a dataset (which I entitled `nalcs_standings`) using the `qri new` command, and seen that dataset listed using the `qri list` command, and exported that dataset.

Next we are going to learn to remove a dataset, add a dataset with metadata and structure using a `dataset.json` file, add new data and validate that dataset, and save the newer version of the dataset.

### 2.1 qri remove

Removing a dataset from Qri is quite simple:

```
$ qri remove me/nalcs_standings
removed dataset 'tutorial/nalcs_standings@QmTXF6LzpCFK87Ykq7WR7hjzCvNXWGXZ2ssJZwRiPiMSN9/ipfs/QmdoCnuMDQp2VfEEXkrX7QpkVuYD4kMJ7PvRw9XaeYJUAT'
```
 
 If you run `qri list` again, you will see it is removed from your list of datasets.

 ### 2.2 qri new --file

 Now for some added fanciness. Remember that `dataset.yaml` file that was created when we used `qri export me/nalcs_standings`, let's open that up now and check it out.

 You should get something that looks like this:

``` yaml
 bodyPath: /ipfs/QmPBQKHc2os92kTKzdJ8xGdyP6mo6JAT9d7QncEzYSSGCM
commit:
  author:
    id: QmTXF6LzpCFK87Ykq7WR7hjzCvNXWGXZ2ssJZwRiPiMSN9
  qri: cm:0
  signature: zHgYne5lRdftX5CV/RkRbuWloRm0LvjFzdmo25XqTIBEqhVW0ywhy/yl+rmVvOJo26mJbvwUN8QwxLllpEVkv5YHYCQhxWu/8+RpGKuMJFzhjB/pRhw4+ykjxRGe/zLLkaN97uAq+fnjR7Ld0VKMkuSEtpuVkpguiyjxrEfrAxKExQHyxGc9wBqeEFK7TtmW98cX9VonoRm5jW4/SRSYqK3fgAXuPK+wiRmHfnOzWxJXQ/KIKLiF91pl/8UeqovlRR+vbTHzjpZvSlGL1Xu9fz6DiqpQXkygh5vYn4GFj3YniOusTf8RmmaHmZ+4smAu3PxSg+fVPpRvWSuuLIqTMg==
  timestamp: "2018-08-06T21:27:29.791238974Z"
  title: created dataset
qri: ds:0
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

As we learned before, the dataset file will contain the following, if it exists in the dataset: `bodyPath`, `commit`, `qri`, `structure`, `metadata`, `viz`, and `transform`.

Right now, this dataset contains a `bodyPath`, `commit`, `qri`, and `structure`.

Let's add some detail. First, let's add some proper column names to the `schema` section of the `structure`.

The dataset contains the standings, names, abbriviation, wins and losses, for the North American League Championship Series, or the North American pro League of Legends esports league. Let's fill in the column names.

Notice how we didn't have to create the schema or structure. If not provided, Qri will determine the structure of a file itself. JSON files will be recorded as an array or an object, but not more specific than that as of the time this tutorial was written. CSV files will be traversed and the title and type of each column will be determined.

The correct column titles have been filled in below:

``` yaml
 bodyPath: /ipfs/QmPBQKHc2os92kTKzdJ8xGdyP6mo6JAT9d7QncEzYSSGCM
commit:
  author:
    id: QmTXF6LzpCFK87Ykq7WR7hjzCvNXWGXZ2ssJZwRiPiMSN9
  qri: cm:0
  signature: zHgYne5lRdftX5CV/RkRbuWloRm0LvjFzdmo25XqTIBEqhVW0ywhy/yl+rmVvOJo26mJbvwUN8QwxLllpEVkv5YHYCQhxWu/8+RpGKuMJFzhjB/pRhw4+ykjxRGe/zLLkaN97uAq+fnjR7Ld0VKMkuSEtpuVkpguiyjxrEfrAxKExQHyxGc9wBqeEFK7TtmW98cX9VonoRm5jW4/SRSYqK3fgAXuPK+wiRmHfnOzWxJXQ/KIKLiF91pl/8UeqovlRR+vbTHzjpZvSlGL1Xu9fz6DiqpQXkygh5vYn4GFj3YniOusTf8RmmaHmZ+4smAu3PxSg+fVPpRvWSuuLIqTMg==
  timestamp: "2018-08-06T21:27:29.791238974Z"
  title: created dataset
qri: ds:0
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
```

Next, let's talk metadata. Metadata is super important. It's the place where whoever gathered the data (or whoever is augmenting it) can give background and context on what the data contains, how it was collected, who collected it, and any other details that need recording.

Datasets can be written as `json` or ` yaml` files. Here we will write them in yaml, as that is the Qri default. For more on the structure of yaml files, check out [this page on yaml syntax](https://docs.ansible.com/ansible/latest/reference_appendices/YAMLSyntax.html).

 

Save your new and improved `dataset.yaml` file, and you are ready to go.

Go back to your trusty terminal. My `dataset.yaml` file still lives in my nalcs_standings folder, along with the body file:`data.csv`. We are going to need both a dataset file and a body file to run this next step:

```
$ qri new --body /users/home/nalcs_standings/data.csv --file /users/home/nalcs_standings/dataset.yaml me/nalcs_standings
created new dataset me/nalcs_standings@QmTXF6LzpCFK87Ykq7WR7hjzCvNXWGXZ2ssJZwRiPiMSN9/ipfs/QmbQqBFc3HLHXwEKssYr4W9AayUJRe8sPZjUtZZ31uNntW
```

Note, you can also add a commit message and title using the command line flags `title` and `--message`

For example:

```
$ qri new --body /users/home/nalcs_standings/data.csv --file /users/home/nalcs_standings/dataset.yaml me/nalcs_standings --title 'initial dataset' --message 'week 7 NALCS standings for the 2018 summer split' me/nalcs_standings
```

...would give you the same dataset, but with a custom title and message. If no title or message are given, Qri will generate a title for you.

You can also add a commit messsage and title to the dataset itselfs:

```
commit:
  title: initial dataset
  message: week 7 NALCS standings for the 2018 summer split
```

Note!!! Any flags given in the command will override the message given in the `dataset.yaml` file!!!


### 2.3 validate

Okay, so we've added a new dataset into Qri. What happens when you want to update that dataset?

The stats from the sample dataset I gave were the NALCS standings until week 6. After week 7 the standing shifted. Let's update the `nalcs_standings` dataset to include the week 7 results.

Save this as a new file `NALCS_Summer_2018_Week_7_Standings.csv` (or you can save over your old file with this new data, since the old version is in Qri, you can export the standings from week 6 any time you like):

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

Now, to make sure we haven't made any silly mistakes let's validate this new body of data against the schema already present in the `nalcs_standings` dataset.

```
$ qri validate --body ~/Documents/datasets/NALCS_Summer_2018_Week_7_Standings.csv me/nalcs_standings
✔ All good!
```

Notice that, like the `qri new` command or the `qri remove` command, we pass the peername and dataset name (in this case `me/nalcs_standings` or `tutorial/nalcs_standings`) as an argument to the command.

Let's say instead, we have a dummy file called `dummy.csv` that we want to validate against the structure of the `nalcs_standings` dataset. Let's say this file contains the following:

```
Bad,data
that,doesn't
make,any
sense,
```

```
$ qri validate --body ~/Documents/datasets/dummy.csv me/nalcs_standings
0: /0/0: "Bad" type should be integer
1: /1/0: "that" type should be integer
2: /2/0: "make" type should be integer
3: /3/0: "sense" type should be integer
```

The output of the command gives the errors that need to be fixed in order for the schema to match.

### 2.4 qri save

Now that we know the dataset has no validation errors, let's give it an update.

I want to update this dataset with new data in the body. I also want to add a title and message to this version of the dataset, which we call a `commit` (those of you familiar with other version control systems, specifically [git](https://git-scm.com/) will recognize that lingo).

We can add a title and message in two ways. We can also add a `dataset.yaml` file that contains a `commit` section with a `title` and a `message` field. Or we can fill in a `title` and `message` using the `--title` and `--message` flags when we run the command.

Here is the potential dataset.yaml file:

```
commit:
  title: body update
  message: dataset has been updated with the week 7 match results
```

```
$ qri save --file ~/path/to/dataset.yaml --body ~/path/to/NALCS_Summer_2018_Week_7_Standings.csv me/nalcs_standings
```

And without the `dataset.yaml` file:
```
$ qri save --body ~/path/to/NALCS_Summer_2018_Week_7_Standings.csv --title 'body update' --message 'dataset has been updated with the week 7 match results' me/nalcs_standings
```

How do we know that the commit message saved correctly? To check, let's use the `qri get` command (which we will go over in more detail in section 4)  

```
$ qri get me/nalcs_standings
tutorial/nalcs_standings@QmTXF6LzpCFK87Ykq7WR7hjzCvNXWGXZ2ssJZwRiPiMSN9/ipfs/QmfWruGxeQZtqy4513G2agKka9GX6f2CuQ88Mjp31wwwtu:
  bodyPath: /ipfs/QmPBQKHc2os92kTKzdJ8xGdyP6mo6JAT9d7QncEzYSSGCM
  commit:
    author:
      id: QmTXF6LzpCFK87Ykq7WR7hjzCvNXWGXZ2ssJZwRiPiMSN9
    message: dataset has been updated with the week 7 match results
    path: /ipfs/QmZB2diMaX2QkJ5iMw8mHjR3DL2V99FejoH4wuUxojhMeM
    qri: cm:0
    signature: lYLaLSFquDBdWMkzkwOXPNo5cUljH8U91Ht0KjESgsYem3r6XSEvPMD5EImlmvXGirbIq6rZKZhsIoTE4JP0alSId9Ndv3q8N7/cU6xdrQ5Kz1bgSCP5c2Min/jqiZ7HsdJdbRp1WR5oxQqjhEvUgkGTHbNqtpRqYSQNeESTB/AATzYRtb78AbPzWbD6pSEGSp4R/8i0QQyq9YPghw6GiuCJJrFzr727e0E1gPWNCii59jS1WdZ2nL6Z8Y7kPthUT6hmx/1adl72v1VMWsYJdeaI11bd+PWFVL87+MNoePlEyNcOfEkhEx3wxYEphWegbqk/3qsujrblOwMUrDQ9mg==
    timestamp: "2018-08-07T19:05:41.432138675Z"
    title: dataset update
  path: /ipfs/QmfWruGxeQZtqy4513G2agKka9GX6f2CuQ88Mjp31wwwtu/dataset.json
  previousPath: /ipfs/QmbQqBFc3HLHXwEKssYr4W9AayUJRe8sPZjUtZZ31uNntW
  qri: ds:0
  structure:
    checksum: QmZx6AwxGgkeZDaZb9NaVxvB8NZVzjo7CiyRMWGwynnNmj
    entries: 10
    errCount: 0
    format: csv
    length: 211
    path: /ipfs/QmWLLipjATTJXEjEWp691bCJXLqZRMURtfYK11ejwPVzJX
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
