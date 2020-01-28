
import React from 'react'
import Helmet from 'react-helmet'

class ApplyPage extends React.Component {
  render () {
    return (
      <>
        <Helmet>
          <script src="https://static.airtable.com/js/embed/embed_snippet_v1.js" />
        </Helmet>
        <iframe className="airtable-embed airtable-dynamic-height" src="https://airtable.com/embed/shr8HHEiqcNWpqlIy?backgroundColor=green" frameBorder="0" width="100%" height="1149" style={{
          background: 'transparent',
          border: '1px solid #ccc'
        }}></iframe>
      </>
    )
  }
}

export default ApplyPage
