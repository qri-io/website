---
metaTitle: "Qri Python Commands"
metaDescription: "An Overview of Qri Python Client Commands"
weight: 9
---

# qri

Client for interacting with qri repositories

#### list

```python
list(username=None)
```

list datasets in the user's repository

#### get

```python
get(refstr)
```

get a dataset in the repository by reference

#### pull

```python
pull(refstr)
```

pull a remote dataset from the registry to the user's repository

#### add

```python
add(refstr)
```

add is an alias for pull

#### sql

```python
sql(query)
```

sql query run against a dataset