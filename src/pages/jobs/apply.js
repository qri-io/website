
import React from 'react'

import Head from '../../components/Head'

class ApplyPage extends React.Component {
  render () {
    return (
      <>
        <Head data={{
          title: 'Apply to Jobs at Qri',
          description: 'Use this form to apply to open positions at Qri, Inc.'
        }} >
          <script src="https://static.airtable.com/js/embed/embed_snippet_v1.js" />
        </Head>
        <iframe className="airtable-embed airtable-dynamic-height" src="https://airtable.com/embed/shr8HHEiqcNWpqlIy?backgroundColor=green" frameBorder="0" width="100%" height="1149" style={{
          background: 'transparent',
          border: '1px solid #ccc'
        }}></iframe>
      </>
    )
  }
}

export default ApplyPage
