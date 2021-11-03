import React from 'react'
import classNames from 'classnames'

import Icon from './Icon'

// tailwind classes for each type to be used in classNames()
export function generateButtonTypeClasses (type, disabled) {
  return {
    'text-white bg-qritile hover:bg-qritile-600': (type === 'primary'),
    'text-qritile hover:text-qritile-600 border border-qritile hover:border-qritile-600 box-border': (type === 'primary-outline'),
    'text-white bg-qripink-600 hover:bg-qripink-700': (type === 'secondary'),
    'text-qripink-600 hover:text-qripink-700 border border-qripink-600 hover:border-qripink-700 box-border': (type === 'secondary-outline'),
    'text-qrigray-900 bg-warningyellow hover:bg-warningyellow-600': (type === 'warning'),
    'text-white bg-dangerred hover:bg-dangerred-600': (type === 'danger'),
    'text-qrigray-400 hover:text-qrigray-600 border border-qrigray-400 hover:border-qrigray-600': (type === 'light'),
    'text-qrigray-900 hover:text-qripink border border-qrigray-900 hover:border-qripink': (type === 'dark'),
    'cursor-default bg-opacity-40 hover:bg-opacity-40': disabled
  }
}

const Button = ({
  id,
  className,
  type = 'primary',
  icon,
  size = 'md',
  submit = false,
  disabled = false,
  block = false,
  caret = false,
  onClick = () => {},
  children
}) => {
  let height = 32
  let sizeClassName = 'rounded-md px-2.5'
  let caretSize = '2xs'

  if (size === 'sm') {
    height = 30
    sizeClassName = 'rounded px-2.5'
    caretSize = '3xs'
  } else if (size === 'lg') {
    height = 38
    sizeClassName = 'rounded-lg text-base'
    caretSize = 'xs'
  }

  // when block is true, the heights and border radii are modified
  if (block) {
    sizeClassName = 'w-full rounded-xl'
    if (size === 'sm') {
      height = 26
    } else if (size === 'md') {
      height = 36
    } else if (size === 'lg') {
      height = 46
    }
  }

  // when an icon prop is present, the height of each size is slightly higher
  let iconSize = 'xs'

  if (icon) {
    if (size === 'sm') {
      height = 23
    } else if (size === 'md') {
      iconSize = 'sm'
      height = 38
    } else if (size === 'lg') {
      iconSize = 'md'
      height = 44
    }
  }

  return (
    <button
      id={id}
      type={submit ? 'submit' : 'button'}
      style={{
        height
      }}
      className={classNames(
        'px-2.5 inline-flex items-center justify-center shadow-sm bg-transparent font-semibold focus:outline-none focus:ring-none mt-0 transition-all duration-100',
        sizeClassName,
        className,
        generateButtonTypeClasses(type, disabled)
      )}
      onClick={onClick}
      disabled={disabled}
    >
      { icon && <Icon icon={icon} size={iconSize} className={children ? 'mr-2' : ''}/>}
      {children}
      {caret && <Icon icon='caretRight' size={caretSize} className='ml-2'/>}
    </button>
  )
}

export default Button
