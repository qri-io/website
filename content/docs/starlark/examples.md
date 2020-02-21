---
metaTitle: "Examples"
metaDescription: "Example Starlark Transforms"
weight: 1
---

import InfoBlock from '../../../src/components/InfoBlock.js'

<InfoBlock>
  This documentation is for qri CLI (command line) only. Composing Transform scripts on Desktop is a work in progress
</InfoBlock>

## Running Example Transforms

1. create a new directory: `mkdir example`
2. `cd` into that directory: `cd example`
3. run `qri init` to create a new dataset
4. delete the `body` and `structure.json` files that init creates
5. create a new file called `transform.star`
6. copy example code into that file
7. run `qri save`

When you're finished, you can delete the dataset with `qri remove --all me/example`, where `example` is the name of your dataset.

-- --


## NYC Complaints By Boro

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


## World Bank Population

You'll need the country codes dataset to run this transform. run `qri add b5/country_codes` before saving.

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