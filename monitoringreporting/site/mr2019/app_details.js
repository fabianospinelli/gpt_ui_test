"use strict";
/* Configurations */
//var baseURL = 'http://inspire-geoportal-stg.ies.jrc.it';
var baseURL = 'https://inspire-geoportal.ec.europa.eu';
var baseURLMR2019 = 'https://inspire-geoportal.ec.europa.eu/sandbox';
/* Support functions */
function getUrlVars() {
    let vars = {};
    let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function getUrlParam(parameterName) {
    let urlparameter = null;
    if (window.location.href.indexOf(parameterName) > -1) {
        urlparameter = getUrlVars()[parameterName];
    }
    return urlparameter;
}

// Getting parameter
let countryCode = getUrlParam("country");
// Creating the JSON file name
let sourceFilepath = "mr2019/" + countryCode + ".json";
let indicators2019 = [];
let allindicators2019 = [];
let additionalInformation = [];
let wb = XLSX.utils.book_new();
// Filling the data in the page
if (sourceFilepath !== null && sourceFilepath.length > 0) {
    $.getJSON(sourceFilepath, function (data) {

        // Update html elements

        // Header
        $('#country-name').html(data.countryname);
        var iconSrc = $('#country-flag img').attr('src');
        iconSrc = iconSrc.replace('{0}', countryCode);
        $('#country-flag img').attr('src', iconSrc);
        let headTmp = $('#tab-header').html();
        let tmp = $('.tab-content').html();

//        40*data.endpoints.length;

        for (let i = 0; i < data.endpoints.length; i++) {
            if (i > 0) {
                let b = $('#tab-header');
                b.append(headTmp.replace('tab0', 'tab' + i).replace(' active', '').replace('href="#tab0"', 'href="#tab' + i + '"'));
                let a = $('.tab-content');
                a.append(tmp.replace('tab0', 'tab' + i).replace(' active', ''));
            }

            let endpoint = data.endpoints[i];
            $('#tab' + i + '-tab .endpoint-id').html(endpoint.id);
            $('#tab' + i + ' .endpoint-id').html(endpoint.id);
            $('#tab' + i + ' .endpoint-url').html(endpoint.url);
            $('#tab' + i + ' .dumpdate').html(endpoint.dumpdate);
            // Overall statistics
            $('#tab' + i + ' .dataset').html(endpoint.dataset);
            $('#tab' + i + ' .services').html(endpoint.services);
            $('#tab' + i + ' .series').html(endpoint.series);
            $('#tab' + i + ' .dataset_passed').html(endpoint.validation.dataset.pass);
            $('#tab' + i + ' .dataset_passed_1_3').html(endpoint.validation.dataset['1.3']);
            $('#tab' + i + ' .dataset_passed_2_0').html(endpoint.validation.dataset['2.0']);
            $('#tab' + i + ' .dataset_failed').html(endpoint.validation.dataset.fail);
            if (endpoint.validation.dataset.fail <= 0 || endpoint.validation.dataset.fail == "-") {
                $('#tab' + i + ' .dataset_failed_link_container').addClass('d-none');
            } else {
                let tmpHrefElem = $('#tab' + i + ' .dataset_failed_link');
                let tmpHref = tmpHrefElem.attr('href');
                tmpHref = tmpHref.replace('{0}', baseURLMR2019).replace('{1}', endpoint.session_id).replace('{2}', endpoint.id);
                tmpHrefElem.attr('href', tmpHref);
            }

            $('#tab' + i + ' .services_passed').html(endpoint.validation.services.pass);
            $('#tab' + i + ' .services_passed_1_3').html(endpoint.validation.services['1.3']);
            $('#tab' + i + ' .services_passed_2_0').html(endpoint.validation.services['2.0']);
            $('#tab' + i + ' .services_failed').html(endpoint.validation.services.fail);
            if (endpoint.validation.services.fail <= 0 || endpoint.validation.services.fail == "-") {
                $('#tab' + i + ' .services_failed_link_container').addClass('d-none');
            } else {
                let tmpHrefElem = $('#tab' + i + ' .services_failed_link');
                let tmpHref = tmpHrefElem.attr('href');
                tmpHref = tmpHref.replace('{0}', baseURLMR2019).replace('{1}', endpoint.session_id).replace('{2}', endpoint.id);
                tmpHrefElem.attr('href', tmpHref);
            }



            jQuery.get('mr2019/failed/' + endpoint.id + '.failed.csv', function (data) {
                if (data == '') {
                    $('#tab' + i + ' .failed_csv_container').addClass('d-none');
                } else {
                    let tmpHrefElemFailed = $('#tab' + i + ' .failed_csv');
                    let tmpHrefFailed = tmpHrefElemFailed.attr('href');
                    tmpHrefFailed = tmpHrefFailed.replace('{0}', baseURL).replace('{1}', endpoint.session_id).replace('{2}', endpoint.id);
                    tmpHrefElemFailed.attr('href', tmpHrefFailed);
                }
            });


            // Indicators
            $('#tab' + i + ' .DSi_1_1').html(endpoint.indicators.DSi_1_1);
            $('#tab' + i + ' .DSi_1_2').html(endpoint.indicators.DSi_1_2);
            $('#tab' + i + ' .DSi_1_3').html(endpoint.indicators.DSi_1_3);
            $('#tab' + i + ' .DSi_1_4').html(endpoint.indicators.DSi_1_4);
            $('#tab' + i + ' .DSi_1_5').html(endpoint.indicators.DSi_1_5);
            $('#tab' + i + ' .MDi_1_1').html(endpoint.indicators.MDi_1_1);
            $('#tab' + i + ' .MDi_1_2').html(endpoint.indicators.MDi_1_2);
            $('#tab' + i + ' .DSi_2_0').html(endpoint.indicators.DSi_2_0);
            $('#tab' + i + ' .DSi_2_1').html(endpoint.indicators.DSi_2_1);
            $('#tab' + i + ' .DSi_2_2').html(endpoint.indicators.DSi_2_2);
            $('#tab' + i + ' .DSi_2_3').html(endpoint.indicators.DSi_2_3);
            $('#tab' + i + ' .NSi_2_0').html(endpoint.indicators.NSi_2_0);
            $('#tab' + i + ' .NSi_2_1').html(endpoint.indicators.NSi_2_1);
            $('#tab' + i + ' .NSi_2_2').html(endpoint.indicators.NSi_2_2);
            $('#tab' + i + ' .NSi_4_0').html(endpoint.indicators.NSi_4_0);
            $('#tab' + i + ' .NSi_4_1').html(endpoint.indicators.NSi_4_1);
            $('#tab' + i + ' .NSi_4_2').html(endpoint.indicators.NSi_4_2);
            $('#tab' + i + ' .NSi_4_3').html(endpoint.indicators.NSi_4_3);
            $('#tab' + i + ' .NSi_4_4').html(endpoint.indicators.NSi_4_4);


            indicators2019.push(['Endpoint URL', endpoint.url]);
            indicators2019.push(['The date of harvest metadata', endpoint.dumpdate]);
//            indicators2019.push(['', '']);
//            indicators2019.push(['', '']);
            indicators2019.push(['Monitoring Indicators 2019', '']);
            indicators2019.push(['', '']);
            indicators2019.push(['Monitoring of the availability of spatial data and service', '']);
            indicators2019.push(['DSi1.1', endpoint.indicators.DSi_1_1]);
            indicators2019.push(['DSi1.2', endpoint.indicators.DSi_1_2]);
            indicators2019.push(['DSi1.3', endpoint.indicators.DSi_1_3]);
            indicators2019.push(['DSi1.4', endpoint.indicators.DSi_1_4]);
            indicators2019.push(['DSi1.5', endpoint.indicators.DSi_1_5]);
            indicators2019.push(['', '']);
            indicators2019.push(['Monitoring of the conformity of metadata', '']);
            indicators2019.push(['MDi1.1', endpoint.indicators.MDi_1_1]);
            indicators2019.push(['MDi1.2', endpoint.indicators.MDi_1_2]);
            indicators2019.push(['', '']);
            indicators2019.push(['Monitoring of the conformity of spatial data sets', '']);
            indicators2019.push(['DSi2', endpoint.indicators.DSi_2_0]);
            indicators2019.push(['DSi2.1', endpoint.indicators.DSi_2_1]);
            indicators2019.push(['DSi2.2', endpoint.indicators.DSi_2_2]);
            indicators2019.push(['DSi2.3', endpoint.indicators.DSi_2_3]);
            indicators2019.push(['', '']);
            indicators2019.push(['Monitoring of the accessibility of spatial data sets through view and download services', '']);
            indicators2019.push(['NSi2', endpoint.indicators.NSi_2_0]);
            indicators2019.push(['NSi2.1', endpoint.indicators.NSi_2_1]);
            indicators2019.push(['NSi2.2', endpoint.indicators.NSi_2_2]);
            indicators2019.push(['', '']);
            indicators2019.push(['Monitoring of the conformity of the network services', '']);
            indicators2019.push(['NSi4', endpoint.indicators.NSi_4_0]);
            indicators2019.push(['NSi4.1', endpoint.indicators.NSi_4_1]);
            indicators2019.push(['NSi4.2', endpoint.indicators.NSi_4_2]);
            indicators2019.push(['NSi4.3', endpoint.indicators.NSi_4_3]);
            indicators2019.push(['NSi4.4', endpoint.indicators.NSi_4_4]);
            indicators2019.push(['-------------------------------------', '-------------------------------------']);
            indicators2019.push(['', '']);
            indicators2019.push(['', '']);

            additionalInformation.push(['MD Catalogue URL', endpoint.id]);
            additionalInformation.push(['Endpoint URL', endpoint.url]);
            additionalInformation.push(['The date of harvest metadata', endpoint.dumpdate]);
            additionalInformation.push(['', '']);
            additionalInformation.push(['Overview statistics of the harvested metadata', '']);
            additionalInformation.push(['Dataset', endpoint.dataset]);
            additionalInformation.push(['Series', endpoint.series]);
            additionalInformation.push(['Dataset&Series v1.3', endpoint.validation.dataset['1.3']]);
            additionalInformation.push(['Dataset&Series v2.0', endpoint.validation.dataset['2.0']]);
            additionalInformation.push(['', '']);
            additionalInformation.push(['Services', endpoint.services]);
            additionalInformation.push(['Dataset&Series v1.3', endpoint.validation.services['1.3']]);
            additionalInformation.push(['Dataset&Series v2.0', endpoint.validation.services['2.0']]);
            additionalInformation.push(['', '']);
            additionalInformation.push(['Results of evaluation using INSPIRE Reference Validator', '']);
            additionalInformation.push(['Metadata Dataset', '']);
            additionalInformation.push(['Conformant', endpoint.validation.dataset.pass]);
            additionalInformation.push(['NOT Conformant', endpoint.validation.dataset.fail]);
            additionalInformation.push(['', '']);
            additionalInformation.push(['Metadata Services', '']);
            additionalInformation.push(['Conformant', endpoint.validation.services.pass]);
            additionalInformation.push(['NOT Conformant', endpoint.validation.services.fail]);
            additionalInformation.push(['-------------------------------------', '-------------------------------------']);
            additionalInformation.push(['', '']);
            additionalInformation.push(['', '']);
        }

        if (data.endpoints.length < 2) {
            $('#tab-header').addClass('d-none');
        }

    })
            .fail(function () {
                window.location.assign('mr2019.html');
            });
}


$(window).bind("load", function () {
    // code for span
    var arrOfPtags = document.getElementsByTagName("span");
    for (var i = 0; i < arrOfPtags.length; i++) {
        if (arrOfPtags[i].textContent == 'Not available') {
            arrOfPtags[i].className += ' h6';
        }
    }
});
function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i < s.length; i++)
        view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}

$("#downloadReport").click(function () {
//    var wb = XLSX.utils.book_new();
    wb.Props = {
        Title: "Monitoring Indicators 2019",
        Subject: "Monitoring Indicators 2019",
        Author: "JRC"
    };


    wb.SheetNames.push("Indicators2019");
    var ws = XLSX.utils.aoa_to_sheet(indicators2019);
    wb.Sheets["Indicators2019"] = ws;

    wb.SheetNames.push("AdditionalInformation");
    ws = XLSX.utils.aoa_to_sheet(additionalInformation);
    wb.Sheets["AdditionalInformation"] = ws;

    var wbout = XLSX.write(wb, {bookType: 'xlsx', type: 'binary'});
    saveAs(new Blob([s2ab(wbout)], {type: "application/octet-stream"}), countryCode + '.xlsx');
});