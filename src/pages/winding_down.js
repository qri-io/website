import React from 'react'

const page = () => (
  <div className='container w-full md:max-w-3xl mx-auto pt-20'>
    <div className='w-full px-4 md:px-6 text-xl leading-7 p-3' style={{ background: 'white' }}>
      <div className='pb-32'>
        <h1 className='font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-3xl'>Winding Qri Down</h1>
        <p className='py-3'>After 5 years of open data & code, Qri&apos;s run has come to an end.</p>
        <p className='py-3'>Today, <a className="text-green-500 no-underline hover:underline" href="https://qri.cloud">qri.cloud</a> will no longer accept new datasets. The site will go offline on April 1st, 2022. I encourage users to download any data stored on qri.cloud & find it a new home before then. Jump into our <a className="text-green-500 no-underline hover:underline" href="https://discord.gg/P7QNRFxy">discord</a> if you have any questions about migrating.</p>
        <p className='py-3'>To our thousands of users, contributors, partners, and investors who put time into Qri, thank you. I&apos;m grateful for those of you who rolled up your sleeves and tried to tell us how to build a better product, and hope to one day put an equal amount of constructive feedback back into the world (this part will take a while). I&apos;m deeply appreciative for just how positive everyone has always been about the project.</p>
        <p className='py-3'>The core thesis of the project has been to put a lot of value into the world, and leave the door open to build a business around a small part of that value creation. Qri did find a business, but it wasn’t the one I wanted to build. Regardless, I remain <i>very</i> proud of what we accomplished with Qri. We built real solutions to pernicious problems in data cataloging, including portability, versioning, metadata interop, and even binding data to code. We built a product that made these solutions workable for people without a PhD in library science, or the engineering chops necessary to set up complex data pipelines</p>
        <p className='py-3'>Throughout my time at Qri I have kept a question with me to keep from losing sight of the bigger picture: <i>assuming for a moment that Qri fails, what will you have to show for your time?</i> The answer for me has always been to be a net positive on the lives of those connected to the project. I can say without hesitation that I tried to do that. Others will have to judge if I succeeded, but to the team: I’ve had the distinct honor of working with, thank you. It&apos;s been a ride.</p>
        <p className='py-3'>When startups wind down, I think it&apos;s important to share lessons learned. In the coming weeks I intend to write a series of posts that describe what worked and didn’t work at Qri. I’m planning to start by expanding on my two biggest lessons:
        </p>
        <div style={{ paddingLeft: 20 }}>
          <ol className='list-decimal'>
            <li>Data is not code.</li>
            <li>Competing with Web2 companies on a Web3 stack is hard.</li>
          </ol>
        </div>
        <p className='py-3'>More on those on <a className="text-green-500 no-underline hover:underline" href="https://twitter.com/b_fiive">twitter</a>.</p>
        <p className='py-3'>Finally, the vast majority of Qri&apos;s code is and will remain <a className="text-green-500 no-underline hover:underline" href="https://github.com/qri-io">open source</a>. The libraries the Qri team has written that others depend on will be maintained, and I will work to either find a long-term solution or give clear notice of end-of-support if it comes to that. Working in the open means that anyone is free to take what we’ve made here and run with it. If that’s you, let me know & I’ll try to help.</p>
        <p className='py-3'>To the next adventure,<br />b5</p>
      </div>
    </div>
  </div>
)

export default page
