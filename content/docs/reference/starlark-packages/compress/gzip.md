---
metaTitle: "gzip"
metaDescription: "decompress files like the GNU programs gzip and gunzip would."
weight: 2
---

decompress files like the GNU programs gzip and gunzip would.

## Functions



### decompress

```
decompress(data) bytes
```

Return a bytes object containing the uncompressed data.

#### parameters:

| name | type | description |
|------|------|-------------|
| `data string, bytes` | `` | data can be a string or bytes of compressed gzip data |

#### examples:
**basic**

download a gzip file & decompress the contents

```
load("compress/gzip.star", "gzip")
load("http.star", "http")
url = "http://www.mygziprepo.com/sample.gz"
raw = http.get(url).body()
data = gzip.decompress(raw)
```




