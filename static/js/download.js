// shows/hides out the download button text and link based on user's platform

function checkIfLoaded () {
  var el = document.getElementById('splash')
  if (el) { // if the container is visible on the page
    if (navigator.platform.match(/(Mac)/i)) {
      el.className = 'mac'
    }

    if (navigator.platform.match(/(Win)/i)) {
      el.className = 'windows'
    }
  } else {
    setTimeout(checkIfLoaded, 50) // wait 50 ms, then try again
  }
}

checkIfLoaded()
