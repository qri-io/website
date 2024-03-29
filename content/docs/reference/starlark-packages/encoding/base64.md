---
metaTitle: "base64"
metaDescription: "base64 defines base64 encoding & decoding functions, often used to represent binary as text."
weight: 2
---

base64 defines base64 encoding & decoding functions, often used to represent binary as text.

## Functions



### encode

```
encode(src,encoding="standard") string
```

return the base64 encoding of src

#### parameters:

| name | type | description |
|------|------|-------------|
| `src` | `string` | source string to encode to base64 |
| `encoding` | `string` | optional. string to set encoding dialect. allowed values are: standard,standard_raw,url,url_raw |

#### examples:
**basic**

encode a string as base64

```
load("encoding/base64.star", "base64")
encoded = base64.encode("hello world!")
print(encoded)
# Output: aGVsbG8gd29ybGQh
```




### decode

```
decode(src,encoding="standard") string
```

parse base64 input, giving back the plain string representation

#### parameters:

| name | type | description |
|------|------|-------------|
| `src` | `string` | source string of base64-encoded text |
| `encoding` | `string` | optional. string to set decoding dialect. allowed values are: standard,standard_raw,url,url_raw |

#### examples:
**basic**

encode a string as base64

```
load("encoding/base64.star", "base64")
decoded = base64.decode("aGVsbG8gd29ybGQh")
print(decoded)
# Output: hello world!
```




