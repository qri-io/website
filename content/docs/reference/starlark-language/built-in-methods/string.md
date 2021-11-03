---
metaTitle: "string"
metaDescription: "All methods for the string type (capitalize(), format(), find(), etc.)"
---

This section lists the methods of the built-in type `string`.  Methods are selected
using dot expression.

As with built-in functions, built-in methods accept only positional
arguments except where noted.

The parameter names serve merely as documentation.

### elem_ords

`S.elem_ords()` returns an iterable value containing the
sequence of numeric bytes values in the string S.

To materialize the entire sequence of bytes, apply `list(...)` to the result.

Example:

```python
list("Hello, 世界".elem_ords())        # [72, 101, 108, 108, 111, 44, 32, 228, 184, 150, 231, 149, 140]
```

See also: `elems`.

<b>Implementation note:</b> `elem_ords` is not provided by the Java implementation.

### capitalize

`S.capitalize()` returns a copy of string S with its first code point
changed to its title case and all subsequent letters changed to their
lower case.

```python
"hello, world!".capitalize()		# "Hello, world!"
"hElLo, wOrLd!".capitalize()		# "Hello, world!"
"¿Por qué?".capitalize()		# "¿por qué?"
```

### codepoint_ords

`S.codepoint_ords()` returns an iterable value containing the
sequence of integer Unicode code points encoded by the string S.
Each invalid code within the string is treated as if it encodes the
Unicode replacement character, U+FFFD.

By returning an iterable, not a list, the cost of decoding the string
is deferred until actually needed; apply `list(...)` to the result to
materialize the entire sequence.

Example:

```python
list("Hello, 世界".codepoint_ords())        # [72, 101, 108, 108, 111, 44, 32, 19990, 30028]

for cp in "Hello, 世界".codepoint_ords():
   print(chr(cp))  # prints 'H', 'e', 'l', 'l', 'o', ',', ' ', '世', '界'
```

See also: `codepoints`.

<b>Implementation note:</b> `codepoint_ords` is not provided by the Java implementation.

### count

`S.count(sub[, start[, end]])` returns the number of occcurences of
`sub` within the string S, or, if the optional substring indices
`start` and `end` are provided, within the designated substring of S.
They are interpreted according to Starlark's [indexing conventions](#indexing).

```python
"hello, world!".count("o")              # 2
"hello, world!".count("o", 7, 12)       # 1  (in "world")
```

### endswith

`S.endswith(suffix[, start[, end]])` reports whether the string
`S[start:end]` has the specified suffix.

```python
"filename.star".endswith(".star")         # True
```

The `suffix` argument may be a tuple of strings, in which case the
function reports whether any one of them is a suffix.

```python
'foo.cc'.endswith(('.cc', '.h'))         # True
```


### find

`S.find(sub[, start[, end]])` returns the index of the first
occurrence of the substring `sub` within S.

If either or both of `start` or `end` are specified,
they specify a subrange of S to which the search should be restricted.
They are interpreted according to Starlark's [indexing conventions](#indexing).

If no occurrence is found, `found` returns -1.

```python
"bonbon".find("on")             # 1
"bonbon".find("on", 2)          # 4
"bonbon".find("on", 2, 5)       # -1
```

### format

`S.format(*args, **kwargs)` returns a version of the format string S
in which bracketed portions `{...}` are replaced
by arguments from `args` and `kwargs`.

Within the format string, a pair of braces `{{` or `}}` is treated as
a literal open or close brace.
Each unpaired open brace must be matched by a close brace `}`.
The optional text between corresponding open and close braces
specifies which argument to use and how to format it, and consists of
three components, all optional:
a field name, a conversion preceded by '`!`', and a format specifier
preceded by '`:`'.

```text
{field}
{field:spec}
{field!conv}
{field!conv:spec}
```

The *field name* may be either a decimal number or a keyword.
A number is interpreted as the index of a positional argument;
a keyword specifies the value of a keyword argument.
If all the numeric field names form the sequence 0, 1, 2, and so on,
they may be omitted and those values will be implied; however,
the explicit and implicit forms may not be mixed.

The *conversion* specifies how to convert an argument value `x` to a
string. It may be either `!r`, which converts the value using
`repr(x)`, or `!s`, which converts the value using `str(x)` and is
the default.

The *format specifier*, after a colon, specifies field width,
alignment, padding, and numeric precision.
Currently it must be empty, but it is reserved for future use.

```python
"a{x}b{y}c{}".format(1, x=2, y=3)               # "a2b3c1"
"a{}b{}c".format(1, 2)                          # "a1b2c"
"({1}, {0})".format("zero", "one")              # "(one, zero)"
"Is {0!r} {0!s}?".format('heterological')       # 'is "heterological" heterological?'
```

