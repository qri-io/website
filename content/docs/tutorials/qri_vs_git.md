---
title: "Qri for Git people"
description: "How Qri compares to Git"
date: 2018-01-30T00:00:00-04:00
section: tutorials
draft: true
---

# Comparing Workflows: Qri, Git, and GitHub


By building off a git metaphor, it's easier for someone familiar with Git to understand how Qri is different. Much of this isn't new, but what should be ratified in this RFC is the _quality of the explanation_. By reading this someone familiar with git should be able to understand the process Qri undertakes to create a dataset. Hopefully this explanation can be copy-pasted into our docs if this RFC is accepted.

### Comparing Commits: Qri, GitHub, Git
Qri builds on ideas popularized in both git and GitHub.

| Qri        | GitHub       | git        |
| ---------- | ------------ | ---------- |
| profile    | profile      | user       |
| repository | repositories |            |
| dataset    | repository   | repository |
|            | branch       | branch     |
| commit     | commit       | commit     |

Qri intentionally has no functionality akin to git branches. Qri is built in a post-GitHub era where the notion of a _profile_ has become an intrensic part of the git experience. Feel free to mentally replace "GitHub" with "GitLab" or "GitService" if you like, but GitHub _did_ popularize these concepts.

With Qri we're making a concerted effort to reduce the complexity associated with version control, getting it into a form that's palettable to an audience that doesn't consider themselves "technical". This is why we use `save` instead of `commit` (if you're all about git, don't worry, `commit` is aliased to `save` on the command line).

> _Note: There is currently no way to merge a dataset that's been forked. This is bad. We're working on it. Our current thinking is it'll work as closely as possible as git branch merging: `qri merge peer/dataset me/dataset` should have the effect of stitching together the two specified histories into a single entity at `me/dataset`. Unlike git all datasets share a data model, so this should work even with completely different histories._

### Comparing Qri Save to Git Commit

| Qri                           | git                             |
| ----------------------------- | ------------------------------- |
| `cd project`                  | `cd project`                    |
| `qri save --file=dataset.yml` | `git add -A`                    |
|                               | `git commit -m "changed stuff"` |
| `qri publish`                 | `git push origin master`        |

#### Both Qri and git use the local filesystem & `pwd`
Before we get started, it's worth noting that both git and qri use the present-working-directory (`pwd`) to dereference filepaths. Git stores commits in a `.git` directory, one for each repo. Qri instead stores commits in a "content-addressed file system", which is stored in one place on your hard drive. Instead of one `.git` directory in each repository, there is one `.qri` directory for your entire file system,

_It is possible to have multiple installations of Qri on your machine at once by manipulating the `$QRI_PATH` value. At time of writing (Oct. 2018), we haven't documented this properly._

#### Git Commit Stores a snapshot, Qri Save Computes a snapshot
while `qri save` and `git commit` are conceptually comparable, they're fairly different animals under the hood.

Git is a _generic_ version control system. It's possible to version any binary data with git, with varying (incredible) degrees of success. The assumptions git makes about the information being versioned are very light (for example, git assumes many differences will occur across newline breaks).

Git carries the assumption that the data provided to it is the _source of truth_. Git's job is to version things, the user's job is to tell git _what to version_.

Like git, Qri's jobs is to version things. However, Qri is _not_ a generic version control system. Instead Qri only makes versions of a predefined dataset model. This association narrows the number of use cases in which Qri will function, but  delivers the benefit of making Qri _semantically versioned_. Because Qri is programmed to understand the intent & uses of various components of the dataset model, Qri can compute many important values on the user's behalf. This "acting on a user's behalf" comes from a long line of data management practices. When managing data there is often too much information for the user to feasibly review each row

Through the use of transform scripts, the user has tools to extend & control how a dataset is computed. Qri knows to run the transform in the first place because datasets have exactly one designated place for putting a transform script.

#### Qri has no staging area
While it is true that "qri save" is doing one less step than the git variant, git users will quickly point out that `git commit -am "changed stuff"` consolidates `git add` and `git commit` into a single step, so it's not much of a time-saver from a keystrokes perpective. Instead I've broken `git add` and `git commit` into two commands to show that Qri has no concept of a staging area.

Instead of a staging area, Qri uses the concept of a _dry run_ to see what would happen without actually committing anything. 

#### Qri registries are like git remotes
With Qri it's possible to just run `qri save` and follow that with `qri connect`, and now others will be able to see and consume your dataset.