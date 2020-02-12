---
metaTitle: "Components Overview"
metaDescription: "Qri defines a dataset as a set of components, each with its own format and requirements."
weight: 1
---

import InfoBlock from '../../../src/components/InfoBlock.js'

Qri defines a __dataset__ as a set of _components_, each with its own format and requirements.  

<img src="/img/qri-dataset-model.png" />

For example, a CSV of tabular data, structured metadata, and a markdown readme can all live together under a single Qri dataset.  A change to any individual component constitutes a new version of the collective dataset. A Qri dataset contains everything you *wish* you had when you download a CSV from the internet.

<InfoBlock>
  See <a href="/docs/reference/dataset/">Dataset Specification</a> for detailed documentation of Qri dataset components.
</InfoBlock>
