// should be in sync with SearchBox component on qri frontend

import React from 'react'
import { useDebounce } from 'use-debounce'
import classNames from 'classnames'

import Icon from './Icon'

const DEBOUNCE_TIMER = 500

const SearchBox = ({
  onChange,
  onSubmit,
  placeholder = 'Search',
  value,
  size = 'md',
  dark = false,
  shadow = false,
  border = true,
  transparent = false,
  disabled = false
}) => {
  const [stateValue, setStateValue] = React.useState('')
  const [debouncedValue] = useDebounce(stateValue, DEBOUNCE_TIMER)

  React.useEffect(() => {
    if (onChange) {
      onChange(stateValue)
    }
  }, [debouncedValue, onChange, stateValue])

  React.useEffect(() => {
    setStateValue(value)
  }, [value])

  const handleChange = (e) => {
    setStateValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(stateValue)
    }
  }

  return (
    <form
      className={classNames('relative flex focus-within:border-qripink border rounded-lg w-full', {
        'bg-transparent': transparent,
        'bg-white': !transparent,
        'border-qrigray-300': !dark && border,
        'border-black': dark && border,
        'border-0': !border
      })}
      onSubmit={handleSubmit}
      style={{
        boxShadow: shadow ? '0px 0px 8px rgba(0, 0, 0, 0.1)' : '',
        height: size === 'lg' ? '50px' : '34px'
      }}
    >
      <input
        className={classNames('focus:ring-transparent border-0 bg-transparent block rounded-lg w-full placeholder-opacity-50 p-0', {
          'placeholder-black': dark,
          'placeholder-qrigray-300': !dark,
          'text-sm': size === 'md',
          'text-base': size === 'lg',
          'cursor-pointer': disabled
        })}
        id='search'
        name='search'
        type='text'
        placeholder={placeholder}
        value={stateValue || ''}
        onChange={handleChange}
        style={{
          padding: size === 'lg' ? '8px 45px 8px 20px' : '4px 20px 4px 10px'
        }}
        disabled={disabled}
      />
      <div className={classNames('flex items-center absolute right-0 h-full px-3', {
        'text-qrigray-300': !dark,
        'text-black': dark
      })}>
        <Icon size='sm' icon='skinnySearch' />
      </div>
    </form>
  )
}

export default SearchBox
