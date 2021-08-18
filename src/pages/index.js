import React, { useState } from 'react'
import classNames from 'classnames'

import Button from '../components/Button'
import Icon from '../components/Icon'
import RelativeTimestamp from '../components/RelativeTimestamp'
import VideoContainer from '../components/VideoContainer'
import SearchInput from '../components/SearchInput'

// the first argument in track() becomes the google analytics 'Action' property after passing through segment
// all events are of Action 'Homepage'
const fireEvent = (category, label) => {
  console.log('!', category, label)
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

  const DatasetCard = ({ title, description, updatedAt, username, userAvatar, className }) => (
    <div className={classNames('p-4 bg-white rounded-lg', className)} style={{
      boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.15)'
    }}>
      <div className='text-qrigray-1000 text-lg font-semibold mb-1'>{title}</div>
      <div className='text-qrigray-400 text-sm font-light mb-2'>{description}</div>
      <div className='flex'>
        <div className='text-qrigray-1000 flex items-center mr-3'>
          <Icon icon='clock' size='sm' className='mr-1.5'/>
          <div className='text-xs font-light'>
            <RelativeTimestamp timestamp={updatedAt}/>
          </div>
        </div>
        <div className='text-qrigray-1000 flex items-center'>
          <div className='rounded-xl inline-block mr-1.5 bg-cover flex-shrink-0' style={{
            height: 18,
            width: 18,
            backgroundImage: `url(${userAvatar})`
          }}></div>
          <div className='text-xs font-light'>
            {username}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className='pt-24 overflow-x-hidden'>
      <div className='max-w-screen-xl mx-auto pt-24'>
        <div className='flex'>
          <div className='inline-block'>
            <div className='border-b-2 border-qrigray-200 mb-8'>
              <div className='relative -left-10'>
                <img src='/img/new-docs/homepage/nodes-1.svg'/>
              </div>
              <div className='text-qritile-600 font-extrabold text-6xl px-3 py-1 border-2 border-qrigray-100 bg-white inline-block relative mb-5'>
                Data with Friends
              </div>
              <div className='pl-3'>
                <div className='flex mb-8'>
                  <div className='text-xl w-0 flex-grow'>Qri helps you clean, version, organize, and share datasets.  Free & Open Source</div>
                </div>
                <Button type='secondary' className='mb-16'>Get Started</Button>
              </div>
            </div>
            <div className='flex'>
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
          <div className='flex-grow text-right'>
            <img className='inline' src='/img/new-docs/homepage/splash-data-snuggle.svg'/>
          </div>
        </div>
        <div className='absolute -left-10 z-0'>
          <img src='/img/new-docs/homepage/yellow-aura-1.svg'/>
        </div>
        <div className='pt-20 text-center py-10 z-10'>
          <div className='text-qritile-600 text-4xl font-extrabold mb-4'>Let&apos;s rethink what datasets can do</div>
          <div className='text-qrigray-700 text-lg font-light'>Qri is an all new suite of tools for doing more with datasets</div>
        </div>

        {/* Begin Feature Carousel */}
        <div className='text-center z-10 relative'>
          <div className='flex mb-16'>
            {
              features.map(({ id, title, icon }) => {
                const isSelected = id === selectedFeature
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

          <div className='flex items-center'>
            <div className='w-5/12 text-left pr-16'>
              <div className='font-bold text-3xl text-qritile-600 mb-6'>{selectedFeature.title}</div>
              <div className='text-xl font-light mb-7'>{selectedFeature.description}</div>
              <Button type='secondary'>{selectedFeature.buttonText}</Button>
            </div>
            <div className='flex-grow'>
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
        <div className='absolute z-0 -top-1'>
          <img src='/img/new-docs/homepage/featured-nodes.svg'/>
        </div>
        <div className='max-w-screen-xl mx-auto relative '>
          <div className='text-right'>
            <div className='inline-block mb-6'>
              <div className='text-qripink-600 text-5xl font-black mb-7'>Featured Datasets</div>
              <SearchInput />
            </div>
          </div>
          <div className='flex'>
            <div className='flex'>
              <DatasetCard
                title='Bot Sentinel Trolls/Bots'
                description='This is an incomplete list of Twitter trolls verified by Bot Sentinel, updated weekly.'
                updatedAt={new Date('Tue Jul 13 2021 14:27:46 GMT-0400')}
                username='chriswhong'
                userAvatar='https://qri-user-images.storage.googleapis.com/1570029763701.png'
                className='mr-7'
              />
              <DatasetCard
                title='Bot Sentinel Trolls/Bots'
                description='This is an incomplete list of Twitter trolls verified by Bot Sentinel, updated weekly.'
                updatedAt={new Date('Tue Jul 13 2021 14:27:46 GMT-0400')}
                username='chriswhong'
                userAvatar='https://qri-user-images.storage.googleapis.com/1570029763701.png'
                className='mr-7'
              />
              <DatasetCard
                title='Bot Sentinel Trolls/Bots'
                description='This is an incomplete list of Twitter trolls verified by Bot Sentinel, updated weekly.'
                updatedAt={new Date('Tue Jul 13 2021 14:27:46 GMT-0400')}
                username='chriswhong'
                userAvatar='https://qri-user-images.storage.googleapis.com/1570029763701.png'
                className='mr-7'
              />
              <div className='bg-qripink-600 text-white text-sm font-medium align-middle rounded-lg w-28 flex items-center px-2 text-center'>
                <div>Explore More...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Featured Datasets */}

      {/* Begin Videos */}
      <div className='py-48 relative'>
        <div className='absolute right-0 top-48 z-0'>
          <img src='/img/new-docs/homepage/yellow-aura-2.svg'/>
        </div>
        <div className='max-w-screen-xl mx-auto relative flex '>
          <div className='w-5/12 text-left pr-16 flex items-center'>
            <div>
              <div className='font-bold text-4xl text-qritile-600 mb-6'>Videos</div>
              <div className='text-xl font-light mb-7'>Get up and running quickly with these helpful videos.</div>
              <Button type='secondary'>Check out Youtube</Button>
            </div>
          </div>
          <div className='w-7/12'>
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
        <img src='/img/new-docs/homepage/circles.svg' className='absolute z-10' style={{
          top: -214,
          right: 0
        }}/>
        <div className='max-w-screen-xl mx-auto relative w-full'>
          <img src='/img/new-docs/homepage/linked-nodes.svg' className='absolute z-5' style={{
            top: -300,
            left: -88
          }}/>
          <div className='bg-qritile-600 pt-24 pb-48 w-full text-white text-center relative'>
            <img src='/img/new-docs/homepage/donut-pink.svg' className='absolute -left-1.5 -top-1.5'/>
            <img src='/img/new-docs/homepage/donut-orange.svg' className='absolute -right-1.5 -top-1.5'/>
            <img src='/img/new-docs/homepage/donut-pink.svg' className='absolute -right-1.5 -bottom-1.5'/>
            <img src='/img/new-docs/homepage/donut-orange.svg' className='absolute -left-1.5 -bottom-1.5'/>
            <div className='text-4xl font-bold mb-5'>Build and Manage Datasets with Qri</div>
            <div className='text-lg font-light mb-5'>Build and Manage Datasets with Qri</div>
            <Button type='primary-outline' className='mr-5'>Learn More</Button>
            <Button type='secondary'>Download</Button>
          </div>
          <div className='relative -top-36'>
            <img src='/img/new-docs/homepage/laptop.svg' className='mx-auto'/>
          </div>
        </div>
      </div>
      {/* Begin Laptop Thing */}
    </div>
  )
}

export default IndexPage
