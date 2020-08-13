---
metaTitle: "Pushing Datasets"
metaDescription: "How to push a dataset to Qri Cloud"
qriVersion: "0.9.9"
qriDesktop: "0.4.2"
---

import InfoBlock from '../../../src/components/InfoBlock.js'

_Pushing_ a qri dataset from your local machine makes use of [Qri Cloud](https://qri.cloud), our global platform for finding and sharing datasets. Pushing does a couple of things:

- It copies the bytes for a dataset to Qri Cloud, effectively backing up and serving the dataset on the Qri network
- It creates a _dataset preview_ page at `https://qri.cloud/{username}/{datasetname}`, where other users can preview the dataset before downloading it.
- It makes the dataset discoverable using search in Qri Cloud and [Qri Desktop](/download).

<img src="/img/cli-cloud-publish.png"/>

## Pushing in Qri Desktop

## Pushing in Qri CLI

Use the command `qri push` to push the latest version of a dataset.

<InfoBlock type='warning'>
  Qri Cloud is currently in alpha status and is experimental.  All data on Qri Cloud is public. Be careful when pushing your datasets.
</InfoBlock>

```
$ qri push foo/simple_csv
pushed dataset foo/simple_csv@/ipfs/Qme1KedPB7assGKfznH5jQb1vGsZyNkcwVkkGpuhrq2XYp

```
