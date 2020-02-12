---
metaTitle: "Naming Datasets in Qri"
metaDescription: "Describes the various notations for referencing a specific dataset on the Qri network."
---

What's in a name?  There are several ways of referring to datasets in Qri.  Here are some examples of each.

## Shorthand Dataset References

In Qri, datasets are most commonly referred to by a combination of username and dataset name, separated by a slash:

    b5/comics

This notation refers to the __latest__ version of qri user `b5`'s dataset `comics`.  All dataset names must be unique for their associated username, and all usernames must be unique, so this becomes a globally unique identifier for the dataset.

## The `me` keyword

What if your username is, say, `golden_pear_ginger_pointer`? First, why did you pick such a long username? Whatever your answer, it would be irritating to have to type your username every time, so we give you a special way to refer to yourself: `me`. So if _you_ have a dataset named `comics`, you can just type:

    me/comics

In a sentence: "the latest version of my dataset named comics." Under the hood, we'll re-write your request to your username for you.

## Full Dataset References

The full reference notation for a dataset is a combination of username, dataset name, network, and hash also known as a dataset reference.  Qri usernames are unique, and all dataset names are unique to their associated username, meaning each dataset reference is globally unique across the qri network.  

The full dataset reference takes this format:

    username/dataset_name@/network/hash

an example of that looks like this:

    b5/comics@/ipfs/QmejvEPop4D7YUadeGqYWmZxHhLc4JBUCzJJHWMzdcMe2y

In a sentence:
`b5` is the name of a *peer*, who has a dataset *named*  `comics`, and it’s *hash* on the `ipfs` network at a point in time was `QmejvEPop4D7YUadeGqYWmZxHhLc4JBUCzJJHWMzdcMe2y`

We need peer names so lots of people can name datasets the same thing, and in this instance that giant hash thing is used to refer to a dataset at a specific version of a dataset, from an exact point in time.

## Defaults

Now, having to type `b5/comics@/ipfs/QmejvEPop4D7YUadeGqYWmZxHhLc4JBUCzJJHWMzdcMe2y` every time you wanted a dataset would be irritating. So we have two defaults. The default network is `ipfs`, and the default hash is _the lastest known version_ of a dataset. We say latest _known_ because sometimes things can fall out of sync. If you're only working with your own local datasets, this won't be an issue.

Anyway, that means we can cut down on the typing if we just want the latest version of `b5`'s `comics` dataset, we can just type:
```
b5/comics
```
In a sentence: "the latest version of peers b5's dataset named comics."


## Refer to a dataset using its hash

Finally, it’s also possible to use just the hash. This is a perfectly valid dataset reference:

    /ipfs/QmejvEPop4D7YUadeGqYWmZxHhLc4JBUCzJJHWMzdcMe2y

In this case we're _ignoring naming altogether_ and simply referring to a dataset by it's network and hash. Because IPFS hashes are global, we can do this across _the entire network_. If you're coming from git, this is a fun new trick.


## To recap:

All of these are ways to refer to a dataset:

- **peer_name/dataset_name** :  `b5/comics`
- **network/hash** :  `/ipfs/QmejvEPop4D7YUadeGqYWmZxHhLc4JBUCzJJHWMzdcMe2y`
- **peer_name/dataset_name@/network/hash**:  `b5/comics@/ipfs/QmejvEPop4D7YUadeGqYWmZxHhLc4JBUCzJJHWMzdcMe2y`
