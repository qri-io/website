import React, { useState, useEffect } from 'react'
import classNames from 'classnames'

import config from '../../config.js'
import Link from './Link'
import IconButton from './IconButton'
import Icon from './Icon'
import HeaderLink from './HeaderLink'

const isSearchEnabled = !!(config.header.search && config.header.search.enabled)

const searchIndices = []
if (isSearchEnabled && config.header.search.indexName) {
  searchIndices.push(
    { name: `${config.header.search.indexName}`, title: 'Results', hitComp: 'PageHit' }
  )
}

export const useDisableBodyScroll = (open) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'unset'
    }
  }, [open])
}

const Header = ({
  location,
  showSidebar,
  border = false,
  headerLinks,
  onSearchClick,
  transparent = false,
  sticky = false,
  children
}) => {
  const [showMobileNav, setShowMobileNav] = useState(false)
  useDisableBodyScroll(showMobileNav)

  const toggleMobileNav = () => {
    setShowMobileNav(!showMobileNav)
  }

  const Nav = ({ mobileMenu }) => (
    <nav className={classNames('flex px-5 md:px-10 py-4 items-center z-10 relative transition-all duration-100 z-20', {
      'border-b border-qrigray-200': border || mobileMenu,
      'bg-white': !transparent,
      'sticky top-0': sticky
    })}>
      <div className="flex-shrink-0 flex items-center">
        <Link colorClassName={'text-black'} to='/' className={'mr-3 flex'}>
          <img className={'img-responsive displayInline'} src='/img/new-docs/logo.svg' alt={'logo'} />
        </Link>
        <div className='text-xl flex'>
          <Link colorClassName={'text-black'} to='/'>
            <span className='font-extrabold'>Qri</span>
          </Link>
          {/* Show the "/docs" after the logo if this is the docs header */}
          {location.pathname.match(/\/docs\/?/) && (
            <>
              <span className='text-xl'> /</span>
              <Link colorClassName={'text-qritile-600'} to='/docs'>
                <span>Docs</span>
              </Link>
            </>
          )}
        </div>
      </div>

      <div id="navbar" className={'flex-grow text-right'}>
        <div className={'justify-end flex md:hidden'}>
          <Link colorClassName={'text-black'} onClick={onSearchClick}>
            <Icon icon='search' className='mr-3'/>
          </Link>
          <Link onClick={toggleMobileNav}>
            <IconButton icon={mobileMenu ? 'close' : 'bars'} />
          </Link>
        </div>
        <ul className={'justify-end text-sm font-semibold tracking-wide hidden md:flex'}>
          {headerLinks.map((headerLink, i) => (
            <HeaderLink key={i} data={headerLink} className='ml-6 lg:ml-10' mobile />
          ))}
          {onSearchClick && (
            <li className='ml-10 flex items-center'>
              <Link colorClassName={'text-black'} onClick={onSearchClick}>
                <Icon icon='search' size='sm'/>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )

  return (
    <>
      <Nav/>
      {/* mobile nav animates in */}
      <div className={classNames('fixed top-0 bottom-0 h-screen w-full bg-white z-20 transition-all duration-300', {
        'right-0': showMobileNav,
        '-right-full': !showMobileNav
      })}>
        <Nav mobileMenu />
        <div className='block md:hidden px-4 py-10'>
          {headerLinks.map((headerLink, i) => (
            <HeaderLink key={i} data={headerLink} className='mb-8 font-bold' onClick={toggleMobileNav} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Header
