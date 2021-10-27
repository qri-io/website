import React from 'react'

import Link from '../components/Link'

const ContactPage = () => (
  <>
    <img src='/img/contact/yellow-aura.svg' className='absolute -top-36 -left-20 z-0'/>
    <div className='px-5 md:px-10 lg:px-20'>
      <div className='mx-auto py-12 pb-28 z-10 relative' style={{
        maxWidth: 710
      }}>
        <div className='text-7xl text-qritile-600 font-extrabold mb-4'>Get in touch</div>
        <div className='text-2xl mb-6'>Hey There 👋</div>
        <div className='text-2xl mb-6'>
      Whether you’re an existing user or someone who’s looking to give Qri a try, we’re happy to help. For quick answers to common questions, <Link to='/faq'>check out the FAQ</Link>.
        </div>
        <ol className='list-decimal list-inside text-2xl mb-6'>
          <li>Have a support issue? Check out <Link to='/docs'>our documentation</Link> first.</li>
          <li>To report a bug or request a feature, see <Link to='https://github.com/qri-io'>our repositories on github</Link> and open an issue.  <Link to='https://github.com/qri-io/frontend'>Here&apos;s the repo for Qri.cloud</Link></li>
          <li>Curious about Qri? Give <Link to='/about'>our about page</Link> a read.</li>
        </ol>
        <div className='text-2xl mb-6'>Still can’t find what you’re looking for? <Link to="https://discordapp.com/invite/thkJHKj">Drop into our Discord</Link> and one of our teammates will be happy to help you out. </div>
        <div className='text-2xl mb-6'>We&apos;re also available at <strong>hello [at] qri.io</strong> if you want to go async.</div>
      </div>
    </div>
  </>
)

export default ContactPage
