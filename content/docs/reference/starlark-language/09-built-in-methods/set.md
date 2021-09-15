---
metaTitle: "set"
---

This section lists the methods of the built-in type `set`.  Methods are selected
using dot expression.

As with built-in functions, built-in methods accept only positional
arguments except where noted.

The parameter names serve merely as documentation.

### union

`S.union(iterable)` returns a new set into which have been inserted
all the elements of set S and all the elements of the argument, which
must be iterable.

`union` fails if any element of the iterable is not hashable.

```python
x = set([1, 2])
y = set([2, 3])
x.union(y)                              # set([1, 2, 3])
```
