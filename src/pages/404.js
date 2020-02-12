import React from 'react'
import { graphql } from 'gatsby'

import Head from '../components/Head'

class NotFoundPage extends React.Component {
  render () {
    return (
      <>
        <Head data={{
          title: 'Not Found',
          description: 'You tried to load a page that doesn&apos;t exist'
        }} />
        <h1>Not Found</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </>
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
