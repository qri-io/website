---
metaTitle: "Transforms Quickstart"
metaDescription: "Quickly get started with transforms using Qri CLI"
weight: 2
---

import InfoBlock from '../../../src/components/InfoBlock.js'

Follow these steps to run your first transform script with qri CLI.

## Create a Directory to Work From

Create an empty directory using `mkdir`, `cd` into the new directory.

```bash
[~/datasets]$ mkdir example-transform
[~/datasets]$ cd example-transform
[~/datasets/example-transform]$
```

## Add a transform.star File

In your new directory, add a file called `transform.star` to hold the code.  Open the file in your text editor.

```bash
[~/datasets/example-transform]$ touch transform.star
[~/datasets/example-transform]$
```

## Add Your Transform Code

Open `transform.star` in your favorite text editor, and add some code.  You can copy and paste this simple example that downloads a CSV from the web and sets a dataset's `body`.

```python
load("http.star", "http")

# qri will call the download function first
def download(ctx):
  # Download CSV of all earthquakes in the past 7 days from the U.S. Geological Survey
  res = http.get("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.csv")

  # res.body() yields the CSV as a string
  return res.body()

# all transform scripts have a transform function, qri calls transform after download
def transform(ds, ctx):
  # set the dataset's body to the CSV string
  ds.set_body(ctx.download, parse_as='csv')

```

Remember to save `transform.star` once you've added some code!

## Do a Dry Run

To safely run the script without actually modifying anything, you can do a __dry run__ of `qri save`.  

This command tells qri to use the file `transform.star` to save a version of the dataset `me/earthquakes` (me is a shortcut for your username).  Because the dataset `me/earthquakes` does not exist, qri will create it for you the first time you save.  The `--dry-run` flag means it will log details of the save without actually saving anything.

It will execute the code in `transform.star`, which results in setting the CSV body of the dataset.

`qri save --dry-run --file transform.star me/earthquakes`

```bash
[~/datasets/example-transform]$ qri save --dry-run --file transform.star me/earthquakes
🏃🏽‍dry run
✅ transform complete
dataset saved: fred/earthquakes@/map/QmNUR3GDYcWQbTbSLBDQsp1A1qt8neG9bHT4AqNqfQkAY3
this dataset has 3013 validation errors
{
  "body": [ ... ],
  ,
  "transform": {
    "qri": "tf:0",
    "scriptPath": "/map/QmcLJCtQG79Dp1X8JZRV3K64e8fEfrMinvkvqUYfVWwruK",
    "syntax": "starlark",
    "syntaxVersion": "0.9.6-dev"
  },
  "viz": {
    "format": "html",
    "qri": "vz:0",
    "renderedPath": "/map/QmXpCuUQ4bHwzphGztd5XExCokLtdk5rSZDT7CGvVwPFeU",
    "scriptPath": "/map/QmZkRmrbqHnw8zs48ApogHswSWPXwg5Qc2TT5ZdKYUiJrH"
  }
}
[~/datasets/example-transform]$
```

## Run Qri Save

Now for the main event!  Run the same `qri save` command without the `--dry-run` flag, and qri will create a new dataset called `earthquakes` in your local qri collection.

```bash
[~/datasets/example-transform]$ qri save --dry-run --file transform.star me/earthquakes
✅ transform complete
dataset saved: fred/earthquake@/ipfs/QmSx8CKD2ojZyhyWB1s4RXAcPeM7bUeKTjrsxP55adYXnr
this dataset has 3012 validation errors
[ ~/datasets/example-transform]$
```

If you run `qri list`, you'll see your new dataset.  

```bash
[~/datasets/example-transform]$ qri list
1   fred/earthquakes
    /ipfs/QmSx8CKD2ojZyhyWB1s4RXAcPeM7bUeKTjrsxP55adYXnr
    435 kB, 2329 entries, 3012 errors

(END)
```

## Save Again in the Future

Each time you run the above `qri save` command, the transform script will pull the CSV of earthquakes.  If the downloaded CSV is different from the latest version of the dataset, qri will add a new version that supersedes it.  

Don't worry, all of the older versions are still there, and you can review them with `qri list` and interact with them using other CLI commands.

## Delete the Example Dataset (optional)

When you're finished, you can delete the dataset with `qri remove --all me/earthquakes`.


## More Examples

Examples of more complex transform scripts are available in [Example Transform Scripts](http://localhost:8000/docs/transforms/examples).
-- --
