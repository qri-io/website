---
metaTitle: "kepler.gl"
metaDescription: "Visualizing a qri.cloud dataset in kepler.gl"
---

import ImageWithCaption from '../../../src/components/ImageWithCaption.js'

In this doc we will explore how to use the client-side mapping tool kepler.gl with data sourced _directly_ from a dataset hosted on qri.cloud.  There's no need to download and juggle files, you can call the data straight from the source using the qri.cloud API.

## Spatial Data in Qri Datasets

You can think of a qri dataset as a single CSV that brings along some additional information like [metadata](/docs/dataset-components/meta), [a data schema](/docs/dataset-components/structure), [version history](/docs/working-with-datasets/versioning), etc.  CSVs may not have a reputation as a spatial data file format, but they're perfectly capable of storing geometries as text.  

The simplest example for describing point geometries is two columns, each storing a number (such as `latitude` and `longitude`).  For more complex geometries, you can just encode the geometry as [geojson](https://geojson.org/) or [Well-known Text (WKT)](https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry).  See [Using Spatial Data with Qri](/docs/integrating-qri/spatial-data) to learn more about formatting your spatial dataset for compatibility with qri.

## Get the API call for a CSV

Once a dataset is published on qri.cloud, its components can be accessed via our API.  To get the dataset body as a CSV, the API call looks like this:
```
https://api.qri.cloud/get/{username}/{datasetname}/body.csv?all=true
```
Don't have a good CSV with spatial data ready to go?  We've got you covered.  Here's a qri dataset with 30 days of earthquakes from September 2020: https://qri.cloud/qri-demo-data/earthquakes

Let's copy the API url for its CSV and go play with kepler.gl!  
```
https://api.qri.cloud/get/qri-demo-data/earthquakes/body.csv?all=true
```

(You can also paste this url into a web browser and it will download a CSV file)

## Visualize the Data in kepler.gl

Go to kepler.gl and click the "Get Started" button.  You'll be greeted with the "Add Data to Map" modal.

Choose the "Load Map using URL" tab and paste in your qri API url.

<ImageWithCaption
  src='/img/docs/integrating-qri/kepler-add-data.png'
  caption="Paste a qri API url into the 'Load Map using URL' pane"
/>

Click 'fetch' and kepler.gl will grab the data from the qri.cloud API and see if it can find geometries to show on the map.  In our case, it finds `latitude` and `longitude` columns and renders a tan point for each earthquake in the dataset.

<ImageWithCaption
  src='/img/docs/integrating-qri/kepler-quakes-raw.png'
  caption="kepler.gl finds the latitude and longitude columns and renders a point for each earthquake"
/>

Now we can use kepler.gl's interface to tune the styling of our points.  An interesting tidbit about the USGS earthquakes dataset is that _all earthquakes are not necessarily earthquakes_.  There is a `type` column, and in it we have things like _explosion_, _ice quake_, and _quarry blast_.

We can use kepler.gl to color code by each row's `type` value.  (Be sure to choose a [qualitative color ramp](https://web.natur.cuni.cz/~langhamr/lectures/vtfg1/mapinfo_2/barvy/colors.html#qual))  Color coding, along with fine tuning the radius and opacity, give us an interesting map of the spatial patterns of different types of tremors that the USGS keeps track of.  In North America, we can see a few clusters of quarry blasts, as well as explosions showing up in the Pacific Northwest.  

<ImageWithCaption
  src='/img/docs/integrating-qri/kepler-quakes-categorical.png'
  caption="Categorical coloring of the points by type shows the spatial patterns of different kinds of tremors"
/>

## Onward!

Once you've pushed your dataset to qri.cloud, our API allows you to integrate with any tools that "speak CSV".  Your dataset is also versioned, and the API call for the body will always get you the latest data.  It's also possible to grab older versions via the API if you ever need them.

Have you tinkered with data from the qri API in kepler.gl?  We'd love to hear from you.  [Drop us a line on twitter](https://twitter.com/qri_io) or [hop into our public discord](https://discordapp.com/invite/thkJHKj).
