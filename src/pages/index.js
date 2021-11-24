import React, { useState } from 'react'
import numeral from 'numeral'

import Button from '../components/Button'
import Link from '../components/Link'
// import VideoContainer from '../components/VideoContainer'
import SearchBox from '../components/SearchBox'
import DatasetCard from '../components/DatasetCard'
import { trackGoal } from '../utils/analytics'

const hardCodedMetrics = {
  datasets: 3447,
  versions: 5120,
  size: 49200000000
}

const IndexPage = () => {
  const features = [
    {
      id: 'version',
      title: 'Version',
      description: 'All changes to Qri Datasets are versioned. Compare one version to any other. Explore the history of commits to see how datasets evolve over time.',
      icon: 'version',
      buttonText: 'How Qri Versioning Works',
      link: '/docs/concepts/understanding-qri/how-qri-version-control-works',
      image: ''
    },
    {
      id: 'automate',
      title: 'Automate',
      description: 'Write transform code that lives right alongside your dataset.  Import from external data sources or other Qri datasets. ',
      icon: 'automate',
      buttonText: 'How Qri Binds Code to Data',
      link: '/docs/concepts/understanding-qri/how-qri-data-transforms-and-automation-work',
      image: ''
    }
  ]

  const [selectedFeatureId, setSelectedFeatureId] = useState('version')

  const selectedFeature = features.find(d => d.id === selectedFeatureId)

  const handleSearchSubmit = (query) => {
    // general-search-from-homepage event
    trackGoal('PM9MTQ4Y', 0)
    const newParams = new URLSearchParams(`q=${query}`)
    window.open(`https://qri.cloud/search?${newParams.toString()}`)
  }

  return (
    <>
      <div className='pt-0 md:pt-16 overflow-x-hidden'>
        <div className='px-5 md:px-10 lg:px-20 z-10'>
          <div className='flex flex-col sm:flex-row -mx-6'>
            <div className='inline-block mx-6 flex-grow'>
              <div className='-mx-1.5'>
                <img className='relative left-40 transform scale-75 md:transform-none md:-left-10' src='/img/new-docs/homepage/nodes-1.svg'/>
                <div className='text-qritile-600 font-extrabold text-5xl md:text-6xl px-1.5 py-0 border-0 md:border-2 border-qrigray-100 bg-none md:bg-white inline-block relative mb-5'>
                Data with Friends
                </div>
                <div className='px-1.5'>
                  <div className='flex mb-5 md:mb-8'>
                    <div className='text-lg md:text-xl w-0 flex-grow'>Qri helps you organize, version, automate, and share datasets.</div>
                  </div>
                  <Link to='https://qri.cloud'>
                    <Button type='secondary' size='lg' className='mb-8'>Get Started</Button>
                  </Link>
                </div>
                <div className='border-b-2 border-qrigray-200 mb-8 mx-1.5'></div>
              </div>
              <div className='flex mb-10 md:mb-0'>
                <div className='text-center px-3 mr-6'>
                  <div className='text-qritile-600 font-bold block text-xl mb-1.5'>{numeral(hardCodedMetrics.datasets).format('0,0')}</div>
                  <div className='text-sm block font-light'>Datasets</div>
                </div>
                <div className='text-center px-3 mr-6'>
                  <div className='text-qritile-600 font-bold block text-xl mb-1.5'>{numeral(hardCodedMetrics.versions).format('0,0')}</div>
                  <div className='text-sm block font-light'>Versions</div>
                </div>
                <div className='text-center px-3 mr-6'>
                  <div className='text-qritile-600 font-bold block text-xl mb-1.5'>{numeral(hardCodedMetrics.size).format('0.0b')}</div>
                  <div className='text-sm block font-light'>Public Data</div>
                </div>
              </div>
            </div>
            <div className='text-right mx-6 flex items-center'>
              <img className='inline' src='/img/new-docs/homepage/splash-data-snuggle.svg'/>
            </div>
          </div>
          <img className='absolute -left-10 z-0 transform origin-left scale-75 md:transform-none' src='/img/new-docs/homepage/yellow-aura-1.svg'/>
          <div className='pt-20 text-center py-10 z-10 relative'>
            <div className='text-qritile-600 text-4xl font-extrabold mb-4'>Let&apos;s rethink what datasets can do</div>
            <div className='text-qrigray-700 text-lg font-light'>Qri is an all new suite of tools for doing more with datasets</div>
          </div>

          {/* Begin Feature Carousel */}
          <div className='text-center z-10 relative'>
            <div className='flex mb-6 md:mb-16'>
              {
                features.map(({ id, title, icon }) => {
                  const isSelected = id === selectedFeature.id
                  return (
                    <Button
                      key={title}
                      icon={ icon }
                      className='mr-3 bg-white'
                      size = 'lg'
                      type={isSelected ? 'secondary-outline' : 'light'}
                      onClick={() => {
                        setSelectedFeatureId(id)
                      }}
                      block
                    >
                      {title}
                    </Button>
                  )
                })
              }
            </div>

            <div className='flex flex-wrap-reverse md:flex-nowrap items-center -mx-8 mb-16 md:mb-0 pb-16'>
              <div className='w-full md:w-2/4 lg:w-5/12 text-left mx-8'>
                <div className='font-bold text-3xl text-qritile-600 mb-6'>{selectedFeature.title}</div>
                <div className='text-lg lg:text-xl font-light mb-7'>{selectedFeature.description}</div>
                <Link to={selectedFeature.link}>
                  <Button type='secondary' size='lg'>{selectedFeature.buttonText}</Button>
                </Link>
              </div>
              <div className='w-full md:w-2/4 lg:w-7/12 flex-grow mb-6 md:mb-0 mx-8'>
                <img src={`/img/new-docs/homepage/feature-${selectedFeature.id}.svg`}/>
              </div>
            </div>
          </div>
        </div>
        {/* End Feature Carousel */}
        {/* Begin Featured Datasets */}
        <div className='bg-qrigray-100 py-14 relative mb-28' style={{
          backgroundImage: 'url(\'/img/new-docs/dot-white.svg\')'
        }}>
          <div className='absolute z-0 top-20 md:-top-1 transform origin-top-left scale-150 md:transform-none'>
            <img src='/img/new-docs/homepage/featured-nodes.svg'/>
          </div>
          <div className='px-5 md:px-10 lg:px-20 relative z-20'>
            <div className='text-right'>
              <div className='inline-block mb-6'>
                <div className='text-qripink-600 text-4xl lg:text-5xl font-black mb-7'>Featured Datasets</div>
                <SearchBox size='lg' onSubmit={handleSearchSubmit} placeholder='Search qri.cloud for datasets'/>
              </div>
            </div>
            <div className='flex flex-wrap md:flex-nowrap -mx-3'>
              <div className='flex flex-col md:flex-row'>
                <div className='w-full md:w-1/3'>
                  <DatasetCard
                    title='NYC Subway Turnstile Counts - 2021'
                    name='turnstile_daily_counts_2021'
                    description='NYC Subway Turnstile Counts Data aggregated by day and station complex for the year 2021. Updated weekly.'
                    updatedAt={new Date('Thu Oct 21 2021 15:59:46 GMT-0400')}
                    username='nyc-transit-data'
                    userAvatar='https://qri-user-images.storage.googleapis.com/1570029763701.png'
                    className='mx-3 mb-6 md:mb-0'
                  />
                </div>
                <div className='w-full md:w-1/3'>
                  <DatasetCard
                    title='World Bank Population'
                    name='world_bank_population'
                    description='( 1 ) United Nations Population Division. World Population Prospects: 2017 Revision. ( 2 ) Census reports and other statistical publications from national statistical offices, ( 3 ) Eurostat: Demographic Statistics, ( 4 ) United Nations Statistical Division. Population and Vital Statistics Reprot ( various years ), ( 5 ) U.S. Census Bureau: International Database, and ( 6 ) Secretariat of the Pacific Community: Statistics and Demography Programme.'
                    updatedAt={new Date('Tue Aug 03 2020 20:03:46 GMT-0400')}
                    username='b5'
                    userAvatar='https://qri-user-images.storage.googleapis.com/1570029763701.png'
                    className='mx-3 mb-6 md:mb-0'
                  />
                </div>
                <div className='w-full md:w-1/3'>
                  <DatasetCard
                    title='New York City Population by Borough, 1950 - 2040'
                    name='new-york-city-population-by-borough-1950-2040'
                    description='Unadjusted decennial census data from 1950-2000 and projected figures from 2010-2040: summary table of New York City population numbers and percentage share by Borough, including school-age (5 to 17), 65 and Over, and total population.'
                    updatedAt={new Date('Tue Nov 24 2020 16:16:46 GMT-0400')}
                    username='nyc-open-data-archive'
                    userAvatar='https://qri-user-images.storage.googleapis.com/1570029763701.png'
                    className='mx-3 mb-6 md:mb-0'
                  />
                </div>
              </div>
              <div className='w-full md:w-24 text-center flex-shrink-0'>
                <Link to='https://qri.cloud' className='mx-auto sm:h-full'>
                  <div className='hidden md:flex bg-qripink-600 hover:bg-qripink-700 text-white text-base font-semibold align-middle rounded-lg items-center px-2 text-center mx-auto md:mx-3 h-full'>
                    <div>Explore<br/>More</div>
                  </div>
                  <Button size='lg' type='secondary' className='visible sm:hidden'>
                    <div>Explore More</div>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* End Featured Datasets */}

        {/* Begin Videos */}
        {/*
          <div className='py-48 relative'>
            <div className='absolute right-0 -bottom-16 z-0 transform origin-bottom-right scale-75 md:transform none'>
              <img src='/img/new-docs/homepage/yellow-aura-2.svg'/>
            </div>
            <div className='hidden md:block absolute right-40 top-60 z-0'>
              <img src='/img/new-docs/homepage/nodes-2.svg'/>
            </div>
            <div className='px-5 md:px-10 lg:px-20 relative flex flex-wrap'>
              <div className='md:w-5/12 text-left pr-16 flex items-center mb-16'>
                <div>
                  <div className='font-bold text-3xl md:text-4xl text-qritile-600 mb-6'>Videos</div>
                  <div className='text-lg md:text-xl font-light mb-7'>Get up and running quickly with these helpful videos.</div>
                  <Button type='secondary'>Check out Youtube</Button>
                </div>
              </div>
              <div className='md:w-7/12'>
                <div className='text-center flex flex-col'>
                  <VideoContainer
                    id='dhdorFezaEc'
                    title='Qri Desktop Demo: Exploring the Collection View'
                    className='mb-7 self-end'
                  />
                  <VideoContainer
                    id='WKayeh0OAes'
                    title='Qri Desktop Demo - Pull and Sync With Qri.Cloud'
                    className='self-start'
                  />
                </div>
              </div>
            </div>
          </div>
          */}
        {/* End Videos */}
        {/* Begin Laptop Thing */}
        <div className='relative'>
          <img src='/img/new-docs/homepage/circle-1.svg' className='absolute z-10 transform origin-bottom-right scale-50 md:transform-none' style={{
            top: -214,
            right: 0
          }}/>
          <img src='/img/new-docs/homepage/circle-2.svg' className='absolute z-10 hidden md:block' style={{
            top: -72,
            right: 98
          }}/>
          <div className='px-5 md:px-10 lg:px-20 relative w-full'>
            <img src='/img/new-docs/homepage/linked-nodes.svg' className='hidden md:block absolute z-5' style={{
              top: -300,
              left: -10
            }}/>
            <div className='bg-qritile-600 pt-10 md:pt-24 px-6 md:px-40 pb-20 md:pb-48 w-full text-white text-center relative'>
              <img src='/img/new-docs/homepage/donut-pink.svg' className='absolute -left-1.5 -top-1.5'/>
              <img src='/img/new-docs/homepage/donut-orange.svg' className='absolute -right-1.5 -top-1.5'/>
              <img src='/img/new-docs/homepage/donut-pink.svg' className='absolute -right-1.5 -bottom-1.5'/>
              <img src='/img/new-docs/homepage/donut-orange.svg' className='absolute -left-1.5 -bottom-1.5'/>
              <div className='text-3xl md:text-4xl font-bold mb-5'>Work Smarter with Data on Qri Cloud</div>
              <div className='text-base md:text-lg font-light mb-5'>Use our code editor and CI-style automation to keep your datasets fresh and tidy</div>
              <Link to='https://qri.cloud/signup' size='lg'>
                <Button type='secondary' size='lg'>Try it Now</Button>
              </Link>
            </div>
            <div className='relative -top-12 md:-top-36'>
              <img src='/img/new-docs/homepage/laptop.svg' className='mx-auto'/>
            </div>
          </div>
        </div>
        {/* End Laptop Thing */}
      </div>
    </>
  )
}

export default IndexPage
