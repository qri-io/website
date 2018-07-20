---
title: "skylark syntax"
description: "skylark transformations"
date: 2018-01-30T00:00:00-04:00
section: reference
---

# Skylark Syntax
Qri ("query") is about datasets. Transformions are repeatable scripts for generating a dataset. [Skylark](https://github.com/google/skylark/blob/master/doc/spec.md) is a scripting langauge from Google that feels a lot like python. This package implements skylark as a _transformation syntax_. Skylark tranformations are about as close as one can get to the full power of a programming language as a transformation syntax. Often you need this degree of control to generate a dataset.

Typical examples of a skylark transformation include:

* combining paginated calls to an API into a single dataset
* downloading unstructured structured data from the internet to extract
* re-shaping raw input data before saving a dataset

### Differences from Python

**No While Loops**

**No Recursion**

**Set Variables Once**

**Can be run in parallel**

** **

### Skylark In Qri:

Skylark transformations have a few rules on top of skylark itself:

* Data functions *always* return data
* When you define a data function, qri calls it for you
* All tranform functions are optional (you don't _need_ to define them), _but_
* A transformation must have at least one data function
* Data functions are always called in the same order
* Data functions often get a `qri` parameter that lets them do special things

** **

### Transform Functions

So far there are two predefined data functions, with more planned for future use:

* download
* transform

#### def download(qri):
  Download is the only function in which you can make an http request or get an http response, aka the only place in a transform where you can download data form a website or server. You must then manipulate the response to get some structured data, which can be returned.

  The download function is always run before the transform function.

  The Transform function will recieve data returned from the download function from the `qri` object, specifically the `qri.download` field.

  When in the download function, you have access to these packages with specific methods:

##### qri
  _you can access these methods from the `qri` object, eg `qri.get_body()`_

  * [get_body](#get_body)
  * [get_config](#get_config)
  * [get_secret](#get_secret)
  * [set_meta](#set_meta)
  * [set_schema](#set_schema)

##### html
  _you can access these methods is you have an html object `doc`, eg `doc.children()`_

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

##### http
  _you can access these methods from the `qri.http` object,eg `qri.http.get()`_

  * [http.delete](#delete)
  * [http.get](#http.get)
  * [http.options](#options)
  * [http.patch](#patch)
  * [http.post](#post)
  * [http.put](#put)

##### response
  _you can call these methods on a response object, in this list we are going to call the response object `r`, eg `r.content()`_

  * [content](#content)
  * [encoding](#encoding)
  * [headers](#headers)
  * [json](#json)
  * [status_code](#status_code)
  * [text](#text)
  * [url](#url)

#### def transform(qri):
  The transform function can pull from a body file and config file, as well as set the metadata or schema of a dataset. It can also pull any data returned in the `download` function through the `qri` object at `qri.download`.


** **

### Transform Configuration

** **

### Transform Secrets

** **

### Function Definitions

#### get_body {#get_body} 

  `qri.get_body()` - returns the body from the data from the body file

#### get_config {#get_config}
  `qri.get_config()` - returns the config as a json object

#### get_secret {#get_secret}
  `qri.get_secret()` - returns the secret from the config
  
#### set_meta {#set_meta}
  `qri.set_meta(field, value)` - Sets the meta at specific field to the value

#### set_schema {#set_schema}
  `qri.set_schema(value)` - Sets the schema to the object found at value

#### attr {#attr}
  `selection.attr(attribute)` - Returns a string of the given attribute for that selection in the document. For example:

  ``` python
  example_html = '<div class="example_class_name"><p>test</p></div>'
  doc = qri.html(example_html)
  doc.attr("class") # is equal to 'example_class_name'
  ```

#### children {#children}
  `selection.children()` - Children gets the child elements of each element in the Selection. It returns a new Selection object containing these elements

  ```
  example_html = '<div><p class="A">a</p><p class="B">b</p></div>'
  doc = qri.html(example_html)
  doc.children()
  # returns a selection with the <p class="A"> node and <p class="B"> node
  ```

#### children_filtered {#children_filtered}
  `selection.children_filtered(filter)` - ChildrenFiltered gets the child elements of each element in the Selection, filtered by the specified selector. It returns a new Selection object containing these elements

  ```
  example_html = '<div><p class="A">a</p><p class="B">b</p></div>'
  doc = qri.html(example_html)
  doc.children_filtered(".B")
  # returns a selection with the <p class="B"> node
  ```

#### contents {#contents}
  `selection.contents()` - Contents gets the children of each element in the Selection, including text and comment nodes. It returns a new Selection object containing these elements


#### eq {#eq}
  `selection.eq(index)` - Eq returns node i as a new selection


#### find {#find}
  `selection.find(selector)` - Find gets the descendants of each element in the current set of matched elements, filtered by a given selector string. It returns a new Selection containing these matched elements.

#### first {#first}
  `selection.first()` - First returns the first element of the selection as a new selection

#### filter {#filter}
  `selection.filter(selector)` - Filter reduces the set of matched elements to those that match the selector string. It returns a new Selection object for this subset of matching elements

#### get {#get}
  `selection.get(index)` - Get retrieves the underlying node at the specified index. Get without parameter is not implemented, since the node array is available on the Selection object

#### has {#has}
  `selection.has()` - Has reduces the set of matched elements to those that have a descendant that matches the selector. It returns a new Selection object with the matching elements

#### last {#last}
  `selection.last()` - Last returns the last element of the selection as a new selection

#### len {#len}
  `selection.len()` - Len returns the length of the nodes in the selection as an integer

#### parent {#parent} 
  `selection.parent()` - Parent gets the parent of each element in the Selection. It returns a new Selection object containing the matched elements

#### parents_until {#parents_until}
  `selection.parents_until(selector)` - ParentsUntil gets the ancestors of each element in the Selection, up to but not including the element matched by the selector. It returns a new Selection object containing the matched elements

#### siblings {#siblings}
  `selection,siblings()` - Siblings gets the siblings of each element in the Selection. It returns a new Selection object containing the matched elements

#### text {#html_text}
  `text()` - Text gets the combined text contents of each element in the set of matched elements, including their descendants

#### http.delete {#delete}
  `http.delete(url)` - Sends a DELETE request to the given url. Returns a response.

#### http.get {#http.get}
  `http.get(url)` - Sends a GET request to the given url. Returns a response.

#### http.options {#options}
  `http.options(url)` - Sends an OPTIONS request to the given url. Returns a response.

#### http.patch {#patch}
  `http.patch(url)` - Sends a PATCH request to the given url. Returns a response.

#### http.post {#post}
  `http.post(url)` - Sends a POST request to the given url. Returns a response.
  
#### http.put {#put}
  `http.put(url)` - Sends a PUT request to the given url. Returns a response.

#### content {#content}
  `response.content()` - Content returns the raw data as a string. This string can be passed to `qri.html(content_string)` to return a document that can be parsed by the `html` functions.

#### encoding {#encoding}
  `response.encoding()` - Encoding returns a string with the different forms of encoding used in the response.
  
#### headers {#headers}
  `response.headers()` - Headers returns a dictionary of the response headers.
  
#### json {#json}
  `response.json()` - Json attempts the response body as json.
  
#### status_code {#status_code}
  `response.status_code` - Status_code returns the status code of the response.
  
#### text {#text}
  `response.text()` - Text returns the raw data as a string. This string can be passed to `qri.html(text)` to return a document that can be parsed by the `html` functions.
  
#### url {#url}
  `response.url` -  returns a string representation of the url
