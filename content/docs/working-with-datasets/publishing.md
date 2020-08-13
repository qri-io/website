---
metaTitle: "Pushing Datasets"
metaDescription: "How to push a dataset to Qri Cloud"
qriVersion: "0.9.11"
qriDesktop: "0.4.4"
---
import ImageWithCaption from '../../../src/components/ImageWithCaption.js'
import InfoBlock from '../../../src/components/InfoBlock.js'

<InfoBlock type='warning'>
  All data on Qri Cloud is public. Keep that in mind when pushing your datasets. Contact hello@qri.io to learn how Qri plans to support private, encrypted data repositories.
</InfoBlock>

_Pushing_ a qri dataset from your local machine makes use of [Qri Cloud](https://qri.cloud), our global platform for finding and sharing datasets. Pushing does a couple of things:

- It copies the bytes for a dataset to Qri Cloud, effectively backing up and serving the dataset on the Qri network
- It creates a _dataset preview_ page at `https://qri.cloud/{username}/{datasetname}`, where other users can preview the dataset before downloading it.
- It makes the dataset discoverable using search in Qri Cloud and [Qri Desktop](/download).

<img src="/img/cli-cloud-publish.png"/>

## Pushing in Qri Desktop

From the Workbench page, click “Push” to push the latest version of that dataset. More details in [the quickstart](https://qri.io/docs/getting-started/qri-desktop-quickstart#push-to-the-qri-network--qri-cloud).

<ImageWithCaption src='/img/screenshots/publish.png' shadow/>

## Pushing in Qri CLI

Use the command `qri push` to push the latest version of a dataset. More details in [the quickstart](https://qri.io/docs/getting-started/qri-cli-quickstart#push-to-qri-cloud).

```
$ qri push foo/simple_csv
pushed dataset foo/simple_csv@/ipfs/Qme1KedPB7assGKfznH5jQb1vGsZyNkcwVkkGpuhrq2XYp
```
