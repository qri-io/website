import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import ExternalLink from './ExternalLink'

const TeamMemberBio = (props) => {
  const {
    name,
    title,
    photo,
    linkedin,
    twitter,
    github,
    children
  } = props
  return (
    <div className='row team-member-bio'>
      <div className='image-col col-8 offset-2 col-sm-3 offset-sm-0 text-center'>
        <div
          className='team-member-photo'
          style={{
            backgroundImage: `url(/img/photos/${photo})`,
            width: '100%',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            borderRadius: '50%',
            marginBottom: '18px'
          }}
        />
        <p className='name'><strong>{name}</strong></p>
        <p className='title'>{title}</p>
        <div className='social'>
          {github && (
            <ExternalLink to={`https://github.com/${github}`}>
              <FontAwesomeIcon icon={faGithub}/>
            </ExternalLink>
          )}
          {twitter && (
            <ExternalLink to={`https://twitter.com/${twitter}`}>
              <FontAwesomeIcon icon={faTwitter}/>
            </ExternalLink>
          )}
          {linkedin && (
            <ExternalLink to={`https://www.linkedin.com/in/${linkedin}`}>
              <FontAwesomeIcon icon={faLinkedinIn}/>
            </ExternalLink>
          )}
        </div>
      </div>
      <div className='col-12 col-sm-9 text-center text-sm-left bio'>
        {children}
      </div>
    </div>
  )
}

export default TeamMemberBio
