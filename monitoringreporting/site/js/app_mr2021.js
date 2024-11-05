"use strict";
//*** declaring const and properties ***//

// Countries and endpoints initial dataset
const enabled_countries = [
    {"countrycode": "at", "name": "Austria", "enabled": true, "endpoints": [
            {"id": "INSPIRE-61494ff5-6fad-11e8-b649-52540023a883", "url": "https://geometadaten.lfrz.at/at.lfrz.discoveryservices/srv/ger/csw", "prevId": "INSPIRE-61494ff5-6fad-11e8-b649-52540023a883", },
        ]
    },
    {"countrycode": "be", "name": "Belgium", "enabled": true, "endpoints": [
            {"id": "INSPIRE-210556c9-36d4-11e1-aeeb-52540004b857", "url": "https://geobru-geonetwork.irisnet.be/geonetwork/inspire/fre/csw", "prevId": "INSPIRE-210556c9-36d4-11e1-aeeb-52540004b857", },
            {"id": "INSPIRE-b285fced-4eb6-11e8-a459-52540023a883", "url": "http://inspire.reporting.geo.be/eng/csw", "prevId": "INSPIRE-b285fced-4eb6-11e8-a459-52540023a883", },
            {"id": "INSPIRE-f0c91711-ece0-11e8-a08e-52540023a883", "url": "https://metadata.vlaanderen.be/srv/dut/csw", "prevId": "INSPIRE-f0c91711-ece0-11e8-a08e-52540023a883", },
            {"id": "INSPIRE-f5201eb0-2404-11e5-8130-52540004b857", "url": "http://geoservices.wallonie.be/metawal/csw-inspire", "prevId": "INSPIRE-f5201eb0-2404-11e5-8130-52540004b857", },
        ]
    },
    {"countrycode": "bg", "name": "Bulgaria", "enabled": true, "endpoints": [
            {"id": "INSPIRE-365cf7f1-3cbd-11eb-835b-52540004b857", "url": "https://inspire-catalogue.egov.bg/geonetwork/srv/eng/csw", "prevId": "INSPIRE-e61d4555-c008-11e9-990e-0050563f943c", },
        ]
    },
    {"countrycode": "hr", "name": "Croatia", "enabled": true, "endpoints": [
            {"id": "INSPIRE-697db035-9af0-11e3-8508-52540004b857", "url": "https://geoportal.nipp.hr/geonetwork/srv/hrv/csw-inspire", "prevId": "INSPIRE-697db035-9af0-11e3-8508-52540004b857", },
        ]
    },
    {"countrycode": "cy", "name": "Cyprus", "enabled": true, "endpoints": [
            {"id": "INSPIRE-db3ec3d9-7bfb-11e6-b44d-52540023a883", "url": "https://eservices.dls.moi.gov.cy/geoportal_inspire/csw", "prevId": "INSPIRE-db3ec3d9-7bfb-11e6-b44d-52540023a883", },
        ]
    },
    {"countrycode": "cz", "name": "Czech Republic", "enabled": true, "endpoints": [
            {"id": "INSPIRE-16542303-763e-11e4-8b38-52540004b857", "url": "http://geoportal.gov.cz/php/micka/csw/filter/inspire", "prevId": "INSPIRE-16542303-763e-11e4-8b38-52540004b857", },
        ]
    },
    {"countrycode": "dk", "name": "Denmark", "enabled": true, "endpoints": [
            {"id": "INSPIRE-6e8353b4-de80-11e7-a188-52540023a883", "url": "https://www.geodata-info.dk/srv/dan/csw", "prevId": "INSPIRE-6e8353b4-de80-11e7-a188-52540023a883", },
        ]
    },
    {"countrycode": "ee", "name": "Estonia", "enabled": true, "endpoints": [
            {"id": "INSPIRE-608e479c-616e-11e2-b563-52540004b857", "url": "https://metadata.geoportaal.ee/geonetwork/inspire/eng/csw", "prevId": "INSPIRE-608e479c-616e-11e2-b563-52540004b857", },
        ]
    },
    {"countrycode": "fi", "name": "Finland", "enabled": true, "endpoints": [
            {"id": "INSPIRE-f670705f-f4e9-11e6-81e4-52540023a883", "url": "https://www.paikkatietohakemisto.fi/geonetwork/srv/fin/csw", "prevId": "INSPIRE-f670705f-f4e9-11e6-81e4-52540023a883", },
        ]
    },
    {"countrycode": "fr", "name": "France", "enabled": true, "endpoints": [
            {"id": "INSPIRE-e945138d-613a-49cd-87b2-aebd4e8e4b07", "url": "http://www.geocatalogue.fr/api-public/prior/servicesRest", "prevId": "INSPIRE-5145fa60-0067-11e5-9ea6-52540004b857", },
        ]
    },
    {"countrycode": "de", "name": "Germany", "enabled": true, "endpoints": [
            {"id": "INSPIRE-4fed3eb0-06fa-11ea-8480-525400695e9c", "url": "http://l.gdk.prod.ffm.gdi-de.org/geonetwork/srv/ger/csw", "prevId": "INSPIRE-4fed3eb0-06fa-11ea-8480-525400695e9c", },
        ]
    },
    {"countrycode": "el", "name": "Greece", "enabled": true, "endpoints": [
            {"id": "INSPIRE-b4838d76-ec02-11e8-a08e-52540023a883", "url": "http://geoportal.ypen.gr/geonetwork/srv/eng/csw", "prevId": "INSPIRE-b4838d76-ec02-11e8-a08e-52540023a883", },
        ]
    },
    {"countrycode": "hu", "name": "Hungary", "enabled": true, "endpoints": [
            {"id": "INSPIRE-412cdb45-0b05-11e7-9a72-52540023a883", "url": "http://inspire.gov.hu/geonetwork/srv/eng/csw", "prevId": "INSPIRE-412cdb45-0b05-11e7-9a72-52540023a883", },
        ]
    },
    {"countrycode": "is", "name": "Iceland", "enabled": true, "endpoints": [
            {"id": "INSPIRE-7ba666ea-05bd-11e7-9a72-52540023a883", "url": "https://gatt.lmi.is/geonetwork/srv/eng/csw", "prevId": "INSPIRE-7ba666ea-05bd-11e7-9a72-52540023a883", },
        ]
    },
    {"countrycode": "ie", "name": "Ireland", "enabled": true, "endpoints": [
            {"id": "INSPIRE-67c9c760-1be3-11e3-851a-52540004b857", "url": "https://inspire.geohive.ie/geoportal/csw", "prevId": "INSPIRE-67c9c760-1be3-11e3-851a-52540004b857", },
        ]
    },
    {"countrycode": "it", "name": "Italy", "enabled": true, "endpoints": [
            {"id": "INSPIRE-c22038a7-4e03-11e8-a459-52540023a883", "url": "http://geodati.gov.it/RNDT/csw", "prevId": "INSPIRE-c22038a7-4e03-11e8-a459-52540023a883", },
        ]
    },
    {"countrycode": "lv", "name": "Latvia", "enabled": true, "endpoints": [
            {"id": "INSPIRE-10108b88-d195-11e5-91ce-52540023a883", "url": "https://geometadati.viss.gov.lv/geoportal/csw", "prevId": "INSPIRE-10108b88-d195-11e5-91ce-52540023a883", },
        ]
    },
    {"countrycode": "li", "name": "Liechtenstein", "enabled": true, "endpoints": [
            {"id": "INSPIRE-86b8eec9-581d-11e4-b478-52540004b857", "url": "http://www.geocat.ch/geonetwork/srv/ger/csw-liechtenstein-inspire", "prevId": "INSPIRE-86b8eec9-581d-11e4-b478-52540004b857", },
        ]
    },
    {"countrycode": "lt", "name": "Lithuania", "enabled": true, "endpoints": [
            {"id": "INSPIRE-106902a4-2bd0-11e9-a83c-52540023a883", "url": "https://www.inspire-geoportal.lt/geonetwork/srv/eng/csw", "prevId": "INSPIRE-106902a4-2bd0-11e9-a83c-52540023a883", },
        ]
    },
    {"countrycode": "lu", "name": "Luxembourg", "enabled": true, "endpoints": [
            {"id": "INSPIRE-93ee1068-1dc3-11e7-a02d-52540023a883", "url": "http://catalog.inspire.geoportail.lu/geonetwork/srv/eng/csw", "prevId": "INSPIRE-93ee1068-1dc3-11e7-a02d-52540023a883", },
        ]
    },
    {"countrycode": "mt", "name": "Malta", "enabled": true, "endpoints": [
            {"id": "INSPIRE-80e86358-9378-11e5-a300-a0369f4c5bc0", "url": "https://msdi.data.gov.mt/geonetwork/srv/eng/csw", "prevId": "INSPIRE-80e86358-9378-11e5-a300-a0369f4c5bc0", },
        ]
    },
    {"countrycode": "nl", "name": "Netherlands", "enabled": true, "endpoints": [
            {"id": "INSPIRE-8c93a17a-05f4-11e1-b7de-52540004b857", "url": "	https://www.nationaalgeoregister.nl/geonetwork/srv/dut/csw-inspire", "prevId": "INSPIRE-8c93a17a-05f4-11e1-b7de-52540004b857", },
        ]
    },
    {"countrycode": "no", "name": "Norway", "enabled": true, "endpoints": [
            {"id": "INSPIRE-ccf3ad04-9003-11e3-aef9-52540004b857", "url": "http://www.geonorge.no/geonetwork/srv/eng/csw-inspire", "prevId": "INSPIRE-ccf3ad04-9003-11e3-aef9-52540004b857", },
        ]
    },
    {"countrycode": "pl", "name": "Poland", "enabled": true, "endpoints": [
            {"id": "INSPIRE-d81e48c4-b4cf-11e3-a455-52540004b857", "url": "http://mapy.geoportal.gov.pl/wss/service/CSWINSP/guest/CSWStartup", "prevId": "INSPIRE-d81e48c4-b4cf-11e3-a455-52540004b857", },
        ]
    },
    {"countrycode": "pt", "name": "Portugal", "enabled": true, "endpoints": [
            {"id": "INSPIRE-d60bf7f3-ea96-11e4-a2c7-52540004b857", "url": "https://snig.dgterritorio.gov.pt/rndg/srv/eng/csw-inspire", "prevId": "INSPIRE-d60bf7f3-ea96-11e4-a2c7-52540004b857", },
        ]
    },
    {"countrycode": "ro", "name": "Romania", "enabled": true, "endpoints": [
            {"id": "INSPIRE-7edbed58-ddbc-11e4-b469-52540004b857", "url": "https://geoportal.gov.ro/metadata_manager_v2/csw", "prevId": "INSPIRE-7edbed58-ddbc-11e4-b469-52540004b857", },
        ]
    },
    {"countrycode": "sk", "name": "Slovakia", "enabled": true, "endpoints": [
            {"id": "INSPIRE-da77b119-9d6e-11e7-b5a7-52540023a883", "url": "https://rpi.gov.sk/rpi_csw/service.svc/get", "prevId": "INSPIRE-da77b119-9d6e-11e7-b5a7-52540023a883", },
        ]
    },
    {"countrycode": "si", "name": "Slovenia", "enabled": true, "endpoints": [
            {"id": "INSPIRE-6f0cd439-226d-11e6-9ff2-52540023a883", "url": "https://eprostor.gov.si/imps/srv/slv/csw-INSPIRE", "prevId": "INSPIRE-6f0cd439-226d-11e6-9ff2-52540023a883", },
        ]
    },
    {"countrycode": "es", "name": "Spain", "enabled": true, "endpoints": [
            {"id": "INSPIRE-c6f329a0-4c3d-11e7-9e8f-52540023a883", "url": "http://www.idee.es/csw-codsi-idee/srv/spa/csw", "prevId": "INSPIRE-c6f329a0-4c3d-11e7-9e8f-52540023a883", },
        ]
    },
    {"countrycode": "se", "name": "Sweden", "enabled": true, "endpoints": [
            {"id": "INSPIRE-adae82ae-5364-11e8-bd03-52540023a883", "url": "https://www.geodata.se/geodataportalen/srv/swe/csw-inspire-swe", "prevId": "INSPIRE-adae82ae-5364-11e8-bd03-52540023a883", },
        ]
    },
    {"countrycode": "ch", "name": "Switzerland", "enabled": true, "endpoints": [
            {"id": "INSPIRE-7a076b28-098b-11e7-9a72-52540023a883", "url": "https://www.geocat.ch/geonetwork/srv/eng/csw-geobasisdaten", "prevId": "INSPIRE-7a076b28-098b-11e7-9a72-52540023a883", },
        ]
    }
];

