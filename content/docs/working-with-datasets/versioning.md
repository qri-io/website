---
title: "Versioning Datasets"
metaTitle: ""
metaDescription: ""
---

Qri Datasets are versioned using a process similar to git.  A user can make changes to a working copy of a dataset’s components, and commit those changes once an important milestone is reached. A commit creates a new version of the dataset which is immutable, timestamped, and identified by a hash.

A dataset’s components are always connected and are versioned together, meaning changes to any individual component will result in a new version of the dataset.

Each version is signed using keypair cryptology so others can verify that a specific user is responsible for a given version.


Using a `username/datasetname` reference on its own always refers to the _latest version_ of a dataset.  Older versions can be referenced by adding the ipfs hash to the base reference in the format of {peername}/{dataset name}@{network}/{hash}

    chriswhong/my_important_dataset@ipfs/QmaArgPTcmE1Bv37PryZvMSkjiMgLRtG6hGwbAkh3BqafN


## Versioning in Qri Desktop

In Qri Desktop, it's easy to create new versions of a dataset.  Use the status tab to make changes to components, or checkout the dataset and modify the files in the working directory.

Once you're ready to commit your changes, use the commit tab.

## Versioning in Qri CLI

From the CLI, versions are committed using `qri save`.  To commit changes to the body use the `--body` flag and provide a path to a CSV.  For other components, use the `--file` flag and provide a path to a json or yaml file.

```bash
$ qri save --file structure.yaml

using dataset [me/my_dataset]

dataset saved: foo/my_dataset@/ipfs/QmXciFZ7CZj3PfauaXSpKd6amyUpWh4qiPhPGywFbzjhWa
```
