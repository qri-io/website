---
title: "Starlark: standard library"
description: "list of all the functions and modules in starlark standard library"
date: 2018-12-20T00:00:00-04:00
---

# Starlark Standard Library

All qri transforms have access to "starlib", a community-driven project to bring a standard library to the starlark programming dialect. Qri needs a standard library, and we thought it might benefit others to structure this library in a reusable way. starlib is admittedly biased towards Qri's needs.

**Comments, Suggestions & Pull Requests welcome: [https://github.com/qri-io/starlib](https://github.com/qri-io/starlib)**

### Contents

| package name | description |
|--------------|-------------|
| [encoding/base64](#base64) | base64 defines base64 encoding & decoding functions, often used to represent binary as text. |
| [encoding/csv](#csv) | csv reads comma-separated values files |
| [encoding/json](#json) | json provides functions for working with json data |
| [geo](#geo) | geo defines geographic operations in two-dimensional space |
| [html](#html) | html defines a jquery-like html selection & iteration functions for HTML documents |
| [http](#http) | http defines an HTTP client implementation |
| [math](#math) | math defines mathematical functions, it's intended to be a drop-in subset of python's math module for starlark: https://docs.python.org/3/library/math.html |
| [re](#re) | re defines regular expression functions, it's intended to be a drop-in subset of python's re module for starlark: https://docs.python.org/3/library/re.html |
| [time](#time) | time defines time primitives for starlark |
| [xlsx](#xlsx) | xlsx implements excel file readers in starlark. currently a highly-experimental package that will definitely change at some point in the future |
| [zipfile](#zipfile) | zipfile reads & parses zip archives |


** **
# <a id="base64" href="#base64">encoding/base64</a>
base64 defines base64 encoding & decoding functions, often used to represent binary as text.
## Functions

#### `base64.decode(src,encoding="standard") string`
parse base64 input, giving back the plain string representation

**parameters:**

| name | type | description |
|------|------|-------------|
| `src` | `string` | source string of base64-encoded text |
| `encoding` | `string` | optional. string to set decoding dialect. allowed values are: standard,standard_raw,url,url_raw |
<br />

#### `base64.encode(src,encoding="standard") string`
return the base64 encoding of src

**parameters:**

| name | type | description |
|------|------|-------------|
| `src` | `string` | source string to encode to base64 |
| `encoding` | `string` | optional. string to set encoding dialect. allowed values are: standard,standard_raw,url,url_raw |
<br />

** **
# <a id="csv" href="#csv">encoding/csv</a>
csv reads comma-separated values files
## Functions

#### `csv.read_all(source, comma=",", comment="", lazy_quotes=False, trim_leading_space=False, fields_per_record=0, skip=0) [][]string`
read all rows from a source string, returning a list of string lists

**parameters:**

| name | type | description |
|------|------|-------------|
| `source` | `string` | input string of csv data |
| `comma` | `string` | comma is the field delimiter, defaults to "," (a comma). comma must be a valid character and must not be \r, \n, or the Unicode replacement character (0xFFFD). |
| `comment` | `string` | comment, if not "", is the comment character. Lines beginning with the comment character without preceding whitespace are ignored. With leading whitespace the comment character becomes part of the field, even if trim_leading_space is True. comment must be a valid character and must not be \r, \n, or the Unicode replacement character (0xFFFD). It must also not be equal to comma. |
| `lazy_quotes` | `bool` | If lazy_quotes is True, a quote may appear in an unquoted field and a non-doubled quote may appear in a quoted field. |
| `trim_leading_space` | `bool` | If trim_leading_space is True, leading white space in a field is ignored. This is done even if the field delimiter, comma, is white space. |
| `fields_per_record` | `int` | fields_per_record is the number of expected fields per record. If fields_per_record is positive, read_all requires each record to have the given number of fields. If fields_per_record is 0, read_all sets it to the number of fields in the first record, so that future records must have the same field count. If fields_per_record is negative, no check is made and records may have a variable number of fields. |
| `skip` | `int` | number of rows to skip, omitting from returned rows |
<br />

** **
# <a id="json" href="#json">encoding/json</a>
json provides functions for working with json data
## Functions

#### `json.dumps(obj) string`
serialize obj to a JSON string

**parameters:**

| name | type | description |
|------|------|-------------|
| `obj` | `object` | input object |
<br />

#### `json.loads(source) object`
read a source JSON string to a starlark object

**parameters:**

| name | type | description |
|------|------|-------------|
| `source` | `string` | input string of json data |
<br />

** **
# <a id="geo" href="#geo">geo</a>
geo defines geographic operations in two-dimensional space
## Functions

#### `geo.Line(points) Line`
Line constructor. Takes either an array of coordinate pairs or an array of point objects and returns the line that connects them. Points do not need to be collinear, providing a single point returns a line with a length of 0

**parameters:**

| name | type | description |
|------|------|-------------|
| `points` | `[[]float|Point]` | list of points on the line |
<br />

#### `geo.MultiPolygon(polygons) MultiPolygon`
MultiPolygon constructor. MultiPolygon groups a list of polygons to behave like a single polygon

**parameters:**

| name | type | description |
|------|------|-------------|
| `polygons` | `[Polygon]` |  |
<br />

#### `geo.Point(x,y) Point`
Point constructor, takes an x(longitude) and y(latitude) value and returns a Point object

**parameters:**

| name | type | description |
|------|------|-------------|
| `x` | `float` | x-dimension value (longitude if using geodesic space) |
| `y` | `float` | y-dimension value (latitude if using geodesic space) |
<br />

#### `geo.Polygon(rings) Polygon`
Polygon constructor. Takes a list of lists of coordinate pairs (or point objects) that define the outer boundary and any holes / inner boundaries that represent a polygon. In GIS tradition, lists of coordinates that wind clockwise are filled regions and  anti-clockwise represent holes.

**parameters:**

| name | type | description |
|------|------|-------------|
| `rings` | `[Line]` | list of closed lines that constitute the polygon |
<br />

#### `geo.parseGeoJSON(data) (geoms, properties)`
Parses string data in IETF-7946 format (https://tools.ietf.org/html/rfc7946) returning a list of geometries and equal-length list of properties for each geometry

**parameters:**

| name | type | description |
|------|------|-------------|
| `data` | `string` | string of GeoJSON data |
<br />

#### `geo.within(geom,polygon) bool`
Returns True if geom is entirely contained by polygon

**parameters:**

| name | type | description |
|------|------|-------------|
| `geom` | `[point,line,polygon]` | maybe-inner geometry |
| `polygon` | `[Polygon,MultiPolygon]` | maybe-outer polygon |
<br />


## Types
### `Line`
an ordered list of points that define a line
**Methods**
#### `Line.length() float`
Euclidean Length

#### `Line.geodesicLength() float`
Line length on the surface of a sphere with the same radius as Earth

### `MultiPolygon`
MultiPolygon groups a list of polygons to behave like a single polygon### `Point`
a two-dimensional point in space
**Methods**
#### `Point.distance(p2) float`
Euclidean Distance to the other point

**parameters:**

| name | type | description |
|------|------|-------------|
| `p2` | `` | point to measure distance to |
<br />

#### `Point.distanceGeodesic(p2) float`
Distance on the surface of a sphere with the same radius as Earth

**parameters:**

| name | type | description |
|------|------|-------------|
| `p2` | `point` | point to measure distance to |
<br />

### `Polygon`
an ordered list of closed lines (rings) that define a shape. lists of coordinates that wind clockwise are filled regions and  anti-clockwise represent holes.** **
# <a id="html" href="#html">html</a>
html defines a jquery-like html selection & iteration functions for HTML documents
## Functions

#### `html.html(markup) selection`
parse an html document returing a selection at the root of the document

**parameters:**

| name | type | description |
|------|------|-------------|
| `markup` | `string` | html text to build a document from |
<br />


## Types
### `selection`
an HTML document for querying
**Methods**
#### `selection.attr(name) string`
gets the specified attribute's value for the first element in the Selection. To get the value for each element individually, use a looping construct such as each or map method

**parameters:**

| name | type | description |
|------|------|-------------|
| `name` | `string` | attribute name to get the value of |
<br />

#### `selection.children() selection`
gets the child elements of each element in the Selection

#### `selection.children_filtered(selector) selection`
gets the child elements of each element in the Selection, filtered by the specified selector

**parameters:**

| name | type | description |
|------|------|-------------|
| `selector` | `string` | a query selector string to filter the current selection, returning a new selection |
<br />

#### `selection.contents(selector) selection`
gets the children of each element in the Selection, including text and comment nodes

**parameters:**

| name | type | description |
|------|------|-------------|
| `selector` | `string` | a query selector string to filter the current selection, returning a new selection |
<br />

#### `selection.find(selector) selection`
gets the descendants of each element in the current set of matched elements, filtered by a selector

**parameters:**

| name | type | description |
|------|------|-------------|
| `selector` | `string` | a query selector string to filter the current selection, returning a new selection |
<br />

#### `selection.filter(selector) selection`
filter reduces the set of matched elements to those that match the selector string

**parameters:**

| name | type | description |
|------|------|-------------|
| `selector` | `string` | a query selector string to filter the current selection, returning a new selection |
<br />

#### `selection.get(i) selection`
retrieves the underlying node at the specified index. alias: eq

**parameters:**

| name | type | description |
|------|------|-------------|
| `i` | `int` | numerical index of node to get |
<br />

#### `selection.has(selector) selection`
reduces the set of matched elements to those that have a descendant that matches the selector

**parameters:**

| name | type | description |
|------|------|-------------|
| `selector` | `string` | a query selector string to filter the current selection, returning a new selection |
<br />

#### `selection.parent(selector) selection`
gets the parent of each element in the Selection

**parameters:**

| name | type | description |
|------|------|-------------|
| `selector` | `string` | a query selector string to filter the current selection, returning a new selection |
<br />

#### `selection.parents_until(selector) selection`
gets the ancestors of each element in the Selection, up to but not including the element matched by the selector

**parameters:**

| name | type | description |
|------|------|-------------|
| `selector` | `string` | a query selector string to filter the current selection, returning a new selection |
<br />

#### `selection.siblings() selection`
gets the siblings of each element in the Selection

#### `selection.text() string`
gets the combined text contents of each element in the set of matched elements, including descendants

#### `selection.first(selector) selection`
gets the first element of the selection

**parameters:**

| name | type | description |
|------|------|-------------|
| `selector` | `string` | a query selector string to filter the current selection, returning a new selection |
<br />

#### `selection.last() selection`
gets the last element of the selection

**parameters:**

| name | type | description |
|------|------|-------------|
| `selector` | `string` | a query selector string to filter the current selection, returning a new selection |
<br />

#### `selection.len() int`
returns the number of the nodes in the selection

#### `selection.eq(i) selection`
gets the element at index i of the selection

**parameters:**

| name | type | description |
|------|------|-------------|
| `i` | `int` | numerical index of node to get |
<br />

** **
# <a id="http" href="#http">http</a>
http defines an HTTP client implementation
## Functions

#### `http.delete(url,params={},headers={},body="",form_body={},json_body={},auth=()) response`
perform an HTTP DELETE request, returning a response

**parameters:**

| name | type | description |
|------|------|-------------|
| `url` | `string` | url to request |
| `headers` | `dict` | optional. dictionary of headers to add to request |
| `body` | `string` | optional. raw string body to provide to the request |
| `form_body` | `dict` | optional. dict of values that will be encoded as form data |
| `json_body` | `any` | optional. json data to supply as a request. handy for working with JSON-API's |
| `auth` | `tuple` | optional. (username,password) tuple for http basic authorization |
<br />

#### `http.get(url,params={},headers={},auth=()) response`
perform an HTTP GET request, returning a response

**parameters:**

| name | type | description |
|------|------|-------------|
| `url` | `string` | url to request |
| `headers` | `dict` | optional. dictionary of headers to add to request |
| `auth` | `tuple` | optional. (username,password) tuple for http basic authorization |
<br />

#### `http.options(url,params={},headers={},body="",form_body={},json_body={},auth=()) response`
perform an HTTP OPTIONS request, returning a response

**parameters:**

| name | type | description |
|------|------|-------------|
| `url` | `string` | url to request |
| `headers` | `dict` | optional. dictionary of headers to add to request |
| `body` | `string` | optional. raw string body to provide to the request |
| `form_body` | `dict` | optional. dict of values that will be encoded as form data |
| `json_body` | `any` | optional. json data to supply as a request. handy for working with JSON-API's |
| `auth` | `tuple` | optional. (username,password) tuple for http basic authorization |
<br />

#### `http.patch(url,params={},headers={},body="",form_body={},json_body={},auth=()) response`
perform an HTTP PATCH request, returning a response

**parameters:**

| name | type | description |
|------|------|-------------|
| `url` | `string` | url to request |
| `headers` | `dict` | optional. dictionary of headers to add to request |
| `body` | `string` | optional. raw string body to provide to the request |
| `form_body` | `dict` | optional. dict of values that will be encoded as form data |
| `json_body` | `any` | optional. json data to supply as a request. handy for working with JSON-API's |
| `auth` | `tuple` | optional. (username,password) tuple for http basic authorization |
<br />

#### `http.post(url,params={},headers={},body="",form_body={},json_body={},auth=()) response`
perform an HTTP POST request, returning a response

**parameters:**

| name | type | description |
|------|------|-------------|
| `url` | `string` | url to request |
| `headers` | `dict` | optional. dictionary of headers to add to request |
| `body` | `string` | optional. raw string body to provide to the request |
| `form_body` | `dict` | optional. dict of values that will be encoded as form data |
| `json_body` | `any` | optional. json data to supply as a request. handy for working with JSON-API's |
| `auth` | `tuple` | optional. (username,password) tuple for http basic authorization |
<br />

#### `http.put(url,params={},headers={},body="",form_body={},json_body={},auth=()) response`
perform an HTTP PUT request, returning a response

**parameters:**

| name | type | description |
|------|------|-------------|
| `url` | `string` | url to request |
| `headers` | `dict` | optional. dictionary of headers to add to request |
| `body` | `string` | optional. raw string body to provide to the request |
| `form_body` | `dict` | optional. dict of values that will be encoded as form data |
| `json_body` | `any` | optional. json data to supply as a request. handy for working with JSON-API's |
| `auth` | `tuple` | optional. (username,password) tuple for http basic authorization |
<br />


## Types
### `response`
the result of performing a http request
**Fields**

| name | type | description |
|------|------|-------------|
| url | string | the url that was ultimately requested (may change after redirects) |
| status_code | int | response status code (for example: 200 == OK) |
| headers | dict | dictionary of response headers |
| encoding | string | transfer encoding. example: "octet-stream" or "application/json" |

**Methods**
#### `response.body() string`
output response body as a string

#### `response.json()`
attempt to parse resonse body as json, returning a JSON-decoded result

** **
# <a id="math" href="#math">math</a>
math defines mathematical functions, it's intended to be a drop-in subset of python's math module for starlark: https://docs.python.org/3/library/math.html
## Functions

#### `math.acos(x)`
Return the arc cosine of x, in radians.

#### `math.acosh(x)`
Return the inverse hyperbolic cosine of x.

#### `math.asin(x)`
Return the arc sine of x, in radians.

#### `math.asinh(x)`
Return the inverse hyperbolic sine of x.

#### `math.atan(x)`
Return the arc tangent of x, in radians.

#### `math.atan2(y, x)`
Return atan(y / x), in radians. The result is between -pi and pi. The vector in the plane from the origin to point (x, y) makes this angle with the positive X axis. The point of atan2() is that the signs of both inputs are known to it, so it can compute the correct quadrant for the angle. For example, atan(1) and atan2(1, 1) are both pi/4, but atan2(-1, -1) is -3*pi/4.

#### `math.atanh(x)`
Return the inverse hyperbolic tangent of x.

#### `math.ceil(x)`
Return the ceiling of x, the smallest integer greater than or equal to x.

#### `math.cos(x)`
Return the cosine of x radians.

#### `math.cosh(x)`
Return the hyperbolic cosine of x.

#### `math.degrees(x)`
Convert angle x from radians to degrees.

#### `math.exp(x)`
Return e raised to the power x, where e = 2.718281… is the base of natural logarithms

#### `math.fabs(x)`
Return the absolute value of x.

#### `math.floor(x)`
Return the floor of x, the largest integer less than or equal to x.

#### `math.hypot(x, y)`
Return the Euclidean norm, sqrt(x*x + y*y). This is the length of the vector from the origin to point (x, y).

#### `math.radians(x)`
Convert angle x from degrees to radians.

#### `math.round(x)`
Returns the nearest integer, rounding half away from zero.

#### `math.sin(x)`
Return the sine of x radians.

#### `math.sinh(x)`
Return the hyperbolic sine of x.

#### `math.sqrt(x)`
Return the square root of x.

#### `math.tan(x)`
Return the tangent of x radians.

#### `math.tanh(x)`
Return the hyperbolic tangent of x.

** **
# <a id="re" href="#re">re</a>
re defines regular expression functions, it's intended to be a drop-in subset of python's re module for starlark: https://docs.python.org/3/library/re.html
## Functions

#### `re.findall(pattern, text, flags=0)`
Returns all non-overlapping matches of pattern in string, as a list of strings. The string is scanned left-to-right, and matches are returned in the order found. If one or more groups are present in the pattern, return a list of groups; this will be a list of tuples if the pattern has more than one group. Empty matches are included in the result.

**parameters:**

| name | type | description |
|------|------|-------------|
| `pattern` | `string` | regular expression pattern string |
| `text` | `string` | string to find within |
| `flags` | `int` | integer flags to control regex behaviour. reserved for future use |
<br />

#### `re.split(pattern, text, maxsplit=0, flags=0)`
Split text by the occurrences of pattern. If capturing parentheses are used in pattern, then the text of all groups in the pattern are also returned as part of the resulting list. If maxsplit is nonzero, at most maxsplit splits occur, and the remainder of the string is returned as the final element of the list.

**parameters:**

| name | type | description |
|------|------|-------------|
| `pattern` | `string` | regular expression pattern string |
| `text` | `string` | input string to split |
| `maxsplit` | `int` | maximum number of splits to make. default 0 splits all matches |
| `flags` | `int` | integer flags to control regex behaviour. reserved for future use |
<br />

#### `re.sub(pattern, repl, text, count=0, flags=0)`
Return the string obtained by replacing the leftmost non-overlapping occurrences of pattern in string by the replacement repl. If the pattern isn’t found, string is returned unchanged. repl can be a string or a function; if it is a string, any backslash escapes in it are processed. That is, \n is converted to a single newline character, \r is converted to a carriage return, and so forth.

**parameters:**

| name | type | description |
|------|------|-------------|
| `pattern` | `string` | regular expression pattern string |
| `repl` | `string` | string to replace matches with |
| `text` | `string` | input string to replace |
| `count` | `int` | number of replacements to make, default 0 means replace all matches |
| `flags` | `int` | integer flags to control regex behaviour. reserved for future use |
<br />

** **
# <a id="time" href="#time">time</a>
time defines time primitives for starlark
## Functions

#### `time.duration(string) duration`
parse a duration

#### `time.location(string) location`
parse a location

#### `time.now() time`
implementations would be able to make this a constant

#### `time.time(string, format=..., location=...) time`
parse a time

#### `time.zero() time`
a constant


## Types
### `duration`

**Fields**

| name | type | description |
|------|------|-------------|
| hours | float |  |
| minutes | float |  |
| nanoseconds | int |  |
| seconds | float |  |
### `time`

**Fields**

| name | type | description |
|------|------|-------------|
| year | int |  |
| month | int |  |
| day | int |  |
| hour | int |  |
| minute | int |  |
| second | int |  |
| nanosecond | int |  |
** **
# <a id="xlsx" href="#xlsx">xlsx</a>
xlsx implements excel file readers in starlark. currently a highly-experimental package that will definitely change at some point in the future
## Functions

#### `xlsx.get_url(url string)`
fetch an excel file from a url


## Types
### `File`
an excel file
**Methods**
#### `File.get_sheets() dict`
return a dict of sheets in this excel file

#### `File.get_rows(sheetname) list`
get all populated rows / columns as a list-of-list strings

** **
# <a id="zipfile" href="#zipfile">zipfile</a>
zipfile reads & parses zip archives
## Functions

#### `zipfile.ZipFile(data)`
opens an archive for reading


## Types
### `ZipFile`
a zip archive object
**Methods**
#### `ZipFile.namelist() list`
return a list of files in the archive

#### `ZipFile.open(filename string) ZipInfo`
open a file for reading

**parameters:**

| name | type | description |
|------|------|-------------|
| `filename` | `string` | name of the file in the archive to open |
<br />

### `ZipInfo`

**Methods**
#### `ZipInfo.read() string`
read the file, returning it's string representation

