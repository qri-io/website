---
metaTitle: "Qri CLI Quickstart"
metaDescription: "Getting started with Qri's Command Line Interface. Qri is a distributed dataset version control and sharing system"
weight: 3
---

import InfoBlock from '../../../src/components/InfoBlock.js'
import ImageWithCaption from '../../../src/components/ImageWithCaption.js'

Follow these steps to get started with Qri’s Command Line Interface.  To see the same workflow using a GUI, see [Qri Desktop Quickstart](/docs/getting-started/qri-desktop-quickstart)

<InfoBlock>
  All Qri CLI commands have built-in help documentation available with
  <span class='inline-code'>qri [command] --help</span>
</InfoBlock>

## Install the Qri Binary

For `qri` commands to be available in your terminal, you must have the Qri binary installed through one of the following methods:

- [Install a Mac, Windows, or Linux build of Qri](https://github.com/qri-io/qri/releases)
- Homebrew installation (macOS only): `brew install qri-io/qri/qri`
- [Build Qri from source](https://github.com/qri-io/qri)

## Setup your Qri instance

Before you can use Qri, you must run `qri setup`.  This sets your cryptographic keys, auto-generates a username, and initializes the Qri environment on your computer.

```
$ qri setup

choose a peername: [persimmon_cane_corso]:
set up qri repo at: ~/.qri
```

## Connect your keypair to your Qri Cloud account

If you already have a Qri Cloud account, you need to connect your username with your CLI keypair.

If you do not have an account, [sign up](#sign-up-for-a-qri-account). Your new credentials will be stored for CLI use.

```
$ qri registry prove --username foo --password applesauce
```

## Sign up for a Qri account

While it’s possible to use Qri without an account, signing up ensures that your username is unique and gives you access to Qri Cloud for one-click data publishing.  Choose a good username, it will be used to reference each of your datasets on the Qri network.  

```
$ qri registry signup --username foo --email foo@qri.io --password applesauce
```

## Create your first Qri Dataset

At this point you’ve created an identity but don’t yet have any datasets in your collection

Run `qri list` to show your sad, empty dataset collection.  

```
$ qri list

foo has no datasets
```

Let’s add some data!  

To create your first dataset, start with a CSV.  If you don’t have one handy you can use this [dataset of all earthquakes in the last week](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.csv) from the U.S. Geological Survey.

First, create an empty directory on your filesystem to store the dataset's working files. Give the directory a descriptive name for the dataset.

```bash
mkdir ~/datasets/usgs_earthquakes
```

<InfoBlock>
  Qri recommends creating a <span class='inline-code'>/datasets</span> parent directory to store your datasets' working directories.
</InfoBlock>


Navigate to your empty dataset directory and run `qri init` with the `--source-body-path` flag to import your CSV and create a new dataset.  Qri will ask you to name your dataset.  The dataset name may consist only of lowercase letters, numbers, and underscores/hyphens, and must be 100 characters or fewer. See [Naming Datasets](/docs/working-with-datasets/naming) for more on Qri naming conventions.

```bash
$ cd ~/datasets/usgs_earthquakes
$ qri init --source-body-path ~/downloads/earthquakes.csv
Name of new dataset [usgs_earthquakes]: usgs_earthquakes

initialized working directory for new dataset foo/usgs_earthquakes
```

Voila! Qri has created a new dataset! It has also created a working directory, where changes you make to the dataset can be staged.  You can confirm this with `qri list`, which will show your dataset's name and working directory path.

```bash
$ qri list

1   foo/usgs_earthquakes
    linked: ~/datasets/usgs_earthquakes
```

## Make a Commit

Your new dataset exists in name only... it doesn't actually contain any any versions until you make your first commit.

Before you commit, try running `qri status` to see what will be committed.

```
$ qri status

for linked dataset [foo/usgs_earthquakes]

  add: meta (source: meta.json)
  add: structure (source: structure.json)
  add: body (source: body.csv)

run `qri save` to commit this dataset
```

Why are there three components when all you did was specify a CSV for the body?  _structure_ (including schema) is inferred by Qri when you initialize a dataset with a CSV.  _meta_ is just a placeholder component.  This is qri giving you a nudge to add metadata.  A dataset with good metadata is a happy dataset.

Next commit the changes with `qri save`.

```
$ qri save
for linked dataset [foo/usgs_earthquakes]

dataset saved: foo/usgs_earthquakes@/ipfs/QmdX8StQFjxfnWt9HVgoMNefR9zaYfvxLUSDWc3mBntXyF
```

Now the dataset has a single version in its history.  Inspect the history with `qri log`.

```bash
$ qri log      
for linked dataset [foo/usgs_earthquakes]

1   Commit:  /ipfs/QmdX8StQFjxfnWt9HVgoMNefR9zaYfvxLUSDWc3mBntXyF
    Date:    Tue Jan  7 15:57:21 UTC 2020
    Storage: remote
    Size:    0 B

    created dataset
```

You can see the timestamp and message of your commit, along with the [ipfs hash](/docs/reference/ipfs) of the version.

You can also inspect the dataset’s [components](/docs/dataset-components/overview) using the CLI.  The version of the dataset you just created contains both body and structure components.  You can write these to the console using `qri get`:

```bash
$ qri get body foo/usgs_earthquakes

time,latitude,longitude,depth,mag,mag_type,nst,gap,dmin,rms,net,id,updated,place,type,horizontal_error,depth_error,mag_error,mag_nst,status,location_source,mag_source
2020-01-07T15:34:50.790Z,20.1843338,-155.8861694,13.92,2.54,md,44,297,0.1179,0.16,hv,hv71322062,2020-01-07T15:38:15.290Z,"8km SW of Hawi, Hawaii",earthquake,0.85,0.82,0.17,8,automatic,hv,hv
2020-01-07T15:18:58.570Z,36.2748337,-89.4588318,6.4,2.39,md,22,100,0.1382,0.28,nm,nm60272917,2020-01-07T15:30:33.128Z,"2km ENE of Ridgely, Tennessee",earthquake,0.88,2.91,0.59,17,reviewed,nm,nm
2020-01-07T15:18:17.080Z,35.6698333,-117.4761667,1.68,1.15,ml,17,82,0.07134,0.24,ci,ci39026799,2020-01-07T15:21:49.663Z,"13km SSW of Searles Valley, CA",earthquake,0.46,0.78,0.1,14,automatic,ci,ci
...
```

You can also `get` the [structure component](/docs/dataset-components/structure), which tells us how Qri has guessed the column types in our original csv.  

```bash
$ qri get structure foo/usgs_earthquakes

checksum: QmamMwutqHsPyCh4g9qi1LPQyjqHwsski3Acqf7uGsxCNY
depth: 2
entries: 2341
errCount: 2340
format: csv
formatConfig:
  headerRow: true
  lazyQuotes: true
length: 437656
qri: st:0
schema:
  items:
    items:
    - title: time
      type: string
    - title: latitude
      type: number
    - title: longitude
      type: number
    - title: depth
      type: number
    - title: mag
      type: number
    - title: mag_type
      type: string
    - title: nst
      type: integer
    - title: gap
      type: integer
    - title: dmin
      type: number
    - title: rms
      type: number
    - title: net
      type: string
    - title: id
      type: string
    - title: updated
      type: string
    - title: place
      type: string
    - title: type
```

The `schema` property in structure contains a JSONSchema document showing the `title` and `type` Qri has applied to our CSV's columns.  These will come in handy later for [schema validation](/docs/tutorials/schema-validation).

## Add a Readme

At this point you’ve created a dataset and made a single commit containing [body](/docs/dataset-components/body) and [structure](/docs/dataset-components/structure) components.  Now you can add more components, starting with a [readme](/docs/dataset-components/readme).

Use a text editor to create a `readme.md` file in your dataset's working directory. Describe the dataset and help future you or your collaborators know what this dataset is all about.  You know, readme stuff.

<img src="/img/cli-readme.png"/>

After saving changes to readme.md in your working directory, qri will be aware of the changes.  Use `qri status` to see the current status of the working directory:

<InfoBlock>
  To use <span class='inline-code'>qri status</span>, either specify the dataset as an argument <strong>or</strong> run the command after navigating to the working directory
</InfoBlock>

`qri status`

```bash
$ qri status

for linked dataset [foo/usgs_earthquakes_1]

  modified: readme (source: readme.md)
```

Qri lets you know that it sees the changes to the readme in the working directory and you’re clear to commit!

## Make another Commit

This time try using `qri save` with the `--title` flag.  The title will let future you and your collaborators know what changed in this commit.
`qri save --title 'added a readme'`

```bash
$ qri save --title 'added a readme with download info'

for linked dataset [foo/usgs_earthquakes]

dataset saved: foo/usgs_earthquakes@/ipfs/QmQTA7NY1Kbk7btVsjZttQmzUM8UrixaAJfU9H5A6WCGio
```

Commit successful!  Now there are two versions of this dataset.  Use `qri log` to inspect the history of commits.

```bash
qri log
for linked dataset [foo/usgs_earthquakes]

1   Commit:  /ipfs/QmQTA7NY1Kbk7btVsjZttQmzUM8UrixaAJfU9H5A6WCGio
    Date:    Tue Jan  7 17:49:09 UTC 2020
    Storage: remote
    Size:    0 B

    'added a readme with download info'
    readme:
    	added scriptBytes

2   Commit:  /ipfs/QmbuH3uMmhBwrngnJWcuSV23Pu3s3xfhttryunZEK27QH1
    Date:    Tue Jan  7 17:45:00 UTC 2020
    Storage: remote
    Size:    0 B

    created dataset
```

You can continue making changes this way, committing new versions whenever you reach a critical point.  All of the older versions are intact in Qri, and you can inspect and export them at any time.  

## Publish to Qri Cloud

<InfoBlock type='warning'>
  Qri Cloud is currently in alpha status and is experimental.  All data on Qri Cloud is public. Be careful when publishing your datasets.
</InfoBlock>


Qri Cloud allows you to share your Qri Datasets publicly.  Use `qri publish` to push your dataset versions to the cloud.

```bash
$ qri publish foo/usgs_earthquakes

published dataset foo/usgs_earthquakes@/ipfs/QmQTA7NY1Kbk7btVsjZttQmzUM8UrixaAJfU9H5A6WCGio
```

That’s it!  Once the dataset is transferred, your dataset will have a shiny new preview page on qri.cloud, where other users will be able to find it.  

<img src="/img/cli-cloud-publish.png"/>

It will also show up on your public profile page, which lists all of your published datasets.  Other users can now add your datasets to their Qri collections!

## Next Steps

Here are some things to try now that you’re up and running:

- Find interesting datasets on [Qri Cloud](https://qri.cloud)
- Try out [Qri Desktop](/docs/getting-started/qri-desktop-quickstart)
- Drop into [our discord server](https://discordapp.com/invite/thkJHKj) to chat about Qri
