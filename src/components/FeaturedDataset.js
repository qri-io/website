import React from 'react'
import numeral from 'numeral'
import moment from 'moment'

import ExternalLink from './ExternalLink'

const FeaturedDataset = ({ dataset, onClick }) => {
  const { peername, name, meta, structure, commit } = dataset

  const description = meta && meta.description ? meta.description : 'No description'

  const title = meta && meta.title ? meta.title : `No Title - ${name}`

  const { entries, length } = structure
  const { timestamp } = commit

  let keywordElements = null

  if (meta && meta.keywords) {
    keywordElements = meta.keywords.map((keyword) => (
      <div key={keyword} className='keyword badge badge-secondary mr-2'>{keyword}</div>
    ))
  }

  return (
    <div className='card featured-dataset index-card index-shadow' onClick={onClick}>
      <ExternalLink to={`https://qri.cloud/${peername}/${name}`}>
        <div className='card-body px-3'>
          <div className='row'>
            <div className='col-12'>
              <div className='dataset-reference'>
                <p className='dataset-reference-item'>{peername}/</p>
                <p className='dataset-reference-item'>{name}</p>
              </div>
              <div className='pb-1'>
                <span className='details mr-2'>{moment(timestamp).fromNow()}</span>
                <span className='details mr-2'>{numeral(length).format('0.0b')}</span>
                <span className='details mr-2'>{numeral(entries).format('0,0')} entries</span>
              </div>
              <div className='dataset-keywords mb-3'>
                { keywordElements }
              </div>
              <div className='dataset-title title mb-2'>{ title }</div>
              <div className='dataset-description'>{ description }</div>
            </div>
          </div>
        </div>
      </ExternalLink>
    </div>
  )
}

export default FeaturedDataset
