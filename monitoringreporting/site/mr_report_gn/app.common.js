"use strict";

var config = {
    hcServices: {
        hostURL: 'http://localhost/',
        rootURIPath: '',
        restServicesURIPath: '',
        restSchedulerCountersURIPath: ''
    },
    frontendHostURL: 'http://localhost/',
    backendHostURL: 'http://localhost/'
};

//
// COMMON SECTION START
//
//const solrSelectPath = '/solr/select';
const solrSelectPath = '/geonetwork/srv/api/search/records/_search';

const geoportalResNewPullReportPath = "/services/1/PullResults";

const flagBasePath = 'res/img/flags/11/';
const flagExtension = '.svg';

// Global variables
var geoportalResNew = null;
var geoportalResCur = null;
var reloadTable = false;
var intervalPause = false;

function createSolrQParamsFragment(
        solrCustomQParams,
        dataTableInput,
        jsonpCallbackName) {
    let qParamsList = [];
    let qParamsFragment = '';

    if (solrCustomQParams && Array.isArray(solrCustomQParams)) {
        // initialize with custom parameters
        qParamsList = solrCustomQParams;
    }

    // apply DataTable settings if available
    if (dataTableInput) {
        // pagination
        qParamsList.push('start=' + dataTableInput.start);
        qParamsList.push('rows=' + dataTableInput.length);
    }

    // apply JSONP parameters if available
    if (jsonpCallbackName) {
        qParamsList.push('callback=?');
        qParamsList.push('json.wrf=' + jsonpCallbackName);
    }

    // filter and concatenate all the parameters
    if (qParamsList && Array.isArray(qParamsList)) {
        // filter by valid items
        qParamsList = qParamsList.filter(function (el) {
            return (el && el !== '');
        });
        // initialize the separator
        let qParamSeparator = '';
        // concatenate
        for (let i = 0; i < qParamsList.length; ++i) {
            let qParamItem = qParamsList[i];
            qParamsFragment += qParamSeparator + qParamItem;
            // with the first valid item, also initialize the separator
            if (qParamSeparator == '') {
                qParamSeparator = '&';
            }
        }
    }

    return qParamsFragment;
}

function invokeEsAjax(geoportalHostURL, reqHttpMethod, reqHttpDataBody, successCallback, errorCallback) {
    if (reqHttpMethod === null || reqHttpMethod === undefined) {
        // in case, use the safe GET
        reqHttpMethod = 'GET';
    }
    
    // code taken from InspireGeoportal
    if (geoportalHostURL && solrSelectPath && reqHttpDataBody) {

        let dataType, dataEntity, contentType, crossDomain, jsonp, jsonpCallback = null;
        //
            dataType = 'json';
            contentType = 'application/json; charset=utf-8';
            crossDomain = 'false';
            jsonp = false;
            jsonpCallback = null;
            dataEntity = JSON.stringify(reqHttpDataBody);
        //

        let searchReqURL = geoportalHostURL + solrSelectPath;

        if (searchReqURL !== null) {
            //// DEBUG
            //console.log(searchReqURL);
            $.ajax({
                url: searchReqURL,
                method: reqHttpMethod,
                contentType: contentType,
                data: dataEntity,
                dataType: dataType,
                crossDomain: crossDomain,
                jsonp: jsonp, // Override the callback function name in a JSONP request. If false, it requires jsonpCallback option
                jsonpCallback: jsonpCallback,
                statusCode: {
                    200: function (response, textStatus, jqXHR) {
                        successCallback(response, textStatus, jqXHR);
                    },
                    400: function (jqXHR, textStatus, errorThrown) {
                        errorCallback(jqXHR, textStatus, errorThrown);
                    },
                    401: function (jqXHR, textStatus, errorThrown) {
                        errorCallback(jqXHR, textStatus, errorThrown);
                    },
                    403: function (jqXHR, textStatus, errorThrown) {
                        errorCallback(jqXHR, textStatus, errorThrown);
                    },
                    404: function (jqXHR, textStatus, errorThrown) {
                        errorCallback(jqXHR, textStatus, errorThrown);
                    },
                    500: function (jqXHR, textStatus, errorThrown) {
                        errorCallback(jqXHR, textStatus, errorThrown);
                    }
                }
            });
        }
    }
}
function retrieveDataTimeFromServiceID(serviceID) {
    let year = null;
    let month = null;
    let day = null;
    let hour = null;
    let min = null;
    let sec = null;
    let datetime = '';

    if (serviceID && serviceID !== NULL) {

        let tmp = serviceID.substring(serviceID.indexOf('_') + 1, serviceID.length);

        year = tmp.substring(0, 4);
        month = tmp.substring(4, 6);
        day = tmp.substring(6, 8);
        hour = tmp.substring(9, 11);
        min = tmp.substring(11, 13);
        sec = tmp.substring(13, 15);
        datetime = year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
    }
    return datetime;
}
//
// COMMON SECTION END
//
