---
metaTitle: "json"
metaDescription: "json provides functions for working with json data"
weight: 2
---

json provides functions for working with json data

## Functions



### encode

```
encode(obj) string
```

Return a JSON string representation of a Starlark data structure

#### parameters:

| name | type | description |
|------|------|-------------|
| `obj` | `any` | obj is a valid Starlark data structure |

#### examples:
**encode object**

encode a simple object as a JSON string

```
load("encoding/json.star", "json")
x = json.encode({"foo": ["bar", "baz"]})
print(x)
# Output: {"foo":["bar","baz"]}
```




### decode

```
decode(src) obj
```

Return the Starlark representation of a string instance containing a JSON document. Decoding fails if src is not a valid JSON string.

#### parameters:

| name | type | description |
|------|------|-------------|
| `src` | `string` | source string, must be valid JSON string |

#### examples:
**decode JSON string**

decode a JSON string into a Starlark structure

```
load("encoding/json.star", "json")
x = json.decode('{"foo": ["bar", "baz"]}')
```




### indent

```
indent(src, prefix="", indent="\t") string
```

The indent function pretty-prints a valid JSON encoding, and returns a string containing the indented form. It accepts one required positional parameter, the JSON string, and two optional keyword-only string parameters, prefix and indent, that specify a prefix of each new line, and the unit of indentation.

#### parameters:

| name | type | description |
|------|------|-------------|
| `src` | `string` | source JSON string to encode |
| `prefix` | `string` | optional. string prefix that will be prepended to each line. default is "" |
| `indent` | `string` | optional. string that will be used to represent indentations. default is "\t" |

#### examples:
**basic**

"pretty print" a valid JSON encoding

```
load("encoding/json.star", "json")
x = json.indent('{"foo": ["bar", "baz"]}')
# print(x)
# {
#    "foo": [
#      "bar",
#      "baz"
#    ]
# }
```

**using prefix & indent**

"pretty print" a valid JSON encoding, including optional prefix and indent parameters

```
load("encoding/json.star", "json")
x = json.indent('{"foo": ["bar", "baz"]}', prefix='....', indent="____")
# print(x)
# {
# ....____"foo": [
# ....________"bar",
# ....________"baz"
# ....____]
# ....}
```




