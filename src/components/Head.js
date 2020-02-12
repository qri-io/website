import React from 'react'
import Helmet from 'react-helmet'

const Head = ({ data, children }) => {
  const {
    title,
    url,
    description,
    image,
    imageAlt
  } = data

  return (
    <>
      <Helmet>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@qri_io" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Qri.io"/>

        { title && <title>{title} | Qri.io</title> }
        { title && <meta name="twitter:title" content={title} /> }
        { title && <meta property="og:title" content={title} /> }

        { description && <meta name="twitter:description" content={description}/> }
        { description && <meta property="og:description" content={description} /> }

        { image && <meta name="twitter:image" content={image} /> }
        { image && <meta property="og:image" content={image} /> }

        { imageAlt && <meta name="twitter:image-alt" content={imageAlt} />}

        {url && <meta property="og:url" content={url} />}

        {children}
      </Helmet>
    </>
  )
}

export default Head
