---
title: "FBuilding Qri on Windows"
description: ""
date: 2019-06-11T00:00:00-04:00
section: tutorials
---

# Building Qri on Windows

*This page was adapted from [a blog post](https://medium.com/@jbutler18/how-to-install-qri-for-windows-83b019c79320) written by friend of the project Jonathan Butler.*


**Step 1: Enable Developer Mode** 

<div class="clear"></div>

<div class="diagram large">
  <img src="/graphics/windows_gifs/Step 0.gif" />
</div>

If developer mode isn’t enabled, you may experience permission errors during building. To prevent this, enable developer mode by visiting [Microsoft's Dev Center](https://docs.microsoft.com/en-us/windows/uwp/get-started/enable-your-device-for-development).

---

**Step 2: Download Go** 

<div class="clear"></div>

<div class="diagram large">
  <img src="/graphics/windows_gifs/Step 1.gif" />
</div>

Qri requires Go the programming language and its packages to run. You can download Go from [their official website](https://golang.org/dl/).

---

**Step 3: Download MSYS2**

<div class="clear"></div>

<div class="diagram large">
  <img src="/graphics/windows_gifs/Step 2.gif" />
</div>

You can also use your own shell program. However, we recommend using MSYS2 which is officially supported for building qri. You can find the MSYS2 download link [here](https://www.msys2.org/).

---

**Step 4: Add the Environment Variables**

<div class="clear"></div>

<div class="diagram large">
  <img src="/graphics/windows_gifs/Step 3.gif" />
</div>

In this example, I type “Environment Variable” into the search bar. I add two new variables:

```
GOPATH=%USERPROFILE%\go
MSYS2_PATH_TYPE=inherit
```

and I add my go bin directory to the path:

```
PATH=%PATH%;%GOPATH%\bin
```

which is done in the settings by adding a new entry to PATH whose value is `%GOPATH%\bin`.

---

**Step 5: Download Git and Make**

<div class="clear"></div>

<div class="diagram large">
  <img src="/graphics/windows_gifs/Step 4.gif" />
</div>

To download both packages, open an msys2 shell and type

```
pacman -S git make
```

---

**Step 6: Clone Qri**

<div class="clear"></div>

<div class="diagram large">
  <img src="/graphics/windows_gifs/Step 5.gif" />
</div>

Next, you must create a folder for Qri to live in and add the packages and code to the folder. This can all be done from the shell like in the example above. Type the commands below into the shell.

```
$ cd $GOPATH
$ mkdir -p src/github.com/qri-io
$ cd src/github.com/qri-io
$ git clone https://github.com/qri-io/qri
```

---

**Step 7: Build Qri**

<div class="clear"></div>

<div class="diagram large">
  <img src="/graphics/windows_gifs/Step 6.gif" />
</div>

If you are already in the Qri folder you don’t need to change directories into it. You can distinguish which folder you are currently in by looking on the right side of the magenta MSYS (If it is ~ you are in the default folder for MSYS).

If you are not in a folder path that ends in qri, type the command below into the shell.

```
$ cd $GOPATH/src/github.com/qri-io/qri
```

Once you are in the folder you can then run the commands

```
export GO111MODULE=on
$ make build
```

Then you’re done! A new binary (exe file) should appear in your $GOPATH/bin. You can verify the successful installation by typing the command below into the shell.

```
$ qri help
```
