---
title: "faq"
date: 2018-01-30T00:00:00-04:00
draft: false
---

#### Is qri a blockchain?
No.

## What’s a dataset?

Datasets are a data structure that is broken up in a way that allows us to link changes between parts of that data structure on a content addressed file system, preserving links in certain ways. 
With a dataset we have the underlying data, its structure which contains the structure & schema of the data.

All datasets have several parts:

- Body - eg: a csv file
- Metadata - human-oriented description of the data, eg: title, author, date created, category
- Structure - machine-oriented description of the data, eg: “the third column in this table is a date”


## What does Version Control Mean?

Like git or github (if you're familiar with them), Qri keeps snapshots of datasets at different (chosen) points in time, allowing you to see how a dataset has evolved. 


## Where Does My Data Live?

Data on qri lives *inside an IPFS repository.* I know, that sounds a little scary. Cutting to the chase, if you want to get data out of qri, check out qri export. If you want to get data *into* qri, checkout qri add.

The longer story is the data you add to qri lives on your computer, and is made available on the distributed web.


## What kinds of data does qri support?

qri works with CSV & JSON files. you can put all kinds of data in CSV & JSON files.

## Who Can See My Data?

Currently **all data on qri is public.** We’re working on support for both encrypted data and private networks. You can track the progress of encryption and private networks feel free to +1 any of those comments to let us know you want them faster.

## How much does it cost?

It’s free! Really! Qri is free forever, all you need to bring is your own hard drive.

## How much Data can you store in Qri?

As much as your hard drive(s) can hold.


## Can I upload / connect data directly to and from [my favorite app]?

We plan to support apps and software popular among data folks like… Jupyter Notebook, R, and many others. Be sure to stay in the loop on updates and let us know which apps are most important to you. 

If you’re into writing libraries, qri comes with a command line client, JSON API, and RPC API intended for these exact purposes.


## Are you Open Source?

Oh we’re glad you asked. We’re *so* open source. Join the party over at https://github.com/qri-io

## How do you make money?

If you want a private version of qri for your company, school, startup, teen pop band, hedge fund, whatever. Give us a call. 