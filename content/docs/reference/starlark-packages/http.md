---
metaTitle: "http"
metaDescription: "http defines an HTTP client implementation"
weight: 2
---

http defines an HTTP client implementation

## Functions



### get

```
get(url,params={},headers={},auth=()) response
```

perform an HTTP GET request, returning a response

#### parameters:

| name | type | description |
|------|------|-------------|
| `url` | `string` | url to request |
| `headers` | `dict` | optional. dictionary of headers to add to request |
| `auth` | `tuple` | optional. (username,password) tuple for http basic authorization |



### put

```
put(url,params={},headers={},body="",form_body={},form_encoding="",json_body={},auth=()) response
```

perform an HTTP PUT request, returning a response

#### parameters:

| name | type | description |
|------|------|-------------|
| `url` | `string` | url to request |
| `headers` | `dict` | optional. dictionary of headers to add to request |
| `body` | `string` | optional. raw string body to provide to the request |
| `form_body` | `dict` | optional. dict of values that will be encoded as form data |
| `form_encoding` | `string` | optional. `application/x-www-form-url-encoded` (default) or `multipart/form-data` |
| `json_body` | `any` | optional. json data to supply as a request. handy for working with JSON-API's |
| `auth` | `tuple` | optional. (username,password) tuple for http basic authorization |



### post

```
post(url,params={},headers={},body="",form_body={},form_encoding="",json_body={},auth=()) response
```

perform an HTTP POST request, returning a response

#### parameters:

| name | type | description |
|------|------|-------------|
| `url` | `string` | url to request |
| `headers` | `dict` | optional. dictionary of headers to add to request |
| `body` | `string` | optional. raw string body to provide to the request |
| `form_body` | `dict` | optional. dict of values that will be encoded as form data |
| `form_encoding` | `string` | optional. `application/x-www-form-url-encoded` (default) or `multipart/form-data` |
| `json_body` | `any` | optional. json data to supply as a request. handy for working with JSON-API's |
| `auth` | `tuple` | optional. (username,password) tuple for http basic authorization |



### delete

```
delete(url,params={},headers={},body="",form_body={},form_encoding="",json_body={},auth=()) response
```

perform an HTTP DELETE request, returning a response

#### parameters:

| name | type | description |
|------|------|-------------|
| `url` | `string` | url to request |
| `headers` | `dict` | optional. dictionary of headers to add to request |
| `body` | `string` | optional. raw string body to provide to the request |
| `form_body` | `dict` | optional. dict of values that will be encoded as form data |
| `form_encoding` | `string` | optional. `application/x-www-form-url-encoded` (default) or `multipart/form-data` |
| `json_body` | `any` | optional. json data to supply as a request. handy for working with JSON-API's |
| `auth` | `tuple` | optional. (username,password) tuple for http basic authorization |



### patch

```
patch(url,params={},headers={},body="",form_body={},form_encoding="",json_body={},auth=()) response
```

perform an HTTP PATCH request, returning a response

#### parameters:

| name | type | description |
|------|------|-------------|
| `url` | `string` | url to request |
| `headers` | `dict` | optional. dictionary of headers to add to request |
| `body` | `string` | optional. raw string body to provide to the request |
| `form_body` | `dict` | optional. dict of values that will be encoded as form data |
| `form_encoding` | `string` | optional. `application/x-www-form-url-encoded` (default) or `multipart/form-data` |
| `json_body` | `any` | optional. json data to supply as a request. handy for working with JSON-API's |
| `auth` | `tuple` | optional. (username,password) tuple for http basic authorization |



### options

```
options(url,params={},headers={},body="",form_body={},form_encoding="",json_body={},auth=()) response
```

perform an HTTP OPTIONS request, returning a response

#### parameters:

| name | type | description |
|------|------|-------------|
| `url` | `string` | url to request |
| `headers` | `dict` | optional. dictionary of headers to add to request |
| `body` | `string` | optional. raw string body to provide to the request |
| `form_body` | `dict` | optional. dict of values that will be encoded as form data |
| `form_encoding` | `string` | optional. `application/x-www-form-url-encoded` (default) or `multipart/form-data` |
| `json_body` | `any` | optional. json data to supply as a request. handy for working with JSON-API's |
| `auth` | `tuple` | optional. (username,password) tuple for http basic authorization |




## Types

### response

the result of performing a http request

**Fields**

| name | type | description |
|------|------|-------------|
| url | string | the url that was ultimately requested (may change after redirects) |
| status_code | int | response status code (for example: 200 == OK) |
| headers | dict | dictionary of response headers |
| encoding | string | transfer encoding. example: "octet-stream" or "application/json" |


**Methods**

#### body

```
body() string
```

output response body as a string


#### json

```
json()
```

attempt to parse resonse body as json, returning a JSON-decoded result


