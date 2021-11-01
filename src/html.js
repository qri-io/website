import React from 'react'
import PropTypes from 'prop-types'

export default class HTML extends React.Component {
  render () {
    return (
      <html {...this.props.htmlAttributes} lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <noscript key="noscript"></noscript>
          {this.props.headComponents}
          <link rel="icon" href="favicon.svg"/>
          <link rel="apple-touch-icon" href="apple-touch-icon.png"/>
          <link rel="manifest" href="manifest.json"/>
          <meta name="theme-color" content="#ffffff"/>
        </head>
        <body className='overflow-x-hidden'{...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div
            key={'body'}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
          <script
            defer
            dangerouslySetInnerHTML={{
              __html: `
            function navBarClose() {
              document.getElementById("navbar").classList.remove("responsive");
            }
            document.addEventListener('click',function(e){
              if(e.target && e.target.tagName.toLowerCase() === 'a'){
                navBarClose();
              }
           });
            `
            }}
          />
          <script src="https://cdn.usefathom.com/script.js" data-site="WPTDNOAK" data-included-domains="new-docs--qri-website.netlify.app" defer></script>
        </body>
      </html>
    )
  }
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array
}
