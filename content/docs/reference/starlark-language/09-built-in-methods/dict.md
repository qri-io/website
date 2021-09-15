---
metaTitle: "dict"
---

This section lists the methods of the built-in type `dict`.  Methods are selected
using dot expression.

As with built-in functions, built-in methods accept only positional
arguments except where noted.

The parameter names serve merely as documentation.

### clear

`D.clear()` removes all the entries of dictionary D and returns `None`.
It fails if the dictionary is frozen or if there are active iterators.

```python
x = {"one": 1, "two": 2}
x.clear()                               # None
print(x)                                # {}
```

### get

`D.get(key[, default])` returns the dictionary value corresponding to the given key.
If the dictionary contains no such value, `get` returns `None`, or the
value of the optional `default` parameter if present.

`get` fails if `key` is unhashable, or the dictionary is frozen or has active iterators.

```python
x = {"one": 1, "two": 2}
x.get("one")                            # 1
x.get("three")                          # None
x.get("three", 0)                       # 0
```

### items

`D.items()` returns a new list of key/value pairs, one per element in
dictionary D, in the same order as they would be returned by a `for` loop.

```python
x = {"one": 1, "two": 2}
x.items()                               # [("one", 1), ("two", 2)]
```

### keys

`D.keys()` returns a new list containing the keys of dictionary D, in the
same order as they would be returned by a `for` loop.

```python
x = {"one": 1, "two": 2}
x.keys()                               # ["one", "two"]
```

### pop

`D.pop(key[, default])` returns the value corresponding to the specified
key, and removes it from the dictionary.  If the dictionary contains no
such value, and the optional `default` parameter is present, `pop`
returns that value; otherwise, it fails.

`pop` fails if `key` is unhashable, or the dictionary is frozen or has active iterators.

```python
x = {"one": 1, "two": 2}
x.pop("one")                            # 1
x                                       # {"two": 2}
x.pop("three", 0)                       # 0
x.pop("four")                           # error: missing key
```

### popitem

`D.popitem()` returns the first key/value pair, removing it from the dictionary.

`popitem` fails if the dictionary is empty, frozen, or has active iterators.

```python
x = {"one": 1, "two": 2}
x.popitem()                             # ("one", 1)
x.popitem()                             # ("two", 2)
x.popitem()                             # error: empty dict
```

### setdefault

`D.setdefault(key[, default])` returns the dictionary value corresponding to the given key.
If the dictionary contains no such value, `setdefault`, like `get`,
returns `None` or the value of the optional `default` parameter if
present; `setdefault` additionally inserts the new key/value entry into the dictionary.

`setdefault` fails if the key is unhashable, or if the dictionary is frozen or has active iterators.

```python
x = {"one": 1, "two": 2}
x.setdefault("one")                     # 1
x.setdefault("three", 0)                # 0
x                                       # {"one": 1, "two": 2, "three": 0}
x.setdefault("four")                    # None
x                                       # {"one": 1, "two": 2, "three": None}
```

### update

`D.update([pairs][, name=value[, ...])` makes a sequence of key/value
insertions into dictionary D, then returns `None.`

If the positional argument `pairs` is present, it must be `None`,
another `dict`, or some other iterable.
If it is another `dict`, then its key/value pairs are inserted into D.
If it is an iterable, it must provide a sequence of pairs (or other iterables of length 2),
each of which is treated as a key/value pair to be inserted into D.

For each `name=value` argument present, the name is converted to a
string and used as the key for an insertion into D, with its corresponding
value being `value`.

`update` fails if the dictionary is frozen or has active iterators.

```python
x = {}
x.update([("a", 1), ("b", 2)], c=3)
x.update({"d": 4})
x.update(e=5)
x                                       # {"a": 1, "b": "2", "c": 3, "d": 4, "e": 5}
```

### values

`D.values()` returns a new list containing the dictionary's values, in the
same order as they would be returned by a `for` loop over the
dictionary.

```python
x = {"one": 1, "two": 2}
x.values()                              # [1, 2]
```