### index

`S.index(sub[, start[, end]])` returns the index of the first
occurrence of the substring `sub` within S, like `S.find`, except
that if the substring is not found, the operation fails.

```python
"bonbon".index("on")             # 1
"bonbon".index("on", 2)          # 4
"bonbon".index("on", 2, 5)       # error: substring not found  (in "nbo")
```

### isalnum

`S.isalnum()` reports whether the string S is non-empty and consists only
Unicode letters and digits.

```python
"base64".isalnum()              # True
"Catch-22".isalnum()            # False
```

### isalpha

`S.isalpha()` reports whether the string S is non-empty and consists only of Unicode letters.

```python
"ABC".isalpha()                 # True
"Catch-22".isalpha()            # False
"".isalpha()                    # False
```

### isdigit

`S.isdigit()` reports whether the string S is non-empty and consists only of Unicode digits.

```python
"123".isdigit()                 # True
"Catch-22".isdigit()            # False
"".isdigit()                    # False
```

### islower

`S.islower()` reports whether the string S contains at least one cased Unicode
letter, and all such letters are lowercase.

```python
"hello, world".islower()        # True
"Catch-22".islower()            # False
"123".islower()                 # False
```

### isspace

`S.isspace()` reports whether the string S is non-empty and consists only of Unicode spaces.

```python
"    ".isspace()                # True
"\r\t\n".isspace()              # True
"".isspace()                    # False
```

### istitle

`S.istitle()` reports whether the string S contains at least one cased Unicode
letter, and all such letters that begin a word are in title case.

```python
"Hello, World!".istitle()       # True
"Catch-22".istitle()            # True
"HAL-9000".istitle()            # False
"ǅenan".istitle()		# True
"Ǆenan".istitle()		# False ("Ǆ" is a single Unicode letter)
"123".istitle()                 # False
```

### isupper

`S.isupper()` reports whether the string S contains at least one cased Unicode
letter, and all such letters are uppercase.

```python
"HAL-9000".isupper()            # True
"Catch-22".isupper()            # False
"123".isupper()                 # False
```

### join

`S.join(iterable)` returns the string formed by concatenating each
element of its argument, with a copy of the string S between
successive elements. The argument must be an iterable whose elements
are strings.

```python
", ".join(["one", "two", "three"])      # "one, two, three"
"a".join("ctmrn".codepoints())          # "catamaran"
```

### lower

`S.lower()` returns a copy of the string S with letters converted to lowercase.

```python
"Hello, World!".lower()                 # "hello, world!"
```

### lstrip

`S.lstrip()` returns a copy of the string S with leading whitespace removed.

Like `strip`, it accepts an optional string parameter that specifies an
alternative set of Unicode code points to remove.

```python
"  hello  ".lstrip()                    # "hello  "
"  hello  ".lstrip("h o")               # "ello  "
```

### partition

`S.partition(x)` splits string S into three parts and returns them as
a tuple: the portion before the first occurrence of string `x`, `x` itself,
and the portion following it.
If S does not contain `x`, `partition` returns `(S, "", "")`.

`partition` fails if `x` is not a string, or is the empty string.

```python
"one/two/three".partition("/")		# ("one", "/", "two/three")
```

### replace

`S.replace(old, new[, count])` returns a copy of string S with all
occurrences of substring `old` replaced by `new`. If the optional
argument `count`, which must be an `int`, is non-negative, it
specifies a maximum number of occurrences to replace.

```python
"banana".replace("a", "o")		# "bonono"
"banana".replace("a", "o", 2)		# "bonona"
```

### rfind

`S.rfind(sub[, start[, end]])` returns the index of the substring `sub` within
S, like `S.find`, except that `rfind` returns the index of the substring's
_last_ occurrence.

```python
"bonbon".rfind("on")             # 4
"bonbon".rfind("on", None, 5)    # 1
"bonbon".rfind("on", 2, 5)       # -1
```

### rindex

`S.rindex(sub[, start[, end]])` returns the index of the substring `sub` within
S, like `S.index`, except that `rindex` returns the index of the substring's
_last_ occurrence.

```python
"bonbon".rindex("on")             # 4
"bonbon".rindex("on", None, 5)    # 1                           (in "bonbo")
"bonbon".rindex("on", 2, 5)       # error: substring not found  (in "nbo")
```

### rpartition

`S.rpartition(x)` is like `partition`, but splits `S` at the last occurrence of `x`.

```python
"one/two/three".partition("/")		# ("one/two", "/", "three")
```

### rsplit

`S.rsplit([sep[, maxsplit]])` splits a string into substrings like `S.split`,
except that when a maximum number of splits is specified, `rsplit` chooses the
rightmost splits.

