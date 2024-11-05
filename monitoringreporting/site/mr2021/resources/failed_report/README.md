This folder should contain a series of ZIP files containing the report generated during the validation.
The reports are grouped by type: `dataset` or `series`.

File names: they should respect the following convention:

 - `<endpoint_uuid>.dataset.zip`
 - `<endpoint_uuid>.services.zip`

The ZIP file should contain a list of report (HTML and JSON version) for each metadata that failed validation.
Example:

- `21-40_8.html`
- `21-40_8.json`

For further reference, see `.reference` files, if available.