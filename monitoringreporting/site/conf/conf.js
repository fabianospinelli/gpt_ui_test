var thematicViewerApp = {};
thematicViewerApp.sandbox = {};

//thematicViewerApp.geoportalHostURL = 'https://inspire-geoportal.ec.europa.eu/';
thematicViewerApp.geoportalHostURL = '//localhost';

thematicViewerApp.ecTranslateSrvHostURL = '//localhost';
thematicViewerApp.ecTranslateSrvPath = '/ECTranslationServiceClient/webresources/translate';

thematicViewerApp.harvestStatusHostURL = '//localhost';

thematicViewerApp.linkageCheckerURL = '//localhost';
thematicViewerApp.linkageCheckerPath = '/GeoportalProxyWebServices/resources/INSPIREResourcesLinkageTester';

thematicViewerApp.solrSelectPath = '/solr/select';
thematicViewerApp.harvestingStatusPath = '/GeoportalProxyWebServices/resources/INSPIREResourcesReport/';
thematicViewerApp.harvestingStatusPathSpecificRequest = '/resources/INSPIREResourcesReports/resourcesReport_{0}/inspire.geoportal.resource.jsonp';
thematicViewerApp.geoportalResourcesPath = '/resources';
thematicViewerApp.kmlPath = '/resources/kml.php';

thematicViewerApp.versionFile = '/conf/current.version';
thematicViewerApp.releaseNotesFile = '/release-notes.xml';

thematicViewerApp.sandbox.active = false;
thematicViewerApp.sandbox.folder = '/sandbox';
thematicViewerApp.sandbox.title = 'Sandbox instance';
thematicViewerApp.sandbox.infoText = 'This is a sandbox instance where you can test the last harvest from the harvest console application.';
thematicViewerApp.sandbox.titleElement = '<i class="fab fa-codepen text-warning"></i> <span class="text-warning">' + thematicViewerApp.sandbox.title + '</span> <i data-toggle="tooltip" data-placement="bottom" title="' + thematicViewerApp.sandbox.infoText + '" class="fas fa-info-circle text-warning"></i>';

if (thematicViewerApp.sandbox.active) {
    thematicViewerApp.geoportalHostURL = thematicViewerApp.geoportalHostURL + thematicViewerApp.sandbox.folder;
}