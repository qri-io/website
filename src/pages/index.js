import React, { useState } from 'react'
import classNames from 'classnames'

import Button from '../components/Button'
import Icon from '../components/Icon'
import VideoContainer from '../components/VideoContainer'
import SearchInput from '../components/SearchInput'
import DatasetCard from '../components/DatasetCard'

// the first argument in track() becomes the google analytics 'Action' property after passing through segment
// all events are of Action 'Homepage'
const fireEvent = (category, label) => {
  window.analytics.track('Homepage', {
    category,
    label
  })
}

const IndexPage = () => {
  const features = [
    {
      id: 'version',
      title: 'Version',
      description: 'Compare one version to any other. Understand how datasets evolve with commit histories and diffing tools.',
      icon: 'version',
      buttonText: 'Try it now!',
      image: ''
    },
    {
      id: 'automate',
      title: 'Automate',
      description: 'Bind code to data with transform scripts, and let your datasets update themselves.',
      icon: 'automate',
      buttonText: 'Try Qri Workflows',
      image: ''
    }
  ]

  const [selectedFeatureId, setSelectedFeatureId] = useState('version')

  const selectedFeature = features.find(d => d.id === selectedFeatureId)

  return (
    <>
      <div className='pt-0 md:pt-20 overflow-x-hidden'>
        <div className='px-5 md:px-10 lg:px-20 z-10'>
          <div className='flex -mx-6'>
            <div className='inline-block mx-6'>
              <div className='-mx-1.5'>
                <img className='relative left-40 transform scale-75 md:transform-none md:-left-10' src='/img/new-docs/homepage/nodes-1.svg'/>
                <div className='text-qritile-600 font-extrabold text-5xl md:text-6xl px-1.5 py-1 border-0 md:border-2 border-qrigray-100 bg-none md:bg-white inline-block relative mb-5'>
                Data with Friends
                </div>
                <div className='px-1.5'>
                  <div className='flex mb-5 md:mb-8'>
                    <div className='text-lg md:text-xl w-0 flex-grow'>Qri helps you clean, version, organize, and share datasets.  Free & Open Source</div>
                  </div>
                  <Button type='secondary' className='mb-8'>Get Started</Button>
                </div>
                <div className='border-b-2 border-qrigray-200 mb-8 mx-1.5'></div>
              </div>
              <div className='flex mb-10 md:mb-0'>
                <div className='text-center px-3 mr-6'>
                  <div className='text-qritile-600 font-bold block text-xl mb-1.5'>4,301</div>
                  <div className='text-xs block font-light'>Datasets</div>
                </div>
                <div className='text-center px-3 mr-6'>
                  <div className='text-qritile-600 font-bold block text-xl mb-1.5'>10,203</div>
                  <div className='text-xs block font-light'>Versions</div>
                </div>
                <div className='text-center px-3 mr-6'>
                  <div className='text-qritile-600 font-bold block text-xl mb-1.5'>100Gb</div>
                  <div className='text-xs block font-light'>Public Data</div>
                </div>
              </div>
            </div>
            <div className='flex-grow text-right mx-6'>
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
                    <button
                      key={title}
                      className={classNames('flex-grow rounded-lg py-3 mx-3 bg-white text-sm font-medium border-qripink-600 hover:border hover:text-qripink-600 transition-all duration-100', {
                        'border text-qripink-600': isSelected,
                        'text-qrigray-400 ': !isSelected
                      })}
                      style={{
                        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.15)'
                      }}
                      onClick={() => { setSelectedFeatureId(id) }}
                    >
                      <Icon icon={icon} /> {title}
                    </button>
                  )
                })
              }
            </div>

            <div className='flex flex-wrap-reverse md:flex-nowrap items-center -mx-8 mb-16 md:mb-0 pb-16'>
              <div className='w-full md:w-2/4 lg:w-5/12 text-left mx-8'>
                <div className='font-bold text-3xl text-qritile-600 mb-6'>{selectedFeature.title}</div>
                <div className='text-lg lg:text-xl font-light mb-7'>{selectedFeature.description}</div>
                <Button type='secondary'>{selectedFeature.buttonText}</Button>
              </div>
              <div className='w-full md:w-2/4 lg:w-7/12 flex-grow mb-6 md:mb-0 mx-8'>
                <img src={`/img/new-docs/homepage/feature-${selectedFeature.id}.svg`}/>
              </div>
            </div>
          </div>
        </div>
        {/* End Feature Carousel */}
        {/* Begin Featured Datasets */}
        <div className='bg-qrigray-100 py-14 relative' style={{
          backgroundImage: 'url(\'/img/new-docs/dot-white.svg\')'
        }}>
          <div className='absolute z-0 top-20 md:-top-1 transform origin-top-left scale-150 md:transform-none'>
            <img src='/img/new-docs/homepage/featured-nodes.svg'/>
          </div>
          <div className='px-5 md:px-10 lg:px-20 relative '>
            <div className='text-right'>
              <div className='inline-block mb-6'>
                <div className='text-qripink-600 text-4xl lg:text-5xl font-black mb-7'>Featured Datasets</div>
                <SearchInput />
              </div>
            </div>
            <div className='flex flex-wrap md:flex-nowrap -mx-3'>
              <DatasetCard
                title='Bot Sentinel Trolls/Bots'
                description='This is an incomplete list of Twitter trolls verified by Bot Sentinel, updated weekly.'
                updatedAt={new Date('Tue Jul 13 2021 14:27:46 GMT-0400')}
                username='chriswhong'
                userAvatar='https://qri-user-images.storage.googleapis.com/1570029763701.png'
                className='mx-3 mb-6 md:mb-0'
              />
              <DatasetCard
                title='Bot Sentinel Trolls/Bots'
                description='This is an incomplete list of Twitter trolls verified by Bot Sentinel, updated weekly.'
                updatedAt={new Date('Tue Jul 13 2021 14:27:46 GMT-0400')}
                username='chriswhong'
                userAvatar='https://qri-user-images.storage.googleapis.com/1570029763701.png'
                className='mx-3 mb-6 md:mb-0'
              />
              <DatasetCard
                title='Bot Sentinel Trolls/Bots'
                description='This is an incomplete list of Twitter trolls verified by Bot Sentinel, updated weekly.'
                updatedAt={new Date('Tue Jul 13 2021 14:27:46 GMT-0400')}
                username='chriswhong'
                userAvatar='https://qri-user-images.storage.googleapis.com/1570029763701.png'
                className='mx-3 mb-6 md:mb-0'
              />
              <div className='bg-qripink-600 text-white text-sm font-medium align-middle rounded-lg w-28 flex items-center px-2 text-center mx-auto md:mx-3'>
                <div>Explore More...</div>
              </div>
            </div>
          </div>
        </div>
        {/* End Featured Datasets */}

        {/* Begin Videos */}
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
            <div className='bg-qritile-600 pt-10 md:pt-24 px-6 pb-20 md:pb-48 w-full text-white text-center relative'>
              <img src='/img/new-docs/homepage/donut-pink.svg' className='absolute -left-1.5 -top-1.5'/>
              <img src='/img/new-docs/homepage/donut-orange.svg' className='absolute -right-1.5 -top-1.5'/>
              <img src='/img/new-docs/homepage/donut-pink.svg' className='absolute -right-1.5 -bottom-1.5'/>
              <img src='/img/new-docs/homepage/donut-orange.svg' className='absolute -left-1.5 -bottom-1.5'/>
              <div className='text-3xl md:text-4xl font-bold mb-5'>Build and Manage Datasets with Qri</div>
              <div className='text-base md:text-lg font-light mb-5'>Build and Manage Datasets with Qri</div>
              <Button type='primary-outline' className='mr-5'>Learn More</Button>
              <Button type='secondary'>Download</Button>
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
