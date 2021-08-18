import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Header from './Header'
import Link from './Link'
import Icon from './Icon'
import HeaderLink from './HeaderLink'

const DocsHeader = (props) => (
  <StaticQuery
    query={
      graphql`
          query docsHeaderQuery {
            site {
              siteMetadata {
                docsHeaderLinks {
                  link
                  text
                  colorClass
                }
              }
            }
          }
        `}
    render={(data) => {
      const {
        site: {
          siteMetadata: {
            docsHeaderLinks
          }
        }
      } = data
      return (
        <Header headerLinks={docsHeaderLinks} {...props}/>
      )
    }}
  />
)

export default DocsHeader
