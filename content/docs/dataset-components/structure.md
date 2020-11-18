---
metaTitle: "Structure"
metaDescription: "The Structure component defines the characteristics of a dataset document necessary for a machine to interpret the dataset body"
weight: 6
---

import InfoBlock from '../../../src/components/InfoBlock.js'

<img src="/img/components_structure.png" />

## Overview

The __structure__ component defines the characteristics of a dataset document necessary for a machine to interpret the dataset [body](/docs/dataset-components/body).

Structure includes things like the encoding data format (For example, CSV), length of the dataset body in bytes, etc, and is stored in a rigid form intended for machine use. A well defined structure & accompanying software should allow the end user to spend more time focusing on the data itself.

<InfoBlock>
  Qri will infer a dataset's structure automatically if one is not provided with a commit.
</InfoBlock>

Structure can be completely customized to meet your needs.  

## Schema

The structure component contains a property named `schema`, which is a [JSONSchema](https://json-schema.org/) document used to describe the body.  For a CSV, schema contains information such as column names, column types, acceptable ranges of values, etc.  

<InfoBlock>
  Structure's schema property is a <a href='https://json-schema.org/'>JSONSchema</a> document.  Any valid JSONSchema rules can be applied to a Qri dataset.
</InfoBlock>

Schemas are useful for validation of Qri datasets.  Users can apply rules in the schema and Qri will report back on invalid values.  Applying "strict mode" to commits will prevent the creation of new versions with an invalid body.

## Structure in Qri Desktop

All dataset versions include a structure component.  In Qri Desktop, you can click the structure tab to inspect the structure.

Structure editing in Desktop is coming soon.  In the meantime, you can checkout your dataset and manually write structure rules in `structure.json`

## Structure in Qri CLI

You can use `qri get` to inspect a dataset's structure, which will write the meta to the terminal as yaml.

```
# simple CSV

foo, bar, baz
1, one, true
2, two, false
```

<br/>

```
$ qri get structure

for linked dataset [foo/simple_csv]

format: csv
formatConfig:
  headerRow: true
  lazyQuotes: true
qri: st:0
schema:
  items:
    items:
    - title: foo
      type: integer
    - title: bar
      type: string
    - title: baz
      type: boolean
    type: array
  type: array

```

Likewise, you can commit changes to structure using `qri save` and providing a `structure.json` or `structure.yaml` file.

<br />

```bash
$ qri save --file structure.json

using dataset [me/my_dataset]

dataset saved: foo/my_dataset@/ipfs/QmXciFZ7CZj3PfauaXSpKd6amyUpWh4qiPhPGywFbzjhWa
```

## CSV Structure & Schema

The _structure_ document below describes the simple CSV from the previous section.  Notice that `schema.items` is an object, and that `schema.items.items` is an array of objects. Each object is JSONSchema describing a column of data from the CSV.

The top level `items` describes the rows of the CSV, whereas the lower level `items` is describing the columns.  In other words, all of the `items` (rows) of the CSV contain the same 3 `items` (columns): `foo` (integer), `bar` (string), and `baz` (boolean)

```

{
 "format": "csv",
 "formatConfig": {
  "headerRow": true,
  "lazyQuotes": true
 },
 "qri": "st:0",
 "schema": {
  "items": {
   "items": [
    {
     "title": "foo",
     "type": "integer"
    },
    {
     "title": "bar",
     "type": "string"
    },
    {
     "title": "baz",
     "type": "boolean"
    }
   ],
   "type": "array"
  },
  "type": "array"
 }
}
```



<InfoBlock>
  See <a href="/docs/reference/dataset/">Dataset Specification</a> for detailed documentation of Qri dataset components.
</InfoBlock>
