---
metaTitle: "Create a Dataset from a CSV"
metaDescription: "Use qri save to create a new dataset from a CSV file"
---

## Introduction

Your local Qri repository is a place where you can manage and version datasets.  In this guide, we'll create a new dataset from a CSV, add some metadata, and commit an updated version of the data.

## Prerequisites

* The [Qri CLI](/docs/qri-cli/install-qri-locally) installed

## Directions


### Step 1: Start with a CSV file

For this example, we'll use a simple CSV named `us-top-10-cities-pop.csv`:

```csv
city, state, population_2020
"New York City"", "NY", 8622357
"Los Angeles"", "CA", 4085014
"Chicago"", "IL", 2670406
"Houston"", "TX", 2378146
"Phoenix"", "AZ", 1743469
"Philadelphia"", "PA", 1590402
"San Antonio"", "TX", 1579504
"San Diego"", "CA", 1469490
"Dallas"", "TX", 1400337
"San Jose"", "CA", 1036242
```

The csv file can live anywhere on your computer, you'll just need to know its absolute path or its path relative to your working directory.

### Step 2: Run Qri Save to Create the Dataset

To create the dataset, run `qri save` with the `--body` flag followed by the path to the CSV and the name of the dataset you want to create.

`qri save --body /path/to/file.csv me/some-dataset-name`

Why do we need the `--body` flag?  Qri datasets contain more than just _data_, so we store the data in a _component_ called `body`.  [Learn more about Qri Components](/docs/concepts/understanding-qri/how-qri-defines-a-dataset)

Remember, qri datasets always have names formatted as `{username}/{datasetname}`.  You can use the `me` placeholder instead of your own username.

In this example, we give the qri dataset a slightly more verbose name of `top-ten-us-cities-by-population` that what is in the CSV's filename.

```bash
$ qri save --body ./us-top-10-cities-pop.csv me/top-ten-us-cities-by-population
saving done [==============================================================================]
dataset saved: chriswhong-demo/top-ten-us-cities-by-population@/ipfs/QmQ83pxykRjPDD39hKk1RW7KRLCLPQMAAThTsv5cnzveHT
```

Voila, a new dataset is born!

Running `qri list` will list your collection of datasets showing the new dataset.

```bash
$ qri list
1   chriswhong-demo/top-ten-us-cities-by-population
    /ipfs/QmQ83pxykRjPDD39hKk1RW7KRLCLPQMAAThTsv5cnzveHT
    310 B, 10 entries, 0 errors, 1 version
```

Running `qri log` shows the version history of the dataset.  For each version, we can see the commit hash, timestamp, size, and message.  Notice that Qri has auto-generated the message `created dataset from us-top-10-cities-pop.csv` for this commit because we didn't specify one when running `qri save`.

```bash
$ qri log me/top-ten-us-cities-by-population
1   Commit:  /ipfs/QmQ83pxykRjPDD39hKk1RW7KRLCLPQMAAThTsv5cnzveHT
    Date:    Wed Oct  6 16:04:17 EDT 2021
    Storage: local
    Size:    310 B

    created dataset from us-top-10-cities-pop.csv
```

### Step 3: Add Some Metadata

We can store metadata in the dataset's `meta` component.  Metadata fields like `title` and `description` are common, and to add them to this dataset, we set up a JSON file `meta.json`

```json
{
  "title": "Top 10 U.S. Cities by 2020 Population",
  "description": "A simple dataset of the 10 largest cities in the U.S. by population, copied from https://worldpopulationreview.com/us-cities"
}
```

Just as we did with the CSV, running `qri save` and providing a file will yield a new version of the dataset. Because we aren't changing the body, we use the `--file` flag.

We can also use the `--title` flag to provide a message for the commit.

```bash
$ qri save --file meta.json --title "add a title and description to meta" me/top-ten-us-cities-by-population
saving done [==============================================================================]
dataset saved: chriswhong-demo/top-ten-us-cities-by-population@/ipfs/QmP6RSBh1du1Zztqh2Ak9Q4JnPU8nAvLAZHe6yqdmnZghw
```
Now the dataset has two commits:

```bash
qri log me/top-ten-us-cities-by-population
1   Commit:  /ipfs/QmP6RSBh1du1Zztqh2Ak9Q4JnPU8nAvLAZHe6yqdmnZghw
    Date:    Wed Oct  6 16:38:56 EDT 2021
    Storage: local
    Size:    310 B

    add a title and description to meta
    meta added

2   Commit:  /ipfs/QmQ83pxykRjPDD39hKk1RW7KRLCLPQMAAThTsv5cnzveHT
    Date:    Wed Oct  6 16:04:17 EDT 2021
    Storage: local
    Size:    310 B

    created dataset from us-top-10-cities-pop.csv
```

You can continue modifying the csv and json files, and using `qri save` to make new versions of this dataset.  Each version is immutable, and you can inspect and export the older versions if you ever need them again.  

Some things to try:

* `qri diff me/top-ten-us-cities-by-population` will show you what changed between the latest version and the previous version

* `qri get body me/top-ten-us-cities-by-population` will get the body as a CSV, which you can save to file or pipe into another command

## Additional Resources

* Once your dataset is in good shape, learn how to [push it to Qri Cloud](/docs/qri-cli/push-a-dataset-to-qri-cloud) so other Qri users can find it.
