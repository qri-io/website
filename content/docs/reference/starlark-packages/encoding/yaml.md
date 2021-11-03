---
metaTitle: "yaml"
metaDescription: "yaml provides functions for working with yaml data"
weight: 2
---

yaml provides functions for working with yaml data

## Functions



### dumps

```
dumps(obj) string
```

serialize obj to a yaml string

#### parameters:

| name | type | description |
|------|------|-------------|
| `obj` | `object` | input object |

#### examples:
**basic**

encode to yaml

```
load("encoding/yaml.star", "yaml")
data = {"foo": "bar", "baz": True}
res = yaml.dumps(data)
```




### loads

```
loads(source) object
```

read a source yaml string to a starlark object

#### parameters:

| name | type | description |
|------|------|-------------|
| `source` | `string` | input string of yaml data |

#### examples:
**basic**

load a yaml string

```
load("encoding/yaml.star", "yaml")
data = """foo: bar
baz: true
"""
d = yaml.loads(data)
print(d)
# Output: {"foo": "bar", "baz": True}
```




