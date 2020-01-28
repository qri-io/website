import React from 'react'
import { Link } from 'gatsby'

const JobRow = ({ title, location, team, link }) => {
  return (
    <div className='row job-row'>
      <div className='col-9'>
        <h5>{title}</h5>
        <div className='details'>{location} &nbsp; {team}</div>
      </div>
      <div className='col-3 text-right'>
        <Link to={link}>
          <div className='btn btn-primary'>VIEW JOB</div>
        </Link>
      </div>
    </div>
  )
}

export default JobRow
