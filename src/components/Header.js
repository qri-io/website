import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import config from '../../config.js'

import Loadable from 'react-loadable'
import LoadingProvider from './mdxComponents/loading'

import Sidebar from './sidebar'

const isSearchEnabled = !!(config.header.search && config.header.search.enabled)

const searchIndices = []
if (isSearchEnabled && config.header.search.indexName) {
  searchIndices.push(
    { name: `${config.header.search.indexName}`, title: 'Results', hitComp: 'PageHit' }
  )
}

const LoadableComponent = Loadable({
  loader: () => import('./search/index'), //eslint-disable-line
  loading: LoadingProvider
})

function myFunction () {
  var x = document.getElementById('navbar')
  if (x.className === 'topnav') {
    x.className += ' responsive'
  } else {
    x.className = 'topnav'
  }
}

const Header = ({ location, showSidebar }) => (
  <StaticQuery
    query={
      graphql`
        query headerTitleQuery {
          site {
            siteMetadata {
              logo {
                link
                image
              }
              headerLinks {
                link
                text
              }
            }
          }
        }
        `}
    render={(data) => {
      const logoImg = require('./images/logo.svg')
      const {
        site: {
          siteMetadata: {
            logo,
            headerLinks
          }
        }
      } = data
      const finalLogoLink = logo.link !== '' ? logo.link : '/'
      return (
        <nav className={'flex px-10 py-4 items-center border-b border-qrigray-200'}>
          <Link to={finalLogoLink} className={'mr-3'}>
            <img className={'img-responsive displayInline'} src={(logo.image !== '') ? logo.image : logoImg} alt={'logo'} />
          </Link>
          <div className='text-xl'><span className='font-extrabold'>Qri</span><span className='text-xl'> /</span><span className='text-qriqritile-600'>Docs</span></div>
          <span onClick={myFunction} className={'navBarToggle'}>
            <span className={'iconBar'}></span>
            <span className={'iconBar'}></span>
            <span className={'iconBar'}></span>
          </span>
          {isSearchEnabled ? (
            <div className={'searchWrapper hiddenMobile navBarUL'}>
              <LoadableComponent collapse={true} indices={searchIndices} />
            </div>
          ) : null}
          <div id="navbar" className={'flex-grow text-right'}>
            <div className={'sm:hidden'}>
              {showSidebar && <><Sidebar location={location} /> <hr/></>}
              {isSearchEnabled ? (
                <div className={'searchWrapper'}>
                  <LoadableComponent collapse={true} indices={searchIndices} />
                </div>
              ) : null}
            </div>
            <ul className={'flex justify-end text-sm font-semibold tracking-wide'}>
              {headerLinks.map((link, key) => {
                if (link.link !== '' && link.text !== '') {
                  // internal links get a <Link/>
                  if (link.link.charAt(0) === '/') {
                    return (
                      <li key={key}>
                        <Link className="ml-12" to={link.link}>{link.text}</Link>
                      </li>
                    )
                  }

                  return (
                    <li key={key}>
                      <a className="ml-12" href={link.link} target="_blank" rel="noopener noreferrer" dangerouslySetInnerHTML={{ __html: link.text }} />
                    </li>
                  )
                }
              })}
            </ul>
          </div>
        </nav>
      )
    }}
  />
)

export default Header
