---
title: "Datasets Are Books, Not Houses"
date: 2017-10-30T00:00:00-04:00
draft: false
author: b5
description: What's content addressing? What does it have to do with datasets? Why am I on this site in the first place? Read on, dear reader. Read on.
---

The world of linked data is built on shaky foundations that prevent a true data commons from emerging. The problem isn’t with the data, but with the way data is linked. Specifically, the way links are *addressed*.

An address is a uniform, shorthand way of referring to things. Geographic addresses are an obvious example. 1600 Pennsylvania Ave. is the address of the White House. 268 Elizabeth St. is the address of my childhood home. These houses are different in size and function, but they are both locations with addresses that adhere to a (relatively) consistent system. Addresses make it easier to refer to places.

The internet today is location addressed. Youtube.com and Boingboing.net are locations. We refer to content like a video or a blog by its *universal resource locator* (URL). Much like my childhood house, the internet is organized around the location of content. 

Location addressing works well for many purposes, but it’s a poor system for linked data for two important reasons: link rot and content drift. A rotten link is a location on the internet that has become permanently unavailable, the classic “404, not found” you see all the time. Link rot is [pervasive](http://ssnat.com/) on the internet, and in the context of data it’s deeply problematic, as it amounts to a missing dependency.

Content drift is arguably the more insidious problem. It’s completely possible that by now someone has demolished my childhood home and replaced it with a different house. In this case the address is the same, but the content has *drifted*, taking on a different meaning since I last visited. In the data context, the cognitive and procedural overhead of confirming that data exists *and hasn’t changed* dissuades us from taking on the challenge in the first place.

**These problems have balkanized theopen data landscape.** Because it’s not possible to build a sufficient reliable system that spans across locations and services, data providers have very little incentive to depend on each other.

So, what’s the alternative? 

Location addressing is so ingrained in our understanding that it may take a bit of “unlearning” to recognize that other, alternative addressing systems exist.  One alternative system for books could be by title. Books have a title, author, publisher, and an ISBN number. The title of a book is a meaningful reference of what’s inside it. *The Cat in The Hat* is indeed a book about a cat, wearing a hat. Because of this, we can say books are *content addressed*. Content addressing is referring to something by *what* it is instead of *where* it is.

It seems silly to ask for the Universal location of a book because any copy of the book will suffice. The location is irrelevant, so long as the content behind an address is the same. If I ask someone for their copy of *The Cat in the Hat* and they hand me a copy *Pride and Prejudice*, I would immediately know they have the wrong address.

**The distributed web is built on content addressing.** In practice this means referring to content by its *hash.* A hash is the output of running content through an algorithm that creates a fixed-length “fingerprint” of the content. The algorithm is a fixed procedure that connects content to this fingerprint, and changing *anything* *(a pixel shade, a punctuation mark, a decimal point)* in the content will change the resulting hash. Because the algorithm is a fixed open procedure, hashes can be independently verified.

Switching from location addressing to content addressing has a *decentralizing* effect. Being freed from concerns of location every “download*”* of a dataset can be used to make that dataset available, fighting link rot.  What’s more, content drift on the distributed web is simply not possible, because content cannot be changed without changing the address.  And that’s just the beginning. 

Content addressing facilitates *shared dependencies*. Because 1) someone can share with me an exact, authoritative copy of their dataset, and 2) she cannot change the data without me knowing, I can depend on it. As soon as I can depend on someone else’s data, that’s one less dataset I have to create myself. I am now free to use that time to create or update other data that someone else may be able to use, simultaneously preserving resources and growing knowledge. 

Shared dependencies are the magic of open source software missing from open data. To pull this off **I’m proposing we build a piece of public infrastructure on the distributed web, namely** ***a dataset version control system*** **(DVCS).** 

What follows is a detailed overview of the technical details of how this DVCS is intended to be implemented.

**A fundamental goal of this dataset version control system is to** ***maximize hash collisions*** **in content-addressed networks, because hash collisions are what enable discovery and reuse of existing data.** The techniques described below are designed to ensure that datasets with identical characteristics, as well as semantically-equivalent queries for datasets, each resolve to the same hash even if the datasets are created by different parties in different locations at different times. These shared characteristics form a common lexicon that peers in a distributed network can use to compare datasets—and do that on an Internet-scale graph.

<div class="diagram">
  <img src="/graphics/diagrams/dataset_cm_md_st_data.svg" />
</div>

To maximize these hash collisions, the process of describing datasets and queries must be made precise and consistent. To the greatest extent possible, content and queries that are the same must produce the same hash value; thus, definitions of data resources and queries must follow carefully-defined conventions, and alternative forms must be limited.To compensate for this rigidity, dataset components are stored separately and then connected using separate mechanisms for linking and discovery. This leads to the four building blocks of a dataset: `Data`, `Structure`, `Meta`, and `Commit`.


## `Data` and `Structure`

Data has its natural meaning: a collection of raw values of *something*—numerical values, qualitative values, anything—organized in some systematic way. An example file format for storing data today is the CSV format, which consists of rows of numerical or text values separated by commas, with an optional first line containing column headings. Here is a fictitious example dataset named `precip`:

    lat,lng,precip_amt,date,note
    60.00,-50.049303,0,2017-02-14,no precip to report
    60.00,-50.049303,1014,2017-02-15,two storm cells observed
    ...

A `Data` object in a content-addressed file system will be a static object identified by a hash. Assume that this data file resolves to the following base58-encoded hash on the network:

    QmNk2XkDpn8vBantgpHt6B52kcyfHcQVJUF4QzDqjiGu52

As discussed above, this hash will be unique: any file whose computed hash matches the one above *will contain the same content*, no matter how or where it was created. It’s important to note that this system goes to great lengths to avoid altering the original data. Data added to the network without any modifications will naturally collide with others who may try to add the same file, allowing peers working with the same data to naturally find each other. 

