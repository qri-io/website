---
metaTitle: "list"
metaDescription: "All methods for the list type (append(), clear(), extend(), etc.)"
---

This section lists the methods of the built-in type `list`.  Methods are selected
using dot expression.

As with built-in functions, built-in methods accept only positional
arguments except where noted.

The parameter names serve merely as documentation.

### append

`L.append(x)` appends `x` to the list L, and returns `None`.

`append` fails if the list is frozen or has active iterators.

```python
x = []
x.append(1)                             # None
x.append(2)                             # None
x.append(3)                             # None
x                                       # [1, 2, 3]
```

### clear

`L.clear()` removes all the elements of the list L and returns `None`.
It fails if the list is frozen or if there are active iterators.

```python
x = [1, 2, 3]
x.clear()                               # None
x                                       # []
```

### extend

`L.extend(x)` appends the elements of `x`, which must be iterable, to
the list L, and returns `None`.

`extend` fails if `x` is not iterable, or if the list L is frozen or has active iterators.

```python
x = []
x.extend([1, 2, 3])                     # None
x.extend(["foo"])                       # None
x                                       # [1, 2, 3, "foo"]
```

### index

`L.index(x[, start[, end]])` finds `x` within the list L and returns its index.

The optional `start` and `end` parameters restrict the portion of
list L that is inspected.  If provided and not `None`, they must be list
indices of type `int`. If an index is negative, `len(L)` is effectively
added to it, then if the index is outside the range `[0:len(L)]`, the
nearest value within that range is used; see [Indexing](#indexing).

`index` fails if `x` is not found in L, or if `start` or `end`
is not a valid index (`int` or `None`).

```python
x = list("banana".codepoints())
x.index("a")                            # 1 (bAnana)
x.index("a", 2)                         # 3 (banAna)
x.index("a", -2)                        # 5 (bananA)
```

### insert

`L.insert(i, x)` inserts the value `x` in the list L at index `i`, moving
higher-numbered elements along by one.  It returns `None`.

As usual, the index `i` must be an `int`. If its value is negative,
the length of the list is added, then its value is clamped to the
nearest value in the range `[0:len(L)]` to yield the effective index.

`insert` fails if the list is frozen or has active iterators.

```python
x = ["b", "c", "e"]
x.insert(0, "a")                        # None
x.insert(-1, "d")                       # None
x                                       # ["a", "b", "c", "d", "e"]
```

### pop

`L.pop([index])` removes and returns the last element of the list L, or,
if the optional index is provided, at that index.

`pop` fails if the index is not valid for `L[i]`,
or if the list is frozen or has active iterators.

```python
x = [1, 2, 3, 4, 5]
x.pop()                                 # 5
x                                       # [1, 2, 3, 4]
x.pop(-2)                               # 3
x                                       # [1, 2, 4]
x.pop(-3)                               # 1
x                                       # [2, 4]
x.pop()                                 # 4
x                                       # [2]
```

### remove

`L.remove(x)` removes the first occurrence of the value `x` from the list L, and returns `None`.

`remove` fails if the list does not contain `x`, is frozen, or has active iterators.

```python
x = [1, 2, 3, 2]
x.remove(2)                             # None (x == [1, 3, 2])
x.remove(2)                             # None (x == [1, 3])
x.remove(2)                             # error: element not found
```
