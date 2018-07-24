---
title: "overview"
description: ""
date: 2018-01-30T00:00:00-04:00
section: concepts
---

# What is Qri ("query")?

Qri is a distributed dataset version control system built with peer-2-peer data exchange. _Peers_ create _datasets_, which are stored in _versions_. Qri peers form a _distributed network_ to exchange information about their datasets, which they transmit between each other over _the distributed web_.

_Datasets_ are recorded structured data according to a specification that dictates the purpose of each component piece of a dataset. By design, qri can only store datasets. Unlike general version control systems, all datasets stored in qri can interoperate because they have the same composition. Datasets are stored & transmitted in standard formats, allowing outside systems to bypass qri entirely to interact directly with datasets qri produces & consumes. The Dataset specification is itself a composition of existing specifications, aimed at providing the highest degree of natural agreement possible with existing data catalogs, metadata schemas, and meta-API specifications.

All datasets on qri are immutable. Datasets are identified by their cryptographic hash, and assume they are being stored on a content-addressed file system (content is referred to by cryptographic hash). Changes to datasets are stored by creating a new version of data that references the previous version. All Versions of Qri includes a _naming system_ that connects human-readable names to the latest version ("tip") of a dataset history of qri datasets are tracked & attributed, signed with a keypair associated with the _Peer_.

Qri leverages the content-addressing scheme of the distributed web to provide global, immutable identifiers for datasets. By default qri is configured to use IPFS as it's "distributed web implementation", but is architected to support multiple content-addressed storage formats.

Peers can opt into _registries_ that reinforce the network, providing a social governance structure & features like search & high-uptime. Registries are built on a federated model where participating peers can communicate with registries for a layer of insulation against bad actors.

Dataset _transformations_ describe automated methods for producing a dataset that qri can execute. When a dataset specifies a transformation, the tranformation is excecuted once, and both the result & transformation itself are embedded within the dataset version. Transformations must produce exactly one dataset as their result, and can depend on zero or more datasets during their execution. These dependent datasets are recorded to form a dependency graph which, when combined with versioning allow qri to automatically check for changes to dependant graphs and re-execute changes as required.
