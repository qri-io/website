import React from 'react'
import classNames from 'classnames'

import Link from '../components/Link'
import Icon from '../components/Icon'
import PhotoRing from '../components/images/PhotoRing'
import HappyUsers from '../components/images/HappyUsers'

const teamBios = [
  {
    name: "Brendan O'Brien",
    title: 'Founder & Caretaker',
    photo: 'brendan.png',
    github: 'b5',
    twitter: 'b_fiive',
    description: () => (
      <>
        <div className='mb-4 last:mb-0'>
          Brendan is an open-source software and open data evangelist. He founded Qri during the Data Rescue movement and is responsible for Qri’s code base, road map and growth. He has over a decade of experience in software development, technical due diligence, graphic design and visual arts.
        </div>

        <div className='mb-4 last:mb-0'>
          Brendan helped launch <Link to="https://datatogether.org">Datatogether.org</Link>, a network of communities, data scientists, and developers dedicated to promoting collective data stewardship. He is also a leading member the Environmental Data and Governance Initiative (EDGI), founded to preserve at-risk government environmental data.
        </div>

        <div className='mb-4 last:mb-0'>
          In his free time Brendan codes and competes as a not-so-competitive cyclist.
        </div>
      </>
    )
  },
  {
    name: 'Rico Gardaphe',
    title: 'Operations & Business Development',
    photo: 'rico.png',
    github: 'rgardaphe',
    linkedin: 'ricogardaphe',
    description: () => (
      <>
        <div className='mb-4 last:mb-0'>
          Rico supports Qri’s user community, client projects, and internal operations. He has over a decade of experience across early-stage tech startups (ML/human-in-the-loop data enrichment), strategy consulting, and politics/government. Rico served in the Obama White House from 2009 - 2013.
        </div>

        <div className='mb-4 last:mb-0'>
          In his free time Rico perfects his homemade limoncello recipe and plays baseball.
        </div>
      </>
    )
  },
  {
    name: 'Kasey Huizinga',
    title: 'Developer',
    photo: 'kasey.png',
    github: 'ramfox',
    description: () => (
      <>
        <div className='mb-4 last:mb-0'>
          Kasey is a full stack developer, turning qri code into usable UI/UX in Qri&apos;s frontend. She maintains the code base, writes and films user tutorials and demos, and kills bugs. She is fluent in Go, python, Javascript, React, electron and p2p connectivity and communication architecture.
        </div>

        <div className='mb-4 last:mb-0'>
          In her free time, Kasey performs in plays and musical theater acts across New York City.
        </div>
      </>
    )
  },
  {
    name: 'Dustin Long',
    title: 'Developer',
    photo: 'dustin.png',
    github: 'dustmop',
    description: () => (
      <>
        <div className='mb-4 last:mb-0'>
          Dustin is a full stack developer who makes everything about Qri work better.  He has over a decade of software engineering experience, the bulk of which coming during his time at Google (focusing on compiler and high performance code). He also has deep experience in node.js, python, Go (contributor list) C++, and other languages.
        </div>
        <div className='mb-4 last:mb-0'>
          In his free time, Dustin designs and builds arcade and video games.
        </div>
      </>
    )
  },
  {
    name: 'Chris Whong',
    title: 'Product',
    photo: 'chris.png',
    github: 'chriswhong',
    twitter: 'chris_whong',
    linkedin: 'chris-whong-798b587',
    description: () => (
      <>
        <div className='mb-4 last:mb-0'>
          Chris does everything from engaging our user base, to writing code and working to help make our products more useful and joyful to users.
        </div>
        <div className='mb-4 last:mb-0'>
          Chris is a leader in the NYC civic tech community, known for promoting government adoption of open-source tech, and supporting collaboration between those who generate and those who rely on open data. Most recently, he was the director of <Link to='https://planninglabs.nyc'>NYC Planning Labs</Link>, responsible for applying open technology, agile development, and user-centered design to build impactful products with NYC’s Urban Planners.
        </div>
        <div className='mb-4 last:mb-0'>
          In his free time, Chris hacks on <Link to='https://chriswhong.com/'>personal projects</Link> leveraging public data, and is a reef aquarium hobbyist.
        </div>
      </>

    )
  },
  {
    name: 'Asmir Avdicevic',
    title: 'Developer',
    photo: 'asmir.png',
    github: 'arqu',
    linkedin: 'asmiravdicevic',
    description: () => (
      <>
        <div className='mb-4 last:mb-0'>
          Asmir is a full stack developer with a strong focus on cloud services and metrics. He makes sure our byte pipes are deployed and working. He navigates well around many codebases and languages and finds pleasure in being a generalist.
        </div>
        <div className='mb-4 last:mb-0'>
          In his free time, Asmir likes going on road trips and hacking on side projects.
        </div>
      </>
    )
  },
  {
    name: 'Estefania Zambrano Rivas',
    title: 'Designer',
    photo: 'tefy.png',
    linkedin: 'estefanía-zambrano-rivas-a28b28116',
    behance: 'estefaniazr',
    description: () => (
      <>
        <div className='mb-4 last:mb-0'>
          Estefanía does all things related to design and UX/UI for Qri&apos;s product suite, including building a cohesive brand and making layouts, illustrations and animations. She brings ideas to life, and makes every aspect of Qri more joyful to use.
        </div>
        <div className='mb-4 last:mb-0'>
          In her free time, Estefania likes to roller skate, tap dance and bake some delicious desserts.
        </div>
      </>
    )
  }
]

