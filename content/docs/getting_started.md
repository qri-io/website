---
title: "getting started"
date: 2018-01-30T00:00:00-04:00
---

To install qri on your machine, follow our installation instructions on github

<pre>
<code class="shell">
$ cd ~/my_datasets

# before we can use qri, it needs to be set up. 
# qri setup will create qri and IPFS repositories 
# on your hard drive if they don't exist. 
$ qri setup --username=b5

# this will save your profile info to a JSON file
# which will be rather empty, fill out that file
# with any info you'd like and hit save...
$ qri profile get -f profile.json
file saved to: profile.json

# with any info you'd like and hit save...
# qri profile set -f profile.json

{
  "color": "",
  "description": "Some nerd from Canada",
  "email": "sparkle_pony_2000@qri.io",
  "homeUrl": "http://brendan.nyc",
  "name": "b5",
  "peername": "turquoise_green_chow_chow",
  "twitter": "@b_fiive"
}

# let's add some data:
# grab a csv file from here:
$ qri add --data data.csv me/dataset_name

$ 

$ qri export rico/comics
data exported to /Users/b5/my_datasets/rico/comics.json

$ qri keep rico/comics
downloading rico/comics... done.
rico/comics downloaded and saved to your local qri repository

... some time passes ...

$ qri status
rico/comics has updates available

$ qri update rico/comics
rico/comics is now at QMfooMrns...

$ qri follow rico/comics
grabbing additional data... done.
rico/comics downloaded and saved to your local qri repository
qri will automatically update rico/comics as changes become available

$ qri export rico/comics@QmFooo...

$ qri remove rico/comics
this dataset is kept, are you sure you want to remove it [y/n]? y

$ qri unkeep rico/comics

$ qri remove --force rico/comics

$ qri pin rico/comics
rico/comics downloaded and saved to local datasets

$ qri add --name dataset -f data.json
b5/dataset added to your local qri repository and published on the distrubted web. To remove this data run:
    qri remove dataset

$ qri add --private b5/dataset -f private_data.json

$ qri publish b5/dataset
</code>
</pre>