---
metaTitle: "Working Directories"
metaDescription: "An overview of Qri working directories; How to integrate qri datasets with your filesystem"
---

QRI uses an internal datastore, so your datasets aren't stored as files on your filesystem.  Interacting with your datasets generally requires running [Qri Desktop](/download) or our [command line interface (CLI)](/docs/getting-started/qri-cli-quickstart).

To make interacting with the components of a dataset easier, Qri has added _working directories_, which map the components of a Qri dataset to files in a designated directory.

For example, the `body` component becomes `body.csv`, `meta` becomes `meta.json`, etc.  

| component   | working directory filenames  |
|-------------|----------|
| `body`      | `body.csv` |
| `readme`    | `readme.md` |
| `commit`    | `commit.json` or `commit.yaml` |
| `meta`      | `meta.json` or `meta.yaml` |
| `structure` | `structure.json` or  `structure.yaml` |
| `transform` | `transform.star` |

The working directory acts as a _staging area_ for new versions of a dataset.  Furthermore, anything that can write to a file can be used to make changes to the dataset!

## Using Third-party Tools

Once a dataset has been checked out, any third-party programs can be used to interact with the various files:

- A text editor could be used to open `body.csv` to find and replace values
- A python or node script could be used programmatically overwrite `meta.json` with new metadata.
- A text editor could be used to edit markdown for `readme.md`

## Checkout

Qri uses the term _checkout_ to describe the creation of a working directory for a dataset.  A dataset checkout can be accomplished in Qri Desktop using the checkout button in the Dataset pane, or in Qri CLI using `qri checkout`.

If a dataset is linked to a working directory, the dataset is "checked out".

## Status

Qri watches working directories, and is aware of when the files no longer match the most recent version of the dataset.  In Qri Desktop, the changes are displayed using colored indicators in the Dataset pane's status tab.

Likewise, running `qri status` on the command line will report the status of changes to the files in the working directory.

## Workflow

A typical workflow for using working directories to manage changes to a dataset looks like this:

1. Create or Clone a Qri Dataset
2. Checkout the dataset (create a working directory)
3. Use third party tools to modify the files (Qri will track the changes)
4. Commit the changes to create a new version!
5. Repeat steps 3 and 4 as needed
