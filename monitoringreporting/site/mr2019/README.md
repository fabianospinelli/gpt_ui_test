# M&R

In `resources` there are a series of folders used by the M&R dashboard. This `resources` path should be reachable and served by the HTTP server.
With Geoportal Classic, since it could take a lot of disk space, year after year, it has been moved in a dedicated folder on a different disk partition (ie. in Geoportal Classic `/solr/inspire/xmlroot/<mr202x>/resources`)

For the published content of this folder, please refer also to the git repository "inspire-geoportal-mr-data", and clone/copy the matching folder, overwriting the content here.


When used in Geonetwork:
Geonetwork uses a library (wro4j) that compress, merge all the static files (ie. Javascripts) so the two libraries
- FileSaver
- sheetjs
are incompatible with the current UI.
Here they are stored for historical reference purposes.
DO NOT UNZIP THEM BUT
TO FIX - update this MR2019 code to make use of the two libraries under /libs