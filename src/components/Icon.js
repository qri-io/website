import * as React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  faSignInAlt,
  faCodeBranch,
  faDownload,
  faChevronLeft,
  faChevronRight,
  faCaretDown,
  faQuestion,
  faFont,
  faHashtag,
  faQuestionCircle,
  faSearch,
  faInfoCircle,
  faExternalLinkAlt,
  faAngleRight,
  faUserCog,
  faUser,
  faBars,
  faEllipsisV,
  faEllipsisH,
  faTimes,
  faFileArchive,
  faFileCsv,
  faCircle
} from '@fortawesome/free-solid-svg-icons'

import {
  faClipboard,
  faClock,
  faStickyNote,
  faHdd,
  faFile,
  faComment
} from '@fortawesome/free-regular-svg-icons'

import {
  faGithub,
  faYoutube,
  faTwitter,
  faDiscord
} from '@fortawesome/free-brands-svg-icons'

const icons = {
  signIn: faSignInAlt,
  pull: faCodeBranch,
  download: faDownload,
  github: faGithub,
  youtube: faYoutube,
  twitter: faTwitter,
  discord: faDiscord,
  chevronRight: faChevronRight,
  chevronLeft: faChevronLeft,
  caretDown: faCaretDown,
  search: faSearch,
  any: faQuestion,
  string: faFont,
  integer: faHashtag,
  number: faHashtag,
  boolean: faQuestionCircle,
  null: faQuestionCircle,
  object: faQuestionCircle,
  array: faQuestionCircle,
  infoCircle: faInfoCircle,
  externalLink: faExternalLinkAlt,
  clipboard: faClipboard,
  clock: faClock,
  stickyNote: faStickyNote,
  angleRight: faAngleRight,
  userCog: faUserCog,
  user: faUser,
  bars: faBars,
  hdd: faHdd,
  file: faFile,
  dragHandle: faEllipsisV,
  dropDownHandle: faEllipsisH,
  times: faTimes,
  zip: faFileArchive,
  csv: faFileCsv,
  comment: faComment,
  circle: faCircle
}

export const iconsList = Object.keys(icons)

const Icon = ({
  icon = 'unknown',
  size = 'md',
  color = 'dark'
}) => {
  const sizes = {
    xs: 'xs',
    sm: 'sm',
    md: null,
    lg: 'lg',
    '2x': '2x'
  }

  if (icon === 'commit') {
    return (
      <svg aria-hidden='true' focusable='false' className={`svg-inline--fa fa-${sizes[size]}`} role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 52 91'>
        <circle id='Oval' stroke='currentColor' strokeWidth='10' cx='26' cy='45' r='21' fill='none'></circle>
        <line x1='26.5' y1='4.5' x2='26.5' y2='22.5' id='Line' stroke='currentColor' strokeWidth='10' strokeLinecap='square'></line>
        <line x1='26.5' y1='66.5' x2='26.5' y2='86.5' id='Line' stroke='currentColor' strokeWidth='10' strokeLinecap='square'></line>
      </svg>
    )
  }

  return <FontAwesomeIcon size={sizes[size]} icon={icons[icon]} className={`icon-${color}`}/>
}

export default Icon
