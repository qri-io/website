---
title: "starlib reference"
description: "list of all the functions and modules in starlark standard library"
date: 2018-01-30T00:00:00-04:00
section: reference
---


# Starlark Standard Library Modules

* [qri](#qri_module)
* [ds or dataset](#dataset_object)
* [http](#http_module)
* [html](#html_module)
* [time](#time_module)
* [xlsx](#xlsx_module)


** **

<a id="qri_module"></a>
## qri module
  _you can access these methods from the `qri` module, eg `qri.get_config()`_

  * [get_config](#get_config)
  * [get_secret](#get_secret)
  * [list_datasets](#list_datasets)
  * [load_dataset_body](#load_dataset_body)
  * [load_dataset_head](#load_dataset_head)

To load:

```python
load("qri.sky", "qri")
```

** **

## Function Definitions:

<a id="get_config"></a>
#### get_config 
`qri.get_config(key)`

  returns the value of a config variable, declared in the dataset file:

```yaml
# in the dataset.yaml file:
transform:
  scriptpath: transform.sky
  config:
    key: value
```

<a id="get_secret"></a>
#### get_secret 
`qri.get_secret(key)`

  returns the value of a secrets variable, declared in the dataset file:

```yaml
# in the dataset.yaml file:
transform:
  scriptpath: transform.sky
  secrets:
    key: value
```

<a id="list_datasets"></a>
#### list_datasets
`qri.list_datasets()`

  returns list of datasets references available on your qri node

```python
load("qri.sky", "qri")

def transform(ds):
  datasets = qri.list_datasets()
  #
  # prints a list of string dataset references
  print(datasets) 
  #
  # create a dataset that contains a list of your datasets:
  ds.set_body(datasets)
  return ds
```

<a id="load_dataset_body"></a>
#### load_dataset_body
`qri.load_dataset_body(dataset_referece)`

  returns the body of the specified dataset as a list or dictionary. [Read more about dataset references](/docs/concepts/names)

```python
load("qri.sky", "qri")

def transform(ds):
  # let's say there is a dataset named "2017_billboard_top_100" and a dataset named "2018_billboard_top_100"
  # let's create a dataset of the artists that are on both lists:
  billboard_2017 = qri.load_dataset_body("me/2017_billboard_top_100")
  billboard_2018 = qri.load_dataset_body("me/2018_billboard_top_100")
  #
  artists = []
  for i in range(0, len(billboard_2017)):
    artist = billboard_2017[i]['artist']
    #
    # if we've already encountered this artist,
    # move on to the next one
    if artist in artists:
      continue
    #
    # iterate through billboard_2018, if this artist
    # appears there, add it to the list of artists
    # and break out of the for loop
    for j in range(0, len(billboard_2018)):
      if artist == billboard_2018[j]['artist']:
        artists.append(artist)
        break
  #
  # ensure the list is unique
  artists = list(set(artists))
  ds.set_Body(artists)
  return ds
```

<a id="load_dataset_head"></a>
#### load_dataset_head
`qri.load_dataset_head()`

  loads all the parts of the dataset, except for the body, as a dictionary with all or some of these keys: `meta`, `structure`, `commit`, `transform`, `viz`. If the dataset does not contain a transform, for example, then the dataset head dictionary will not contain a `transform` field.

```python
load("qri.sky", "qri")

def transform(ds):
  # let's say you want to create a dataset that contains some
  # descriptive elements of a previous dataset
  # in this case, the meta, the description, and the format
  head = qri.load_dataset_head("me/previous_dataset")
  #
  title = ""
  description = ""
  format = ""
  #
  if "meta" in head:
    if "title" in head["meta"]:
      title = head["meta"]["title"]
    if "description" in head["meta"]:
      description = head["meta"]["description"]
  #
  if "structure" in head:
    if "format" in head["structure"]:
      format = head["structure"]["format"]
  #
  ds.set_body({"title":title, "description": description, "format": format})
  return ds
```

** **

<a id="dataset_object"></a>
## dataset object - ds
  _you can access these methods from the `dataset` object. A dataset object gets passed into and returned from the `transform` and `download` functions, usually referred to as `ds`_

* [set_meta](#set_meta)
* [set_schema](#set_schema)
* [get_body](#get_body)
* [set_body](#set_body)  

** **

## Function Definitions:

<a id="get_body"></a>
#### get_body 
`ds.get_body()`

  returns the body of the current dataset as a list or dictionary

<a id="set_body"></a>
#### set_body 
`ds.set_body(body, raw)`

`body` should usually be a list or a dictionary. `raw` is a boolean value. If true, it expects `body` to be a string and will store the body as byte data. Returns `None`.

<a id="set_meta"></a>
#### set_meta 
`ds.set_meta(field, value)`

  Sets a specific field of the meta to the value. `field` and `value` are both strings. Returns `None`.

```python
load("qri.sky", "qri")

def transform(ds):
  ds.set_meta("title", "Reference Transform")
  return ds
```

<a id="set_schema"></a>
#### set_schema 
`ds.set_schema(value)`

`value` is a dictionary written as a [json schema](https://json-schema.org/). Returns `None`

```python
load("qri.sky", "qri")

def transform(ds):
  schema = {
    "type": "array",
    "items": {
      "type": "array",
      "items": [{
          "description": "type of animal",
          "title": "Animal",
          "type": "string"
        }, {
          "description": "number of legs this animal has",
          "title": "Number of Legs",
          "type": "integer"
        }
      ]
    }
  }

  ds.set_schema(schema)
  ds.set_body([
    ["cat", 4],
    ["bird", 2],
    ["snake", 0]
  ])
  return ds
```

** **

<a id="html_module"></a>
## html module
  _can only be used in the `download` function. You must use the `html` function to parse an html response, to get a document  object that you can traverse_

To load and parse:

```python
load("html.sky", "html")
load("http.sky", "http")

def download(ds):
  res = http.get("https://some-website.com")
  # parses the response body into something that 
  # can be traversed using a jquery-like syntax
  doc = html(res.content())
  return ds
```

  _The following methods can be used on the document object that gets returned by using the `html` function:_ 

  * [attr](#attr)
  * [children](#children)
  * [children_filtered](#children_filtered)
  * [contents](#contents)
  * [eq](#eq)
  * [find](#find)
  * [first](#first)
  * [filter](#filter)
  * [get](#get)
  * [has](#has)
  * [last](#last)
  * [len](#len)
  * [parent](#parent)
  * [parents_until](#parents_until)
  * [siblings](#siblings)
  * [text](#html_text)

** **

## Function Definitions:

<a id="attr"></a>
#### attr 
`selection.attr(attribute)`

  Returns a string of the given attribute for that selection in the document. `attribute` is a string.

```python
load("html.sky", "html")

def transform(ds):
  example_html = '<div title="hello world" class="example_class_name"><p>test</p></div>'
  #
  # find returns a list of elements that match the search string:
  divs = html(example_html).find("div")
  #
  # get the first element in the list:
  div = divs.first()
  #
  # get the attr with the key "title"
  attr = div.attr("title")
  print(attr) # prints "hello world"
  #
  ds.set_body([attr])
  return ds
```

<a id="children"></a>
#### children 
`selection.children()`

  gets the child elements of each element in the Selection. It returns a new Selection object containing these elements

```python
load("html.sky", "html")

def transform(ds):
  example_html = '<body><p class="A">a</p><p class="B">b</p><p class="C">c</p><p class="D">d</p></body>'
  doc = html(example_html)
  # gives you a selection of the body element
  body = doc.find("body")
  # gives you a selection made up of the children of body
  children_len = body.children().len()
  print(children_len) # prints 4, specifically the 4 p elements
  return ds
```

<a id="children_filtered"></a>
#### children_filtered 
`selection.children_filtered(filter)`

  gets the child elements of each element in the selection, filtered by the specified by the `filter` string. It returns a new Selection object containing these elements

```python
load("html.sky", "html")

def transform(ds):
  example_html = '<body><div><p class="A">a</p><p class="B">b</p></div><div><p class="A">a</p><p class="B">b</p></div></body>'
  doc = html(example_html)
  # find the body element and select it's two div element children
  divs = doc.find("body").children()
  # filter the divs to get the 2 p elements with class name ".A"
  p_as = divs.children_filtered(".A") 
  print(p_as.text()) # prints "aa"
  return ds
```
<a id="contents"></a>
#### contents 
`selection.contents()`

  gets the children of each element in the Selection, including text and comment nodes. It returns a new Selection object containing these elements

```python
load("html.sky", "html")

def transform(ds):
  example_html = '<body><div><p class="A">a</p><p class="B">b</p></div><div><p class="C">c</p><p class="D">d</p></div></body>'
  doc = html(example_html)
  # get the body
  body = doc.contents()
  print(body.len()) # prints "2", the 2 div elements
  print(body.text()) # prints "abcd"
  return ds
```

<a id="eq"></a>
#### eq 
`selection.eq(index)`

  returns node i as a new selection

```python
load("html.sky", "html")

def transform(ds):
  example_html = '<body><div><p class="A">a</p><p class="B">b</p></div><div><p class="C">c</p><p class="D">d</p></div></body>'
  doc = html(example_html)
  #
  # get the body
  body = doc.find("p")
  print(body.len()) # prints "4", the 4 p elements
  #
  # create list of the text in each element:
  texts = []
  for i in range(body.len()):
    # use `eq` function to access each node
    texts.append(body.eq(i).text())
  print(texts) # prints ["a", "b", "c", "d"]
  #
  ds.set_body(texts)
  return ds
```

<a id="find"></a>
#### find 
`selection.find(selector)`

  gets the descendants of each element in the current set of matched elements, filtered by a given `selector` string. It returns a new Selection containing these matched elements.

```python
load("html.sky", "html")

def transform(ds):
  example_html = '<body><p class="A">a</p><p class="B">b</p></div><div><p class="A">a</p><p class="B">b</p></div></body>'
  doc = html(example_html)
  # get the elements with the class ".B"
  p_Bs = doc.find(".B")
  print(p_Bs.len()) # prints "2", the 2 p elements with class ".B"
  print(p_Bs.text()) # prints "bb"
  return ds
```

<a id="first"></a>
#### first 
`selection.first()`

  returns the first element of the selection as a new selection

```python
load("html.sky", "html")

def transform(ds):
  example_html = '<body><div><p class="A">a</p><p class="B">b</p></div><div><p class="C">c</p><p class="D">d</p></div></body>'
  doc = html(example_html)
  # get the body
  body = doc.find("body")
  # get the children of the body, in this case 2 divs
  divs = body.children()
  # get the first div
  div = divs.first()
  print(div.text()) # prints "ab"
  return ds
```

<a id="filter"></a>
#### filter 
`selection.filter(selector)`

  reduces the set of matched elements to those that match the `selector` string. It returns a new Selection object for this subset of matching elements

```python
load("html.sky", "html")

def transform(ds):
  example_html = '<body><div><p class="A">a</p><p class="B">b</p></div><div><p class="A">a</p><p class="B">b</p></div></body>'
  doc = html(example_html)
  # get a list of all the p tags
  ps = doc.find("p")
  print(ps.len()) # prints "4", the 4 p elements
  # filter ps to find elements with class ".B"
  p_Bs = ps.filter(".B")
  print(p_Bs.len()) # prints "2", the 2 p elements with class ".B"
  print(p_Bs.text()) # prints "bb"
  return ds
```

<a id="has"></a>
#### has 
`selection.has()`

  reduces the set of matched elements to those that have a descendant that matches the `selector` string. It returns a new Selection object with the matching elements

```python
load("html.sky", "html")

def transform(ds):
  example_html = '<body><div><p class="A">a</p><p class="B">b</p></div><div><p class="C">c</p><p class="D">d</p></div></body>'
  doc = html(example_html)
  # get body element
  divs = doc.find("body").children()
  # get div that has a child with class ".A"
  div = divs.has(".A")
  ps = div.children()
  print(ps.text()) # prints "ab", 2 p elements that exist in the div element
  return ds
```

<a id="last"></a>
#### last 
`selection.last()`

  returns the last element of the selection as a new selection

```python
load("html.sky", "html")

def transform(ds):
  example_html = '<body><div><p class="A">a</p><p class="B">b</p></div><div><p class="C">c</p><p class="D">d</p></div></body>'
  doc = html(example_html)
  # get the body
  body = doc.find("body")
  # get the children of the body, in this case 2 divs
  divs = body.children()
  # get the first div
  div = divs.last()
  print(div.text()) # prints "cd"
  return ds
```

<a id="len"></a>
#### len 
`selection.len()`

  returns the length of the nodes in the selection as an integer

```python
load("html.sky", "html")

def transform(ds):
  example_html = '<body><p class="A">a</p><p class="B">b</p><p class="C">c</p><p class="D">d</p></body>'
  doc = html(example_html)
  # get the body
  body = doc.find("body")
  print(body.len()) # prints "4", the 4 p elements
  return ds
```

<a id="parent}"></a>
#### parent 
`selection.parent()`

  gets the parent of each element in the Selection. It returns a new Selection object containing the matched elements

```python
load("html.sky", "html")

def transform(ds):
  example_html = '<body><div title="hi"><p class="A">a</p><p class="B">b</p></div><div><p class="C">c</p><p class="D">d</p></div></body>'
  doc = html(example_html)
  # select p elements
  ps = doc.find("p")
  # get parents of p elements, in this case 2 divs
  divs = ps.parent()
  print(divs.len()) # 2 div parent elements
  title = divs.first().attr("title")
  print(title)
  return ds
```

<a id="parents_until"></a>
#### parents_until 
`selection.parents_until(selector)`

  gets the ancestors of each element in the Selection, up to but not including the element matched by the `selector` string. It returns a new Selection object containing the matched elements

```python
load("html.sky", "html")

def transform(ds):
  example_html = '<body><div title="hi"><span title="bye"><p class="A">a</p><p class="B">b</p></span></div><div title="woo"><span title="weee"><p class="C">c</p><p class="D">d</p></span></div></body>'
  doc = html(example_html)
  # select p elements
  ps = doc.find("p")
  # get all parents of the p elements, but doesn't include the body element
  parents = ps.parents_until("body")
  print(parents.len()) # 4 div parent elements
  print(parents.eq(0).attr("title")) # prints "bye"
  print(parents.eq(1).attr("title")) # prints "hi"
  print(parents.eq(2).attr("title")) # prints "weee"
  print(parents.eq(3).attr("title")) # prints "woo"
  return ds
```

<a id="siblings"></a>
#### siblings 
`selection.siblings()`

  gets the siblings of each element in the Selection. It returns a new Selection object containing the matched elements

```python
load("html.sky", "html")

def transform(ds):
  example_html = '<body><div><p class="A">a</p><p class="B">b</p></div><div><p class="C">c</p><p class="D">d</p></div></body>'
  doc = html(example_html)
  # select elements with class ".A"
  a = doc.find(".A")
  # get all parents of the p elements, but doesn't include the body element
  b = a.siblings()
  print(b.len()) # prints "1", the p element with class ".B"
  print(b.text()) # prints "b"
  return ds
```

<a id="html_text"></a>
#### text 
`text()`

  gets the combined text contents of each element in the set of matched elements, including their descendants

```python
load("html.sky", "html")

def transform(ds):
  example_html = '<body><div><p class="A">a</p><p class="B">b</p></div><div><p class="C">c</p><p class="D">d</p></div></body>'
  doc = html(example_html)
  a = doc.text() # prints "abcd"
  return ds
```

** **

<a id="http_module"></a>
## http module
  _you can access these methods from the `http` module_

  * [http.delete](#delete)
  * [http.get](#http.get)
  * [http.options](#options)
  * [http.patch](#patch)
  * [http.post](#post)
  * [http.put](#put)

##### response object
  _you can access these methods from a response object_

  * [content](#content)
  * [encoding](#encoding)
  * [headers](#headers)
  * [json](#json)
  * [status_code](#status_code)
  * [text](#text)
  * [url](#url)

** **

## Function Definitions:

<a id="delete"></a>
#### delete 
`http.delete(url, params, headers, data, jsondata, auth)`

  sends a DELETE request to the given url. Returns a response.

| param | type | optional? |
|----|------|------|
| url | string url | no |
| params | dictionary of param names to param values | yes |
| headers | dictionary of header names to header values | yes |
| data | dictionary | yes |
| jsondata | dictionary or list | yes |
| auth | string | yes | 

<a id="get"></a>
#### get
`http.get(url, params, headers, data, jsondata, auth)`

  sends a GET request to the given url. Returns a response.

| param | type | optional? |
|----|------|------|
| url | string url | no |
| params | dictionary of param names to param values | yes |
| headers | dictionary of header names to header values | yes |
| data | dictionary | yes |
| jsondata | dictionary or list | yes |
| auth | string | yes |   

```python
load("http.sky", "http")

def download(ds):
  res = http.get("https://www.fake-json-response-endpoint.com")
  ds.set_body(res.json())
  return ds
```

<a id="options"></a>
#### options 
`http.options(url, params, headers, data, jsondata, auth)`

  Sends an OPTIONS request to the given url. Returns a response.

| param | type | optional? |
|----|------|------|
| url | string url | no |
| params | dictionary of param names to param values | yes |
| headers | dictionary of header names to header values | yes |
| data | dictionary | yes |
| jsondata | dictionary or list | yes |
| auth | string | yes |   

<a id="patch"></a>
#### patch 
`http.patch(url, params, headers, data, jsondata, auth)`

  Sends a PATCH request to the given url. Returns a response.

| param | type | optional? |
|----|------|------|
| url | string url | no |
| params | dictionary of param names to param values | yes |
| headers | dictionary of header names to header values | yes |
| data | dictionary | yes |
| jsondata | dictionary or list | yes |
| auth | string | yes | 

<a id="post"></a>
#### post 
`http.post(url, params, headers, data, jsondata, auth)`

  Sends a POST request to the given url. Returns a response.

| param | type | optional? |
|----|------|------|
| url | string url | no |
| params | dictionary of param names to param values | yes |
| headers | dictionary of header names to header values | yes |
| data | dictionary | yes |
| jsondata | dictionary or list | yes |
| auth | string | yes | 

  
<a id="put"></a>
#### put 
`http.put(url, params, headers, data, jsondata, auth)`

Sends a PUT request to the given url. Returns a response.

| param | type | optional? |
|----|------|------|
| url | string url | no |
| params | dictionary of param names to param values | yes |
| headers | dictionary of header names to header values | yes |
| data | dictionary | yes |
| jsondata | dictionary or list | yes |
| auth | string | yes | 

** **

## response

<a id="content"></a>
#### content 
`response.content()`

  returns the raw data as a string. This string can be passed to `html(content_string)` to return a document that can be parsed by the `html` functions.

```python
load("http.sky", "http")
load("html.sky", "html")

def download(ds):
  res = http.get("https://some-website-to-get-html.com")
  doc = html(res.content())
  # do stuff here with html document
  ds.set_body(some_data)
  return ds
```

<a id="encoding"></a>
#### encoding 
`response.encoding`

  a string, the different forms of encoding used in the response.
  
<a id="headers"></a>
#### headers 
`response.headers`

  a dictionary of the response headers.
  
<a id="json"></a>
#### json 
`response.json()`

  attempts the response body as json.
  
<a id="status_code"></a>
#### status_code 
`response.status_code`

  an integer, the status code of the response.
  
<a id="text"></a>
#### text 
`response.text()`

  returns the raw data as a string. This string can be passed to `html(text)` to return a document that can be parsed by the `html` functions.
  
<a id="url"></a>
#### url 
`response.url`

   a string representation of the url

** **

<a id="time_module"></a>
## time module
  _you can access these methods from the `time` module:_ 

  * [time.time](#time) 
  * [time.duration](#duration)  
  * [time.location](#location)  
  * [time.now](#now)  

##### time object
  _you can access these methods from a `time` object:_
  
  * [year](#year)  
  * [month](#month)  
  * [day](#day)  
  * [hour](#hour)  
  * [minute](#minute)  
  * [second](#second)  
  * [nanosecond](#nanosecond)  

** **

## Function Definitions:

<a id="time"></a>
#### time
`time.time(time_string, format_string, location_string)`

  converts a time string, that is in format to a time object. Returns a time object. If no format or location are given, it assumes you mean to to use RFC3339: "2006-01-02T15:04:05Z07:00". To learn more about format strings checkout to [time/format](https://golang.org/src/time/format.go) golang page, or this [helpful blog post](https://flaviocopes.com/go-date-time-format/) from flaviocopes

```python
load("time.sky", "time")

def transform(ds):
  # an example with no format or location string
  time_string = "2018-10-31T00:00:00Z"
  t = time.time(time_string)
  print(t.month()) # prints 10
  print(t.day()) # prints 31
  print(t.year()) # prints 2018
  return ds
```

```python
load("time.sky", "time")

def transform(ds):
  # an example with a format and location string:
  # basically, as long as you use the data
  # Mon Jan 2 15:04:05 -0700 MST 2006 as a reference, you are good
  print(time.location("America/New_York"))
  t = time.time("November 15, 2018", "January 2, 2006", "America/New_York")
  print(t.month()) # prints 11
  print(t.day()) # prints 15
  print(t.year()) # prints 2018
  return ds 
```

<a id="duration"></a>
#### duration
`time.duration(duration_string)`

  converts a string in '00h0m0s' format to a duration object, returns a duration.

```python
load("time.sky", "time")

def transform(ds):
  duration_1_str = "450h79m300s"
  duration_2_str = "0h0m1s"
  #
  d1 = time.duration(duration_1_str)
  print(d1) # prints "451h24m0s", notice how it parsed the string and converted 300 seconds into 5 min, and 79 + 5 min into 1hr 24 min
  #
  d2 = time.duration(duration_2_str)
  print(d2) # prints "1s"
  #
  print(d1 + d2) # prints "451h24m1s"
  print(d1

  d2) # prints "451h23m59s"
  #
  # create another duration, same length as d2
  #
  d3 = time.duration(duration_2_str)
  print( d2 == d3 ) # prints true
  return ds
```
  You also get a duration when you subtract two times:

```python
load("time.sky", "time")

def transform(ds):
  oct_1 = "2018-10-01T00:00:00Z"
  halloween = "2018-10-31T00:00:00Z"
  f = time.time(oct_1)
  h = time.time(halloween)
  duration = h

  f # subtracting two time values gives you a duration
  print(duration) # prints "720h0m0s"
  return ds
```

<a id="location"></a>
#### location
`time.location(location_string)`

  loads location based on string. Empty string returns "UTC"

```python
load("time.sky", "time")

def transform(ds):
  loc = time.location("EST")
  print(loc) # returns "EST"
  return ds
```

<a id="now"></a>
#### now
`time.now()`

  returns the current time

```python
load("time.sky", "time")

def transform(ds):
  now = time.now()
  print(now) # returns current time
  #
  # print date in MM/DD/YYYY format:
  print(str(now.month()) + "/" + str(now.day()) + "/" + str(now.year()))
  return ds
```

<a id="year"></a>
#### year
`t.year()`

  returns year as int

<a id="month"></a>
#### month
`t.month()`

  returns month as int

<a id="day"></a>
#### day
`t.day()`

  returns day as int

<a id="hour"></a>
#### hour
`t.hour()`

  returns hour as int

<a id="minute"></a>
#### minute
`t.minute()`

  returns minute as int

<a id="second"></a>
#### second
`t.second()`

  returns second as int

<a id="nanosecond"></a>
#### nanosecond
`t.nanosecond()`

  returns nanosecond as int

** **

<a id="xlsx_module"></a>
## xlsx module
  _you can access these methods from the `xlsx` module. `xlsx` can only be used in the `download` function:_

  * [xlsx.get_url](#get_url)
  * [get_sheets](#get_sheets)
  * [get_rows](#get_rows)

** **

## Function Definitions:

<a id="get_url"></a>
#### xlsx.get_url
`xlsx.get_url(url)`

  makes a get request of the url, attempts to return the body as a xlsx file. Can only be used in the `download` function 

This example shows how to use `get_url`, `get_sheets`, and `get_rows`:
```python
load("xlsx.sky", "xlsx")

def download(ds):
  data = xlsx.get_url("https://www.ntia.doc.gov/files/ntia/publications/225-5000-composite-inventory_2015-12-16.xlsx")
  #
  # get the sheets of the xlsx file
  # and print. Will print out a map of ints to sheet names:
  sheets = data.get_sheets()
  print(sheets)
  #
  # get name of first sheet and print:
  sheet1 = sheets[1]
  print(sheet1) # prints "Sheet1"
  #
  # get data from sheet 1 and print:
  rows = data.get_rows(sheet1)
  print(rows) # prints 2d list of data
  #
  # set the first 10 rows as the body:
  ds.set_body(rows[:10])
  return ds
```

<a id="get_sheets"></a>
#### get_sheets
`x.get_sheets()`

  returns a map of ints to sheet names, indexing starts with 1. See above `get_url` example for use.

<a id="get_rows"></a>
#### get_rows
`x.get_rows(sheet_name)`

  returns a 2 dimentional list of data from the specified sheet. See above `get_url` example for use