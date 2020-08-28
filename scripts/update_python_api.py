#!/usr/bin/env python3
"""
Replaces `content/docs/api/python.md` with pydoc docs for qri-python using template `python_api_docs_template.md`

TODO() maybe not just `python.md` may be multiple pages

requires:
   git
   TODO() [some pydoc generator dependency]
"""

import subprocess

sub = subprocess.call


def clonerepo(url):
    "shallow-clone a git repo"
    sub(("git", "clone", "--depth", "1", url))


def generatedocs():
    "generate docs from docstrings in a module"
    # TODO() generate docs to dict for one page
    # or loop to multiple pages.

    outfile = open("../content/docs/api/python.md", "w")

    templatedict = {"hello": "XXX template variable XXX"}
    template = open("python_api_docs_template.md").read()

    outfile.write(template.format(**templatedict))


clonerepo("https://github.com/qri-io/qri-python")

generatedocs()

# remove `qri-python` directory
print("cleaning up...")
sub(("rm", "-rf", "./qri-python"))
