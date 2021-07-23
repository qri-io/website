import React from 'react'

import Link from './Link'
import Icon from './Icon'

const Footer = () => {
  // the first argument in track() becomes the google analytics 'Action' property after passing through segment
  // all events are of Action 'Homepage'
  const fireEvent = (category, label) => {
    window.analytics.track('Footer', {
      category,
      label
    })
  }

  return (
    <div className='bg-black text-white flex items-start px-20 py-14 text-sm'>
      <div className='flex items-center mr-20'>
        <img src='/img/new-docs/logo.svg' className='inline mr-4' style={{
          height: 65
        }}/>
        <div className='text-4xl inline font-bold'>Qri</div>
      </div>
      <div className='flex' style={{ minHeight: '200px' }}>
        <div className='mr-16'>
          <h5 className='text-qritile-600 font-semibold mb-5'>Download</h5>
          <ul>
            <li className='text-xs mb-3'><Link colorClassName='text-white' to='/download'>Qri Desktop</Link></li>
            <li className='text-xs mb-3'><Link colorClassName='text-white' to='https://github.com/qri-io/qri/releases'>Qri CLI</Link></li>
          </ul>
        </div>
        <div className='mr-16'>
          <h5 className='text-qritile-600 font-semibold mb-5'>Learn</h5>
          <ul>
            <li className='text-xs mb-3'><Link colorClassName='text-white' to='/docs'>Tutorials</Link></li>
            <li className='text-xs mb-3'><Link colorClassName='text-white' to='/docs'>Docs</Link></li>
            <li className='text-xs mb-3'><Link colorClassName='text-white' to='/faq'>FAQs</Link></li>
          </ul>
        </div>
        <div className='mr-16'>
          <h5 className='text-qritile-600 font-semibold mb-5'>Company</h5>
          <ul>
            <li className='text-xs mb-3'><Link colorClassName='text-white' to='/about'>About</Link></li>
            <li className='text-xs mb-3'><Link colorClassName='text-white' to='https://medium.com/qri-io'>Blog</Link></li>
            <li className='text-xs mb-3'><Link colorClassName='text-white' to='/jobs'>Jobs</Link></li>
            <li className='text-xs mb-3'><Link colorClassName='text-white' to='/contact'>Contact</Link></li>
          </ul>
        </div>
        <div className='mr-16'>
          <h5 className='text-qritile-600 font-semibold mb-5'>Explore</h5>
          <ul>
            <li className='text-xs mb-3'><Link colorClassName='text-white' to='https://qri.cloud'>Dataset Search</Link></li>
            <li className='text-xs mb-3'><Link colorClassName='text-white' to='https://qri.cloud'>Qri.cloud</Link></li>
          </ul>
        </div>
      </div>
      <div className='flex-grow flex flex-col'>
        <h5 className='text-qritile-600 font-semibold mb-5'>Subscribe</h5>
        <div className='flex'>
          <div className='inline mr-4' onClick={ () => { fireEvent('social-link-click', 'github') }}>
            <Link colorClassName='text-qritile-600' to='https://github.com/qri-io'><Icon icon='github'/></Link>
          </div>
          <div className='inline mr-4' onClick={ () => { fireEvent('social-link-click', 'youtube') }}>
            <Link colorClassName='text-qritile-600' to='https://www.youtube.com/channel/UC7E3_hURgFO2mVCLDwPSyOQ'><Icon icon='youtube'/></Link>
          </div>
          <div className='inline mr-4' onClick={ () => { fireEvent('social-link-click', 'twitter') }}>
            <Link colorClassName='text-qritile-600' to='https://twitter.com/qri_io'><Icon icon='twitter'/></Link>
          </div>
          <div className='inline mr-4' onClick={ () => { fireEvent('social-link-click', 'discord') }}>
            <Link colorClassName='text-qritile-600' to='https://discordapp.com/invite/thkJHKj'><Icon icon='discord'/></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
