---
metaTitle: "What is Qri?"
metaDescription: "Qri is a distributed version control and sharing platform for datasets"
---

import InfoBlock from '../../../../src/components/InfoBlock.js'

Qri (pronounced "query") is a distributed platform for managing datasets.  We build tools that provide a more structured way to define, store, and move datasets, introducing *a flexible but consistent format*, *version control*, *user identity*, *painless automation*, *security*, and *portability*.  Qri is, all at the same time, a data format, a version control system, a distributed network, and an accessible cloud data repository.  Read on to learn how we’ve re-imaged what datasets can do.


## The Fragility of "The System"

Whether it’s meticulous filenames in a folder on a laptop, or a data warehouse with complex access controls in an enterprise organization, we go to great lengths to try to keep our data organized.  Everyone has their own “system” and part of joining a new team is learning their system so order can be maintained.  Name it like this.  Add a readme.txt.  Add a data dictionary file.  Log your changes in this spreadsheet.  So it goes, we come up with creative ways to share access to the data, who made changes and when, what the data contains, how to use it, etc  We’ve got data portals, data warehouses, data lakes, data APIs, all trying to take raw data and add structure and context in the name of trust and usability.

The raw data, usually encoded as standardized file formats, is what makes these systems interoperable.  Just get me a CSV, I can open and analyze it in pandas.  Get me a JSON endpoint and I can consume it from my web app.  However these formats tend to leave behind all of that added value of “the system”.  The metadata aren’t standardized or machine-readable, the code that created or moved the data isn’t available, the knowledge about the provenance of the data is lost, etc.  Re-assembling all of that lost value might be possible, but it will require additional work, relationship-building, and time.

## A Firm, but Flexible Format (Qri the Format)

Qri developed a new dataset format that has all of the accoutrements that should accompany raw data built right in. To keep things organized, we define a dataset as a set of extensible components.  For the data itself, we have the “body”.  For metadata, we chose to use JSON as a key/value store in a component called “meta”.  For validation rules, column types, and other critical information about what’s in the data, we made a component called “structure”.  Since most datasets are just code-based rearrangements of other data, we made a component called “transform” to store the code that created the dataset.  For good measure we added a component called “readme” where you can write a sentence or a novel about what a dataset is, how to use it, and where to contact the humans who work on it.

## More than Just Organized Files (Qri the Version Control System)

So you’ve gotten the concept of components.  A qri dataset is just a set of files with opinions about name and format?  Not quite, as this would still be prone to the same issues that plague file-based data.  Imagine a directory of files named my_dataset, one for each component described above… a dataset.  What happens when I open the body, delete half of the rows, and save it again?   I know what happened, but to the next person who comes along, there’s no record of that change and they might think they have the whole dataset.

Nope, files and filesystems just aren’t going to cut it.  We need both a good format to organize the information, and some way to track the changes… we need a version control system!  

Just like you can run an instance of a database on your machine, you can run a Qri Node and start creating and managing Qri Datasets!  Just like with git, making a change to a dataset is a bit more involved than saving a file.  Just like with git, you must commit your changes and leave a message for future you and others about what the change means.  Just like with git, every change, no matter how large or small, is a new version of the dataset, and the previous versions remain available for you or others to inspect (or roll back to, or whatever).  

Most importantly, each change to a dataset is cryptographically signed and immutable.  You don’t have to blindly trust that version 2 was made by user chriswhong at 9pm on August 3rd, all of that information is included with the commit and cannot be modified.   It is *trustworthy*.

Qri keeps track of all of the datasets in your node, allows you to list your datasets, log the version history, get individual components for use in external tools, and commit changes.

## Data Portability Without Files (Qri the Distributed Network)

Now we’ve got a well-defined format and version control, but no files… how do we share one of these awesome Qri Datasets with a friend?  Won’t exporting it to a file make it lose all of the value of putting in Qri to begin with?  Yes, it would, so we designed Qri with distributed networking built-in.  This means your Qri node can talk to your friend’s Qri node, moving datasets without any need to extract or load data into files.  [read more about IPFS, content addressing, etc]

With Qri, you can skip the intense pain of exporting/uploading/downloading/importing that typically comes with moving datasets from point A to point B.  You can move a Qri dataset across the room or around the world, effortlessly, and be 100% confident that it is exactly the same dataset (a clone, if you will) when it arrives on the other end.  

When you run qri locally, you run a *node* that can push and pull datasets from other nodes.  [How to push/pull datasets with Qri].  Under the hood, your data is stored and moved on the Interplanetary File System (IPFS).

### Qri Cloud - A Big Qri Node in the Sky

qri.cloud is our cloud service, giving you a stable and accessible place to store and share your qri datasets.  We can also take care of running your data transformations on a schedule and letting you know when things have changed. 
