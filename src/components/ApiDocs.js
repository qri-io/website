import React from 'react'
import { RedocStandalone } from 'redoc'

const specUrl = 'https://raw.githubusercontent.com/qri-io/qri/master/api/open_api_3.yaml'

const ApiDocs = () => (
  <div className='h-full w-full overflow-y-scroll'>
    <RedocStandalone
      specUrl={specUrl}
      options={{
        theme: {
          typography: {
            fontFamily: 'Poppins, sans-serif',
            headings: {
              fontFamily: 'Poppins, sans-serif'
            }
          }
        }
      }}
    />
  </div>
)

export default ApiDocs
