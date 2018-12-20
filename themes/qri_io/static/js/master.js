(($) => {
  $('html').click(() => {
    $('#docs_sidebar').removeClass('show')
  })

  $('#docs_sidebar_toggle').click((e) => {
    $('#docs_sidebar').toggleClass('show')
    e.stopPropagation()
  })
  $('#docs_sidebar').click((e) => { 
    e.stopPropagation()
  })
})(jQuery);

