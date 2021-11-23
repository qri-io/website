---
metaTitle: "zipfile"
metaDescription: "zipfile reads & parses zip archives"
weight: 2
---

zipfile reads & parses zip archives

## Functions



### ZipFile

```
ZipFile(data) ZipFile
```

Returns an open zip archive for reading

#### parameters:

| name | type | description |
|------|------|-------------|
| `data` | `string` | data is a string representation of a zipped archive |

#### examples:
**basic**

download zip file and open

```
load("zipfile.star", "ZipFile")
load("http.star", "http")
url = "http://testurl.org/sample.zip"
raw = http.get(url).body()
zf = ZipFile(raw)
```





## Types

### ZipFile

a zip archive object

**Methods**

#### namelist

```
namelist() list
```

return a list of files in the archive
##### examples:
**basic**

get list of filenames from ZipFile

```
load("zipfile.star", "ZipFile")
zf = ZipFile(rawZipData)
files = zf.namelist()
print(files) # ["file1.txt", "file2.txt", etc ]
```




#### open

```
open(filename string) ZipInfo
```

open a file for reading

##### parameters:

| name | type | description |
|------|------|-------------|
| `filename` | `string` | name of the file in the archive to open |

##### examples:
**basic**

open file from ZipArchive as a ZipInfo

```
load("zipfile.star", "ZipFile")
zf = ZipFile(rawZipData)
files = zf.namelist()
filename = files[0]
info = zf.open(filename) # can now use ZipInfo methods to read file
```



### ZipInfo

an information object for interacting with a Zip archive component

**Methods**

#### read

```
read() string
```

read the file, returning it's string representation
##### examples:
**basic**

read file

```
load("zipfile.star", "ZipFile")
zf = ZipFile(rawZipData)
info = zf.open("file1.txt")
txt = info.read()
print(txt) # prints the contents of the file
```




