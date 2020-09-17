---
metaTitle: "RStudio"
metaDescription: "Working with Qri Datasets in RStudio"
---

import ImageWithCaption from '../../../src/components/ImageWithCaption.js'


There is no qri library for R... yet.  In the meantime, it's possible to use qri with R/RStudio by executing [qri CLI](https://qri.io/docs/reference/cli_commands) commands using the R `system2()` function.

In this docs page, we'll show some experimental R code that imports data from a qri dataset into an R dataframe.  We'll also show how to create a new qri versioned dataset from an R dataframe.

## Install Qri CLI and pull a dataset

Qri stores data in a local repository.  Once you've [installed Qri CLI](https://qri.io/docs/reference/installing-qri-cli), you can pull down any of the thousands of datasets on [qri.cloud](https://qri.cloud) with a single command.

For the examples below, we'll use the popular NYC Subway Turnstile Counts dataset.  You can pull in your terminal with the command `qri pull`:

```{shell}
$ qri pull nyc-transit-data/turnstile_daily_counts_2020
46 / 46 [-------------------------------------------------------] 100.00% 56 p/s
🗼 fetched from remote "https://registry.qri.cloud"


NYC Subway Turnstile Counts - 2020
/ipfs/QmNb7aSRhy1LUDbd1y7RVPDv1ud77nsGhZQL2R9HbN4cpz
9.9 MB, 113033 entries, 226 errors

```

The dataset is now in your local qri repository.  Now what?  You could use `qri get` to export the dataset's body to a CSV and go on your merry way, but you'd have to deal with more files and you also lose the schema information contained in the qri dataset.

Let's see how we can stream data directly into `read_csv()` without saving a file.

## Import a qri dataset to an R dataframe

CSV files don't carry column types along with them, and you've probably spent time carefully crafting `col_types` when importing data from CSVs into R.  One of the benefits of using qri is that all datasets have an associated schema, which can be useful when importing the data into other environments.  In this example, we'll use the schema that came with a qri dataset during the import, preserving the column types.

Here's an experimental R function `getQriDataset()` which takes a dataset reference as an argument and returns a dataframe.  It uses two different qri CLI commands to import a qri dataset's CSV `body` as well as its `structure`, which contains the column schema details.  These can be combined to invoke `read_csv()` without doing column type guessing!

```{r}
# mapType takes a jsonSchema type as a string and returns the corresponding
# col_type letter abbreviation
mapType <- function(jsonSchemaType) {
  rType <- switch(
    jsonSchemaType,
    string='c',
    number='d',
    integer='i',
    boolean='l',
    '?'
  )
  return(rType)
}

# getQriDataset() takes a qri dataset reference and returns a dataframe
# it does the work to read the schema from the qri dataset so we can
# explicitly set col_types
getQriDataset <- function(datasetReference) {

  # first, get the schema (schema is a child of the qri structure component)
  # parse the json, schema will be a nested list
  structure <- system2(
    'qri',
    args = str_interp('get structure ${datasetReference} --format json'),
    stdout = TRUE
  ) %>% parse_json()

  # next, map the jsonSchema types into col_types
  # types is a string of letter abbreviations for column types
  # (character = c, integer = i, etc) for example, if the dataset had 2 string
  # columns, 3 number columns, and 1 integer column, types would be "ccdddi"
  types <- paste(
    map_chr(
      structure$schema$items$items,
      function(d) { return(mapType(d$type)) }
    ),
    collapse = ''
  )

  # now that we have a string of column types, we can use read_csv() to import
  # the dataframe to actually get the CSV string, we use system2() to call
  # qri get ... bear in mind that qri doesn't enforce column types unless you
  # ask it to, so it's possible that the values in the dataset's body may not
  #match the dataset's schema
  df = read_csv(
    system2(
      'qri',
      args=str_interp('get body ${datasetReference}'),
      stdout = TRUE
    ),
    col_names = TRUE,
    col_types = types
  )
  return(df)
}
```

With `getQriDataset()` defined, let's use it to import the turnstile data.

