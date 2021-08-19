---
metaTitle: "json"
metaDescription: "*/ package json import "go.starlark.net/starlarkjson" // ModuleName declares the intended load import string // eg: load("encoding/json.star", "json") const ModuleName = "encoding/json.star" // Module exposes the starlarkjson module. Implementation located at // https://github.com/google/starlark-go/tree/master/starlarkjson var Module = starlarkjson.Module"
weight: 2
---

*/ package json import "go.starlark.net/starlarkjson" // ModuleName declares the intended load import string // eg: load("encoding/json.star", "json") const ModuleName = "encoding/json.star" // Module exposes the starlarkjson module. Implementation located at // https://github.com/google/starlark-go/tree/master/starlarkjson var Module = starlarkjson.Module

## Functions



### decode

```
decode(string) obj
```

The decode function accepts one positional parameter, a JSON string. It returns the Starlark value that the string denotes. - Numbers are parsed as int or float, depending on whether they contain a decimal point. - JSON objects are parsed as new unfrozen Starlark dicts. - JSON arrays are parsed as new unfrozen Starlark lists. Decoding fails if x is not a valid JSON string.


### encode

```
encode(obj) string
```

The encode function accepts one required positional argument, which it converts to JSON by cases: - A Starlark value that implements Go's standard json.Marshal interface defines its own JSON encoding. - None, True, and False are converted to null, true, and false, respectively. - Starlark int values, no matter how large, are encoded as decimal integers. Some decoders may not be able to decode very large integers. - Starlark float values are encoded using decimal point notation, even if the value is an integer. It is an error to encode a non-finite floating-point value. - Starlark strings are encoded as JSON strings, using UTF-16 escapes. - a Starlark IterableMapping (e.g. dict) is encoded as a JSON object. It is an error if any key is not a string. - any other Starlark Iterable (e.g. list, tuple) is encoded as a JSON array. - a Starlark HasAttrs (e.g. struct) is encoded as a JSON object. It an application-defined type matches more than one the cases describe above, (e.g. it implements both Iterable and HasFields), the first case takes precedence. Encoding any other value yields an error.


### indent

```
indent(string) string
```

The indent function pretty-prints a valid JSON encoding, and returns a string containing the indented form. It accepts one required positional parameter, the JSON string, and two optional keyword-only string parameters, prefix and indent, that specify a prefix of each new line, and the unit of indentation.