// Ajax calls file/folder
const mr2020_data_dir = 'mr2020/resources';
const mr2021_data_dir = 'mr2021/resources';

const file_folder_geoportal = 'geoportal';
const file_folder_validator = 'validator';

// Spreadsheet informations
const spreadsheet_title = 'Monitoring Indicators 2021';
const spreadsheet_subject = 'Monitoring Indicators 2021';
const spreadsheet_author = 'JRC';
const spreadsheet_type = {bookType: 'xlsx', type: 'binary'};
const spreadsheet_fileExtension = '.xlsx';

// Data attrubutes name and partial names
const data_type_suffix_dataset = '-ds';
const data_type_suffix_services = '-sv';
const data_type_suffix_series = '-sr';

// Elements IDs constants
const card_id_prefix = 'card-';
const tab_id_prefix = 'tab-';
const tab_id_suffix = '-tab';

const element_id_ultab = 'tab-header-main';
const element_id_tab_content = 'tab-content-main';
const element_id_country_name = 'country-name';
const element_id_country_flag = 'country-flag';
const element_id_no_data_warning_message = 'no-data-warn-message';
const element_id_partial_data_warning_message = 'part-data-warn-message';
const element_id_tab_header_main = 'tab-header-main';
const element_id_full_download = 'full-download';
const element_id_downloadReport = 'downloadReport';

const card_class_text_white = 'text-white';
const card_class_text_dark = 'text-dark';
const card_class_bg_blue = 'bg-ec-blue';
const card_class_bg_yellow = 'bg-ec-yellow';
const card_class_bg_light = 'bg-light';

// Parameter names
const url_parameter_name_country = 'country';

// Element names
const element_name_img = 'img';
const element_name_a = 'a';
const element_name_h5 = 'h5';

// Attributes name constants
const attribute_name_href = 'href';
const attribute_name_src = 'src';
//
const attribute_name_title = 'title';

// Elements classname constants
const element_class_cards_container = 'card-deck';

const element_class_endpoint_url = 'endpoint-url';
const element_class_endpoint_id = 'endpoint-id';
const element_class_dumpdate = 'dumpdate';

const element_class_dataset = 'dataset';
const element_class_services = 'services';
const element_class_series = 'series';

const element_class_dataset_passed = 'dataset_passed';
const element_class_dataset_failed = 'dataset_failed';
const element_class_services_passed = 'services_passed';
const element_class_services_failed = 'services_failed';
//const element_class_failed_csv = 'failed_csv';
const element_class_summary_csv = 'summary_csv';
//const element_class_failed_csv_container = 'failed_csv_container';
const element_class_summary_csv_container = 'summary_csv_container';

const element_class_dataset_failed_link = 'dataset_failed_link';
const element_class_services_failed_link = 'services_failed_link';
const element_class_summary_failed_link = 'failed_csv_container';

const element_class_tab_pane = 'tab-pane';
const element_class_active = 'active';

const element_class_rating_suffix = '_rating';
const element_class_trend_suffix = '_trend';

const element_class_DSi_1_1 = 'DSi_1_1';
const element_class_DSi_1_2 = 'DSi_1_2';
const element_class_DSi_1_3 = 'DSi_1_3';
const element_class_DSi_1_4 = 'DSi_1_4';
const element_class_DSi_1_5 = 'DSi_1_5';

const element_class_MDi_1_1 = 'MDi_1_1';
const element_class_MDi_1_2 = 'MDi_1_2';

const element_class_DSi_2_0 = 'DSi_2_0';
const element_class_DSi_2_1 = 'DSi_2_1';
const element_class_DSi_2_2 = 'DSi_2_2';
const element_class_DSi_2_3 = 'DSi_2_3';

const element_class_NSi_2_0 = 'NSi_2_0';
const element_class_NSi_2_1 = 'NSi_2_1';
const element_class_NSi_2_2 = 'NSi_2_2';

const element_class_NSi_4_0 = 'NSi_4_0';
const element_class_NSi_4_1 = 'NSi_4_1';
const element_class_NSi_4_2 = 'NSi_4_2';
const element_class_NSi_4_3 = 'NSi_4_3';
const element_class_NSi_4_4 = 'NSi_4_4';

// Regular expressions
const regExp_gi_arg0 = /\{0\}/gi;

// used in the generation of the indicator
const CONST_DSi_1_1_id = 'DSi_1_1';
const CONST_DSi_1_2_id = 'DSi_1_2';
const CONST_MDi_1_1_id = 'MDi_1_1';
const CONST_MDi_1_2_id = 'MDi_1_2';
const indicator_value_format_percentage = 'percentage';
const indicator_value_format_integer = 'integer';

//***  Declaring global variables ***//
var pageId; // used in HTML to define the loaded page

var previous_mr_data_dir = null;
var current_mr_data_dir = null;

// Variable to check the status of the calls and keep the count
var data_check = new Array();

var countryObject = null;
var mrCountryData = null;

//***  Initializing the system ***//

//*** Script body **//
function IndicatorResultData(id, format, value, formattedValue, sourceDataCollection) {
    this.id = id;
    this.format = format;
    this.value = value;
    this.formattedValue = formattedValue;
    this.sourceData = sourceDataCollection;
}
function MREndpointData() {
    this.gptDataSource = null;
    this.valDataSource = null;
    this.data = null;
    this.isSourcesAvailable = function () {
        return (this.gptDataSource !== null && this.valDataSource !== null);
    }
}
function MREndpointDataItem(endpoint, prevEvalData, currentEvalData) {
    this.endpoint = endpoint;
    this.previousEvaluationData = prevEvalData;
    this.currentEvaluationData = currentEvalData;
}
function MRCountryData(countryCode) {
    this.countryCode = countryCode;
    this.endpoints = [];
}

function MRAjaxMessage(countryObject, mrEndpointDataItem, dataSourceType, dataUrl, dataStore) {
    this.countryObject = countryObject;
    this.mrEndpointDataItem = mrEndpointDataItem;
    this.dataSourceType = dataSourceType;
    this.url = dataUrl;
    this.dataStore = dataStore;
}

function MRDataCheckItem(totalGptEndpointCount, totalValEndpointCount) {
    this.total_gpt = totalGptEndpointCount;
    this.total_val = totalValEndpointCount;
    this.tested_gpt = 0;
    this.tested_val = 0;
    this.found_gpt = 0;
    this.found_val = 0;
    this.val_ds = 0;
    this.val_sv = 0;
    this.val_sr = 0;
}

