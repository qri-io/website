---
title: "Tracking a Bus Route's Data Footprint"
subtitle: "We logged real-time bus data for the B67 in Brooklyn to see how the buses fare in rush hour traffic"
by: "Chris Whong"
heroImage: "/data-stories-resources/brooklyn-bus-times/img/bus-in-traffic.jpg"
date: "2020-02-05"
---

import ImageWithCaption from '../../components/ImageWithCaption'
import QriDatasetWidget from '../../components/QriDatasetWidget'
import StickyScroller from '../../components/sticky-scroller'
import FullRouteAnimation from '../../components/data-stories/brooklyn-bus-times/FullRouteAnimation'

import 'mapbox-gl/dist/mapbox-gl.css'


For several years, real-time bus arrival data has been available system-wide in New York City. The data make their way into our pockets via google maps and other transit apps, and power countdown clocks to help riders understand how long they'll be standing at the bus stop. 

<ImageWithCaption
  src='/data-stories-resources/brooklyn-bus-times/img/real-time-examples.png'
  caption='The Bus Time API provides the data that powers physical countdown clocks and mobile transit apps (Google Maps for iOS pictured here).  The same data are useful for research into bus performance.'
  minHeight={500}
/>

The [Bus Time API](http://bustime.mta.info/wiki/Developers/Index) is free and open (as long as you register for an API key). While the data are clearly useful to straphangers, they're also important resource for deeper analysis of bus activity and timeliness for transit planners, businesses, community groups, journalists, and researchers. Here are some basic questions we can ask of the data:

- Are arrivals uniformly spaced? 
- Are the predicted arrival times accurate?
- How does traffic at one end of a route affect timeliness "downstream"?

We found some preliminary answers to these by logging real-time data over a period of time and building maps and charts. The patterns that emerge show what happens when a well-intentioned bus schedule meets the reality of city traffic. As the saying goes, no battle plan survives contact with the enemy.

## Data Collection - Starting Small

We collected three hours of data for a single route, [the B67](http://web.mta.info/nyct/bus/schedule/bkln/b067cur.pdf), which runs from Kensington, up 7th Ave in Park Slope, along Flatbush Ave, through Downtown Brooklyn and DUMBO, and ends near the Navy Yard. (The B67 has been given an overall score of D by the Bus Turnaround Coalition, an NYC transit advocacy group.  [See their full report card here](http://busturnaround.nyc/routes/b67/))
 
<ImageWithCaption
  src='/data-stories-resources/brooklyn-bus-times/img/b67_map.png'
  caption='The B67 runs from Kensington to DUMBO, with weekday service to the Brooklyn Navy Yard. Source: MTA B67/B69 Bus Schedule'
  minHeight={500}
/>

The data spans from 6am to 9am on Tuesday, January 28th. (There's nothing special about this period, we simply wanted a "typical" weekday morning rush hour.) We collected two types of data from the Bus Time API:

- __Vehicle Locations__ - The physical location (latitude/longitude) of each B67 bus, logged once per minute.

- __Estimated Next Arrival Time for Each Stop__ - There are about 40 stops in each direction on the B67. For every minute of the study period, we logged the estimated arrival time of the next bus _at each stop_.

To automate the data collection, we used a node.js script that was set to run once a minute. [Data logging code here](https://github.com/qri-io/data-stories-scripts/tree/master/brooklyn-bus-times). 
We consolidated the raw data into two CSVs, one for vehicle locations and one for stop arrival times. We published both datasets on Qri if you'd like to pick up where we left off.

<QriDatasetWidget
  datasetName='chriswhong/b67_bus_locations_28_january_2020'
  title='B67 Bus Vehicle Locations - 28 January 2020'
  lastCommit='2020-01-31T10:18:36-05:00'
  size='172.2kb'
  entries={1591}
  commits={2}
  views={29}
  clones={7}
  hash='QmR5Kiy2Atbaw7EdihQCqW8R1xiG5h3iscL84sRPRD7oRG'
/>

<QriDatasetWidget
  datasetName='chriswhong/b67_stop_arrival_estimates_28_january_2020'
  title='B67 Bus Stop Arrival Estimates - 28 January 2020'
  lastCommit='2020-01-31T10:18:36-05:00'
  size='172.2kb'
  entries={1591}
  commits={2}
  views={29}
  clones={7}
  hash='QmR5Kiy2Atbaw7EdihQCqW8R1xiG5h3iscL84sRPRD7oRG'
/>


## Mapping Bus Positions

With a timestamp and location for each vehicle over the study timeframe, we can calculate the average speed for each minute-long observation. Animating the buses as they travel along the route shows how the vehicles are generally unimpeded by traffic at 6am, but as rush hour progresses we see more delays, including some "bunching".

<StickyScroller
  id='full-route-animation'
  content={FullRouteAnimation}
  scrollerItems={[
    'This map animates all B67 bus locations on the morning of Tuesday, January 29th from 6am to 9am.  The chart shows the number of active vehicles along the route with their speed categories for each minute of data',
    'Downtown Brooklyn creates a bottleneck along the northern end of the route, as many bus routes converge on a denser area with more congested streets',
    'Northbound buses make a left turn from 7th Avenue to Flatbush.  As the streets get more congested, we see more buses delayed passing through this intersection',
    'As rush hour begins, we see many more buses in the 0-5 mph range as they traverse the route between Kensington and DUMBO'
  ]}
/>

## The View from Each Bus Stop

For each minute of our three-hour study timeframe, we asked the API when the next bus would arrive at each stop along the route. Charting these "next bus" estimates on a bar chart with time on the x-axis yields a "burn-down" chart. Each minute, the next bus arrival time decreases until it gets to zero, the bus comes, and we see a new estimate for the following bus. The pattern that emerges is a sequence of triangles, but the size and shape can tell us and interesting story of what's happening along the route.

Under ideal circumstances, a bus that arrives regularly every X minutes should yield a chart with uniform triangles, each with a consistent linear downward slope. 

<ImageWithCaption
  src='/data-stories-resources/brooklyn-bus-times/img/b67_schedule.png'
  caption='The weekday northbound schedule for the B67 has buses departing about every 10 minutes with some additional runs around 8am.  The 3-hour observation period of this analysis is outlined in red.  Source: Source: MTA B67/B69 Bus Schedule'
  shadow
  minHeight={500}
/>

In reality, delays cause the triangles to have different sizes and irregular slopes. Small and large triangles mixed in with the normal sized triangles represent bus-bunching and delays. Irregular slopes represent inaccurate arrival estimates (due to delays)

On their own, these burn-down charts tell a single stop's story over our study timeframe. Stacking the charts using the stop sequence shows how that story changes over the course of the route, and small delays near the beginning of the route can cascade into much larger downstream effects.

<ImageWithCaption
  src='/data-stories-resources/brooklyn-bus-times/img/bus_wait_times@2x.png'
  caption='Estimated wait times for each minute of the 3-hour observation period for each stop shows a clear pattern of exacerbated delays and bunching as delays compound along the route'
  shadow
  minHeight={500}
/>

One observation that we didn't think about until seeing this series of charts is that the estimated arrival times can't be calculated until a bus begins its trip. We can see that the earlier stops don't have as much information on when the next bus is coming, and each subsequent trip has fewer minutes of "no data".  About halfway through he route we see all of the gaps disappear and have continuous estimates over the observation period.

On the northbound route, we see fairly consistent pattern until after 7am, when a major delay occurs.  The delay gets larger and larger until it's about 40 minutes near the end of the route.  Notice that for much of the northbound run, the large delay burn-down triangle is immediately followed by a tiny one; This is "bunching", where the following bus has caught up to the one in front of it, and they arrive at nearly the same time.

We can see a similar large delay on the southbound run (it's almost a full-hour between buses at the end of the run!)

There are also instances of non-linear slope at certain points in these charts.  A bulging burn-down triangle indicates that the estimated arrival took longer than planned as time progressed.  Likewise, a concave burn-down triangle shows the bus arrived sooner than previously expected.

## Next Steps

Our analysis provides just a tiny peek into the trove of real-time data available from the MTA. You could see how identifying patterns of inefficiency in the data might help planners intercede with solutions to improve the rider experience. Interventions like changing signal timing at a key intersection to improve traffic flows, or scaling up or down the number of live buses on a route to accommodate demand can be made data-driven and easily tested.

Some ideas for further analysis of vehicle and stop data include:

- Weekday versus weekend analysis for a given route

- Full-weekday analysis (to examine whether and how things normalize between morning and evening rush hour)

- Route comparisons (which routes are most consistent in their arrival? Which ones have the wildest swings/delays?) The [letter grade system in use at busturnaround.nyc](http://busturnaround.nyc/report-cards/) is a great example of this kind of comparative scoring.

- The impact of events, street closures, and weather on bus timeliness.

We're interested in archiving real-time data in Qri and may have some ready-to-go datasets for other routes soon. Give us a yell on twitter if you're interested in building on this work. Our data analysis team may be able to give you a hand.

🙏 Thanks for reading!
