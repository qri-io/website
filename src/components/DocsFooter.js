import React from 'react'

import Link from './Link'
import Icon from './Icon'

const DocsFooter = (props) => {
  return (
    <div className='flex flex-col md:flex-row text-qrigray-400 text-sm px-5 py-10 md:p-6 border-t border-qrigray-200 font-light'>
      <div className='flex flex-grow justify-between mb-5 md:mb-0'>
        <div className='md:mr-6'>&copy; 2021 qri, inc.</div>
        <Link className='md:mr-6' colorClassName='text-qrigray-400' to='/tos'>Terms of Service</Link>
        <Link className='md:mr-6' colorClassName='text-qrigray-400' to='/privacy'>Privacy Policy</Link>
      </div>
      <div className='flex mx-auto'>
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
            <Link to={link} key={i} className='mx-2 md:ml-5' colorClassName='text-qrigray-400'>
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
