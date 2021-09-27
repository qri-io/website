---
metaTitle: "Qri Desktop Quickstart"
metaDescription: "YO Getting parted with Qri Desktop, a distributed dataset version control and sharing system"
---
import ImageWithCaption from '../../../../src/components/ImageWithCaption.js'
import InfoBlock from '../../../../src/components/InfoBlock.js'

Follow these steps to get started using Qri Desktop, our graphical interface for versioning and sharing datasets.  To see the same workflow in CLI, see [Qri CLI Quickstart](/docs/getting-started/qri-cli-quickstart)

## HI MY NAME

First, [download Qri Desktop](/download) for Mac or Windows.  Complete the installer and run Qri.

<ImageWithCaption src='/img/screenshots/tos.png' caption='You will be greeted with a Terms of Service screen.' shadow/>

Clicking ‘accept’ will bring you to the sign up page.

<ImageWithCaption src='/img/screenshots/signup.png' caption='Choose a good username, it will be used to reference each of your datasets on the Qri network.' shadow/>

Provide an email and password, and you’re ready to start managing datasets in Qri!

## Create your first Qri Dataset

After creating a your username, you will be sent to the *Collections* Pane. This is where you can explore the datasets that you have locally. Right now, there should be no datasets:

<ImageWithCaption src='/img/screenshots/no-datasets-collection.png' shadow/>

To create your first dataset, start with a CSV.  If you don’t have one handy you can use this [dataset of all earthquakes in the last week](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.csv) from the U.S. Geological Survey. Make sure you are on the *Collections* Pane and drag and drop the CSV into Qri Desktop to kick off the import (you can also click the ‘Create a Dataset’ link to open a modal where you may specify the csv file location).

The new dataset is named based on your username and the filename of the CSV you dragged in.   

<ImageWithCaption src='/img/screenshots/csv-workbench-history.png' caption='Voila! Qri has created a new dataset!' shadow/>

You’re now looking at Qri Desktop’s *Dataset* Pane, where you can explore versions of this dataset.  When Qri created this dataset from your file, it created a [version of the dataset](/docs/working-with-datasets/versioning) for you.  

You can see the commit message that was automatically added when the dataset was created, along with indications that the [body](/docs/dataset-components/body) and [structure](/docs/dataset-components/structure) components were added in this first commit.

Before moving on, let’s explore the dataset *body* a bit. Click on a column header in the body view to see column stats and type information.  Qri has guessed the column data types (string, number, boolean, etc) in your original CSV. This can give you a quick overview of what exists in the column without having to inspect each row.


## Edit your Qri Dataset inside the app

You’ve been viewing the automatically-generated first commit, but now you’re ready to modify your new dataset.  Before you can add more components such as Meta or Readme, you must checkout the dataset, creating a working directory on your computer where working changes will be stored.

Click __Checkout Dataset__ in Qri Desktop’s header, and tell Qri where to create the working folder (‘save path’).

<ImageWithCaption src='/img/screenshots/checkout-modal.png' shadow/>

Once the dataset is checked out, you will now have access to the “status” tab, which allows you to view and edit components.  Let’s add some metadata.  Select the status tab, then choose ‘Meta’, you’ll see a form with fields like title, description, and keywords.

Add a clear one-line title.  Add a few sentences to describe the dataset in description.  Add some topic keywords.  All of these will help you find this dataset later when your collection grows, and will also help collaborators find your dataset in search results.  You can continue populating as much metadata as you like.  Don’t worry, you can always come back later to add more.

<ImageWithCaption src='/img/screenshots/csv-workbench-meta-edit.png' caption='Here we are adding a title and description to our dataset' shadow/>

Just like we did with the Meta component, you can use the Readme component to write free-form text that may help future you remember why you needed this dataset, or to let other users know what to keep in mind when they first open it.  Qri Readmes support markdown, so  you can add rich text, lists, images, and more!

As you make changes, Qri Desktop will let you know that your working directory has content that differs from the last version of the dataset.  Meta now shows up with a green dot next to it since it was added since the last version.  

Your working directory has changes, so you’re ready to commit!

## Make a Commit

Committing creates a new version of your dataset.  Click “Commit” at the bottom of the Status tab to show the commit form.  

<ImageWithCaption src='/img/screenshots/csv-workbench-meta-edit-commit.png' caption='Add a title and message so others know what changes you made.' shadow/>

