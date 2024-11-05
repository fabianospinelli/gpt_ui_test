# M&R

In `resources` there are a series of folders used by the M&R dashboard. This `resources` path should be reachable and served by the HTTP server.
With Geoportal Classic, since it could take a lot of disk space, year after year, it has been moved in a dedicated folder on a different disk partition (ie. in Geoportal Classic `/solr/inspire/xmlroot/<mr202x>/resources`)

Inside each folders, the convention `<endpoint_uuid>.<extension>` for the filenames depends on the source of data.
With Geoportal Classic, the filename is realized as `INSPIRE-<uuid>.<extension>`.
With the new Geoportal Geonetwork, the filename is `<uuid>.<extension>`, where `<uuid>` is the Geonetwork's `harvesterUuid` db field.

- `/resources/geoportal`: it should contain all the JSON data retrieved from the geoportal. File name convention: <endpoint_uuid>.json
- `/resources/validator`: it should contain all the JSON data generated by the validator Spoon script. File name convention: <endpoint_uuid>.json
- `/resources/failed`: it should contain all the failed csv data file. File name convention: <endpoint_uuid>.csv
- `/resources/failed_report`: it should contain the archived test reports for each failed dataset or services, if available, generated by the validator Spoon script.
  - File name convention for dataset: <endpoint_uuid>.dataset.zip
  - File name convention for services: <endpoint_uuid>.services.zip

For the published content of this folder, please refer also to the git repository "inspire-geoportal-mr-data", and clone/copy the matching folder, overwriting the content here.