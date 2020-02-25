---
metaTitle: "Transform"
metaDescription: "Transform component allows users to attach scripting to Qri datasets."
weight: 5
---

import InfoBlock from '../../../src/components/InfoBlock.js'

<img src="/img/components_transform.png" />

## Overview

The __transform__ component binds code to a dataset. Common uses for the transform component are:

* Fetching data from the web & editing it into structured data
* Automating data cleanup
* Running calculations on dataset values to produce new ones
* Combining 2 or more datasets

A transform script is executed when saving a new version. The script itself is embedded within the dataset creating both an audit trail & easy repeatability. Qri executes transforms in a sandbox, with no access to the local filesystem, and controlled internet access.

<InfoBlock>
  Transform is an <strong>optional</strong> component. Coding is not required to use Qri.
</InfoBlock>

Qri transforms are written in [Starlark](https://docs.bazel.build/versions/master/skylark/language.html), a programming language similar in syntax to Python3.

## Transform in Qri Desktop

Transforms are currently view-only in Qri Desktop.  Each dataset component has its own tab in Qri Desktop's sidebar.  If a dataset version contains a transform, click the transform tab to view it.

## Transform in Qri CLI

If a dataset already has a transform component, use `qri get` to inspect a dataset's transform, which will write the starlark code to the terminal.

```bash
$ qri get transform.script b5/world_bank_population
```

Likewise, you can commit changes to transform using `qri save` and providing a `transform.star` file.

```bash
$ qri save --file transform.star

using dataset [me/my_dataset]

dataset saved: foo/my_dataset@/ipfs/QmXciFZ7CZj3PfauaXSpKd6amyUpWh4qiPhPGywFbzjhWa
```

### Running Transforms

See [running transforms](../starlark/runing-transforms) for an introduction to starlark transforms.

<InfoBlock>
  See <a href="/docs/reference/dataset-specification/">Dataset Specification</a> for detailed documentation of Qri dataset components.
</InfoBlock>
