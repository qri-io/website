---
title: "dataset"
description: what's a dataset?
bref: what's a dataset?
date: 2018-01-30T00:00:00-04:00
weight: 1
draft: false
---

The word _dataset_ is vague, but it does have a "natural" meaning to most people. When I think of a "dataset", I generally picture a spreadsheet. Spreadsheets are organized into cells, which are an example of a way to _structure_ data. Not all datasets are spreadsheets, but all spreadsheets are datasets.

In contrast, I don't think of a text document as a dataset. But a text document _is_ organized, right? I mean, there's a order to the words in the document, and it has headers that help find places in the document. So what gives, why isn't a document a dataset?

To me a spreadsheet is a dataset because it's organized in a way that invites _more than one interpretation_. This contrasts with a text document, which is "organized" in the sense that the words in the document follow an order, but that order has only one meaningful interpretation (reading the text). One "reading" of a spreadsheet might be totaling the number of expenses, another might be calculating the average expense. So that's where we start when talking about datasets, a dataset is a _document_ that could be interpreted in more than one way. If it only has one meaningful interpretation, it's not a dataset.

If that sounds abstract, that's on purpose. Because a dataset can be about so many different things, and take on many different structures. I want you to hang onto this question of "can I interpret this more than one way?" as the starting point for what a dataset is. Because as you'll see we can do normal "spreadsheet stuff" with qri, and that's fine and dandy, but there are lots of places where you'll want to structure a dataset in ways that are more complicated than traditional spreadsheets, and while qri can handle that, the concepts can always be explained with this spreadhseet / text document metaphor.

A qri datset starts here, every dataset qri builds on a single _document_ (a document is the same as a _file_, but document is more correct for reasons that we'll get into later). Enhancing it with things you'll want and need to make working with datasets easier.

A dataset in qri has up to 6 components, not all of components are required, and some are generated for you, but it's worth understanding what each can do. Here's a diagram of a dataset with all 6 components:

<div class="diagram">
  <img src="/graphics/site_diagrams/dataset_cm_md_vc_tf_st_data.svg" title="components of a dataset" />
</div>

A brief description of each component:

* Data is the actual data in a dataset. Currently it's either a CSV or JSON file.
* Structure is a definition the dataset that machines use. It includes a description of the data _format_ (CSV & JSON are examples of data formats), and a schema. More on shemas later.
* Metadata keeps information about the dataset intended for other humans. It's stuff like the dataset title, description, tags, etc.
* Commit records changes, namely who made a set of changes, and when they made them.
* If this dataset was created as the ouput of some machine process, transform records details about how that process was accomplished so we can repeat it when data changes.
* VisConfig records info about how to build visualizations of this dataset

We'll go into detail on what each of these mean, but I want to tell you right now that the amount you'll work with each component is roughly in that order. Data, and metadata are important, and we'll spend a lot of time on those. Structure is a little scary, but you may be relieved to know that qri largely handles structure for you until you're ready to do more complicated stuff. Commit is generated for you, and we haven't even finished building transform & visconfig yet, so there's no need to worry about those for the moment. To make things easier, here's a diagram of a dataset that has no transform or visconfig components:

<div class="diagram">
  <img src="/graphics/site_diagrams/dataset_cm_md_st_data.svg" title="components of a dataset" />
</div>

### Dataset
In qri land a dataset is a thing that contains these components. So a dataset has data, it also has structure, and metadata, etc. For more detail on each component, check the [dataset docs](/docs/datasets)



### Technical Definition

Dataset is a description of a single structured data resource. with the following properties:

* A Dataset must resolve to one and only one entity, specified by a `data` property.
* All datasets have a structure that defines how to intepret the data.
* Datasets contain descriptive metadata
* Though software Dataset metadata is interoperable with the DCAT, Project Open Data,
  Open Knowledge Foundation DataPackage and JSON-LD specifications,
  with the one major exception that content-addressed hashes are acceptable in place of urls.
* Datasets have a "PreviousPath" field that forms historical DAGs
* Datasets contain a "commit" object that describes changes over time
* Dataset Commits can and should be author attributed via keypair signing
* Datasets "Transformations" provide determinstic records of the process used to
  create a dataset
* Dataset Structures & Transformations can have Abstract variants
  that describe a general form of their applicability to other datasets
Finally, commit messages should also be able to interoperate with git commits