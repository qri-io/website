import React from 'react'

const MailingList = () => (
  <div id="mailing-list-signup">
    <form className="wrap container validate" action="https://qri.us19.list-manage.com/subscribe/post?u=54a6a8c1171101850b8576277&amp;id=b41eb6f58e" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" target="_blank" noValidate>
      <div id="mc_embed_signup_scroll">
        <h2 className="title">Join our mailing list!</h2>
        <p className="description"><i>At-most-once-a-month updates on project progress.</i></p>

        <input type="email" defaultValue="" name="EMAIL" className="required email" placeholder="email@address.com" id="mce-EMAIL" />
        {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups */}
        <input type="submit" defaultValue="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button" />
        <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
          <input type="text" name="b_54a6a8c1171101850b8576277_b41eb6f58e" tabIndex="-1" defaultValue="" />
        </div>
        <div id="mce-responses" className="clear">
          <div className="response" id="mce-error-response" style={{ display: 'none' }}></div>
          <div className="response" id="mce-success-response" style={{ display: 'none' }}></div>
        </div>
      </div>
    </form>
  </div>
)

export default MailingList
