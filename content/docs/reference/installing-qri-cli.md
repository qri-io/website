---
title: "Installing the Qri CLI"
metaTitle: "Installing the Qri CLI"
metaDescription: "Instructions for installing the Qri Command Line Interface"
weight: 6
---

The Qri CLI allows you to run [qri commands](/docs/reference/cli_commands) from the terminal.

To use qri CLI, you must:

- have the qri binary somewhere on your computer
- configure your `PATH` to execute `qri` commands against the qri binary


## Installing the Qri Binary

Use one of the following methods to install the qri binary:

### Install with Qri Desktop

Simply download and install Qri Desktop.  If you use the default install location, the command-line binary will be stored in the following location:

* MacOS: `/Applications/Qri Desktop.app/Contents/Resources/backend/qri`
* Windows: `%LOCALAPPDATA%\Programs\Qri Desktop\resources\backend\qri.exe`

### Install from a Release

[Check out our releases on github](https://github.com/qri-io/qri/releases).  You can download a compiled binary for MacOS, Linux, or Windows.  These releases only a single binary and do not need an installer, you can copy the binary to wherever you want.

### Install using Homebrew (MacOs only)

On MacOS you can install using [homebrew](https://brew.sh/) by running the command:

```
brew install qri-io/qri/qri
```

When installing with homebrew you don't need to modify your PATH.

### Build from source

You can pull the latest source code from [https://github.com/qri-io/qri](https://github.com/qri-io/qri).  Follow [steps in the readme](https://github.com/qri-io/qri#building-from-source) to build the qri binary.

## Configuring your PATH

Your PATH is an environment variable that controls what programs are run when you type a command into a terminal. By modifying your PATH you can run commands simply by typing `qri` instead of the full filesystem location of the binary.

### MacOS & Linux

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

### Windows

Let's assume that you copied the qri binary into the folder `C:\Users\me\app`. We'll add this folder to our PATH.

Open the Windows Settings menu. Search for "Environment Variables" to open the "Environment Variables" panel. Find within the "User variables" an entry for PATH, click it then click "Edit...". Click the "New" button and add the following line:

```
C:\Users\me\app
```
