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
        <Header {...props}>
          <>
            {docsHeaderLinks.map((headerLink, i) => (
              <HeaderLink key={i} data={headerLink} />
            ))}
            <li className='ml-10 flex items-center'>
              <Link colorClassName={'text-black'} onClick={props.onSearchClick}><Icon icon='search' size='sm'/></Link>
            </li>
          </>
        </Header>
      )
    }}
  />
)

export default DocsHeader
