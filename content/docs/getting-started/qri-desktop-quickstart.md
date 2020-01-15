---
title: "Qri Desktop Quickstart"
metaTitle: "Qri Desktop Quickstart"
metaDescription: "Getting started with Qri Desktop, a distributed dataset version control and sharing system"
weight: 2
---

Follow these steps to get started using Qri Desktop, our graphical interface for versioning and sharing datasets.  To see the same workflow in CLI, see [Qri CLI Quickstart](/docs/getting-started/qri-cli-quickstart)

## Download and Sign up

First, [download Qri Desktop](/download) for Mac or Windows.  Complete the installer and run Qri. You will be greeted with a sign-up screen.  

Choose a good username, it will be used to reference each of your datasets on the Qri network.  Provide an email and password, and you’re ready to start managing datasets in Qri!

## Create your first Qri Dataset

To create your first dataset, start with a CSV.  If you don’t have one handy you can use this [dataset of all earthquakes in the last week](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.csv) from the U.S. Geological Survey.  Drag and drop the CSV into Qri Desktop to kick off the import.  

Voila! Qri has created a new dataset!  The new dataset is named based on your username and the filename of the CSV you dragged in.   

You’re now looking at Qri Desktop’s *Dataset* Pane, where you can explore versions of this dataset.  When Qri created this dataset from your file, it created a [version of the dataset](/docs/working-with-datasets/versioning) for you.  

You can see the commit message that was automatically added when the dataset was created, along with indications that the body and structure components [link to body and structure anchors in components docs] were added in this first commit.

A few more things you can do before moving on:

- Rename the dataset by clicking the name and typing a new one.  (Names must be unique among your collection of datasets)
- Click on a column header in the body view to see column stats and type information.  Qri has guessed the column data types (string, number, boolean, etc) in your original CSV.


- [Fill out the Metadata](/docs/tutorials/completing-metadata) or [create a Readme](/docs/tutorials/create-a-readme)

You’ve been viewing the automatically-generated first commit, but now you’re ready to modify your new dataset.  Before you can add more components such as Meta or Readme, you must checkout the dataset, creating a working directory on your computer where working changes will be stored.

Click __Checkout Dataset__ in Qri Desktop’s header, and tell Qri where to create the working directory.

Once the dataset is checked out, you will now have access to the “status” tab, which allows you to view and edit components.  Let’s add some metadata.  Select the status tab, then choose ‘Meta’, you’ll see a form with fields like title, description, and keywords.

Add a clear one-line title.  Add a few sentences to describe the dataset in description.  Add some topic keywords.  All of these will help you find this dataset later when your collection grows, and will also help collaborators find your dataset in search results.  You can continue populating as much metadata as you like.  Don’t worry, you can always come back later to add more.

Just like we did with the Meta component, you can use the Readme component to write free-form text that may help future you remember why you needed this dataset, or to let other users know what to keep in mind when they first open it.  Qri Readmes support markdown, so  you can add rich text, lists, images, and more!

As you make changes, Qri Desktop will let you know that your working directory has content that differs from the last version of the dataset.  Meta now shows up with a green dot next to it since it was added since the last version.  

Your working directory has changes, so you’re ready to commit!

## Make a Commit

Committing creates a new version of your dataset.  Click “Commit” at the bottom of the Status tab to show the commit form.  

There are two fields on the commit pane: title, and message. Title is intended to be a short description of the changes being committed.  Message is where you can go into greater detail on the changes with multiple lines of text.  Most of the time only a title is sufficient, but the message section is always there if you need it.

Fill out a title and click “Save”.  Congrats, you’ve just created a new version!  Check the history tab and you’ll now see two commits, one created when you first imported the dataset, and the one you just completed.  You can continue making changes this way, committing new versions whenever you reach a critical point.  All of the older versions are intact in Qri, and you can inspect and export them at any time.  

## Publish to Qri Cloud

[! Qri Cloud is currently in alpha status, and is experimental.  All data on Qri Cloud is public.]

Qri Cloud allows you to share your Qri Datasets publicly.  Click the “Publish to Cloud” button on any commit to push it to Qri cloud.

That’s it!  Once the dataset is transferred, your dataset will have a shiny new preview page on qri.cloud, where other users will be able to find it.  It will also show up on your profile page, which lists all of your published datasets.  Other users can now add your datasets to their Qri collection!


## Next Steps

Here are some things to try now that you’re up and running:

- Browse the full [Qri Desktop Manual](/docs/qri-desktop-manual/overview)
- Find other users’ datasets on [Qri Cloud](https://qri.io/cloud)
- Try out the [Qri CLI](/docs/qri-cli-manual/overview)
- Drop into [our discord server](https://discordapp.com/invite/thkJHKj) to chat about Qri
