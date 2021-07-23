import React from 'react'

import Head from '../components/Head'
import Header from '../components/Header'
import Footer from '../components/Footer'

const DocsPage = ({ onSearchClick }) => (
  <div className='flex flex-col h-screen' style={{
    background: 'url("/img/new-docs/dot.svg")'
  }}>
    <Head data={{
      title: 'Qri Docs',
      description: 'Documentation for Qri Desktop and Qri CLI'
    }} />
    <div className='flex-grow flex-shrink-0'>
      <img src='/img/new-docs/yellow-aura.svg' className='absolute z-0'/>
      <Header border={false} onSearchClick={onSearchClick} />
      <div className='z-10 relative'>
        <div className='py-24'>
          <div className='font-bold text-6xl text-qritile-600 text-center'>How can we <span className='text-qripink-600'>help</span> you?</div>
        </div>
      </div>
    </div>
    <div className='flex-shrink-0'>
      <Footer />
    </div>
  </div>
)

export default DocsPage
