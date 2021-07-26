import React from 'react'
import classNames from 'classnames'

import config from '../../config.js'
import Sidebar from './sidebar'
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
  children
}) => (
  <nav className={classNames('flex px-10 py-4 items-center z-10 relative', {
    'border-b border-qrigray-200': border
  })}>
    <Link colorClassName={'text-black'} to='/' className={'mr-3'}>
      <img className={'img-responsive displayInline'} src='/img/new-docs/logo.svg' alt={'logo'} />
    </Link>
    <div className='text-xl flex'>
      <Link colorClassName={'text-black'} to='/'>
        <span className='font-extrabold'>Qri</span>
      </Link>
      {location.pathname.match(/\/docs\/?/) && (
        <>
          <span className='text-xl'> /</span>
          <Link colorClassName={'text-black'} to='/docs'>
            <span className='text-qriqritile-600'>Docs</span>
          </Link>
        </>
      )}
    </div>
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
        {children}
      </ul>
    </div>
  </nav>
)

export default Header
