---
metaTitle: "Qri System Files"
metaDescription: "Special files and directories used by Qri"
weight: 1
---

By default, Qri stores data in two hidden directories in your user's home directory.  These directories are created the first time a user runs Qri Desktop, or when a CLI user runs `qri setup`.

## .qri

`.qri` contains vital configuration data and state for your local qri instance.

## .ipfs

Qri relies on the Interplantary File System (IPFS) as its backing store.  The directory `.ipfs` will be created to store your Qri datasets.  If you already have IPFS installed on your computer, Qri will use the existing `.ipfs` directory to store your datasets.
