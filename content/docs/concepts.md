---
title: "concepts"
date: 2018-01-30T00:00:00-04:00
---

# Concepts


## Dataset
## Structure
## Metadata
## Peers
## Dataset Names

It’s possible to refer to a dataset in a number of ways. It’s easiest to look at the full definition of a dataset reference, and then show what the “defaults” are to make sense of things. The full definition of a dataset reference is as follows:


    dataset_reference = peer_name/dataset_name@/network/hash

an example of that looks like this:

    b5/comics@QmejvEPop4D7YUadeGqYWmZxHhLc4JBUCzJJHWMzdcMe2y

In a sentence:
`b5` ****is the name of a *peer,* who has a dataset *named*  `comics`, and it’s *hash* at a point in time was `QmejvEPop4D7YUadeGqYWmZxHhLc4JBUCzJJHWMzdcMe2y` 

We need peer names so lots of people can name datasets the same thing, and in this instance that giant hash thing (more on that here) is used to refer to a dataset at a specific version of a dataset, from an exact point in time.

Now, you don’t need to type that every time. My peername happens to be `b5`, so I could just type:

    me/comics

In a sentence:
the latest version of my dataset named comics.

Under the hood, we’re adding defaults to the reference:

- the default peername is *your* peername
- the default hash is the *latest version*

It’s also worth noting that on standard qri installations, it’s also possible to use just the hash. This is a perfectly valid dataset reference:

    QmejvEPop4D7YUadeGqYWmZxHhLc4JBUCzJJHWMzdcMe2y


- **peername/name***:*  `qri info b5/comics`
- **hash** :  **`qri info QmejvEPop4D7YUadeGqYWmZxHhLc4JBUCzJJHWMzdcMe2y`
- **peername/name@hash**:  `qri info b5/comics@QmejvEPop4D7YUadeGqYWmZxHhLc4JBUCzJJHWMzdcMe2y`