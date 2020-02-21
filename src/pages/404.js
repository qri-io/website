import React from 'react'
import { graphql, Link } from 'gatsby'

import Head from '../components/Head'

class NotFoundPage extends React.Component {
  render () {
    return (
      <div className='container not-found-page'>
        <div className='row'>
          <div className='col-12 col-md-6 lost-blob-image'/>
          <div className='col-12 col-md-6'>
            <Head data={{
              title: 'Not Found',
              description: 'You tried to load a page that doesn&apos;t exist'
            }} />
            <h1 className='title'>Lost Blob Alert!</h1>
            <p className='subtitle'>Sorry, we can&apos;t find the page you requested.</p>

            Here, try a working link instead:
            <ul>
              <li className='item'><a href='https://medium.com/qri-io/grokking-qri-4cc10f3f38d5'>Grokking Qri - An overview of key concepts</a></li>
              <li className='item'><Link to='/docs'>Qri Docs</Link></li>
              <li className='item'><Link to='/download'>Download Qri Desktop</Link></li>
              <li className='item'><a href='https://qri.cloud'>Qri Cloud - Find and share datasets</a></li>
              <li className='item'><Link to='/faq'>FAQs</Link></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