// initialization
function initializeDataCheckObject() {
    for (let country of enabled_countries) {
        let countryEndpointsCount = country.endpoints.length;
        data_check[country.countrycode] = new MRDataCheckItem(countryEndpointsCount, countryEndpointsCount);
    }
}

// ** Data file check ** // 
// Checks if a file is accessible and uses the related callback.
// In both cases the same callback is called, but the data var is empty in case 
// the file is not found
//DART this works for MR2020, MR2021
function buildMRDataURL(mr_data_dir, endpointId, dataSourceType) {
    return mr_data_dir + '/' + dataSourceType + '/' + endpointId + '.json';
}

function ajaxRetrieveMRData(url, mrAjaxMessage, callback) {
    $.ajax(url).always(function (data) {
        callback(data, mrAjaxMessage);
    });
}

//
// Dashboard page
//

// Rendering the cards in the overall dashboard
function renderCards() {
    // Init variables
    let card_container = $('.' + element_class_cards_container);
    let i = 0;

    // Init container
    card_container.empty();

    for (let countryObject of enabled_countries) {
        if (countryObject.enabled === true) {
            // Checking for bt rows separator
            if (i % 4 === 0) {
                card_container.append(snippet_bt_wrap_2_smmd);
                card_container.append(snippet_bt_wrap_4_lg);
            } else if (i % 4 === 2) {
                card_container.append(snippet_bt_wrap_2_smmd);
            }

            // Replacing country codes and names
            let out = countryCard_htmlSnippetTemplate
                    .replace(countryCard_countryCodePlaceHolderRegex, countryObject.countrycode)
                    .replace(countryCard_countryNamePlaceHolderRegex, countryObject.name);

            // Creating the card
            card_container.append(out);

            // Iterating over endpoints
            for (let endpoint of countryObject.endpoints) {
                // Checking firstly Geoportal data and then Validator data file
                let endpointId = endpoint.id;
                let dataSrcType = file_folder_geoportal;
                let dataUrl = buildMRDataURL(current_mr_data_dir, endpointId, dataSrcType);
                let mrEndpointDataItem = new MREndpointDataItem(endpoint, null, null);
                let ajaxMsg = new MRAjaxMessage(
                        countryObject,
                        mrEndpointDataItem,
                        dataSrcType,
                        dataUrl,
                        null);
                retrieveMREndpointData(ajaxMsg, geoportalTileDataCallback);
            }

            i++;
        }
    }

    // Complete the row in case there are less than 4 cards.
    for (let j = (4 - (i % 4)); j > 0; j--) {
        card_container.append(snippet_dummy_card_filler);
    }
}

// Geoportal Tiles data check callback function
function geoportalTileDataCallback(data, mrAjaxMessage) {
    if (mrAjaxMessage !== null && mrAjaxMessage.countryObject !== null && mrAjaxMessage.mrEndpointDataItem !== null) {
        let countryCode = mrAjaxMessage.countryObject.countrycode;
        let endpointId = mrAjaxMessage.mrEndpointDataItem.endpoint.id;

        if (countryCode !== null) {
            // Increasing the number of tested endpoints data files
            data_check[countryCode].tested_gpt += 1;

            if (data !== null && data.id !== undefined && data.id !== null) {
                // Increasing the number of found endpoints data files
                data_check[countryCode].found_gpt += 1;
            }

            // Checking Validator data file
            let dataSrcType = file_folder_validator;
            let valDataUrl = buildMRDataURL(current_mr_data_dir, endpointId, dataSrcType);
            let ajaxMsg = new MRAjaxMessage(
                    mrAjaxMessage.countryObject,
                    mrAjaxMessage.mrEndpointDataItem,
                    dataSrcType,
                    valDataUrl,
                    null);
            retrieveMREndpointData(ajaxMsg, validatorTileDataCallback);
        }
    }
}

// Validator Tiles data check callback function
function validatorTileDataCallback(data, mrAjaxMessage) {
    if (mrAjaxMessage !== null && mrAjaxMessage.countryObject !== null && mrAjaxMessage.mrEndpointDataItem !== null) {
        let countryCode = mrAjaxMessage.countryObject.countrycode;

        if (countryCode !== null) {
            // Increasing the number of tested endpoints data files
            data_check[countryCode].tested_val += 1;

            if (data !== null && data.id !== undefined && data.id !== null) {
                // Increasing the number of found endpoints data file
                data_check[countryCode].found_val += 1;

                // Update numbers
                data_check[countryCode].val_ds += data.type_count.dataset;
                data_check[countryCode].val_sv += data.type_count.service;
                data_check[countryCode].val_sr += data.type_count.series;
            }

            if (data_check[countryCode].tested_val === data_check[countryCode].total_val && data_check[countryCode].tested_gpt === data_check[countryCode].total_gpt) {
                // Rendering the results on the tile
                renderTileColor(countryCode);
            }
        }
    }
}

// Rendering the right color based on the results of the previous file checks
function renderTileColor(countryCode) {
    let card_container = $('#' + card_id_prefix + countryCode);

    if (data_check[countryCode].found_val === data_check[countryCode].total_val && data_check[countryCode].found_gpt === data_check[countryCode].total_gpt) {
        // If geoportal and validator data files have been found correctly
        // Color blue
        card_container.removeClass(card_class_bg_light);
        card_container.removeClass(card_class_text_dark);
        card_container.find(element_name_a).removeClass(card_class_text_dark);
        card_container.find(element_name_h5).removeClass(card_class_text_dark);
        card_container.addClass(card_class_bg_blue);
        card_container.addClass(card_class_text_white);
        card_container.find(element_name_a).addClass(card_class_text_white);
        card_container.find(element_name_h5).addClass(card_class_text_white);
    } else if (data_check[countryCode].found_val != 0 || data_check[countryCode].found_gpt != 0) {
        // If just one of the two files have been found
        // Color yellow
        card_container.removeClass(card_class_bg_light);
        card_container.addClass(card_class_bg_yellow);
    }

    if (data_check[countryCode].found_val > 0) {
        // If more than zero values have been found, showing the results
        // Showing the dataset, services, series numbers
        $('#' + countryCode + data_type_suffix_dataset).text(data_check[countryCode].val_ds);
        $('#' + countryCode + data_type_suffix_services).text(data_check[countryCode].val_sv);
        $('#' + countryCode + data_type_suffix_series).text(data_check[countryCode].val_sr);
    }
}

//
// Details page
//

// Function used to render the details page of a specific country
function renderDetails() {
    // Getting the country passed as parameter
    let countryCode = getUrlParam(url_parameter_name_country);
    if (countryCode !== null) {
        // sanitize
        countryCode = countryCode.toLowerCase().trim();
    }

    // Getting the JSON object for the selected country
    for (let country of enabled_countries) {
        if (country.countrycode === countryCode) {
            countryObject = country;
            break;
        }
    }

    if (countryObject !== null) {
        // start the chain of calls to fill the various collections,
        // and once the data is available the last callback will call the render of the UI
        obtainMRData(countryObject);
    } else {
        console.warning("Unable to load the 'country' parameter");
    }
}

function obtainMRData(countryObject) {
    if (countryObject !== null) {
        mrCountryData = new MRCountryData(countryObject.countrycode);

        let dataSourceTypeCollection = [ file_folder_geoportal, file_folder_validator ];

        // first start the series of async calls to retrieve JSON data
        // for every endpoint in this country
        for (let endpoint of countryObject.endpoints) {
            // render the UI
            //generateMessagesUI();
            generateTabsUI(endpoint.id);
            generateTabContentUI(endpoint.id);
            // Updating the UI with country name and flag
            let country_name_element = $('#' + element_id_country_name);
            country_name_element.text(countryObject.name);

            let countryFlagElem = $('#' + element_id_country_flag);
            if (countryFlagElem) {
                countryFlagElem.html(countryFlag_htmlSnippetTemplate.replace(countryFlag_countryCodePlaceholderRegex, countryObject.countrycode));
            }

            // store the data
            let mrEndpointData = new MREndpointDataItem(endpoint, new MREndpointData(), new MREndpointData());
            let prevDstDataStore = mrEndpointData.previousEvaluationData;
            let currDstDataStore = mrEndpointData.currentEvaluationData;
            mrCountryData.endpoints.push(mrEndpointData);
            for (let dataSrcType of dataSourceTypeCollection) {
                let prevDataUrl = buildMRDataURL(previous_mr_data_dir, endpoint.prevId, dataSrcType);
                let currDataUrl = buildMRDataURL(current_mr_data_dir, endpoint.id, dataSrcType);
                let prevMrAjaxMessage = new MRAjaxMessage(countryObject, mrEndpointData, dataSrcType, prevDataUrl, prevDstDataStore);
                let currMrAjaxMessage = new MRAjaxMessage(countryObject, mrEndpointData, dataSrcType, currDataUrl, currDstDataStore);
                retrieveMREndpointData(prevMrAjaxMessage, collectMRData);
                retrieveMREndpointData(currMrAjaxMessage, collectMRData);
            }
        }
    }
}

function retrieveMREndpointData(mrAjaxMessage, callback) {
    let url = mrAjaxMessage.url;
    ajaxRetrieveMRData(url, mrAjaxMessage, callback);
}

