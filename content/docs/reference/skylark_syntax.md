---
title: "skylark transformations"
description: "skylark transformations"
date: 2018-01-30T00:00:00-04:00
section: reference
---

# Skylark Syntax
Qri ("query") is about datasets. Transformions are repeatable scripts for generating a dataset. [Skylark](https://github.com/google/skylark/blob/master/doc/spec.md) is a scripting langauge from Google that feels a lot like python. This package implements skylark as a _transformation syntax_. Skylark tranformations are about as close as one can get to the full power of a programming language as a transformation syntax. Often you need this degree of control to generate a dataset.

Typical examples of a skylark transformation include:

* combining paginated calls to an API into a single dataset
* downloading unstructured structured data from the internet to extract
* re-shaping raw input data before saving a dataset

### Differences from Python

**No While Loops**

**No Recursion**

**Set Variables Once**

**Can be run in parallel**

** **

### Skylark In Qri:

Skylark transformations have a few rules on top of skylark itself:

* Data functions *always* return data
* When you define a data function, qri calls it for you
* All tranform functions are optional (you don't _need_ to define them), _but_
* A transformation must have at least one data function
* Data functions are always called in the same order
* Data functions often get a `qri` parameter that lets them do special things

** **

### Transform Functions

So far there are two predefined transform functions, with more planned for future use:

* download
* transform

#### Download
Download is the only moment

** **

### Transform Configuration

** **

### Transform Secrets