import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import Loadable from 'react-loadable'
import classNames from 'classnames'

import config from '../../config.js'
import LoadingProvider from './mdxComponents/loading'
import Sidebar from './sidebar'
import Icon from './Icon'

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
                iconColorClass
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
          <div className='text-xl'>
            <Link to='/'>
              <span className='font-extrabold'>Qri</span>
            </Link>
            <span className='text-xl'> /</span>
            <Link to='/docs'>
              <span className='text-qriqritile-600'>Docs</span>
            </Link></div>
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
              {headerLinks.map((headerLink, key) => {
                const { link, text, iconColorClass } = headerLink

                if (link !== '' && text !== '') {
                  // internal links get a <Link/>
                  if (link.charAt(0) === '/') {
                    return (
                      <li key={key} className='ml-10 flex items-center'>
                        {iconColorClass && (<Icon icon='docsRing' size='2xs' className={classNames(iconColorClass, 'mr-2')}/>)}
                        <Link to={link}>{text}</Link>
                      </li>
                    )
                  }

                  return (
                    <li key={key}>
                      <a className="ml-10" href={link.link} target="_blank" rel="noopener noreferrer" dangerouslySetInnerHTML={{ __html: link.text }} />
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
