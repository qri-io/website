---
metaTitle: "Setup Your Local Qri Repository"
metaDescription: "How to set up your local repository, create a username, and link your local identity with qri cloud"
---

## Introduction

This guide will cover setting up a local Qri repository and linking its identity to a Qri Cloud account. The first step is required for creating datasets, the second step is necessary to enable pushing datasets to qri.cloud.

## Prerequisites

* The [Qri CLI](/docs/guides/qri-cli/install-qri-locally) installed

## Directions

### Step 1: Run Qri Setup

After first installing Qri, most qri commands will not be available until you run `qri setup`

```shell
$ qri list
no qri repo exists
have you run 'qri setup'?
```

Run `qri setup`, which will prompt for a username. If you're not planning to use Qri Cloud, you can enter any username here.  If you plan to use Qri Cloud, you'll choose a unique username during the signup process that will overwrite the default username.

```shell
$ qri setup
choose username (leave empty to generate a default name):
set up qri repo at: /Users/some-user/.qri

$ qri list
you have no datasets
```

After setup, `qri list` will show that your repository is empty, and you're ready to start [creating datasets](/docs/guides/qri-cli/create-a-dataset-from-a-csv).


### Step 2 (optional): Link your local identity with a Qri Cloud account

#### Option 1: Sign up for a new Qri Cloud account and link it to the local Qri Repository

You can create a Qri Cloud account and link it with your local repository in one command with `qri registry signup`.

```shell
$ qri registry signup --email some-user@qri.io --username some-user
password:********
user some-user created on registry, connected local key
```

#### Option 2: Link your local Qri repository to an existing Qri Cloud account

If you already have an account on qri.cloud, you can link a local qri repository to it using `qri registry prove`

_**Note:** `qri registry prove` can only be used on a new local repository, where a user has run `qri setup` but hasn't pulled or saved any datasets. This is because prove will pull down your identity from cloud and overwrite what's in the local repository_

```shell
$ qri registry prove --email some-user@qri.io --username some-user
password: ********
proved user some-user to registry, connected local key
```

You're ready to start pushing and pulling Qri Datasets!

Try `qri pull nyc-transit-data/turnstile_daily_counts_2020` to pull a dataset.  Once you have it, try `qri get body nyc-transit-data/turnstile_daily_counts_2020` to inspect the dataset body.

## Additional Resources

* Use the CLI to [create a new dataset](/docs/guides/qri-cli/create-a-dataset-from-a-csv).

* [Push a dataset to Qri Cloud](/docs/guides/qri-cli/push-a-dataset-to-qri-cloud)
