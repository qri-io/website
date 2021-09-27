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



### loads

```
loads(source) object
```

read a source yaml string to a starlark object

#### parameters:

| name | type | description |
|------|------|-------------|
| `source` | `string` | input string of yaml data |



