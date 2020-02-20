import React from 'react'

const ImageWithCaption = ({ src, caption, shadow = false, minHeight = 0 }) => {
  const style = {}

  if (shadow) {
    style.boxShadow = '0px 1px 7px 0px rgba(0,0,0,0.28)'
  }
  if (minHeight !== 0) {
    style.minHeight = minHeight
  }

  return (
    <div className='image-with-caption'>
      <img className='image-container' src={src} style={style}/>
      <div className='caption'>{caption}</div>
    </div>
  )
}

export default ImageWithCaption
