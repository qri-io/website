---
metaTitle: "Readme"
metaDescription: "The Readme component is free-form text used to describe a dataset.
"
weight: 4
---

import InfoBlock from '../../../src/components/InfoBlock.js'

<img src="/img/qri-dataset-model.png" />

## Overview

The __readme__ component is free-form text used to describe a dataset.  Isn't that what metadata is for?  Yes, but often structured metadata fields aren't a sufficient mechanism for explaining the nuances of a dataset.  Readme is your chance to use more human-friendly language to explain the dataset.

A readme component is not required, but adding a readme is a best practice for creating healthy datasets in Qri.

## Markdown

Dataset readmes support markdown for adding hyperlinks, images, headers, and other rich text.  Qri Desktop and Qri Cloud both display rendered versions of the readme as HTML.

## An Example Readme

Here's a simple example readme for a dataset, telling the dataset users where the data came from, how it was transformed from the source data, and how to get in touch for more information.

```text
# My Nifty Dataset

This dataset is a cleaned up version of some canonical dataset published at [this open data portal](https://data.somecity.gov)


## Cleanup

To cleanup the original data, I used R studio to concatenate `column_a` and `column_b` into `column_c`


## Time Zone Warning

`timestamp_column` has no timezone specified, so some programs may import it as UTC.  Be sure to offset for local time on import.


## Contact me

Find me on twitter as @some_data_user if you have any questions or want to collaborate!

```

## Readme in Qri Desktop

Each dataset component has its own tab in Qri Desktop's sidebar.  If a dataset version contains a readme, you can click the readme tab to view it.

You can also edit a working dataset's readme.  Navigate to the Dataset Pane, then click the readme tab under status.  You can type into the text area (markdown is supported!) and Qri will keep track of your changes.


## Readme in Qri CLI

You can use `qri get` to inspect a dataset's readme, which will write the raw text to the terminal.


```bash
$ qri get readme.script foo/my_nifty_dataset

# My Nifty Dataset

This dataset is a cleaned up version of some canonical dataset published at [this open data portal](https://data.somecity.gov)

## Cleanup

To cleanup the original data, I used R studio to concatenate `column_a` and `column_b` into `column_c`

## Time Zone Warning

`timestamp_column` has no timezone specified, so some programs may import it as UTC.  Be sure to offset for local time on import.

## Contact me

Find me on twitter as @some_data_user if you have any questions or want to collaborate!
```
<br/>

Likewise, you can commit changes to readme using `qri save` and providing a `readme.md` file.

```markdown
// readme.md

# My Nifty Dataset

This is an updated version of the readme.  Explore the history to see what it used to look like.

```
<br />

```bash
$ qri save --file readme.md

using dataset [me/my_nifty_dataset]

dataset saved: foo/my_nifty_dataset@/ipfs/QmXciFZ7CZj3PfauaXSpKd6amyUpWh4qiPhPGywFbzjhWa
```

<InfoBlock>
  See <a href="/docs/reference/dataset-specification/">Dataset Specification</a> for detailed documentation of Qri dataset components.
</InfoBlock>
