import React from 'react'

import Automate from './icon/Automate'
import Bars from './icon/Bars'
import Behance from './icon/Behance'
import CaretRight from './icon/CaretRight'
import Check from './icon/Check'
import Clock from './icon/Clock'
import Close from './icon/Close'
import Copy from './icon/Copy'
import Discord from './icon/Discord'
import DocsRing from './icon/DocsRing'
import Github from './icon/Github'
import Linkedin from './icon/Linkedin'
import Search from './icon/Search'
import SkinnySearch from './icon/SkinnySearch'
import Twitter from './icon/Twitter'
import Version from './icon/Version'
import Youtube from './icon/Youtube'

const Icon = (props) => {
  const customIcons = {
    automate: <Automate {...props} />,
    bars: <Bars {...props} />,
    behance: <Behance {...props} />,
    caretRight: <CaretRight {...props} />,
    check: <Check {...props} />,
    clock: <Clock {...props} />,
    close: <Close {...props} />,
    copy: <Copy {...props} />,
    discord: <Discord {...props} />,
    docsRing: <DocsRing {...props} />,
    github: <Github {...props} />,
    linkedin: <Linkedin {...props} />,
    search: <Search {...props} />,
    skinnySearch: <SkinnySearch {...props} />,
    twitter: <Twitter {...props} />,
    version: <Version {...props} />,
    youtube: <Youtube {...props} />
  }

  return customIcons[props.icon] || '?'
}

export default Icon
