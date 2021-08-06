import React, { useState } from 'react'
import classNames from 'classnames'

import ExternalLink from '../components/ExternalLink'
import Button from '../components/Button'
import Icon from '../components/Icon'

// the first argument in track() becomes the google analytics 'Action' property after passing through segment
// all events are of Action 'Homepage'
const fireEvent = (category, label) => {
  console.log('!', category, label)
  window.analytics.track('Homepage', {
    category,
    label
  })
}

const featuredVideoId = 'GXNfxbKYLHM'

const videos = [
  {
    id: 'dhdorFezaEc',
    title: 'Qri Desktop Demo: Exploring the Collection View'
  },
  {
    id: 'WKayeh0OAes',
    title: 'Qri Desktop Demo - Pull and Sync With Qri.Cloud'
  },
  {
    id: 'L5ud3kwI4OY',
    title: 'Webinar: Smarter Dataset Management with Qri'
  },
  {
    id: 'P2qeY2nPK3Q',
    title: 'Demo: Using the work-in-progress Qri Python client in Jupyter Notebooks'
  }
]

const videoList = videos.map(({ id, title }) => {
  return (
    <ExternalLink key={id} to={`https://www.youtube.com/watch?v=${id}`}>
      <div className='p-2 row video-thumbnail'>
        <div className='col-3 col-md-4 p-0'>
          <img src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`} />
        </div>
        <div className='col-9 col-md-8 pl-2 my-auto'>
          <span className=''>{title}</span>
        </div>
      </div>
    </ExternalLink>
  )
})

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

      <div className='pt-20 text-center py-10'>
        <div className='text-qritile-600 text-4xl font-extrabold mb-4'>Let&apos;s rethink what datasets can do</div>
        <div className='text-qrigray-700 text-lg font-light'>Qri is an all new suite of tools for doing more with datasets</div>
      </div>

      <div className='text-center'>
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
  )
}

export default IndexPage
