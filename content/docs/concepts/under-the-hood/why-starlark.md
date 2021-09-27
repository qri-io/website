---
metaTitle: "Why Starlark?"
metaDescription: "Learn about characteristics of Starlark (a python dialect) that make it well-suited for dataset transformations in Qri"
---

Qri uses Starlark, a dialog of Python, to allow users to bind code to their datasets and automate the creation of new dataset versions.

## Design Goals

Qri's programming environment for is optimized for the following characteristics:

* **Familiar.** syntax should match tools data publishers are already familiar with.
* **Portable.** programs need to be easy to deploy. Transform scripts need to run on many computing hosts: local computers, cloud servers & in the browser. Programs need to be able to read & write state they depend on for execution from all of these environments.
* **Predictable.** primary and side effects should be cheap to compute through static analysis
* **Safe.** adding a _sandbox_ to programs that are portable and predictable rounds out our definition of safety.

Starlark meets all of these criteria out of the box, and we've taken it a step further by building a standard library of common tools and methods. We've also added some dataset-centric functionality similar to the popular [pandas](https://pandas.pydata.org/) library used for data science in the Python world.

## More about Starlark in Qri

Qri's implementation of Starlark is built atop [Starlark in Go](https://github.com/google/starlark-go/blob/master/doc/spec.md), which originally came from the [bazel build tool](https://docs.bazel.build/versions/4.2.1/skylark/language.html) at google. The spec provides a nice high-level description:

> Starlark is an untyped dynamic language with high-level data types, first-class functions with lexical scope, and automatic memory management or garbage collection.
>
> Starlark is strongly influenced by Python, and is almost a subset of that language. In particular, its data types and syntax for statements and expressions will be very familiar to any Python programmer. However, Starlark is intended not for writing applications but for expressing configuration: its programs are short-lived and have no external side effects and their main result is structured data or side effects on the host application. As a result, Starlark has no need for classes, exceptions, reflection, concurrency, and other such features of Python.
