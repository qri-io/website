---
title: "starlib reference"
description: "list of all the functions and modules in starlark standard library"
date: 2018-01-30T00:00:00-04:00
section: reference
---


# Starlark modules

* [qri](#qri_module)
* [http](#http_module)
* [html](#html_module)
* [time](#time_module)
* [xlsx](#xlsx_module)

** **

<a id="qri_module"></a>
#### qri
  _you can access these methods from the `qri` object, eg `qri.get_body()`_

  * [get_body](#get_body)
  * [get_config](#get_config)
  * [get_secret](#get_secret)
  * [set_meta](#set_meta)
  * [set_schema](#set_schema)

To load:

```python
load("qri.sky", "qri")
```

<a id="http_module"></a>
#### http
  _you can access these methods from the `http` module_

  * [http.delete](#delete)
  * [http.get](#http.get)
  * [http.options](#options)
  * [http.patch](#patch)
  * [http.post](#post)
  * [http.put](#put)

##### response
  _you can access these methods from a response object_

  * [content](#content)
  * [encoding](#encoding)
  * [headers](#headers)
  * [json](#json)
  * [status_code](#status_code)
  * [text](#text)
  * [url](#url)

<a id="html_module"></a>
#### html
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

<a id="time_module"></a>
#### time
  * [time.time](#time)
  * [time.duration](#duration)
  * [time.location](#location)
  * [time.now](#now)
  * [time.zero](#now)

##### time
  * [year](#year)
  * [month](#month)
  * [day](#day)
  * [hour](#hour)
  * [minute](#minute)
  * [second](#second)
  * [nanosecond](#nanosecond)

<a id="xlsx_module"></a>
#### xlsx

  * [xlsx.get_url](#get_url)
  * [get_sheets](#get_sheets)
  * [get_rows](#get_rows)

** **

### Function Definitions

<a id="get_body}"></a>
#### get_body 

  `qri.get_body()` - returns the body from the data from the body file

<a id="get_config"></a>
#### get_config 
  `qri.get_config(key)` - returns the value of a config variable, declared in the dataset file:

```yaml
# in the dataset.yaml file:
transform:
  scriptpath: transform.sky
  config:
    key: value
```

<a id="get_secret"></a>
#### get_secret 
  `qri.get_secret(key)` - returns the value of a secrets variable, declared in the dataset file:

```yaml
# in the dataset.yaml file:
transform:
  scriptpath: transform.sky
  secrets:
    key: value
```

<a id="set_meta"></a>
#### set_meta 
  `qri.set_meta(field, value)` - Sets the meta at specific field to the value

<a id="set_schema"></a>
#### set_schema 
  `qri.set_schema(value)` - Sets the schema to the object found at value. Schemas are written as [json schemas](#)

<a id="attr"></a>
#### attr 
  `selection.attr(attribute)` - Returns a string of the given attribute for that selection in the document. For example:

  ``` python
  example_html = '<div class="example_class_name"><p>test</p></div>'
  doc = html(example_html)
  doc.attr("class") # is equal to 'example_class_name'
  ```

<a id="children"></a>
#### children 
  `selection.children()` - gets the child elements of each element in the Selection. It returns a new Selection object containing these elements

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
  ds.set_body(["need to set a body"])
  return ds
```

<a id="children_filtered"></a>
#### children_filtered 
  `selection.children_filtered(filter)` - gets the child elements of each element in the selection, filtered by the specified selector. It returns a new Selection object containing these elements

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
  ds.set_body(["need to set a body"])
  return ds
```
<a id="contents"></a>
#### contents 
  `selection.contents()` - Contents gets the children of each element in the Selection, including text and comment nodes. It returns a new Selection object containing these elements

```python
load("html.sky", "html")

def transform(ds):
  example_html = '<body><div><p class="A">a</p><p class="B">b</p></div><div><p class="C">c</p><p class="D">d</p></div></body>'
  doc = html(example_html)
  # get the body
  body = doc.contents()
  print(body.len()) # prints "2", the 2 div elements
  print(body.text()) # prints "abcd"
  ds.set_body(["this must be set"])
  return ds
```

<a id="eq"></a>
#### eq 
  `selection.eq(index)` - Eq returns node i as a new selection


<a id="find"></a>
#### find 
  `selection.find(selector)` - Find gets the descendants of each element in the current set of matched elements, filtered by a given selector string. It returns a new Selection containing these matched elements.

```python
load("html.sky", "html")

def transform(ds):
  example_html = '<body><p class="A">a</p><p class="B">b</p></div><div><p class="A">a</p><p class="B">b</p></div></body>'
  doc = html(example_html)
  # get the elements with the class ".B"
  p_Bs = doc.find(".B")
  print(p_Bs.len()) # prints "2", the 2 p elements with class ".B"
  print(p_Bs.text()) # prints "bb"
  ds.set_body(["this must be set"])
  return ds
```

<a id="first"></a>
#### first 
  `selection.first()` - First returns the first element of the selection as a new selection

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
  ds.set_body(["this must be set"])
  return ds
```

<a id="filter"></a>
#### filter 
  `selection.filter(selector)` - Filter reduces the set of matched elements to those that match the selector string. It returns a new Selection object for this subset of matching elements

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
  ds.set_body(["this must be set"])
  return ds
```

<a id="has"></a>
#### has 
  `selection.has()` - Has reduces the set of matched elements to those that have a descendant that matches the selector. It returns a new Selection object with the matching elements

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
  ds.set_body(["this must be set"])
  return ds
```

<a id="last"></a>
#### last 
  `selection.last()` - Last returns the last element of the selection as a new selection

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
  ds.set_body(["this must be set"])
  return ds
```

<a id="len"></a>
#### len 
  `selection.len()` - Len returns the length of the nodes in the selection as an integer

```python
load("html.sky", "html")

def transform(ds):
  example_html = '<body><p class="A">a</p><p class="B">b</p><p class="C">c</p><p class="D">d</p></body>'
  doc = html(example_html)
  # get the body
  body = doc.find("body")
  print(body.len()) # prints "4", the 4 p elements
  ds.set_body(["this must be set"])
  return ds
```

<a id="parent}"></a>
#### parent 
  `selection.parent()` - Parent gets the parent of each element in the Selection. It returns a new Selection object containing the matched elements

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
  ds.set_body(["this must be set"])
  return ds
```

<a id="parents_until"></a>
#### parents_until 
  `selection.parents_until(selector)` - ParentsUntil gets the ancestors of each element in the Selection, up to but not including the element matched by the selector. It returns a new Selection object containing the matched elements

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
  ds.set_body(["this must be set"])
  return ds
```

<a id="siblings"></a>
#### siblings 
  `selection,siblings()` - Siblings gets the siblings of each element in the Selection. It returns a new Selection object containing the matched elements

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
  ds.set_body(["this must be set"])
  return ds
```

<a id="html_text"></a>
#### text 
  `text()` - Text gets the combined text contents of each element in the set of matched elements, including their descendants

```python
load("html.sky", "html")

def transform(ds):
  example_html = '<body><div><p class="A">a</p><p class="B">b</p></div><div><p class="C">c</p><p class="D">d</p></div></body>'
  doc = html(example_html)
  a = doc.text() # prints "abcd"
  ds.set_body(["this must be set"])
  return ds
```

<a id="delete"></a>
#### http.delete 
  `http.delete(url)` - Sends a DELETE request to the given url. Returns a response.

<a id="get"></a>
#### http.get
  `http.get(url)` - Sends a GET request to the given url. Returns a response.

```python
load("http.sky", "http")

def download(ds):
  res = http.get("https://www.fake-json-response-endpoint.com")
  ds.set_body(res.json())
  return ds
```

<a id="options"></a>
#### http.options 
  `http.options(url)` - Sends an OPTIONS request to the given url. Returns a response.

<a id="patch"></a>
#### http.patch 
  `http.patch(url)` - Sends a PATCH request to the given url. Returns a response.

<a id="post"></a>
#### http.post 
  `http.post(url)` - Sends a POST request to the given url. Returns a response.
  
<a id="put"></a>
#### http.put 
  `http.put(url)` - Sends a PUT request to the given url. Returns a response.

<a id="content"></a>
#### content 
  `response.content()` - returns the raw data as a string. This string can be passed to `html(content_string)` to return a document that can be parsed by the `html` functions.

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
  `response.encoding()` - returns a string with the different forms of encoding used in the response.
  
<a id="headers"></a>
#### headers 
  `response.headers()` - returns a dictionary of the response headers.
  
<a id="json"></a>
#### json 
  `response.json()` - attempts the response body as json.
  
<a id="status_code"></a>
#### status_code 
  `response.status_code` - returns the status code of the response.
  
<a id="text"></a>
#### text 
  `response.text()` - returns the raw data as a string. This string can be passed to `html(text)` to return a document that can be parsed by the `html` functions.
  
<a id="url"></a>
#### url 
  `response.url` -  returns a string representation of the url

<a id="time"></a>
#### time
  `time.time()` -

<a id="duration"></a>
#### duration
  `time.duration()` - 

<a id="location"></a>
#### location
  `time.location()` - 

<a id="now"></a>
#### now
  `time.now()` - 

<a id="struct"></a>
#### struct
  `time.struct()` - 

<a id="year"></a>
#### year
  `t.year()` - 

<a id="month"></a>
#### month
  `t.month()` - 

<a id="day"></a>
#### day
  `t.day()` - 

<a id="hour"></a>
#### hour
  `t.hour()` - 

<a id="minute"></a>
#### minute
  `t.minute()` - 

<a id="second"></a>
#### second
  `t.second()` - 

<a id="nanosecond"></a>
#### nanosecond
  `t.nanosecond()` - 

<a id="get_url"></a>
#### xlsx.get_url
  `xlsx.get_url(url)` - 

<a id="get_sheets"></a>
#### get_sheets
  `x.get_sheets()` - 

<a id="get_rows"></a>
#### get_rows
  `x.get_rows()` - 