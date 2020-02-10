import React from 'react'
import moment from 'moment'
import numeral from 'numeral'

const QriDatasetWidget = (props) => {
  const {
    datasetName,
    title,
    lastCommit,
    size,
    entries,
    commits,
    hash,
    views,
    clones
  } = props

  const headerContainerStyle = {
    maxWidth: '940px',
    minHeight: '130px',
    backgroundColor: '#E9E9E9',
    display: 'flex'
  }

  const containerStyle = {
    maxWidth: '940px',
    minHeight: '130px',
    backgroundColor: '#F0F0F0',
    display: 'flex',
    flexShrink: 0
  }

  const logoStyle = {
    flexBasis: '88px',
    textAlign: 'center',
    padding: '24px 0'
  }

  const mainStyle = {
    flex: '10 1 0%',
    padding: '24px 24px 0px 24px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }

  const cloneButtonStyle = {
    flex: '1 0 216px',
    padding: '13px 24px 13px 0',
    textAlign: 'right'
  }

  const detailItemStyle = {
    display: 'inline-block',
    color: '#B1B1B1',
    fontSize: '0.9rem',
    marginRight: '15px'
  }

  const logoContent = (
    <>
      <img src='https://qri.cloud/assets/qri-blob-logo-large.png' style={{
        width: '45px'
      }}/>
      <div style={{
        fontWeight: 700,
        color: '#666',
        fontSize: '.88rem'
      }}>qri.io</div>
    </>
  )

  const cloneContent = (
    <>
      <div className='dataset-details' style={{ marginBottom: '9px' }}>
        <div className='dataset-detail-item' style={{
          ...detailItemStyle,
          marginRight: 0,
          marginLeft: '15px'
        }}>{views} views</div>
        <div className='dataset-detail-item' style={{
          ...detailItemStyle,
          marginRight: 0,
          marginLeft: '15px'
        }}>{clones} clones</div>
      </div>
      <a href={`https://qri.cloud/${datasetName}`}>
        <div className='btn btn-primary' style={{
          fontFamily: 'Avenir Next',
          fontWeight: 700,
          fontSize: '.8rem',
          padding: '16px 27px',
          borderRadius: '6px'
        }}>
          Clone This Dataset
        </div>
      </a>
    </>
  )

  return (
    <div className='qri-dataset-widget' style={{ marginBottom: '30px' }}>
      <div className='full-width-container' style={containerStyle}>
        <div className='logo d-none d-lg-block' style={logoStyle}>
          {logoContent}
        </div>
        <div className='main' style={mainStyle}>
          <div className='dataset-name' style={{
            fontWeight: 500,
            fontSize: '1.1rem',
            lineHeight: '18px',
            marginBottom: '9px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            <a href={`https://qri.cloud/${datasetName}`}>{datasetName}</a>
          </div>
          <div className='dataset-title' style={{
            fontWeight: 700,
            color: '#595959',
            fontSize: '1.2rem',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>{title}</div>
          <div className='dataset-details' style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            <div className='dataset-detail-item' style={detailItemStyle}>{moment(lastCommit).fromNow()}</div>
            <div className='dataset-detail-item' style={detailItemStyle}>{size}</div>
            <div className='dataset-detail-item' style={detailItemStyle}>{numeral(entries).format('0,0')} entries</div>
            <div className='dataset-detail-item' style={detailItemStyle}>{`${commits} commit${(commits > 1) ? 's' : ''}`}</div>
            <div className='dataset-detail-item' style={{
              ...detailItemStyle,
              fontFamily: 'monospace'
            }}>{hash.substring(0, 9)}</div>
          </div>
        </div>
        <div className='clone-button d-none d-lg-block' style={cloneButtonStyle}>
          {cloneContent}
        </div>
      </div>
      <div className='header-container d-lg-none' style={headerContainerStyle}>
        <div className='logo' style={logoStyle}>
          {logoContent}
        </div>
        <div className='clone-button' style={cloneButtonStyle}>
          {cloneContent}
        </div>
      </div>
    </div>
  )
}

export default QriDatasetWidget
