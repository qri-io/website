import React from 'react'
import Helmet from 'react-helmet'

const Rapidoc = () => {
  return (
    <div className='container docs-page'>
      <Helmet>
        <script type="module" src="https://unpkg.com/rapidoc/dist/rapidoc-min.js"></script>
        <style type="text/css">{`
        .main-content-inner--view-mode{
            outline: 10px solid red;
        }
        rapi-doc{
            width: 100%;
            padding: 0em;
            margin: 0em;
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
