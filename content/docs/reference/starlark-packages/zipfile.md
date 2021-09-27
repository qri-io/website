---
metaTitle: "zipfile"
metaDescription: "zipfile reads & parses zip archives"
weight: 2
---

zipfile reads & parses zip archives

## Functions



### ZipFile

```
ZipFile(data)
```

opens an archive for reading



## Types

### 'ZipFile'

a zip archive object

**Methods**

### namelist

```
namelist() list
```

return a list of files in the archive


### open

```
open(filename string) ZipInfo
```

open a file for reading

#### parameters:

| name | type | description |
|------|------|-------------|
| `filename` | `string` | name of the file in the archive to open |


### 'ZipInfo'



**Methods**

### read

```
read() string
```

read the file, returning it's string representation


