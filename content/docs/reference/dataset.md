---
title: "dataset"
description: "dataset definition"
date: 2018-01-30T00:00:00-04:00
section: reference
---

# Dataset
A Dataset is a document for describing & storing structured data. Dataset documents are designed to satisfy the FAIR principle of being
Findable, Accessible, Interoperable, and Reproducible, in relation to other dataset documents, and related-but-separate technologies such as data catalogs, HTTP API's, and data package formats Datasets are designed to be stored and distributed on content-addressed
(identify-by-hash) systems The dataset document definition is built from a research-first principle, valuing direct interoperability with existing standards over novel definitions or specifications.

** **

## Dataset Sections:
Datasets are broken into sections. Each section has a different purpose:

### Body
Body is the principle content of a dataset. A dataset body is the subject which all other fields describe and qualify.

Supported Data Formats:

* CSV
* JSON
* CBOR

** ** 

### Commit
Commit encapsulates information about changes to a dataset in relation to other entries in a given history. Commit is directly analogous to the concept of a Commit Message in the git version control system. A full commit defines the administrative metadata of a dataset, answering _"who made this dataset, when, and why"_.

_Fields:_

* `author`: *Author of this commit*
* `message`: *Message is an optional*
* `qri`: *Qri is this commit's qri kind*
* `signature`: *Signature is a base58 encoded privateKey signing of Title*
* `timestamp`: *Time this dataset was created. Required.*
* `title`: *Title of the commit. Required.*

** ** 

### Meta
Meta contains human-readable descriptive metadata that qualifies and distinguishes a dataset.
Well-defined Meta should aid in making datasets Findable by describing a dataset in generalizable taxonomies that can aggregate across other dataset documents. Because dataset documents are intended to interoperate with many other data storage and cataloging systems, meta fields and conventions are derived from existing metadata formats whenever possible.

All of the meta fields below must be well-formed valid values. However: **The Meta section of a dataset supports arbitrary metadata**,

_Fields:_

* AccessPath: 
* AccrualPeriodicity: 
* Citations: 
* Contributors: 
* Description: 
* DownloadPath: 
* HomePath: 
* Identifier: 
* Keywords: 
* Language: 
* License: 
* ReadmePath: 
* Title: 
* Theme: 
* Version: 

** ** 

### Structure
Structure defines the characteristics of a dataset document necessary for a machine to interpret the dataset body.
Structure fields are things like the encoding data format (JSON,CSV,etc.), length of the dataset body in bytes, stored in a rigid form intended for machine use. A well defined structure & accompanying software should allow the end user to spend more time focusing on the data itself.

Two dataset documents that both have a defined structure will have some degree of natural interoperability, depending first on the amount of detail provided in a dataset's structure, and then by the natural comparibilty of the datasets.

_Fields:_

* Checksum: 
* Compression
* Encoding
* ErrCount
* Entries
* Format
* FormatConfig
* Length
* Schema

** ** 

### Transform
Transform is a record of executing a transformation on data. Transforms can theoretically be anything from an SQL query, a jupyter
notebook, the state of an ETL pipeline, etc, so long as the input is zero or more datasets, and the output is a single dataset
Ideally, transforms should contain all the machine-necessary bits to deterministicly execute the algorithm referenced in "ScriptPath".

_Fields:_

* ScriptPath: 
* Syntax: 
* SyntaxVersion: 
* Structure: 
* Config: 
* Resources: 

** ** 

### Viz
Viz stores configuration data related to representing a dataset as a visualization

**Viz Fields**

** ** 
