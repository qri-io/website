import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import DatasetSummary from './DatasetSummary'

const FeaturedDatasets = () => (
  <StaticQuery
    query={
      graphql`
      query CloudFeaturedQuery {
        allFeatured(filter: {id: {ne: "dummy"}}) {
          edges {
             node {
               path
               peername
               name
               meta {
                 description
                 qri
                 title
                 keywords
               }
               structure {
                 checksum
                 depth
                 entries
                 errCount
                 format
                 length
                 qri
               }
               commit {
                 message
                 path
                 qri
                 signature
                 timestamp
                 title
               }
               stats {
                 download_count
                 pull_count
                 view_count
               }
               issue_stats {
                 open_issues
                 closed_issues
               }
             }
           }
        }
      }
    `}
    render={(data) => {
      const datasets = data.allFeatured.edges

      const listItems = datasets.map((dataset) => (
        <div key={dataset.path} className='card-col col-12 col-md-6'>
          <DatasetSummary dataset={dataset.node}/>
        </div>
      ))

      return (
        <div className='featured-datasets list row d-flex align-items-stretch'>
          {(listItems.length !== 0) ? listItems : <h4>No Featured Datasets Found</h4>}
        </div>
      )
    }}
  />
)

export default FeaturedDatasets
