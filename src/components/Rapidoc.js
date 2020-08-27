import React from 'react'
import Helmet from 'react-helmet'

const Rapidoc = () => {
  return (
    <div className='container docs-page'>
      <Helmet>
        <script type="module" src="/js/rapidoc-min.js"></script>
        <style type="text/css">{`
        .docs-page{
            padding: 0;
            margin: 4em 0 0 0;
        }

    `}</style>
      </Helmet>
      <rapi-doc
        spec-url="/open_api_3.yaml"
        allow-server-selection = "true"
        show-header="false"
        render-style="view"
        allow-try="false"
        allow-authentication ="false"
        regular-font = 'apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif'
        mono-font = 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
      > </rapi-doc>

      <hr/>
    </div>
  )
}

export default Rapidoc