function collectMRData(data, mrAjaxMessage) {
    if (mrAjaxMessage !== null) {
        //&& countryObject !== null && countryEndpointId !== null && dataSourceType !== null)
        let dataStore = mrAjaxMessage.dataStore;
        let dataSourceType = mrAjaxMessage.dataSourceType;
        if (dataStore !== null && dataSourceType !== null) {
            let srcData = null;
            if (data !== null && data.id !== undefined && data.id !== null) {
                // it should look like our data, not a generic error
                srcData = data;
            } else {
                // it seems an error, so this dataSource will be unavailable
                srcData = "Not available";
            }

            if (srcData !== null) {
                switch (dataSourceType) {
                    case file_folder_geoportal:
                        //console.log("received gpt data");
                        dataStore.gptDataSource = srcData;
                        processCollectedData(dataStore);
                        break;
                    case file_folder_validator:
                        //console.log("received val data");
                        dataStore.valDataSource = srcData;
                        processCollectedData(dataStore);
                        break;
                }
            }
        }
        //then, if all the data is available, trigger the consistency checks and update the UI
        let dataCheck = (mrAjaxMessage.mrEndpointDataItem !== null
                && mrAjaxMessage.mrEndpointDataItem.currentEvaluationData !== null
                && mrAjaxMessage.mrEndpointDataItem.currentEvaluationData.isSourcesAvailable()
                && mrAjaxMessage.mrEndpointDataItem.previousEvaluationData !== null
                && mrAjaxMessage.mrEndpointDataItem.previousEvaluationData.isSourcesAvailable());
        if (dataCheck) {
            executeConsistencyChecks(mrAjaxMessage.countryObject, mrAjaxMessage.mrEndpointDataItem);
            renderMRDataToUI(mrAjaxMessage.countryObject, mrAjaxMessage.mrEndpointDataItem);
        }
    }
}

function processCollectedData(dataStore) {
    if (dataStore !== null) {
        if (dataStore.data === null) {
            // data has not been processed yet
            if (dataStore.gptDataSource !== null && dataStore.gptDataSource.id !== undefined) {
                // it has gpt source data!
                if (dataStore.valDataSource !== null) {
                    // well, it got also validator source data
                    dataStore.data = dataStore.gptDataSource;
                    if (dataStore.valDataSource.id !== undefined) {
                        processValidatorData(dataStore);
                    } /*else {
                        // it's probable that at this round, the validator source is unavailable
                        console.warn("Unable to merge data since Validator data is unavailable");
                    }*/
                }
            }
        } else {
            // so it should already have some data, let's check the validator data source
            if (dataStore.valDataSource !== null) {
                // well, we got both. Calculate the MDi1.x indicators
                console.log("Unexpected path in processCollectedData");
                if (dataStore.valDataSource.id !== null) {
                    processValidatorData(dataStore);
                }
            }
        }
    }
}

function processValidatorData(dataStore) {
    // retrieve the DSi1.x values from Geoportal data
    let dsCount = null;
    let svCount = null;
    if (dataStore.gptDataSource !== null && dataStore.gptDataSource.indicators !== null) {
        let gptIndicators = dataStore.gptDataSource.indicators;
        gptIndicators.forEach(function (item) {
            switch (item.id) {
                case CONST_DSi_1_1_id:
                    dsCount = item.value;
                    break;
                case CONST_DSi_1_2_id:
                    svCount = item.value;
                    break;
            }
        });
    }

    let md_1_1_IndicatorDataResult = null;
    let md_1_2_IndicatorDataResult = null;
    let valData = null;
    if (dataStore.valDataSource !== null
            && dataStore.valDataSource.validation !== null) {
        valData = dataStore.valDataSource;
        // retrieve the results of validation
        let valDataResults = valData.validation;
        if (valDataResults.dataset !== null && valDataResults.dataset.pass !== null) {
            md_1_1_IndicatorDataResult = calculateMDi1xIndResData(CONST_MDi_1_1_id, valDataResults.dataset.pass, dsCount);
        }
        if (valDataResults.services !== null && valDataResults.services.pass !== null) {
            md_1_2_IndicatorDataResult = calculateMDi1xIndResData(CONST_MDi_1_2_id, valDataResults.services.pass, svCount);
        }
    }

    if (dataStore.data !== null && dataStore.data.indicators !== null) {
        // inject objects
        if (valData !== null) {
            dataStore.data.validatorData = valData; //TOREVIEW
        }
        if (md_1_1_IndicatorDataResult !== null) {
            dataStore.data.indicators.push(md_1_1_IndicatorDataResult);
        }
        if (md_1_2_IndicatorDataResult !== null) {
            dataStore.data.indicators.push(md_1_2_IndicatorDataResult);
        }
    }
}

function executeConsistencyChecks(countryObject, mrEndpointDataItem) {
    if (countryObject !== null) {
        // Updating the number of tested endpoints data files
        let countryCode = countryObject.countrycode;
        data_check[countryCode].tested_gpt += 1;
        data_check[countryCode].tested_val += 1;
    }
    if (mrEndpointDataItem !== null && mrEndpointDataItem.currentEvaluationData !== null && mrEndpointDataItem.currentEvaluationData.data !== null) {
        // if needed, update the data with static content
        let evalData = mrEndpointDataItem.currentEvaluationData.data;
        let evalDataEndpointURL = evalData.url;
        if (evalDataEndpointURL === null || evalDataEndpointURL === '') {
            if (mrEndpointDataItem.endpoint !== null && mrEndpointDataItem.endpoint.url !== null) {
                evalData.url = mrEndpointDataItem.endpoint.url;
            } else {
                evalData.url = "<unavailable>";
            }
        }
    }
}

function generateMessagesUI() {
    $('#' + element_id_tab_header_main).before(snippet_error_no_data);
    $('#' + element_id_tab_header_main).before(snippet_error_partial_data);
}
function generateTabsUI(endpointId) {
    let tabs_ul = $('#' + element_id_ultab);
    if (tabs_ul) {
        tabs_ul.append(snippet_tab_li.replace(regExp_gi_arg0, endpointId));
    }
}
function generateTabContentUI(endpointId) {
    let tab_content = $('#' + element_id_tab_content);
    if (tab_content) {
        tab_content.append(snippet_tab_content.replace(regExp_gi_arg0, endpointId));
    }

    let tab_content_element = $('#' + tab_id_prefix + endpointId);

    // Setting tab-panel as active if no other tabs are active
    let activeTabPanels = $('.' + element_class_tab_pane + '.' + element_class_active);
    if (tab_content_element && activeTabPanels.length === 0) {
        tab_content_element.addClass(element_class_active);
        $('#' + tab_id_prefix + endpointId + tab_id_suffix).addClass(element_class_active);
    }
}

