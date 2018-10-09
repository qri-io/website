---
title: Distributed Storage
date: 2018-01-30T00:00:00-04:00
section: concepts
---

# Going Distributed Makes Data Free & Dependable

Qri doesn’t need a central server to work, instead it's built in a distributed, peer-2-peer architecture that moves data by connecting computers directly. By connecting computers directly, we make storing data on Qri free, because datasets don't have to be stored in the cloud. Your “payment” is the hard drive space to store the data you want to keep. This frees up datasets to get as big as they need to be, and stored wherever makes the most sense.

<hr class="clear" />

### How Distributed Storage Works

<div class="diagram medium right">
  <img src="/diagrams/qri_repo.png" />
</div>

A Qri “repo” is an organized collection of blocks on your hard drive that make up datasets. When you talk to Qri, you ask for datasets, Qri handles the process of breaking up data into blocks & deduplicating dataset versions for storage.

<div class="clear"></div>

<div class="diagram micro left">
  <img src="/diagrams/qri_ipfs_repo_combo.png" />
</div>

[IPFS](https://ipfs.io) stands for the Inter Planetary File System, it’s a content-addressed, distributed internet. IPFS is very fun, and well worth reading about. Qri leverages the content-addressing scheme of the distributed web to provide global, immutable identifiers for datasets. By default Qri is configured to use IPFS as its “distributed web implementation”, but is architected to support multiple content-addressed storage formats

Qri defaults to storing those blocks in an IPFS repo, which comes in very handy when you want to send a dataset to someone else, or get datasets from the distributed web. 

<hr class="clear" />

### Connecting Qri Peers

<div class="diagram medium right">
  <img src="/diagrams/qri_on_ipfs.png" />
</div>

When it's time to share & download datasets, Qri repos can connect to the distributed web, and become a peer in a network of data exchange, working with both IPFS and Qri peers. Qri peers are able to do special things like sync & preview datasets _and_ behave like a traditional IPFS peer.

Peers connected in your home, offices, school or lab will be faster because they’re closer together. Qri will work without a connection to the broader internet. When you work with a dataset that you've stored locally, the network isn't involved at all, which makes accessing data quick, and again cuts the cost of access to zero.

Going distributed also has the added benefit of making datasets _immutable_. Meaning they can't change without your knowledge. If you can trust a dataset, you can build on it.

<!-- #### Under The Hood: Content-Addressing & Block Storage
Qri leverages the content-addressing scheme of the distributed web to provide global, immutable identifiers for datasets. By default qri is configured to use IPFS as its “distributed web implementation”, but is architected to support multiple content-addressed storage formats. -->