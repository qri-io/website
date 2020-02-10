import React from 'react'
import moment from 'moment'
import Papa from 'papaparse'
import { distance, lineString, length, along } from '@turf/turf'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedo, faCircle } from '@fortawesome/free-solid-svg-icons'

import asJson from '../../../utils/as-json'
import GLMap from '../../GLMap'
import LiveChart from '../../LiveChart'

const RESOURCE_PATH = '/data-stories-resources/brooklyn-bus-times'
const FRAME_LENGTH = 500 // milliseconds per frame
const SUBFRAMES = 10 // how many subframes to interpolate for a frame

const startView = {
  center: [-73.98174, 40.675],
  zoom: 11.4,
  speed: 0.6,
  pitch: 0,
  bearing: 28
}

const routeView = {
  center: [-73.98174, 40.675],
  zoom: 12.4,
  speed: 0.6,
  pitch: 0,
  bearing: 28
}

const downtownView = {
  center: [-73.98195, 40.69512],
  zoom: 13.84,
  speed: 0.6,
  pitch: 60,
  bearing: 28
}

const flatbushAndSeventhView = {
  center: [-73.97553, 40.67784],
  zoom: 16.04,
  speed: 0.6,
  pitch: 60,
  bearing: 88.8
}

// helper function for color based on speed
const mphLookup = (mph) => {
  if (mph >= 5) {
    return {
      color: '#33cc33',
      range: '>=5'
    }
  }
  if (mph > 0) {
    return {
      color: '#ff9900',
      range: '0-5'
    }
  }
  // if (mph > 0) return '#cc0000'
  return {
    color: '#cc0000',
    range: 'stopped'
  }
}