function renderMRDataToUI(countryObject, mrEndpointDataItem) {
    if (countryObject !== null && mrEndpointDataItem !== null) {
        let countryEndpointId = mrEndpointDataItem.endpoint.id;
        let countryCode = countryObject.countrycode;

        if (mrEndpointDataItem !== null
                && mrEndpointDataItem.currentEvaluationData !== null
                && mrEndpointDataItem.currentEvaluationData.data !== null) {
            let data = mrEndpointDataItem.currentEvaluationData.data;
            let prevMRIndicatorsData = null;
            if (mrEndpointDataItem.previousEvaluationData !== null && mrEndpointDataItem.previousEvaluationData.data !== null) {
                prevMRIndicatorsData = mrEndpointDataItem.previousEvaluationData.data;
            }

            // Increasing the number of found endpoints geoportal data file
            data_check[countryCode].found_gpt += 1;

            // Extract the date of this dump
            let dumpDate = null;
            const dumpDateIsoRegex = /[\d]{4}-[\d]{2}-[\d]{2}T[\d]{2}:[\d]{2}:[\d]{2}\.[\d]{3}Z/g;
            if (data.dumpdate && data.dumpdate.match(dumpDateIsoRegex)) {
                dumpDate = new Date(data.dumpdate).toUTCString();
            } else {
                dumpDate = data.dumpdate;
            }

            // Filling the UI with related information about url, id and dump date
            let endpointURL = data.url;
            if (endpointURL === null || endpointURL === '') {
                if (mrEndpointDataItem.endpoint.url !== null) {
                    endpointURL = mrEndpointDataItem.endpoint.url;
                } else {
                    endpointURL = "<unavailable>";
                }
            }

            // update UI with relevant data
            $('#' + tab_id_prefix + countryEndpointId + ' .' + element_class_endpoint_url).text(endpointURL);
            $('#' + tab_id_prefix + countryEndpointId + ' .' + element_class_endpoint_id).text(data.id);
            $('#' + tab_id_prefix + countryEndpointId + ' .' + element_class_dumpdate).text(dumpDate);

            // Filling the relevant information from Validator
            let datasetFailedElem = $('#' + tab_id_prefix + countryEndpointId + ' .' + element_class_dataset_failed_link);
            let servicesFailedElem = $('#' + tab_id_prefix + countryEndpointId + ' .' + element_class_services_failed_link);
            let summaryFailedElem = $('#' + tab_id_prefix + countryEndpointId + ' .' + element_class_summary_failed_link);
            if (data.validatorData !== undefined && data.validatorData !== null) {
                // Increasing the number of found endpoints validator data file
                data_check[countryCode].found_val += 1;

                let valData = data.validatorData;
                if (valData.type_count !== undefined && valData.type_count !== null) {
                    let valDataTypeCount = data.validatorData.type_count;
                    $('#' + tab_id_prefix + countryEndpointId + ' .' + element_class_dataset).text(valDataTypeCount.dataset);
                    $('#' + tab_id_prefix + countryEndpointId + ' .' + element_class_services).text(valDataTypeCount.service);
                    $('#' + tab_id_prefix + countryEndpointId + ' .' + element_class_series).text(valDataTypeCount.series);
                }
                if (valData.validation !== undefined && valData.validation !== null) {
                    let valDataResults = valData.validation;
                    if (valDataResults !== null) {
                        $('#' + tab_id_prefix + countryEndpointId + ' .' + element_class_dataset_passed).text(valDataResults.dataset.pass);
                        $('#' + tab_id_prefix + countryEndpointId + ' .' + element_class_dataset_failed).text(valDataResults.dataset.fail);
                        $('#' + tab_id_prefix + countryEndpointId + ' .' + element_class_services_passed).text(valDataResults.services.pass);
                        $('#' + tab_id_prefix + countryEndpointId + ' .' + element_class_services_failed).text(valDataResults.services.fail);

                        // Updating links (the error links are hidden in case no errors are found)
                        if (datasetFailedElem !== null) {
                            if (valDataResults.dataset.fail > 0) {
                                let hrefAttrValue = datasetFailedElem.attr(attribute_name_href);
                                if (hrefAttrValue) {
                                    datasetFailedElem.attr(attribute_name_href, hrefAttrValue.replace(regExp_gi_arg0, countryEndpointId));
                                }
                            } else {
                                //datasetFailedElem.hide();
                            }
                        }
                        if (servicesFailedElem !== null) {
                            if (valDataResults.services.fail > 0) {
                                let hrefAttrValue = servicesFailedElem.attr(attribute_name_href);
                                if (hrefAttrValue) {
                                    servicesFailedElem.attr(attribute_name_href, hrefAttrValue.replace(regExp_gi_arg0, countryEndpointId));
                                }
                            } else {
                                //servicesFailedElem.hide();
                            }
                        }
                    }
                }
            } else {
                if (datasetFailedElem !== null) {
                    //datasetFailedElem.hide();
                }
                if (servicesFailedElem !== null) {
                    //servicesFailedElem.hide();
                }
                if (summaryFailedElem !== null) {
                    //summaryFailedElem.hide();
                }
            }

            // Applied the retrieved data into each element
            data.indicators.forEach(function (item) {
                let iId = item.id;
                let iFormat = item.format;
                let iFormattedValue = item.formattedValue;
                let iValue = item.value;
                let currValue = null;
                let prevValue = null;

                if (iId) {
                    if (iFormattedValue) {
                        $('#' + tab_id_prefix + countryEndpointId + ' .' + iId).text(iFormattedValue);
                    }

                    // as agreed, we rounded the numbers to integers before evaluation
                    currValue = calculateAsInteger(iValue);
                    // process previous MR data
                    if (prevMRIndicatorsData !== null) {
                        let prevMrIndicator = prevMRIndicatorsData.indicators.find(({ id }) => id === iId);
                        // as agreed, we rounded the numbers to integers before evaluation
                        prevValue = calculateAsInteger(prevMrIndicator.value);
                    }

                    let rating = generateStarRatingHTML(currValue, iFormattedValue, iFormattedValue);
                    $('#' + tab_id_prefix + countryEndpointId + ' .' + iId + element_class_rating_suffix).html(rating);

                    if (prevValue !== null) {
                        let trend = generateTrendHTML(currValue, prevValue, iFormat, '');
                        $('#' + tab_id_prefix + countryEndpointId + ' .' + iId + element_class_trend_suffix).html(trend);
                    }
                }
            });

            //excel_data[countryEndpointId].gpt = data;

            // refresh the tooltip plugin
            $('[data-toggle="tooltip"]').tooltip();
            // Rendering eventual data file messages
            renderDataFileMessages(countryCode);
        } else {
            // The validator check has implicitly been done: needed by the warning messages system
            data_check[countryCode].tested_val = data_check[countryCode].tested_val + 1;

            // Rendering eventual data file messages
            renderDataFileMessages(countryCode);
        }
    }
}

function calculateMDi1xIndResData(indicatorId, dividend, divisor) {
    // n = dividend / divisor
    let iResData = null;
    if (indicatorId !== null) {
        let MDi_1_x_val = null;
        let MDi_1_x_format = indicator_value_format_percentage;
        let MDi_1_x_formattedVal = 'Not available';

        if (divisor !== null) {
            MDi_1_x_val = (dividend / divisor) * 100;
            MDi_1_x_formattedVal = calculateAsInteger(MDi_1_x_val) + '%';
        }
        iResData = new IndicatorResultData(indicatorId, MDi_1_x_format, MDi_1_x_val, MDi_1_x_formattedVal);
    }
    return iResData;
}

// Render data file messages
function renderDataFileMessages(countryCode) {
    let countryDataCheck = data_check[countryCode];
    if (countryDataCheck !== null && countryDataCheck.tested_val === countryDataCheck.total_val && countryDataCheck.tested_gpt === countryDataCheck.total_gpt) {
        if (countryDataCheck.found_val === 0 && countryDataCheck.found_gpt === 0) {
            // If geoportal and validator data files have not been found correctly
            // No data available yet
            $('#' + element_id_tab_header_main).before(snippet_error_no_data);
        } else if (countryDataCheck.found_val < countryDataCheck.total_val || countryDataCheck.found_gpt < countryDataCheck.total_gpt) {
            // If just one of the two files have been found
            // Partial data available
            $('#' + element_id_tab_header_main).before(snippet_error_partial_data);
        } else if (countryDataCheck.found_val === countryDataCheck.total_val && countryDataCheck.found_gpt === countryDataCheck.total_gpt) {
            // Enable the "Download indicator button"
            $('#' + element_id_full_download).show();
        }
    }
}

function generateStarRatingHTML(iValue, tooltipValue, defaultHtml) {
    let res = defaultHtml;
    if (iValue !== null && iValue >= 0 && iValue <= 100) {
        // Rating system, based on stars
        // 0:  0% <= X < 10%
        // 1: 10% <= X < 30%
        // 2: 30% <= X < 50%
        // 3: 50% <= X < 70%
        // 4: 70% <= X < 90%
        // 5: 90% <= X <= 100%

        let selStars = null;
        let maxStars = 5;

        if (iValue >= 0 && iValue < 10) {
            selStars = 0;
        } else if (iValue >= 10 && iValue < 30) {
            selStars = 1;
        } else if (iValue >= 30 && iValue < 50) {
            selStars = 2;
        } else if (iValue >= 50 && iValue < 70) {
            selStars = 3;
        } else if (iValue >= 70 && iValue < 90) {
            selStars = 4;
        } else if (iValue >= 90 && iValue <= 100) {
            selStars = 5;
        }

        if (selStars !== null) {
            let stars = starRating_starsHtmlSnippetTemplate;
            let starSelClass = null;
            for (let i = 0; i < maxStars; i++) {
                if (i < selStars) {
                    starSelClass = starRating_iconClassFullStar;
                } else {
                    starSelClass = starRating_iconClassEmptyStar;
                }
                let starPlaceholder = starRating_starsHtmlClassPlaceholder
                        .replace(starRating_starsHtmlClassPlaceholderId, i + 1);
                stars = stars.replace(starPlaceholder, starSelClass);
            }
            res = starRating_htmlSnippetTemplate
                    .replace(starRating_srStarsContentPlaceholder, stars)
                    .replace(starRating_srTooltipTitlePlaceholder, tooltipValue);
        }
    } else {
        // if null (meaning "not applicable") do nothing
    }
    return res;
}
function calculateRatio(currentValue, prevValue) {
    let ratio = 0;
    let delta = currentValue - prevValue;
    if (delta !== 0) {
        if (prevValue !== 0) {
            ratio = delta / prevValue;
        } else {
            ratio = 1;
        }
    }
    return ratio;
}
function generateTrendHTML(currentValue, prevValue, format, defaultHtml) {
    let res = defaultHtml;

    // define some const
    const trendThreshold = 0.1; // 10% of the trend total
    const TrendEnum = {
        LESS: -1,
        EQUALS: 0,
        MORE: 1
    };

    let trend = null;
    // let's assume they are always numbers
    let trendTotal = prevValue; // used to calculate the threshold
    let trend_less_tooltipTitle = trend_tooltipTitle_numberIndFormat_less;
    let trend_equals_tooltipTitle = trend_tooltipTitle_numberIndFormat_equals;
    let trend_more_tooltipTitle = trend_tooltipTitle_numberIndFormat_more;

    if (format === indicator_value_format_percentage) {
        // make some adjustments in case of percentage values
        trendTotal = 100; // set the total as 100 percent
        trend_less_tooltipTitle = trend_tooltipTitle_percentageIndFormat_less;
        trend_equals_tooltipTitle = trend_tooltipTitle_percentageIndFormat_equals;
        trend_more_tooltipTitle = trend_tooltipTitle_percentageIndFormat_more;
    }

    if (currentValue !== null) {
        if (prevValue !== null) {
            if (currentValue !== prevValue) {
                // calculate the trend
                let thresh = trendThreshold * trendTotal;
                let delta = currentValue - prevValue;
                if (delta <= -thresh) {
                    // less than equals the threshold
                    trend = TrendEnum.LESS;
                } else if (delta >= thresh) {
                    // more than equals the threshold
                    trend = TrendEnum.MORE;
                } else {
                    // inside the threshold
                    trend = TrendEnum.EQUALS;
                }
            } else {
                //equals
                trend = TrendEnum.EQUALS;
            }
        } else {
            // potential improvement
            trend = TrendEnum.MORE;
        }
    } else if (prevValue !== null) {
        // potential retrogression
        trend = TrendEnum.LESS;
    } else {
        // both null means equals
        trend = TrendEnum.EQUALS;
    }

    if (trend !== null) {
        let trendIconHtml = null;
        let trendTooltipTitle = null;
        switch (trend) {
            case TrendEnum.LESS:
                // less than equals the threshold
                trendIconHtml = trend_less_iconHtmlSnippet;
                trendTooltipTitle = trend_less_tooltipTitle;
                break;
            case TrendEnum.MORE:
                // more than equals the threshold
                trendIconHtml = trend_more_iconHtmlSnippet;
                trendTooltipTitle = trend_more_tooltipTitle;
                break;
            case TrendEnum.EQUALS:
                // inside the threshold
                trendIconHtml = trend_equals_iconHtmlSnippet;
                trendTooltipTitle = trend_equals_tooltipTitle;
                break;
        }

        if (trendIconHtml && trendTooltipTitle) {
            res = trend_htmlSnippetTemplate
                    .replace(trend_contentPlaceholder, trendIconHtml)
                    .replace(trend_tooltipTitlePlaceholder, trendTooltipTitle);
        }
    }
    return res;
}

