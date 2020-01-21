---
title: "Logbook"
metaTitle: ""
metaDescription: ""
weight: 1
---

Qri’s logbook is a service for keeping track of changes to datasets over time.  Logbook allows Qri users to exchange information about changes to datasets (tiny!) without transferring the full content of the dataset (potentially huge!).  This facilitates collaboration, as qri users can grant logbook access to other users, allowing them to stay apprised of changes to a dataset that happen elsewhere.

As you use Qri to version and move datasets, Logbook is at work behind the scenes keeping track of your Qri node’s view of the world.

When you use Qri fetch, you’re asking the network for updated logbook entries for the dataset(s) you are interested in.  After running fetch on b5/world_bank_population, you may discover that there is a downstream update to the metadata.  You will know the new version’s hash, the timestamp, and the commit message, but you won’t have that version until you explicitly add it.  
Describe the data model
Lobook lives in .qri folder and is encrypted at rest
Logbook are signed with the cryptographic keys of the qri user

Qri command to view the encrypted contents of the logbook.
