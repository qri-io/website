---
metaTitle: "What is Qri?"
metaDescription: "Qri is a distributed dataset version control and sharing system"
weight: 1
---

import InfoBlock from '../../../src/components/InfoBlock.js'

Qri (pronounced "query") is a distributed dataset version control and sharing system.  Our software helps to alleviate many of the pain points of working with datasets.

## The Qri Dataset Format

What's a dataset? Qri's definition of "dataset" contains _more than just data_.

Qri's dataset format combines tabular data with all of the things that are missing from normal CSVs.  These include metadata, user identity, column types, validation rules, update scripts, and more.  We refer to these parts as __components__.  

All of these components live together under a single structure. More importantly, they are all versioned together.

<InfoBlock>
  See <a href="/docs/dataset-components/overview/">Dataset Components</a> for more info on the building blocks of a Qri dataset.
</InfoBlock>

## Versioning

Qri datasets are versioned.  When you make a change to a dataset, whether it be reformatting values in a column or adding a description to the metadata, you must *commit* the changes and establish a *new version* of the dataset.

The version has a timestamp, your identity, and a message for future you (or other users you share the dataset with).

See [Versioning Datasets](/docs/working-with-datasets/versioning/) for more info on versioning in Qri.

<InfoBlock>
  See <a href="/docs/working-with-datasets/versioning/">Versioning Datasets</a> for more info on versioning in Qri.
</InfoBlock>

## Portability

Qri datasets are easily portable over Qri's peer-to-peer network.  This means that datasets and their version histories can be shared with other Qri users on a local network or published to Qri's cloud platform to share with the world.  

Likewise, once you have Qri running on your computer, you can pull down other Qri users' datasets to view and modify locally.

See [Publishing Datasets](/docs/working-with-datasets/publishing/) for more info on publishing your datasets in Qri.

## Conceptual Model

We combine networking, versioning, and our data format into a _network of datasets_  The qri data format combines raw data with critical supporting data, the version control system tracks changes and identity, and the network allows for decentralized sharing and transfer of datasets. Together, they represent a new way to work with datasets that enables better trust, availability, and accountability.

<img src="/img/qri_venn_diagram_white.png" width="60%" style= "margin: 0 auto; display: block;" />

## Get Started with Qri

You can start bringing your datasets into Qri right now!  [Download Qri Desktop](/download/) for free, import a CSV, and make your first dataset version.
