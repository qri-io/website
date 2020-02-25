# This script replaces ../content/docs/reference/starlib.md
# updating the starlib documentation page by running "outline template" against 
# the starlib repo, using a special template that conforms to gatsby .md docs
#
# requires:
#    go language
#    git

# install outline
echo "installing outline..."
go get github.com/b5/outline

# clone starlib repo
echo "cloning starlib..."
git clone https://github.com/qri-io/starlib

# run outline against starlib docs
echo "replacing ../content/docs/starlark/starlib.md ..."
outline template \
  -t outline_starlib_docs_template.md $(find ./starlib | grep doc.go | tr '\n' ' ') \
  > ../content/docs/starlark/starlib.md

# remove starlib directory
echo "cleaning up..."
rm -rf ./starlib