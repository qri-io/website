import React from 'react'

const DocsLandingPageLayout = (props) => {
  // necessary so we can pass onSearchClick to the <Header/> that lives in the docs landing page
  const childrenWithProps = React.Children.map(props.children, (child) =>
    React.cloneElement(child, { ...props })
  )
  return (
    <>
      {childrenWithProps}
    </>
  )
}

export default DocsLandingPageLayout
