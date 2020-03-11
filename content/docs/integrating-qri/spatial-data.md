---
metaTitle: "Using Spatial Data with Qri"
metaDescription: "How to save and retrieve vector spatial data formats in Qri"
---

import ImageWithCaption from '../../../src/components/ImageWithCaption.js'


Qri works best with tabular data, and importing a CSV is the preferred method of creating a new Qri Dataset.  While Qri does not have features that work specifically with spatial data, it's possible to version your spatial dataset by converting it into a CSV with a Well-known text geometry as one of its columns.

This is easily accomplished using desktop GIS software or the GDAL set of Command Line Tools.  

## Well-known Text in CSVs

Well-known text (WKT) is a text markup language for representing vector geometry objects on a map.  For example, the Well-known Text representation of a WGS84 (latitude/longitude) point for the center of New York City is `POINT (-74.0060 40.7128)`.  

A common way to add WKT geometries to a CSV is to add a column named `geom` or `geometry`

* [Well-known text representation of geometry (Wikpedia)](https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry)

## Converting a Shapefile to CSV with Well-known Text using QGIS

Start with [this shapefile of U.S. State Boundaries](https://www2.census.gov/geo/tiger/GENZ2018/shp/cb_2018_us_state_20m.zip) from The U.S. Census Bureau.

After opening the shapefile in QGIS, we can use the export dialog to convert it to other formats.  Right click the layer and select `Export > Save Features As...`

<ImageWithCaption
  src='/img/docs/integrating-qri/qgis-1.png'
  caption='Export your shapefile to a CSV using the export dialog' shadow
/>

Set the `Format` as `Comma Separated Value [CSV]`, specify the save location, then under `Layer Options` make sure `GEOMETRY` is set to `AS_WKT`.

<ImageWithCaption
  src='/img/docs/integrating-qri/qgis-2.png'
  caption='Specify a CSV export and set GEOMETRY to AS_WKT under Layer Options'
/>


The new CSV file you created contains a column header named `wkt`.  We recommend changing this to `geom` or `geometry`, which is easy to do in Qri Desktop by editing the dataset's [structure component](https://qri.io/docs/dataset-components/structure).  (_if you know of a way to change the default column name in QGIS, we'd love to hear about it_)

The CSV can now be imported into Qri Desktop or Qri CLI.  

<ImageWithCaption
  src='/img/docs/integrating-qri/qgis-3.png'
  caption='In Qri Desktop, we can see the WKT geometries in the geom column'
/>



## Converting a Shapefile to CSV with Well-known Text using GDAL

You can do the same operation using GDAL's `ogr2ogr` command.  The format for the command is:

`ogr2ogr -f CSV {export filepath} {import filepath} -lco GEOMETRY=AS_WKT`

To match our example above with the 50 states shapefile, the command would be:

`ogr2ogr -f CSV state-borders.csv cb_2018_us_state_20m.shp -lco GEOMETRY=AS_WKT`


## Example Qri Datasets with WKT Geometries

* [NYC Zoning Lots (chriswhong/nyc-zoning-lots)](https://qri.cloud/chriswhong/nyc_zoning_lots)
