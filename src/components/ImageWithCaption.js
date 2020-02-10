import React from 'react'

const ImageWithCaption = ({ src, caption, shadow = false }) => {
  const shadowStyle = {
    boxShadow: '0px 1px 7px 0px rgba(0,0,0,0.28)'
  }

  return (
    <div className='image-with-caption'>
      <img className='image-container' src={src} style={shadow ? shadowStyle : null}/>
      <div className='caption'>{caption}</div>
    </div>
  )
}

export default ImageWithCaption
