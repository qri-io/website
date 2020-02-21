---
metaTitle: "Your Collection of Datasets"
metaDescription: "The collection is all of the Qri datasets you have on your computer"
---

Your _collection_ consists of all of the Qri datasets you _have_ on your computer.  These can be _your_ datasets (those associated with your qri username), or those that you have _cloned_ from other Qri users.  

## Your Collection in Qri Desktop

Use the collection pane to manage your local Qri datasets.  From the collection pane you can:

- Create a new dataset
- Remove a dataset
- Clone a dataset from the Qri Network


## Your Collection in Qri CLI

Use `qri list` to show information about the datasets in your collection.

```bash
$ qri list

1   fred/usgs_earthquakes
    linked: ~/datasets/usgs_earthquakes

2   fred/favorite_bands
    linked: ~/datasets/favorite_bands

3   fred/white_wine_quality
    linked: ~/datasets/white_wine_quality
```

You can use [other CLI commands](/docs/reference/cli_commands) to clone, remove, and rename datasets in your collection.
