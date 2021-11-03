import React from 'react'

import Head from '../components/Head'
import DocsHeader from '../components/DocsHeader'
import Footer from '../components/Footer'
import Icon from '../components/Icon'
import Link from '../components/Link'
import Button from '../components/Button'
import SearchBox from '../components/SearchBox'

const PageTile = ({ title, subtitle, image, link }) => (
  <Link to={link} colorClassName="text-black hover:text-qripink">
    <div className='bg-white shadow-md rounded-lg text-center p-8' style={{
      boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.15)'
    }}>
      <img src={image} className='mx-auto mb-4'/>
      <div className='font-bold text-3xl mb-2'>{title}</div>
      <div className='font-light text-qrigray-400'>{subtitle}</div>
    </div>
  </Link>
)

const featuredTutorials = [
  {
    title: 'How Qri Defines a Dataset',
    description: 'Qri is a distributed version control and sharing platform for datasets',
    slug: '/docs/concepts/understanding-qri/what-is-qri',
    colorClass: 'text-qripink-600'
  },
  {
    title: 'How Qri Dataset Version Control Works',
    description: 'In Qri, \'Dataset\' means more than just the data.  Learn more about the Qri Data Model',
    slug: '/docs/concepts/understanding-qri/how-qri-defines-a-dataset',
    colorClass: 'text-qrigreen-600'
  },
  {
    title: 'Scrape Data from a Website',
    description: 'Use Starlark\'s html package to extract data from HTML',
    slug: '/docs/guides',
    colorClass: 'text-qrigreen-600'
  }
]

const DocsPage = ({ onSearchClick, location }) => (
  <div style={{
    background: 'url("/img/new-docs/dot.svg")'
  }}>
    <div className='flex flex-col' style={{
      backgroundImage: 'url("/img/new-docs/yellow-aura-bubble.svg")',
      backgroundRepeat: 'no-repeat',
      backgroundPositionY: 1200,
      backgroundPositionX: 'right'
    }}>
      <Head data={{
        title: 'Qri Docs',
        description: 'Documentation for Qri Desktop and Qri CLI'
      }} />
      <div className='flex-grow flex-shrink-0'>
        <img src='/img/new-docs/yellow-aura.svg' className='absolute z-0'/>
        <DocsHeader onSearchClick={onSearchClick} location={location} transparent sticky={false} border={false} />
        <div className='z-10 relative'>
          <div className='py-24 max-w-screen-lg mx-auto'>
            {/* Start Splash */}
            <div className='text-center relative'>
              <div className='absolute h-0'>
                <img src='/img/new-docs/blob-green.svg' className='relative -bottom-4 -left-4'/>
              </div>
              <div className='font-black text-6xl text-qritile-600 mb-10 inline-block'>
                <div className='mb-9'>
                  <div className='absolute h-0'>
                    <img src='/img/new-docs/nodes-1.svg' className='relative -top-20 -left-16'/>
                  </div>
                How can we <span className='text-qripink-600'>help</span> you?
                </div>
                <div onClick={onSearchClick} >
                  <SearchBox size='lg' disabled/>
                </div>
                <div className='absolute h-0 bottom-20 -right-16'>
                  <img src='/img/new-docs/blob-orange.svg'/>
                </div>
              </div>
            </div>
            {/* End Splash */}

            {/* Start Popular Pages Section */}
            <div className='text-center mb-20 relative'>
              <div className='text-xl font-bold'>Popular Pages</div>
              <div className='my-2 mx-auto'>
                <div className="flex flex-wrap -mx-6 overflow-hidden">
                  <div className="my-3 px-6 py-3 w-1/3 overflow-hidden">
                    <PageTile
                      image='/img/new-docs/page-clock.svg'
                      title='Quickstart'
                      subtitle='Dive in and start making datasets'
                      link='/docs/guides/transforms/scrape-data-from-a-website'
                    />
                  </div>
                  <div className="my-3 px-6 py-3 w-1/3 overflow-hidden">
                    <PageTile
                      image='/img/new-docs/page-cloud.svg'
                      title='What is Qri?'
                      subtitle='Learn Qri Core Concepts and Terms'
                      link='/docs/concepts/understanding-qri/what-is-qri'
                    />
                  </div>
                  <div className="my-3 px-6 py-3 w-1/3 overflow-hidden">
                    <PageTile
                      image='/img/new-docs/page-reference.svg'
                      title='Reference'
                      subtitle='Explore technical docs and APIs'
                      link='/docs/reference'
                    />
                  </div>
                </div>
              </div>
              <div className='absolute h-0 bottom-40 -right-36'>
                <img src='/img/new-docs/nodes-2.svg'/>
              </div>
            </div>
            {/* End Popular Pages Section */}

            {/* Start Recommended Tutorials */}
            <div className='mx-auto relative'>
              <div className='w-1/2 mb-16'>
                <div className='font-bold text-4xl text-qritile-600 mb-4'>
                Featured Docs
                </div>
                <div className='text-lg text-qrigray-1000'>
                Start with these pages to learn more about the value of versioned datasets and how Qri works.
                </div>
              </div>
              {featuredTutorials.map(({ title, description, slug, colorClass }) => (
                <Link key={slug} to={slug}>
                  <div
                    className='text-qrigray-400 bg-white rounded-lg border-solid border-2 border-qrigray-100 box-border px-6 py-6 flex mb-6'
                  >
                    <Icon icon='docsRing' size='xs' className={`mt-1.5 mr-3 ${colorClass}`} />
                    <div className='flex-grow'>
                      <div className='font-bold text-lg text-black mb-1'>{title}</div>
                      <div className='text-sm'>{description}</div>
                    </div>
                    <div className='flex items-center'>
                      <Icon icon='caretRight' size='xl' className='' />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {/* End Recommended Tutorials */}

            {/* Start Still Need Help? */}
            <div className='mx-auto py-32'>
              <div className='bg-qritile-600 rounded-lg flex text-white p-14'>
                <div className='w-3/5'>
                  <div className='font-bold text-4xl mb-5'>Still have questions?</div>
                  <div className='font-base text-lg mb-5'>If you need answers, come join our community chat on Discord. Our staff and other Qri users can help you get going!.</div>
                  <Link to='https://discordapp.com/invite/thkJHKj'>
                    <Button size='lg' type='secondary'>Come Hang Out!</Button>
                  </Link>
                </div>
                <div className=''>
                  <div className='absolute h-0'>
                    <img src='/img/new-docs/docs-help.svg' className='relative -top-32 -left-16'/>
                  </div>
                </div>
              </div>
            </div>
            {/* End Still Need Help? */}
          </div>
        </div>
      </div>
      <div className='flex-shrink-0'>
        <Footer />
      </div>
    </div>
  </div>
)

export default DocsPage
