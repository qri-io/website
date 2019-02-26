---
title: "Frequently-Asked Questions"
date: 2019-02-25T00:00:00-04:00
draft: false
layout: faq
description: we try to answer frequent questions here, tweet @qri_io if you think something's missing!
---

#### Is qri a blockchain?
Nope.

#### What’s a dataset?

Datasets are a data structure that is broken up in a way that allows us to link changes between parts of that data structure on a content addressed file system, preserving links in certain ways. 
With a dataset we have the underlying data, its structure which contains the structure & schema of the data.

All datasets have at most 6 components. The most important ones are:

- Body - The ‘body’ is what most people might call the ‘data’ itself. It’s the rows or columns that organize records, or observations — the underlying content within the cells of a table, eg: a csv file.
- Metadata - Human-oriented description of the data, eg: title, author, date created, category. Metadata describes or contextualizes the ‘body’.  Metadata includes everything from the title, the source, the author(s), publication date, notes, methodology and on and on. We’ve based our metadata fields on the DCAT specification.
- Structure - Machine-oriented description of the data. A dataset’s structure defines what kinds of data live inside the body - numbers (integers, decimals), strings, arrays, etc. eg: “the third column in this table is a date.”
- For more on the other components, see our handy, if super dense Docs section: https://qri.io/docs/


#### What does version control mean?

Like git or github (if you're familiar with them), Qri keeps snapshots of datasets at different (chosen) points in time, allowing you to see how a dataset has evolved. 

We’re hoping to do for datasets what Github did for open-source software. Qri provides a reliable way for peers to share datasets publicly or with select peers, and allows users to find, edit, and manage versions of whatever datasets they find or publish to the network. Qri tracks all aspects of a dataset’s changes, including metadata, authors, and the data itself. All datasets conform to schema standards so the network of files can interoperate.

#### What's the main value users can get out of using qri?

Trust. Trust in both a dataset's provenance (source and authenticity - a.k.a. where it came from) and evolution (version control - a.k.a. what, if anything, has been done to it e.g. cleaning, transformations). 

If we promote trust and confidence in these areas, users can build on each others' work (and prevent duplicative work), ask new and better questions, and unearth new insights from the mountains of data we generate and work on together.


#### Where does my data live?

Data on qri lives *inside an IPFS repository.* I know, that sounds a little scary. Cutting to the chase, if you want to get data out of qri, check out qri export. If you want to get data *into* qri, checkout qri add.

The longer story is the data you add to qri lives on your computer, and is made available on the distributed web.


#### Do you consider the Dat project an alternative to IPFS?

We reviewed both Dat and IPFS white papers at the same time, and keyed in on one major feature of Dat which made it incompatible with the scope and goals we had for Qri out of the gate.

Dat, like git, uses a repository model. So, if a user were to create a dataset containing a certain csv file, and another user had the exact same csv file (because, say, they were both downloaded from the same URL around the same time), the files would not ‘collide’ - meaning both physical files would not deduplicate, and storage costs (and all other complications) would scale as more datasets are added to the network by other users.

In an ideal data commons, identical datasets would collide and deduplicate to a single file on one’s hard drive. That doesn’t happen with Dat, BitTorrent or several others. The only technology that has that key property is IPFS, because of the ‘single swarm’ style of content propagation.

We’re really impressed with the Dat community and the aims of the project as a whole, and eventually we’d like to be able to support exporting to Dat from qri.


#### What kinds of data does qri support?

ALL kinds of data! We're rapidly building in support for every and any kind of data. Today, qri works best with CSV & JSON files - you can put all kinds of data in CSV & JSON files.


#### Who can see my data?

Currently **all data on qri is public.** We’re working on support for both encrypted data and private networks. You can track the progress of encryption and private networks feel free to +1 any of those comments to let us know you want them faster.


#### How much does it cost?

It’s free! Really! Qri is free forever, all you need to bring is your own hard drive.


#### How much Data can you store in Qri?

As much as your hard drive(s) can hold.

#### What is the distributed web? And why is qri built on it?

The distributed web, or more accurately ’a’ distributed web is simply a linked network of ‘nodes’ or computers. It’s simply an internet that allows computers to talk to one another directly without going through a centralized server (often owned / managed by a single individual or organization). In qri’s case, our network is built on IPFS – the Interplanetary File System.

We built qri on IPFS for two important reasons. The first is content addressing - the ability to identify content by WHAT it is, rather than WHERE it is (traditionally, its URL). If you visit a dataset stored on a URL today and again in 2 weeks, how can you identify what has changed? IPFS makes knowing what’s changed possible, and makes an incredible foundation for a data commons. 

Secondly, decentralized storage means that the amount/size of datasets qri can support is limited only by the hard drive space offered to the network by peers. Centralized storage (offered by a company or org) is always limited by the amount they can afford to provide. Qri isn’t limited by this.

#### Can I upload / connect data directly to and from [my favorite app]?

We plan to support apps and software popular among data folks like… Jupyter Notebook, R, and many others. Be sure to stay in the loop on updates and let us know which apps are most important to you. 

If you’re into writing libraries, qri comes with a command line client, JSON API, and RPC API intended for these exact purposes.


#### Are you open source?

Oh we’re glad you asked. We’re *so* open source. Join the party over at https://github.com/qri-io


#### How do you make money?

If you want a private version of qri for your company, school, startup, teen pop band, hedge fund, whatever. Give us a call. 


#### What's next for qri?

As an open project, we do our best to share what we're up to on our blog, via twitter, and through our github. We also address questions/issues raised by our community of users on Discord. If what you've learned so far excites you, we encourage you to follow us and even consider contributing.



