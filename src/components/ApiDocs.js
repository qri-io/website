import React from 'react'
import { RedocStandalone } from 'redoc'

const specUrl = 'https://raw.githubusercontent.com/qri-io/qri/master/api/open_api_3.yaml'

const ApiDocs = () => (
  <div className='w-full overflow-y-scroll' style={{
    height: 'calc(100vh - 75px)'
  }}>
    <RedocStandalone
      specUrl={specUrl}
      options={{
        theme: {
          colors: {
            primary: {
              main: '#21A0A0'
            },
            text: {
              primary: '#6e787e'
            }
          },
          typography: {
            fontFamily: 'Poppins, sans-serif',
            headings: {
              fontFamily: 'Poppins, sans-serif',
              fontWeight: '600'
            }
          }
        }
      }}
    />
  </div>
)

export default ApiDocs
