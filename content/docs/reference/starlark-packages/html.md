---
metaTitle: "html"
metaDescription: "html defines jquery-like html selection & iteration functions for HTML documents"
weight: 2
---

html defines jquery-like html selection & iteration functions for HTML documents

## Functions



### html

```
html(markup) selection
```

parse an html document returning a selection at the root of the document

#### parameters:

| name | type | description |
|------|------|-------------|
| `markup` | `string` | html text to build a document from |




## Types

### selection

an HTML document for querying

**Methods**

### attr

```
attr(name) string
```

gets the specified attribute's value for the first element in the Selection.
To get the value for each element individually, use a looping construct such as each or map method

#### parameters:

| name | type | description |
|------|------|-------------|
| `name` | `string` | attribute name to get the value of |



### children

```
children() selection
```

gets the child elements of each element in the Selection


### children_filtered

```
children_filtered(selector) selection
```

gets the child elements of each element in the Selection, filtered by the specified selector

#### parameters:

| name | type | description |
|------|------|-------------|
| `selector` | `string` | a query selector string to filter the current selection, returning a new selection |



### contents

```
contents(selector) selection
```

gets the children of each element in the Selection, including text and comment nodes

#### parameters:

| name | type | description |
|------|------|-------------|
| `selector` | `string` | a query selector string to filter the current selection, returning a new selection |



### find

```
find(selector) selection
```

gets the descendants of each element in the current set of matched elements, filtered by a selector

#### parameters:

| name | type | description |
|------|------|-------------|
| `selector` | `string` | a query selector string to filter the current selection, returning a new selection |



### filter

```
filter(selector) selection
```

filter reduces the set of matched elements to those that match the selector string

#### parameters:

| name | type | description |
|------|------|-------------|
| `selector` | `string` | a query selector string to filter the current selection, returning a new selection |



### get

```
get(i) selection
```

retrieves the underlying node at the specified index. alias: eq

#### parameters:

| name | type | description |
|------|------|-------------|
| `i` | `int` | numerical index of node to get |



### has

```
has(selector) selection
```

reduces the set of matched elements to those that have a descendant that matches the selector

#### parameters:

| name | type | description |
|------|------|-------------|
| `selector` | `string` | a query selector string to filter the current selection, returning a new selection |



### isSelector

```
isSelector(selector) bool
```

checks the current matched set of elements against a selector and returns true if at least one of these elements matches

#### parameters:

| name | type | description |
|------|------|-------------|
| `selector` | `string` | a query selector string to filter the current selection, returning a new selection |



### parent

```
parent(selector) selection
```

gets the parent of each element in the Selection

#### parameters:

| name | type | description |
|------|------|-------------|
| `selector` | `string` | a query selector string to filter the current selection, returning a new selection |



### parents_until

```
parents_until(selector) selection
```

gets the ancestors of each element in the Selection, up to but not including the element matched by the selector

#### parameters:

| name | type | description |
|------|------|-------------|
| `selector` | `string` | a query selector string to filter the current selection, returning a new selection |



### siblings

```
siblings() selection
```

gets the siblings of each element in the Selection


### text

```
text() string
```

gets the combined text contents of each element in the set of matched elements, including descendants


### first

```
first(selector) selection
```

gets the first element of the selection

#### parameters:

| name | type | description |
|------|------|-------------|
| `selector` | `string` | a query selector string to filter the current selection, returning a new selection |



### last

```
last() selection
```

gets the last element of the selection

#### parameters:

| name | type | description |
|------|------|-------------|
| `selector` | `string` | a query selector string to filter the current selection, returning a new selection |



### len

```
len() int
```

returns the number of the nodes in the selection


### eq

```
eq(i) selection
```

gets the element at index i of the selection

#### parameters:

| name | type | description |
|------|------|-------------|
| `i` | `int` | numerical index of node to get |



