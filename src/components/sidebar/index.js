import React from 'react'
import Tree from './tree'
import { StaticQuery, Link, graphql } from 'gatsby'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

// eslint-disable-next-line no-unused-vars
const ListItem = styled(({ className, active, level, ...props }) => {
  return (
    <li className={className}>
      <a href={props.to} {...props} />
    </li>
  )
})`
  list-style: none;

  a {
    color: #5C6975;
    text-decoration: none;
    font-weight: ${({ level }) => (level === 0 ? 700 : 400)};
    padding: 0.45rem 0 0.45rem ${props => 2 + (props.level || 0) * 1}rem;
    display: block;
    position: relative;

    &:hover {
      color: rgb(116, 76, 188) !important;
    }

    ${props =>
      props.active &&
      `
      color: #663399;
      border-color: rgb(230,236,241) !important;
      border-style: solid none solid solid;
      border-width: 1px 0px 1px 1px;
      background-color: #fff;
    `} // external link icon
    svg {
      float: right;
      margin-right: 1rem;
    }
  }
`

const Sidebar = styled('aside')`
  width: 100%;
  top: 0;
  padding-right: 0;
  background-color: #FFF;
  padding-top: 15px;

  @media only screen and (max-width: 1023px) {
    width: 100%;
    /* position: relative; */
    height: 100vh;
  }
  @media (min-width: 767px) and (max-width:1023px)
  {
    padding-left: 0;
  }
  @media only screen and (max-width: 767px) {
    padding-left: 0px;
    background-color: #F0F0F0;
    background: #F0F0F0;
    height: auto;
  }
`

// const Divider = styled(props => (
//   <li {...props}>
//     <hr />
//   </li>
// ))`
//   list-style: none;
//   padding: 0.5rem 0;
//
//   hr {
//     margin: 0;
//     padding: 0;
//     border: 0;
//     border-bottom: 1px solid #ede7f3;
//   }
// `

const SidebarLayout = ({ location }) => (
  <StaticQuery
    query={graphql`
      query {
        allMdx {
          edges {
            node {
              fields {
                slug
                title
                weight
              }
            }
          }
        }
      }
    `}
    render={({ allMdx }) => {
      return (
        <Sidebar>

          <ul className={'sideBarUL'}>
            <li className='hideFrontLine firstLevel item'>
              <Link to='/docs'>
                <FontAwesomeIcon icon={faHome} style={{
                  position: 'relative',
                  top: '-2px'
                }}/> &nbsp;
                DOCS HOME
              </Link>
            </li>
            <Tree
              edges={allMdx.edges}
            />
            {/* <Divider /> */}
            {/* config.sidebar.links.map((link, key) => {
              if (link.link !== '' && link.text !== '') {
                return (
                  <ListItem key={key} to={link.link}>
                    {link.text}
                    <ExternalLink size={14} />
                  </ListItem>
                );
              }
            }) */}
          </ul>
        </Sidebar>
      )
    }}
  />
)

export default SidebarLayout
