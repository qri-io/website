---
metaTitle: "dataframe"
metaDescription: "dataframe is a 2d columnar data structure that provides many powerful analysis and manipulation tools, similar to a spreadsheet or SQL engine"
weight: 2
---

dataframe is a 2d columnar data structure that provides many powerful analysis and manipulation tools, similar to a spreadsheet or SQL engine

## Functions



### DataFrame

```
DataFrame(data, index, columns, dtype) DataFrame
```

constructs a DataFrame containing the given data

#### parameters:

| name | type | description |
|------|------|-------------|
| `data` | `any` | data for the content of the DataFrame. Can be a list, dict, Series, or another DataFrame |
| `index` | `Index` | an Index that describes the rows |
| `columns` | `Index` | an Index that describes the columns |
| `dtype` | `string` | data type to force. If not provided, it will be inferred for each column |

#### examples:
**construct**

constuct a DataFrame using a list of lists with column names

```
load("dataframe.star", "dataframe")
# create a new DataFrame
df = dataframe.DataFrame([["cat", "meow"],
["dog", "bark"],
["eel", "zap"]],
columns=["name", "sound"])
```




### parse_csv

```
parse_csv(text) DataFrame
```

constructs a DataFrame by parsing the text as csv data. Assumes the first row is a header row

#### parameters:

| name | type | description |
|------|------|-------------|
| `text` | `string` | the string to parse as csv data |



### Index

```
Index(data, name) Index
```

constructs an Index, which describes a single axis of a dataframe

#### parameters:

| name | type | description |
|------|------|-------------|
| `data` | `list(string)` | a list of strings for the index |
| `name` | `string` | the name of the Index |



### Series

```
Series(data, index, dtype, name) Series
```

constructs an Series, a homogeneously typed dataframe column

#### parameters:

| name | type | description |
|------|------|-------------|
| `data` | `list` | a list of data values. They will be coerced to use a single data type |
| `index` | `Index` | the index that describes the elements in the Series |
| `dtype` | `string` | data type of the values in the Series |
| `name` | `string` | name of the Series |




## Types

### DataFrame

a dataframe

**Fields**

| name | type | description |
|------|------|-------------|
| at | AtIndexer | returns an AtIndexer, which can be used to retrieve an arbitrary cell from the DataFrame |
| columns | Index | returns the columns of the DataFrame as an Index |
| index | Index | returns the Index of the DataFrame, if it exists |
| shape | tuple(int,int) | returns a tuple with the size of the DataFrame, as (number rows, number columns) |


**Methods**

### append

```
append(other) DataFrame
```

appends data to the rows of this DataFrame, returned as a new DataFrame

#### parameters:

| name | type | description |
|------|------|-------------|
| `other` | `list` | data to append |



### apply

```
apply(function, axis) Series
```

travel the given axis and apply the function to each slice. The result values of that function are collected into a Series, which is returned

#### parameters:

| name | type | description |
|------|------|-------------|
| `function` | `function` | the function to apply to each slice |
| `axis` | `int` | which to travel, either 0 for columns, or 1 for rows |



### drop

```
drop(labels, axis, index, columns)
```

drop columns or rows from the DataFrame

#### parameters:

| name | type | description |
|------|------|-------------|
| `labels` | `list(string)` | what to drop from the DataFrame, axis is required to specify what the labels mean. axis=0 if the labels are for the index, axis=1 if the labels are for the columns |
| `axis` | `int` | which axis to drop from. axis=0 for index, axis=1 for columns |
| `index` | `list(string)` | values to drop from the index |
| `columns` | `Index` | values to drop from the columns |



### drop_duplicates

```
drop_duplicates(subset)
```

drop duplicate rows of the DataFrame

#### parameters:

| name | type | description |
|------|------|-------------|
| `subset` | `list(string)` | which subset of each row to consider for uniqueness |



### groupby

```
groupby(by) GroupByResult
```

group a set of row according to some given column value

#### parameters:

| name | type | description |
|------|------|-------------|
| `by` | `list(string)` | a list of column names to use for grouping the rows together |

#### examples:
**groupby**

group rows according to the values in the given column

```
load("dataframe.star", "dataframe")
df = dataframe.DataFrame([["cat", "tabby"],
["cat", "black"],
["cat", "calico"],
["dog", "doberman"],
["dog", "pug"]],
columns=["species", "breed"])
num_breeds = df.groupby(['species'])['breed'].count()
```




### head

```
head(n?) DataFrame
```

return the first n row of the DataFrame

#### parameters:

| name | type | description |
|------|------|-------------|
| `n` | `int` | number of rows to include, defaulting to 5 |



### merge

```
merge(right, left_on, right_on, how, suffixes) DataFrame
```

merge this with the right DataFrame, returned as a new DataFrame

#### parameters:

| name | type | description |
|------|------|-------------|
| `right` | `DataFrame` | the DataFrame to merge with this one |
| `left_on` | `string` | which column of the left DataFrame to merge on |
| `right_on` | `string` | which column of the right DataFrame to merge on |
| `how` | `string` | how to merge the columns, only "inner" is supported, and is the default |
| `suffixes` | `list(string)` | suffixes to use for merged column names, defaulting to ["_x", "_y"] |



### reset_index

```
reset_index()
```

resets the index to be an empty index, turning the previous index into its own column

### Index

an index, which is used to describe an axis of a DataFrame

**Fields**

| name | type | description |
|------|------|-------------|
| name | string | the name of the index |
| str | StringMethods | string functions that will be applied to all strings in the Index |
### Series

a series of values of one type, which represents a column of a DataFrame

**Methods**

### astype

```
astype(type) Series
```

coerce the values in the Series to the given type

#### parameters:

| name | type | description |
|------|------|-------------|
| `type` | `string` | a string representing a type |



### equals

```
equals(value) Series
```

return a Series of bools for whether each element is equal to the value

#### parameters:

| name | type | description |
|------|------|-------------|
| `value` | `any` | value to compare each element to |



### get

```
get(index) any
```

gets the cell at the given index

#### parameters:

| name | type | description |
|------|------|-------------|
| `index` | `any` | either an int or a name from the index |



### notequals

```
notequals(value) Series
```

return a Series of bools for whether each element is not equal to the parameter

#### parameters:

| name | type | description |
|------|------|-------------|
| `value` | `any` | value to compare each element to |



### notnull

```
notnull() Series
```

return a Series of bools for whether each element is not null


### unique

```
unique() Series
```

return a Series of just the unique elements

### StringMethods

string functions that will be applied to all strings in the collection

**Methods**

### contains

```
contains(text)
```

whether each string contains the given text

#### parameters:

| name | type | description |
|------|------|-------------|
| `text` | `string` | the text to look for in each string |



### endswith

```
endswith(text)
```

whether each string ends with the given text

#### parameters:

| name | type | description |
|------|------|-------------|
| `text` | `string` | the text to look for at the end of each string |



### lower

```
lower()
```

convert the strings to lower case


### replace

```
replace(needle, new)
```

replace the needle in each string with the new text

#### parameters:

| name | type | description |
|------|------|-------------|
| `needle` | `string` | the text to look for |
| `new` | `string` | the text to replace it with |



### startswith

```
startswith(text)
```

whether each string starts with the given text

#### parameters:

| name | type | description |
|------|------|-------------|
| `text` | `string` | the text to look for at the start of each string |



### strip

```
strip()
```

remove whitespace from the start and end of each string


