/*
/*
 * Copyright (C) 2001-2016 Food and Agriculture Organization of the
 * United Nations (FAO-UN), United Nations World Food Programme (WFP)
 * and United Nations Environment Programme (UNEP)
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or (at
 * your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301, USA
 *
 * Contact: Jeroen Ticheler - FAO - Viale delle Terme di Caracalla 2,
 * Rome - Italy. email: geonetwork@osgeo.org
 */
(function () {

    goog.provide('gn_search_inspireportal');




    goog.require('cookie_warning');
    goog.require('gn_mdactions_directive');
    goog.require('gn_related_directive');
    goog.require('gn_search');
    goog.require('gn_search_inspireportal_config');
    goog.require('gn_search_inspireportal_directive');


    angular.module("sbrpr.filters", [])
        .filter('groupBy', function () {
            var results = {};
            return function (data, key) {
                if (!(data && key)) return;
                var result;
                if (!this.$id) {
                    result = {};
                } else {
                    var scopeId = this.$id;
                    if (!results[scopeId]) {
                        results[scopeId] = {};
                        this.$on("$destroy", function () {
                            delete results[scopeId];
                        });
                    }
                    result = results[scopeId];
                }

                for (var groupKey in result)
                    result[groupKey].splice(0, result[groupKey].length);

                for (var i = 0; i < data.length; i++) {
                    if (!result[data[i][key]])
                        result[data[i][key]] = [];
                    result[data[i][key]].push(data[i]);
                }

                var keys = Object.keys(result);
                for (var k = 0; k < keys.length; k++) {
                    if (result[keys[k]].length === 0)
                        delete result[keys[k]];
                }
                return result;
            };
        });

    var module = angular.module('gn_search_inspireportal',
        ['gn_search', 'gn_search_inspireportal_config',
            'gn_search_inspireportal_directive', 'gn_related_directive',
            'cookie_warning', 'gn_mdactions_directive'
        ]);


    module.controller('menucontrol', function ($scope) {

        $scope.menuopen = function () {
            $("#mainMenu").attr("aria-expanded", "true");
            $("#menuok").show();
        }

        $scope.menuclose = function () {
            $(".ecl-menu__inner").css("display", "block")
            $("#menuok").hide();
        }

    });

    module.controller("gnsScrollController", [
        "$scope",
        "$location",
        "$anchorScroll",
        function ($scope, $location, $anchorScroll) {
            /***
             * Scroll to an anchor on the page and focus on the first focusable element
             *
             * @param anchor The ID of the anchor to scroll to
             */
            $scope.gotoAnchor = function (anchor) {
                // the element you wish to scroll to.
                $location.hash(anchor);
                // call $anchorScroll()
                $anchorScroll();
                // set the focus on the first focusable element, with a small delay otherwise a search can start
                setTimeout(function () {
                    $("#" + anchor)
                        .find(":focusable")
                        .first()
                        .focus();
                }, 500);
            };
        }
    ]);

    module.controller('gnsSearchPopularController', [
        '$scope', 'gnSearchSettings',
        function ($scope, gnSearchSettings) {
            $scope.searchObj = {
                permalink: false,
                internal: true,
                filters: gnSearchSettings.filters,
                configId: "home",
                    params: {
                    isTemplate: 'n',
                    sortBy: 'popularity',
                    from: 1,
                    to: 12
                }
            };
        }
    ]);

    module.controller('gnsSearchLatestController', [
        '$scope', 'gnSearchSettings',
        function ($scope, gnSearchSettings) {
            $scope.searchObj = {
                permalink: false,
                internal: true,
                filters: gnSearchSettings.filters,
                configId: "home",
                params: {
                    isTemplate: 'n',
                    sortBy: 'createDate',
                    sortOrder: 'desc',
                    from: 1,
                    to: 12
                }
            };
        }
    ]);


    module.controller('gnsSearchTopEntriesController', [
        '$scope', 'gnRelatedResources',
        function ($scope, gnRelatedResources) {
            $scope.resultTemplate = '../../catalog/components/' +
                'search/resultsview/partials/viewtemplates/grid4maps.html';
            $scope.searchObj = {
                permalink: false,
                internal: true,
                filters: [{
                    "query_string": {
                        "query": "+resourceType:\"map/interactive\""
                    }
                }],
                params: {
                    isTemplate: 'n',
                    sortBy: 'changeDate',
                    sortOrder: 'desc',
                    from: 1,
                    to: 30
                }
            };

            $scope.loadMap = function (map, md) {
                gnRelatedResources.getAction('MAP')(map, md);
            };
        }
    ]);

    module.config(['$LOCALES', function ($LOCALES) {
        $LOCALES.push('/../api/i18n/packages/search');
    }]);


    module.controller('activeController',function ($scope, $location) {
          $scope.actTab0 = 'Home';
          $scope.actTab1 = '';
          $scope.overviewView = "-";
          $scope.$on('$locationChangeSuccess', function () {
               $scope.activeTab = $location.path().match(/^(\/[a-zA-Z0-9]*)($|\/.*)/)[1];
               var params = $location.search();
               if (params.hasOwnProperty('view')) {
                    $scope.overviewView = params.view;
                }
                if ($scope.activeTab == "/accessibilitystatement") {
                    $scope.actTab0 = 'Accessibility Statement';
                    $scope.actTab1 = '';
                }
                if ($scope.activeTab == "/home") {
                    $scope.actTab0 = 'Home';
                    $scope.actTab1 = '';
                }
                if ($scope.activeTab == "/pdvhome") {
                    $scope.actTab0 = 'Priority Datasets';
                    $scope.actTab1 = 'Overview';
                }
                if ($scope.activeTab == "/qsEnvDomain") {
                    $scope.actTab0 = 'Priority Datasets';
                    $scope.actTab1 = 'Environmental Domains';
                }
                if ($scope.activeTab == "/qsLegislation") {
                    $scope.actTab0 = 'Priority Datasets';
                    $scope.actTab1 = 'Environmental Legislation';
                }
                if ($scope.activeTab == "/tvhome") {
                    $scope.actTab0 = 'Thematic Data';
                    $scope.actTab1 = 'Overview';
                }
                if ($scope.activeTab == "/datathemes") {
                    $scope.actTab0 = 'Thematic Data';
                    $scope.actTab1 = 'INSPIRE Data Themes';
                }
                if ($scope.activeTab == "/hvdshome") {
                    $scope.actTab0 = 'High-Value Datasets';
                    $scope.actTab1 = '';
                }
                if (($scope.activeTab == '/overview') || ($scope.activeTab == '/results') || ($scope.activeTab == '/datasetdetails')) {
                    if ($scope.overviewView == 'priorityOverview') {
                        $scope.actTab0 = 'Priority Datasets';
                        $scope.actTab1 = 'Country Overview';
                    }
                    if ($scope.overviewView == 'thematicOverview') {
                        $scope.actTab0 = 'Thematic Data';
                        $scope.actTab1 = 'Country Overview';
                    }
                }

            });
    });


    module.controller(
        'gnsInspireportal', [
        '$scope',
        '$location',
        '$filter',
        'suggestService',
        '$http',
        '$translate',
        'gnUtilityService',
        'gnSearchSettings',
        'gnViewerSettings',
        'gnMap',
        'gnMdView',
        'gnMdViewObj',
        'gnWmsQueue',
        'gnSearchLocation',
        'gnOwsContextService',
        'hotkeys',
        'gnGlobalSettings',
        'gnESClient',
        'gnESFacet',
        'gnFacetSorter',
        'gnExternalViewer',
        'gnUrlUtils',
        function (
            $scope, $location, $filter,
            suggestService, $http, $translate,
            gnUtilityService, gnSearchSettings, gnViewerSettings,
            gnMap, gnMdView, mdView, gnWmsQueue,
            gnSearchLocation, gnOwsContextService,
            hotkeys, gnGlobalSettings, gnESClient,
            gnESFacet, gnFacetSorter, gnExternalViewer, gnUrlUtils) {


            var viewerMap = gnSearchSettings.viewerMap;
            var searchMap = gnSearchSettings.searchMap;


            $scope.modelOptions = angular.copy(gnGlobalSettings.modelOptions);
            $scope.modelOptionsForm = angular.copy(gnGlobalSettings.modelOptions);
            $scope.showMosaic = gnGlobalSettings.gnCfg.mods.home.showMosaic;
            $scope.isFilterTagsDisplayedInSearch = gnGlobalSettings.gnCfg.mods.search.isFilterTagsDisplayedInSearch;
            $scope.showMapInFacet = gnGlobalSettings.gnCfg.mods.search.showMapInFacet;
            $scope.showStatusFooterFor = gnGlobalSettings.gnCfg.mods.search.showStatusFooterFor;
            $scope.showBatchDropdown = gnGlobalSettings.gnCfg.mods.search.showBatchDropdown;
            $scope.exactMatchToggle = gnGlobalSettings.gnCfg.mods.search.exactMatchToggle;
            $scope.exactTitleToggle = gnGlobalSettings.gnCfg.mods.search.exactTitleToggle;
            $scope.searchOptions = gnGlobalSettings.gnCfg.mods.search.searchOptions;
            $scope.gnWmsQueue = gnWmsQueue;
            $scope.$location = $location;
            $scope.activeTab = '/home';
            $scope.formatter = gnGlobalSettings.gnCfg.mods.search.formatter;
            $scope.listOfResultTemplate = gnGlobalSettings.gnCfg.mods.search.resultViewTpls;
            $scope.resultTemplate = gnSearchSettings.resultTemplate;
            $scope.advandedSearchTemplate = gnSearchSettings.advancedSearchTemplate;
            $scope.facetsSummaryType = gnSearchSettings.facetsSummaryType;
            $scope.facetConfig = gnSearchSettings.facetConfig;
            $scope.facetTabField = gnSearchSettings.facetTabField;
            $scope.location = gnSearchLocation;
            $scope.fluidLayout = gnGlobalSettings.gnCfg.mods.home.fluidLayout;
            $scope.showMaps = gnGlobalSettings.gnCfg.mods.home.showMaps;
            $scope.fluidEditorLayout = gnGlobalSettings.gnCfg.mods.editor.fluidEditorLayout;
            $scope.fluidHeaderLayout = gnGlobalSettings.gnCfg.mods.header.fluidHeaderLayout;
            $scope.showGNName = gnGlobalSettings.gnCfg.mods.header.showGNName;
            $scope.globalurl = location.protocol + '//' + location.host + url_query;
            $scope.dataCountry = "";

            $scope.facetSorter = gnFacetSorter.sortByTranslation;

            $scope.addToMapLayerNameUrlParam = gnGlobalSettings.gnCfg.mods.search.addWMSLayersToMap.urlLayerParam;

            $scope.sortKeywordsAlphabetically =
            gnGlobalSettings.gnCfg.mods.recordview.sortKeywordsAlphabetically;

            $scope.test = function () {
                alert("test");
            }

            $scope.toggleMap = function () {
                $(searchMap.getTargetElement()).toggle();
                $('button.gn-minimap-toggle > i').toggleClass('fa-angle-double-left fa-angle-double-right');
            };
            hotkeys.bindTo($scope)
                .add({
                    combo: 'h',
                    description: $translate.instant('hotkeyHome'),
                    callback: function (event) {
                        $location.path('/home');
                    }
                }).add({
                    combo: 't',
                    description: $translate.instant('hotkeyFocusToSearch'),
                    callback: function (event) {
                        event.preventDefault();
                        var anyField = $('#gn-any-field');
                        if (anyField) {
                            gnUtilityService.scrollTo();
                            $location.path('/search');
                            anyField.focus();
                        }
                    }
                }).add({
                    combo: 'm',
                    description: $translate.instant('hotkeyMap'),
                    callback: function (event) {
                        $location.path('/map');
                    }
                });


            // TODO: Previous record should be stored on the client side
            $scope.mdView = mdView;
            gnMdView.initMdView();


            $scope.goToSearch = function (any) {
                $location.path('/search').search({
                    'any': any
                });
            };
            $scope.canEdit = function (record) {
                // TODO: take catalog config for harvested records
                // TODOES: this property does not exist yet; makes sure it is
                // replaced by a correct one eventually
                if (record && record.edit == 'true') {
                    return true;
                }
                return false;
            };

            $scope.buildOverviewUrl = function (md) {
                if (md.overview) {
                    return md.overview[0].url;
                } else if (md.resourceType && md.resourceType[0] === 'feature') {
                    // Build a getmap request on the feature
                    var t = decodeURIComponent(md.featureTypeId).split('#');

                    var getMapRequest = t[0].replace(/SERVICE=WFS/i, '') + (t[0].indexOf('?' !== -1) ? '&' : '?') +
                        "SERVICE=WMS&VERSION=1.1.0&REQUEST=GetMap&FORMAT=image/png&LAYERS=" + t[1] +
                        "&CRS=EPSG:4326&BBOX=" + md.bbox_xmin + "," + md.bbox_ymin + "," + md.bbox_xmax + "," + md.bbox_ymax +
                        "&WIDTH=100&HEIGHT=100";

                    return getMapRequest;
                } else {
                    return '../../catalog/views/inspireportal/images/no-thumbnail.png';
                }
            };

            $scope.stringReplaceAll = function (target, search, replacement) {
                return target.replace(new RegExp(search, 'g'), replacement);
            };



            $scope.accordionClick = function (accordionType, forceDisplay) {
                if ($scope.accoptions == accordionType) {
                    $scope.accoptions = "";
                } else {
                    $scope.accoptions = accordionType;
                }
                if (forceDisplay == null) {
                    var display = document.getElementById(accordionType + '-content').style.display;
                } else {
                    var display = "";
                }
                if ((display == "none") || (display == "")) {
                if ( document.getElementById(accordionType + '-content') != null) {
                    document.getElementById(accordionType + '-content').style.display = "block";
                }
                if ( document.getElementById(accordionType + '-icon') != null) {
                    document.getElementById(accordionType + '-icon').setAttributeNS(
                        'http://www.w3.org/1999/xlink',
                        'xlink:href',
                        '../../catalog/views/inspireportal/images/icons.svg#minus');
                }
                } else {
                    document.getElementById(accordionType + '-content').style.display = "none";
                    document.getElementById(accordionType + '-icon').setAttributeNS(
                        'http://www.w3.org/1999/xlink',
                        'xlink:href',
                        '../../catalog/views/inspireportal/images/icons.svg#plus');
                }
            }

            $scope.clickSubCard = function (domain) {
                if (domain != 0) $scope.subCard[0] = false;
                if (domain != 1) $scope.subCard[1] = false;
                if (domain != 2) $scope.subCard[2] = false;
                if (domain != 3) $scope.subCard[3] = false;
                if (domain != 4) $scope.subCard[4] = false;
                if (domain != 5) $scope.subCard[5] = false;
                if (domain != 6) $scope.subCard[6] = false;
                if ($scope.subCard[domain] == true) {
                    $scope.subCard[domain] = false;
                } else {
                    $scope.subCard[domain] = true;
                }
            }

            $scope.displayDomains = function (listType) {
                $scope.showEnvDomains = listType;
            }

            $scope.changeOverviewMapType = function (listType) {
                $scope.overviewMapType = listType;


                setTimeout(function () {
                    $scope.countryOverviewMapSetup(listType);
                }, 100);
            }

            $scope.isContains = function (json, searchValue) {
                var element = "-";
                $.map(json, function (elem, index) {
                    if (elem.item == searchValue)
                        element = elem.counter;
                    return element;
                });
                return element;
            }

            $scope.getDataCached = function (json, searchValue) {
                var element = "-";
                $.map(json, function (elem, index) {
                    if (elem.item == searchValue)
                        element = elem.data;
                    return element;
                });
                return element;
            }

            $scope.getStatsDataThemesData = function (view, object, value) {
                if ($scope.activeTab == "/datathemes" || $scope.activeTab == "/hvdshome") {

                    var id = object.id;
                    var currentCounter = $scope.isContains($scope.arrayQueries, view + "_" + id + "_" + value);

                    if (currentCounter > -1) {
                        //if ($scope.debug) console.log("getStatsDataThemesData CACHE from " + view+"_"+id+"_"+value);
                        var itemCounterMT = currentCounter;
                        var itemCounterDW = $scope.isContains($scope.arrayQueries, view + "_" + id + "_DW");
                        var itemCounterVW = $scope.isContains($scope.arrayQueries, view + "_" + id + "_VW");
                        $("#" + view + "_" + id + "_MT").text(itemCounterMT);
                        $("#" + view + "_" + id + "_DW").text(itemCounterDW);
                        $("#" + view + "_" + id + "_VW").text(itemCounterVW);
                    } else {
                        var GN_rootURL = $scope.globalurl;
                        var theme_uri = "http://inspire.ec.europa.eu/theme/" + id;

                        var dataBody = {
                            "size": 0,
                            "sort": [{
                                "resourceTitleObject.default.keyword": "asc"
                            }, "_score"],
                            "query": {
                                "function_score": {
                                    "query": {
                                        "bool": {
                                            "must": [{
                                                "terms": {
                                                    "isTemplate": ["n"]
                                                }
                                            }, {
                                                "query_string": {
                                                    "query": "(cl_hierarchyLevel.key:\"dataset\" OR cl_hierarchyLevel.key:\"series\")"
                                                }
                                            }, {
                                                "query_string": {
                                                    "query": "(th_httpinspireeceuropaeutheme-theme.link: \"" + theme_uri + "\")"
                                                }
                                            }, {
                                                "exists": {
                                                    "field": "groupOwner"
                                                }
                                            }]
                                        }
                                    }
                                }
                            },
                            "aggregations": {
                                "resources": {
                                    "terms": {
                                        "field": "docType",
                                        "size": 1000
                                    },
                                    "aggs": {
                                        "availableInServices": {
                                            "filters": {
                                                "filters": {
                                                    "datasetOrSeries": {
                                                        "query_string": {
                                                            "query": "(cl_hierarchyLevel.key:\"dataset\" OR cl_hierarchyLevel.key:\"series\")"
                                                        }
                                                    },
                                                    "availableInViewService": {
                                                        "query_string": {
                                                            "query": "+indicator_INDICATOR_VIEW_LINK_TO_DATA:/PASS/"
                                                        }
                                                    },
                                                    "availableInDownloadService": {
                                                        "query_string": {
                                                            "query": "+indicator_INDICATOR_DOWNLOAD_LINK_TO_DATA:/PASS/"
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            "track_total_hits": true
                        }
                        $.ajax({
                            cache: false,
                            type: "POST",
                            url: GN_rootURL + "srv/api/search/records/_search",
                            data: JSON.stringify(dataBody),
                            success: function (response) {
                                // if ($scope.debug) console.log("getStatsDataThemesData response" + response);
                                itemCounterMT = response.aggregations.resources.buckets[0].availableInServices.buckets.datasetOrSeries.doc_count;
                                itemCounterDW = response.aggregations.resources.buckets[0].availableInServices.buckets.availableInDownloadService.doc_count;
                                itemCounterVW = response.aggregations.resources.buckets[0].availableInServices.buckets.availableInViewService.doc_count;

                                $scope.arrayQueries.push({
                                    "item": view + "_" + id + "_MT",
                                    "counter": itemCounterMT
                                });
                                $scope.arrayQueries.push({
                                    "item": view + "_" + id + "_DW",
                                    "counter": itemCounterDW
                                });
                                $scope.arrayQueries.push({
                                    "item": view + "_" + id + "_VW",
                                    "counter": itemCounterVW
                                });
                                $("#" + view + "_" + id + "_MT").text(itemCounterMT);
                                $("#" + view + "_" + id + "_DW").text(itemCounterDW);
                                $("#" + view + "_" + id + "_VW").text(itemCounterVW);
                                //if ($scope.debug) console.log("getStatsDataThemesData arrayQueries" + $scope.arrayQueries);
                            },
                            error: function (errMsg) {
                                $scope.arrayQueries.push({
                                    "item": view + "_" + id + "_MT",
                                    "counter": "-1"
                                });
                                $scope.arrayQueries.push({
                                    "item": view + "_" + id + "_DW",
                                    "counter": "-1"
                                });
                                $scope.arrayQueries.push({
                                    "item": view + "_" + id + "_VW",
                                    "counter": "-1"
                                });
                                $("#" + view + "_" + id + "_MT").text("0");
                                $("#" + view + "_" + id + "_DW").text("0");
                                $("#" + view + "_" + id + "_VW").text("0");

                            },
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            crossDomain: true
                        });
                    }
                }
                return "";
            }

            $scope.getIconURL = function (theme) {
            var url = "";
                 if (theme.label.contains('/')){
                    url = theme.label.toLowerCase().replaceAll(' and ','-').replaceAll(' ','-').replaceAll('/','-')+'_en';
                 } else {
                    url = theme.label.toLowerCase().replaceAll(' — ','-and-').replaceAll(' ','-')+'_en';
                 }
                 return "https://knowledge-base.inspire.ec.europa.eu/"+url;
            }


            //get the LPIS overall statistics for the hvdshome.html view
            $scope.getStatsLPIS = function () {
                if ($scope.activeTab == "/hvdshome") {
                    var id = "";
                    var value = "";
                    var view = "LPIS";
                    var currentCounter = $scope.isContains($scope.arrayQueries, view + "_" + id + "_" + value);
                    if (currentCounter > -1) {

                        var itemCounterMT = currentCounter;
                        var itemCounterDW = $scope.isContains($scope.arrayQueries, view + "_" + id + "_DW");
                        var itemCounterVW = $scope.isContains($scope.arrayQueries, view + "_" + id + "_VW");
                        $("#" + view + "_" + id + "_MT").text(itemCounterMT);
                        $("#" + view + "_" + id + "_DW").text(itemCounterDW);
                        $("#" + view + "_" + id + "_VW").text(itemCounterVW);


                    } else {
                        var GN_rootURL = $scope.globalurl;

                        var dataBody = {
                            "size": 0,
                            "sort": [{
                                "resourceTitleObject.default.keyword": "asc"
                            }, "_score"],
                            "query": {
                                "function_score": {
                                    "query": {
                                        "bool": {
                                            "must": [{
                                                "terms": {
                                                    "isTemplate": ["n"]
                                                }
                                            }, {
                                                "query_string": {
                                                    "query": "(cl_hierarchyLevel.key:\"dataset\" OR cl_hierarchyLevel.key:\"series\")"
                                                }
                                            }, {
                                                "query_string": {
                                                    "query": "(tag.default:\"LPIS\" OR tag.key:\"*/IACSData/LPIS\")"
                                                }
                                            }]
                                        }
                                    }
                                }
                            },
                            "aggregations": {
                                "resources": {
                                    "terms": {
                                        "field": "docType"
                                    },
                                    "aggs": {
                                        "availableInServices": {
                                            "filters": {
                                                "filters": {
                                                    "datasetOrSeries": {
                                                        "query_string": {
                                                            "query": "(cl_hierarchyLevel.key:\"dataset\" OR cl_hierarchyLevel.key:\"series\")"
                                                        }
                                                    },
                                                    "availableInViewService": {
                                                        "query_string": {
                                                            "query": "+indicator_INDICATOR_VIEW_LINK_TO_DATA:/PASS/"
                                                        }
                                                    },
                                                    "availableInDownloadService": {
                                                        "query_string": {
                                                            "query": "+indicator_INDICATOR_DOWNLOAD_LINK_TO_DATA:/PASS/"
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            "track_total_hits": true
                        }
                        $.ajax({
                            cache: false,
                            type: "POST",
                            url: GN_rootURL + "srv/api/search/records/_search",
                            data: JSON.stringify(dataBody),
                            success: function (response) {
                                //if ($scope.debug) console.log("LPIS response" + response);
                                itemCounterMT = response.aggregations.resources.buckets[0].availableInServices.buckets.datasetOrSeries.doc_count;
                                itemCounterDW = response.aggregations.resources.buckets[0].availableInServices.buckets.availableInDownloadService.doc_count;
                                itemCounterVW = response.aggregations.resources.buckets[0].availableInServices.buckets.availableInViewService.doc_count;
                                if ($scope.debug) console.log("#" + view + "_" + id + "_" + "MT" + " : " + itemCounterMT);
                                if ($scope.debug) console.log("#" + view + "_" + id + "_" + "DW" + " : " + itemCounterDW);
                                if ($scope.debug) console.log("#" + view + "_" + id + "_" + "VW" + " : " + itemCounterVW);
                                $scope.arrayQueries.push({
                                    "item": view + "_" + id + "_MT",
                                    "counter": itemCounterMT
                                });
                                $scope.arrayQueries.push({
                                    "item": view + "_" + id + "_DW",
                                    "counter": itemCounterDW
                                });
                                $scope.arrayQueries.push({
                                    "item": view + "_" + id + "_VW",
                                    "counter": itemCounterVW
                                });
                                $("#" + view + "_" + id + "_MT").text(itemCounterMT);
                                $("#" + view + "_" + id + "_DW").text(itemCounterDW);
                                $("#" + view + "_" + id + "_VW").text(itemCounterVW);
                                //if ($scope.debug) console.log("LPIS arrayQueries" + $scope.arrayQueries);
                            },
                            error: function (errMsg) {
                                $scope.arrayQueries.push({
                                    "item": view + "_" + id + "_MT",
                                    "counter": "-1"
                                });
                                $scope.arrayQueries.push({
                                    "item": view + "_" + id + "_DW",
                                    "counter": "-1"
                                });
                                $scope.arrayQueries.push({
                                    "item": view + "_" + id + "_VW",
                                    "counter": "-1"
                                });
                                $("#" + view + "_" + id + "_MT").text("0");
                                $("#" + view + "_" + id + "_DW").text("0");
                                $("#" + view + "_" + id + "_VW").text("0");
                                if ($scope.debug) console.log("LPIS error" + errMsg);
                            },
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            crossDomain: true
                        });
                    }
                }
                return "";
            }


            //get the GSSA overall statistics for the hvdshome.html view
            $scope.getStatsGSAA = function () {
                if ($scope.activeTab == "/hvdshome") {
                    var id = "";
                    var value = "";
                    var view = "GSAA";
                    var currentCounter = $scope.isContains($scope.arrayQueries, view + "_" + id + "_" + value);
                    if (currentCounter > -1) {

                        var itemCounterMT = currentCounter;
                        var itemCounterDW = $scope.isContains($scope.arrayQueries, view + "_" + id + "_DW");
                        var itemCounterVW = $scope.isContains($scope.arrayQueries, view + "_" + id + "_VW");
                        $("#" + view + "_" + id + "_MT").text(itemCounterMT);
                        $("#" + view + "_" + id + "_DW").text(itemCounterDW);
                        $("#" + view + "_" + id + "_VW").text(itemCounterVW);


                    } else {
                        var GN_rootURL = $scope.globalurl;

                        /* Postman reference query id in the source code: hvds_stats */

                        var dataBody = {
                            "size": 0,
                            "sort": [{
                                "resourceTitleObject.default.keyword": "asc"
                            }, "_score"],
                            "query": {
                                "function_score": {
                                    "query": {
                                        "bool": {
                                            "must": [{
                                                "terms": {
                                                    "isTemplate": ["n"]
                                                }
                                            }, {
                                                "query_string": {
                                                    "query": "(cl_hierarchyLevel.key:\"dataset\" OR cl_hierarchyLevel.key:\"series\")"
                                                }
                                            }, {
                                                "query_string": {
                                                    "query": "(tag.default:\"GSAA\" OR tag.key:\"*/IACSData/GSAA\")"
                                                }
                                            }]
                                        }
                                    }
                                }
                            },
                            "aggregations": {
                                "resources": {
                                    "terms": {
                                        "field": "docType"
                                    },
                                    "aggs": {
                                        "availableInServices": {
                                            "filters": {
                                                "filters": {
                                                    "datasetOrSeries": {
                                                        "query_string": {
                                                            "query": "(cl_hierarchyLevel.key:\"dataset\" OR cl_hierarchyLevel.key:\"series\")"
                                                        }
                                                    },
                                                    "availableInViewService": {
                                                        "query_string": {
                                                            "query": "+indicator_INDICATOR_VIEW_LINK_TO_DATA:/PASS/"
                                                        }
                                                    },
                                                    "availableInDownloadService": {
                                                        "query_string": {
                                                            "query": "+indicator_INDICATOR_DOWNLOAD_LINK_TO_DATA:/PASS/"
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            "track_total_hits": true
                        }
                        $.ajax({
                            cache: false,
                            type: "POST",
                            url: GN_rootURL + "srv/api/search/records/_search",
                            data: JSON.stringify(dataBody),
                            success: function (response) {
                                //if ($scope.debug) console.log("GSAA response" + response);
                                itemCounterMT = response.aggregations.resources.buckets[0].availableInServices.buckets.datasetOrSeries.doc_count;
                                itemCounterDW = response.aggregations.resources.buckets[0].availableInServices.buckets.availableInDownloadService.doc_count;
                                itemCounterVW = response.aggregations.resources.buckets[0].availableInServices.buckets.availableInViewService.doc_count;
                                if ($scope.debug) console.log("#" + view + "_" + id + "_" + "MT" + " : " + itemCounterMT);
                                if ($scope.debug) console.log("#" + view + "_" + id + "_" + "DW" + " : " + itemCounterDW);
                                if ($scope.debug) console.log("#" + view + "_" + id + "_" + "VW" + " : " + itemCounterVW);
                                $scope.arrayQueries.push({
                                    "item": view + "_" + id + "_MT",
                                    "counter": itemCounterMT
                                });
                                $scope.arrayQueries.push({
                                    "item": view + "_" + id + "_DW",
                                    "counter": itemCounterDW
                                });
                                $scope.arrayQueries.push({
                                    "item": view + "_" + id + "_VW",
                                    "counter": itemCounterVW
                                });
                                $("#" + view + "_" + id + "_MT").text(itemCounterMT);
                                $("#" + view + "_" + id + "_DW").text(itemCounterDW);
                                $("#" + view + "_" + id + "_VW").text(itemCounterVW);
                                //if ($scope.debug) console.log("LPIS arrayQueries" + $scope.arrayQueries);
                            },
                            error: function (errMsg) {
                                $scope.arrayQueries.push({
                                    "item": view + "_" + id + "_MT",
                                    "counter": "-1"
                                });
                                $scope.arrayQueries.push({
                                    "item": view + "_" + id + "_DW",
                                    "counter": "-1"
                                });
                                $scope.arrayQueries.push({
                                    "item": view + "_" + id + "_VW",
                                    "counter": "-1"
                                });
                                $("#" + view + "_" + id + "_MT").text("0");
                                $("#" + view + "_" + id + "_DW").text("0");
                                $("#" + view + "_" + id + "_VW").text("0");
                                if ($scope.debug) console.log("GSAA error" + errMsg);
                            },
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            crossDomain: true
                        });
                    }
                }
                return "";
            }



            $scope.getStatsLegislationData = function (view, object, value) {
                if ($scope.activeTab == "/qsLegislation") {
                    var id = object.id;
                    var currentCounter = $scope.isContains($scope.arrayQueries, view + "_" + id + "_" + value);
                    if (currentCounter > -1) {
                        if ($scope.debug) console.log("CACHE from " + view + "_" + id + "_" + value);
                        var itemCounterMT = currentCounter;
                        var itemCounterDW = $scope.isContains($scope.arrayQueries, view + "_" + id + "_DW");
                        var itemCounterVW = $scope.isContains($scope.arrayQueries, view + "_" + id + "_VW");
                        $("#" + view + "_" + id + "_MT").text(itemCounterMT);
                        $("#" + view + "_" + id + "_DW").text(itemCounterDW);
                        $("#" + view + "_" + id + "_VW").text(itemCounterVW);
                    } else {
                        var GN_rootURL = $scope.globalurl;
                        var synonym = $scope.decodeItem(id, 'legislations');

                        /* Postman reference query id in the source code: legislation_stats */

                        var dataBody = {
                            "from": 0,
                            "size": 0,
                            "sort": ["_score"],
                            "query": {
                                "function_score": {
                                    "query": {
                                        "bool": {
                                            "must": [{
                                                "terms": {
                                                    "isTemplate": ["n"]
                                                }
                                            }, {
                                                "query_string": {
                                                    "query": "(cl_hierarchyLevel.key:\"dataset\" OR cl_hierarchyLevel.key:\"series\")"
                                                }
                                            }, {
                                                "query_string": {
                                                    "query": "synonymsLegislation:\"" + synonym + "\""
                                                }
                                            }]
                                        }
                                    }
                                }
                            },
                            "aggregations": {
                                "resources": {
                                    "terms": {
                                        "field": "docType"
                                    },
                                    "aggregations": {
                                        "availableInServices": {
                                            "filters": {
                                                "filters": {
                                                    "datasetOrSeries": {
                                                        "query_string": {
                                                            "query": "(cl_hierarchyLevel.key:\"dataset\" OR cl_hierarchyLevel.key:\"series\")"
                                                        }
                                                    },
                                                    "availableInViewService": {
                                                        "query_string": {
                                                            "query": "+indicator_INDICATOR_VIEW_LINK_TO_DATA:/PASS/"
                                                        }
                                                    },
                                                    "availableInDownloadService": {
                                                        "query_string": {
                                                            "query": "+indicator_INDICATOR_DOWNLOAD_LINK_TO_DATA:/PASS/"
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            "track_total_hits": true
                        }
                        $.ajax({
                            cache: false,
                            type: "POST",
                            url: GN_rootURL + "srv/api/search/records/_search",
                            data: JSON.stringify(dataBody),
                            success: function (response) {
                                var obj = response.aggregations.resources.buckets;
                                if (obj.length > 0) {
                                    if ($scope.debug) console.log(response);
                                    itemCounterMT = response.aggregations.resources.buckets[0].availableInServices.buckets.datasetOrSeries.doc_count;
                                    itemCounterDW = response.aggregations.resources.buckets[0].availableInServices.buckets.availableInDownloadService.doc_count;
                                    itemCounterVW = response.aggregations.resources.buckets[0].availableInServices.buckets.availableInViewService.doc_count;
                                    if ($scope.debug) console.log("#" + view + "_" + id + "_" + "MT" + " : " + itemCounterMT);
                                    if ($scope.debug) console.log("#" + view + "_" + id + "_" + "DW" + " : " + itemCounterDW);
                                    if ($scope.debug) console.log("#" + view + "_" + id + "_" + "VW" + " : " + itemCounterVW);
                                    $("#" + view + "_" + id + "_MT").text(itemCounterMT);
                                    $("#" + view + "_" + id + "_DW").text(itemCounterDW);
                                    $("#" + view + "_" + id + "_VW").text(itemCounterVW);
                                    if ($scope.debug) console.log($scope.arrayQueries);
                                } else {
                                    itemCounterMT = -1;
                                    itemCounterDW = -1;
                                    itemCounterVW = -1;
                                    $("#" + view + "_" + id + "_MT").text("0");
                                    $("#" + view + "_" + id + "_DW").text("0");
                                    $("#" + view + "_" + id + "_VW").text("0");
                                }
                                $scope.arrayQueries.push({
                                    "item": view + "_" + id + "_MT",
                                    "counter": itemCounterMT
                                });
                                $scope.arrayQueries.push({
                                    "item": view + "_" + id + "_DW",
                                    "counter": itemCounterDW
                                });
                                $scope.arrayQueries.push({
                                    "item": view + "_" + id + "_VW",
                                    "counter": itemCounterVW
                                });
                            },
                            error: function (errMsg) {
                                $scope.arrayQueries.push({
                                    "item": view + "_" + id + "_MT",
                                    "counter": "-1"
                                });
                                $scope.arrayQueries.push({
                                    "item": view + "_" + id + "_DW",
                                    "counter": "-1"
                                });
                                $scope.arrayQueries.push({
                                    "item": view + "_" + id + "_VW",
                                    "counter": "-1"
                                });
                                $("#" + view + "_" + id + "_MT").text("0");
                                $("#" + view + "_" + id + "_DW").text("0");
                                $("#" + view + "_" + id + "_VW").text("0");
                                if ($scope.debug) console.log(errMsg);
                            },
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            crossDomain: true
                        });
                    }
                }
                return "";
            }

            $scope.getStatsEnvDomainsData = function (view, subview, id, value) {
                if ($scope.activeTab == "/qsEnvDomain") {
                    var currentCounter = $scope.isContains($scope.arrayQueries, view + "_" + subview + "_" + id + "_" + value);
                    if (currentCounter > -1) {
                        if ($scope.debug) console.log("CACHE from " + view + "_" + subview + "_" + id + "_" + value);
                        var itemCounterMT = currentCounter;
                        var itemCounterDW = $scope.isContains($scope.arrayQueries, view + "_" + subview + "_" + id + "_DW");
                        var itemCounterVW = $scope.isContains($scope.arrayQueries, view + "_" + subview + "_" + id + "_VW");
                        $("#" + view + "_" + subview + "_" + id + "_MT").text(itemCounterMT);
                        $("#" + view + "_" + subview + "_" + id + "_DW").text(itemCounterDW);
                        $("#" + view + "_" + subview + "_" + id + "_VW").text(itemCounterVW);
                    } else {
                        var GN_rootURL = $scope.globalurl;

                        /* Postman reference query id in the source code:  envdomain_stats */

                        var dataBody = {
                            "from": 0,
                            "size": 0,
                            "sort": ["_score"],
                            "query": {
                                "function_score": {
                                    "query": {
                                        "bool": {
                                            "must": [{
                                                "terms": {
                                                    "isTemplate": ["n"]
                                                }
                                            }, {
                                                "query_string": {
                                                    "query": "(cl_hierarchyLevel.key:\"dataset\" OR cl_hierarchyLevel.key:\"series\")"
                                                }
                                            }, {
                                                "query_string": {
                                                    "query": "synonymsEnvironmentalDomain:\"" + id + "\""
                                                }
                                            }]
                                        }
                                    }
                                }
                            },
                            "aggregations": {
                                "resources": {
                                    "terms": {
                                        "field": "docType"
                                    },
                                    "aggregations": {
                                        "availableInServices": {
                                            "filters": {
                                                "filters": {
                                                    "datasetOrSeries": {
                                                        "query_string": {
                                                            "query": "(cl_hierarchyLevel.key:\"dataset\" OR cl_hierarchyLevel.key:\"series\")"
                                                        }
                                                    },
                                                    "availableInViewService": {
                                                        "query_string": {
                                                            "query": "+indicator_INDICATOR_VIEW_LINK_TO_DATA:/PASS/"
                                                        }
                                                    },
                                                    "availableInDownloadService": {
                                                        "query_string": {
                                                            "query": "+indicator_INDICATOR_DOWNLOAD_LINK_TO_DATA:/PASS/"
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            "track_total_hits": true
                        }
                        $.ajax({
                            cache: false,
                            type: "POST",
                            url: GN_rootURL + "srv/api/search/records/_search",
                            data: JSON.stringify(dataBody),
                            success: function (response) {
                                var obj = response.aggregations.resources.buckets;
                                if (obj.length > 0) {
                                    if ($scope.debug) console.log(response);
                                    itemCounterMT = response.aggregations.resources.buckets[0].availableInServices.buckets.datasetOrSeries.doc_count;
                                    itemCounterDW = response.aggregations.resources.buckets[0].availableInServices.buckets.availableInDownloadService.doc_count;
                                    itemCounterVW = response.aggregations.resources.buckets[0].availableInServices.buckets.availableInViewService.doc_count;
                                    if ($scope.debug) console.log("#" + view + "_" + subview + "_" + id + "_" + "MT" + " : " + itemCounterMT);
                                    if ($scope.debug) console.log("#" + view + "_" + subview + "_" + id + "_" + "DW" + " : " + itemCounterDW);
                                    if ($scope.debug) console.log("#" + view + "_" + subview + "_" + id + "_" + "VW" + " : " + itemCounterVW);
                                    $("#" + view + "_" + subview + "_" + id + "_MT").text(itemCounterMT);
                                    $("#" + view + "_" + subview + "_" + id + "_DW").text(itemCounterDW);
                                    $("#" + view + "_" + subview + "_" + id + "_VW").text(itemCounterVW);
                                    if ($scope.debug) console.log($scope.arrayQueries);
                                } else {
                                    itemCounterMT = -1;
                                    itemCounterDW = -1;
                                    itemCounterVW = -1;
                                    $("#" + view + "_" + subview + "_" + id + "_MT").text("0");
                                    $("#" + view + "_" + subview + "_" + id + "_DW").text("0");
                                    $("#" + view + "_" + subview + "_" + id + "_VW").text("0");
                                }
                                $scope.arrayQueries.push({
                                    "item": view + "_" + subview + "_" + id + "_MT",
                                    "counter": itemCounterMT
                                });
                                $scope.arrayQueries.push({
                                    "item": view + "_" + subview + "_" + id + "_DW",
                                    "counter": itemCounterDW
                                });
                                $scope.arrayQueries.push({
                                    "item": view + "_" + subview + "_" + id + "_VW",
                                    "counter": itemCounterVW
                                });
                            },
                            error: function (errMsg) {
                                $scope.arrayQueries.push({
                                    "item": view + "_" + subview + "_" + id + "_MT",
                                    "counter": "-1"
                                });
                                $scope.arrayQueries.push({
                                    "item": view + "_" + subview + "_" + id + "_DW",
                                    "counter": "-1"
                                });
                                $scope.arrayQueries.push({
                                    "item": view + "_" + subview + "_" + id + "_VW",
                                    "counter": "-1"
                                });
                                $("#" + view + "_" + subview + "_" + id + "_MT").text("0");
                                $("#" + view + "_" + subview + "_" + id + "_DW").text("0");
                                $("#" + view + "_" + subview + "_" + id + "_VW").text("0");
                                if ($scope.debug) console.log(errMsg);
                            },
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            crossDomain: true
                        });
                    }
                }
                return "";
            }

            $scope.getStatsOverviewData = function (view, subview, country, object, value) {

                //initialize array that will contain the country csv stats of the overview page
                $scope.csv_overview = [];

                if ($scope.activeTab == "/overview") {
                    if (object != null) {
                      if (object.label != 'EUROSTAT') {
                        var countryLabel = object.label;
                      } else {
                          var countryLabel = 'EU-EUROTAT';
                      }
                    } else {
                        var countryLabel = "";
                    }
                    var currentCounter = $scope.isContains($scope.arrayQueries, view + "_" + subview + "_" + country + "_" + value);
                    if (currentCounter > -1) {
                        if ($scope.debug) console.log("CACHE from " + view + "_" + subview + "_" + country + "_" + value);
                        var itemCounterMT = currentCounter;
                        var itemCounterDW = $scope.isContains($scope.arrayQueries, view + "_" + subview + "_" + country + "_DW");
                        var itemCounterVW = $scope.isContains($scope.arrayQueries, view + "_" + subview + "_" + country + "_VW");
                        $("#" + view + "_" + country + "_MT").text(itemCounterMT);
                        $("#" + view + "_" + country + "_DW").text(itemCounterDW);
                        $("#" + view + "_" + country + "_VW").text(itemCounterVW);
                    } else {
                        var GN_rootURL = $scope.globalurl;
                        if (country == 'TOT') {

                            /* overview statistics (3 cards: metadata, downloadable, viewable) */

                            if (subview == 'priorityOverview') {
                               let n = countries.data.length;
                               if (countries.data[n-1].id === 'EUROSTAT') {
                                   $scope.dataCountry = countries.data.pop();
                               }

                                /*
                                Postman reference query id in the source code: legislation_overview_allcountries_stats
                                Postman reference query id in the source code: prioritydata_overview_allcountries_stats
                                Postman reference query id in the source code: data_themes_overview_allcountries_stats
                                */

                                var dataBody = {
                                    "size": 0,
                                    "sort": [{
                                        "resourceTitleObject.default.keyword": "asc"
                                    }, "_score"],
                                    "query": {
                                        "function_score": {
                                            "query": {
                                                "bool": {
                                                    "must": [{
                                                        "terms": {
                                                            "isTemplate": ["n"]
                                                        }
                                                    }, {
                                                        "query_string": {
                                                            "query": "(cl_hierarchyLevel.key:\"dataset\" OR cl_hierarchyLevel.key:\"series\")"
                                                        }
                                                    },

                                                    {
                                                        "query_string": {
                                                            "query": "synonymsLegislation:*"
                                                        }
                                                    },

                                                    {
                                                        "exists": {
                                                            "field": "groupOwner"
                                                        }
                                                    }]
                                                }
                                            }
                                        }
                                    },
                                    "aggregations": {
                                        "resources": {
                                            "terms": {
                                                "field": "docType"
                                            },
                                            "aggregations": {
                                                "availableInServices": {
                                                    "filters": {
                                                        "filters": {
                                                            "datasetOrSeries": {
                                                                "query_string": {
                                                                    "query": "(cl_hierarchyLevel.key:\"dataset\" OR cl_hierarchyLevel.key:\"series\")"
                                                                }
                                                            },
                                                            "availableInViewService": {
                                                                "query_string": {
                                                                    "query": "+indicator_INDICATOR_VIEW_LINK_TO_DATA:/PASS/"
                                                                }
                                                            },
                                                            "availableInDownloadService": {
                                                                "query_string": {
                                                                    "query": "+indicator_INDICATOR_DOWNLOAD_LINK_TO_DATA:/PASS/"
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "track_total_hits": true
                                }
                                if ($scope.selectedLegislation != "none") {
                                    legislationFilter = {
                                        "query_string": {
                                            "query": "synonymsLegislation:\"" + $scope.decodeItem($scope.selectedLegislation, 'legislations') + "\""
                                        }
                                    };
                                    dataBody.query.function_score.query.bool.must.push(legislationFilter);
                                }
                                if ($scope.selectedEnvDomain != "none") {
                                    envDomainFilter = {
                                        "query_string": {
                                            "query": "synonymsEnvironmentalDomain:\"" + $scope.selectedEnvDomain + "\""
                                        }
                                    };
                                    dataBody.query.function_score.query.bool.must.push(envDomainFilter);
                                }
                            }
                            //if country is TOT and not  a single coutnry check  if  the subview is the high value datatets subview
                            else if (subview == 'IACSOverview') {

                                if ($scope.dataCountry != '') {
                                    countries.data.push($scope.dataCountry);
                                    $scope.dataCountry = "";
                                }

                                var params = $location.search();
                                //if country is TOT check  what type the  high value dataset is?  in this case it is gsaa
                                if (params.iacs == 'gsaa') {

                                    var dataBody = {
                                        "size": 0,
                                        "sort": [{
                                            "resourceTitleObject.default.keyword": "asc"
                                        }, "_score"],
                                        "query": {
                                            "function_score": {
                                                "query": {
                                                    "bool": {
                                                        "must": [{
                                                            "terms": {
                                                                "isTemplate": ["n"]
                                                            }
                                                        }, {
                                                            "query_string": {
                                                                "query": "(cl_hierarchyLevel.key:\"dataset\" OR cl_hierarchyLevel.key:\"series\")"
                                                            }
                                                        }, {
                                                            "query_string": {
                                                                "query": "(tag.default:\"GSAA\" OR tag.key:\"*/IACSData/GSAA\")"
                                                            }
                                                        }]
                                                    }
                                                }
                                            }
                                        },
                                        "aggregations": {
                                            "resources": {
                                                "terms": {
                                                    "field": "docType"
                                                },
                                                "aggs": {
                                                    "availableInServices": {
                                                        "filters": {
                                                            "filters": {
                                                                "datasetOrSeries": {
                                                                    "query_string": {
                                                                        "query": "(cl_hierarchyLevel.key:\"dataset\" OR cl_hierarchyLevel.key:\"series\")"
                                                                    }
                                                                },
                                                                "availableInViewService": {
                                                                    "query_string": {
                                                                        "query": "+indicator_INDICATOR_VIEW_LINK_TO_DATA:/PASS/"
                                                                    }
                                                                },
                                                                "availableInDownloadService": {
                                                                    "query_string": {
                                                                        "query": "+indicator_INDICATOR_DOWNLOAD_LINK_TO_DATA:/PASS/"
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        "track_total_hits": true
                                    }

                                }
                                //if country is TOT check  what type the  high value dataset is ?  in this case it is lpis
                                else if (params.iacs == 'lpis') {
                                    {
                                        var dataBody = {
                                            "size": 0,
                                            "sort": [{
                                                "resourceTitleObject.default.keyword": "asc"
                                            }, "_score"],
                                            "query": {
                                                "function_score": {
                                                    "query": {
                                                        "bool": {
                                                            "must": [{
                                                                "terms": {
                                                                    "isTemplate": ["n"]
                                                                }
                                                            }, {
                                                                "query_string": {
                                                                    "query": "(cl_hierarchyLevel.key:\"dataset\" OR cl_hierarchyLevel.key:\"series\")"
                                                                }
                                                            }, {
                                                                "query_string": {
                                                                    "query": "(tag.default:\"LPIS\" OR tag.key:\"*/IACSData/LPIS\")"
                                                                }
                                                            }]
                                                        }
                                                    }
                                                }
                                            },
                                            "aggregations": {
                                                "resources": {
                                                    "terms": {
                                                        "field": "docType"
                                                    },
                                                    "aggs": {
                                                        "availableInServices": {
                                                            "filters": {
                                                                "filters": {
                                                                    "datasetOrSeries": {
                                                                        "query_string": {
                                                                            "query": "(cl_hierarchyLevel.key:\"dataset\" OR cl_hierarchyLevel.key:\"series\")"
                                                                        }
                                                                    },
                                                                    "availableInViewService": {
                                                                        "query_string": {
                                                                            "query": "+indicator_INDICATOR_VIEW_LINK_TO_DATA:/PASS/"
                                                                        }
                                                                    },
                                                                    "availableInDownloadService": {
                                                                        "query_string": {
                                                                            "query": "+indicator_INDICATOR_DOWNLOAD_LINK_TO_DATA:/PASS/"
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            },
                                            "track_total_hits": true
                                        }

                                    }
                                }

                            } else {

                            if ($scope.dataCountry != '') {
                               countries.data.push($scope.dataCountry);
                               $scope.dataCountry = "";
                            }
                                var dataBody = {
                                    "size": 0,
                                    "sort": [{
                                        "resourceTitleObject.default.keyword": "asc"
                                    }, "_score"],
                                    "query": {
                                        "function_score": {
                                            "query": {
                                                "bool": {
                                                    "must": [{
                                                        "terms": {
                                                            "isTemplate": ["n"]
                                                        }
                                                    }, /*{
                                                        "exists": {
                                                            "field": "th_httpinspireeceuropaeutheme-theme.default"
                                                        }
                                                    }, */ {
                                                        "exists": {
                                                            "field": "groupOwner"
                                                        }
                                                    }]
                                                }
                                            }
                                        }
                                    },
                                    "aggregations": {
                                        "resources": {
                                            "terms": {
                                                "field": "docType",
                                                "size": 1000
                                            },
                                            "aggs": {
                                                "availableInServices": {
                                                    "filters": {
                                                        "filters": {
                                                            "datasetOrSeries": {
                                                                "query_string": {
                                                                    "query": "(cl_hierarchyLevel.key:\"dataset\" OR cl_hierarchyLevel.key:\"series\")"
                                                                }
                                                            },
                                                            "availableInViewService": {
                                                                "query_string": {
                                                                    "query": "+indicator_INDICATOR_VIEW_LINK_TO_DATA:/PASS/"
                                                                }
                                                            },
                                                            "availableInDownloadService": {
                                                                "query_string": {
                                                                    "query": "+indicator_INDICATOR_DOWNLOAD_LINK_TO_DATA:/PASS/"
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "track_total_hits": true
                                }
                                if ($scope.selectedTheme != "none") {
                                    themeFilter = {
                                        "query_string": {
                                            "query": "(th_httpinspireeceuropaeutheme-theme.link:\"http://inspire.ec.europa.eu/theme/" + $scope.selectedTheme + "\")"
                                        }
                                    };

                                    dataBody.query.function_score.query.bool.must.push(themeFilter);
                                }
                            }
                        } else {

                            /*query overview for each country*/

                            if (subview == 'priorityOverview') {
                               let n = countries.data.length;
                               if (countries.data[n-1].id === 'EUROSTAT') {
                                   $scope.dataCountry = countries.data.pop();
                               }
                                /*
                                Postman reference query id in the source code: legislation_overview_country_stats
                                Postman reference query id in the source code: prioritydata_overview_country_stats
                                Postman reference query id in the source code: data_themes_overview_country_stats
                                */

                                var dataBody = {
                                    "size": 0,
                                    "sort": [{
                                        "resourceTitleObject.default.keyword": "asc"
                                    }, "_score"],
                                    "query": {
                                        "function_score": {
                                            "query": {
                                                "bool": {
                                                    "must": [{
                                                        "terms": {
                                                            "isTemplate": ["n"]
                                                        }
                                                    }, {
                                                        "query_string": {
                                                            "query": "(cl_hierarchyLevel.key:\"dataset\" OR cl_hierarchyLevel.key:\"series\")"
                                                        }
                                                    }
                                                        ,
                                                    {
                                                        "query_string": {
                                                            "query": "synonymsLegislation:*"
                                                        }
                                                    },
                                                    {
                                                        "query_string": {
                                                            "query": "groupOwnerName:\"" + countryLabel + "\""
                                                        }
                                                    }

                                                    ]
                                                }
                                            }
                                        }
                                    },
                                    "aggregations": {
                                        "resources": {
                                            "terms": {
                                                "field": "docType"
                                            },
                                            "aggregations": {
                                                "availableInServices": {
                                                    "filters": {
                                                        "filters": {
                                                            "datasetOrSeries": {
                                                                "query_string": {
                                                                    "query": "(cl_hierarchyLevel.key:\"dataset\" OR cl_hierarchyLevel.key:\"series\")"
                                                                }
                                                            },
                                                            "availableInViewService": {
                                                                "query_string": {
                                                                    "query": "+indicator_INDICATOR_VIEW_LINK_TO_DATA:/PASS/"
                                                                }
                                                            },
                                                            "availableInDownloadService": {
                                                                "query_string": {
                                                                    "query": "+indicator_INDICATOR_DOWNLOAD_LINK_TO_DATA:/PASS/"
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "track_total_hits": true
                                }
                                if ($scope.selectedLegislation != "none") {
                                    legislationFilter = {
                                        "query_string": {
                                            "query": "synonymsLegislation:\"" + $scope.decodeItem($scope.selectedLegislation, 'legislations') + "\""
                                        }
                                    };
                                    dataBody.query.function_score.query.bool.must.push(legislationFilter);
                                }
                                if ($scope.selectedEnvDomain != "none") {
                                    envDomainFilter = {
                                        "query_string": {
                                            "query": "synonymsEnvironmentalDomain:\"" + $scope.selectedEnvDomain + "\""
                                        }
                                    };
                                    dataBody.query.function_score.query.bool.must.push(envDomainFilter);
                                }
                            }

                            //if country is not TOT but a single coutnry check  if  the subview is the high value datatets subview
                            else if (subview == 'IACSOverview') {

                                 if ($scope.dataCountry != '') {
                                     countries.data.push($scope.dataCountry);
                                     $scope.dataCountry = "";
                                 }

                                var params = $location.search();
                                //if country is not TOT check  what type the  high value dataset is?  in this case it is gsaa
                                if (params.iacs == 'gsaa') {

                                    var dataBody = {
                                        "size": 0,
                                        "sort": [{
                                            "resourceTitleObject.default.keyword": "asc"
                                        }, "_score"],
                                        "query": {
                                            "function_score": {
                                                "query": {
                                                    "bool": {
                                                        "must": [{
                                                            "terms": {
                                                                "isTemplate": ["n"]
                                                            }
                                                        }, {
                                                            "query_string": {
                                                                "query": "(cl_hierarchyLevel.key:\"dataset\" OR cl_hierarchyLevel.key:\"series\")"
                                                            }
                                                        }, {
                                                            "query_string": {
                                                                "query": "(tag.default:\"GSAA\" OR tag.key:\"*/IACSData/GSAA\")"
                                                            }
                                                        }, {
                                                            "query_string": {
                                                                "query": "groupOwnerName:\"" + countryLabel + "\""
                                                            }
                                                        }]
                                                    }
                                                }
                                            }
                                        },
                                        "aggregations": {
                                            "resources": {
                                                "terms": {
                                                    "field": "docType"
                                                },
                                                "aggregations": {
                                                    "availableInServices": {
                                                        "filters": {
                                                            "filters": {
                                                                "datasetOrSeries": {
                                                                    "query_string": {
                                                                        "query": "(cl_hierarchyLevel.key:\"dataset\" OR cl_hierarchyLevel.key:\"series\")"
                                                                    }
                                                                },
                                                                "availableInViewService": {
                                                                    "query_string": {
                                                                        "query": "+indicator_INDICATOR_VIEW_LINK_TO_DATA:/PASS/"
                                                                    }
                                                                },
                                                                "availableInDownloadService": {
                                                                    "query_string": {
                                                                        "query": "+indicator_INDICATOR_DOWNLOAD_LINK_TO_DATA:/PASS/"
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        "track_total_hits": true
                                    }

                                }
                                //if country is not TOT check  what type the  high value dataset is?  in this case it is lpis
                                else if (params.iacs == 'lpis') {
                                    var dataBody = {
                                        "size": 0,
                                        "sort": [{
                                            "resourceTitleObject.default.keyword": "asc"
                                        }, "_score"],
                                        "query": {
                                            "function_score": {
                                                "query": {
                                                    "bool": {
                                                        "must": [{
                                                            "terms": {
                                                                "isTemplate": ["n"]
                                                            }
                                                        }, {
                                                            "query_string": {
                                                                "query": "(cl_hierarchyLevel.key:\"dataset\" OR cl_hierarchyLevel.key:\"series\")"
                                                            }
                                                        }, {
                                                            "query_string": {
                                                                "query": "(tag.default:\"LPIS\" OR tag.key:\"*/IACSData/LPIS\")"
                                                            }
                                                        }, {
                                                            "query_string": {
                                                                "query": "groupOwnerName:\"" + countryLabel + "\""
                                                            }
                                                        }]
                                                    }
                                                }
                                            }
                                        },
                                        "aggregations": {
                                            "resources": {
                                                "terms": {
                                                    "field": "docType"
                                                },
                                                "aggregations": {
                                                    "availableInServices": {
                                                        "filters": {
                                                            "filters": {
                                                                "datasetOrSeries": {
                                                                    "query_string": {
                                                                        "query": "(cl_hierarchyLevel.key:\"dataset\" OR cl_hierarchyLevel.key:\"series\")"
                                                                    }
                                                                },
                                                                "availableInViewService": {
                                                                    "query_string": {
                                                                        "query": "+indicator_INDICATOR_VIEW_LINK_TO_DATA:/PASS/"
                                                                    }
                                                                },
                                                                "availableInDownloadService": {
                                                                    "query_string": {
                                                                        "query": "+indicator_INDICATOR_DOWNLOAD_LINK_TO_DATA:/PASS/"
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        "track_total_hits": true
                                    }

                                }

                            } else {

                              if ($scope.dataCountry != '') {
                                  countries.data.push($scope.dataCountry);
                                  $scope.dataCountry = "";
                              }

                                var dataBody = {
                                    "size": 0,
                                    "sort": [{
                                        "resourceTitleObject.default.keyword": "asc"
                                    }, "_score"],
                                    "query": {
                                        "function_score": {
                                            "query": {
                                                "bool": {
                                                    "must": [{
                                                        "terms": {
                                                            "isTemplate": ["n"]
                                                        }
                                                    }, {
                                                        "query_string": {
                                                            "query": "(cl_hierarchyLevel.key:\"dataset\" OR cl_hierarchyLevel.key:\"series\")"
                                                        }
                                                    }, /*{
                                                        "query_string": {
                                                            "query": "(th_httpinspireeceuropaeutheme-theme.default:*)"
                                                        }
                                                    },*/ {
                                                        "query_string": {
                                                            "query": "groupOwnerName:\"" + countryLabel + "\""
                                                        }
                                                    }]
                                                }
                                            }
                                        }
                                    },
                                    "aggregations": {
                                        "resources": {
                                            "terms": {
                                                "field": "docType",
                                                "size": 1000
                                            },
                                            "aggs": {
                                                "availableInServices": {
                                                    "filters": {
                                                        "filters": {
                                                            "datasetOrSeries": {
                                                                "query_string": {
                                                                    "query": "(cl_hierarchyLevel.key:\"dataset\" OR cl_hierarchyLevel.key:\"series\")"
                                                                }
                                                            },
                                                            "availableInViewService": {
                                                                "query_string": {
                                                                    "query": "+indicator_INDICATOR_VIEW_LINK_TO_DATA:/PASS/"
                                                                }
                                                            },
                                                            "availableInDownloadService": {
                                                                "query_string": {
                                                                    "query": "+indicator_INDICATOR_DOWNLOAD_LINK_TO_DATA:/PASS/"
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "track_total_hits": true
                                }
                                if ($scope.selectedTheme != "none") {
                                    themeFilter = {
                                        "query_string": {
                                            "query": "(th_httpinspireeceuropaeutheme-theme.link:\"http://inspire.ec.europa.eu/theme/" + $scope.selectedTheme + "\")"
                                        }
                                    };
                                    dataBody.query.function_score.query.bool.must.push(themeFilter);
                                }
                            }
                        }
                        // National
                        if ($('#checkbox-national-overview').is(":checked")) {
                            nationalFilter = {
                                "query_string": {
                                    "query": "th_httpinspireeceuropaeumetadatacodelistSpatialScope-SpatialScope.link:*national*"
                                }
                            };
                            dataBody.query.function_score.query.bool.must.push(nationalFilter);
                        }
                        // Regional
                        if ($('#checkbox-regional-overview').is(":checked")) {
                            regionalFilter = {
                                "query_string": {
                                    "query": "th_httpinspireeceuropaeumetadatacodelistSpatialScope-SpatialScope.link:*regional*"
                                }
                            };
                            dataBody.query.function_score.query.bool.must.push(regionalFilter);
                        }
                        $.ajax({
                            type: "POST",
                            url: GN_rootURL + "srv/api/search/records/_search",
                            data: JSON.stringify(dataBody),
                            success: function (response) {
                                var obj = response.aggregations.resources.buckets;

                                //check to see that a country contains at least a statistics value
                                total_hits = JSON.stringify(response.hits.total.value);

                                if (obj.length > 0) {
                                    itemCounterMT = response.aggregations.resources.buckets[0].availableInServices.buckets.datasetOrSeries.doc_count;
                                    itemCounterDW = response.aggregations.resources.buckets[0].availableInServices.buckets.availableInDownloadService.doc_count;
                                    itemCounterVW = response.aggregations.resources.buckets[0].availableInServices.buckets.availableInViewService.doc_count;
                                    $("#" + view + "_" + country + "_MT").text(itemCounterMT);
                                    $("#" + view + "_" + country + "_DW").text(itemCounterDW);
                                    $("#" + view + "_" + country + "_VW").text(itemCounterVW);

                                    //if a country contains statistical value popluate the csv stats array
                                    if (total_hits > 0) {
                                        $scope.csv_overview.push({
                                            "Country": country.replace("TOT", "EU"),
                                            "Metadata records": itemCounterMT,
                                            "Downloadable Datasets": itemCounterDW,
                                            "Viewable Datasets": itemCounterVW
                                        });

                                    }

                                } else {
                                    itemCounterMT = -1;
                                    itemCounterDW = -1;
                                    itemCounterVW = -1;
                                    $("#" + view + "_" + country + "_MT").text("0");
                                    $("#" + view + "_" + country + "_DW").text("0");
                                    $("#" + view + "_" + country + "_VW").text("0");
                                }
                                $scope.arrayQueries.push({
                                    "item": view + "_" + subview + "_" + country + "_MT",
                                    "counter": itemCounterMT
                                });
                                $scope.arrayQueries.push({
                                    "item": view + "_" + subview + "_" + country + "_DW",
                                    "counter": itemCounterDW
                                });
                                $scope.arrayQueries.push({
                                    "item": view + "_" + subview + "_" + country + "_VW",
                                    "counter": itemCounterVW
                                });
                                if (itemCounterMT > 0) {
                                    var temp_data = $scope.countries_geojson.features;
                                    let country_geojson = temp_data.find(item => item.properties.countryCode === country.toUpperCase());
                                    if (country != "TOT") {
                                        $scope.arrayGeoJson_MT.features.push(country_geojson);
                                    }
                                }
                                if (itemCounterDW > 0) {
                                    var temp_data = $scope.countries_geojson.features;
                                    let country_geojson = temp_data.find(item => item.properties.countryCode === country.toUpperCase());
                                    if (country != "TOT") {
                                        $scope.arrayGeoJson_DW.features.push(country_geojson);
                                    }
                                }
                                if (itemCounterVW > 0) {
                                    var temp_data = $scope.countries_geojson.features;
                                    let country_geojson = temp_data.find(item => item.properties.countryCode === country.toUpperCase());
                                    if (country != "TOT") {
                                        $scope.arrayGeoJson_VW.features.push(country_geojson);
                                    }
                                }

                                $scope.$emit('countryOverviewMapSetupEvent');

                            },
                            error: function (errMsg) {
                                $scope.arrayQueries.push({
                                    "item": view + "_" + subview + "_" + country + "_MT",
                                    "counter": "-1"
                                });
                                $scope.arrayQueries.push({
                                    "item": view + "_" + subview + "_" + country + "_DW",
                                    "counter": "-1"
                                });
                                $scope.arrayQueries.push({
                                    "item": view + "_" + subview + "_" + country + "_VW",
                                    "counter": "-1"
                                });
                                $("#" + view + "_" + country + "_MT").text("0");
                                $("#" + view + "_" + country + "_DW").text("0");
                                $("#" + view + "_" + country + "_VW").text("0");
                                if ($scope.debug) console.log(errMsg);
                            },
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            crossDomain: true
                        });
                    }
                }

                return "";
            }

            $scope.getStatsResultsData = function (view, subview, countryId, countryName, value) {
                if (countryName == 'EUROSTAT') {
                       countryName = 'EU-EUROTAT';
                 }
                if ($scope.activeTab == "/results") {
                    var currentCounter = $scope.isContains($scope.arrayQueries, view + "_" + subview + "_" + countryId + "_" + value);
                    if (currentCounter > -1) {
                        if ($scope.debug) console.log("CACHE from " + view + "_" + subview + "_" + countryId + "_" + value);
                        var itemCounterMT = currentCounter;
                        var itemCounterDW = $scope.isContains($scope.arrayQueries, view + "_" + subview + "_" + countryId + "_DW");
                        var itemCounterVW = $scope.isContains($scope.arrayQueries, view + "_" + subview + "_" + countryId + "_VW");
                        $("#" + view + "_currentcountry_MT").text(itemCounterMT);
                        $("#" + view + "_currentcountry_DW").text(itemCounterDW);
                        $("#" + view + "_currentcountry_VW").text(itemCounterVW);
                    } else {
                        var GN_rootURL = $scope.globalurl;
                        if (countryId == 'TOT') {
                            if (subview == 'priorityOverview') {
                               let n = countries.data.length;
                               if (countries.data[n-1].id === 'EUROSTAT') {
                                   $scope.dataCountry = countries.data.pop();
                               }
                                var dataBody = {
                                    "size": 0,
                                    "sort": [{
                                        "resourceTitleObject.default.keyword": "asc"
                                    }, "_score"],
                                    "query": {
                                        "function_score": {
                                            "query": {
                                                "bool": {
                                                    "must": [{
                                                        "terms": {
                                                            "isTemplate": ["n"]
                                                        }
                                                    }, {
                                                        "query_string": {
                                                            "query": "(cl_hierarchyLevel.key:\"dataset\" OR cl_hierarchyLevel.key:\"series\")"
                                                        }
                                                    },

                                                    {
                                                        "query_string": {
                                                            "query": "synonymsLegislation:*"
                                                        }
                                                    },

                                                    {
                                                        "exists": {
                                                            "field": "groupOwner"
                                                        }
                                                    }]
                                                }
                                            }
                                        }
                                    },
                                    "aggregations": {
                                        "resources": {
                                            "terms": {
                                                "field": "docType"
                                            },
                                            "aggregations": {
                                                "availableInServices": {
                                                    "filters": {
                                                        "filters": {
                                                            "datasetOrSeries": {
                                                                "query_string": {
                                                                    "query": "(cl_hierarchyLevel.key:\"dataset\" OR cl_hierarchyLevel.key:\"series\")"
                                                                }
                                                            },
                                                            "availableInViewService": {
                                                                "query_string": {
                                                                    "query": "+indicator_INDICATOR_VIEW_LINK_TO_DATA:/PASS/"
                                                                }
                                                            },
                                                            "availableInDownloadService": {
                                                                "query_string": {
                                                                    "query": "+indicator_INDICATOR_DOWNLOAD_LINK_TO_DATA:/PASS/"
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "track_total_hits": true
                                }
                                if ($scope.selectedLegislation != "none") {
                                    legislationFilter = {
                                        "query_string": {
                                            "query": "synonymsLegislation:\"" + $scope.decodeItem($scope.selectedLegislation, 'legislations') + "\""
                                        }
                                    };
                                    dataBody.query.function_score.query.bool.must.push(legislationFilter);
                                }
                                if ($scope.selectedEnvDomain != "none") {
                                    envDomainFilter = {
                                        "query_string": {
                                            "query": "synonymsEnvironmentalDomain:\"" + $scope.selectedEnvDomain + "\""
                                        }
                                    };
                                    dataBody.query.function_score.query.bool.must.push(envDomainFilter);
                                }
                            } else {

                                if ($scope.dataCountry != '') {
                                    countries.data.push($scope.dataCountry);
                                    $scope.dataCountry = "";
                                }

                                var dataBody = {
                                    "size": 0,
                                    "sort": [{
                                        "resourceTitleObject.default.keyword": "asc"
                                    }, "_score"],
                                    "query": {
                                        "function_score": {
                                            "query": {
                                                "bool": {
                                                    "must": [{
                                                        "terms": {
                                                            "isTemplate": ["n"]
                                                        }
                                                    }, {
                                                        "exists": {
                                                            "field": "th_httpinspireeceuropaeutheme-theme.link"
                                                        }
                                                    }, {
                                                        "exists": {
                                                            "field": "groupOwner"
                                                        }
                                                    }]
                                                }
                                            }
                                        }
                                    },
                                    "aggregations": {
                                        "resources": {
                                            "terms": {
                                                "field": "docType",
                                                "size": 1000
                                            },
                                            "aggs": {
                                                "availableInServices": {
                                                    "filters": {
                                                        "filters": {
                                                            "datasetOrSeries": {
                                                                "query_string": {
                                                                    "query": "(cl_hierarchyLevel.key:\"dataset\" OR cl_hierarchyLevel.key:\"series\")"
                                                                }
                                                            },
                                                            "availableInViewService": {
                                                                "query_string": {
                                                                    "query": "+indicator_INDICATOR_VIEW_LINK_TO_DATA:/PASS/"
                                                                }
                                                            },
                                                            "availableInDownloadService": {
                                                                "query_string": {
                                                                    "query": "+indicator_INDICATOR_DOWNLOAD_LINK_TO_DATA:/PASS/"
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "track_total_hits": true
                                }
                                if ($scope.selectedTheme != "none") {
                                    var theme_uri = "http://inspire.ec.europa.eu/theme/" + $scope.selectedTheme;
                                    themeFilter = {
                                        "query_string": {
                                            "query": "(th_httpinspireeceuropaeutheme-theme.link:\"" + theme_uri + "\")"
                                        }
                                    };
                                    dataBody.query.function_score.query.bool.must.push(themeFilter);
                                }
                            }
                        } else {

                            /*statistics*/

                            if (subview == 'priorityOverview') {
                               let n = countries.data.length;
                               if (countries.data[n-1].id === 'EUROSTAT') {
                                   $scope.dataCountry = countries.data.pop();
                               }
                                /* Postman reference query id in the source code:  results_stats */

                                var dataBody = {
                                    "size": 0,
                                    "sort": [{
                                        "resourceTitleObject.default.keyword": "asc"
                                    }, "_score"],
                                    "query": {
                                        "function_score": {
                                            "query": {
                                                "bool": {
                                                    "must": [{
                                                        "terms": {
                                                            "isTemplate": ["n"]
                                                        }
                                                    },

                                                    {
                                                        "query_string": {
                                                            "query": "synonymsLegislation:*"
                                                        }
                                                    },

                                                    {
                                                        "query_string": {
                                                            "query": "(cl_hierarchyLevel.key:\"dataset\" OR cl_hierarchyLevel.key:\"series\")"
                                                        }
                                                    }

                                                        /*
                                                        , {
                                                            "query_string": {
                                                                "query": "groupOwnerName:\"" + countryName + "\""
                                                            }
                                                        }
                                                    */

                                                    ]
                                                }
                                            }
                                        }
                                    },
                                    "aggregations": {
                                        "resources": {
                                            "terms": {
                                                "field": "docType"
                                            },
                                            "aggregations": {
                                                "availableInServices": {
                                                    "filters": {
                                                        "filters": {
                                                            "datasetOrSeries": {
                                                                "query_string": {
                                                                    "query": "(cl_hierarchyLevel.key:\"dataset\" OR cl_hierarchyLevel.key:\"series\")"
                                                                }
                                                            },
                                                            "availableInViewService": {
                                                                "query_string": {
                                                                    "query": "+indicator_INDICATOR_VIEW_LINK_TO_DATA:/PASS/"
                                                                }
                                                            },
                                                            "availableInDownloadService": {
                                                                "query_string": {
                                                                    "query": "+indicator_INDICATOR_DOWNLOAD_LINK_TO_DATA:/PASS/"
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "track_total_hits": true
                                }
                                if ($scope.countryId != "eu") {
                                    countryfilter = {
                                        "query_string": {
                                            "query": "groupOwnerName:\"" + countryName + "\""
                                        }
                                    };
                                    dataBody.query.function_score.query.bool.must.push(countryfilter);
                                }


                                if ($scope.selectedLegislation != "none") {
                                    legislationFilter = {
                                        "query_string": {
                                            "query": "synonymsLegislation:\"" + $scope.decodeItem($scope.selectedLegislation, 'legislations') + "\""
                                        }
                                    };
                                    dataBody.query.function_score.query.bool.must.push(legislationFilter);
                                }
                                if ($scope.selectedEnvDomain != "none") {
                                    envDomainFilter = {
                                        "query_string": {
                                            "query": "synonymsEnvironmentalDomain:\"" + $scope.selectedEnvDomain + "\""
                                        }
                                    };
                                    dataBody.query.function_score.query.bool.must.push(envDomainFilter);
                                }


                            } else if (subview == 'IACSOverview') {

                               if ($scope.dataCountry != '') {
                                  countries.data.push($scope.dataCountry);
                                  $scope.dataCountry = "";
                               }

                                if ($scope.iacstype == 'gsaa') {

                                    /* Postman reference query id in the source code:  hvds_results_stats */

                                    var dataBody = {
                                        "size": 0,
                                        "sort": [{
                                            "resourceTitleObject.default.keyword": "asc"
                                        }, "_score"],
                                        "query": {
                                            "function_score": {
                                                "query": {
                                                    "bool": {
                                                        "must": [{
                                                            "terms": {
                                                                "isTemplate": ["n"]
                                                            }
                                                        }, {
                                                            "query_string": {
                                                                "query": "(cl_hierarchyLevel.key:\"dataset\" OR cl_hierarchyLevel.key:\"series\")"
                                                            }
                                                        }, {
                                                            "query_string": {
                                                                "query": "(tag.default:\"GSAA\" OR tag.key:\"*/IACSData/GSAA\")"
                                                            }
                                                        }

                                                            /*
                                                              , {
                                                                  "query_string": {
                                                                      "query": "groupOwnerName:\"" + countryName + "\""
                                                                  }
                                                              }
                                                          */

                                                        ]
                                                    }
                                                }
                                            }
                                        },
                                        "aggregations": {
                                            "resources": {
                                                "terms": {
                                                    "field": "docType"
                                                },
                                                "aggregations": {
                                                    "availableInServices": {
                                                        "filters": {
                                                            "filters": {
                                                                "datasetOrSeries": {
                                                                    "query_string": {
                                                                        "query": "(cl_hierarchyLevel.key:\"dataset\" OR cl_hierarchyLevel.key:\"series\")"
                                                                    }
                                                                },
                                                                "availableInViewService": {
                                                                    "query_string": {
                                                                        "query": "+indicator_INDICATOR_VIEW_LINK_TO_DATA:/PASS/"
                                                                    }
                                                                },
                                                                "availableInDownloadService": {
                                                                    "query_string": {
                                                                        "query": "+indicator_INDICATOR_DOWNLOAD_LINK_TO_DATA:/PASS/"
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        "track_total_hits": true
                                    }

                                    if ($scope.countryId != "eu") {
                                        countryfilter = {
                                            "query_string": {
                                                "query": "groupOwnerName:\"" + countryName + "\""
                                            }
                                        };
                                        dataBody.query.function_score.query.bool.must.push(countryfilter);
                                    }

                                } else if ($scope.iacstype == 'lpis') {
                                    var dataBody = {
                                        "size": 0,
                                        "sort": [{
                                            "resourceTitleObject.default.keyword": "asc"
                                        }, "_score"],
                                        "query": {
                                            "function_score": {
                                                "query": {
                                                    "bool": {
                                                        "must": [{
                                                            "terms": {
                                                                "isTemplate": ["n"]
                                                            }
                                                        }, {
                                                            "query_string": {
                                                                "query": "(cl_hierarchyLevel.key:\"dataset\" OR cl_hierarchyLevel.key:\"series\")"
                                                            }
                                                        }, {
                                                            "query_string": {
                                                                "query": "(tag.default:\"LPIS\" OR tag.key:\"*/IACSData/LPIS\")"
                                                            }
                                                        }

                                                            /*
                                                                 , {
                                                                     "query_string": {
                                                                         "query": "groupOwnerName:\"" + countryName + "\""
                                                                     }
                                                                 }
                                                             */

                                                        ]
                                                    }
                                                }
                                            }
                                        },
                                        "aggregations": {
                                            "resources": {
                                                "terms": {
                                                    "field": "docType"
                                                },
                                                "aggregations": {
                                                    "availableInServices": {
                                                        "filters": {
                                                            "filters": {
                                                                "datasetOrSeries": {
                                                                    "query_string": {
                                                                        "query": "(cl_hierarchyLevel.key:\"dataset\" OR cl_hierarchyLevel.key:\"series\")"
                                                                    }
                                                                },
                                                                "availableInViewService": {
                                                                    "query_string": {
                                                                        "query": "+indicator_INDICATOR_VIEW_LINK_TO_DATA:/PASS/"
                                                                    }
                                                                },
                                                                "availableInDownloadService": {
                                                                    "query_string": {
                                                                        "query": "+indicator_INDICATOR_DOWNLOAD_LINK_TO_DATA:/PASS/"
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        "track_total_hits": true
                                    }
                                }

                                if ($scope.countryId != "eu") {
                                    countryfilter = {
                                        "query_string": {
                                            "query": "groupOwnerName:\"" + countryName + "\""
                                        }
                                    };
                                    dataBody.query.function_score.query.bool.must.push(countryfilter);
                                }

                            } else {

                              if ($scope.dataCountry != '') {
                                 countries.data.push($scope.dataCountry);
                                 $scope.dataCountry = "";
                              }

                                var dataBody = {
                                    "size": 0,
                                    "sort": [{
                                        "resourceTitleObject.default.keyword": "asc"
                                    }, "_score"],
                                    "query": {
                                        "function_score": {
                                            "query": {
                                                "bool": {
                                                    "must": [{
                                                        "terms": {
                                                            "isTemplate": ["n"]
                                                        }
                                                    }, {
                                                        "query_string": {
                                                            "query": "(cl_hierarchyLevel.key:\"dataset\" OR cl_hierarchyLevel.key:\"series\")"
                                                        }
                                                    } /*, {
                                                        "query_string": {
                                                            "query": "(th_httpinspireeceuropaeutheme-theme.default:*)"
                                                        }
                                                    } */

                                                        /*
                                                         , {
                                                             "query_string": {
                                                                 "query": "groupOwnerName:\"" + countryName + "\""
                                                             }
                                                         }
                                                     */

                                                    ]
                                                }
                                            }
                                        }
                                    },
                                    "aggregations": {
                                        "resources": {
                                            "terms": {
                                                "field": "docType",
                                                "size": 1000
                                            },
                                            "aggs": {
                                                "availableInServices": {
                                                    "filters": {
                                                        "filters": {
                                                            "datasetOrSeries": {
                                                                "query_string": {
                                                                    "query": "(cl_hierarchyLevel.key:\"dataset\" OR cl_hierarchyLevel.key:\"series\")"
                                                                }
                                                            },
                                                            "availableInViewService": {
                                                                "query_string": {
                                                                    "query": "+indicator_INDICATOR_VIEW_LINK_TO_DATA:/PASS/"
                                                                }
                                                            },
                                                            "availableInDownloadService": {
                                                                "query_string": {
                                                                    "query": "+indicator_INDICATOR_DOWNLOAD_LINK_TO_DATA:/PASS/"
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "track_total_hits": true
                                }

                                if ($scope.countryId != "eu") {
                                    countryfilter = {
                                        "query_string": {
                                            "query": "groupOwnerName:\"" + countryName + "\""
                                        }
                                    };
                                    dataBody.query.function_score.query.bool.must.push(countryfilter);
                                }

                                if ($scope.selectedTheme != "none") {
                                    var theme_uri = "http://inspire.ec.europa.eu/theme/" + $scope.selectedTheme;
                                    themeFilter = {
                                        "query_string": {
                                            "query": "(th_httpinspireeceuropaeutheme-theme.link:\"" + theme_uri + "\")"
                                        }
                                    };
                                    dataBody.query.function_score.query.bool.must.push(themeFilter);
                                }
                            }
                        }
                        // Downloadable
                        if ($('#checkbox-dw').is(":checked")) {
                            downloadableFilter = {
                                "query_string": {
                                    "query": "indicator_INDICATOR_DOWNLOAD_LINK_TO_DATA:/PASS/"
                                }
                            };
                            dataBody.query.function_score.query.bool.must.push(downloadableFilter);
                        }
                        // Viewable
                        if ($('#checkbox-vw').is(":checked")) {
                            viewableFilter = {
                                "query_string": {
                                    "query": "indicator_INDICATOR_VIEW_LINK_TO_DATA:/PASS/"
                                }
                            };
                            dataBody.query.function_score.query.bool.must.push(viewableFilter);
                        }
                        // National
                        if ($('#checkbox-national').is(":checked")) {
                            nationalFilter = {
                                "query_string": {
                                    "query": "th_httpinspireeceuropaeumetadatacodelistSpatialScope-SpatialScope.link:*national*"
                                }
                            };
                            dataBody.query.function_score.query.bool.must.push(nationalFilter);
                        }
                        // Regional
                        if ($('#checkbox-regional').is(":checked")) {
                            regionalFilter = {
                                "query_string": {
                                    "query": "th_httpinspireeceuropaeumetadatacodelistSpatialScope-SpatialScope.link:*regional*"
                                }
                            };
                            dataBody.query.function_score.query.bool.must.push(regionalFilter);
                        }
                        // Other
                        if ($('#checkbox-other').is(":checked")) {
                            otherFilter = {
                                "query_string": {
                                    "query": "!th_httpinspireeceuropaeumetadatacodelistSpatialScope-SpatialScope.link:*national* AND !th_httpinspireeceuropaeumetadatacodelistSpatialScope-SpatialScope.link:*regional*"
                                }
                            };
                            dataBody.query.function_score.query.bool.must.push(otherFilter);
                        }
                        // Search text
                        var textToBeSearched = $('#searchText2').val();
                        if (textToBeSearched != null && textToBeSearched.trim() != "") {
                            searchFilter = {
                                "query_string": {
                                    "query": "(resourceTitleObject.default:*" + textToBeSearched + "*)"
                                }
                            };
                            dataBody.query.function_score.query.bool.must.push(searchFilter);
                        }
                        $.ajax({
                            type: "POST",
                            url: GN_rootURL + "srv/api/search/records/_search",
                            data: JSON.stringify(dataBody),
                            success: function (response) {
                                var obj = response.aggregations.resources.buckets;
                                if (obj.length > 0) {
                                    itemCounterMT = response.aggregations.resources.buckets[0].availableInServices.buckets.datasetOrSeries.doc_count;
                                    itemCounterDW = response.aggregations.resources.buckets[0].availableInServices.buckets.availableInDownloadService.doc_count;
                                    itemCounterVW = response.aggregations.resources.buckets[0].availableInServices.buckets.availableInViewService.doc_count;
                                    $("#" + view + "_currentcountry_MT").text(itemCounterMT);
                                    $("#" + view + "_currentcountry_DW").text(itemCounterDW);
                                    $("#" + view + "_currentcountry_VW").text(itemCounterVW);
                                    $scope.arraylist.currentPage = 1;
                                    $scope.arraylist.pageSize = Number(document.getElementById("select-items-page-results")?.value) || 20;
                                    $scope.arraylist.totalResults = itemCounterMT;
                                    $scope.updateResultsLimitCountry();
                                } else {
                                    itemCounterMT = -1;
                                    itemCounterDW = -1;
                                    itemCounterVW = -1;
                                    $("#" + view + "_currentcountry_MT").text("0");
                                    $("#" + view + "_currentcountry_DW").text("0");
                                    $("#" + view + "_currentcountry_VW").text("0");
                                    $scope.arraylist.totalResults = 0;
                                    $scope.updateResultsLimitCountry();
                                }

                                $scope.arrayQueries.push({
                                    "item": view + "_" + subview + "_" + countryId + "_MT",
                                    "counter": itemCounterMT
                                });
                                $scope.arrayQueries.push({
                                    "item": view + "_" + subview + "_" + countryId + "_DW",
                                    "counter": itemCounterDW
                                });
                                $scope.arrayQueries.push({
                                    "item": view + "_" + subview + "_" + countryId + "_VW",
                                    "counter": itemCounterVW
                                });
                            },
                            error: function (errMsg) {
                                $scope.arrayQueries.push({
                                    "item": view + "_" + subview + "_" + countryId + "_MT",
                                    "counter": "-1"
                                });
                                $scope.arrayQueries.push({
                                    "item": view + "_" + subview + "_" + countryId + "_DW",
                                    "counter": "-1"
                                });
                                $scope.arrayQueries.push({
                                    "item": view + "_" + subview + "_" + countryId + "_VW",
                                    "counter": "-1"
                                });
                                $("#" + view + "_currentcountry_MT").text("0");
                                $("#" + view + "_currentcountry_DW").text("0");
                                $("#" + view + "_currentcountry_VW").text("0");
                                $scope.arraylist.totalResults = 0;
                                $scope.updateResultsLimitCountry();
                                if ($scope.debug) console.log(errMsg);
                            },
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            crossDomain: true
                        });
                    }
                }
                return "";
            }

            $scope.getResultsDataSets = function (view, subview, countryId, countryName, forceReload) {
                if (countryName == 'EUROSTAT') {
                    countryName = 'EU-EUROTAT';
                }
                if ($scope.activeTab == "/results") {

                    $scope.updateResultsLimitCountry();

                    //forceReload = true;

                    var currentCounter = $scope.isContains($scope.arrayQueries, view + "_" + subview + "_" + countryId + "_list_" + ($scope.arraylist.currentPage - 1) + "_" + $scope.arraylist.pageSize);
                    if (forceReload == true) currentCounter = -1;
                    if (currentCounter > -1) {
                        if ($scope.debug) console.log("CACHE from " + view + "_" + subview + "_" + countryId + "_list_" + ($scope.arraylist.currentPage - 1) + "_" + $scope.arraylist.pageSize);
                        var currentData = $scope.getDataCached($scope.arrayQueries, view + "_" + subview + "_" + countryId + "_list_" + ($scope.arraylist.currentPage - 1) + "_" + $scope.arraylist.pageSize);
                        $scope.arraylist.data = currentData;
                        if ($scope.arraylist.currentPage > $scope.numberOfPagesResults()) $scope.arraylist.currentPage = $scope.numberOfPagesResults();
                    } else {
                        var GN_rootURL = $scope.globalurl;
                        if (subview == 'priorityOverview') {
                            let n = countries.data.length;
                            if (countries.data[n-1].id === 'EUROSTAT') {
                               $scope.dataCountry = countries.data.pop();
                            }

                            if ($scope.countryId == "eu") {
                                $scope.skore = "groupOwnerName"
                            }
                            else {
                                $scope.skore = "_score"
                            }

                            /* Postman reference query id in the source code:results_hits */

                            var dataBody = {
                                "from": $scope.arraylist.startResult - 1,
                                "size": $scope.arraylist.pageSize,
                                "sort": [$scope.skore],
                                "query": {
                                    "function_score": {
                                        "query": {
                                            "bool": {
                                                "must": [{
                                                    "terms": {
                                                        "isTemplate": ["n"]
                                                    }
                                                }, {
                                                    "query_string": {
                                                        "query": "(cl_hierarchyLevel.key:\"dataset\" OR cl_hierarchyLevel.key:\"series\")"
                                                    }
                                                },
                                                {
                                                    "query_string": {
                                                        "query": "synonymsLegislation:*"
                                                    }
                                                }


                                                ]
                                            }
                                        }
                                    }
                                },

                                "_source": {
                                    "includes": ["uuid", "id", "groupOwnerName", "logo", "resourceTitleObject", "isHarvested", "documentStandard", "indicator_*", "th_httpinspireeceuropaeumetadatacodelistSpatialScope*"]
                                },
                                "track_total_hits": true
                            }
                            if ($scope.countryId != "eu") {
                                countryfilter = {
                                    "query_string": {
                                        "query": "groupOwnerName:\"" + countryName + "\""
                                    }
                                };
                                dataBody.query.function_score.query.bool.must.push(countryfilter);
                            }


                            if ($scope.selectedLegislation != "none") {
                                legislationFilter = {
                                    "query_string": {
                                        "query": "synonymsLegislation:\"" + $scope.decodeItem($scope.selectedLegislation, 'legislations') + "\""
                                    }
                                };
                                dataBody.query.function_score.query.bool.must.push(legislationFilter);
                            }
                            if ($scope.selectedEnvDomain != "none") {
                                envDomainFilter = {
                                    "query_string": {
                                        "query": "synonymsEnvironmentalDomain:\"" + $scope.selectedEnvDomain + "\""
                                    }
                                };
                                dataBody.query.function_score.query.bool.must.push(envDomainFilter);
                            }

                            //console.log(JSON.stringify(dataBody))

                        } else if (subview == 'IACSOverview') {

                             if ($scope.dataCountry != '') {
                                 countries.data.push($scope.dataCountry);
                                 $scope.dataCountry = "";
                             }

                            if ($scope.iacstype == 'gsaa') {


                                if ($scope.countryId == "eu") {
                                    $scope.skore = "groupOwnerName"
                                }
                                else {
                                    $scope.skore = "_score"
                                }

                                /* Postman reference query id in the source code:  hvds_results_hits */

                                var dataBody = {
                                    "from": $scope.arraylist.startResult - 1,
                                    "size": $scope.arraylist.pageSize,
                                    "sort": [$scope.skore],
                                    "query": {
                                        "function_score": {
                                            "query": {
                                                "bool": {
                                                    "must": [{
                                                        "terms": {
                                                            "isTemplate": ["n"]
                                                        }
                                                    }, {
                                                        "query_string": {
                                                            "query": "(cl_hierarchyLevel.key:\"dataset\" OR cl_hierarchyLevel.key:\"series\")"
                                                        }
                                                    }, {
                                                        "query_string": {
                                                            "query": "(tag.default:\"GSAA\" OR tag.key:\"*/IACSData/GSAA\")"
                                                        }
                                                    }

                                                        /*
                                                       , {
                                                           "query_string": {
                                                               "query": "groupOwnerName:\"" + countryName + "\""
                                                           }
                                                       }
                                                   */

                                                    ]
                                                }
                                            }
                                        }
                                    },
                                    "_source": {
                                        "includes": ["uuid", "id", "groupOwnerName", "logo", "resourceTitleObject", "isHarvested", "documentStandard", "indicator_*", "th_httpinspireeceuropaeumetadatacodelistSpatialScope*"]
                                    },
                                    "track_total_hits": true
                                };

                                if ($scope.countryId != "eu") {
                                    countryfilter = {
                                        "query_string": {
                                            "query": "groupOwnerName:\"" + countryName + "\""
                                        }
                                    };
                                    dataBody.query.function_score.query.bool.must.push(countryfilter);
                                }

                            } else if ($scope.iacstype == 'lpis') {

                                if ($scope.countryId == "eu") {
                                    $scope.skore = "groupOwnerName"
                                }
                                else {
                                    $scope.skore = "_score"
                                }

                                var dataBody = {
                                    "from": $scope.arraylist.startResult - 1,
                                    "size": $scope.arraylist.pageSize,
                                    "sort": [$scope.skore],
                                    "query": {
                                        "function_score": {
                                            "query": {
                                                "bool": {
                                                    "must": [{
                                                        "terms": {
                                                            "isTemplate": ["n"]
                                                        }
                                                    }, {
                                                        "query_string": {
                                                            "query": "(cl_hierarchyLevel.key:\"dataset\" OR cl_hierarchyLevel.key:\"series\")"
                                                        }
                                                    }, {
                                                        "query_string": {
                                                            "query": "(tag.default:\"LPIS\" OR tag.key:\"*/IACSData/LPIS\")"
                                                        }
                                                    }

                                                        /*
                                                       , {
                                                           "query_string": {
                                                               "query": "groupOwnerName:\"" + countryName + "\""
                                                           }
                                                       }
                                                   */

                                                    ]
                                                }
                                            }
                                        }
                                    },
                                    "_source": {
                                        "includes": ["uuid", "id", "groupOwnerName", "logo", "resourceTitleObject", "isHarvested", "documentStandard", "indicator_*", "th_httpinspireeceuropaeumetadatacodelistSpatialScope*"]
                                    },
                                    "track_total_hits": true
                                };

                                if ($scope.countryId != "eu") {
                                    countryfilter = {
                                        "query_string": {
                                            "query": "groupOwnerName:\"" + countryName + "\""
                                        }
                                    };
                                    dataBody.query.function_score.query.bool.must.push(countryfilter);
                                }

                            }
                        } else {

                           if ($scope.dataCountry != '') {
                               countries.data.push($scope.dataCountry);
                                $scope.dataCountry = "";
                            }

                            if ($scope.countryId == "eu") {
                                $scope.skore = "groupOwnerName"
                            }
                            else {
                                $scope.skore = "_score"
                            }

                            var dataBody = {
                                "from": $scope.arraylist.startResult - 1,
                                "size": $scope.arraylist.pageSize,
                                "sort": [$scope.skore],
                                "query": {
                                    "function_score": {
                                        "query": {
                                            "bool": {
                                                "must": [{
                                                    "terms": {
                                                        "isTemplate": ["n"]
                                                    }
                                                }, {
                                                    "query_string": {
                                                        "query": "(cl_hierarchyLevel.key:\"dataset\" OR cl_hierarchyLevel.key:\"series\")"
                                                    }
                                                } /* , {
                                                    "query_string": {
                                                        "query": "(th_httpinspireeceuropaeutheme-theme.default:*)"
                                                    }
                                                } */

                                                    /*
                                                    , {
                                                        "query_string": {
                                                            "query": "groupOwnerName:\"" + countryName + "\""
                                                        }
                                                    }
                                                */

                                                ]
                                            }
                                        }
                                    }
                                },
                                "_source": {
                                    "includes": ["uuid", "id", "groupOwnerName", "logo", "resourceTitleObject", "isHarvested", "documentStandard", "indicator_*", "th_httpinspireeceuropaeumetadatacodelistSpatialScope*"]
                                },
                                "track_total_hits": true
                            }

                            if ($scope.countryId != "eu") {
                                countryfilter = {
                                    "query_string": {
                                        "query": "groupOwnerName:\"" + countryName + "\""
                                    }
                                };
                                dataBody.query.function_score.query.bool.must.push(countryfilter);
                            }



                            if ($scope.selectedTheme != "none") {
                                var theme_uri = "http://inspire.ec.europa.eu/theme/" + $scope.selectedTheme;
                                themeFilter = {
                                    "query_string": {
                                        "query": "(th_httpinspireeceuropaeutheme-theme.link:\"" + theme_uri + "\")"
                                    }
                                };
                                dataBody.query.function_score.query.bool.must.push(themeFilter);
                            }
                        }
                        // Downloadable
                        if ($('#checkbox-dw').is(":checked")) {
                            downloadableFilter = {
                                "query_string": {
                                    "query": "indicator_INDICATOR_DOWNLOAD_LINK_TO_DATA:/PASS/"
                                }
                            };
                            dataBody.query.function_score.query.bool.must.push(downloadableFilter);
                        }
                        // Viewable
                        if ($('#checkbox-vw').is(":checked")) {
                            viewableFilter = {
                                "query_string": {
                                    "query": "indicator_INDICATOR_VIEW_LINK_TO_DATA:/PASS/"
                                }
                            };
                            dataBody.query.function_score.query.bool.must.push(viewableFilter);
                        }
                        // National
                        if ($('#checkbox-national').is(":checked")) {
                            nationalFilter = {
                                "query_string": {
                                    "query": "th_httpinspireeceuropaeumetadatacodelistSpatialScope-SpatialScope.link:*national*"
                                }
                            };
                            dataBody.query.function_score.query.bool.must.push(nationalFilter);
                        }
                        // Regional
                        if ($('#checkbox-regional').is(":checked")) {
                            regionalFilter = {
                                "query_string": {
                                    "query": "th_httpinspireeceuropaeumetadatacodelistSpatialScope-SpatialScope.link:*regional*"
                                }
                            };
                            dataBody.query.function_score.query.bool.must.push(regionalFilter);
                        }
                        // Other
                        if ($('#checkbox-other').is(":checked")) {
                            otherFilter = {
                                "query_string": {
                                    "query": "!th_httpinspireeceuropaeumetadatacodelistSpatialScope-SpatialScope.link:*national* AND !th_httpinspireeceuropaeumetadatacodelistSpatialScope-SpatialScope.link:*regional*"
                                }
                            };
                            dataBody.query.function_score.query.bool.must.push(otherFilter);
                        }
                        // Search text
                        var textToBeSearched = $('#searchText2').val();
                        if (textToBeSearched != null && textToBeSearched.trim() != "") {
                            searchFilter = {
                                "query_string": {
                                    "query": "(resourceTitleObject.default:*" + textToBeSearched + "*)"
                                }
                            };
                            dataBody.query.function_score.query.bool.must.push(searchFilter);
                        }
                        $.ajax({
                            type: "POST",
                            url: GN_rootURL + "srv/api/search/records/_search",
                            data: JSON.stringify(dataBody),
                            success: function (response) {
                                $scope.arrayQueries.push({
                                    "item": view + "_" + subview + "_" + countryId + "_list_" + ($scope.arraylist.currentPage - 1) + "_" + $scope.arraylist.pageSize,
                                    "counter": "1",
                                    "data": response.hits.hits
                                });
                                $scope.$evalAsync(function () {
                                    $scope.arraylist.data = response.hits.hits;
                                    if ($scope.arraylist.currentPage > $scope.numberOfPagesResults()) $scope.arraylist.currentPage = $scope.numberOfPagesResults();
                                });
                            },
                            error: function (errMsg) {
                                if ($scope.debug) console.log(errMsg);
                            },
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            crossDomain: true
                        });
                    }
                }
                return "";
            }

            $scope.getResultsStats = function (view, subview, countryId, countryName, forceReload) {
                if ($scope.activeTab == "/results") {
                    $scope.updateResultsLimitCountry();
                    var currentCounter = $scope.isContains($scope.arrayQueries, view + "_" + subview + "_" + countryId + "_filterStats");
                    if (forceReload == true) currentCounter = -1;
                    if (currentCounter > -1) {
                        if ($scope.debug) console.log("CACHE from " + view + "_" + subview + "_" + countryId + "_filterStats");
                        var currentData = $scope.getDataCached($scope.arrayQueries, view + "_" + subview + "_" + countryId + "_filterStats");
                        $scope.arraylist.data_stats = currentData;
                    } else {
                        var GN_rootURL = $scope.globalurl;

                        /* Accordion Query*/

                        /*
                        Postman reference query id in the source code:  hvds_results_accordion
                        Postman reference query id in the source code:  results_accordion
                        */
                        var dataBody = {


                            "from": 0,
                            "size": 0,
                            "sort": [
                                "_score"
                            ],
                            "query": {
                                "function_score": {
                                    "query": {
                                        "bool": {
                                            "must": [{
                                                "terms": {
                                                    "isTemplate": [
                                                        "n"
                                                    ]
                                                }
                                            },
                                            {
                                                "query_string": {
                                                    "query": "(cl_hierarchyLevel.key:\"dataset\" OR cl_hierarchyLevel.key:\"series\")"
                                                }
                                            }
                                            ]
                                        }
                                    }
                                }
                            },
                            "aggregations": {
                                "hierarchyLevel": {
                                    "terms": {
                                        "field": "cl_hierarchyLevel.key"
                                    },
                                    "aggs": {
                                        "format": {
                                            "terms": {
                                                "field": "format"
                                            }
                                        }
                                    }
                                },
                                "availableInServices": {
                                    "filters": {
                                        "filters": {
                                            "availableInViewService": {
                                                "query_string": {
                                                    "query": "+indicator_INDICATOR_VIEW_LINK_TO_DATA:/PASS/"
                                                }
                                            },
                                            "availableInDownloadService": {
                                                "query_string": {
                                                    "query": "+indicator_INDICATOR_DOWNLOAD_LINK_TO_DATA:/PASS/"
                                                }
                                            }
                                        }
                                    }
                                },
                                "spatialScope": {
                                    "filters": {
                                        "filters": {
                                            "national": {
                                                "query_string": {
                                                    "query": "+th_httpinspireeceuropaeumetadatacodelistSpatialScope-SpatialScope.link:*national*"
                                                }
                                            },
                                            "regional": {
                                                "query_string": {
                                                    "query": "+th_httpinspireeceuropaeumetadatacodelistSpatialScope-SpatialScope.link:*regional*"
                                                }
                                            },
                                            "other": {
                                                "query_string": {
                                                    "query": "!(th_httpinspireeceuropaeumetadatacodelistSpatialScope-SpatialScope.link:*regional* OR *national*)"
                                                }
                                            }
                                        }
                                    }
                                },

                                "geospatial_domains": {
                                    "filters": {
                                        "filters": {
                                            "lpis": {
                                                "query_string": {
                                                    "query": "(tag.default:\"LPIS\" OR tag.key:\"*/IACSData/LPIS\")"
                                                }
                                            },

                                            "gsaa": {
                                                "query_string": {
                                                    "query": "(tag.default:\"GSAA\" OR tag.key:\"*/IACSData/GSAA\")"
                                                }
                                            }

                                        }
                                    }
                                },

                                "countries": {
                                    "terms": {
                                        "field": "groupOwnerName",
                                        "size": 100,
                                        "order": {
                                            "_key": "asc"
                                        }
                                    }
                                },
                                "themes": {
                                    "terms": {
                                        "field": "th_httpinspireeceuropaeutheme-theme.link",
                                        "size": 50,
                                        "order": {
                                            "_key": "asc"
                                        },
                                        "include": "[^^]+^?[^^]+"
                                    }
                                },
                                "priorityDataset": {
                                    "terms": {
                                        "field": "th_PriorityDataset.link",
                                        "size": 500,
                                        "order": {
                                            "_key": "asc"
                                        }
                                    }
                                },
                                "legislation": {
                                    "terms": {
                                        "field": "synonymsLegislation",
                                        "size": 500,
                                        "order": {
                                            "_key": "asc"
                                        }
                                    }
                                },
                                "envDomains": {
                                    "terms": {
                                        "field": "synonymsEnvironmentalDomain",
                                        "size": 500,
                                        "order": {
                                            "_key": "asc"
                                        }
                                    }
                                }
                            },
                            "track_total_hits": true
                        }
                        $.ajax({
                            type: "POST",
                            url: GN_rootURL + "srv/api/search/records/_search",
                            data: JSON.stringify(dataBody),
                            success: function (response) {
                                $scope.arrayQueries.push({
                                    "item": view + "_" + subview + "_" + countryId + "_filterStats",
                                    "counter": "1",
                                    "data": response.aggregations
                                });
                                $scope.$evalAsync(function () {
                                    $scope.arraylist.data_stats = response.aggregations;
                                    // Country
                                    var bucketsCountry = $scope.arraylist.data_stats.countries.buckets;
                                    angular.forEach(bucketsCountry, function (value, key) {
                                        var countryKey = value.key;
                                        var countryCount = value.doc_count;
                                        var countryRef = $scope.stringReplaceAll(countryKey, " ", "_");
                                        $("#results_badge_country_" + countryRef).text(countryCount);
                                        if (countryCount < 1) {
                                            $("#results_badge_country_" + countryRef).hide();
                                        } else {
                                            $("#results_badge_country_" + countryRef).show();
                                        }
                                        //if (countryKey != $scope.decodeItem(countryId,'countries')) $("#results_badge_country_" + countryRef).hide();
                                    });
                                    // Theme
                                    var bucketsTheme = $scope.arraylist.data_stats.themes.buckets;
                                    var themeToSearch = "http://inspire.ec.europa.eu/theme/";
                                    angular.forEach(bucketsTheme, function (value, key) {
                                        var themeKey = value.key;
                                        var themeCount = value.doc_count;
                                        if (themeKey.includes(themeToSearch)) {
                                            var themeId = themeKey.replace(themeToSearch, "");
                                            $("#results_badge_theme_" + themeId).text(themeCount);
                                            if (themeCount < 1) {
                                                $("#results_badge_theme_" + themeId).hide();
                                            } else {
                                                $("#results_badge_theme_" + themeId).show();
                                            }
                                        }
                                    });

                                    // gdomains
                                    var bucketsgdomains = $scope.arraylist.data_stats.geospatial_domains.buckets;

                                    angular.forEach(bucketsgdomains, function (value, key) {
                                        var bucketsgdomainsKey = key;
                                        var bucketsgdomainsCount = value.doc_count;
                                        $("#results_badge_gdomain_" + bucketsgdomainsKey).text(bucketsgdomainsCount);

                                        if (bucketsgdomainsCount < 1) {
                                            $("#results_badge_gdomain_" + bucketsgdomainsKey).hide();
                                        } else {
                                            $("#results_badge_gdomain_" + bucketsgdomainsKey).show();
                                        }

                                    });

                                    // Legislation
                                    var bucketsLegislation = $scope.arraylist.data_stats.legislation.buckets;
                                    angular.forEach(bucketsLegislation, function (value, key) {
                                        var legislationKey = value.key;
                                        var legislationCount = value.doc_count;
                                        var legislationId = $scope.decodeDescription(legislationKey, 'legislations');
                                        $("#results_badge_legislation_" + legislationId).text(legislationCount);
                                        if (legislationCount < 1) {
                                            $("#results_badge_legislation_" + legislationId).hide();
                                        } else {
                                            $("#results_badge_legislation_" + legislationId).show();
                                        }
                                    });
                                    // Legislation
                                    var bucketsEnvDomains = $scope.arraylist.data_stats.envDomains.buckets;
                                    angular.forEach(bucketsEnvDomains, function (value, key) {
                                        var envDomainsKey = value.key;
                                        var envDomainsCount = value.doc_count;
                                        if (envDomainsKey.includes("#") == false) {
                                            $("#results_badge_envdomain_" + envDomainsKey).text(envDomainsCount);
                                            if (envDomainsCount < 1) {
                                                $("#results_badge_envdomain_" + envDomainsKey).hide();
                                            } else {
                                                $("#results_badge_envdomain_" + envDomainsKey).show();
                                            }
                                        }
                                    });
                                });
                            },
                            error: function (errMsg) {
                                if ($scope.debug) console.log(errMsg);
                            },
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            crossDomain: true
                        });
                    }
                }
                return "";
            }

            $scope.getDataSetsDetails = function (view, subview, countryId, countryName, resourceId, forceReload) {
                //forceReload = true;
                //if ($scope.debug) { console.debug("getDataSetsDetails activeTab: <"+ $scope.activeTab+">"); }
                if (($scope.activeTab == "/datasetdetails") || ($scope.activeTab == "/extenddetails")) {

                    var currentCounter = $scope.isContains($scope.arrayQueries, view + "_" + subview + "_" + countryId + "_" + resourceId);
                    if (forceReload == true) currentCounter = -1;
                    if (currentCounter > -1) {
                        if ($scope.debug) console.log("CACHE from " + view + "_" + subview + "_" + countryId + "_" + resourceId);
                        var currentData = $scope.getDataCached($scope.arrayQueries, view + "_" + subview + "_" + countryId + "_" + resourceId);
                        $scope.arraylist.dataset_data = currentData;
                        if ($scope.debug) console.log($scope.arraylist.dataset_data);
                    } else {
                        var GN_rootURL = $scope.globalurl;
                        if (subview == 'priorityOverview') {
                            let n = countries.data.length;
                            if (countries.data[n-1].id === 'EUROSTAT') {
                               $scope.dataCountry = countries.data.pop();
                            }

                            /*
                            Postman reference query id in the source code:  dataset_details
                            Postman reference query id in the source code:  extended_details
                            */

                            var dataBody = {
                                "query": {
                                    "bool": {
                                        "must": [{
                                            "terms": {
                                                "isTemplate": ["n"]
                                            }
                                        }, {
                                            "multi_match": {
                                                "query": resourceId,
                                                "fields": ["id", "uuid"]
                                            }
                                        }]
                                    }
                                }
                            }
                        } else {

                           if ($scope.dataCountry != '') {
                               countries.data.push($scope.dataCountry);
                               $scope.dataCountry = "";
                           }
                            var dataBody = {
                                "query": {
                                    "bool": {
                                        "must": [{
                                            "terms": {
                                                "isTemplate": ["n"]
                                            }
                                        }, {
                                            "multi_match": {
                                                "query": resourceId,
                                                "fields": ["id", "uuid"]
                                            }
                                        }]
                                    }
                                }
                            }
                        }
                        $.ajax({
                            type: "POST",
                            url: GN_rootURL + "srv/api/search/records/_search",
                            data: JSON.stringify(dataBody),
                            success: function (response) {
                                $scope.arrayQueries.push({
                                    "item": view + "_" + subview + "_" + countryId + "_" + resourceId,
                                    "counter": "1",
                                    "data": response.hits.hits[0]
                                });
                                //$scope.$evalAsync(function() {

                                $scope.arraylist.dataset_data = response.hits.hits[0];

                                //});
                            },
                            error: function (errMsg) {
                                if ($scope.debug) console.log(errMsg);
                            },
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            crossDomain: true,
                            async: false
                        });
                    }
                }
                return "";

            }

            $scope.generateNumber = function (view, max) {
                var randomNumber = 0;
                if (view == "qsLegislation") randomNumber = max;
                if (view == "dataThemes") randomNumber = max * 2;
                return randomNumber;
            };

            $scope.displayList = function (listDataset) {
                var resultList = listDataset.join('<br/>');
                return resultList;
            }

            $scope.sortEnvDomains = function () {
                var envDomainsData = $scope.envDomains.data;
                envDomainsData.sort((a, b) => (a.dataSetNumber[0] > b.dataSetNumber[0]) ? 1 : ((b.dataSetNumber[0] > a.dataSetNumber[0]) ? -1 : 0));
                $scope.envDomains.data = envDomainsData;
            };

            $scope.envDomainsFilter = function (definitionFilter) {

                //filter uses a shallow copy
                var temp_envDomains = $scope.envDomains.data.filter(elem => elem.definition == definitionFilter);
                return temp_envDomains;

            };

            $scope.hvdsHomeDetailsButtonPressed = function (category) {
                document.getElementById("button" + category + "HighValue").textContent = "Show Less >";
                document.getElementById("card" + category + "").style.backgroundColor = "#004494";
                document.getElementById("title" + category + "").style.color = "#ffffff";
                document.getElementById("icon" + category + "").style.color = "#ffffff";
            };

            $scope.hvdsHomeDetailsButtonNotPressed = function (category) {
                document.getElementById("button" + category + "HighValue").textContent = "Show More >";
                document.getElementById("card" + category + "").style.backgroundColor = "#ffffff";
                document.getElementById("title" + category + "").style.color = "#3277B3";
                document.getElementById("icon" + category + "").style.color = "#004494";
            };

            $scope.makeHvdsTabHighValueVisible = function (tab) {

                if ($scope.hvdsTab == tab) {
                    $scope.hvdsTab = "";
                } else {
                    $scope.hvdsTab = tab;
                }
                if ($scope.hvdsTab == 'geospatial') {
                    $scope.hvdsHomeDetailsButtonPressed("Geospatial");
                } else {
                    $scope.hvdsHomeDetailsButtonNotPressed("Geospatial");
                }
                if ($scope.hvdsTab == 'environment') {
                    $scope.hvdsHomeDetailsButtonPressed("Environment");
                } else {
                    $scope.hvdsHomeDetailsButtonNotPressed("Environment");
                }
                if ($scope.hvdsTab == 'mobility') {
                    $scope.hvdsHomeDetailsButtonPressed("Mobility");
                } else {
                    $scope.hvdsHomeDetailsButtonNotPressed("Mobility");
                }
            }


            $scope.checkOtherHighValues_tab2 = function (item) {
                var data = $scope.otherHighValuesDatasets;
                var found = data.filter(x => x.id === item.id);
                var result = false;
                if (found.length > 0) {
                    $scope.indexOtherHighValues++;
                    result = true;
                }
                return result;
            }


            $scope.checkOtherHighValues_tab1 = function (item) {
                var data = $scope.referenceData;
                var found = data.filter(x => x.id === item.id);
                var result = false;
                if (found.length > 0) {
                    $scope.indexOtherHighValues++;
                    result = true;
                }
                return result;
            }


            $scope.checkOtherHighValues_tab3 = function (item) {
                var data = $scope.Mobility;
                var found = data.filter(x => x.id === item.id);
                var result = false;
                if (found.length > 0) {
                    $scope.indexOtherHighValues++;
                    result = true;
                }
                return result;
            }

            $scope.closeRecord = function () {
                gnMdView.removeLocationUuid();
            };
            $scope.nextPage = function () {
                $scope.$broadcast('nextPage');
            };
            $scope.previousPage = function () {
                $scope.$broadcast('previousPage');
            };

            /**
             * Toggle the list types on the homepage
             * @param  {String} type Type of list selected
             */
            $scope.toggleListType = function (type) {
                $scope.type = type;
            };

            $scope.infoTabs = {
                lastRecords: {
                    title: 'lastRecords',
                    titleInfo: '',
                    active: true
                },
                preferredRecords: {
                    title: 'preferredRecords',
                    titleInfo: '',
                    active: false
                }
            };

            $scope.$on('layerAddedFromContext', function (e, l) {
                var md = l.get('md');
                if (md) {
                    var linkGroup = md.getLinkGroup(l);
                    gnMap.feedLayerWithRelated(l, linkGroup);
                }
            });

            $scope.resultviewFns = {
                addMdLayerToMap: function (link, md) {
                    var config = {
                        uuid: md ? md.uuid : null,
                        type: link.protocol.indexOf('WMTS') > -1 ? 'wmts' : ((link.protocol == 'ESRI:REST') || (link.protocol.startsWith('ESRI REST')) ? 'esrirest' : 'wms'),
                        url: $filter('gnLocalized')(link.url) || link.url
                    };

                    var title = link.title;

                    var name;

                    if ($scope.addToMapLayerNameUrlParam !== '') {
                        var params = gnUrlUtils.parseKeyValue(
                            config.url.split('?')[1]);
                        name = params[$scope.addToMapLayerNameUrlParam];

                        if (angular.isUndefined(name)) {
                            name = link.name;
                        }
                    } else {
                        name = link.name;
                    }

                    if (angular.isObject(link.title)) {
                        title = $filter('gnLocalized')(link.title);
                    }
                    if (angular.isObject(name)) {
                        name = $filter('gnLocalized')(name);
                    }

                    if (name && name !== '') {
                        config.name = name;
                        config.group = link.group;
                        // Related service return a property title for the name
                    } else if (title) {
                        config.name = title;
                    }

                    // if an external viewer is defined, use it here
                    if (gnExternalViewer.isEnabled()) {
                        gnExternalViewer.viewService({
                            id: md ? md.id : null,
                            uuid: config.uuid
                        }, {
                            type: config.type,
                            url: config.url,
                            name: config.name,
                            title: title
                        });
                        return;
                    }

                    // This is probably only a service
                    // Open the add service layer tab
                    $location.path('map').search({
                        add: encodeURIComponent(angular.toJson([config]))
                    });
                    return;
                },
                addAllMdLayersToMap: function (layers, md) {
                    angular.forEach(layers, function (layer) {
                        $scope.resultviewFns.addMdLayerToMap(layer, md);
                    });
                },
                loadMap: function (map, md) {
                    gnOwsContextService.loadContextFromUrl(map.url, viewerMap);
                }
            };

            // Share map loading functions
            gnViewerSettings.resultviewFns = $scope.resultviewFns;


            // Manage route at start and on $location change
            // depending on configuration
            if (!$location.path()) {
                var m = gnGlobalSettings.gnCfg.mods;
                $location.path(
                    m.home.enabled ? '/home' :
                        m.search.enabled ? '/search' :
                            m.map.enabled ? '/map' : 'home'
                );
            }

            var setActiveTab = function () {
                $scope.$evalAsync(function () {
                    $scope.arrayQueries = [];
                });

                $scope.activeTab = $location.path().
                    match(/^(\/[a-zA-Z0-9]*)($|\/.*)/)[1];

                $scope.arraylist = {};
                $scope.arraylist.currentPage = 1;
                $scope.arraylist.pageSize = Number(document.getElementById("select-items-page-results")?.value || 20);
                $scope.arraylist.startResult = (($scope.arraylist.currentPage - 1) * $scope.arraylist.pageSize) + 1;
                $scope.arraylist.endResult = $scope.arraylist.startResult + $scope.arraylist.pageSize - 1;
                $scope.arraylist.data = [];

                $scope.arrayGeoJson_MT = {
                    "type": "FeatureCollection",
                    "features": []
                };
                $scope.arrayGeoJson_DW = {
                    "type": "FeatureCollection",
                    "features": []
                };
                $scope.arrayGeoJson_VW = {
                    "type": "FeatureCollection",
                    "features": []
                };

                var menuHome = document.getElementById('menu_Home');
                var menuPriority = document.getElementById('menu_Priority');
                var menuThematic = document.getElementById('menu_Thematic');
                var menuhvds = document.getElementById('menu_hvds');

                menuHome.classList.remove("ecl-menu__item--current");
                menuPriority.classList.remove("ecl-menu__item--current");
                menuThematic.classList.remove("ecl-menu__item--current");
                menuhvds.classList.remove("ecl-menu__item--current");

                $scope.overviewView = "-";
                var params = $location.search();
                if (params.hasOwnProperty('view')) {
                    $scope.overviewView = params.view;
                }
                if ($scope.activeTab == "/home") {
                    menuHome.classList.add("ecl-menu__item--current");
                }
                if ($scope.activeTab == "/pdvhome") {
                    menuPriority.classList.add("ecl-menu__item--current");
                }
                if ($scope.activeTab == "/qsEnvDomain") {
                    menuPriority.classList.add("ecl-menu__item--current");

                    var params = $location.search();
                    $scope.listview = false;

                    $scope.reloadtab = function () {
                        window.location.href = '../../srv/eng/catalog.search#/qsEnvDomain';
                        $scope.showEnvDomains = "List";
                    }

                    if (params.hasOwnProperty('showcodelists')) {
                        $scope.listview = true;
                        $scope.showEnvDomains = "List";
                    }

                }
                if ($scope.activeTab == "/qsLegislation") {
                    menuPriority.classList.add("ecl-menu__item--current");
                }
                if ($scope.activeTab == "/tvhome") {
                    menuThematic.classList.add("ecl-menu__item--current");
                }
                if ($scope.activeTab == "/datathemes") {
                    menuThematic.classList.add("ecl-menu__item--current");
                }

                if ($scope.activeTab == "/hvdshome") {
                    menuhvds.classList.add("ecl-menu__item--current");
                }

                if (($scope.activeTab == '/overview') || ($scope.activeTab == '/results') || ($scope.activeTab == '/datasetdetails')) {
                    var params = $location.search();

                    if (params.hasOwnProperty('basedomain') && params.basedomain == 1) {
                        $scope.basedomain = 1;
                    } else if (params.hasOwnProperty('basedomain') && params.basedomain == 0) {
                        $scope.basedomain = 0;
                    } else {
                        $scope.basedomain = 0;
                    }

                    if ($scope.overviewView == 'priorityOverview') {
                        menuPriority.classList.add("ecl-menu__item--current");
                    }
                    if ($scope.overviewView == 'thematicOverview') {
                        menuThematic.classList.add("ecl-menu__item--current");
                    }
                    //if ($scope.overviewView == 'IACSOverview') menuhvds.classList.add("ecl-menu__item--current")
                }


                if ($scope.activeTab == "/hvdshome") {

                    var params = $location.search();
                    var arr = [];
                    var obj;

                    $scope.selectedTab = "-";
                    if (params.hasOwnProperty('tab1')) {
                        //$scope.actTab1 = 'Geospatial';
                        setTimeout(function () {
                            $scope.hvdsTab = "";
                            $scope.makeHvdsTabHighValueVisible('geospatial');
                        }, 200);
                    } else if (params.hasOwnProperty('tab2')) {
                       //$scope.actTab1 = 'Earth Observation and Environment';
                        setTimeout(function () {
                            $scope.hvdsTab = "";
                            $scope.makeHvdsTabHighValueVisible('environment');
                        }, 200);
                    } else if (params.hasOwnProperty('tab3')) {
                        //$scope.actTab1 = 'Mobility';
                        setTimeout(function () {
                            $scope.hvdsTab = "";
                            $scope.makeHvdsTabHighValueVisible('mobility');
                        }, 200);
                    } else {
                        //$scope.actTab1 = 'Geospatial';
                        setTimeout(function () {
                            $scope.hvdsTab = "";
                            $scope.makeHvdsTabHighValueVisible('geospatial');
                        }, 200);
                    }

                }

                if ($scope.activeTab == "/results") {
                    var params = $location.search();
                    $scope.countryId = "-";
                    var arr = [];
                    var obj;
                    if (params.hasOwnProperty('country')) {
                        $scope.countryId = params.country;
                        arr = $scope.countries.data;
                        obj = arr.find(data => data.id === $scope.countryId);
                        $scope.countryName = obj.label;
                    }
                    $scope.overviewView = "-";
                    if (params.hasOwnProperty('view')) {
                        $scope.overviewView = params.view;
                    }
                    $scope.selectedTheme = "none";
                    if (params.hasOwnProperty('theme')) {
                        $scope.selectedTheme = params.theme;
                    }
                    $scope.selectedLegislation = "none";
                    if (params.hasOwnProperty('legislation')) {
                        $scope.selectedLegislation = params.legislation;
                    }
                    $scope.selectedEnvDomain = "none";
                    if (params.hasOwnProperty('envdomain')) {
                        $scope.selectedEnvDomain = params.envdomain;
                    }

                    $scope.iacstype = "none";
                    if (params.hasOwnProperty('iacs')) {
                        $scope.iacstype = params.iacs;
                    }

                    setTimeout(function () {
                        $scope.accordionClick('filter_options', "");
                        $scope.getStatsResultsData('overview', $scope.overviewView, $scope.countryId, $scope.countryName, 'MT');
                        $scope.getResultsDataSets('results', $scope.overviewView, $scope.countryId, $scope.countryName, false);
                        $scope.getResultsStats('results', $scope.overviewView, $scope.countryId, $scope.countryName, true);
                    }, 200);
                }

                if (($scope.activeTab == "/datasetdetails")) {
                    var params = $location.search();
                    $scope.countryId = "-";
                    var arr = [];
                    var obj;
                    if (params.hasOwnProperty('country')) {
                        $scope.countryId = params.country;
                        arr = $scope.countries.data;
                        obj = arr.find(data => data.id === $scope.countryId);
                        $scope.countryName = obj.label;
                    }
                    $scope.overviewView = "-";
                    if (params.hasOwnProperty('view')) {
                        $scope.overviewView = params.view;
                    }
                    $scope.resourceId = "-";
                    if (params.hasOwnProperty('resourceId')) {
                        $scope.resourceId = params.resourceId;
                        if ($scope.debug) console.log($scope.resourceId);
                    }

                    //function to copy  url to clipoard in view services accordion
                    $scope.copytoclip = function (idxc) {
                        copyText = document.getElementById("cclip_" + idxc);
                        copyText.select();
                        copyText.setSelectionRange(0, 99999);
                        navigator.clipboard.writeText(copyText.value);
                        alert("Copied the url: " + copyText.value);
                        // return false;
                    }

                    // function to close preview map in view services accordion
                    $scope.closemap = function () {

                        map2 = document.getElementById("map2");
                        map2.style.display = 'none';
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        //  $('body').scrollTop(0);
                        //return false;
                    }

                    //function to initalize and populate view service and donwload service arrays for the details  page

                    $scope.$evalAsync(function () {

                        setTimeout(function () {
                            $scope.getDataSetsDetails('datasetdetails', $scope.overviewView, $scope.countryId, $scope.countryName, $scope.resourceId, false);

                            setTimeout(function () {

                                //initalize downloadservicearray array
                                $scope.downloadservicearray = [];

                                // loop array and populate it
                                if ($scope.arraylist.dataset_data != null) {
                                    if ($scope.arraylist.dataset_data._source.indicator_INDICATOR_DOWNLOAD_SERVICE_LINKED_RESOURCES != null) {
                                        for (var i = 0; i < $scope.arraylist.dataset_data._source.indicator_INDICATOR_DOWNLOAD_SERVICE_LINKED_RESOURCES.length; i++) {

                                            $scope.downloadservicearray.push({

                                                "name_vs": $scope.arraylist.dataset_data._source.indicator_INDICATOR_DOWNLOAD_SERVICE_LINKED_RESOURCES[i].name,
                                                "link_vs_normal": ($scope.arraylist.dataset_data._source.indicator_INDICATOR_DOWNLOAD_SERVICE_LINKED_RESOURCES[i].link),

                                                "ServiceId_vs": $scope.arraylist.dataset_data._source.indicator_INDICATOR_DOWNLOAD_SERVICE_LINKED_RESOURCES[i].associatedServiceIds[0],
                                            });
                                        }
                                    }
                                }

                                //initalize viewservicemaparray array
                                $scope.viewservicemaparray = [];
                                // loop array and populate it

                                if ($scope.arraylist.dataset_data != null) {
                                    if ($scope.debug) { console.debug("dataset_data != null"); }

                                    if ($scope.arraylist.dataset_data._source.indicator_INDICATOR_VIEW_SERVICE_LINKED_RESOURCES != null) {
                                        //if ($scope.debug) { console.debug("dataset_data._source.indicator_INDICATOR_VIEW_SERVICE_LINKED_RESOURCES != null"); }
                                        for (var i = 0; i < $scope.arraylist.dataset_data._source.indicator_INDICATOR_VIEW_SERVICE_LINKED_RESOURCES.length; i++) {

                                            var viewservicemap_decode = decodeURIComponent(($scope.arraylist.dataset_data._source.indicator_INDICATOR_VIEW_SERVICE_LINKED_RESOURCES[i].link));
                                            var viewservicemap_decode_url = viewservicemap_decode.substring(0, viewservicemap_decode.indexOf('?'));
                                            //extract the query string  from the indicator_INDICATOR_VIEW_SERVICE_LAYERLINK url
                                            var viewservicemap_decode_params = viewservicemap_decode.substring(viewservicemap_decode.indexOf('?') + 1);

                                            $scope.viewservicemaparray.push({
                                                "coords_vs": $scope.arraylist.dataset_data._source.geom.coordinates,
                                                "name_vs": $scope.arraylist.dataset_data._source.indicator_INDICATOR_VIEW_SERVICE_LINKED_RESOURCES[i].name,
                                                "link_vs_normal": ($scope.arraylist.dataset_data._source.indicator_INDICATOR_VIEW_SERVICE_LINKED_RESOURCES[i].link),
                                                "mapvs": "mapvs" + [i],
                                                "link_vs": encodeURIComponent($scope.arraylist.dataset_data._source.indicator_INDICATOR_VIEW_SERVICE_LINKED_RESOURCES[i].link),
                                                "link_to_copy_toclipboard": decodeURIComponent(viewservicemap_decode_url) + '?' + decodeURIComponent(viewservicemap_decode_params),
                                                "ServiceId_vs": $scope.arraylist.dataset_data._source.indicator_INDICATOR_VIEW_SERVICE_LINKED_RESOURCES[i].associatedServiceIds[0],
                                            });
                                        }
                                        if ($scope.debug) { console.debug($scope.viewservicemaparray); }
                                    }
                                }
                                else {
                                    if ($scope.debug) { console.debug("dataset_data == null"); }
                                }

                                //function to  to preview  map layer in the details page - view service  accordion
                                $scope.klikermapen = function (linkx, ccord) {

                                    //close previous disclaimer popup
                                    $('#map2-wrapperdisclaimer').fadeOut('fast');
                                    $('#map2-wrapperdisclaimer .datasetdetails-mapdisclaimer-internal').fadeOut(100);

                                    var this_item = document.getElementById('map2');
                                    this_item.style.display = 'block';

                                    document.getElementById('map2').scrollIntoView({
                                        behavior: 'smooth'
                                    });

                                    var viewservicemap_decode = decodeURIComponent((linkx));
                                    //extract the hostname from the indicator_INDICATOR_VIEW_SERVICE_LAYERLINK url
                                    var viewservicemap_decode_url = viewservicemap_decode.substring(0, viewservicemap_decode.indexOf('?'));
                                    //extract the query string  from the indicator_INDICATOR_VIEW_SERVICE_LAYERLINK url
                                    var viewservicemap_decode_params = viewservicemap_decode.substring(viewservicemap_decode.indexOf('?') + 1);
                                    //parse  the query string as JSON params to be used in the map
                                    var viewservicemap_decode_params_json = Object.fromEntries(new URLSearchParams(viewservicemap_decode_params));

                                    const mapBoundingBoxTempx = document.getElementById('mapvs');
                                    mapBoundingBoxTempx.innerHTML = "";

                                    var xyz1 = new ol.source.XYZ({
                                        url: 'https://gisco-services.ec.europa.eu/maps/tiles/OSMCartoComposite/EPSG3857/{z}/{x}/{y}.png'
                                    });

                                    var layer = new ol.layer.Tile({
                                        source: xyz1
                                    });
                                    var defaultLayer = new ol.layer.Tile({
                                        source: new ol.source.OSM()
                                    })
                                    var defaultView = new ol.View({
                                        center: [1173135.3221714993, 6141768.174777132],
                                        zoom: 4.286541245308266
                                    })

                                    const format = new ol.format.GeoJSON();
                                    var geoJsonBBox = {
                                        "type": "FeatureCollection",
                                        "features": [{
                                            "type": "Feature",
                                            "properties": {
                                                "countryCode": "BBOX"
                                            },
                                            "geometry": {
                                                "type": "Polygon",
                                                "coordinates": [
                                                    []
                                                ]
                                            }
                                        }]
                                    }

                                    var coordsBBox = ccord;
                                    geoJsonBBox.features[0].geometry.coordinates = coordsBBox;
                                    const features = format.readFeatures(geoJsonBBox, {
                                        featureProjection: "EPSG:3857"
                                    });


                                    var sourceLayer = new ol.source.Vector({
                                        features: features
                                    });
                                    var vectorLayer = new ol.layer.Vector({
                                        source: sourceLayer
                                    });

                                    statslayer = new ol.layer.Tile({
                                        source: new ol.source.TileWMS({
                                            url: viewservicemap_decode_url,
                                            params: viewservicemap_decode_params_json
                                        })
                                    });

                                    var controlsLayer = new ol.control.defaults({
                                        attribution: true,
                                        zoom: true,
                                        rotate: false
                                    });
                                    // Add layer to the map
                                    var map_vs = new ol.Map({
                                        layers: [defaultLayer, layer],
                                        target: 'mapvs',
                                        view: defaultView,
                                        controls: controlsLayer
                                    });

                                    map_vs.addLayer(statslayer);
                                    map_vs.addLayer(vectorLayer);
                                    // Zoom to bounding box
                                    var extent = sourceLayer.getExtent();
                                    map_vs.getView().fit(extent, map_vs.getSize());

                                    map_vs.updateSize();

                                    var disclaimer4 = '' +
                                        '<div class="disclaimer">Credits: © <a rel="external" href="https://openstreetmap.org/copyright" class="ecl-link ecl-link--default ecl-u-type-color-blue-100">OpenStreetMap</a> contributors | <a rel="external" href="https://ec.europa.eu/eurostat/web/gisco/overview" class="ecl-link ecl-link--default ecl-u-type-color-blue-100">EC-GISCO</a>,<br/>' +
                                        '© EuroGeographics for the administrative boundaries | <span   class="disclaimerbutton" >Disclaimer</span></div>' +
                                        '';

                                    var attr_map2_datasetdetails = document.querySelector("#map2 .ol-attribution");  //find attribution inside map2
                                    attr_map2_datasetdetails.innerHTML = (disclaimer4);

                                    $('#map2 .ol-attribution').addClass('attribution-override');

                                    $('#map2 .disclaimerbutton').on('mouseover', function () {
                                        $(this).css('cursor', 'pointer');
                                        $('#map2-wrapperdisclaimer').fadeIn('fast');
                                        $('#map2-wrapperdisclaimer .datasetdetails-mapdisclaimer-internal').fadeIn('fast');
                                        return false;
                                    });

                                    $('#map2-closemap').on('click', function () {
                                        $('#map2-wrapperdisclaimer').fadeOut('fast');
                                        $('#map2-wrapperdisclaimer .datasetdetails-mapdisclaimer-internal').fadeOut(100);
                                        return false;
                                    });

                                }

                            }, 200);


                            setTimeout(function () {

                                const mapBoundingBoxTemp = document.getElementById('mapBoundingBox');
                                mapBoundingBoxTemp.innerHTML = "";
                                var xyz1 = new ol.source.XYZ({
                                    url: 'https://gisco-services.ec.europa.eu/maps/tiles/OSMCartoComposite/EPSG3857/{z}/{x}/{y}.png'
                                });

                                var layer = new ol.layer.Tile({
                                    source: xyz1
                                });
                                var defaultLayer = new ol.layer.Tile({
                                    source: new ol.source.OSM()
                                })
                                var defaultView = new ol.View({
                                    center: [1173135.3221714993, 6141768.174777132],
                                    zoom: 4.286541245308266
                                })

                                const format = new ol.format.GeoJSON();
                                var geoJsonBBox = {
                                    "type": "FeatureCollection",
                                    "features": [{
                                        "type": "Feature",
                                        "properties": {
                                            "countryCode": "BBOX"
                                        },
                                        "geometry": {
                                            "type": "Polygon",
                                            "coordinates": [
                                                []
                                            ]
                                        }
                                    }]
                                }
                                var coordsBBox = $scope.arraylist.dataset_data._source.geom.coordinates;
                                geoJsonBBox.features[0].geometry.coordinates = coordsBBox;
                                const features = format.readFeatures(geoJsonBBox, {
                                    featureProjection: "EPSG:3857"
                                });

                                /*
                                var vectorLayer = new ol.layer.Vector({
                                  source: new ol.source.Vector({ url: '../../catalog/views/inspireportal/customs/eu_countries.geojson', format: new ol.format.GeoJSON() })
                                });

                                */
                                var sourceLayer = new ol.source.Vector({
                                    features: features
                                });
                                var vectorLayer = new ol.layer.Vector({
                                    source: sourceLayer
                                });
                                var controlsLayer = new ol.control.defaults({
                                    attribution: true,
                                    zoom: false,
                                    rotate: false
                                });
                                // Add layer to the map
                                var mapBoundingBox = new ol.Map({
                                    layers: [defaultLayer, layer],
                                    target: 'mapBoundingBox',
                                    view: defaultView,
                                    controls: controlsLayer
                                });
                                mapBoundingBox.addLayer(vectorLayer);
                                // Zoom to bounding box
                                var extent = sourceLayer.getExtent();

                                //adding padding (px) to the selection rectangle
                                mapBoundingBox.getView().fit(extent,
                                    {
                                        size: map.getSize,
                                        /* top, right, bottom, left */
                                        padding: [15, 15, 40, 15]
                                    }
                                );

                                var disclaimer3 = '' +
                                    '<div class="disclaimer">Credits: © <a rel="external" href="https://openstreetmap.org/copyright" class="ecl-link ecl-link--default ecl-u-type-color-blue-100">OpenStreetMap</a> contributors ' +
                                    '| <a rel="external" href="https://ec.europa.eu/eurostat/web/gisco/overview" class="ecl-link ecl-link--default ecl-u-type-color-blue-100">EC-GISCO</a>,<br/>' +
                                    '© EuroGeographics for the administrative boundaries | <span   class="disclaimerbutton" >Disclaimer</span></div>' +
                                    '';

                                var attr_map_datasetdetails = document.getElementsByClassName("ol-attribution");  // Find the elements

                                for (var i = 0; i < attr_map_datasetdetails.length; i++) {
                                    attr_map_datasetdetails[i].innerHTML = (disclaimer3);    // Change the content
                                }

                                $('.ol-attribution').addClass('attribution-override');

                                $('.disclaimerbutton').on('mouseover', function () {
                                    $(this).css('cursor', 'pointer');
                                    $('.datasetdetails-mapdisclaimer').fadeIn('fast');
                                    return false;
                                });

                                $('.datasetdetails-mapdisclaimer-internal').on('mouseleave', function () {
                                    $('.datasetdetails-mapdisclaimer-internal').fadeOut('fast');
                                    return false;
                                });

                            }, 400);
                        });

                    }, 200);

                }


                if ($scope.activeTab == "/extenddetails") {
                    var params = $location.search();
                    $scope.countryId = "-";
                    var arr = [];
                    var obj;
                    if (params.hasOwnProperty('country')) {
                        $scope.countryId = params.country;
                        arr = $scope.countries.data;
                        obj = arr.find(data => data.id === $scope.countryId);
                        $scope.countryName = obj.label;
                    }
                    $scope.overviewView = "-";
                    if (params.hasOwnProperty('view')) {
                        $scope.overviewView = params.view;
                    }
                    $scope.resourceId = "-";
                    if (params.hasOwnProperty('resourceId')) {
                        $scope.resourceId = params.resourceId;
                        if ($scope.debug) console.log($scope.resourceId);
                    }

                    $scope.showmap = "";
                    if (params.hasOwnProperty('showmap')) {
                        $scope.showmap = true;
                    }

                    if (params.hasOwnProperty('viewservicemap')) {

                        //decode the indicator_INDICATOR_VIEW_SERVICE_LAYERLINK url
                        $scope.viewservicemap_decode = decodeURIComponent((params.viewservicemap));
                        //extract the hostname from the indicator_INDICATOR_VIEW_SERVICE_LAYERLINK url
                        $scope.viewservicemap_decode_url = $scope.viewservicemap_decode.substring(0, $scope.viewservicemap_decode.indexOf('?'));
                        //extract the query string  from the indicator_INDICATOR_VIEW_SERVICE_LAYERLINK url
                        $scope.viewservicemap_decode_params = $scope.viewservicemap_decode.substring($scope.viewservicemap_decode.indexOf('?') + 1);
                        //parse  the query string as JSON params to be used in the map
                        $scope.viewservicemap_decode_params_json = Object.fromEntries(new URLSearchParams($scope.viewservicemap_decode_params));

                    }


                    setTimeout(function () {
                        $scope.getDataSetsDetails('extenddetails', $scope.overviewView, $scope.countryId, $scope.countryName, $scope.resourceId, false);

                        setTimeout(function () {
                            const mapBoundingBoxTemp2 = document.getElementById('mapvs');
                            mapBoundingBoxTemp2.innerHTML = "";
                            var xyz1 = new ol.source.XYZ({
                                url: 'https://gisco-services.ec.europa.eu/maps/tiles/OSMCartoComposite/EPSG3857/{z}/{x}/{y}.png'
                            });

                            var layer = new ol.layer.Tile({
                                source: xyz1
                            });
                            var defaultLayer = new ol.layer.Tile({
                                source: new ol.source.OSM()
                            })
                            var defaultView = new ol.View({
                                center: [1173135.3221714993, 6141768.174777132],
                                zoom: 4.286541245308266
                            })

                            const format = new ol.format.GeoJSON();
                            var geoJsonBBox = {
                                "type": "FeatureCollection",
                                "features": [{
                                    "type": "Feature",
                                    "properties": {
                                        "countryCode": "BBOX"
                                    },
                                    "geometry": {
                                        "type": "Polygon",
                                        "coordinates": [
                                            []
                                        ]
                                    }
                                }]
                            }
                            var coordsBBox = $scope.arraylist.dataset_data._source.geom.coordinates;
                            geoJsonBBox.features[0].geometry.coordinates = coordsBBox;
                            const features = format.readFeatures(geoJsonBBox, {
                                featureProjection: "EPSG:3857"
                            });


                            var sourceLayer = new ol.source.Vector({
                                features: features
                            });
                            var vectorLayer = new ol.layer.Vector({
                                source: sourceLayer
                            });

                            statslayer = new ol.layer.Tile({
                                source: new ol.source.TileWMS({
                                    url: $scope.viewservicemap_decode_url,
                                    params: $scope.viewservicemap_decode_params_json
                                })
                            });

                            var controlsLayer = new ol.control.defaults({
                                attribution: true,
                                zoom: true,
                                rotate: false
                            });
                            // Add layer to the map
                            var mapvs = new ol.Map({
                                layers: [defaultLayer, layer],
                                target: 'mapvs',
                                view: defaultView,
                                controls: controlsLayer
                            });

                            mapvs.addLayer(statslayer);
                            mapvs.addLayer(vectorLayer);
                            // Zoom to bounding box
                            var extent = sourceLayer.getExtent();
                            mapvs.getView().fit(extent, mapvs.getSize());


                        }, 400);
                    }, 200);
                }


                if ($scope.activeTab == "/overview") {

                    var params = $location.search();
                    $scope.overviewView = "-";
                    if (params.hasOwnProperty('view')) {
                        $scope.overviewView = params.view;
                    }
                    $scope.selectedTheme = "none";
                    if (params.hasOwnProperty('theme')) {
                        $scope.selectedTheme = params.theme;
                    }
                    $scope.selectedLegislation = "none";
                    if (params.hasOwnProperty('legislation')) {
                        $scope.selectedLegislation = params.legislation;
                    }
                    $scope.selectedEnvDomain = "none";
                    if (params.hasOwnProperty('envdomain')) {
                        $scope.selectedEnvDomain = params.envdomain;
                    }

                    //function that generates the statistics csv file of the overview page
                    $scope.exportcsv = function () {
                        //dynamic sort function
                        function dynamicSort(property) {
                            var sortOrder = 1;
                            if (property[0] === "-") {
                                sortOrder = -1;
                                property = property.substr(1);
                            }
                            return function (a, b) {

                                var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                                return result * sortOrder;
                            }
                        }
                        // sorty csv stats by MT (metadata)
                        $scope.csv_overview.sort(dynamicSort("Metadata records"));

                        const keys = Object.keys($scope.csv_overview[0]);
                        const commaSeparatedString = [keys.join(","), $scope.csv_overview.map(row => keys.map(key => row[key]).join(",")).join("\n")].join("\n")
                        const csvBlob = new Blob([commaSeparatedString])

                        //console.log(csvBlob);

                        setTimeout(function () {
                            const a2 = document.getElementById("a2")
                            //generate csv stats link and click on it
                            var link = document.createElement("a");

                            if (link.download !== undefined) { // feature detection
                                // Browsers that support HTML5 download attribute
                                var url = URL.createObjectURL(csvBlob);
                                link.setAttribute("href", url);
                                link.setAttribute("download", "INSPIRE Datasets - EU & EFTA Country overview.csv");
                                link.style.visibility = 'hidden';
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                            }
                        });
                    }

                    $scope.iacstype = "none";
                    if (params.hasOwnProperty('iacs')) {
                        $scope.iacstype = params.iacs;
                    }

                    $scope.overviewMapType = "Metadata";

                    setTimeout(function () { $scope.updateOverviewPageMap(); }, 100);
                }

                if ($scope.watermark) {
                    $("#templatesContainer").css("background-image", "url('../../catalog/views/inspireportal/images/backgrounds/watermark.png')");
                    $("#templatesContainer").css("background-color", "#ffffff");
                } else {
                    $("#templatesContainer").css("background-image", "none");
                    $("#templatesContainer").css("background-color", "#ffffff");
                }

                document.getElementById("mainMenu").classList.add("ecl-menu--forced-close");
                setTimeout(function () {
                    /*
                    $('html').animate({
                        scrollTop: 0
                    }, 'slow'); //IE, FF
                    $('body').animate({
                        scrollTop: 0
                    }, 'slow'); //chrome, don't know if Safari works
                    */
                    document.getElementById("mainMenu").classList.remove("ecl-menu--forced-close");
                }, 300);
                $scope.loadData();
            };

            $scope.updateOverviewPage = function () {
                $scope.$evalAsync(function () {
                    $scope.arrayQueries = [];
                });
                $scope.overviewMapType = "Metadata";
                $scope.arrayGeoJson_MT = {
                    "type": "FeatureCollection",
                    "features": []
                };
                $scope.arrayGeoJson_DW = {
                    "type": "FeatureCollection",
                    "features": []
                };
                $scope.arrayGeoJson_VW = {
                    "type": "FeatureCollection",
                    "features": []
                };

                setTimeout(function () {
                    $scope.updateOverviewPageMap();
                }, 100);
            };


            $scope.updateOverviewPageMap = function () {

                $scope.getStatsOverviewData('overview', $scope.overviewView, 'TOT', null, 'MT');
                var countryIdList = $scope.countries.data;

                $scope.countercountries = 0;
                angular.forEach(countryIdList, function (value, key) {
                    if (value.valid == "yes") {
                        $scope.getStatsOverviewData('overview', $scope.overviewView, value.id, value, 'MT');
                    }
                });

            };

            /**
             * This method is for the Thematic Country Overview.
             * It modifies the main map by:
             * 1 - adding a message "Hover over a country" in the top right of the map
             * 2 - modifying the standard disclaimer and putting a more explicit one with all the details
             */
            $scope.changeOverviewMapDisclaimer = function () {

                var ol_rotate = document.getElementsByClassName("ol-rotate");  // Find the elements
                for (var i = 0; i < ol_rotate.length; i++) {
                    ol_rotate[i].innerText = "Hover over a country";    // Change the content
                }

                var diclaimer2 = '' +
                    'Credits: © <a rel="external" href="https://openstreetmap.org/copyright" class="ecl-link ecl-link--default ecl-u-type-color-blue-100">OpenStreetMap</a> contributors | <a rel="external" href="https://ec.europa.eu/eurostat/web/gisco/overview" class="ecl-link ecl-link--default ecl-u-type-color-blue-100">EC-GISCO</a>, © EuroGeographics for the administrative boundaries ' +
                    '';

                var mapdisclaimer = '' + '<div class="mapdisclaimer" id="mapdisclaimer">' +
                    '<div style="text-align: left; padding:10px; margin:5px;">' +
                    '<b>Map Disclaimer</b>' +
                    '<br><br>' +
                    '<p class="map-disclaimer-text">OpenStreetMap standard background services are not always in line with the official view of the European Union. The designations employed and the presentation of material on this map do not imply the expression of any opinion whatsoever on the part of the European Union concerning the legal status of any country, territory, city or area or of its authorities, or concerning the delimitation of its frontiers or boundaries. Kosovo*: This designation is without prejudice to positions on status, and is in line with UNSCR 1244/1999 and the ICJ Opinion on the Kosovo declaration of independence. Palestine*: This designation shall not be construed as recognition of a State of Palestine and is without prejudice to the individual positions of the Member States on this issue.</p>' +
                    '</div>' +
                    '</div>'
                    ;

                var disclaimer = '' + '<div id="wrapperdisclaimer">' + mapdisclaimer + '<div class="disclaimer">' + diclaimer2 + ' | <span   class="disclaimerbutton" >Disclaimer</span>' + '</div>' +
                    '</div> ';

                var ol_attribution = document.getElementsByClassName("ol-attribution");  // Find the elements
                for (var i = 0; i < ol_attribution.length; i++) {
                    ol_attribution[i].innerHTML = (disclaimer); // Change the content
                }

                $('.disclaimerbutton').on('mouseover', function () {
                    $(this).css('cursor', 'pointer');
                    $('.ol-attribution').css('min-height', 239 + 'px');
                    $('.mapdisclaimer').show();
                    $('.disclaimer').addClass('disclaimer-popup');
                    return false;
                });

                $('.disclaimer').on('mouseleave', function () {
                    $('.mapdisclaimer').hide();
                    $('.ol-attribution').css('min-height', 10 + 'px');
                    $('.ol-attribution').css('max-height', 20 + 'px');
                    $('.disclaimer').removeClass('disclaimer-popup');
                    return false;
                });

            };

            $scope.countryOverviewMapSetup = function (listTypeParam) {

                if (!listTypeParam) {
                    if ($scope.debug) { console.debug('no listType argument, using "Metadata"'); }
                    listTypeParam = "Metadata";
                }

                const mapOverviewTemp = document.getElementById('mapOverview');

                mapOverviewTemp.innerHTML = "";
                var xyz1 = new ol.source.XYZ({
                    url: 'https://gisco-services.ec.europa.eu/maps/tiles/OSMCartoComposite/EPSG3857/{z}/{x}/{y}.png'
                    // https://wiki.openstreetmap.org/wiki/OpenStreetMap_Carto
                    //Positron:
                    // https://gisco-services.ec.europa.eu/maps/tiles/OSMPositronComposite/EPSG3857/{z}/{x}/{y}.png
                });

                var layer = new ol.layer.Tile({
                    source: xyz1
                });
                var defaultLayer = new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
                var defaultView = new ol.View({
                    center: [1173135.3221714993, 6141768.174777132],
                    zoom: 4.286541245308266
                })

                const format = new ol.format.GeoJSON();

                var myStyle = null;
                var geoJsonData = null;
                var strokeStyle = new ol.style.Stroke({
                    color: 'rgba(255, 255, 255, 1)',
                    width: 1
                });
                var countryOpacityLevel = 0.7;

                if (listTypeParam == "Metadata") {

                    geoJsonData = $scope.arrayGeoJson_MT;

                    myStyle = new ol.style.Style({
                        fill: new ol.style.Fill({
                            color: 'rgba(239, 189, 15, ' + countryOpacityLevel + ')'
                        }),
                        stroke: strokeStyle,
                    });
                }
                else if (listTypeParam == "Downloadable") {

                    geoJsonData = $scope.arrayGeoJson_DW;

                    myStyle = new ol.style.Style({
                        fill: new ol.style.Fill({
                            color: 'rgba(249, 237, 52, ' + countryOpacityLevel + ')'
                        }),
                        stroke: strokeStyle,
                    });
                }
                else if (listTypeParam == "Viewable") {

                    geoJsonData = $scope.arrayGeoJson_VW;

                    myStyle = new ol.style.Style({
                        fill: new ol.style.Fill({
                            color: 'rgba(127, 187, 255, ' + countryOpacityLevel + ')'
                        }),
                        stroke: strokeStyle,
                    });
                }

                //reads countries' data to put into the map
                const features = format.readFeatures(geoJsonData, {
                    featureProjection: "EPSG:3857"
                });

                var sourceLayer = new ol.source.Vector({
                    features: features
                });

                var vectorLayer = new ol.layer.Vector({
                    source: sourceLayer,
                    style: myStyle
                });

                // Add layer to the map
                var mapOverview = new ol.Map({
                    layers: [defaultLayer, layer],
                    target: 'mapOverview',
                    view: defaultView
                });

                mapOverview.addLayer(vectorLayer);

                $scope.changeOverviewMapDisclaimer();

                // Zoom to bounding box
                var extent = null;

                try {
                    extent = sourceLayer.getExtent();
                    mapOverview.getView().fit(extent, mapOverview.getSize());
                }
                catch (ex) {
                    console.error(ex);
                    //if the map is not ready, skip other actions
                    return;
                }

                $(mapOverview.getViewport()).on("click", function (e) {
                    mapOverview.forEachFeatureAtPixel(mapOverview.getEventPixel(e), function (feature, layer) {
                        var countryCode = feature.values_.countryCode;
                        var newUrl = "../../srv/eng/catalog.search#/results?country=" + countryCode.toLowerCase() + "&view=" + $scope.overviewView + "&iacs=" + $scope.iacstype + "&theme=" + $scope.selectedTheme + "&legislation=" + $scope.selectedLegislation + "&envdomain=" + $scope.selectedEnvDomain;
                        $(location).attr('href', newUrl);
                    });
                });

                //style when user hover over a country
                var selectStyle = new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'rgba(206, 124, 69, ' + countryOpacityLevel + ')'
                    }),
                    stroke: new ol.style.Stroke({
                        color: 'rgba(134, 134, 134, 1)',
                        width: 2,
                    }),
                });

                //  begin when user hovers over a country
                let selected = null;

                $(mapOverview.getViewport()).on("pointermove ", function (e) {
                    if (selected !== null) {
                        selected.setStyle(undefined);
                        selected = null;
                    }

                    mapOverview.forEachFeatureAtPixel(mapOverview.getEventPixel(e), function (f) {
                        selected = f;
                    });

                    if (selected) {
                        var countryCode = selected.values_.countryCode;
                        for (var i = 0; i < $scope.countries.data.length; i++) {
                            var ccode = ($scope.countries.data[i].id);
                            if (countryCode.toLowerCase() == ccode) {

                                if (listTypeParam == 'Metadata') {
                                    mtdata_pop = document.getElementById('overview_' + ccode + '_MT').innerText;
                                    listType_pop = "Metadata records";
                                    if (mtdata_pop == 1)
                                        listType_pop = "Metadata record";
                                }
                                else if (listTypeParam == 'Downloadable') {
                                    mtdata_pop = document.getElementById('overview_' + ccode + '_DW').innerText;
                                    listType_pop = "Downloadable datasets";
                                    if (mtdata_pop == 1)
                                        listType_pop = "Downloadable dataset";
                                }
                                else if (listTypeParam == 'Viewable') {
                                    mtdata_pop = document.getElementById('overview_' + ccode + '_VW').innerText;
                                    listType_pop = "Viewable datasets";
                                    if (mtdata_pop == 1)
                                        listType_pop = "Viewable dataset";
                                }

                                document.getElementsByClassName("ol-rotate")[0].innerHTML = ('<b>' + $scope.getCountryName(ccode.toUpperCase()) + '</b>' + ' has ' + '<br>' + '<b>' + mtdata_pop + '</b>' + ' ' + listType_pop);
                                selected.setStyle(selectStyle);
                            }

                        }
                    } else {
                        document.getElementsByClassName("ol-rotate")[0].innerHTML = "Hover over a country";
                    }
                });

            };

            $scope.cust = function () {
                return function (item) {
                    // Search terms on the description label
                    var textToSearch = document.getElementById('searchText').value;
                    if (textToSearch.length == 0) {
                        keyFound = true;
                    } else {
                        var keyFound = false;
                        var definitionLowerCase = item.label.toLowerCase();
                        if (definitionLowerCase.includes(textToSearch.toLowerCase()) == true) keyFound = true;
                        if (item.description != null) {
                            var descriptionLowerCase = item.description.toLowerCase();
                            if (descriptionLowerCase.includes(textToSearch.toLowerCase()) == true) keyFound = true;
                        }
                    }
                    if ((keyFound == true) && (item.dataSetNumber) && (item.dataSetNumber[0] == "-")) {
                        keyFound = false;
                    }

                    if (keyFound == true) {
                        return "Found";
                    } else {
                        return undefined;
                    }
                }
            }

            $scope.cust_country = function () {
                return function (item) {
                    // Search terms on the description label
                    var textToSearch = document.getElementById('searchText2').value;
                    if (textToSearch.length == 0) {
                        keyFound = true;
                    } else {
                        var keyFound = false;
                        if (item._source.resourceTitleObject.default != null) {
                            var definitionLowerCase = item._source.resourceTitleObject.default.toLowerCase();
                            if (definitionLowerCase.includes(textToSearch.toLowerCase()) == true) keyFound = true;
                        }
                    }
                    if (keyFound == true) {
                        return "Found";
                    } else {
                        return undefined;
                    }
                }
            }


            $scope.typeSearch = function () {
                var textToSearch = document.getElementById('searchText').value;
                if (textToSearch.length != 0) {
                    $scope.arraylist.currentPage = 1;
                    $scope.updateResultsLimit();
                }
            }

            $scope.typeSearchResults = function () {
                var textToSearch = document.getElementById('searchText2').value;
                $scope.arraylist.currentPage = 1;
                $scope.updateAfterFilter();
            }

			var host = window.location.host;
			$scope.debug = false;
			$scope.watermark = false;
			if (host != "inspire-geoportal.ec.europa.eu") $scope.watermark = true;
            $scope.serverProtocol = $location.protocol();
            $scope.serverHostname = $location.host();
            $scope.serverPort = $location.port();
            $scope.arraylist = {};
            $scope.arraylist.currentPage = 1;
            $scope.arraylist.pageSize = Number(document.getElementById("select-items-page-results")?.value || 20);
            $scope.arraylist.startResult = (($scope.arraylist.currentPage - 1) * $scope.arraylist.pageSize) + 1;
            $scope.arraylist.endResult = $scope.arraylist.startResult + $scope.arraylist.pageSize - 1;

            var orderBy = $filter('orderBy');
            var json_data = envDomains.data;
            $scope.arraylist.data = json_data;

            $scope.arrayQueries = [];
            $scope.arrayGeoJson_MT = {
                "type": "FeatureCollection",
                "features": []
            };
            $scope.arrayGeoJson_DW = {
                "type": "FeatureCollection",
                "features": []
            };
            $scope.arrayGeoJson_VW = {
                "type": "FeatureCollection",
                "features": []
            };

            $scope.loadtext = function (length) {

                {
                    let result = '';
                    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                    const charactersLength = characters.length;
                    let counter = 0;
                    while (counter < length) {
                        result += characters.charAt(Math.floor(Math.random() * charactersLength));
                        counter += 1;
                    }
                    return result;
                }

            }

            $scope.loadData = function () {
                if ($location.path() == "/qsEnvDomain") {
                    var json_data = envDomains.data;
                    $scope.arraylist.pageSize = Number(document.getElementById("select-items-page")?.value || 10);
                } else if ($location.path() == "/results") {
                    var json_data = [];
                    $scope.arraylist.pageSize = Number(document.getElementById("select-items-page-results")?.value || 20);
                } else if ($location.path() == "/datasetdetails") {
                    var json_data = [];
                    $scope.arraylist.pageSize = Number(document.getElementById("select-items-page-results")?.value || 20);
                } else {
                    var json_data = envDomains.data;
                    $scope.arraylist.pageSize = Number(document.getElementById("select-items-page")?.value || 10);
                }
                $scope.arraylist.data = json_data;
            }

            $scope.roundNumber = function (i) {
                return Math.ceil(i);
            }

            $scope.lowerLimit = function (i) {
                var limit = -1;
                if (Math.floor(i / 10) * 10 == i) {
                    limit = i;
                } else {

                    limit = Math.floor(i / 10) * 10;
                }
                if (limit == 0) limit++;
                return limit;
            }

            $scope.upperLimit = function (i) {
                var limit = -1;
                if (Math.ceil(i / 10) * 10 == i) {
                    limit = i + 10;
                } else {
                    limit = Math.ceil(i / 10) * 10;
                }
                return limit;
            }

            // Pagination functions used only by RESULTS view
            $scope.range = function (min, max, step) {
                step = step || 1;
                var input = [];
                for (var i = min; i <= max; i += step) {
                    input.push(i);
                }
                return input;
            };

            $scope.updateResultsLimitCountry = function () {
                $scope.arraylist.startResult = (($scope.arraylist.currentPage - 1) * $scope.arraylist.pageSize) + 1;
                $scope.arraylist.endResult = $scope.arraylist.startResult + $scope.arraylist.pageSize - 1;
                if ($scope.arraylist.endResult > $scope.arraylist.totalResults) $scope.arraylist.endResult = $scope.arraylist.totalResults;
                $scope.numberOfPagesResults();
            }

            $scope.updateAfterFilter = function () {
                $scope.arrayQueries = [];
                $scope.arraylist.currentPage = 1;
                $scope.getStatsResultsData('overview', $scope.overviewView, $scope.countryId, $scope.countryName, "MT");
                $scope.getResultsDataSets('results', $scope.overviewView, $scope.countryId, $scope.countryName, false);
                $scope.getResultsStats('results', $scope.overviewView, $scope.countryId, $scope.countryName, false);
                $scope.updateResultsLimitCountry();
            }

            $scope.changePageResults = function (page) {
                $scope.arraylist.currentPage = page;
                $scope.getResultsDataSets('results', $scope.overviewView, $scope.countryId, $scope.countryName, false);
            }

            $scope.prevPageResults = function () {
                if ($scope.arraylist.currentPage > 1) {
                   $scope.arraylist.currentPage--;
                   $scope.getResultsDataSets('results', $scope.overviewView, $scope.countryId, $scope.countryName, false);
                }
            }

            $scope.nextPageResults = function () {
              if ($scope.arraylist.currentPage < $scope.numberOfPagesResults() ) {
                  $scope.arraylist.currentPage++;
                  $scope.getResultsDataSets('results', $scope.overviewView, $scope.countryId, $scope.countryName, false);
              }
            }

            $scope.numberOfPagesResults = function () {
                if ($scope.arraylist.totalResults > 15000) {
                       $scope.arraylist.numPages = Math.ceil(15000 / $scope.arraylist.pageSize);
                } else {
                       $scope.arraylist.numPages = Math.ceil($scope.arraylist.totalResults / $scope.arraylist.pageSize);
                }
                return $scope.arraylist.numPages;
            }

            $scope.checkResultsNumber = function (idC) {
                var metadataTotal = document.getElementById("overview_"+idC+"_MT").innerHTML;
                if (metadataTotal > 15000) {
                   $("#stopResult").modal();
                 }
            }

            $scope.setItemsPerPageResults = function () {
                $scope.arrayQueries = [];
                $scope.arraylist.pageSizeOld = $scope.arraylist.pageSize;
                $scope.arraylist.pageSize = Number(document.getElementById("select-items-page-results").value);
                if ($scope.arraylist.pageSize != $scope.arraylist.pageSizeOld) {
                    $scope.arraylist.currentPage = 1;
                    $scope.getResultsDataSets('results', $scope.overviewView, $scope.countryId, $scope.countryName, true);
                }
            }

            // Pagination functions used only by ENV DOMAINS LIST view
            $scope.updateResultsLimit = function () {
                $scope.arraylist.startResult = (($scope.arraylist.currentPage - 1) * $scope.arraylist.pageSize) + 1;
                $scope.arraylist.endResult = (($scope.arraylist.currentPage - 1) * $scope.arraylist.pageSize) + $scope.arraylist.pageSize;
                if ($scope.arraylist.endResult > $scope.arraylist.data.length) $scope.arraylist.endResult = $scope.arraylist.data.length;
            }

            $scope.changePage = function (page) {
                $scope.arraylist.currentPage = page;
                $scope.updateResultsLimit();
            }

            $scope.prevPage = function (page) {
                $scope.arraylist.currentPage--;
                if ($scope.arraylist.currentPage < 1) $scope.arraylist.currentPage = 1;
                $scope.updateResultsLimit();
            }

            $scope.nextPage = function (page) {
                $scope.arraylist.currentPage++;
                if ($scope.arraylist.currentPage > $scope.numberOfPages()) $scope.arraylist.currentPage = $scope.numberOfPages();
                $scope.updateResultsLimit();
            }

            $scope.setItemsPerPage = function () {
                $scope.arraylist.pageSize = Number(document.getElementById("select-items-page").value);
                $scope.arraylist.currentPage = 1;
                $scope.updateResultsLimit();
            }

            $scope.decodeCategory = function (code, type) {
                var category = "-";

                var data = $scope.getScopeData(type);

                data.filter(function (item) {
                    if (item.id === code) {
                        category = item.description;
                        if (category == "macro") {
                            category = item.label;
                        }
                    }
                });
                category = category.toUpperCase();
                return category;
            }

            $scope.decodeItem = function (code, type) {
                var label = "-";

                var data = $scope.getScopeData(type);

                data.filter(function (item) {
                    if (item.id === code) {
                        label = item.label
                    }
                });
                return label;
            }

            $scope.decodeDescription = function (description, type) {
                var code = "-";

                var data = $scope.getScopeData(type);

                data.filter(function (item) {
                    if (item.label === description) {
                        code = item.id
                    }
                });
                return code;
            }

            $scope.getScopeData = function (type) {

                let data = null;

                if (type == 'themes') {
                    data = $scope.themes.data;
                }
                else if (type == 'gdomains') {
                    data = $scope.gdomains.data;
                }
                else if (type == 'legislations') {
                    data = $scope.legislations.data;
                }
                else if (type == 'envdomains') {
                    data = $scope.envDomains.data;
                }
                else if (type == 'countries') {
                    data = $scope.countries.data;
                }
                else {
                    console.warn('warning: scope data is null');
                }

                return data;
            }

            var reverse = null;
            $scope.order = function (predicate, reverse) {
                $scope.arraylist.data = orderBy($scope.arraylist.data, predicate, reverse);
            };

            $scope.order('description', false);

            $scope.name = "";
            $scope.q = "";

            $scope.numberOfPages = function () {
               return Math.ceil($scope.arraylist.data.length / $scope.arraylist.pageSize);
            }

            ////// COUNTRY THEMATIC OVERVIEW PAGE //////

            $scope.createArrayFromTo = function (from, to) {
                var foo = [];
                for (var i = from; i <= to; i++) {
                    foo.push(i);
                }
                return foo;
            }

            // NOTE: if you want to modify the number of columns, you also need to modify the bootstrap classes on overview.html
            // three columns, from 0 to 2
            $scope.countryColumnsArray = $scope.createArrayFromTo(0, 2);


            /**
             * Given the length of a list and number of columns, calculates how many elements a column must have to divide them
             * @param {*} columnsNumber
             * @param {*} listLength
             * @returns
             */
            $scope.getColumnLength = function (columnsNumber, listLength) {
                return Math.ceil(listLength / columnsNumber);
            }

            /**
             * Given the length of a list, number of columns, and the current column index: returns the number of elements this column must have.
             * Example: 13 elements,
             * @param {*} columnsNumber
             * @param {*} listLength
             * @param {*} columnIndex
             * @returns
             */
            $scope.getColumnLengthLimit = function (columnsNumber, listLength, columnIndex) {
                var columnMaxLength = $scope.getColumnLength(columnsNumber, listLength);
                var remainingElements = listLength - (columnMaxLength * columnIndex);

                if (remainingElements < columnMaxLength)
                    return remainingElements;
                else
                    return columnMaxLength;
            }

            $scope.$on('countryOverviewMapSetupEvent', function (event, arg) {
                if ($scope.debug) { console.debug('triggered event countryOverviewMapSetupEvent'); }
                $scope.countryOverviewMapSetup();
            });

            $scope.isoCodes = isoCodes;
            if ($scope.debug) { console.debug(isoCodes); }

            $scope.isoCountries = isoCountries;
            if ($scope.debug) { console.debug(isoCountries); }

            $scope.getCountryName = function (countryCode) {
                if ($scope.isoCountries.hasOwnProperty(countryCode)) {
                    return $scope.isoCountries[countryCode];
                } else {
                    return countryCode;
                }
            }

            $scope.getIsoCode = function (countryCode) {
                if ($scope.isoCodes.hasOwnProperty(countryCode)) {
                    return $scope.isoCodes[countryCode];
                } else {
                    return countryCode;
                }
            }


            $scope.envDomains = envDomains;
            $scope.sortEnvDomains(); // sort items by dataSetNumber
            $scope.envDomainsThematic = $scope.envDomainsFilter("grouping");

            $scope.themes = themes;
            $scope.gdomains = gdomains;
            $scope.legislations = legislations;
            $scope.countries = countries;
            //ordering countries by name
            $scope.countries.data.sort(function(a, b) {
                if (a.label == 'EUROSTAT') {
                    return 1;
                } else if (b.label == 'EUROSTAT') {
                    return -1;
                } else {
                  return a.label.localeCompare(b.label)
                }
            });
            $scope.countries_geojson = countries_geojson;

            $scope.selectedCountries = "yes";

            $scope.containsComparator = function (expected, actual) {
                return actual.indexOf(expected) > -1;
            };

            $scope.annexList = [{
                id: 1,
                label: "I"
            }, {
                id: 2,
                label: "II"
            }, {
                id: 3,
                label: "III"
            }];

            $scope.otherHighValuesDatasets = highValueDatasetsData.otherHighValuesDatasets;
            $scope.referenceData = highValueDatasetsData.referenceData;
            $scope.Mobility = highValueDatasetsData.Mobility;

            $scope.accoptions = "filter_options"

            $scope.subCard = new Array();
            $scope.subCard[0] = false;
            $scope.subCard[1] = false;
            $scope.subCard[2] = false;
            $scope.subCard[3] = false;
            $scope.subCard[4] = false;
            $scope.subCard[5] = false;
            $scope.subCard[6] = false;

            setActiveTab();
            $scope.$on('$locationChangeSuccess', setActiveTab);
            $scope.showEnvDomains = "Domains";
            $scope.overviewMapType = "Metadata";


            var sortConfig = gnSearchSettings.sortBy.split('#');
            angular.extend($scope.searchObj, {
                advancedMode: false,
                from: 1,
                to: 20,
                selectionBucket: 's101',
                viewerMap: viewerMap,
                searchMap: searchMap,
                mapfieldOption: {
                    relations: ['within'],
                    autoTriggerSearch: true
                },
                hitsperpageValues: gnSearchSettings.hitsperpageValues,
                filters: gnSearchSettings.filters,
                defaultParams: {
                    isTemplate: 'n',
                    resourceTemporalDateRange: {
                        range: {
                            resourceTemporalDateRange: {
                                gte: null,
                                lte: null,
                                relation: "intersects"
                            }
                        }
                    },
                    sortBy: sortConfig[0] || 'relevance',
                    sortOrder: sortConfig[1] || ''
                },
                params: {
                    isTemplate: 'n',
                    resourceTemporalDateRange: {
                        range: {
                            resourceTemporalDateRange: {
                                gte: null,
                                lte: null,
                                relation: "intersects"
                            }
                        }
                    },
                    sortBy: sortConfig[0] || 'relevance',
                    sortOrder: sortConfig[1] || ''
                },
                sortbyValues: gnSearchSettings.sortbyValues
            });
        }
    ]);
})();


angular.element(document).ready(function () {
    //console.info("AngularJS version: "+angular.version);
});