function calculateAsInteger(value) {
    let res = null;
    if (value !== null) {
        res = Number.parseFloat(value).toFixed(0);
    }
    return res;
}

// Creating the spreadsheet file
function createSpreadsheet() {
    let countryCode = getUrlParam(url_parameter_name_country);

    if (countryCode) {
        // Init the spreadsheet's information
        let wbProps = {
            Title: spreadsheet_title,
            Subject: spreadsheet_subject,
            Author: spreadsheet_author
        };
        //let wbType = {bookType: 'xlsx', type: 'binary'};
        let attachmentFilename = countryCode.toUpperCase() + spreadsheet_fileExtension;

        let wb = XLSX.utils.book_new();
        wb.Props = wbProps;

        // Iterate for every endpoint
        if (mrCountryData !== null) {
            // for every endpoint in this country
            let i = 1;
            for (let endpointData of mrCountryData.endpoints) {
                let worksheetContent = null;
                if (endpointData.currentEvaluationData !== null) {
                    worksheetContent = createSpreadsheetContent(endpointData.currentEvaluationData.data);
                }
                if (worksheetContent !== null) {
                    // Add the sheet to the workbook
                    wb.SheetNames.push(countryCode.toUpperCase() + '_' + i);
                    var ws = XLSX.utils.aoa_to_sheet(worksheetContent);
                    wb.Sheets[countryCode.toUpperCase() + '_' + i] = ws;
                    i++;
                }
            }
        }

        // Create the workbook
        var wbout = XLSX.write(wb, spreadsheet_type);

        //Save and send as "download" element to the user
        saveAs(new Blob([s2ab(wbout)], {type: "application/octet-stream"}), attachmentFilename);
    }
}

//DART used in MR2020 MR2021
function createSpreadsheetContent(mrEndpointData) {
    // Creating content array
    let contents = null;

    if (mrEndpointData !== null && mrEndpointData.url !== null && mrEndpointData.indicators !== null) {
        let indicators = mrEndpointData.indicators;
        contents = [];
        contents.push(['Endpoint URL', mrEndpointData.url]);
        contents.push(['The date of harvest metadata', mrEndpointData.dumpdate]);
        contents.push(['', '']);
        contents.push([spreadsheet_title, '']);
        contents.push(['', '']);
        contents.push(['Monitoring of the availability of spatial data and service', '']);
        contents.push(['DSi1.1', calculateAsInteger(indicators.find(({ id }) => id === 'DSi_1_1').value)]);
        contents.push(['DSi1.2', calculateAsInteger(indicators.find(({ id }) => id === 'DSi_1_2').value)]);
        contents.push(['DSi1.3', calculateAsInteger(indicators.find(({ id }) => id === 'DSi_1_3').value)]);
        contents.push(['DSi1.4', calculateAsInteger(indicators.find(({ id }) => id === 'DSi_1_4').value)]);
        contents.push(['DSi1.5', calculateAsInteger(indicators.find(({ id }) => id === 'DSi_1_5').value)]);
        contents.push(['', '']);
        contents.push(['Monitoring of the conformity of metadata', '']);
        contents.push(['MDi1.1', calculateAsInteger(indicators.find(({ id }) => id === 'MDi_1_1').value)]);
        contents.push(['MDi1.2', calculateAsInteger(indicators.find(({ id }) => id === 'MDi_1_2').value)]);
        contents.push(['', '']);
        contents.push(['Monitoring of the conformity of spatial data sets', '']);
        contents.push(['DSi2',   calculateAsInteger(indicators.find(({ id }) => id === 'DSi_2_0').value)]);
        contents.push(['DSi2.1', calculateAsInteger(indicators.find(({ id }) => id === 'DSi_2_1').value)]);
        contents.push(['DSi2.2', calculateAsInteger(indicators.find(({ id }) => id === 'DSi_2_2').value)]);
        contents.push(['DSi2.3', calculateAsInteger(indicators.find(({ id }) => id === 'DSi_2_3').value)]);
        contents.push(['', '']);
        contents.push(['Monitoring of the accessibility of spatial data sets through view and download services', '']);
        contents.push(['NSi2',   calculateAsInteger(indicators.find(({ id }) => id === 'NSi_2_0').value)]);
        contents.push(['NSi2.1', calculateAsInteger(indicators.find(({ id }) => id === 'NSi_2_1').value)]);
        contents.push(['NSi2.2', calculateAsInteger(indicators.find(({ id }) => id === 'NSi_2_2').value)]);
        contents.push(['', '']);
        contents.push(['Monitoring of the conformity of the network services', '']);
        contents.push(['NSi4',   calculateAsInteger(indicators.find(({ id }) => id === 'NSi_4_0').value)]);
        contents.push(['NSi4.1', calculateAsInteger(indicators.find(({ id }) => id === 'NSi_4_1').value)]);
        contents.push(['NSi4.2', calculateAsInteger(indicators.find(({ id }) => id === 'NSi_4_2').value)]);
        contents.push(['NSi4.3', calculateAsInteger(indicators.find(({ id }) => id === 'NSi_4_3').value)]);
        contents.push(['NSi4.4', calculateAsInteger(indicators.find(({ id }) => id === 'NSi_4_4').value)]);
        contents.push(['', '']);
        contents.push(['-------------------------------------', '-------------------------------------']);
        contents.push(['', '']);
        contents.push(['', '']);

        contents.push(['Additional information', '']);
        contents.push(['', '']);
        contents.push(['INSPIRE Geoportal Catalogue URI', mrEndpointData.id]);
        contents.push(['Endpoint URL',                    mrEndpointData.url]);
        contents.push(['The date of harvest metadata',    mrEndpointData.dumpdate]);
        contents.push(['', '']);
        contents.push(['Overview statistics of the harvested metadata', '']);
        contents.push(['Dataset',  mrEndpointData.validatorData.type_count.dataset]);
        contents.push(['Series',   mrEndpointData.validatorData.type_count.series]);
        contents.push(['Services', mrEndpointData.validatorData.type_count.service]);
        contents.push(['', '']);
        contents.push(['Results of evaluation using INSPIRE Reference Validator', '']);
        contents.push(['Metadata Dataset', '']);
        contents.push(['Conformant',     mrEndpointData.validatorData.validation.dataset.pass]);
        contents.push(['NOT Conformant', mrEndpointData.validatorData.validation.dataset.fail]);
        contents.push(['', '']);
        contents.push(['Metadata Services', '']);
        contents.push(['Conformant',     mrEndpointData.validatorData.validation.services.pass]);
        contents.push(['NOT Conformant', mrEndpointData.validatorData.validation.services.fail]);
        contents.push(['', '']);
        contents.push(['-------------------------------------', '-------------------------------------']);
        contents.push(['', '']);
        contents.push(['', '']);
    }

    return contents;
}

/**** DOM ready functions ****/
$(document).ready(function () {
    //init();

    previous_mr_data_dir = mr2020_data_dir;
    current_mr_data_dir = mr2021_data_dir;

    initializeDataCheckObject();

    switch (pageId) {
        case 'overallDashboard':
            renderCards();
            //processOverallDashboardPage();
            break;
        case 'countryDashboard':
            renderDetails();
            //processCountryDashboardPage();

            // Binding events
            $(function () {
                $('#myTab li:last-child a').tab('show');
            });
            $('#' + element_id_downloadReport).on('click', function () {
                createSpreadsheet();
            });
            break;
        default:
            console.error("Cannot recognize the page to be render");
            break;
    }

    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });
}
);

// ** Supporting functions ** //

// Getting URL vars
function getUrlVars() {
    let vars = {};
    let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&#]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

// Getting URL parameter
function getUrlParam(parameterName) {
    let res = null;
    if (window.location.href.indexOf(parameterName) > -1) {
        res = getUrlVars()[parameterName];
    }
    return res;
}

// Save spreadsheet
function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i < s.length; i++)
        view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}

//** -- HTML Snippets -- **//
//const starRating_idSuffix = "_rating";
const starRating_iconClassFullStar = "fas";
const starRating_iconClassEmptyStar = "far";
const starRating_starsHtmlClassPlaceholderId = "N";
const starRating_starsHtmlClassPlaceholder = "{starN}";
const starRating_starsHtmlSnippetTemplate = '<span class="{star1} fa-star fa-xs text-primary"></span><span class="{star2} fa-star fa-xs text-primary"></span><span class="{star3} fa-star fa-xs text-primary"></span><span class="{star4} fa-star fa-xs text-primary"></span><span class="{star5} fa-star fa-xs text-primary"></span>';
const starRating_srTooltipTitlePlaceholder = '{srTooltipTitle}';
const starRating_srStarsContentPlaceholder = '{srStarsContent}';
const starRating_htmlSnippetTemplate = '<div title="{srTooltipTitle}" data-toggle="tooltip" data-placement="top">{srStarsContent}</div>';

