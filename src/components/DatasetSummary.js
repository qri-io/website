import React from 'react'
import numeral from 'numeral'

import Icon from './Icon'
import ListItem from './ListItem'
import RelativeTimestamp from './RelativeTimestamp'

const DatasetSummary = ({ dataset }) => {
  const { path, peername, name, meta, structure, commit, stats, issue_stats: issueStats } = dataset
  const title = meta && meta.title ? meta.title : `No Title - ${name}`
  const description = meta && meta.description ? meta.description : 'No Description'

  const { entries, format, length } = structure
  const { timestamp } = commit
  const { download_count: downloadCount, pull_count: pullCount } = stats
  const displayDownloads = downloadCount + pullCount

  let keywordElements

  if (meta && meta.keywords) {
    keywordElements = meta.keywords.map((keyword) => (
      <div key={keyword} className='keyword badge badge-secondary'>{keyword}</div>
    ))
  }

  return (
    <ListItem key={path} link={`https://qri.cloud/${peername}/${name}`}>

      <div className='row dataset-summary'>
        <div className='col-12 pb-1'>
          <div className='row'>
            <div className='dataset-summary-reference col-8'>
              {peername}/{name}
            </div>
            <div className='metrics text-right col-4'>
              {issueStats && (issueStats.open_issues > 0) && (
                <div className='metric' title='open issues'>
                  <Icon icon='circle' />&nbsp;&nbsp;{issueStats.open_issues}
                </div>
              )}
              <div className='metric' title='downloads'>
                <Icon icon='download' />&nbsp;&nbsp;{displayDownloads}
              </div>
            </div>
          </div>
        </div>
        <div className='title col col-12'>
          { title }
        </div>
        <div className='description col-12 mb-2'>
          {description}
        </div>
        <div className='col-12 col-md-6 mb-2 mb-md-0'>
          <span className='dataset-details'><Icon icon='clock' size='sm'/><RelativeTimestamp timestamp={timestamp}/></span>
          <span className='dataset-details'><Icon icon='hdd' size='sm'/>{numeral(length).format('0.0b')}</span>
          <span className='dataset-details'><Icon icon='bars' size='sm'/>{numeral(entries).format('0,0')} rows</span>
          <span className='dataset-details'><Icon icon='file' size='sm'/>{format}</span>
        </div>
        <div className='keyword-container col-12 col-md-6 text-md-right'>
          {keywordElements}
        </div>
      </div>
    </ListItem>
  )
}

export default DatasetSummary
