---
metaTitle: "Overview"
metaDescription: "What is Starlark, and why are we using it?"
---
Starlark is an untyped dynamic language with high-level data types,
first-class functions with lexical scope, and automatic memory
management or _garbage collection_.

Starlark is strongly influenced by Python, and is almost a subset of
that language.  In particular, its data types and syntax for
statements and expressions will be very familiar to any Python
programmer.
However, Starlark is intended not for writing applications but for
expressing configuration: its programs are short-lived and have no
external side effects and their main result is structured data or side
effects on the host application.
As a result, Starlark has no need for classes, exceptions, reflection,
concurrency, and other such features of Python.

Starlark execution is _deterministic_: all functions and operators
in the core language produce the same execution each time the program
is run; there are no sources of random numbers, clocks, or unspecified
iterators. This makes Starlark suitable for use in applications where
reproducibility is paramount, such as build tools.