const trend_tooltipTitle_numberIndFormat_less = 'The value of this indicator decreased of at least 10% of the value in the previous year';
const trend_tooltipTitle_numberIndFormat_equals = 'The value of this indicator increased or decreased of less than 10% of the value in the previous year';
const trend_tooltipTitle_numberIndFormat_more = 'The value of this indicator increased of at least 10% of the value in the previous year';
const trend_tooltipTitle_percentageIndFormat_less = 'The value of this indicator decreased of at least 10% (10 percentage points) compared to the value in the previous year';
const trend_tooltipTitle_percentageIndFormat_equals = 'The value of this indicator increased or decreased of less than 10% (10 percentage points) compared to the value in the previous year';
const trend_tooltipTitle_percentageIndFormat_more = 'The value of this indicator increased of at least 10% (10 percentage points) compared to the value in the previous year';

const trend_less_iconHtmlSnippet = '<span class="fas fa-arrow-down fa-xs text-primary"></span>';
const trend_equals_iconHtmlSnippet = '<span class="fas fa-equals fa-xs text-primary"></span>';
const trend_more_iconHtmlSnippet = '<span class="fas fa-arrow-up fa-xs text-primary"></span>';
const trend_tooltipTitlePlaceholder = '{trdTooltipTitle}';
const trend_contentPlaceholder = '{trdContent}';
const trend_htmlSnippetTemplate = '<div title="{trdTooltipTitle}" data-toggle="tooltip" data-placement="bottom">{trdContent}</div>';

const snippet_bt_wrap_2_smmd = '<div class="w-100 d-none d-sm-block d-md-block d-lg-none"><!-- wrap every 2 on sm and md --></div>'
const snippet_bt_wrap_4_lg = '<div class="w-100 d-none d-lg-block"><!-- wrap every 4 from lg on --></div>';
const snippet_dummy_card_filler = '<div class="card mb-4 border-none d-none d-sm-block"><!-- dummy card as filler --></div>';

const snippet_error_no_data = '<div class="row"><div class="col"><div id="' + element_id_no_data_warning_message + '" class="alert alert-warning" role="alert"><strong>Warning: No data available for this country</strong><p>This means that the calculation process is still ongoing.</p></div></div></div>';
const snippet_error_partial_data = '<div class="row"><div class="col"><div id="' + element_id_partial_data_warning_message + '" class="alert alert-warning" role="alert"><strong>Warning: Partial data available for this country</strong><p>This means that some data have been processed but the calculation process is still ongoing.</p></div></div></div>';

const countryCard_countryCodePlaceHolderRegex = /\{cCode\}/gi;
const countryCard_countryNamePlaceHolderRegex = /\{cName\}/gi;
const countryCard_htmlSnippetTemplate = `
<div class="card mb-4 bg-light text-dark" id="card-{cCode}" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Click for more details">
    <a href="mr2021_details.html?country={cCode}" class="h-100 nounderline text-dark">
        <div class="card-body pb-1">
            <h5 class="card-title text-center mb-2 h4">{cName} <img src="images/flags/11/{cCode}.svg" class="country-icon-md" alt="country icon"></h5>
            <div class="row">
                <div class="col-sm text-center">
                    <span class="small">Metadata</span><br>
                </div>
            </div>
            <div class="row">
                <div class="col-sm text-center">
                    <span class="blockquote" id="{cCode}-ds">-</span><br>
                    <span class="small">Dataset</span>
                </div>
                <div class="col-sm text-center">
                    <span class="blockquote" id="{cCode}-sv">-</span><br>
                    <span class="small">Services</span>
                </div>
                <div class="col-sm text-center">
                    <span class="blockquote" id="{cCode}-sr">-</span><br>
                    <span class="small">Series</span>
                </div>
            </div>
        </div>
    </a>
</div>`;

const countryFlag_countryCodePlaceholderRegex = /\{cCode\}/gi;
const countryFlag_htmlSnippetTemplate = '<img src="images/flags/11/{cCode}.svg" class="country-icon-md" alt="country icon">';

const snippet_tab_li = `
<li class="nav-item">
    <a class="nav-link" id="tab-{0}-tab" data-toggle="tab" href="#tab-{0}" role="tab" aria-controls="home" aria-selected="true">
        <span class="endpoint-id">{0}</span>
    </a>
</li>`;

