import React from 'react'
import Helmet from 'react-helmet'

const BetaPage = () => (
  <div className='container'>
    <Helmet>
      <title>Qri Beta Program</title>
      <meta name="title" content='Qri Beta Program' />
      <meta name="description" content={'Join the Qri beta program to try out new features'} />
      <link href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css" rel="stylesheet" type="text/css" />
    </Helmet>
    <h2>Sign up to Beta Test Qri!</h2>

    <p>We need your help! If you care about what we make and want to see it work better, we would **LOVE** to have your help as a beta tester for Qri Desktop & Qri Cloud.</p>

    <p>Give us your email and we&apos;ll get you setup on Qri and give you options for sharing your feedback with us. Early users shape how new technology serves humans. If you want Qri to serve you, jumping on as a beta tester will ensure your ideas and opinions guide our work. </p>

    <p>We&apos;ll reach out to the first cohort of beta testers during the first week of October 2019.  Sign up and stay tuned! </p>

    <div id="mc_embed_signup">
      <form action="https://qri.us19.list-manage.com/subscribe/post?u=54a6a8c1171101850b8576277&amp;id=9fc5ce3233" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
        <div id="mc_embed_signup_scroll">
          <h2>Sign up to be a Qri Beta Tester</h2>
          <div className="indicates-required"><span className="asterisk">*</span> indicates required</div>
          <div className="mc-field-group">
            <label htmlFor="mce-EMAIL">Email Address  <span className="asterisk">*</span>
            </label>
            <input type="email" defaultValue="" name="EMAIL" className="required email" id="mce-EMAIL" />
          </div>
          <div className="mc-field-group">
            <label htmlFor="mce-FNAME">First Name </label>
            <input type="text" defaultValue="" name="FNAME" className="" id="mce-FNAME" />
          </div>
          <div className="mc-field-group">
            <label htmlFor="mce-LNAME">Last Name </label>
            <input type="text" defaultValue="" name="LNAME" className="" id="mce-LNAME" />
          </div>
          <div id="mce-responses" className="clear">
            <div className="response" id="mce-error-response" style={{ display: 'none' }}></div>
            <div className="response" id="mce-success-response" style={{ display: 'none' }}></div>
          </div>
          <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
            <input type="text" name="b_54a6a8c1171101850b8576277_9fc5ce3233" tabIndex="-1" defaultValue="" />
          </div>
          <div className="clear"><input type="submit" defaultValue="Sign Up" name="subscribe" id="mc-embedded-subscribe" className="button" /></div>
        </div>
      </form>
    </div>
  </div>
)

export default BetaPage
