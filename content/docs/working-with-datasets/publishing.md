---
metaTitle: "Publishing Datasets"
metaDescription: "How to publish a dataset to Qri Cloud"
---

import InfoBlock from '../../../src/components/InfoBlock.js'

_Publishing_ a qri dataset from your local machine makes use of [Qri Cloud](https://qri.cloud), our global platform for finding and sharing datasets.  Publishing does a couple of things:

- It copies the bytes for a dataset to Qri Cloud, effectively backing up and serving the dataset on the Qri network
- It creates a _dataset preview_ page at `https://qri.cloud/{username}/{datasetname}`, where other users can preview the dataset before downloading it.
- It makes the dataset discoverable using search in Qri Cloud and [Qri Desktop](/download).

<img src="/img/cli-cloud-publish.png"/>

## Publishing in Qri Desktop

## Publishing in Qri CLI

Use the command `qri publish` to publish the latest version of a dataset.

<InfoBlock type='warning'>
  Qri Cloud is currently in alpha status and is experimental.  All data on Qri Cloud is public. Be careful when publishing your datasets.
</InfoBlock>

```
$ qri publish foo/simple_csv
published dataset foo/simple_csv@/ipfs/Qme1KedPB7assGKfznH5jQb1vGsZyNkcwVkkGpuhrq2XYp

```
