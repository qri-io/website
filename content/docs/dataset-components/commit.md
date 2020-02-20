---
metaTitle: "Commit"
metaDescription: "The Commit component contains details about the creation of a new version of a Qri dataset. "
weight: 6
---

import InfoBlock from '../../../src/components/InfoBlock.js'

<img src="/img/components_commit.png" />

## Overview

The __commit__ component contains details about the creation of a new version of a Qri dataset.  It includes a `title` (short-form description) and `message` (long-form description) of the changes, usually provided by the user.  It also contains the timestamp, author identifier, and a cryptographic signature linking the author to the commit.

Commit is directly analogous to the concept of a Commit Message in the git version control system. A full commit defines the administrative metadata of a dataset version, answering _"who made this version of the dataset, when, and why"_.

## Commits in Qri Desktop

In Qri Desktop, an initial commit is automatically created when importing a CSV file.  After making changes to a dataset's components, the commit button will become enabled, inviting you to commit your changes to a new version of the dataset.

Likewise, when reviewing the version history of any dataset, each version will have a commit tab.  This tab which presents the timestamp, author identity, title, and message for that version.

## Commits in Qri CLI

You can use `qri get` to inspect a dataset's commit.

```
$ qri get commit foo/my_nifty_dataset

author:
  id: QmcASWzDc4mGG4q8kfiZ4A9KTQGyYxKvMaVh4dWZn9oFwT
message: "structure:\n\tupdated checksum\n\tupdated length\nreadme added"
path: /ipfs/QmfNaxHow23dwPztewiVZgUasCUVkGSj89hJqWHTXSPLoS
qri: cm:0
signature: cP74UTAmBz+Jj8wrmwqWaikk0sVFT93oARCVRGsnU0OBIqrifgoV5mj9OnvsrzmdhSwpB/OPePPye8fG2iTRhneI/qvW9gwGrbHPvKgAjXctRAlxauGS+Iab/w38b1bKZhxf9SR01z0A+eHWdXmK0FokPNUseCO6CzK5kdXUDbAn2mkqtahZFpcwFAF4a+wBpCa9b8/teSNL3Rwc5EQ9352mfZP9jVZ8uM32QY4fbXMTaXYJOWRkR40kHCAD7+YHI9ACeF1ow3yCOrPVMNJBNpd7pLA5eg6Qc+y8hCKoNmKxx1vnzGMyUTlPF8bsyaqAun5aiqleTCPnMUtdPoIoHg==
timestamp: "2020-01-09T16:55:20.807614Z"
title: add readme
```

In Qri CLI, commits are created with the command `qri save`.  Most of the commit information is applied automatically (your identity, the timestamp, the dataset you're saving, etc) but you can specify the `title` and/or `message`.

<InfoBlock>
  If you do not provide a commit `title`, Qri will auto-generate one based on the components being modified.
</InfoBlock>

```
$ qri save --file meta.json foo/my_nifty_dataset --title 'updated meta'

dataset saved: foo/my_nifty_dataset@/ipfs/QmezwED3Q3cPpbVGF4E283vUq7MRBoT6ZE7b5WLmquyWz7
```


<InfoBlock>
  See <a href="/docs/reference/dataset-specification/">Dataset Specification</a> for detailed documentation of Qri dataset components.
</InfoBlock>
