import React from 'react'
import * as d3 from 'd3'

// based on https://bl.ocks.org/lorenzopub/0b09968e3d4970d845a5f45ed25595bb
var stack = d3.stack()

class LiveChart extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      data: []
    }

    this.updateChart = this.updateChart.bind(this)
    this.myRef = React.createRef()
  }

  shouldComponentUpdate (nextProps) {
    // only update if chartData has new data
    return (nextProps.chartData.length !== this.props.chartData.length)
  }

  componentDidUpdate () {
    this.updateChart()
  }

  updateChart () {
    // re-draw the areas
    const data = this.props.chartData

    // color scale with hard-coded breaks
    var color = d3.scaleOrdinal()
      .domain(['>=5', '0-5', 'stopped'])
      .range(['#33cc33', '#ff9900', '#cc0000'])

    stack.keys(color.domain())
    stack.order(d3.stackOrderReverse) // reverse the order so stopped vehicles are on the bottom
    stack.offset(d3.stackOffsetNone)

    const stackedData = stack(data)

    // area calculator, expects timestamp and all three properties in the color scale above
    var area = d3.area()
      .x((d) => { return this.x(d.data.timestamp) })
      .y0((d) => { return this.y(d[0]) })
      .y1((d) => { return this.y(d[1]) })
      .curve(d3.curveMonotoneX)

    // enter function, appends a the initial areas
    this.svg.selectAll('.area')
      .data(stackedData)
      .enter()
      .append('path')
      .attr('class', 'area')
      .attr('d', area)
      .style('fill', (d) => { return color(d.key) })
      .style('fill-opacity', 0.7)

    // update function, recalculates each area based on new data
    this.svg.selectAll('.area')
      .data(stackedData)
      .attr('d', area)
      .style('fill', (d) => { return color(d.key) })
  }

  componentDidMount () {
    // setup chart and axes
    const container = this.myRef.current

    // get container dimensions
    const {
      offsetWidth: containerWidth,
      offsetHeight: containerHeight
    } = container

    const margin = { top: 25, right: 25, bottom: 25, left: 25 }
    const width = containerWidth - margin.left - margin.right
    const height = containerHeight - margin.top - margin.bottom

    const { timeRange } = this.props

    // x scale (time)
    const x = d3.scaleTime()
      .range([0, width])
      .domain([new Date(timeRange[0] * 1000), new Date((timeRange[1]) * 1000)]).nice()

    // y scale (counts)
    const y = d3.scaleLinear()
      .range([height, 0])
      .domain([0, 13])

    // append the svg
    const svg = d3.select(this.myRef.current).append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    // make the scales and svg available to other parts of this component
    this.x = x
    this.y = y
    this.svg = svg

    // add axes and labels
    const xAxis = d3.axisBottom(x)
      .ticks(4, 'I')
      .tickFormat(d3.timeFormat('%-I%p'))

    const yAxis = d3.axisLeft(y)
      .scale(y)
      .ticks(2)

    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis).append('text')
      .attr('x', 350)
      .attr('y', 36)
      .attr('fill', '#000')
      .text('Hour of Time')
      .style('font-weight', 'bold')

    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text')
      .attr('text-anchor', 'start')
      .attr('x', 10)
      .attr('y', 5)
      .attr('dy', '0.3408em')
      .attr('fill', '#000')
      .text('Number of Active Buses')
      .style('font-weight', 'bold')
  }

  render () {
    const style = {
      height: '100%',
      width: '100%'
    }

    return (
      <div className='live-chart' ref={this.myRef} style={style} />
    )
  }
}

export default LiveChart
