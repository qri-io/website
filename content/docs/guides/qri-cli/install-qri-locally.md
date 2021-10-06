---
metaTitle: "Installing Qri CLi"
metaDescription: "How to install qri cli in your local environment"
---

## Introduction

The Qri CLI allows you to run a local Qri node and execute [qri commands](/docs/reference/cli_commands) from the terminal.

To use qri CLI, you must:

- have the qri binary somewhere on your computer
- configure your `PATH` to execute `qri` commands against the qri binary

## Prerequisites

* A MacOS, Linux, or Windows Computer

## Directions

### Step 1: Install or Build the Qri Binary

Use one of the following methods to install the qri binary:


#### Option 1: Install from a Release

[Check out our releases on github](https://github.com/qri-io/qri/releases).  You can download a compiled binary for MacOS, Linux, or Windows.  These releases only a single binary and do not need an installer, you can copy the binary to wherever you want.

#### Option 2: Install using Homebrew (MacOS only)

On MacOS you can install using [homebrew](https://brew.sh/) by running the command:

```
brew install qri-io/qri/qri
```

When installing with homebrew you don't need to modify your PATH.

#### Option 3: Build from source

You can pull the latest source code from [https://github.com/qri-io/qri](https://github.com/qri-io/qri).  Follow [steps in the readme](https://github.com/qri-io/qri#building-from-source) to build the qri binary.

### Step 2: Configure your PATH

Your PATH is an environment variable that controls what programs are run when you type a command into a terminal. By modifying your PATH you can run commands simply by typing `qri` instead of the full filesystem location of the binary.

#### MacOS & Linux

Let's assume that you copied the qri binary into the folder `~/app/`. We'll add this folder to our PATH.

Open a terminal and type the following commands:

```
touch ~/.bash_profile
```

```
nano ~/.bash_profile
```

This will open the nano text editor. Add the following line of text:

```
PATH=$PATH:~/app
```

Quit nano by pressing Control+X.

#### Windows

Let's assume that you copied the qri binary into the folder `C:\Users\me\app`. We'll add this folder to our PATH.

Open the Windows Settings menu. Search for "Environment Variables" to open the "Environment Variables" panel. Find within the "User variables" an entry for PATH, click it then click "Edit...". Click the "New" button and add the following line:

```
C:\Users\me\app
```

### Step 3: Confirm that you can run qri commands

From your terminal, try a qri command, e.g. `qri version`:

```bash
$ qri version
version:	0.10.1-dev
build date:	2021-10-01T18:23:45Z
git summary:	v0.10.0-300-g85b077b1-dirty
git branch:	master
git commit:	85b077b1
git state:	dirty
golang version:	go1.16.5
```
Congratulations on installing Qri.  At this point you probably want to run `qri setup` to create a username and set up your local Qri data repository.

### Step 4: Setup Your Local Qri Repository

### Step 5 (optional): Connect your identity with Qri Cloud


## Additional Resources

* Once you've got Qri installed and set up, use the CLI to [create a new dataset](/docs/guides/qri-cli/create-a-dataset-from-a-csv).
