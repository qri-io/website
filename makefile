

# run outline template against GOPATH starlib with a special template for documentation
# requires:
#    * outline:  github.com/b5/outline
#    * starlib:  github.com/qri-io/starlib
#    * hugo:     github.com/gohugoio/hugo
starlib_docs:
	outline template -t outline_starlib_docs_template.md $(find ${GOPATH}/src/github.com/qri-io/starlib | grep doc.go | tr '\n' ' ') > ./content/docs/reference/starlib_new.md && hugo server