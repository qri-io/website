import React from 'react'
import Icon from '../components/Icon'

const SearchInput = () => {
  return (
    <form className='relative rounded-md shadow-sm w-full mb-4'>
      <input
        className='border border-qrigray-200 block w-full sm:text-xs rounded-lg tracking-wider placeholder-qrigray-600 placeholder-opacity-50 px-3 py-2.5'
        id='search'
        name='search'
        type='text'
        placeholder='Search for Datasets'
        value=''
      />
      <span className='absolute inset-y-0 right-0 flex items-center pr-2 text-qrigray-400'>
        <Icon icon='search' size='sm' />
      </span>
    </form>
  )
}

export default SearchInput
