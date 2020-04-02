import React from 'react'
import mapboxgl from 'mapbox-gl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import GLMap from '../../GLMap'

const artistCountRadius = {
  property: 'artistCount',
  stops: [
    [1, 5],
    [2, 8],
    [10, 11],
    [25, 14],
    [50, 17],
    [150, 20]
  ]
}

class BandCampMap extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      artists: [],
      selectedCity: '',
      showSidebar: false
    }

    this.handleMapLoaded = this.handleMapLoaded.bind(this)
    this.handleSidebarClose = this.handleSidebarClose.bind(this)
  }

  handleSidebarClose () {
    this.setState({ showSidebar: false })
  }

  handleMapLoaded (map) {
    map.scrollZoom.disable()
    map.addControl(new mapboxgl.NavigationControl())

    const nyBounds = [-80.687542, 40.279526, -71.480999, 45.197522]
    map.fitBounds(nyBounds)

    // add a geojson source to the map using our external geojson file
    map.addSource('bandcamp-cities', {
      type: 'geojson',
      data: '/data-stories-resources/the-local-scene/ny-artists.geojson'
    })

    // add a layer for our custom source
    map.addLayer({
      id: 'bandcamp-cities-circle',
      type: 'circle',
      source: 'bandcamp-cities',
      paint: {
        'circle-radius': artistCountRadius,
        'circle-opacity': 0.6,
        'circle-color': '#4fc6f2'
      }
    }, 'waterway-label')

    // add an empty data source, which we will use to highlight the lot the user is hovering over
    map.addSource('highlight-feature', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      }
    })

    // add a layer for the highlighted lot
    map.addLayer({
      id: 'highlight-circle',
      type: 'circle',
      source: 'highlight-feature',
      paint: {
        'circle-radius': artistCountRadius,
        'circle-opacity': 0,
        'circle-stroke-color': '#3e99ba',
        'circle-stroke-width': 3
      }
    }, 'waterway-label')

    map.on('click', 'bandcamp-cities-circle', (e) => {
      const [feature] = e.features
      const { location, artists } = feature.properties

      this.setState({
        showSidebar: true,
        selectedCity: location,
        artists: JSON.parse(artists)
      })
    })

    map.on('mousemove', function (e) {
    // query for the features under the mouse, but only in the lots layer
      var features = map.queryRenderedFeatures(e.point, {
        layers: ['bandcamp-cities-circle']
      })

      // if the mouse pointer is over a feature on our layer of interest
      // take the data for that feature and display it in the sidebar
      if (features.length > 0) {
        map.getCanvas().style.cursor = 'pointer' // make the cursor a pointer

        var hoveredFeature = features[0]

        // set this lot's polygon feature as the data for the highlight source
        map.getSource('highlight-feature').setData(hoveredFeature)

        const coordinates = hoveredFeature.geometry.coordinates
        const { location, artistCount, genreCount } = hoveredFeature.properties

        const topThree = JSON.parse(genreCount).slice(0, 3)

        const genreContent = topThree.reduce((acc, curr) => {
          const { id, count } = curr
          return `${acc}<div class='popup-city-genre'>${id} <div class='count'>${count}</div></div>`
        }, '')

        const popupContent = `
          <div class='popup-city'>
            <div class='popup-city-header'>
              <span class='city'>${location}<span> &nbsp;&nbsp;<span class='popup-city-label'>${artistCount} artist${artistCount > 1 ? 's' : ''}</span>
            </div>
            <div class='popup-city-content'>
              <div class='top-genres-label'>Top Genres</div>
              ${genreContent}
            </div>
          </div>
        `

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup
          .setLngLat(coordinates)
          .setHTML(popupContent)
          .addTo(map)
      } else {
      // if there is no feature under the mouse, reset things:
        map.getCanvas().style.cursor = 'default' // make the cursor default

        // reset the highlight source to an empty featurecollection
        map.getSource('highlight-feature').setData({
          type: 'FeatureCollection',
          features: []
        })

        popup.remove()
      }
    })

    // Create a popup, but don't add it to the map yet.
    var popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: 25,
      className: 'highlight-popup'
    })
  }

  render () {
    const { showSidebar, selectedCity, artists } = this.state

    return (
      <div id='the-local-scene-map'style={{
        position: 'relative'
      }}>
        <div className={`artist-list d-flex flex-column ${showSidebar ? 'visible' : ''}`}>
          <div className='header'>
            {artists.length} artist{artists.length > 1 ? 's' : ''} in <span className='cityName'>{selectedCity}</span>
            <div className='close-button' onClick={this.handleSidebarClose}>
              <FontAwesomeIcon icon={faTimes}/>
            </div>
          </div>
          <div className='message'>
            <small className="text-muted">Click to view an artist&apos;s bandcamp page</small>
          </div>
          <div className='sidebar-scrolling'>
            <div className="list-group">
              {
                artists.map(({ name, bc_url: bcURL, genres }) => {
                  return (
                    <a href={bcURL} target='_blank' rel='noopener noreferrer' key={name} className='list-group-item list-group-item-action flex-column align-items-start'>
                      <div className="d-flex w-100 justify-content-between">
                        <div className="name">{name}</div>
                        <small className="text-muted">{genres[0]}</small>
                      </div>
                    </a>)
                })
              }
            </div>
          </div>
        </div>
        <div style={{
          width: '100vw',
          position: 'relative',
          left: 'calc(-50vw + 50%)',
          height: '100vh'
        }}>
          <div className='overlay'>Hover a city for top genres. Click for a list of artists.</div>
          <GLMap
              initOptions={{ // eslint-disable-line
              style: 'mapbox://styles/mapbox/light-v9', // hosted style id
              center: [-74.2179, 43.2994],
              zoom: 8
            }}
            onMapLoaded={this.handleMapLoaded}
          />
        </div>
      </div>
    )
  }
}

export default BandCampMap
