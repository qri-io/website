import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import classNames from 'classnames'

import config from '../../config.js'
import Sidebar from './sidebar'
import Icon from './Icon'
import Link from './Link'

const isSearchEnabled = !!(config.header.search && config.header.search.enabled)

const searchIndices = []
if (isSearchEnabled && config.header.search.indexName) {
  searchIndices.push(
    { name: `${config.header.search.indexName}`, title: 'Results', hitComp: 'PageHit' }
  )
}

function myFunction () {
  var x = document.getElementById('navbar')
  if (x.className === 'topnav') {
    x.className += ' responsive'
  } else {
    x.className = 'topnav'
  }
}

const Header = ({
  location,
  showSidebar,
  border = true,
  onSearchClick
}) => (
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
                colorClass
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
        <nav className={classNames('flex px-10 py-4 items-center z-10 relative', {
          'border-b border-qrigray-200': border
        })}>
          <Link colorClassName={'text-black'} to={finalLogoLink} className={'mr-3'}>
            <img className={'img-responsive displayInline'} src={(logo.image !== '') ? logo.image : logoImg} alt={'logo'} />
          </Link>
          <div className='text-xl flex'>
            <Link colorClassName={'text-black'} to='/'>
              <span className='font-extrabold'>Qri</span>
            </Link>
            <span className='text-xl'> /</span>
            <Link colorClassName={'text-black'} to='/docs'>
              <span className='text-qriqritile-600'>Docs</span>
            </Link></div>
          <span onClick={myFunction} className={'navBarToggle'}>
            <span className={'iconBar'}></span>
            <span className={'iconBar'}></span>
            <span className={'iconBar'}></span>
          </span>
          <div id="navbar" className={'flex-grow text-right'}>
            <div className={'sm:hidden'}>
              {showSidebar && <><Sidebar location={location} /> <hr/></>}
            </div>
            <ul className={'flex justify-end text-sm font-semibold tracking-wide'}>
              {headerLinks.map((headerLink, key) => {
                const { link, text, colorClass } = headerLink

                if (link !== '' && text !== '') {
                  if (link.charAt(0) === '/') {
                    return (
                      <li key={key} className='ml-10 flex items-center'>
                        {colorClass && (<Icon icon='docsRing' size='2xs' className={classNames(colorClass, 'mr-2')}/>)}
                        <Link colorClassName={'text-black'} to={link}>{text}</Link>
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
              <li className='ml-10 flex items-center'>
                <Link colorClassName={'text-black'} onClick={onSearchClick}><Icon icon='search' size='md'/></Link>
              </li>
            </ul>
          </div>
        </nav>
      )
    }}
  />
)

export default Header