const snippet_tab_content = `
<div class="tab-pane" id="tab-{0}" role="tabpanel" aria-labelledby="tab-{0}-tab">
    <div class="row mt-5">
        <div class="col-md-12">
            <h4 class="text-primary"><strong>MD Catalogue URL: </strong><span class="endpoint-url">-</span></h4>
            <h4  class="text-primary"><strong>Endpoint ID:</strong> <span class="endpoint-id">-</span></h4>
            <h4  class="text-primary"><strong>The date of harvest metadata:</strong> <span class="dumpdate">-</span></h4>
        </div>
    </div>
    <div>
        <div class="card-deck mt-3">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Overview statistics of the harvested metadata</h5>
                    <div class="card-deck">
                        <div class="card">
                            <div class="card-body" title="Metadata of spatial data sets and series" data-toggle="tooltip" data-placement="top">
                                <div class="row div_dataset_passed">
                                    <div class="col-4 text-center">
                                        <span>Dataset: <span class="h3 dataset">-</span></span>
                                    </div>
                                    <div class="col-4 text-center border-left">
                                        <span>Series: <span class="h3 series">-</span></span>
                                    </div>
                                    <div class="col-4 text-center border-left">
                                        <span>Services: <span class="h3 services">-</span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h5 class="card-title mt-5">Results of evaluation using <a href="https://inspire.ec.europa.eu/validator/" target="_blank">INSPIRE Reference Validator <i class="fas fa-external-link-alt"></i></a></h5>
                    <div class="card-deck my-3">
                        <div class="card">
                            <div class="card-body" title="Metadata Dataset results of Evaluation using the INSPIRE Reference Validator" data-toggle="tooltip" data-placement="top">
                                <p class="card-text text-center">Metadata Dataset</p>
                                <hr/>
                                <div class="row mt-2 div_dataset_failed">
                                    <div class="col text-center">
                                        <div class="col text-center">
                                            <span>Conformant: <span class="h3 dataset_passed">-</span></span>
                                        </div>
                                    </div>
                                    <div class="col text-center">
                                        <p>NOT Conformant: <span class="h3 dataset_failed">-</span></p>
                                    </div>
                                </div>
                                <h6 class="font-weight-normal dataset_failed_link_container float-right mb-0"><a class="dataset_failed_link" href="mr2021/resources/failed_report/{0}.dataset.zip"><i class="far fa-file-archive"></i> Click to download the test reports of failed records</a></h6>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body" title="Metadata Services results of Evaluation using the INSPIRE Reference Validator" data-toggle="tooltip" data-placement="top">
                                <p class="card-text text-center">Metadata Services</p>
                                <hr/>
                                <div class="row mt-2 div_services_failed">
                                    <div class="col text-center">
                                        <span>Conformant: <span class="h3 services_passed">-</span></span>
                                    </div>
                                    <div class="col text-center">
                                        <p>NOT Conformant: <span class="h3 services_failed">-</span></p>
                                    </div>
                                </div>
                                <h6 class="font-weight-normal services_failed_link_container float-right mb-0"><a class="services_failed_link" href="mr2021/resources/failed_report/{0}.services.zip"><i class="far fa-file-archive"></i> Click to download the test reports of failed records</a></h6>
                            </div>
                        </div>
                    </div>
                    <h5 class="font-weight-normal failed_csv_container">
                        Summary of metadata failing validation in <a class="failed_csv" href="mr2021/resources/failed/{0}.failed.csv">this endpoint <i class="fas fa-file-csv"></i></a> (batch file identifier, metadata identifier, metadata type, total number and ids of failed test assertions)
                    </h5>
                    <h5 class="font-weight-normal">
                        Summary of metadata failing validation in <a href="mr2021/resources/MetadataFailingValidationAllEndpoints.xlsx">all endpoints <i class="fas fa-file-excel"></i></a> (see "readme" sheet for details)
                    </h5>
                </div>
            </div>
        </div>
        <div class="row mt-5 mb-2">
            <div class="col-md-10 offset-md-1 text-center">
                <div class="page-header text-center">
                    <h2>Monitoring Indicators 2021 <a href="#documentation" title="For the description of all indicators see below the section 'Documentation'" data-toggle="tooltip" data-placement="top"><i class="fas fa-link"></i></a></h2>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col text-center">
                <span class="text-secondary">Availability</span>
            </div>
            <div class="col text-center">
                <span class="text-secondary">Conformity</span>
            </div>
        </div>
        <div class="card-deck mt-3">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Monitoring of the availability of spatial data and service</h5>
                    <div class="card-deck">
                        <div class="card">
                            <div class="card-body">
                                <p class="text-center">
                                    <span class="h3 text-center DSi_1_1">-</span>
                                </p>
                                <p class="card-text text-center" title="The number of spatial data sets for which metadata exist" data-toggle="tooltip" data-placement="top">DSi1.1</p>
                                <p class="h5 text-center DSi_1_1_trend">-</p>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body">
                                <p class="text-center">
                                    <span class="h3 text-center DSi_1_2">-</span>
                                </p>
                                <p class="card-text text-center" title="The number of spatial data services for which metadata exist" data-toggle="tooltip" data-placement="top">DSi1.2</p>
                                <p class="h5 text-center DSi_1_2_trend">-</p>
                            </div>
                        </div>
                    </div>
                    <div class="card-deck mt-3">
                        <div class="card">
                            <div class="card-body">
                                <p class="text-center">
                                    <span class="h3 text-center DSi_1_3">-</span>
                                </p>
                                <p class="card-text text-center" title="The number of spatial data sets for which the metadata contains one or more keywords from a register provided by the Commission indicating that the spatial data set is used for reporting under the environmental legislation" data-toggle="tooltip" data-placement="top">DSi1.3</p>
                                <p class="h5 text-center DSi_1_3_trend">-</p>
                            </div>
                        </div>
                    </div>
                    <div class="card-deck mt-3">
                        <div class="card">
                            <div class="card-body">
                                <p class="text-center">
                                    <span class="h3 text-center DSi_1_4">-</span>
                                </p>
                                <p class="card-text text-center" title="The number of spatial data sets for which the metadata contains a keyword from a register provided by the Commission indicating that the spatial data set covers regional territory" data-toggle="tooltip" data-placement="top">DSi1.4</p>
                                <p class="h5 text-center DSi_1_4_trend">-</p>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body">
                                <p class="text-center">
                                    <span class="h3 text-center DSi_1_5">-</span>
                                </p>
                                <p class="card-text text-center" title="The number of spatial data sets for which the metadata contains a keyword from a register provided by the Commission indicating that the spatial data set covers national territory" data-toggle="tooltip" data-placement="top">DSi1.5</p>
                                <p class="h5 text-center DSi_1_5_trend">-</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card border-0">
                <div class="card-body p-0">
                    <div class="card w-100 m-0">
                        <div class="card-body">
                            <h5 class="card-title">Monitoring of the conformity of metadata</h5>
                            <div class="card-deck">
                                <div class="card">
                                    <div class="card-body">
                                        <p class="text-center">
                                            <span class="h3 text-center MDi_1_1 d-none">-</span>
                                            <span class="h5 text-center MDi_1_1_rating">*</span>
                                        </p>
                                        <p class="card-text text-center" title="Percentage of metadata for spatial data sets conformant with Commission Regulation (EC) No 1205/2008 as regards metadata" data-toggle="tooltip" data-placement="top">
                                            MDi1.1
                                        </p>
                                        <p class="h5 text-center MDi_1_1_trend">-</p>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-body">
                                        <p class="text-center">
                                            <span class="h3 text-center MDi_1_2 d-none">-</span>
                                            <span class="h5 text-center MDi_1_2_rating">*</span>
                                        </p>
                                        <p class="card-text text-center" title="Percentage of metadata for spatial data services conformant with Commission Regulation (EC) No 1205/2008 as regards metadata" data-toggle="tooltip" data-placement="top">
                                            MDi1.2
                                        </p>
                                        <p class="h5 text-center MDi_1_2_trend">-</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card mt-3 w-100 m-0">
                        <div class="card-body">
                            <h5 class="card-title">Monitoring of the conformity of spatial data sets</h5>
                            <div class="card-deck mt-3">
                                <div class="card">
                                    <div class="card-body">
                                        <p class="text-center">
                                            <span class="h3 text-center DSi_2_0 d-none">-</span>
                                            <span class="h5 text-center DSi_2_0_rating">*</span>
                                        </p>
                                        <p class="card-text text-center" title="Percentage of spatial data sets that are in conformity with Commission Regulation (EU) No 1089/2010 as regards interoperability of spatial data sets" data-toggle="tooltip" data-placement="top">
                                            DSi2
                                        </p>
                                        <p class="h5 text-center DSi_2_0_trend">-</p>
                                    </div>
                                </div>
                            </div>
                            <div class="card-deck mt-3">
                                <div class="card">
                                    <div class="card-body">
                                        <p class="text-center">
                                            <span class="h3 text-center DSi_2_1 d-none">-</span>
                                            <span class="h5 text-center DSi_2_1_rating">*</span>
                                        </p>
                                        <p class="card-text text-center" title="Percentage of spatial data sets, corresponding to the themes listed in Annex I, that are in conformity with Commission Regulation (EU) No 1089/2010 as regards interoperability of spatial data sets" data-toggle="tooltip" data-placement="top">
                                            DSi2.1
                                        </p>
                                        <p class="h5 text-center DSi_2_1_trend">-</p>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-body">
                                        <p class="text-center">
                                            <span class="h3 text-center DSi_2_2 d-none">-</span>
                                            <span class="h5 text-center DSi_2_2_rating">*</span>
                                        </p>
                                        <p class="card-text text-center" title="Percentage of spatial data sets, corresponding to the themes listed in Annex II, that are in conformity with Commission Regulation (EU) No 1089/2010 as regards interoperability of spatial data sets" data-toggle="tooltip" data-placement="top">
                                            DSi2.2
                                        </p>
                                        <p class="h5 text-center DSi_2_2_trend">-</p>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-body">
                                        <p class="text-center">
                                            <span class="h3 text-center DSi_2_3 d-none">-</span>
                                            <span class="h5 text-center DSi_2_3_rating">*</span>
                                        </p>
                                        <p class="card-text text-center" title="Percentage of spatial data sets, corresponding to the themes listed in Annex III, that are in conformity with Commission Regulation (EU) No 1089/2010 as regards interoperability of spatial data sets" data-toggle="tooltip" data-placement="top">
                                            DSi2.3
                                        </p>
                                        <p class="h5 text-center DSi_2_3_trend">-</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-deck mt-3">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Monitoring of the accessibility of spatial data sets through view and download services</h5>
                    <div class="card-deck mt-3">
                        <div class="card">
                            <div class="card-body">
                                <p class="text-center">
                                    <span class="h3 text-center NSi_2_0 d-none">-</span>
                                    <span class="h5 text-center NSi_2_0_rating">*</span>
                                </p>
                                <p class="card-text text-center" title="The percentage of spatial data sets that are accessible through view and the download services" data-toggle="tooltip" data-placement="top">
                                    NSi2
                                </p>
                                <p class="h5 text-center NSi_2_0_trend">-</p>
                            </div>
                        </div>
                    </div>
                    <div class="card-deck mt-3">
                        <div class="card">
                            <div class="card-body">
                                <p class="text-center">
                                    <span class="h3 text-center NSi_2_1 d-none">-</span>
                                    <span class="h5 text-center NSi_2_1_rating">*</span>
                                </p>
                                <p class="card-text text-center" title="The percentage of spatial data sets that are accessible through view services" data-toggle="tooltip" data-placement="top">
                                    NSi2.1
                                </p>
                                <p class="h5 text-center NSi_2_1_trend">-</p>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body">
                                <p class="text-center">
                                    <span class="h3 text-center NSi_2_2 d-none">-</span>
                                    <span class="h5 text-center NSi_2_2_rating">*</span>
                                </p>
                                <p class="card-text text-center" title="The percentage of spatial data sets that are accessible through download services" data-toggle="tooltip" data-placement="top">
                                    NSi2.2
                                </p>
                                <p class="h5 text-center NSi_2_2_trend">-</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Monitoring of the conformity of the network services</h5>
                    <div class="card-deck">
                        <div class="card">
                            <div class="card-body">
                                <p class="text-center">
                                    <span class="h3 text-center NSi_4_0 d-none">-</span>
                                    <span class="h5 text-center NSi_4_0_rating">*</span>
                                </p>
                                <p class="card-text text-center" title="Percentage of the network services that are in conformity with Commission Regulation (EC) No 976/2009 as regards the Network Services" data-toggle="tooltip" data-placement="top">
                                    NSi4
                                </p>
                                <p class="h5 text-center NSi_4_0_trend">-</p>
                            </div>
                        </div>
                    </div>
                    <div class="card-deck mt-3">
                        <div class="card">
                            <div class="card-body">
                                <p class="text-center">
                                    <span class="h5 text-center NSi_4_1 d-none">-</span>
                                    <span class="h5 text-center NSi_4_1_rating">*</span>
                                </p>
                                <p class="card-text text-center" title="Percentage of the discovery services that are in conformity with Commission Regulation (EC) No 976/2009 as regards the Network Services" data-toggle="tooltip" data-placement="top">
                                    NSi4.1
                                </p>
                                <p class="h5 text-center NSi_4_1_trend">-</p>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body">
                                <p class="text-center">
                                    <span class="h5 text-center NSi_4_2 d-none">-</span>
                                    <span class="h5 text-center NSi_4_2_rating">*</span>
                                </p>
                                <p class="card-text text-center" title="Percentage of the view services that are in conformity with Commission Regulation (EC) No 976/2009 as regards the Network Services" data-toggle="tooltip" data-placement="top">
                                    NSi4.2
                                </p>
                                <p class="h5 text-center NSi_4_2_trend">-</p>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body">
                                <p class="text-center">
                                    <span class="h5 text-center NSi_4_3 d-none">-</span>
                                    <span class="h5 text-center NSi_4_3_rating">*</span>
                                </p>
                                <p class="card-text text-center" title="Percentage of the download services that are in conformity with Commission Regulation (EC) No 976/2009 as regards the Network Services" data-toggle="tooltip" data-placement="top">
                                    NSi4.3
                                </p>
                                <p class="h5 text-center NSi_4_3_trend">-</p>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body">
                                <p class="text-center">
                                    <span class="h5 text-center NSi_4_4 d-none">-</span>
                                    <span class="h5 text-center NSi_4_4_rating">*</span>
                                </p>
                                <p class="card-text text-center" title="Percentage of the transformation services that are in conformity with Commission Regulation (EC) No 976/2009 as regards the Network Services" data-toggle="tooltip" data-placement="top">
                                    NSi4.4
                                </p>
                                <p class="h5 text-center NSi_4_4_trend">-</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`;
