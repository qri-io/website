import React from 'react'

import Link from './Link'
import Icon from './Icon'

const DocsFooter = (props) => {
  return (
    <div className='flex text-qrigray-400 text-xs p-6 border-t border-qrigray-200 font-light'>
      <div className='flex flex-grow'>
        <div className='mr-6'>&copy; 2020 qri, inc.</div>
        <Link className='mr-6' colorClassName='text-qrigray-400' to='/tos'>Terms of Service</Link>
        <Link className='mr-6' colorClassName='text-qrigray-400' to='/privacy'>Privacy Policy</Link>
      </div>
      <div className='flex'>
        {
          [
            {
              icon: 'github',
              link: 'https://github.com/qri-io'
            },
            {
              icon: 'youtube',
              link: 'https://www.youtube.com/channel/UC7E3_hURgFO2mVCLDwPSyOQ'
            },
            {
              icon: 'twitter',
              link: 'https://twitter.com/qri_io'
            },
            {
              icon: 'discord',
              link: 'https://discordapp.com/invite/thkJHKj'
            }
          ].map(({ icon, link }, i) => (
            <Link to={link} key={i} className='ml-5' colorClassName='text-qrigray-400'>
              <Icon
                icon={icon}
                size='sm'
              />
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default DocsFooter
