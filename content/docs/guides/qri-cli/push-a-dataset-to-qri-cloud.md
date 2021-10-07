---
metaTitle: "Push a Dataset to Qri Cloud"
metaDescription: "Push a dataset from your local Qri repository to Qri Cloud"
---

## Introduction


## Prerequisites

* The [Qri CLI](/docs/guides/qri-cli/install-qri-locally) installed
* A Qri repository whose identity is linked to Qri Cloud
* A Qri Dataset in your Local Qri Repository [How to Create a Dataset](/docs/guides/qri-cli/create-a-dataset-from-a-csv)

## Directions

### Step 1: Push your Dataset

`qri push` is useful for moving Qri datasets around.  You can push to any Qri remote, but [qri.cloud](https://qri.cloud) serves as the default remote for new local qri installations.  Use `qri push {username}/{datasetname}` to push your dataset to `qri.cloud`.

```shell
$ qri push me/top-ten-us-cities-by-population
pushing done [================================================================]
pushed dataset chriswhong-demo/top-ten-us-cities-by-population@glcmx5abuw6uygtqhuagnwb7bh5rafjbqpzje6btorifmtvfty3a/ipfs/QmP6RSBh1du1Zztqh2Ak9Q4JnPU8nAvLAZHe6yqdmnZghw
```

By default, `qri push` will only push the most recent version of a dataset.  To push a specific version, use `qri push me/dataset@/ipfs/QmHashOfVersion`.

We don't have a way to "push all" versions of a dataset at the moment.  [Here's a github issue](https://github.com/qri-io/qri/issues/1933) where you can voice your support for this feature or tell us how you'd expect it to work.

### Step 2: Check out your dataset on Qri Cloud!

That's it!  Your dataset is now published on Qri Cloud at `https://qri.cloud/{username}/{datasetname}`

## Additional Resources

* Read this [conceptual guide about Qri transforms and data automation](/docs/concepts/understanding-qri/how-qri-data-transforms-and-automation-work)
* Browse the [Starlark Docs](/docs/reference/starlark-language)
* Browse reference docs for other [Starlark Packages](/docs/reference/starlark-packages)
