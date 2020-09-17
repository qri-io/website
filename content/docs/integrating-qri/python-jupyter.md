---
metaTitle: "Python/Jupyter"
metaDescription: "Integrating Qri and Python in a Jupyter Notebook"
---

import ImageWithCaption from '../../../src/components/ImageWithCaption.js'

In this doc, we'll show how to import data from your local qri repository into a Jupyter notebook for analysis.  

## Install Qri CLI

Qri stores data in a local repository.  Once you've [installed Qri CLI](https://qri.io/docs/reference/installing-qri-cli), you can pull down any of the thousands of datasets on [qri.cloud](https://qri.cloud) with a single terminal command.  

You can also do the dataset `pull` from your python code.  Read on!

## Install qri-python

Qri's python client [`qri-python`](https://github.com/qri-io/qri-python) is available on pip.

```
$ pip install qri
```

## Pulling a Dataset

You can quickly pull any dataset from Qri Cloud by running a cell with `qri.add()`

This line will pull the popular COVID-19 Data Repository by the Center for Systems Science and Engineering (CSSE) at Johns Hopkins University, which has been published and kept up-to-date on qri.cloud by user [@xristosk](https://qri.cloud/xristosk/)

```
import qri
qri.add("xristosk/aug_daily_covid19_jh")
```
<ImageWithCaption
  src='/img/docs/integrating-qri/jupyter-add.png'
  caption="qri.add() pulls a dataset from qri.cloud to your local qri repository"
/>

## Get the Dataset's Body

If you are new to Qri, each dataset is made up of [components](/docs/dataset-components/overview), and the one with all of the data in it is called the `body`. This is what we’re going to want to work with inside of a Jupyter Notebook. When you use `qri.get()`, qri-python grabs the body of a dataset and turns it into something familiar in the data science world: a Pandas DataFrame.

```
df = qri.get("xristosk/aug_daily_covid19_jh").body
df.head()
```

<ImageWithCaption
  src='/img/docs/integrating-qri/jupyter-add.png'
  caption="qri.get() imports the dataset's body as a dataframe"
/>

## SQL Queries

Sometimes we might not need all of the data in the body of a dataset; maybe we just need a chunk of it, or maybe you’re someone who is more familiar with SQL than they are with Pandas. Qri-Python has a `sql()` method to help out with that. In this example, we want to select only cases in Italy.

```
query = """
SELECT *
FROM xristosk/aug_daily_covid19_jh AS aug
WHERE aug.country_region = 'Italy'
"""
df = qri.sql(query)
df.head()
```

<ImageWithCaption
  src='/img/docs/integrating-qri/jupyter-sql.png'
  caption="qri.sql() allows you to filter, join, and mutate data with a SQL query"
/>

## Onward!

Using `qri-python`, you can use datasets from Qri Cloud directly inside of a Jupyter Notebook. It’s a quick way to fetch data you need and jump right into your analysis and visualizations.

Have you tinkered with qri and python?  We'd love to hear from you.  [Drop us a line on twitter](https://twitter.com/qri_io) or [hop into our public discord](https://discordapp.com/invite/thkJHKj).