// 3 colors to use in rotation for the staff bios,
// the second color is used as the hover color for social media links
const colors = [
  ['text-qriorange-600', 'text-qriorange-700'],
  ['text-qrigreen-600', 'text-qrigreen-700'],
  ['text-qripink-600', 'text-qripink-700']
]

class AboutPage extends React.Component {
  render () {
    return (
      <div className='px-5 md:px-10 lg:px-20'>
        <div className='flex mb-32 lg:-mb-40 xl:-mb-64'>
          <div className='w-full lg:w-1/2 mt-36'>
            <div className='text-7xl text-qritile-600 font-extrabold mb-4'>About Us</div>
            <div className='text-2xl'>Qri is leading an open-source project to build software for dataset syncing, versioning, storing and collaboration. We help solve super interesting data problems with individual data nerds (pro and not pro), non-profits, and commercial clients. Qri is led by a team in Brooklyn NY, and collaborators everywhere and anywhere.</div>
          </div>
          <div className='hidden lg:block w-1/2 flex-grow ml-10 pt-10'>
            <HappyUsers />
          </div>
        </div>
        <div className='lg:mb-32'>
          {
            teamBios.map(({
              name,
              title,
              photo,
              github,
              twitter,
              linkedin,
              behance,
              description
            }, i) => {
              const color = colors[i % colors.length]
              const reverse = i % 2 !== 0
              return (
                <div key={name} className={classNames('flex lg:-mb-28 lg:-mx-10', {
                  'flex-row-reverse': reverse
                })}>
                  <div className='relative pt-24 flex items-stretch mb-10 last:mb-0 w-full lg:w-1/2 lg:mx-10'>
                    <div className={`absolute top-0 w-full text-center sm:text-left ${color[0]}`}>
                      <div className='relative inline-block'>
                        <PhotoRing />
                        <div className='absolute bg-cover' style={{
                          top: 14,
                          left: 25,
                          height: 158,
                          width: 158,
                          borderRadius: 75,
                          filter: 'drop-shadow(0px 0px 4.59579px rgba(0, 0, 0, 0.1))',
                          backgroundImage: `url(/img/photos/${photo})`
                        }}>
                        </div>
                      </div>
                    </div>

                    <div className='hidden sm:flex w-24 flex-shrink-0' />
                    <div className='rounded-2xl bg-white pt-32 pb-8 sm:py-8 px-8 flex-grow' style={{
                      boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.1)'
                    }}>
                      <div className='mb-6 sm:ml-28 text-center sm:text-left'>
                        <div className={`font-extrabold mb-1 ${color[0]}`} style={{
                          fontSize: 26
                        }}>
                          {name}
                        </div>
                        <div className='text-lg'>
                          {title}
                        </div>
                      </div>
                      <div className='text-sm text-qrigray-700'>
                        {description()}
                      </div>
                      <div className='mt-6 flex items-center'>
                        {github && <div><Link to={`https://github.com/${linkedin}`} className='mr-2' colorClassName={`${color[0]} hover:${color[1]}`}><Icon icon='github'/></Link></div>}
                        {twitter && <div><Link to={`https://twitter.com/${twitter}`} className='mr-2' colorClassName={`${color[0]} hover:${color[1]}`}><Icon icon='twitter'/></Link></div>}
                        {behance && <div><Link to={`https://behance.net/${behance}`} className='mr-2' colorClassName={`${color[0]} hover:${color[1]}`}><Icon icon='behance'/></Link></div>}
                        {linkedin && <div><Link to={`https://www.linkedin.com/in/${linkedin}`} className='mr-2' colorClassName={`${color[0]} hover:${color[1]}`}><Icon icon='linkedin'/></Link></div>}
                      </div>
                    </div>
                  </div>
                  <div className='hidden lg:block lg:w-1/2 lg:mx-10'>
                  &nbsp;
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default AboutPage
