---
metaTitle: "Example Transforms"
metaDescription: "Example transform scripts for automating qri dataset updates"
weight: 3
---

import InfoBlock from '../../../src/components/InfoBlock.js'

<InfoBlock>
  This documentation is for qri CLI (command line) only. Composing Transform scripts on Desktop is a work in progress.
</InfoBlock>

Transforms allow you to bind data with code in Qri, providing a quick means to automate the creation of new dataset versions from websites, APIs, and _other qri datasets_.

To get started with transforms, check out [Transforms Qruickstart](https://qri.io/docs/transforms/quickstart).

Below are several examples of transform scripts that demonstrate various approaches to automating qri datasets.  If you have a transform script that you think might help others, consider [opening a pull request](https://github.com/qri-io/website/pulls) to add it here.

-- --

## Count NYC 311 Complaints By Boro (Spatial Join and Aggregation)

### Overview

This transform pulls two datasets from the [NYC Open Data Portal](https://data.cityofnewyork.us). The 311 data are retrieved as json from the Open Data Portal's API, and a borough boundaries spatial dataset is retreived as geojson.

The `transform` function conducts a spatial join using the starlark `geo` package, and keeps a count of the complaints that fall within each of NYC's five boroughs.  

### Script

```python
load("http.star", "http")
load("geo.star", "geo")

def download(ctx):
  # Download list of 311 complaints, currently capped to 1000 responses for testing purposes
  complaints = http.get("https://data.cityofnewyork.us/resource/fhrw-4uyv.json?$offset=0&$limit=10000")
  # Download the New York Borough Boundaries
  boros = http.get("http://data.beta.nyc//dataset/68c0332f-c3bb-4a78-a0c1-32af515892d6/resource/7c164faa-4458-4ff2-9ef0-09db00b509ef/download/42c737fd496f4d6683bba25fb0e86e1dnycboroughboundaries.geojson")

  return {
    "complaints" : complaints.json(),
    # send boros over as a JSON string, parseGeoJSON will do the decoding
    "boros": boros.text(),
  }


def transform(ds, ctx):
  complaints = ctx.download["complaints"]
  boundaries, properties = geo.parseGeoJSON(ctx.download["boros"])

  # bouroughs data specifies a number of polygons for each borough,
  # combine them all into MultiPolygons, one for each borough
  boro_names = [ boro['borough'] for boro in properties]
  geoms = reduce(append_polygon, zip(boro_names, boundaries), {})
  geoms = [geo.MultiPolygon(geoms[x]) for x in geoms]
  boro_names = list(set(boro_names))

  # dict of complaint-counts, keyed by borough name
  boro_counts = dict(zip(boro_names, [0]*len(boro_names)))

  for complaint in complaints:
    # only use complaints that have lat & lng values
    if 'latitude' in complaint and 'longitude' in complaint:
      point = geo.Point(float(complaint['longitude']), float(complaint['latitude']))

      for boro_name, geom in zip(boro_names, geoms):
        if geo.within(point, geom):
          boro_counts[boro_name] += 1

  ds.set_body(boro_counts)


def append_polygon(acc, prop):
  polys = acc.get(prop[0], [])
  polys.append(prop[1])
  acc[prop[0]] = polys
  return acc

def reduce(fn, l, v):
	for _, el in enumerate(l):
		v = fn(v, el)
	return v
```

## World Bank Population (API Response + Existing Dataset)

### Overview

This transform is an example of combining a CSV from the web with lookup values in an existing qri dataset.  The World Bank API provides a CSV of total population, but it includes rows countries and aggregated entities combined.  This transform uses an existing qri dataset of ISO 3166 alpha_3 country codes to filter the World Bank API response, resulting in a dataset of total population for _countries_.

You'll need the country codes dataset to run this transform. Run `qri add b5/country_codes` before saving.

### Script

```python
load("http.star", "http")
load("encoding/csv.star", "csv")
load("zipfile.star", "ZipFile")

# world bank api only gives us access to country codes mixed with other (often useful!) country-like
# entities like "upper middle class" and "Sub-Saharan Africa (excluding high income)"
# we need a list of actual ISO 3166 alpha_3 country codes, which this dataset provides on column index 7
country_codes = load_dataset("b5/country_codes")

# download is a special function called automatically by Qri if defined
def download(ctx):
  # perform a HTTP GET request to the world bank API
  res = http.get("http://api.worldbank.org/v2/en/indicator/SP.POP.TOTL?downloadformat=csv")
  # response is a zip file with names that change on each download. first, open the zip archive:
  zf = ZipFile(res.body())
  # grab the 2nd file of three files, which contains the data we're after
  nl = zf.namelist()
  if len(nl) != 3:
    error("expected list of files to equal 3")
  # read raw data into a string
  rawCsvData = zf.open(nl[1]).read()
  # pass raw CSV data to the transform step
  return rawCsvData

# transform is a special function called automatically by Qri if defined
def transform(ds, ctx):
  countryCodes = [cc[7] for cc in country_codes.get_body()]

  # assign csv data from download to a variable
  rawCsvData = ctx.download
  # data comes with two citation-oriented header rows, let's lop them off by reading csv data
  parsedCsv = csv.read_all(rawCsvData, lazy_quotes=True, fields_per_record=-1, skip=2)

  # filter out "countries" that aren't valid ISO 3116 alpha 3 country codes
  onlyContries = [x for x in parsedCsv if x[1] in countryCodes]

  # construct dataset structure
  st = structure(parsedCsv[0])
  ds.set_structure(st)

  # convert back to csv data without header row
  csvString = csv.write_all(onlyContries)
  ds.set_body(csvString, parse_as='csv')

# structure is a custom function for extracting a dataset structure.
# we need this this because Qri doesn't guess the schema correctly for us
# so we build one by hand
def structure(header_row):
  items = [{ 'title': title, 'type': 'integer' } for title in header_row]
  for i in range(0,4):
    items[i]['type'] = 'string'

  return {
    'format': 'csv',
    'formatConfig': {
      'lazyQuotes' : True,
      'headerRow' : True,
    },
    'schema' : {
      'type' : 'array',
      'items' : {
        'type' : 'array',
        'items' : items
      }
    }
  }
```

## MTA Elevator Outages (Web Scraping)

### Overview

The New York MTA publishes [current subway station elevator outages](http://advisory.mtanyct.info/EEoutage/EEOutageReport.aspx?StationID=All) on the web.  This transform scrapes the website response using the Starlark `bsoup` package, parsing values from an html table into a CSV.  

Once a clean dataset version of the elevator statuses is in hand, the script appends the rows to the previous body with a timestamp for when the page was scraped. (each version of the dataset includes a full list of all observations since the dataset was created)

This transform is mean to be run on a schedule, perhaps once a day, for the purpose of providing a system-wide view of elevator outages over time.

### Script

```python

# load dependencies
load("encoding/csv.star", "csv")
load("http.star", "http")
load("time.star", "time")
load("bsoup.star", "bsoup")
load("re.star", "re")

# helper function for parsing text from bsoup nodes
# for this example, each td in the site we are scraping contains an h4
# this gets the text in the h4 and cleans white space with strip()
def parseColumn(columns, index):
  return columns[index].find('h4').get_text().strip()

# leftPad() pads input with zeroes, takes int or string as input
def leftPad(input, length):
  # convert int to string
  if type(input) == 'int':
    input = str(input)

  padded = input
  for i in range(len(input), length):
    padded = '0' + padded

  return padded

# given a time struct, returns an ISO8601 date+time string
def getISOTimestamp(t):
  year = leftPad(t.year(), 4)
  month = leftPad(t.month(), 2)
  day = leftPad(t.day(), 2)
  hour = leftPad(t.hour(), 2)
  minute = leftPad(t.minute(), 2)
  second = leftPad(t.second(), 2)
  offset = re.findall('\s([+-]\d{4})\s', str(t), flags=0)[0].strip()

  return '{}-{}-{}T{}:{}:{}{}'.format(year, month, day, hour, minute, second, offset)

# download() is executed automatically by qri and stores its return value for use in transform()
def download(ctx):
  # send an http get request to the elevator outages page
  res = http.get('http://advisory.mtanyct.info/EEoutage/EEOutageReport.aspx?StationID=All')

  # get the response body
  body = res.body()

  # parse the html with bsoup
  soup = bsoup.parseHtml(body)

  # use bsoup to navigate through the dom and find the table that has the outages
  table = soup.find('table').find('table').find('table').find('tbody').find_all('tr')[20].find('tbody')

  # rows is an array of bsoup nodes, each will become a row in our dataset
  rows = table.find_all('tr')

  # create an array of arrays to hold our CSV data
  csvData = []

  # get a timestamp for now to add to each row
  timestamp = getISOTimestamp(time.now())

  # loop over table rows (start at 1 to skip the first row), parse values into an array of strings
  for i in range(1, len(rows)):
    # use bsoup to select all the tds
    columns = rows[i].find_all('td')

    # parse column text using a custom parseColumn() function
    station_name = parseColumn(columns, 0)
    elevator_number = parseColumn(columns, 2)
    location = parseColumn(columns, 3)
    out_of_service = parseColumn(columns, 4)
    reason = parseColumn(columns, 5)
    estimated_return = parseColumn(columns, 6)

    # append an array of our row values to csvData
    csvData.append([ timestamp, station_name, elevator_number, location, out_of_service, reason, estimated_return])

  return csvData

def transform(ds, ctx):
  # the download() function was run by qri and stored its return value in ctx.download
  # use the csv package to convert the array of arrays into a CSV string

  # we want to append these rows to the dataset body
  # if there is already data in the body, do not append the header row again
  previousBody = ds.get_body()
  newBody = ctx.download

  # bodyArray will hold the new body to be written by the transform
  # the first row is the header row
  headerRow = ['timestamp', 'station_name', 'elevator_number', 'location', 'out_of_service', 'reason', 'estimated_return']
  bodyArray = [headerRow]

  # if there is a previous body, append its contents into bodyArray
  if previousBody != None:
    for row in previousBody:
        bodyArray.append(row)

  # now append the new rows
  for row in newBody:
    bodyArray.append(row)

  # use ds.set_body to commit the new body to our qri dataset
  body = csv.write_all(bodyArray)
  ds.set_body(body, parse_as='csv')
```
