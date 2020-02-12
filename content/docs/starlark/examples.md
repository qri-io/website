---
metaTitle: "Starlark Examples"
metaDescription: "Examples of Qri Transforms using the Starlark Scripting Language"
weight: 1
---


### qri and dataset modules
In Qri two "nonstandard" modules specific to qri are available. these modules are _not_ considered part of the standard library project, and are defined in a [different repository](https://github.com/qri-io/qri/tree/master/startf). They're described here to keep documentation complete:

* [qri](https://qri.io/docs/reference/starlib_qri_ds/#qri_module)
* [ds or dataset](https://qri.io/docs/reference/starlib_qri_ds/#dataset_object)

### Modules

* [http](#http_module)
* [bsoup](#bsoup_module)
* [html](#html_module)
* [math](#math_module)
* [re](#re_module)
* [time](#time_module)
* [xlsx](#xlsx_module)
* [zipfile](#zipfile_module)


** **

<a id="http_module"></a>
## http module

  _can only be used in the `download` function_

  _you can access these methods from the `http` module_

  * [http.delete](#delete)
  * [http.get](#http.get)
  * [http.options](#options)
  * [http.patch](#patch)
  * [http.post](#post)
  * [http.put](#put)

##### response object
  _you can access these methods from a response object_

  * [body](#body)
  * [encoding](#encoding)
  * [headers](#headers)
  * [json](#json)
  * [status_code](#status_code)
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

<!--
docrun:
  test:
    webproxy:
      url: https://www.fake-json-response-endpoint.com
      response: {"data":[4,5,6]}
    call: download(ctx)
    actual: ctx.download
    expect: {"data":[4.0,5.0,6.0]}
-->
```python
load("http.star", "http")

def download(ctx):
  res = http.get("https://www.fake-json-response-endpoint.com")
  return res.json()
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
I
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

<a id="body"></a>
#### body
`response.body()`

  returns the raw data as a string. This string can be passed to `bsoup(body_string)` or `html(body_string)` to return a parsed document.

<!--
docrun:
  test:
    webproxy:
      url: https://some-website-to-get-html.com
      response: "<html><body><div id='content'>test</div></body></html>"
    call: download(ctx)
    actual: ctx.download
    expect: "test"
-->
```python
load("http.star", "http")
load("html.star", "html")

def download(ctx):
  res = http.get("https://some-website-to-get-html.com")
  doc = html(res.body())
  return doc.find("#content").text()
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

<a id="url"></a>
#### url
`response.url`

   a string representation of the url

** **

<a id="bsoup_module"></a>
## bsoup module

_docs coming soon. In the meantime see https://godoc.org/github.com/qri-io/starlib/bsoup

** **

<a id="html_module"></a>
## html module

  _Note: You should prefer the newer `bsoup` module, which is more similar to python's Beautiful Soup library_

  _You can use the `html` function to parse an html response, to get a document object that you can traverse_

To load and parse:

<!--
docrun:
  test:
    webproxy:
      url: https://some-website.com
      response: "<html><body><h1>page</h1><div id='content'>test</div></body></html>"
    call: download(ctx)
    actual: ctx.download
    expect: "page"
-->
```python
load("html.star", "html")
load("http.star", "http")

def download(ctx):
  res = http.get("https://some-website.com")
  # parses the response body into something that
  # can be traversed using a jquery-like syntax
  doc = html(res.body())
  # get the text of the page header
  return doc.find("h1").text()
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

<!--
docrun:
  test:
    call: transform(ds, ctx)
    actual: ds.get_body()
    expect: ["hello world"]
# TODO: Test stdout as well.
-->
```python
load("html.star", "html")

def transform(ds, ctx):
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
```

<a id="children"></a>
#### children
`selection.children()`

  gets the child elements of each element in the Selection. It returns a new Selection object containing these elements

<!--
docrun:
  test:
    call: transform(ds, ctx)
    actual: stdout.get()
    expect: "4"
-->
```python
load("html.star", "html")

def transform(ds, ctx):
  example_html = '<body><p class="A">a</p><p class="B">b</p><p class="C">c</p><p class="D">d</p></body>'
  doc = html(example_html)
  # gives you a selection of the body element
  body = doc.find("body")
  # gives you a selection made up of the children of body
  children_len = body.children().len()
  print(children_len) # prints 4, specifically the 4 p elements
```

<a id="children_filtered"></a>
#### children_filtered
`selection.children_filtered(filter)`

  gets the child elements of each element in the selection, filtered by the specified by the `filter` string. It returns a new Selection object containing these elements

<!--
docrun:
  test:
    call: transform(ds, ctx)
    actual: stdout.get()
    expect: "aa"
-->
```python
load("html.star", "html")

def transform(ds, ctx):
  example_html = '<body><div><p class="A">a</p><p class="B">b</p></div><div><p class="A">a</p><p class="B">b</p></div></body>'
  doc = html(example_html)
  # find the body element and select it's two div element children
  divs = doc.find("body").children()
  # filter the divs to get the 2 p elements with class name ".A"
  p_as = divs.children_filtered(".A")
  print(p_as.text()) # prints "aa"
```
<a id="contents"></a>
#### contents
`selection.contents()`

  gets the children of each element in the Selection, including text and comment nodes. It returns a new Selection object containing these elements

<!--
docrun:
  test:
    call: transform(ds, ctx)
    actual: stdout.get()
    expect: "1\nabcd"
# TODO(dlong): This is broken. Prints 1, but the code expects 2.
-->
```python
load("html.star", "html")

def transform(ds, ctx):
  example_html = '<body><div><p class="A">a</p><p class="B">b</p></div><div><p class="C">c</p><p class="D">d</p></div></body>'
  doc = html(example_html)
  # get the body
  body = doc.contents()
  print(body.len()) # prints "2", the 2 div elements
  print(body.text()) # prints "abcd"
```

<a id="eq"></a>
#### eq
`selection.eq(index)`

  returns node i as a new selection

<!--
docrun:
  test:
    call: transform(ds, ctx)
    actual: stdout.get()
    expect: "4\n[\"a\", \"b\", \"c\", \"d\"]"
-->
```python
load("html.star", "html")

def transform(ds, ctx):
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
```

<a id="find"></a>
#### find
`selection.find(selector)`

  gets the descendants of each element in the current set of matched elements, filtered by a given `selector` string. It returns a new Selection containing these matched elements.

<!--
docrun:
  test:
    call: transform(ds, ctx)
    actual: stdout.get()
    expect: "2\nbb"
-->
```python
load("html.star", "html")

def transform(ds, ctx):
  example_html = '<body><p class="A">a</p><p class="B">b</p></div><div><p class="A">a</p><p class="B">b</p></div></body>'
  doc = html(example_html)
  # get the elements with the class ".B"
  p_Bs = doc.find(".B")
  print(p_Bs.len()) # prints "2", the 2 p elements with class ".B"
  print(p_Bs.text()) # prints "bb"
```

<a id="first"></a>
#### first
`selection.first()`

  returns the first element of the selection as a new selection

<!--
docrun:
  test:
    call: transform(ds, ctx)
    actual: stdout.get()
    expect: "ab"
-->
```python
load("html.star", "html")

def transform(ds, ctx):
  example_html = '<body><div><p class="A">a</p><p class="B">b</p></div><div><p class="C">c</p><p class="D">d</p></div></body>'
  doc = html(example_html)
  # get the body
  body = doc.find("body")
  # get the children of the body, in this case 2 divs
  divs = body.children()
  # get the first div
  div = divs.first()
  print(div.text()) # prints "ab"
```

<a id="filter"></a>
#### filter
`selection.filter(selector)`

  reduces the set of matched elements to those that match the `selector` string. It returns a new Selection object for this subset of matching elements

<!--
docrun:
  test:
    call: transform(ds, ctx)
    actual: stdout.get()
    expect: "4\n2\nbb"
-->
```python
load("html.star", "html")

def transform(ds, ctx):
  example_html = '<body><div><p class="A">a</p><p class="B">b</p></div><div><p class="A">a</p><p class="B">b</p></div></body>'
  doc = html(example_html)
  # get a list of all the p tags
  ps = doc.find("p")
  print(ps.len()) # prints "4", the 4 p elements
  # filter ps to find elements with class ".B"
  p_Bs = ps.filter(".B")
  print(p_Bs.len()) # prints "2", the 2 p elements with class ".B"
  print(p_Bs.text()) # prints "bb"
```

<a id="has"></a>
#### has
`selection.has()`

  reduces the set of matched elements to those that have a descendant that matches the `selector` string. It returns a new Selection object with the matching elements

<!--
docrun:
  test:
    call: transform(ds, ctx)
    actual: stdout.get()
    expect: "ab"
-->
```python
load("html.star", "html")

def transform(ds, ctx):
  example_html = '<body><div><p class="A">a</p><p class="B">b</p></div><div><p class="C">c</p><p class="D">d</p></div></body>'
  doc = html(example_html)
  # get body element
  divs = doc.find("body").children()
  # get div that has a child with class ".A"
  div = divs.has(".A")
  ps = div.children()
  print(ps.text()) # prints "ab", 2 p elements that exist in the div element
```

<a id="last"></a>
#### last
`selection.last()`

  returns the last element of the selection as a new selection

<!--
docrun:
  test:
    call: transform(ds, ctx)
    actual: stdout.get()
    expect: "cd"
-->
```python
load("html.star", "html")

def transform(ds, ctx):
  example_html = '<body><div><p class="A">a</p><p class="B">b</p></div><div><p class="C">c</p><p class="D">d</p></div></body>'
  doc = html(example_html)
  # get the body
  body = doc.find("body")
  # get the children of the body, in this case 2 divs
  divs = body.children()
  # get the first div
  div = divs.last()
  print(div.text()) # prints "cd"
```

<a id="len"></a>
#### len
`selection.len()`

  returns the length of the nodes in the selection as an integer

<!--
docrun:
  test:
    call: transform(ds, ctx)
    actual: stdout.get()
    expect: "1"
# TODO(dlong): This is broken
-->
```python
load("html.star", "html")

def transform(ds, ctx):
  example_html = '<body><p class="A">a</p><p class="B">b</p><p class="C">c</p><p class="D">d</p></body>'
  doc = html(example_html)
  # get the body
  body = doc.find("body")
  print(body.len()) # prints "4", the 4 p elements
```

<a id="parent}"></a>
#### parent
`selection.parent()`

  gets the parent of each element in the Selection. It returns a new Selection object containing the matched elements

<!--
docrun:
  test:
    call: transform(ds, ctx)
    actual: stdout.get()
    expect: "2\nhi"
-->
```python
load("html.star", "html")

def transform(ds, ctx):
  example_html = '<body><div title="hi"><p class="A">a</p><p class="B">b</p></div><div><p class="C">c</p><p class="D">d</p></div></body>'
  doc = html(example_html)
  # select p elements
  ps = doc.find("p")
  # get parents of p elements, in this case 2 divs
  divs = ps.parent()
  print(divs.len()) # 2 div parent elements
  title = divs.first().attr("title")
  print(title)
```

<a id="parents_until"></a>
#### parents_until
`selection.parents_until(selector)`

  gets the ancestors of each element in the Selection, up to but not including the element matched by the `selector` string. It returns a new Selection object containing the matched elements

<!--
docrun:
  test:
    call: transform(ds, ctx)
    actual: stdout.get()
    expect: "4\nbye\nhi\nweee\nwoo"
-->
```python
load("html.star", "html")

def transform(ds, ctx):
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
```

<a id="siblings"></a>
#### siblings
`selection.siblings()`

  gets the siblings of each element in the Selection. It returns a new Selection object containing the matched elements

<!--
docrun:
  test:
    call: transform(ds, ctx)
    actual: stdout.get()
    expect: "1\nb"
-->
```python
load("html.star", "html")

def transform(ds, ctx):
  example_html = '<body><div><p class="A">a</p><p class="B">b</p></div><div><p class="C">c</p><p class="D">d</p></div></body>'
  doc = html(example_html)
  # select elements with class ".A"
  a = doc.find(".A")
  # get all parents of the p elements, but doesn't include the body element
  b = a.siblings()
  print(b.len()) # prints "1", the p element with class ".B"
  print(b.text()) # prints "b"
```

<a id="html_text"></a>
#### text
`text()`

  gets the combined text contents of each element in the set of matched elements, including their descendants

<!--
docrun:
  test:
    call: transform(ds, ctx)
    actual: stdout.get()
    expect: "abcd"
-->
```python
load("html.star", "html")

def transform(ds, ctx):
  example_html = '<body><div><p class="A">a</p><p class="B">b</p></div><div><p class="C">c</p><p class="D">d</p></div></body>'
  doc = html(example_html)
  print(doc.text()) # prints "abcd"
```


** **

<a id="math_module"></a>
## math module

_docs coming soon. In the meantime see https://godoc.org/github.com/qri-io/starlib/math_

<a id="re_module"></a>
## re module

_docs coming soon. In the meantime see https://godoc.org/github.com/qri-io/starlib/re_

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

<!--
docrun:
  test:
    call: transform(ds, ctx)
    actual: stdout.get()
    expect: "10\n31\n2018"
-->
```python
load("time.star", "time")

def transform(ds, ctx):
  # an example with no format or location string
  time_string = "2018-10-31T00:00:00Z"
  t = time.time(time_string)
  print(t.month()) # prints 10
  print(t.day()) # prints 31
  print(t.year()) # prints 2018
```

<!--
docrun:
  test:
    call: transform(ds, ctx)
    actual: stdout.get()
    expect: "11\n15\n2018"
# TODO(dlong): This is broken
-->
```python
load("time.star", "time")

def transform(ds, ctx):
  # an example with a format and location string:
  # basically, as long as you use the data
  # Mon Jan 2 15:04:05 -0700 MST 2006 as a reference, you are good
  print(time.location("America/New_York"))
  t = time.time("November 15, 2018", "January 2, 2006", "America/New_York")
  print(t.month()) # prints 11
  print(t.day()) # prints 15
  print(t.year()) # prints 2018
```

<a id="duration"></a>
#### duration
`time.duration(duration_string)`

  converts a string in '00h0m0s' format to a duration object, returns a duration.

<!--
docrun:
  test:
    call: transform(ds, ctx)
    actual: stdout.get()
    expect: "451h24m0s\n1s\n451h24m1s\n451h23m59s\nTrue"
-->
```python
load("time.star", "time")

def transform(ds, ctx):
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
  print(d1 - d2) # prints "451h23m59s"
  #
  # create another duration, same length as d2
  #
  d3 = time.duration(duration_2_str)
  print( d2 == d3 ) # prints True
```
  You also get a duration when you subtract two times:

<!--
docrun:
  test:
    call: transform(ds, ctx)
    actual: stdout.get()
    expect: "2018-10-31 00:00:00 +0000 UTC"
# TODO(dlong): This is broken
-->
```python
load("time.star", "time")

def transform(ds, ctx):
  oct_1 = "2018-10-01T00:00:00Z"
  halloween = "2018-10-31T00:00:00Z"
  f = time.time(oct_1)
  h = time.time(halloween)
  duration = h

  f # subtracting two time values gives you a duration
  print(duration) # prints "720h0m0s"
```

<a id="location"></a>
#### location
`time.location(location_string)`

  loads location based on string. Empty string returns "UTC"

<!--
docrun:
  test:
    call: transform(ds, ctx)
    actual: stdout.get()
    expect: "EST"
-->
```python
load("time.star", "time")

def transform(ds, ctx):
  loc = time.location("EST")
  print(loc) # returns "EST"
```

<a id="now"></a>
#### now
`time.now()`

  returns the current time

<!--
docrun:
  pass: true
# TODO(dlong): Need way to mock current time
-->
```python
load("time.star", "time")

def transform(ds, ctx):
  now = time.now()
  print(now) # returns current time
  #
  # print date in MM/DD/YYYY format:
  print(str(now.month()) + "/" + str(now.day()) + "/" + str(now.year()))
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

<!--
docrun:
  pass: true
# TODO(dlong): Need to also mock network for xlsx
-->
```python
load("xlsx.star", "xlsx")

def download(ctx):
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
  # return the first 10 rows as the body:
  return rows[:10]
```

<a id="get_sheets"></a>
#### get_sheets
`x.get_sheets()`

  returns a map of ints to sheet names, indexing starts with 1. See above `get_url` example for use.

<a id="get_rows"></a>
#### get_rows
`x.get_rows(sheet_name)`

  returns a 2 dimensional list of data from the specified sheet. See above `get_url` example for use

<a id="zipfile_module"></a>
## zipfile module

_docs coming soon. In the meantime see https://godoc.org/github.com/qri-io/shearlib/zipfile
