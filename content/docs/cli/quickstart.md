---
title: "Quickstart"
description: ""
date: 2018-01-30T00:00:00-04:00
weight: 1
---

# Qri CLI Quickstart
Let's take a tour through the Qri Command line client.

## Setup Qri
First, you'll need the latest CLI binary. head over to our [releases page](https://github.com/qri-io/qri/releases/tag/v0.7.1) and install the binary somewhere on your `$PATH`. You should be able to type `qri help` and see a nice introductory message.

Before we can do useful things with Qri, we need to set it up. So let's start by running setup:
```text
$ qri setup
```
Qri will ask you to pick a peername, this is your "handle" on qri. If you don't want to choose one, just hit enter & Qri will use the random peername shown to you in the prompt. Changing your peername is a bit of a pain, so it's worth taking the time now to find one that works for you.

## Add your first dataset
Now let's get our first dataset. We'll start by searching Qri for published datasets we can use.

```text
$ qri search 'world'
1. b5/world_bank_population
   World Bank Population
   138 KBs, 264 entries, 0 errors
```

Your results may vary, but let's use this world bank population dataset as an example. To get this dataset onto your computer, add it by referring to it's name: 'b5/world_bank_population'.

```text
$ qri add 'b5/world_bank_population'
⠂    fetching 6 blocks
🗼 fetched from registry
1  b5/world_bank_population
    /ipfs/QmfNtuo5XQvZb3q4zGEpXcrvZRCLPz6SWBz9b44wWGp4N2

Successfully added dataset b5/world_bank_population@QmSyDX5LYTiwQi861F5NAwdHrrnd1iRGsoEvCyzQMUyZ4W/ipfs/QmfNtuo5XQvZb3q4zGEpXcrvZRCLPz6SWBz9b44wWGp4N2
```

Voila! you now have a world bank population dataset on your computer. All steps after this will operate on data stored locally in your Qri repository.

** **

## Inspecting datasets:
Let's look at the dataset we just added by getting an overview of it's contents, printed in YAML format:
```text
$ qri get b5/world_bank_population
```

The output of `get` can sometimes be a lot to look at. We can _select_ parts of a dataset using `get` to look at specific components. For example, the `meta` component, this time in json format:
```text
$ qri get meta --format=json b5/world_bank_population
``` 

We can also use `get` to look at the body of a dataset (aka "the data"), here we'll limit to a 1-row preview:
```text
$ qri get body --limit 1 b5/world_bank_population
``` 

This dataset is in CSV format, let's convert it to JSON:
```text
$ qri get body --format json --limit 1 b5/world_bank_population
``` 

This dataset also includes a transform script that lets it self update. We can see the code for that script by `get`ing `transform.script`:
```
$ qri get transform.script b5/world_bank_population
```

`get` is Qri's tool for inspecting datasets from the command line. Next let's look at how to get data out of qri for use elsewhere.

** **

## Exporting datasets:
Let's put that data in a form we can use somewhere else, starting by just getting the "body" csv file. Exporting individual components of a dataset again, just uses `get`. Here we write the output to a file called `world_bank_pop.csv`.
```text
$ qri get body --all b5/world_bank_population > world_bank_pop.csv
```

To export a full dataset, use `qri export`. Here we'll export as json:
```text
$ qri export --format=json b5/world_bank_population
```

Or how about excel:
```text
$ qri export --format=xlsx b5/world_bank_population
```