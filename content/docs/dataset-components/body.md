---
title: "Body"
metaTitle: "The Qri Body Component"
metaDescription: "A Qri dataset's Body is *the data itself*.  It's the rows and columns of values that came from a CSV file, and now live in a Qri dataset along with other components."
weight: 2
---

import InfoBlock from '../../../src/components/InfoBlock.js'

<img src="/img/qri-dataset-model.png" />

## Overview

The __body__ component is a *single table* of data. The other components of a dataset are information that complements that table (metadata, structure information, column types and descriptions, etc.), but _body_ is the table itself.

Body is a required component, a Qri Dataset cannot exist without a body.

## Relationship to Structure

Body is closely linked to the [structure](/docs/dataset-components/structure) component, which stores information about column types, validation rules, and more.  Qri depends on structure to be able to interpret the body.  If you create a dataset from a CSV, the structure is inferred on import.  

## Constraints

Body is the component of a Qri Dataset that can get __BIG__.  Qri is intended for use with datasets whose body component is less than 1GB in size.  Qri uses pagination to load small sections of the body on demand.  

The body may contain invalid data.  For example, the structure component may define a column as numeric, but some of the column's values in the body contain text.  Qri can be configured to enforce validity when committing changes using strict mode.

## Body in Qri Desktop

Each dataset component has its own tab in Qri Desktop's sidebar.  You can click the body tab to view a table of the body.

## Body in Qri CLI

You can use `qri get` to inspect a dataset's body, which will write the meta to the terminal as yaml.

```bash
$ qri get body --all foo/simple_csv

foo,bar,baz
1," one"," true"
2," two"," false"

```

Likewise, you can commit changes to the body using `qri save` with the `--body` flag


```bash
$ qri save --body simple.csv

using dataset [me/my_dataset]

dataset saved: foo/my_dataset@/ipfs/QmXciFZ7CZj3PfauaXSpKd6amyUpWh4qiPhPGywFbzjhWa
```

## Non-CSV Bodies

Qri Desktop is optimized for CSV bodies, but Qri's underlying technology can handle other formats, including json, xlsx, and cbor.

<InfoBlock>
  See <a href="/docs/reference/dataset-specification/">Dataset Specification</a> for detailed documentation of Qri dataset components.
</InfoBlock>
