import React from 'react'

import Link from './Link'
import Icon from './Icon'
import { processCrumbs } from '../../config'

const BreadCrumbs = ({ crumbs: rawCrumbs }) => {
  // transform the crumbs
  const crumbs = processCrumbs(rawCrumbs)

  return (
    <div className='text-xs flex items-center mb-8'>
      {crumbs.map((d, i) => {
        if ((i > 0) && (i < crumbs.length - 1)) {
          return (
            <React.Fragment key={d.pathname}>
              <div className='inline-block'>
                <Link to={d.pathname} colorClassName='text-qrigray-400 hover:text-qripink'>{d.crumbLabel}</Link>
              </div>
              <div className='text-qrigray-200 inline-block mx-2'>
                <Icon icon='caretRight' size='4xs' />
              </div>
            </React.Fragment>
          )
        }
      })}
    </div>
  )
}

export default BreadCrumbs