There are two fields on the commit pane: title, and message. Title is intended to be a short description of the changes being committed.  Message is where you can go into greater detail on the changes with multiple lines of text.  Most of the time only a title is sufficient, but the message section is always there if you need it.

Fill out a title and click “Save”.  Congrats, you’ve just created a new version!  Check the history tab and you’ll now see two commits, one created when you first imported the dataset, and the one you just completed.  You can continue making changes this way, committing new versions whenever you reach a critical point.  All of the older versions are intact in Qri, and you can inspect and export them at any time.

<ImageWithCaption src='/img/screenshots/csv-workbench-view-commit.png' caption='In this dataset, we also made a commit where we edited the body of the dataset before we edited the metadata.' shadow/>

## Rename your dataset
Renaming your dataset is simple! Just click on the dataset name Qri has generated for you and you can input the dataset name you prefer. Names must be lowercase, can only contain numbers, letters, and underscores. They also must start with a letter. If your names does not follow these rules, don't worry, the desktop will let you know by highlighting the name in red.

<ImageWithCaption src='/img/screenshots/csv-workbench-rename.png' shadow/>

## Search for other datasets on the Qri network

Click on the ‘Network’ icon (the globe in the top left of the screen) to checkout other datasets that are on the Qri network without having to leave the app. These datasets can also be found if you head over to to the [Qri Cloud](https://qri.cloud) website.

You can also use the search bar at the top of each page to search on the network or among your local datasets. Type into the search bar and hit ‘Enter’, or just hit ‘Enter’ after you have clicked the search bar in order to open the search modal.

<ImageWithCaption src='/img/screenshots/search.png' shadow caption='Here we are searching for datasets that have to do with ‘synths’ on the Qri network'/>

Clicking this dataset will allow us to view a *Dataset Preview* on the Network Pane. This lets you explore a dataset before deciding whether or not it is useful for your purposes. If you decide you want to explore the entire dataset, just click the ‘Clone Dataset’ button, and Qri will add this dataset from the network to your computer. There, you will have access to the entire body of the dataset.

<ImageWithCaption src='/img/screenshots/network-preview.png' shadow caption='Qri allows you to explore a dataset from the network.'/>

Let’s look at search again. You can also use the search modal to search through your own collection of datasets.  You can toggle between searching the network and searching locally by clicking the ‘Local Only’ switch at the top right of the search modal:

<ImageWithCaption src='/img/screenshots/local-search.png' shadow caption='We clicked the ‘Local Only’ switch and are searching for our local dataset about ‘earthquakes’'/>

## Push to the Qri Network & Qri Cloud

<InfoBlock type='warning'>
  All data on Qri Cloud is public. Keep that in mind when pushing your datasets. Contact hello@qri.io to learn how Qri plans to support private, encrypted data repositories.
</InfoBlock>

Pushing your dataset to the Qri Network allows anyone on Qri to add and explore your dataset. But that’s not all, the [Qri Cloud](https://qri.cloud) website allows anyone to view your dataset in their browser.  Click the “Push” button on any commit to push it to Qri cloud.

<ImageWithCaption src='/img/screenshots/publish.png' shadow caption='From the collection page, or from the search modal, click on the dataset you want to push. You will be sent to the Workbench Page. Clicking ‘Push’ makes the dataset available to the network and creates a dataset preview page on Qri Cloud'/>

That’s it!  Once the dataset is transferred, your dataset will have a shiny new preview page on qri.cloud as well as sending the dataset to the Qri network, where other users will be able to find it.  It will also show up on your profile page, which lists all of your public datasets.  Other users can now add your datasets to their Qri collection!

<ImageWithCaption src='/img/screenshots/network-with-published-dataset.png' shadow caption='The Network Pane has a feed of recently pushed datasets. Once you have pushed your dataset, you can view it on the network. This screenshot was taken using a test network, which is why it is so sparsely populated :)'/>


## Next Steps

Here are some things to try now that you’re up and running:

<!-- - Browse the full [Qri Desktop Manual](/docs/qri-desktop-manual/overview) -->
- Find other users’ datasets on [Qri Cloud](https://qri.cloud)
<!-- - Try out the [Qri CLI](/docs/qri-cli-manual/overview) -->
- Drop into [our discord server](https://discordapp.com/invite/thkJHKj) to chat about Qri
