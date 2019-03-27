(($) => {
  $('html').click(() => {
    $('#docs_sidebar').removeClass('show')
  })

  $('#docs_sidebar_toggle').click((e) => {
    $('#docs_sidebar').toggleClass('show')
    e.stopPropagation()
  })

  $('#docs_sidebar')
    .on('click', function (e) { 
      e.stopPropagation()
    })
  .find('.toggle')
    .on('click', function (e) {
      e.stopPropagation()
      const $el = $(this)
      const hidden = $el.parent().siblings('.pages').hasClass('hidden')
      $el.parent().siblings('.pages').toggleClass('hidden')
      $el.text(hidden ? '▲' : '▼')
    })
    
  
    $('#docs_sidebar .pages').each(function () {
      const $pages = $(this)
      if (window.location.pathname === '/docs/') {
        $pages.removeClass('hidden')
        $pages.siblings('.section').children('.toggle').text('▲')
      }

      if ($pages.children().length === 0) {
        $pages.siblings('.section').children('.toggle').addClass('hidden')
      }

      // open current section
      const link = $pages.siblings('.section').children('a')
      const url = new URL(link.attr('href'), window.location)
      if (window.location.pathname.toString().indexOf(url.pathname) > -1) {
        $pages.removeClass('hidden')
        $pages.siblings('.section').children('.toggle').text('▲')
      }
    })
  
})(jQuery);

