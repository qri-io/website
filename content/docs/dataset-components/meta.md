---
metaTitle: "Meta"
metaDescription: "The Meta component contains human-readable descriptive metadata that qualifies and distinguishes a dataset."
weight: 4
---

import InfoBlock from '../../../src/components/InfoBlock.js'

<img src="/img/components_meta.png" />

## Overview

The __meta__ component contains human-readable descriptive metadata that qualifies and distinguishes a dataset.

Well-defined meta should aid in making datasets findable by describing a dataset in generalizable taxonomies that can aggregate across other datasets.

Because datasets are intended to interoperate with many other data storage and cataloging systems, meta fields and conventions are derived from existing metadata formats whenever possible.

## Meta in Qri Desktop

Each dataset component has its own tab in Qri Desktop's sidebar.  If a dataset version contains meta, you can click the meta tab to view it.

You can also edit a working dataset's meta.  Navigate to the Dataset Pane, then click the meta tab under status.  You can fill out the meta form and Qri will keep track of your changes.

## Meta in Qri CLI

You can use `qri get` to inspect a dataset's meta, which will write the meta to the terminal as yaml.

```bash
$ qri get meta b5/world_bank_population

description: |
  ( 1 ) United Nations Population Division. World Population Prospects: 2017 Revision. ( 2 ) Census reports and other statistical publications from national
  statistical offices, ( 3 ) Eurostat: Demographic Statistics, ( 4 ) United Nations Statistical Division. Population and Vital Statistics Reprot ( various years ),
  ( 5 ) U.S. Census Bureau: International Database, and ( 6 ) Secretariat of the Pacific Community: Statistics and Demography Programme.
downloadURL: http://api.worldbank.org/v2/en/indicator/SP.POP.TOTL?downloadformat=csv
homeURL: https://data.worldbank.org/indicator/sp.pop.totl
keywords:
- united nations
- population
- world bank
- census
license:
  type: CC-BY-4.0
  url: https://creativecommons.org/licenses/by/4.0/
qri: md:0
theme:
- population
title: World Bank Population
```

Likewise, you can commit changes to meta using `qri save` and providing a `meta.json` or `meta.yaml` file.

```
// meta.json

{
  "title": "My Dataset",
  "descriiption": "All the data, all the things"
  "qri": "md:0"
}
```
<br />

```bash
$ qri save --file meta.json

using dataset [me/my_dataset]

dataset saved: foo/my_dataset@/ipfs/QmXciFZ7CZj3PfauaXSpKd6amyUpWh4qiPhPGywFbzjhWa
```


<InfoBlock>
  See <a href="/docs/reference/dataset-specification/">Dataset Specification</a> for detailed documentation of Qri dataset components.
</InfoBlock>
