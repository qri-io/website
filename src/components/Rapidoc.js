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
        allow-server-selection = 'true'
        show-header="false"
        render-style="view"
        allow-try="false"
        allow-authentication ="false"
      > </rapi-doc>

      <hr/>
    </div>
  )
}

export default Rapidoc
