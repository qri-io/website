import React from 'react'

import Head from '../components/Head'
import Button from '../components/Button'
import Link from '../components/Link'

const NotFoundPage = () => (
  <>
    <Head data={{
      title: 'Not Found',
      description: 'You tried to load a page that doesn&apos;t exist'
    }} />
    <img src='/img/contact/yellow-aura.svg' className='absolute top-10 -left-48 z-0'/>
    <div className='px-5 md:px-10 lg:px-20 z-10 relative mb-28'>
      <div className='flex flex-col md:flex-row'>
        <div className='w-full md:w-1/2 my-30 flex items-center'>
          <div className='max-w-lg mx-auto'>
            <div className='text-7xl text-qritile-600 font-extrabold'>Lost Blob Alert!</div>
            <div className='text-3xl font-bold mb-6'>Sorry, we can&apos;t find the page you requested</div>
            <Link to='/'><Button type='secondary' className='w-36' size='lg'>Back to Home</Button></Link>
          </div>
        </div>
        <div className='w-full md:w-1/2 pt-10 flex items-center'>
          <img src='/img/404/lost-blob.svg' className='mx-auto' />
        </div>
      </div>
    </div>
  </>
)

export default NotFoundPage