```python
"banana".rsplit("n")                         # ["ba", "a", "a"]
"banana".rsplit("n", 1)                      # ["bana", "a"]
"one two  three".rsplit(None, 1)             # ["one two", "three"]
"".rsplit("n")                               # [""]
```

### rstrip

`S.rstrip()` returns a copy of the string S with trailing whitespace removed.

Like `strip`, it accepts an optional string parameter that specifies an
alternative set of Unicode code points to remove.

```python
"  hello  ".rstrip()                    # "  hello"
"  hello  ".rstrip("h o")               # "  hell"
```

### split

`S.split([sep [, maxsplit]])` returns the list of substrings of S,
splitting at occurrences of the delimiter string `sep`.

Consecutive occurrences of `sep` are considered to delimit empty
strings, so `'food'.split('o')` returns `['f', '', 'd']`.
Splitting an empty string with a specified separator returns `['']`.
If `sep` is the empty string, `split` fails.

If `sep` is not specified or is `None`, `split` uses a different
algorithm: it removes all leading spaces from S
(or trailing spaces in the case of `rsplit`),
then splits the string around each consecutive non-empty sequence of
Unicode white space characters.
If S consists only of white space, `S.split()` returns the empty list.

If `maxsplit` is given and non-negative, it specifies a maximum number of splits.

```python
"one two  three".split()                    # ["one", "two", "three"]
"one two  three".split(" ")                 # ["one", "two", "", "three"]
"one two  three".split(None, 1)             # ["one", "two  three"]
"banana".split("n")                         # ["ba", "a", "a"]
"banana".split("n", 1)                      # ["ba", "ana"]
"".split("n")                               # [""]
```

### elems

`S.elems()` returns an iterable value containing successive
1-byte substrings of S.
To materialize the entire sequence, apply `list(...)` to the result.

Example:

```python
list('Hello, 世界'.elems())  # ["H", "e", "l", "l", "o", ",", " ", "\xe4", "\xb8", "\x96", "\xe7", "\x95", "\x8c"]
```

See also: `elem_ords`.


### codepoints

`S.codepoints()` returns an iterable value containing the sequence of
substrings of S that each encode a single Unicode code point.
Each invalid code within the string is treated as if it encodes the
Unicode replacement character, U+FFFD.

By returning an iterable, not a list, the cost of decoding the string
is deferred until actually needed; apply `list(...)` to the result to
materialize the entire sequence.

Example:

```python
list('Hello, 世界'.codepoints())  # ['H', 'e', 'l', 'l', 'o', ',', ' ', '世', '界']

for cp in 'Hello, 世界'.codepoints():
   print(cp)  # prints 'H', 'e', 'l', 'l', 'o', ',', ' ', '世', '界'
```

See also: `codepoint_ords`.

<b>Implementation note:</b> `codepoints` is not provided by the Java implementation.

### splitlines

`S.splitlines([keepends])` returns a list whose elements are the
successive lines of S, that is, the strings formed by splitting S at
line terminators (currently assumed to be a single newline, `\n`,
regardless of platform).

The optional argument, `keepends`, is interpreted as a Boolean.
If true, line terminators are preserved in the result, though
the final element does not necessarily end with a line terminator.

As a special case, if S is the empty string,
`splitlines` returns the empty list.

```python
"one\n\ntwo".splitlines()       # ["one", "", "two"]
"one\n\ntwo".splitlines(True)   # ["one\n", "\n", "two"]
"".splitlines()                 # [] -- a special case
```

### startswith

`S.startswith(prefix[, start[, end]])` reports whether the string
`S[start:end]` has the specified prefix.

```python
"filename.star".startswith("filename")         # True
```

The `prefix` argument may be a tuple of strings, in which case the
function reports whether any one of them is a prefix.

```python
'abc'.startswith(('a', 'A'))                  # True
'ABC'.startswith(('a', 'A'))                  # True
'def'.startswith(('a', 'A'))                  # False
```

### strip

`S.strip()` returns a copy of the string S with leading and trailing whitespace removed.

It accepts an optional string argument:
`S.strip(cutset)` instead removes all leading
and trailing Unicode code points contained in `cutset`.

```python
"  hello  ".strip()                     # "hello"
"  hello  ".strip("h o")                # "ell"
```

### title

`S.title()` returns a copy of the string S with letters converted to title case.

Letters are converted to upper case at the start of words, lower case elsewhere.

```python
"hElLo, WoRlD!".title()                 # "Hello, World!"
"ǆenan".title()                        # "ǅenan" ("ǅ" is a single Unicode letter)
```

### upper

`S.upper()` returns a copy of the string S with letters converted to uppercase.

```python
"Hello, World!".upper()                 # "HELLO, WORLD!"
```