```{r}
turnstile_counts_2020 <- getQriDataset('nyc-transit-data/turnstile_daily_counts_2020')

glimpse(turnstile_counts_2020)

Rows: 113,033
Columns: 12
$ stop_name      <chr> "Astoria - Ditmars Blvd", "Astoria - Ditmars Blvd", "Astoria - Ditmars Blvd", …
$ daytime_routes <chr> "N W", "N W", "N W", "N W", "N W", "N W", "N W", "N W", "N W", "N W", "N W", "…
$ division       <chr> "BMT", "BMT", "BMT", "BMT", "BMT", "BMT", "BMT", "BMT", "BMT", "BMT", "BMT", "…
$ line           <chr> "Astoria", "Astoria", "Astoria", "Astoria", "Astoria", "Astoria", "Astoria", "…
$ borough        <chr> "Q", "Q", "Q", "Q", "Q", "Q", "Q", "Q", "Q", "Q", "Q", "Q", "Q", "Q", "Q", "Q"…
$ structure      <chr> "Elevated", "Elevated", "Elevated", "Elevated", "Elevated", "Elevated", "Eleva…
$ gtfs_longitude <dbl> -73.91203, -73.91203, -73.91203, -73.91203, -73.91203, -73.91203, -73.91203, -…
$ gtfs_latitude  <dbl> 40.77504, 40.77504, 40.77504, 40.77504, 40.77504, 40.77504, 40.77504, 40.77504…
$ complex_id     <chr> "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"…
$ date           <chr> "2020-01-01", "2020-01-02", "2020-01-03", "2020-01-04", "2020-01-05", "2020-01…
$ entries        <int> 5812, 15506, 15959, 9265, 7191, 16810, 17436, 17575, 17554, 17529, 10304, 7418…
$ exits          <int> 6659, 14307, 14500, 9161, 7743, 14919, 14765, 15340, 15112, 15250, 9816, 8157,…
```

There it is, and all the columns got their types from the qri dataset!

## Explore, Munge, and Analyze in RStudio

Now that the dataframe is imported, we can do some filtering and make a quick chart.

```{r}
# Let's make a dataframe just for one station complex, Atlantic Ave/Barclays Center
barclays_2020 <- filter(turnstile_counts_2020, complex_id == '617')

# neat.  How many entries were there at Atlantic Ave Barclays Center
# the week of August 30 - September 5?
barclays_aug30_week <- filter(
  barclays_2020,
  date >= '2020-08-30',
  date <= '2020-09-05'
)

# let's make a simple chart to visualize the entries and exits over the course of the week
fig <- plot_ly(
  barclays_aug30_week,
  x = ~date,
  y = ~entries,
  type = 'scatter',
  mode = 'lines',
  name = 'entries',
  line = list(color = 'rgb(205, 12, 24)', width = 4)
) %>%

  add_trace(y = ~exits, name = 'exits', line = list(color = 'rgb(22, 96, 167)', width = 4)) %>%

  layout(
    title = "Daily Entries and Exits - Atlantic Ave/Barclays Center Station Complex",
    xaxis = list(
      title = "Date",
      type = 'date',
      tickformat = '%d %B (%a)'
    ),
    yaxis = list(
      title = "Count",
      range = c(0, 15000)
    ))

fig

```

<ImageWithCaption
  src='/img/docs/integrating-qri/rplot.png'
  caption="A simple plotly chart"
/>


## Saving an R dataframe to a new qri dataset

After filtering, mutating, and summarizing, you may have a new dataframe to share with the world.  You could export a CSV, but where would you put it? Let's see how to turn a dataframe into a new qri dataset, where it can be easily versioned and pushed to qri.cloud.

First, let's define another helper function, `saveQriDataset()`.  It writes the dataframe to a CSV and then calls `qri save`.

```{r}
saveQriDataset <- function(df, datasetReference) {
  write.csv(df, str_interp('${tempdir()}/body.csv'))
  output <- system2('qri', args = str_interp('save --body ${tempdir()}/body.csv me/${datasetReference}'), stdout = TRUE)
  print(output)
}
```

This time we're not going to preserve the column types, and will let qri guess the schema on import.  Let's use it to save one of the filtered dataframes from the above example:

```{r}
# saves the dataframe `barclays_2020` as qri dataset `me/barclays-2020`
saveQriDataset(barclays_2020, 'barclays-2020')
```

That's it!  If you go to your terminal and type `qri list`, you should see this new dataset in your qri repository.  Publishing it to qri.cloud is as simple as `qri push me/barclays-2020`.


## Onward!

We don't have an R library yet, but would love your help getting started with one.  Have you tinkered with qri in RStudio?  We'd love to hear from you.  [Drop us a line on twitter](https://twitter.com/qri_io) or [hop into our public discord](https://discordapp.com/invite/thkJHKj).
