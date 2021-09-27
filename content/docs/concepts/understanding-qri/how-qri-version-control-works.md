---
metaTitle: "How Qri Dataset Version Control Works"
metaDescription: "Each version is immutable, and carries information about the user, metadata, and transformation code along with the data itself"
---

Qri datasets have version control built-in.  Any change to a dataset's components, large or small, constitutes a new immutable version of the dataset, but doesn't remove or alter previous versions.  Versions live in a chronology, or history, and older versions can be quickly referenced and used for comparison to other versions.

Real version control means users don't need to rely on timestamps, server logs, or other artifacts to figure out what version of a dataset they are dealing with.  

Likewise, two Qri users in different locations can know with certainty that they are each working with the exact same dataset.

## Where Versions Come From

Versions can be created when:

- Qri.cloud runs a user's automated workflow
- A Qri.cloud user makes a manual change via the UI
- A Qri CLI user runs the `qri save` command and passes in new information for one or more `components`
- A Qri CLI runs a transform script locally, and the code generates a different version of one more components

## Commit messages

Just like with git, each version is accompanied by a message meant to describe the changes between a new version and the previous one.  These can be written manually or automated.  In the absence of a commit message provided by the user or set in a transform script, Qri will add a machine-generated message based on the changes detected in the new version.

## Version History

Just like a git repository, a Qri Dataset has a history of commits associated with it. We refer to the latest version as `HEAD`, and `HEAD` is implied when referencing a dataset.  

In Qri.cloud, you can inspect each dataset's version history in the History panel.

With Qri CLI, you can inspect a dataset's version history with the `qri log` command.

### Referencing Older Versions

Older versions of a dataset can be referenced using their hash, with the following syntax:

`{username}/{datasetname}@ipfs/{versionhash}`

For example,

`b5/comics@/ipfs/QmejvEPop4D7YUadeGqYWmZxHhLc4JBUCzJJHWMzdcMe2y` references a specific version of the dataset `b5/comics`

Older versions of datasets have the same component structure, so you can reference `body`, `meta`, the same way you would with the `HEAD` version.

## Change is Good, Change is Required

If you attempt to create a new version of a dataset, but none of the components have changed, Qri will reject the commit because, well, it's not really a new version unless something has changed!
