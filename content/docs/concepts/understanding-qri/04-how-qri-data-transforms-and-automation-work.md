---
metaTitle: "How Qri Data Transforms and Automation Work"
metaDescription: "Learn about \"Datasets that update themselves\" are possible with a bit of code and the Qri data platform"
---

Qri has engineered a way to bind a dataset with the code it needs to produce new versions of itself.  We call these `transform` scripts, and they are a bona-fide member of the Qri data model.  This means the code lives with the data it modifies, providing a clear audit trail for changes and demystifying the data provenance.

Transforms are not required in Qri datasets, but when they are clearly written and set to run at specific times, they can yield powerful automated data flows.  Qri transforms give users the power of a complex ETL environment with much lower setup time and costs.

## The Trouble with ETL

Many data practitioners spend their days refining complex transformation workflows, pulling data from this or that system, joining it, reshaping it, filtering it, and loading it into other databases.  

Among other issues, the process of setting up ETL is burdened by several issues:
- It is often difficult to set up and maintain the infrastructure necessary for complex ETL workflows
- Code and data live separately, so additional measures must be taken to clarify what code acted on which data and when
- The ETL process can be more engineering-centric and is out-of-view/out-of-reach from data consumers
- Additional tooling and software is necessary after the fact for data sharing, publishing, and governance

## Datasets That Update Themselves

Datasets can have one and only one `transform` script, code whose sole purpose is to produce the next version of the dataset.  Transforms can pull data from multiple sources:
- Other Qri Datasets (upstream datasets)
- Websites (by scraping html)
- File-based data (think CSVs and JSON feeds)

The code is versioned along with the rest of the Qri Dataset, so a version created from code can always prove where it came from!

Instead of a centralized codebase acting on a datastore, Qri distributes the code and adds configuration for telling each dataset when to run its transform.  The code, data, and execution environment are co-located, and a simple scheduled data workflow can be created, tested, and deployed in a matter of minutes.


### Chaining Qri Transforms

Dataset B can be configured to run its transform whenever dataset A has a new version.  By chaining these dataset dependencies, we can set up sophisticated data flows, all with clarity about what code ran when, and how it did or didn't modify a dataset.

## Starlark - A lightweight python-esque scripting langauge

Qri Transforms are written in Starlark, a python dialect that can be executed in a controlled environment (on our hardware or yours!).  We've extended the core functionality of Starlark with a standard library (starlib) which includes useful tools for shaping data.

Learn more about the Starlark Language.

## Automation - Workflows in Qri Cloud

In Qri Cloud, we've introduced the concept of _Workflows_, which combine Qri transform scripts with Triggers and Completion Tasks.  Triggers specify when your transform should run: either on a schedule (e.g. nightly at 9pm) or when an upstream dataset is updated.  Completion Tasks let you specify what you want to happen after the transform runs (e.g. email me a report only if there were changes)
