import React from 'react'
import { navigate } from 'gatsby'

import BreadCrumbs from '../BreadCrumbs'
import SearchBox from '../SearchBox'

const SnippetHeader = ({ topLevel = false, showSearch = false }) => {
  const crumbs = [
    {
      pathname: '/',
      crumbLabel: 'Home'
    },
    {
      pathname: '/docs',
      crumbLabel: 'docs'
    },
    {
      pathname: '/docs/transform-snippets',
      crumbLabel: 'Transform Snippets'
    },
    {
      pathname: '',
      crumbLabel: ''
    }
  ]

  if (topLevel) {
    // remove the third item
    crumbs.splice(2, 1)
  }

  const handleSearchSubmit = (value) => {
    navigate(`/docs/transform-snippets?q=${value}`)
  }

  return (
    <div className='flex mb-8'>
      <div className='flex-grow flex items-center'>
        <BreadCrumbs crumbs={crumbs} />
      </div>
      { showSearch && (
        <div className=''>
          <SearchBox placeholder='search snippets' size='lg' onSubmit={handleSearchSubmit} />
        </div>
      )}
    </div>
  )
}

export default SnippetHeader
