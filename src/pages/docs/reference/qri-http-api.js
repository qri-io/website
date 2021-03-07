import React from 'react'
import { RedocStandalone } from 'redoc'

const specUrl = 'https://raw.githubusercontent.com/qri-io/qri/master/api/open_api_3.yaml'

const ApiDocs = () => (
  <div className='redoc-container'>
    <RedocStandalone
      specUrl={specUrl}
      options={{
        nativeScrollbars: true,
        theme: { colors: { primary: { main: 'rgb(59, 69, 78)' } } }
      }}
    />
  </div>
)

export default ApiDocs
