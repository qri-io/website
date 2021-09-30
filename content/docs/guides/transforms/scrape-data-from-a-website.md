---
metaTitle: "Scrape Data from a Website"
metaDescription: "Use Starlark's html package to extract data from HTML"
---

## Introduction

Qri transforms can scrape data from websites by using the [`html` Starlark package](/docs/reference/starlark-packages/html).  In this guide, we'll provide example Starlark code for scraping a website to create a [Qri Dataset](/docs/concepts/understanding-qri/how-qri-defines-a-dataset).

## Prerequisites

* An account on [qri.cloud](https://qri.cloud) _or_
* The [Qri CLI]() installed

## Directions

These steps include Starlark code examples. You can use these in the workflow editor in Qri.Cloud, or locally by creating a script file (e.g. `myscript.star`) and running `qri apply --filename myscript.star`.  For more on running qri transforms locally, see [Running Transform Scripts in Qri CLI]()

### Step 1: Load the html package

You'll need the `html` Starlark package, which allows for jQuery-style selection of elements.  In this example, we will also use the `dataframe` and `http` packages

```python
load('http.star', 'http')
load('html.star', 'html')
load('dataframe.star', 'dataframe')
```

To learn more about other Starlark packages availble for use in Qri transforms, see [Starlark Packages](/docs/reference/starlark-packages)

### Step 2: Get some HTML to scrape

Next, make an http GET request to the website you want to scrape.  Save the response as a variable.

This example will pull down [this list of weekend street closures](https://www1.nyc.gov/html/dot/html/motorist/wkndtraf.shtml) from the New York City Department of Transportation.

```python
# make the http request for the page we want to scrape
sitetoscrape = "https://www1.nyc.gov/html/dot/html/motorist/wkndtraf.shtml"
res_body = http.get(sitetoscrape).body()
```

### Step 3: Extract text from specific elements

With this code, we will use the Starlark html package to find the elements containing the data we want to scrape.  In this example, each street closure consists of a `<strong>` element with the streets to be closed, followed by a `<p>` element with a description of the closure.

![screenshot of NYC DOT weekend traffic advisory website](/img/docs/guides/transforms/scrape-data-from-a-website/nycdot-weekend-traffic-advisory.png)


![screenshot of NYC DOT weekend traffic advisory website html source](/img/docs/guides/transforms/scrape-data-from-a-website/nycdot-weekend-traffic-advisory-html.png)

From inspecting the HTML of the site, we can see that all of the `<strong>` and `<p>` elements of interest are sibling elements under a `<div>` with an `id` of 'content'.  Once the `children()` of this `<div>` have been selected, we can iterate over them to find each `<strong>` that is immediately followed by `<p>` and extract the text from these elements.

For good measure, we can also grab the borough from the `<h2>` elements found on the page, and attach them to each street closure.

```python
# use html() to parse the raw html
root = html(res_body)
# get all child nodes of the div with id="content"
content = root.find('#content').children()

# create an empty list to hold each row of data that we scrape
rows = []
# when we encounter an h2, we will set current_boro so we can add a boro to each event row
current_boro = ''

# iterate over the children of #content
for i, element in enumerate(content):
    # set up variables for the current node and the next node
    next_element = content.eq(i + 1)

    # check for h2, if true, get the node's text and set current_boro
    if element.is_selector('h2'):
        current_boro = element.text()

    # check for <strong> followed immediately by <p>
    if element.is_selector('strong') and next_element.is_selector('p'):
        rows.append([current_boro, element.text(), next_element.text()])

```

This code yields a nice list of lists containing the borough, streets_closed, and description:

```python

[
  ["borough", "streets_closed", "description"],
  ["Manhattan", "East 13th Street between 2nd Avenue and 1st Avenue", "This street will be closed Saturday from 8 am to 6 pm and Sunday from 9 am to 6 pm through 10/3/21 to facilitate crane operation."],
  ["Manhattan", "East 19th Street between Park Avenue South and Broadway", "This street will be closed Saturday and Sunday from 7 am to 7 pm through 10/3/21 to facilitate crane operation."],
  ...
]

```

### Step 4: Commit a new dataset version

With the dataframe, we can assign the `body` property of `dataset.latest()`.  The mutated dataset is now ready to commit, and will become the next version of the dataset.

```python
# get the latest version of the dataset, mutate the body
ds = dataset.latest()

# `new_body` is now a `DataFrame`, which can be used to create the next version of the dataset
new_body = dataframe.DataFrame(rows, columns=['borough', 'streets_closed', 'description'])
ds.body = new_body

# commit the new version of the dataset
dataset.commit(ds)
```

![screenshot of resulting qri dataset](/img/docs/guides/transforms/scrape-data-from-a-website/qri-dataset-body.png)

This transform for scraping data is ready to make new versions of the dataset.  If you're using qri.cloud, you can deploy it as part of a workflow and we'll run it on a schedule you specify. If you're using qri CLI, you can save both the transform code and the resulting body using `qri save --file ./transform.star me/test`


## Additional Resources

* Read this [conceptual guide about Qri transforms and data automation](/docs/concepts/understanding-qri/how-qri-data-transforms-and-automation-work)
* Browse the [Starlark Docs](/docs/reference/starlark-language)
* Browse reference docs for other [Starlark Packages](/docs/reference/starlark-packages)
