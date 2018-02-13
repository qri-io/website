---
title: "transformations"
description: automate updating datasets
bref: automate updating datasets
date: 2018-01-30T00:00:00-04:00
draft: false
---

### Technical Definition
```
Transform is a record of executing a transformation on data.
Transforms could be anything from an SQL query, a jupyter notebook, the state of an
ETL pipeline, etc, so long as the input is one or more datasets, and the output
is a single dataset.
Transform should contain all the machine-necessary bits to deterministically execute
the process referenced in "Data".
Consumers of Transforms may be able to produce abstract versions of
transformations, a decision left to implementations
```