class FullRouteAnimation extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      timestamps: [],
      data: null,
      chartData: [],
      currentFrame: 0,
      playing: false,
      finished: false
    }

    this.renderVehiclesForCurrentFrame = this.renderVehiclesForCurrentFrame.bind(this)
    this.renderMarkersForVehicle = this.renderMarkersForVehicle.bind(this)
    this.handleFrameChange = this.handleFrameChange.bind(this)
    this.handleMapLoaded = this.handleMapLoaded.bind(this)
    this.handleControlClick = this.handleControlClick.bind(this)
    this.myRef = React.createRef()
    this.map = {}
  }

  // // prevent render on each scroll event, only update if stickyframe is different
  // shouldComponentUpdate (nextProps) {
  //   return (this.props.stickyFrame !== nextProps.stickyFrame)
  // }

  componentDidUpdate (prevProps, prevState) {
    if (!prevState.playing && this.state.playing) {
      this.renderVehiclesForCurrentFrame()
    }

    if (prevState.currentFrame !== this.state.currentFrame) {
      this.renderVehiclesForCurrentFrame()
    }

    if (prevProps.stickyFrame !== this.props.stickyFrame) {
      this.handleFrameChange(this.props.stickyFrame)
    }
  }

  handleFrameChange (frameIndex) {
    if (frameIndex === -1) {
      this.map.flyTo(startView)
    }

    if (frameIndex === 0) {
      this.map.flyTo(routeView)
      if (!this.state.playing) {
        setTimeout(() => {
          this.setState({ playing: true })
        }, 1000)
      }
    }

    if (frameIndex === 1) {
      this.map.flyTo(downtownView)
    }

    if (frameIndex === 2) {
      this.map.flyTo(flatbushAndSeventhView)
    }

    if (frameIndex === 3) {
      this.map.flyTo(startView)
    }
  }

  componentDidMount () {
    // parse vehicles csv, convert to json, pull out timestamps
    Papa.parse(`${RESOURCE_PATH}/vehicles.csv`, {
      download: true,
      complete: ({ data }) => {
        const jsonData = asJson(data)
        // get all of the unique timestamps
        const timestamps = jsonData
          .map(d => d.timestamp)
          .filter((timestamp, i, self) => self.indexOf(timestamp) === i)

        this.setState({
          timestamps,
          data: jsonData
        })
      }
    })
  }

  renderMarkersForVehicle ({ vehicleRef, positions, mph }, i) {
    const existingSource = this.map.getSource(vehicleRef)

    if (positions[i]) {
      if (existingSource) {
        existingSource.setData({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: positions[i]
          }
        })
      } else {
        this.map.addSource(vehicleRef, {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: positions[i]
            }
          }
        })

        this.map.addLayer({
          id: `${vehicleRef}-circle`,
          type: 'circle',
          source: vehicleRef,
          paint: {
            'circle-color': '#FFF',
            'circle-opacity': 0.8,
            'circle-radius': 4,
            'circle-stroke-width': 4
          }
        })
      }

      // color point based on speed
      this.map.setPaintProperty(`${vehicleRef}-circle`, 'circle-stroke-color', mphLookup(mph).color)
    }
  }

  renderVehiclesForCurrentFrame () {
    const {
      data,
      timestamps,
      currentFrame,
      playing
    } = this.state

    const currentTimestamp = timestamps[currentFrame]
    // const currentMoment = moment.unix(currentTimestamp)
    // $('.display-time').text(currentMoment.format('HH:mm'))

    // get rows for this timestamp
    const observationsForTimestamp = data.filter(d => {
      // filter out layover observations
      return (d.timestamp === currentTimestamp) && (d.progressStatus !== 'layover')
    })
    const observationsForNextTimestamp = data.filter(d => {
      return d.timestamp === timestamps[currentFrame + 1]
    })

    // compare vehicle sources on map with vehicles in this timestamp
    // remove any that don't need to be shown in this step
    let sourcesOnMap = Object.keys(this.map.getStyle().sources)
      .filter(d => d.match(/MTA/))

    observationsForTimestamp.forEach(({ vehicleRef }) => {
      sourcesOnMap = sourcesOnMap.filter(d => d !== vehicleRef)
    })

    // remove orphaned layers and sources
    sourcesOnMap.forEach((id) => {
      const style = this.map.getStyle()
      if (style.layers.find(d => d.id === `${id}-circle`)) this.map.removeLayer(`${id}-circle`)
      if (style.sources[id]) this.map.removeSource(id)
    })

    // prep the data for animation We need to generate a line between the current position and next postion
    const dataToAnimate = observationsForTimestamp.map((observation) => {
      // determine position along string
      const startPosition = [observation.longitude, observation.latitude]
      const positions = [startPosition]
      let mph = 0
      const nextObservation = observationsForNextTimestamp.find(d => d.vehicleRef === observation.vehicleRef)
      if (nextObservation) {
        const endPosition = [nextObservation.longitude, nextObservation.latitude]

        // now that we have the end position, we can calculate the average speed
        // for this minute as distance between points / 1 minute * 60 = mph
        const distanceBetweenPoints = distance(startPosition, endPosition, { units: 'miles' })
        mph = parseInt(distanceBetweenPoints * 60)

        const lineBetweenPoints = lineString([startPosition, endPosition])
        const incrementLength = length(lineBetweenPoints) / SUBFRAMES

        // calculate positions for each frame and fill positions[]
        for (let i = 1; i < (SUBFRAMES - 1); i += 1) {
          // calculate the new position for this frame
          // length to visualize for this frame
          const frameLength = incrementLength * i
          // calculate where to place the marker
          positions.push(along(lineBetweenPoints, frameLength).geometry.coordinates)
        }
      }
      return {
        vehicleRef: observation.vehicleRef,
        positions, // array of {frames - 1} positions
        mph
      }
    })

    const interval = FRAME_LENGTH / SUBFRAMES

    // initial render
    dataToAnimate.forEach((vehicle) => {
      this.renderMarkersForVehicle(vehicle, 0)
    })

    // reduce dataToAnimate (vehicles in frame) to speed range percentages
    const speeds = dataToAnimate
      .map((d) => mphLookup(d.mph).range)

    const counts = {
      '>=5': 0,
      '0-5': 0,
      stopped: 0,
      timestamp: currentTimestamp * 1000 // add milliseconds for charting in d3
    }

    for (let i = 0; i < speeds.length; i++) {
      const value = speeds[i]
      if (typeof counts[value] === 'undefined') {
        counts[value] = 1
      } else {
        counts[value]++
      }
    }

    // refreshChart(dataToAnimate, currentTimestamp)
    // updateLine(currentTimestamp)

    // create an interval to update the data {framesPerMinute} times
    // we already rendered the initial position, so kick things off at 1, not 0
    let counter = 1
    const dataInterval = setInterval(() => {
      // iterate over observations for this timestamp
      dataToAnimate.forEach((vehicle) => {
        this.renderMarkersForVehicle(vehicle, counter)
      })

      // updateData(lineBetweenPoints, incrementLength, counter, framesPerMinute, observation.vehicleRef)
      // the end position is just the 0 position of the next timestamp, so we are iterating over n-2
      if (counter === SUBFRAMES - 2) {
        clearInterval(dataInterval)
        // move to the next minute
        setTimeout(() => {
          // update chart data before advancing frame
          const chartData = [
            ...this.state.chartData,
            counts
          ]

          // only advance the frame if there's still data left
          if (currentFrame < timestamps.length - 2) {
            if (playing) {
              this.setState({
                chartData,
                currentFrame: this.state.currentFrame + 1
              })
            }
          } else {
            this.setState({
              finished: true,
              playing: false,
              currentFrame: 0
            })
          }
        }, interval)
      } else {
        counter += 1
      }
    }, interval)
  }

  handleMapLoaded (map) {
    this.map = map

    map.scrollZoom.disable()

    // add static layers (bus route linestrings)

    map.addSource('b67-route-northbound', {
      type: 'geojson',
      data: `${RESOURCE_PATH}/b67-route-northbound.geojson`
    })

    map.addLayer({
      id: 'b67-route-northbound-line',
      type: 'line',
      source: 'b67-route-northbound',
      paint: {
        'line-color': '#46b2d9',
        'line-width': 2
      }
    })

    map.addSource('b67-route-southbound', {
      type: 'geojson',
      data: `${RESOURCE_PATH}/b67-route-southbound.geojson`
    })

    map.addLayer({
      id: 'b67-route-southbound-line',
      type: 'line',
      source: 'b67-route-southbound',
      paint: {
        'line-color': '#46b2d9',
        'line-width': 2
      }
    })

    // uncomment to start playback automatically in development
    // this.setState({ playing: true })
  }

  handleControlClick (type) {
    if (type === 'reset') {
      this.setState({
        currentFrame: 0,
        chartData: [],
        playing: true,
        finished: false
      })
    }
  }

  render () {
    const {
      timestamps,
      currentFrame,
      chartData,
      finished
    } = this.state

    const infoPaneStyle = {
      position: 'absolute',
      zIndex: 10,
      top: 0,
      right: 0,
      padding: '28px'
    }

    const displayTimeStyle = {
      fontSize: '2rem',
      fontWeight: '600',
      display: 'inline-block',
      position: 'relative',
      top: '6px',
      marginLeft: '12px'
    }

    const liveChartStyle = {
      position: 'absolute',
      zIndex: 10,
      bottom: '20px',
      height: '148px',
      width: '100%',
      fontSize: '3rem',
      fontWeight: '700'
    }

    const currentTime = moment.unix(timestamps[currentFrame]).format('HH:mm a')

    return (
      <div id='brooklyn-bus-times' style={{
        height: '100%',
        width: '100%',
        position: 'relative'
      }}>
        { timestamps.length && (
          <>
            <div className='info-pane' style={infoPaneStyle}>
              { finished && (
                <button
                  className='btn btn-primary control-button'
                  onClick={() => { this.handleControlClick('reset') }}
                >
                  <FontAwesomeIcon icon={faRedo}/>
                </button>
              )}

              <div className='display-time' style={displayTimeStyle}>
                {currentTime}
              </div>
              <div className='legend' style={{
                fontSize: '.8rem',
                textAlign: 'right'
              }}>
                <div className='legend-item'>
                  <FontAwesomeIcon icon={faCircle} style={{ color: '#33cc33' }}/>
                  <div className='legend-item-text'>&gt;5mph</div>
                </div>
                <div className='legend-item'>
                  <FontAwesomeIcon icon={faCircle} style={{ color: '#ff9900' }}/>
                  <div className='legend-item-text'>0-5mph</div>
                </div>
                <div className='legend-item'>
                  <FontAwesomeIcon icon={faCircle} style={{ color: '#cc0000' }}/>
                  <div className='legend-item-text'>stopped</div>
                </div>
              </div>
            </div>
            <div style={liveChartStyle}>
              <LiveChart
                chartData={chartData}
                timeRange={[timestamps[0], timestamps[timestamps.length - 2]]}
              />
            </div>
          </>
        )}
        <GLMap
          initOptions={{ // eslint-disable-line
            style: 'mapbox://styles/mapbox/light-v9', // hosted style id
            center: startView.center,
            zoom: startView.zoom,
            bearing: 28,
            interactive: false
          }}
          onMapLoaded={this.handleMapLoaded}
        />
      </div>
    )
  }
}

export default FullRouteAnimation
