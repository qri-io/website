import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faArrowRight,
  faBars,
  faBolt,
  faCheckCircle,
  faCircle,
  faCloudUploadAlt,
  faCode,
  faProjectDiagram,
  faEllipsisH,
  faEnvelope,
  faFont,
  faHashtag,
  faHome,
  faHdd,
  faList,
  faCheck,
  faPen,
  faMinusCircle,
  faPlay,
  faPlus,
  faPlusCircle,
  faPauseCircle,
  faTimes,
  faToggleOn,
  faExclamationCircle,
  faExclamationTriangle,
  faQuestion,
  faQuestionCircle,
  faShip,
  faSortDown,
  faSpinner,
  faTable
} from '@fortawesome/free-solid-svg-icons'

import {
  faFile
} from '@fortawesome/free-regular-svg-icons'

import CaretRight from './icon/CaretRight'
import Discord from './icon/Discord'
import DocsRing from './icon/DocsRing'
import Github from './icon/Github'
import Search from './icon/Search'
import Twitter from './icon/Twitter'
import Youtube from './icon/Youtube'

const faIcons = {
  any: faQuestion,
  array: faQuestionCircle,
  arrowLeft: faArrowLeft,
  arrowRight: faArrowRight,
  bars: faBars,
  bolt: faBolt,
  boolean: faToggleOn,
  check: faCheck,
  checkCircle: faCheckCircle,
  circle: faCircle,
  cloudUpload: faCloudUploadAlt,
  ellipsisH: faEllipsisH,
  envelope: faEnvelope,
  exclamationCircle: faExclamationCircle,
  exclamationTriangle: faExclamationTriangle,
  file: faFile,
  hdd: faHdd,
  home: faHome,
  integer: faHashtag,
  list: faList,
  minusCircle: faMinusCircle,
  null: faQuestionCircle,
  number: faHashtag,
  numeric: faHashtag,
  object: faQuestionCircle,
  pauseCircle: faPauseCircle,
  pen: faPen,
  play: faPlay,
  plus: faPlus,
  plusCircle: faPlusCircle,
  projectDiagram: faProjectDiagram,
  ship: faShip,
  sortDown: faSortDown,
  spinner: faSpinner,
  string: faFont,
  table: faTable,
  times: faTimes,
  transform: faCode,
  unknown: faQuestionCircle
}

const sizes = {
  xs: 'xs',
  sm: 'sm',
  md: 'lg',
  lg: '2x'
}

const Icon = ({
  icon = 'unknown',
  size = 'md',
  className,
  rotation,
  spin
}) => {
  const faIconsList = Object.keys(faIcons)

  const customIcons = {
    caretRight: <CaretRight className={className} size={size} />,
    discord: <Discord className={className} size={size} />,
    docsRing: <DocsRing className={className} size={size} />,
    github: <Github className={className} size={size} />,
    search: <Search className={className} size={size} />,
    twitter: <Twitter className={className} size={size} />,
    youtube: <Youtube className={className} size={size} />
  }

  if (faIconsList.includes(icon)) {
    return <FontAwesomeIcon rotation={rotation} size={sizes[size]} icon={faIcons[icon]} className={className} spin={spin} />
  }

  return customIcons[icon] || '?'
}

export default Icon