Being able to interpret the bytes contained inside a given `Data` object requires additional information outside of the `Data` itself. This information is needed to provide precise details about how to interpret the content of a `Data` object. That is the purpose of `Structure`. It contains fields that indicate the format of a `Data` object, the character encoding, compression settings, etc. Here is an example structure expressed in a human-readable JSON format:


    {
      "qri" : "st:1.0",
      "format" : "text/csv",
      "formatConfig" : {
        "delimiter": ",",
        "doubleQuote": true,
        "lineTerminator": "\r\n",
        "quoteChar": "\"",
        "skipInitialSpace": true,
        "header": true
      },
      "encoding" : "utf-8",
      "compression" : "none",
      "schema" : {
        "type": "array",
        "items" : {
          "type": "array",
          "items: [
              { "title" : "lat", "type" : "number" },
              { "title" : "lng", "type" : "number" },
              { "title" : "precip_amt", "type" : "integer" },
              { "title" : "datestamp", "type" : "string" },
              { "title" : "note", "type": "string" }
            ]
        },
      },
    }

`Structure` contains information enabling software and users to read the content of a `Data` object. For example, `format` specifies how the data is stored; the field value is a MIME type value (e.g., `"text/csv"` for CSV). The related field `formatConfig` removes as much ambiguity as possible about how to interpret the specified `format` because some formats have a number of dialects, and variants need to be identified exactly.

These concepts apply just as easily to other data formats, and the structure specification is designed to accommodate interoperability. JSON, XML, Microsoft Excel(TM) Spreadsheets, sqlite files, are all examples of formats that `Structure` should be able to normalize by using the same approach.

 `schema` merits some additional explanation. All datasets are validated and interpreted using the JSON schema specification popularized by the Open API format. Many formats such as CSV do not internally define the data types of values nor provide a standard way of communicating this information, which forces the requirement to define an approach for externalizing it outside of a `Data` file. However, describing the format explicitly in a generalized way makes it possible to store and reuse those descriptions independently: they become another object in the content-addressed storage space, hashed and stored like everything else. While schemas are defined according to the JSON schema specification, they can be applied to a variety of data formats.

A `Structure` describes the form of a `Data` object. The two are connected, along with descriptive metadata: `Meta`, and a `Commit` object containing a creation timestamp, auto-generated message, and cryptographic signature of the peer who created the dataset.


<div class="diagram right">
  <img src="/graphics/diagrams/dataset_cm_md_st_data.svg" />
</div>


A `Dataset` must resolve to one and only one `Data` entity. This is accomplished by using the unique hashes of the associated `Data` and `Structure` objects. This separation of concerns achieves two important goals:

1. **The same data can be described by different metadata.** A repeated experiment may produce identical data, but it should be described differently if only to indicate different time stamps or conditions. Separating the description from the values saves storage and bandwidth because only the changes (the metadata) are stored separately, allowing peers to make different claims about the same data.
2. **Metadata formats can be changed****/****updated independently.** In many cases, data remains static after it’s gathered. Software frameworks, however, often change rapidly, and developers and users find needs to change and update metadata. With the separation described here, metadata can be changed without changing the underlying data objects. This not only saves resources, it makes clear in a concrete way that *it is the same data*. This also applies to structure and its schema object, allowing peers to change the way data is validated and interpreted without changing the data itself.


## Changes To Datasets

To retain a trail of changes, `Dataset` contains a field called `previous`, which references the hash of another `Dataset` object, and a field `Commit` that describes the changes, including a private-key signature of the peer that made the change. This establishes a directed, acyclic graph (DAG) of changes to any component of a dataset, whether this is the metadata, or the `Data`, or the `Structure`. For example, when changes are made to meta without changing the `Data` or its `Structure`, only the `commit` object needs to change, leaving references to the unaltered objects:


<div class="diagram">
  <img src="/graphics/diagrams/dataset_meta_change.svg" />
</div>

Versioning changes to large datasets sounds like a recipe to consume lots of hard drive space. Thankfully each change to data doesn’t necessarily add up to full content duplication. Because these files are intended to be sent over the distributed web, each file is actually itself a graph of objects, partitioned into chunks. Thanks to this chunking, data changes stand to naturally de-duplicate against prior versions.  Therefore changes to data over time take up less space than full duplicates of the data from version to version:

<div class="diagram">
  <img src="/graphics/diagrams/dataset_data_change.svg" />
</div>


Building open data systems that behave more like open-source code systems requires rethinking some assumptions. Content-addressed distributed networks allow us to question assumptions underlying today’s databased-backed open data systems. Deterministic querying could replace common architectural patterns with a more efficient and beneficial pattern that leverages content-addressed file systems such as IPFS. If successful, this can form the basis of an open data commons that naturally increases its capacity through use, for the benefit of all who use it, while still accommodating an evolving ecosystem of tools.

Deterministic querying will never eliminate all other database technologies, but rather reduce the need for large numbers of users to recreate identical accesses and encode/decode steps on the same data. Database accesses will still be needed for novel queries; the gains in reduced computation and network accesses will be realized when multiple distributed users or processes repeat the same queries. The reality today is that queries to content-addressed networks are likely to be slower than queries to local databases, but those losses will be offset by deduplication of data and other resource reduction in the aggregate. This form of deterministic querying deliberately accepts performance trade-offs for the sake of repeat-ability and interoperability.

Like anything, this approach will be best suited to certain cases. The efficacy of this technique is inversely correlated to how frequently the underlying data changes. Thankfully, most datasets fall into this category, including scientific research data, government data, industrial data, and so much more. A dataset version control system offers a way to build an open data commons to provide greater opportunity for the collective, accumulative advancement of open data.