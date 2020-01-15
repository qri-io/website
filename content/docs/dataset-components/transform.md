---
title: "Transform"
metaTitle: "The Transform Component"
metaDescription: "The transform component allows users to attach scripting to Qri datasets."
weight: 5
---

import InfoBlock from '../../../src/components/InfoBlock.js'

<img src="/img/qri-dataset-model.png" />

## Overview

The __transform__ component allows users to attach scripting to Qri datasets.  This allowing for automated updates and workflows that combine several datasets into a single output dataset.

Qri transforms are written in [Starlark](https://docs.bazel.build/versions/master/skylark/language.html), a programming language similar in syntax to Python3.

<InfoBlock>
  Transform is an <strong>optional</strong> component.  Coding is not required to use Qri.
</InfoBlock>

## Transform in Qri Desktop

Transforms are currently view-only in Qri Desktop.  Each dataset component has its own tab in Qri Desktop's sidebar.  If a dataset version contains a transform, you can click the transform tab to view it.

## Transform in Qri CLI

You can use `qri get` to inspect a dataset's transform, which will write the starlark code to the terminal.

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

### Scheduling Transforms

<InfoBlock>
  See <a href="/docs/reference/dataset-specification/">Dataset Specification</a> for detailed documentation of Qri dataset components.
</InfoBlock>
