import React from 'react'

import Automate from './icon/Automate'
import CaretRight from './icon/CaretRight'
import Clock from './icon/Clock'
import Discord from './icon/Discord'
import DocsRing from './icon/DocsRing'
import Github from './icon/Github'
import Search from './icon/Search'
import Twitter from './icon/Twitter'
import Version from './icon/Version'
import Youtube from './icon/Youtube'

const sizes = {
  xs: 'xs',
  sm: 'sm',
  md: 'lg',
  lg: '2x'
}

const Icon = (props) => {
  const customIcons = {
    automate: <Automate {...props} />,
    caretRight: <CaretRight {...props} />,
    clock: <Clock {...props} />,
    discord: <Discord {...props} />,
    docsRing: <DocsRing {...props} />,
    github: <Github {...props} />,
    search: <Search {...props} />,
    twitter: <Twitter {...props} />,
    version: <Version {...props} />,
    youtube: <Youtube {...props} />
  }

  return customIcons[props.icon] || '?'
}

export default Icon
