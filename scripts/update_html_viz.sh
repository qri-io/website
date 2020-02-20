echo "html viz isn't in our documentation for the moment, so this script is disabled"

# # run outline, grabbing HTML viz reference documentation from source code
# # requires:
# #   go language
# #   git

# # install outline
# go get github.com/b5/outline

# # clone starlib repo
# git clone https://github.com/qri-io/qri

# # run outline against starlib docs
# outline template \
#   -t outline_html_viz_docs.md ./qri/src/github.com/qri-io/qri/base/render.go > ../content/docs/reference/html_viz.md

# # remove qri directory
# rm -rf ./qri