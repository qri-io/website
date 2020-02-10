import React from 'react'
import mapboxgl from 'mapbox-gl'

// GLMap instantiates a mapboxGL map and passes the map object up to its parent

class GLMap extends React.Component {
  constructor (props) {
    super(props)

    this.map = {}
    this.myRef = React.createRef()
  }

  componentDidMount () {
    mapboxgl.accessToken = 'pk.eyJ1IjoiY3dob25nLXFyaSIsImEiOiJjazZncWRkZGowb3kyM25vZXkwbms2cW0xIn0.lbwola6y7YDdaKLMdjif1g'
    const map = new mapboxgl.Map({
      container: this.myRef.current, // container id
      ...this.props.initOptions
    })

    this.map = map

    this.map.on('style.load', () => {
      this.props.onMapLoaded(map)
    })
  }

  shouldComponentUpdate (nextProps) {
    return false
  }

  render () {
    const style = {
      height: '100%',
      width: '100%'
    }

    return (
      <div className='gl-map' ref={this.myRef} style={style} />
    )
  }
}

export default GLMap
