"use strict";

/* Indicator ID constants */
const DSi_1_1_Id = 'DSi_1_1';
const DSi_1_2_Id = 'DSi_1_2';
const DSi_1_3_Id = 'DSi_1_3';
const DSi_1_4_Id = 'DSi_1_4';
const DSi_1_5_Id = 'DSi_1_5';

const MDi_1_1_Id = 'MDi_1_1';
const MDi_1_1_1_Id = 'MDi_1_1_1';
const MDi_1_2_Id = 'MDi_1_2';
const MDi_1_2_1_Id = 'MDi_1_2_1';

const DSi_2_0_Id = 'DSi_2_0';
const DSi_2_0_1_Id = 'DSi_2_0_1';
const DSi_2_1_Id = 'DSi_2_1';
const DSi_2_1_1_Id = 'DSi_2_1_1';
const DSi_2_1_2_Id = 'DSi_2_1_2';
const DSi_2_2_Id = 'DSi_2_2';
const DSi_2_2_1_Id = 'DSi_2_2_1';
const DSi_2_2_2_Id = 'DSi_2_2_2';
const DSi_2_3_Id = 'DSi_2_3';
const DSi_2_3_1_Id = 'DSi_2_3_1';
const DSi_2_3_2_Id = 'DSi_2_3_2';

const NSi_2_0_Id = 'NSi_2_0';
const NSi_2_0_1_Id = 'NSi_2_0_1';
const NSi_2_1_Id = 'NSi_2_1';
const NSi_2_1_1_Id = 'NSi_2_1_1';
const NSi_2_2_Id = 'NSi_2_2';
const NSi_2_2_1_Id = 'NSi_2_2_1';

const NSi_4_0_Id = 'NSi_4_0';
const NSi_4_1_Id = 'NSi_4_1';
const NSi_4_1_1_Id = 'NSi_4_1_1';
const NSi_4_1_2_Id = 'NSi_4_1_2';
const NSi_4_2_Id = 'NSi_4_2';
const NSi_4_2_1_Id = 'NSi_4_2_1';
const NSi_4_2_2_Id = 'NSi_4_2_2';
const NSi_4_3_Id = 'NSi_4_3';
const NSi_4_3_1_Id = 'NSi_4_3_1';
const NSi_4_3_2_Id = 'NSi_4_3_2';
const NSi_4_4_Id = 'NSi_4_4';
const NSi_4_4_1_Id = 'NSi_4_4_1';
const NSi_4_4_2_Id = 'NSi_4_4_2';

const countryCodeSolrFacetName = 'countryCode';

const jsonDownloadAnchorElemId = 'jsonDownloadAnchorElem';

/* Boolean values */
const booleanValueTrue = 'true';
const booleanValueFalse = 'false';

/* Request methods */
const AJAX_REQ_METHOD_GET = 'GET';
const AJAX_REQ_METHOD_POST = 'POST';

/* Parameter names constants */
const PARAMNAME_JSONINDICATORS = 'jsonIndicators';

/* ES constants */
const ES_QUERY_FIELD_NAME_COUNTRY = 'groupOwnerName';
const ES_QUERY_FIELD_NAME_HUID = 'harvesterUuid';

const ES_QUERY_AGGS_META_FIELD_NAME = 'id';

/* HTML parameters */
const HTML_ELEM_ANCHOR = 'a';
const HTML_STYLE_DISPLAY_NONE = 'display: none';

/* HTML elements ids */
const htmlElementId_errorModal = '#errorModal';
const htmlElementId_download_btn = '#ind-download-btn';
//const htmlElementId_countryInfo = '#ind-countryinfo';
const htmlElementId_sessionInfo_input = '#ind-sessioninfo-input';
const htmlElementId_sessionInfo_reload_btn = '#ind-sessioninfo-update-btn';
const htmlElementId_country_input = '#ind-country-input';
const htmlElementId_country_reload_btn = '#ind-country-update-btn';


//const htmlElementId_jsonDownloadAnchor = '#jsonDownloadAnchorElem';

/* HTML event */
const htmlEventName_click = 'click';
const htmlEventName_input = 'input';

/* Content type constants */
const headerNameContentType = 'Content-Type';
const mediaTypeApplicationOctetStream = 'application/octet-stream';
const mediaTypeApplicationFormUrlEncoded = 'application/x-www-form-urlencoded';
const jsBlobType = 'octet/stream';

/* Filename constants */
const CSV_FILE_NAME_PREFIX = 'indicator';
const CSV_FILE_NAME_EXTENSION = '.csv';
const JSON_FILE_NAME_EXTENSION = '.json';

/* Indicators: formatted value constants */
const IND_FORMATTED_VALUE_DEFAULT_FIXED_DECIMALS = 0;
const IND_FORMATTED_VALUE_PERCENTAGE_FIXED_DECIMALS = 0;
const IND_FORMATTED_VALUE_PERCENTAGE_UNIT = '%';
const IND_FORMATTED_VALUE_NULL_VALUE_EXPLAIN = 'Not available';

/* Total number of indicators */
const indicatorsTotalNumber = 17;

//
///////////////////////////////////////////////////////////////////////////////
// Definitions of shared query param dereferences
function SearchCustomQParam(name, value) {
    this.name = name;
    this.value = value;
    //DART to remove this field, no more useful in ES
    this.qParam = this.name + '=' + this.value;
}

const qResTypeIsDsOrSeries = new SearchCustomQParam('qResTypeIsDsOrSeries', 'cl_hierarchyLevel.key:(dataset OR series)');
const qResTypeIsService = new SearchCustomQParam('qResTypeIsService', 'cl_hierarchyLevel.key:service');
const qPriorityDsIsAny = new SearchCustomQParam('qPDSIsAny', 'synonymsEnvironmentalDomain:*');
const qSpatialScopeIsRegional = new SearchCustomQParam('qSpatScopeIsRegional', 'th_httpinspireeceuropaeumetadatacodelistSpatialScope-SpatialScope.link:*regional*');
const qSpatialScopeIsNational = new SearchCustomQParam('qSpatScopeIsNational', 'th_httpinspireeceuropaeumetadatacodelistSpatialScope-SpatialScope.link:*national*');
// DART no more valid
//const qDegOfConformityIsConformant = new SearchCustomQParam('qDegOfConformIsConformant', 'degreeOfConformity:conformant');
//const qSpecTitleHave1089And2010 = new SearchCustomQParam('qSpecTitleHave1089And2010', 'specificationTitle:(1089 AND 2010)');
//const qSpecTitleHave976And2009 = new SearchCustomQParam('qSpecTitleHave976And2009', 'specificationTitle:(976 AND 2009)');
// DART notice the parenthesis to wrap the whole AND condition
const qIsConformantAndSpecTitleHave1089And2010 = new SearchCustomQParam('qIsConformantAndSpecTitleHave1089And2010', '(specificationConformance.pass:true AND specificationConformance.title:(1089 AND 2010))')
const qIsConformantAndSpecTitleHave976And2009 = new SearchCustomQParam('qIsConformantAndSpecTitleHave976And2009', '(specificationConformance.pass:true AND specificationConformance.title:(976 AND 2009))')

const qThemeAnnexIs1 = new SearchCustomQParam('qThAnnexIs1', 'th_httpinspireeceuropaeutheme-theme.link:(\"http:\/\/inspire.ec.europa.eu\/theme\/ad\" OR \"http:\/\/inspire.ec.europa.eu\/theme\/au\" OR \"http:\/\/inspire.ec.europa.eu\/theme\/cp\" OR \"http:\/\/inspire.ec.europa.eu\/theme\/gg\" OR \"http:\/\/inspire.ec.europa.eu\/theme\/gn\" OR \"http:\/\/inspire.ec.europa.eu\/theme\/hy\" OR \"http:\/\/inspire.ec.europa.eu\/theme\/ps\" OR \"http:\/\/inspire.ec.europa.eu\/theme\/rs\" OR \"http:\/\/inspire.ec.europa.eu\/theme\/tn\")');
const qThemeAnnexIs2 = new SearchCustomQParam('qThAnnexIs2', 'th_httpinspireeceuropaeutheme-theme.link:(\"http:\/\/inspire.ec.europa.eu\/theme\/el\" OR \"http:\/\/inspire.ec.europa.eu\/theme\/ge\" OR \"http:\/\/inspire.ec.europa.eu\/theme\/lc\" OR \"http:\/\/inspire.ec.europa.eu\/theme\/oi\")');
const qThemeAnnexIs3 = new SearchCustomQParam('qThAnnexIs3', 'th_httpinspireeceuropaeutheme-theme.link:(\"http:\/\/inspire.ec.europa.eu\/theme\/ac\" OR \"http:\/\/inspire.ec.europa.eu\/theme\/af\" OR \"http:\/\/inspire.ec.europa.eu\/theme\/am\" OR \"http:\/\/inspire.ec.europa.eu\/theme\/br\" OR \"http:\/\/inspire.ec.europa.eu\/theme\/bu\" OR \"http:\/\/inspire.ec.europa.eu\/theme\/ef\" OR \"http:\/\/inspire.ec.europa.eu\/theme\/er\" OR \"http:\/\/inspire.ec.europa.eu\/theme\/hb\" OR \"http:\/\/inspire.ec.europa.eu\/theme\/hh\" OR \"http:\/\/inspire.ec.europa.eu\/theme\/lu\" OR \"http:\/\/inspire.ec.europa.eu\/theme\/mf\" OR \"http:\/\/inspire.ec.europa.eu\/theme\/mr\" OR \"http:\/\/inspire.ec.europa.eu\/theme\/nz\" OR \"http:\/\/inspire.ec.europa.eu\/theme\/of\" OR \"http:\/\/inspire.ec.europa.eu\/theme\/pd\" OR \"http:\/\/inspire.ec.europa.eu\/theme\/pf\" OR \"http:\/\/inspire.ec.europa.eu\/theme\/sd\" OR \"http:\/\/inspire.ec.europa.eu\/theme\/so\" OR \"http:\/\/inspire.ec.europa.eu\/theme\/sr\" OR \"http:\/\/inspire.ec.europa.eu\/theme\/su\" OR \"http:\/\/inspire.ec.europa.eu\/theme\/us\")');
const qServiceTypeIsDiscovery = new SearchCustomQParam('qSrvTypeIsDiscovery', 'serviceType:discovery');
const qServiceTypeIsView = new SearchCustomQParam('qSrvTypeIsView', 'serviceType:view');
const qServiceTypeIsDownload = new SearchCustomQParam('qSrvTypeIsDownload', 'serviceType:download');
const qServiceTypeIsTransformation = new SearchCustomQParam('qSrvTypeIsTransformation', 'serviceType:transformation');

const qInteropAspectIsDw = new SearchCustomQParam('qInteropAspIsDW', 'indicator_INDICATOR_DOWNLOAD_LINK_TO_DATA:PASS');
const qInteropAspectIsVw = new SearchCustomQParam('qInteropAspIsVW', 'indicator_INDICATOR_VIEW_LINK_TO_DATA:PASS');

//const searchQParamRefCollection = [
//    qResTypeIsDsOrSeries.qParam,
//    qResTypeIsService.qParam,
//    qPriorityDsIsAny.qParam,
//    qSpatialScopeIsRegional.qParam,
//    qSpatialScopeIsNational.qParam,
//    qDegOfConformityIsConformant.qParam,
//    qSpecTitleHave1089And2010.qParam,
//    qSpecTitleHave976And2009.qParam,
//    qThemeAnnexIs1.qParam.replace(/"/g, '\\"'), //DART you should always escape those
//    qThemeAnnexIs2.qParam,
//    qThemeAnnexIs3.qParam,
//    qServiceTypeIsDiscovery.qParam,
//    qServiceTypeIsView.qParam,
//    qServiceTypeIsDownload.qParam,
//    qServiceTypeIsTransformation.qParam,
//    qInteropAspectIsDw.qParam,
//    qInteropAspectIsVw.qParam,
//];

function composeQueryFromSnippets(snippetList) {
    let resComposition = '';
    let defaultSuffix = ' AND ';
    if (snippetList && Array.isArray(snippetList) && snippetList.length > 0) {
        resComposition = snippetList[0];
        for (let idx = 1; idx < snippetList.length; idx++) {
            resComposition += defaultSuffix + snippetList[idx];
        }
    }
    return resComposition;
}
///////////////////////////////////////////////////////////////////////////////
const countryCodeSolrFieldName = 'memberStateCountryCode';
const countryCodeSolrFacetFragment = {
    type: 'terms',
    field: countryCodeSolrFieldName,
    limit: 1
};

///////////////////////////////////////////////////////////////////////////////
const DSi_1_1_solrFacetFragment = {
    type: 'query',
    //q: '${' + qResTypeIsDsOrSeries.name + '}',
    qString: composeQueryFromSnippets([qResTypeIsDsOrSeries.value])
};
const DSi_1_2_solrFacetFragment = {
    type: 'query',
    //q: '${' + qResTypeIsService.name + '}',
    qString: composeQueryFromSnippets([qResTypeIsService.value])
};
const DSi_1_3_solrFacetFragment = {
    type: 'query',
    //q: '${' + qResTypeIsDsOrSeries.name + '} AND ${' + qPriorityDsIsAny.name + '}',
    qString: composeQueryFromSnippets([qResTypeIsDsOrSeries.value, qPriorityDsIsAny.value])
};
const DSi_1_4_solrFacetFragment = {
    type: 'query',
    //q: '${' + qResTypeIsDsOrSeries.name + '} AND ${' + qSpatialScopeIsRegional.name + '}',
    qString: composeQueryFromSnippets([qResTypeIsDsOrSeries.value, qSpatialScopeIsRegional.value])
};
const DSi_1_5_solrFacetFragment = {
    type: 'query',
    //q: '${' + qResTypeIsDsOrSeries.name + '} AND ${' + qSpatialScopeIsNational.name + '}',
    qString: composeQueryFromSnippets([qResTypeIsDsOrSeries.value, qSpatialScopeIsNational.value])
};
const DSi_2_0_1_solrFacetFragment = {
    type: 'query',
    //q: '${' + qResTypeIsDsOrSeries.name + '} AND ${' + qDegOfConformityIsConformant.name + '} AND ${' + qSpecTitleHave1089And2010.name + '}',
    qString: composeQueryFromSnippets([qResTypeIsDsOrSeries.value, qIsConformantAndSpecTitleHave1089And2010.value])
};
const DSi_2_1_1_solrFacetFragment = {
    type: 'query',
    //q: '${' + qResTypeIsDsOrSeries.name + '} AND ${' + qDegOfConformityIsConformant.name + '} AND ${' + qSpecTitleHave1089And2010.name + '} AND ${' + qThemeAnnexIs1.name + '}',
    qString: composeQueryFromSnippets([qResTypeIsDsOrSeries.value, qIsConformantAndSpecTitleHave1089And2010.value, qThemeAnnexIs1.value])
};
const DSi_2_1_2_solrFacetFragment = {
    type: 'query',
    //q: '${' + qResTypeIsDsOrSeries.name + '} AND ${' + qThemeAnnexIs1.name + '}',
    qString: composeQueryFromSnippets([qResTypeIsDsOrSeries.value, qThemeAnnexIs1.value])
};
const DSi_2_2_1_solrFacetFragment = {
    type: 'query',
    //q: '${' + qResTypeIsDsOrSeries.name + '} AND ${' + qDegOfConformityIsConformant.name + '} AND ${' + qSpecTitleHave1089And2010.name + '} AND ${' + qThemeAnnexIs2.name + '}',
    qString: composeQueryFromSnippets([qResTypeIsDsOrSeries.value, qIsConformantAndSpecTitleHave1089And2010.value, qThemeAnnexIs2.value])
};
const DSi_2_2_2_solrFacetFragment = {
    type: 'query',
    //q: '${' + qResTypeIsDsOrSeries.name + '} AND ${' + qThemeAnnexIs2.name + '}',
    qString: composeQueryFromSnippets([qResTypeIsDsOrSeries.value, qThemeAnnexIs2.value])
};
const DSi_2_3_1_solrFacetFragment = {
    type: 'query',
    //q: '${' + qResTypeIsDsOrSeries.name + '} AND ${' + qDegOfConformityIsConformant.name + '} AND ${' + qSpecTitleHave1089And2010.name + '} AND ${' + qThemeAnnexIs3.name + '}',
    qString: composeQueryFromSnippets([qResTypeIsDsOrSeries.value, qIsConformantAndSpecTitleHave1089And2010.value, qThemeAnnexIs3.value])
};
const DSi_2_3_2_solrFacetFragment = {
    type: 'query',
    //q: '${' + qResTypeIsDsOrSeries.name + '} AND ${' + qThemeAnnexIs3.name + '}',
    qString: composeQueryFromSnippets([qResTypeIsDsOrSeries.value, qThemeAnnexIs3.value])
};
const NSi_2_0_1_solrFacetFragment = {
    type: 'query',
    //q: '${' + qResTypeIsDsOrSeries.name + '} AND ${' + qInteropAspectIsVw.name + '} AND ${' + qInteropAspectIsDw.name + '}',
    qString: composeQueryFromSnippets([qResTypeIsDsOrSeries.value, qInteropAspectIsVw.value, qInteropAspectIsDw.value])
};
const NSi_2_1_1_solrFacetFragment = {
    type: 'query',
    //q: '${' + qResTypeIsDsOrSeries.name + '} AND ${' + qInteropAspectIsVw.name + '}',
    qString: composeQueryFromSnippets([qResTypeIsDsOrSeries.value, qInteropAspectIsVw.value])
};
const NSi_2_2_1_solrFacetFragment = {
    type: 'query',
    //q: '${' + qResTypeIsDsOrSeries.name + '} AND ${' + qInteropAspectIsDw.name + '}',
    qString: composeQueryFromSnippets([qResTypeIsDsOrSeries.value, qInteropAspectIsDw.value])
};
const NSi_4_1_1_solrFacetFragment = {
    type: 'query',
    //q: '${' + qServiceTypeIsDiscovery.name + '} AND ${' + qDegOfConformityIsConformant.name + '} AND ${' + qSpecTitleHave976And2009.name + '}',
    qString: composeQueryFromSnippets([qServiceTypeIsDiscovery.value, qIsConformantAndSpecTitleHave976And2009.value])
};
const NSi_4_1_2_solrFacetFragment = {
    type: 'query',
    //q: '${' + qServiceTypeIsDiscovery.name + '}',
    qString: composeQueryFromSnippets([qServiceTypeIsDiscovery.value])
};
const NSi_4_2_1_solrFacetFragment = {
    type: 'query',
    //q: '${' + qServiceTypeIsView.name + '} AND ${' + qDegOfConformityIsConformant.name + '} AND ${' + qSpecTitleHave976And2009.name + '}',
    qString: composeQueryFromSnippets([qServiceTypeIsView.value, qIsConformantAndSpecTitleHave976And2009.value])
};
const NSi_4_2_2_solrFacetFragment = {
    type: 'query',
    //q: '${' + qServiceTypeIsView.name + '}',
    qString: composeQueryFromSnippets([qServiceTypeIsView.value])
};
const NSi_4_3_1_solrFacetFragment = {
    type: 'query',
    //q: '${' + qServiceTypeIsDownload.name + '} AND ${' + qDegOfConformityIsConformant.name + '} AND ${' + qSpecTitleHave976And2009.name + '}',
    qString: composeQueryFromSnippets([qServiceTypeIsDownload.value, qIsConformantAndSpecTitleHave976And2009.value])
};
const NSi_4_3_2_solrFacetFragment = {
    type: 'query',
    //q: '${' + qServiceTypeIsDownload.name + '}',
    qString: composeQueryFromSnippets([qServiceTypeIsDownload.value])
};
const NSi_4_4_1_solrFacetFragment = {
    type: 'query',
    //q: '${' + qServiceTypeIsTransformation.name + '} AND ${' + qDegOfConformityIsConformant.name + '} AND ${' + qSpecTitleHave976And2009.name + '}',
    qString: composeQueryFromSnippets([qServiceTypeIsTransformation.value, qIsConformantAndSpecTitleHave976And2009.value])
};
const NSi_4_4_2_solrFacetFragment = {
    type: 'query',
    //q: '${' + qServiceTypeIsTransformation.name + '}',
    qString: composeQueryFromSnippets([qServiceTypeIsTransformation.value])
};
///////////////////////////////////////////////////////////////////////////////
const IndicatorValueFormat_percentage = 'percentage';
const IndicatorValueFormat_integer = 'integer';

const FormulaProcess_identity = 'identity';
const FormulaProcess_simple = 'simple';
const FormulaProcess_complex = 'complex';

function Formula(type, xFacetId, yFacetId, xSolrFacetProcessFunction, ySolrFacetProcessFunction) {
    this.type = type;
    // simple scenario (result value is obtained directly from a specific facet id)
    this.xFacetId = xFacetId;
    this.yFacetId = yFacetId;
    // complex scenario (result value is obtained as result of a function executed over the facet collection)
    this.xSolrFacetProcessFunction = xSolrFacetProcessFunction;
    this.ySolrFacetProcessFunction = ySolrFacetProcessFunction;
}

//function IndicatorSolrJsonSubFacet(solrFacetCollection) {
//    let myself = this;
//    // injection of property inside this object
//    if (solrFacetCollection && Array.isArray(solrFacetCollection)) {
//        solrFacetCollection.forEach(function (item) {
//            myself[item.key] = item.value;
//        });
//    }
//}
//function IndicatorSolrJsonFacet(id, solrFacetCollection) {
//    // injection of property inside this object
//    this[id] = {
//        type: 'query',
//        q: '*:*',
//        facet: new IndicatorSolrJsonSubFacet(solrFacetCollection)
//    };
//}
function IndicatorEsJsonFilters(id, collection) {
    this.key = id;
    
    if (id && collection && Array.isArray(collection)) {
        let filterContent = {};
        collection.forEach(function (item) {
            // inject elements using the key
            if (item.key && item.value && item.value.qString) {
                let qString = item.value.qString;
                filterContent[item.key] = generateEsQueryStringElement(qString, null);
            }
        });
        this.filters = filterContent;
    }
}

function IndicatorDefinition(id, format, formulaType, solrQueryParamCollection, solrFacetCollection) {
    this.id = id;
    this.value = null;
    this.formattedValue = null;
    this.sourceDataCollection = null;
    this.format = format;
    this.formula = formulaType;
    this.solrQParams = solrQueryParamCollection;
    //this.solrJsonFacet = new IndicatorSolrJsonFacet(id, solrFacetCollection);
    
    this.facetCollection = solrFacetCollection;
    this.esJsonFilters = new IndicatorEsJsonFilters(id, solrFacetCollection);
}

// names: dividend / divisor = quotient and remainder
function calculatePercentage(dividend, divisor) {
    let res = null;
    if (divisor !== 0) {
        res = (dividend / divisor) * 100;
    }
    return res;
}
///////////////////////////////////////////////////////////////////////////////
const DSi_1_1_solrFacetCollection = [
    {key: DSi_1_1_Id, value: DSi_1_1_solrFacetFragment, },
];
const DSi_1_1 = new IndicatorDefinition(
        DSi_1_1_Id,
        IndicatorValueFormat_integer,
        new Formula(FormulaProcess_identity),
        null,
        DSi_1_1_solrFacetCollection);

const DSi_1_2_solrFacetCollection = [
    {key: DSi_1_2_Id, value: DSi_1_2_solrFacetFragment, },
];
const DSi_1_2 = new IndicatorDefinition(
        DSi_1_2_Id,
        IndicatorValueFormat_integer,
        new Formula(FormulaProcess_identity),
        null,
        DSi_1_2_solrFacetCollection);

const DSi_1_3_solrFacetCollection = [
    {key: DSi_1_3_Id, value: DSi_1_3_solrFacetFragment, },
];
const DSi_1_3 = new IndicatorDefinition(
        DSi_1_3_Id,
        IndicatorValueFormat_integer,
        new Formula(FormulaProcess_identity),
        null,
        DSi_1_3_solrFacetCollection);

const DSi_1_4_solrFacetCollection = [
    {key: DSi_1_4_Id, value: DSi_1_4_solrFacetFragment, },
];
const DSi_1_4 = new IndicatorDefinition(
        DSi_1_4_Id,
        IndicatorValueFormat_integer,
        new Formula(FormulaProcess_identity),
        null,
        DSi_1_4_solrFacetCollection);

const DSi_1_5_solrFacetCollection = [
    {key: DSi_1_5_Id, value: DSi_1_5_solrFacetFragment, },
];
const DSi_1_5 = new IndicatorDefinition(
        DSi_1_5_Id,
        IndicatorValueFormat_integer,
        new Formula(FormulaProcess_identity),
        null,
        DSi_1_5_solrFacetCollection);

///////////////////////////////////////////////////////////////////////////////
const DSi_2_0_solrFacetCollection = [
    {key: DSi_2_0_1_Id, value: DSi_2_0_1_solrFacetFragment, },
    {key: DSi_1_1_Id, value: DSi_1_1_solrFacetFragment, },
];
const DSi_2_0 = new IndicatorDefinition(
        DSi_2_0_Id,
        IndicatorValueFormat_percentage,
        new Formula(FormulaProcess_simple, DSi_2_0_1_Id, DSi_1_1_Id),
        null,
        DSi_2_0_solrFacetCollection);

const DSi_2_1_solrFacetCollection = [
    {key: DSi_2_1_1_Id, value: DSi_2_1_1_solrFacetFragment, },
    {key: DSi_2_1_2_Id, value: DSi_2_1_2_solrFacetFragment, },
];
const DSi_2_1 = new IndicatorDefinition(
        DSi_2_1_Id,
        IndicatorValueFormat_percentage,
        new Formula(FormulaProcess_simple, DSi_2_1_1_Id, DSi_2_1_2_Id),
        null,
        DSi_2_1_solrFacetCollection);

const DSi_2_2_solrFacetCollection = [
    {key: DSi_2_2_1_Id, value: DSi_2_2_1_solrFacetFragment, },
    {key: DSi_2_2_2_Id, value: DSi_2_2_2_solrFacetFragment, },
];
const DSi_2_2 = new IndicatorDefinition(
        DSi_2_2_Id,
        IndicatorValueFormat_percentage,
        new Formula(FormulaProcess_simple, DSi_2_2_1_Id, DSi_2_2_2_Id),
        null,
        DSi_2_2_solrFacetCollection);

const DSi_2_3_solrFacetCollection = [
    {key: DSi_2_3_1_Id, value: DSi_2_3_1_solrFacetFragment, },
    {key: DSi_2_3_2_Id, value: DSi_2_3_2_solrFacetFragment, },
];
const DSi_2_3 = new IndicatorDefinition(
        DSi_2_3_Id,
        IndicatorValueFormat_percentage,
        new Formula(FormulaProcess_simple, DSi_2_3_1_Id, DSi_2_3_2_Id),
        null,
        DSi_2_3_solrFacetCollection);

///////////////////////////////////////////////////////////////////////////////
const NSi_2_0_solrFacetCollection = [
    {key: NSi_2_0_1_Id, value: NSi_2_0_1_solrFacetFragment, },
    {key: DSi_1_1_Id, value: DSi_1_1_solrFacetFragment, },
];
const NSi_2_0 = new IndicatorDefinition(
        NSi_2_0_Id,
        IndicatorValueFormat_percentage,
        new Formula(FormulaProcess_simple, NSi_2_0_1_Id, DSi_1_1_Id),
        null,
        NSi_2_0_solrFacetCollection);

const NSi_2_1_solrFacetCollection = [
    {key: NSi_2_1_1_Id, value: NSi_2_1_1_solrFacetFragment, },
    {key: DSi_1_1_Id, value: DSi_1_1_solrFacetFragment, },
];
const NSi_2_1 = new IndicatorDefinition(
        NSi_2_1_Id,
        IndicatorValueFormat_percentage,
        new Formula(FormulaProcess_simple, NSi_2_1_1_Id, DSi_1_1_Id),
        null,
        NSi_2_1_solrFacetCollection);

const NSi_2_2_solrFacetCollection = [
    {key: NSi_2_2_1_Id, value: NSi_2_2_1_solrFacetFragment, },
    {key: DSi_1_1_Id, value: DSi_1_1_solrFacetFragment, },
];
const NSi_2_2 = new IndicatorDefinition(
        NSi_2_2_Id,
        IndicatorValueFormat_percentage,
        new Formula(FormulaProcess_simple, NSi_2_2_1_Id, DSi_1_1_Id),
        null,
        NSi_2_2_solrFacetCollection);

///////////////////////////////////////////////////////////////////////////////
//const calculate_NSi_4_0_dividend = function (solrFacetsResult) {
//    let res = null;
//    if (solrFacetsResult) {
//        res =
//                solrFacetsResult[NSi_4_1_1_Id].count +
//                solrFacetsResult[NSi_4_2_1_Id].count +
//                solrFacetsResult[NSi_4_3_1_Id].count +
//                solrFacetsResult[NSi_4_4_1_Id].count;
//    }
//    return res;
//};
const calculate_NSi_4_0_dividend = function (esBucketsResult) {
    let res = null;
    if (esBucketsResult) {
        res =
                esBucketsResult[NSi_4_1_1_Id].doc_count +
                esBucketsResult[NSi_4_2_1_Id].doc_count +
                esBucketsResult[NSi_4_3_1_Id].doc_count +
                esBucketsResult[NSi_4_4_1_Id].doc_count;
    }
    return res;
};
//const calculate_NSi_4_0_divisor = function (solrFacetsResult) {
//    let res = null;
//    if (solrFacetsResult) {
//        res =
//                solrFacetsResult[NSi_4_1_2_Id].count +
//                solrFacetsResult[NSi_4_2_2_Id].count +
//                solrFacetsResult[NSi_4_3_2_Id].count +
//                solrFacetsResult[NSi_4_4_2_Id].count;
//    }
//    return res;
//};
const calculate_NSi_4_0_divisor = function (esBucketsResult) {
    let res = null;
    if (esBucketsResult) {
        res =
                esBucketsResult[NSi_4_1_2_Id].doc_count +
                esBucketsResult[NSi_4_2_2_Id].doc_count +
                esBucketsResult[NSi_4_3_2_Id].doc_count +
                esBucketsResult[NSi_4_4_2_Id].doc_count;
    }
    return res;
};

const NSi_4_0_solrFacetCollection = [
    {key: NSi_4_1_1_Id, value: NSi_4_1_1_solrFacetFragment, },
    {key: NSi_4_1_2_Id, value: NSi_4_1_2_solrFacetFragment, },
    {key: NSi_4_2_1_Id, value: NSi_4_2_1_solrFacetFragment, },
    {key: NSi_4_2_2_Id, value: NSi_4_2_2_solrFacetFragment, },
    {key: NSi_4_3_1_Id, value: NSi_4_3_1_solrFacetFragment, },
    {key: NSi_4_3_2_Id, value: NSi_4_3_2_solrFacetFragment, },
    {key: NSi_4_4_1_Id, value: NSi_4_4_1_solrFacetFragment, },
    {key: NSi_4_4_2_Id, value: NSi_4_4_2_solrFacetFragment, },
];
const NSi_4_0 = new IndicatorDefinition(
        NSi_4_0_Id,
        IndicatorValueFormat_percentage,
        new Formula(FormulaProcess_complex, null, null, calculate_NSi_4_0_dividend, calculate_NSi_4_0_divisor),
        null,
        NSi_4_0_solrFacetCollection);

const NSi_4_1_solrFacetCollection = [
    {key: NSi_4_1_1_Id, value: NSi_4_1_1_solrFacetFragment, },
    {key: NSi_4_1_2_Id, value: NSi_4_1_2_solrFacetFragment, },
];
const NSi_4_1 = new IndicatorDefinition(
        NSi_4_1_Id,
        IndicatorValueFormat_percentage,
        new Formula(FormulaProcess_simple, NSi_4_1_1_Id, NSi_4_1_2_Id),
        null,
        NSi_4_1_solrFacetCollection);

const NSi_4_2_solrFacetCollection = [
    {key: NSi_4_2_1_Id, value: NSi_4_2_1_solrFacetFragment, },
    {key: NSi_4_2_2_Id, value: NSi_4_2_2_solrFacetFragment, },
];
const NSi_4_2 = new IndicatorDefinition(
        NSi_4_2_Id,
        IndicatorValueFormat_percentage,
        new Formula(FormulaProcess_simple, NSi_4_2_1_Id, NSi_4_2_2_Id),
        null,
        NSi_4_2_solrFacetCollection);

const NSi_4_3_solrFacetCollection = [
    {key: NSi_4_3_1_Id, value: NSi_4_3_1_solrFacetFragment, },
    {key: NSi_4_3_2_Id, value: NSi_4_3_2_solrFacetFragment, },
];
const NSi_4_3 = new IndicatorDefinition(
        NSi_4_3_Id,
        IndicatorValueFormat_percentage,
        new Formula(FormulaProcess_simple, NSi_4_3_1_Id, NSi_4_3_2_Id),
        null,
        NSi_4_3_solrFacetCollection);

const NSi_4_4_solrFacetCollection = [
    {key: NSi_4_4_1_Id, value: NSi_4_4_1_solrFacetFragment, },
    {key: NSi_4_4_2_Id, value: NSi_4_4_2_solrFacetFragment, },
];
const NSi_4_4 = new IndicatorDefinition(
        NSi_4_4_Id,
        IndicatorValueFormat_percentage,
        new Formula(FormulaProcess_simple, NSi_4_4_1_Id, NSi_4_4_2_Id),
        null,
        NSi_4_4_solrFacetCollection);

///////////////////////////////////////////////////////////////////////////////

const MDi_1_1 = new IndicatorDefinition(
        MDi_1_1_Id,
        IndicatorValueFormat_percentage,
        new Formula(FormulaProcess_simple, MDi_1_1_1_Id, DSi_1_1_Id),
        null,
        null
        );
const MDi_1_2 = new IndicatorDefinition(
        MDi_1_2_Id,
        IndicatorValueFormat_percentage,
        new Formula(FormulaProcess_simple, MDi_1_2_1_Id, DSi_1_2_Id),
        null,
        null
        );
///////////////////////////////////////////////////////////////////////////////
const indicatorDefinitions = [
    DSi_1_1,
    DSi_1_2,
    DSi_1_3,
    DSi_1_4,
    DSi_1_5,
    DSi_2_0,
    DSi_2_1,
    DSi_2_2,
    DSi_2_3,
    NSi_2_0,
    NSi_2_1,
    NSi_2_2,
    NSi_4_0,
    NSi_4_1,
    NSi_4_2,
    NSi_4_3,
    NSi_4_4,
            //
            //MDi_1_1,
            //MDi_1_2,
];

///////////////////////////////////////////////////////////////////////////////
function IndicatorResultHarvestSession(endpointId, sessionId) {
    this.endpoint_id = endpointId;
    this.session_id = sessionId;
}
function IndicatorResultMetadata(countryId, countryName, savedDate, savedByUserId, markAsOfficial, harvestSessionCollection, endpointModeActive) {
    this.country_id = countryId;
    this.country_name = countryName;
    this.saved_date = savedDate;
    this.saved_by = savedByUserId;
    this.marked_for_reporting = markAsOfficial;
    this.harvest_sessions = harvestSessionCollection;
    this.endpoint_mode_active = endpointModeActive;
}
function IndicatorResultData(id, format, value, formattedValue, sourceDataCollection) {
    this.id = id;
    this.format = format;
    this.value = value;
    this.formattedValue = formattedValue;
    this.sourceData = sourceDataCollection;
}
function IndicatorResult(indicatorResultMetadata, indicatorResultCollection) {
    this.metadata = indicatorResultMetadata;
    this.indicators = indicatorResultCollection;
}
///////////////////////////////////////////////////////////////////////////////

/* Configuration constants */

const geoportalResNewQueryParam = "gpResNew"; // eg. INSPIRE-aaa-bbb-ccc-ddd
const geoportalResCurQueryParam = "gpResCur"; // eg. INSPIRE-aaa-bbb-ccc-ddd
const geoportalCountryQueryParam = "country"; // eg. at, cz, it

const usrCountryQueryParam = 'country';
const usrGnHarvesterUuidQueryParam = 'gnHarvesterUuid';

/**** Script core ****/

var usrCountry = null;
var usrGnHarvesterUUID = null;

//var resultCountryCode = null;
var completedIndicators = 0; // Used to enable the "download" or "download and mark" buttons, once the indicator are all available (checked on const indicatorsTotalNumber)
var ecasUserUid = 'notAvail'; // default

// Global variables
var countryDef = null;
var countryId = null;
var gnHarvesterUUID = null;
var mrOutputData = null;

var reloadTable = false;
var intervalPause = false;

// used to identify the base url
//var myLocalPath = 'mr_report/generator.html';
var myLocalPath = '/mr_report_gn/generator.html';

function init() {
    init_buildBaseURLFromWindowLocationInfo();

    init_parseURLQueryParams();

    $(htmlElementId_sessionInfo_input).val(null);
    $(htmlElementId_country_input).val(null);
}
function buildBaseURLFromWindowLocInfo() {
    let baseURL = null;

    let proto = window.location.protocol;
    let hostname = window.location.hostname;
    let port = window.location.port;
    let path = window.location.pathname;

    if (path.indexOf(myLocalPath) > -1) {
        path = path.replace(myLocalPath, '');

        let sPort = (port) ? ":" + port : "";
        // generate the base url only when my localPath is found
        baseURL = proto + '//' + hostname + sPort + path;
    }

    return baseURL;
}
function init_buildBaseURLFromWindowLocationInfo() {
    // forcefully update the URL with current informations
    let updHostURL = buildBaseURLFromWindowLocInfo();
    if (updHostURL) {
        config.backendHostURL = updHostURL;
    }
}

function init_parseURLQueryParams() {
    let queryParams = window.location.search;

    if (queryParams !== undefined && queryParams !== null) {
        let urlSearchParams = new URLSearchParams(queryParams.slice(1));

        // extract parameters from URL
        let queryParam = null;
//        let queryParam = urlSearchParams.getAll(geoportalResNewQueryParam);
//        if (queryParam && queryParam.length === 1) {
//            geoportalResNew = queryParam[0];
//        }
//        queryParam = urlSearchParams.getAll(geoportalResCurQueryParam);
//        if (queryParam && queryParam.length === 1) {
//            geoportalResCur = queryParam[0];
//        }
//        queryParam = urlSearchParams.getAll(geoportalCountryQueryParam);
//        if (queryParam && queryParam.length === 1) {
//            countryCode = queryParam[0];//.toLowerCase(); // sanitized
//        }
        
        queryParam = urlSearchParams.getAll(usrCountryQueryParam);
        if (queryParam && queryParam.length === 1) {
            usrCountry = queryParam[0];//.toLowerCase(); // sanitized
        }
        queryParam = urlSearchParams.getAll(usrGnHarvesterUuidQueryParam);
        if (queryParam && queryParam.length === 1) {
            usrGnHarvesterUUID = queryParam[0];//.toLowerCase(); // sanitized
        }
    }
}


/*
 * Execute the Ajax call
 */
function updateStatsPageData(geoportalHostURL, qParams, qIndDefinitionElem, jsonpCallbackName, successCallback, errorCallback) {
    let gptHostURL = null;

    // check if the host URL is valid
    if (geoportalHostURL !== undefined && geoportalHostURL !== null) {
        gptHostURL = geoportalHostURL;
    } else {
        errorCallback();
    }

    // with valid data, proceed
    if (gptHostURL) {
        // init with some common params
        let customQParams = [];

        // apply custom values related to this specific query
        // query params
        if (qParams) {
            //DART convert a simple field in array
            if (!Array.isArray(qParams)) {
                qParams = [].push(qParams);
            }

            customQParams = customQParams.concat(qParams);
        }
        
        let indId = qIndDefinitionElem.key;
        let indFilters = qIndDefinitionElem.filters;

        let metaName = indId;
        let mainAggs = buildDefaultEsSearchMainAggregation(metaName);

        // create and attach the nested aggs, with the proper filters
        mainAggs.resources.aggs = new EsAggregation(indId, null, null, new EsAggregationFilters(indFilters), null);
        
        
        let reqDataBody = new DefaultEsSearch();
        // inject query elements (eg. isTemplate=n, country and harvesterUuid)
        let defaultEsQParams = getDefaultEsMustConditions();
        customQParams = customQParams.concat(defaultEsQParams);
        reqDataBody.query.function_score.query.bool.must = customQParams;
        // inject aggs elements
        reqDataBody.aggs = mainAggs;

        invokeEsAjax(geoportalHostURL, AJAX_REQ_METHOD_POST, reqDataBody, successCallback, errorCallback);
    }
}

function generateEsQueryStringElement(qQueryDSL, qDefaultField) {
    return new EsQueryStringElement(new EsQueryElement(qQueryDSL, qDefaultField));
}

//function generateSolrFQParamForId(geoportalSourceMetadataResourceLocatorID) {
//    let res = null;
//    if (geoportalSourceMetadataResourceLocatorID) {
//        // use the / char to delimit the search space
//        let resourceSolrFQParam = 'id:*' + geoportalSourceMetadataResourceLocatorID + '/*';
//        res = 'fq=' + encodeURIComponent(resourceSolrFQParam);
//    }
//    return res;
//}

function retrieveIndicatorDefinitionById(id) {
    let resInd = null;
    indicatorDefinitions.some(function (indElem) {
        let res = (indElem.id === id);
        if (res) {
            resInd = indElem;
        }
        return res;
    });
    return resInd;
}

//function updateIndicatorsOnSolrData(solrDataResponse) {
//    if (solrDataResponse && solrDataResponse.facets) {
//        let solrFacets = solrDataResponse.facets;
//
//        if (solrFacets) {
//            // identify a valid property in solrFacets
//            let indicatorDef = null;
//            for (let prop in solrFacets) {
//                // avoid property 'count' by default
//                if (prop !== 'count') {
//                    indicatorDef = retrieveIndicatorDefinitionById(prop);
//                    if (indicatorDef) {
//                        break;
//                    }
//                }
//            }
//
//            processIndicator(indicatorDef, solrFacets);
//        }
//    } else {
//        console.error("Something wrong with this response");
//        errorPopup();
//    }
//}
function updateIndicatorsOnEsData(dataResponse) {
    if (dataResponse) {
        // check for multiple combinations
        let dataAggs = null;
        if (dataResponse.aggregations) {
            dataAggs = dataResponse.aggregations;
        } else if (dataResponse.aggs) {
            dataAggs = dataResponse.aggs;
        }
        
        if (dataAggs && dataAggs.resources && dataAggs.resources.meta && dataAggs.resources.buckets) {
            let indicatorId = null;
            let indicatorDef = null;
            // extract the meta information associated
            let meta = dataAggs.resources.meta;
            if (meta && meta.id) {
                indicatorId = meta.id;
                // retrieve the definition of this indicator
                if (indicatorId) {
                    indicatorDef = retrieveIndicatorDefinitionById(indicatorId);
                }
            }

            // extract the buckets
            let buckets = dataAggs.resources.buckets;
            if (indicatorDef) {
                if (Array.isArray(buckets) && buckets.length > 0) {
                    processIndicator(indicatorDef, buckets[0]); // TO FIX if index != [0]
                } else {
                    console.error("Unable to retrieve buckets. Maybe wrong query params? (check country or huid)");
                    errorPopup();
                }
            } else {
                console.error("Unable to find a valid Indicator based the response");
                errorPopup();
            }
        }
    } else {
        console.error("Something wrong with this response");
        errorPopup();
    }
}

function processIndicator(indicatorDef, dataBucket) {
    if (indicatorDef) {
        let iId = indicatorDef.id;
        let iIdRating = indicatorDef.id + starRating_idSuffix;
        // retrieve the subfacet elements
        let subBucket = dataBucket[iId].buckets; // TO FIX if null?

        let srcXValue = null;
        let srcYValue = null;
        let computedValue = null;
        let computedUnit = '';
        let computedValueFixed = IND_FORMATTED_VALUE_DEFAULT_FIXED_DECIMALS;

        if (indicatorDef.formula && indicatorDef.formula.type) {
            switch (indicatorDef.formula.type) {
                case FormulaProcess_identity:
                    // take directly the subfacet item
                    if (subBucket) {
                        //computedValue = subBucket[iId].count;
                        computedValue = subBucket[iId].doc_count;
                        computedUnit = '';
                        computedValueFixed = 0;
                    }
                    break;
                case FormulaProcess_simple:
                    // take directly the subfacet items
                    let xId = indicatorDef.formula.xFacetId;
                    let yId = indicatorDef.formula.yFacetId;

                    if (subBucket && xId && yId) {
                        //srcXValue = subBucket[xId].count;
                        //srcYValue = subBucket[yId].count;
                        srcXValue = subBucket[xId].doc_count;
                        srcYValue = subBucket[yId].doc_count;
                        if (indicatorDef.format === IndicatorValueFormat_percentage) {
                            computedValue = calculatePercentage(srcXValue, srcYValue);
                            //DART enable it to manage null values, replaced with 0
                            //computedValue = (computedValue === null) ? 0 : computedValue;
                            computedUnit = IND_FORMATTED_VALUE_PERCENTAGE_UNIT;
                            computedValueFixed = IND_FORMATTED_VALUE_PERCENTAGE_FIXED_DECIMALS;
                        }
                    }
                    break;
                case FormulaProcess_complex:
                    let xFacetFunc = indicatorDef.formula.xSolrFacetProcessFunction;
                    let yFacetFunc = indicatorDef.formula.ySolrFacetProcessFunction;

                    if (subBucket && xFacetFunc && yFacetFunc) {
                        srcXValue = xFacetFunc(subBucket);
                        srcYValue = yFacetFunc(subBucket);
                        if (indicatorDef.format === IndicatorValueFormat_percentage) {
                            computedValue = calculatePercentage(srcXValue, srcYValue);
                            //DART enable it to manage null values, replaced with 0
                            //computedValue = (computedValue === null) ? 0 : computedValue;
                            computedUnit = IND_FORMATTED_VALUE_PERCENTAGE_UNIT;
                            computedValueFixed = IND_FORMATTED_VALUE_PERCENTAGE_FIXED_DECIMALS;
                        }
                    }
                    break;
            }
        }

        indicatorDef.value = computedValue;
        //DART store also source data
        indicatorDef.sourceDataCollection = subBucket;

        //DART generated formatted value from a valid number
        if (computedValue !== null && computedValue !== undefined) {
            indicatorDef.formattedValue = computedValue.toFixed(computedValueFixed) + computedUnit;
        } else {
            indicatorDef.formattedValue = IND_FORMATTED_VALUE_NULL_VALUE_EXPLAIN;
        }

        // write results on page
        if (indicatorDef.formattedValue) {
            let htmlRating = generateHTMLRating(computedValue, indicatorDef.formattedValue);
            $("#" + iId).html(indicatorDef.formattedValue);
            $("#" + iIdRating).html(htmlRating);
        }
        // Increase the counter of calculated indicators and
        // check if the download buttons can be enabled
        handleDownloadButtons();
    }
}

function processUserInputs() {
    //let qCountry = null;
    //let qHarvesterUUID = null;
    
    let tmpCountryDef = null;

    // try to find the matching definition
    if (usrCountry !== null && usrCountry !== '') {
        tmpCountryDef = retrieveCountryDefinitionById(usrCountry.toUpperCase());
//        if (tmpCountryDef === null) {
//            tmpCountryDef = retrieveCountryDefinitionByCountryCode(usrCountry.toLowerCase());
//            if (tmpCountryDef === null) {
//                tmpCountryDef = retrieveCountryDefinitionByCountryName(usrCountry.toLowerCase());
//            }
//        }
    }
    if (tmpCountryDef === null && usrGnHarvesterUUID !== null && usrGnHarvesterUUID !== '') {
        tmpCountryDef = retrieveCountryDefinitionByGnHarvesterUUID(usrGnHarvesterUUID);
    }

    if (tmpCountryDef) {
        countryDef = tmpCountryDef;
        countryId = tmpCountryDef.gnGroupOwnerName;
        gnHarvesterUUID = tmpCountryDef.gnHarvesterUUID;
    } else {
        // unable to find a match, run as-is
        countryDef = null;
        countryId = usrCountry;
        gnHarvesterUUID = usrGnHarvesterUUID;
    }
    
    updateInfoSection();
}

function updateInfoSection() {
    if (htmlElementId_country_input && $(htmlElementId_country_input)) {
        let cInfo = 'not available';
        if (countryDef !== undefined && countryDef !== null) {
            cInfo = countryDef.id;
            $(htmlElementId_country_input).val(cInfo);
            enableButton($(htmlElementId_country_reload_btn));
        }
    }
    if (htmlElementId_sessionInfo_input && $(htmlElementId_sessionInfo_input)) {
        let sInfo = 'not available';
        if (gnHarvesterUUID !== undefined && gnHarvesterUUID !== null) {
            sInfo = gnHarvesterUUID;
            $(htmlElementId_sessionInfo_input).val(sInfo);
            enableButton($(htmlElementId_sessionInfo_reload_btn));
        }
    }
}

//function updateMemberStateCountryCodeOnSolrData(solrDataResponse) {
//    if (solrDataResponse && solrDataResponse.facets) {
//        let solrFacets = solrDataResponse.facets;
//        if (solrFacets && solrFacets[countryCodeSolrFacetName]) {
//            // identify a valid property in solrFacets
//            let b = solrFacets[countryCodeSolrFacetName].buckets;
//            if (b && Array.isArray(b) && b.length > 0) {
//                // take always the first
//                resultCountryCode = b[0].val;
//            }
//        } else {
//            console.error("Facet based on Country code is not available in the response");
//            errorPopup();
//        }
//
//        updateInfoSection();
//    } else {
//        console.error("Something wrong with this response");
//        //errorPopup();
//    }
//}

function generateJson(markAsOfficial) {
    let res = null;

    let resultCollection = [];
    indicatorDefinitions.forEach(function (item) {
        let iId = item.id;
        let iFormat = item.format;
        let iValue = item.value;
        let iFormattedValue = item.formattedValue;
        let iSourceData = item.sourceDataCollection;

        if (iId) {
            let indicatorResult = new IndicatorResultData(iId, iFormat, iValue, iFormattedValue, iSourceData);
            resultCollection.push(indicatorResult);
        }
    });

    let resultMd = null;
    //
    if (countryDef) {
        let countryCode = countryDef.countryCode;
        let countryName = countryDef.countryName;
        let savedDate = new Date();
        let savedByUserId = ecasUserUid;
        let endpointId = countryDef.gnHarvesterUUID; //null;
        let sessionId = null;
        // create a single element array with the results
        let harvestSessionCollection = [ new IndicatorResultHarvestSession(endpointId, sessionId) ];
        // TODO: pass the endpointModeActive boolean to false (now fixed to true) in case the call is to get the indicators aggregated by country
        resultMd = new IndicatorResultMetadata(countryCode, countryName, savedDate, savedByUserId, markAsOfficial, harvestSessionCollection, true);
    }
    if (resultMd) {
        res = new IndicatorResult(resultMd, resultCollection);
    }
    return res;
}

function MROfficialData(id, sessionId, url, countryCode, countryName, dumpDate, indicatorCollection) {
    this['id'] = id;
    this['sessionid'] = sessionId;
    this['url'] = url;
    this['countrycode'] = countryCode;
    this['countryname'] = countryName;
    this['dumpdate'] = dumpDate;
    this['indicators'] = indicatorCollection;
}

function generateJsonForMRPublishing(markAsOfficial) {
    let res = generateJson(markAsOfficial);
    let mrData = null;
    if (res && res.metadata) {
        // TOFIX internal object, less checks
        let countryCode = res.metadata.country_id;
        let countryName = res.metadata.country_name;
        let endpointId = res.metadata.harvest_sessions[0].endpoint_id;
        let sessionId = res.metadata.harvest_sessions[0].session_id;
        let sessionIsoDate = null;
        // regex to extract the date from the session id. Capturing matches: (0) whole regex, (1) date as per capturing group
        const sessionEndpointIdDateRegexp = /_([\d]+-[\d]+)/;
        // regex to extract temporal values from the datetime. Capturing matches: (1) YYYY, (2) MM, (3) DD, (4) hh, (5) mm, (6) sec, (7) msec
        const sessionDateIsoRegex = /([\d]{4})([\d]{2})([\d]{2})-([\d]{2})([\d]{2})([\d]{2})/;

        if (sessionId !== null) {
            const sessionIdDateMatch = sessionId.match(sessionEndpointIdDateRegexp);
            if (sessionIdDateMatch !== null && Array.isArray(sessionIdDateMatch)) {
                // extract only the date
                let sessionDate = sessionIdDateMatch[1];
                // then, use that string date to be converted in JS Date
                const sessionDateMatch = sessionDate.match(sessionDateIsoRegex);
                if (sessionDateMatch !== null && Array.isArray(sessionDateMatch)) {
                    let YYYY = sessionDateMatch[1];
                    let MM = sessionDateMatch[2] - 1; // JS Date requires Month (0-11)
                    let DD = sessionDateMatch[3];
                    let hh = sessionDateMatch[4];
                    let mm = sessionDateMatch[5];
                    let ss = sessionDateMatch[6];
                    sessionIsoDate = new Date(YYYY, MM, DD, hh, mm, ss).toISOString();
                }
            }
        }

        if ((sessionId !== null && sessionIsoDate !== null) || countryCode !== null) {
            mrData = new MROfficialData(
                    endpointId,
                    sessionId,
                    '',
                    countryCode,
                    countryName,
                    sessionIsoDate,
                    res.indicators);
        } else {
            console.error("Unable to generate MR data due to invalid ids");
        }
    }
    return mrData;
}

function downloadIndicators() {
    if (mrOutputData === null) {
        mrOutputData = generateJsonForMRPublishing(true);

        if (mrOutputData !== null && typeof mrOutputData !== undefined && mrOutputData !== '') {
            let archiveBaseName = 'mrIndicatorsDownload';
            if (mrOutputData.countrycode && mrOutputData.id) {
                archiveBaseName = mrOutputData.countrycode.toUpperCase() + "_" + mrOutputData.id;
            } else if (mrOutputData.id) {
                archiveBaseName = mrOutputData.id;
            } else if (mrOutputData.countrycode) {
                archiveBaseName = mrOutputData.countrycode;
            }
            let archiveFullName = archiveBaseName + '.json';
            let jsonObjStr = JSON.stringify(mrOutputData, null, 0);

            let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonObjStr);
            let dlAnchorElem = document.getElementById(jsonDownloadAnchorElemId);
            if (dlAnchorElem) {
                dlAnchorElem.setAttribute("href", dataStr);
                dlAnchorElem.setAttribute("download", archiveFullName);
            } else {
                console.error("Unable to attach the JSON output as download HTML element");
                errorPopup();
            }
        } else {
            console.error("Unable to generate the JSON to download");
            errorPopup();
        }
    }
    let dlAnchorElem = document.getElementById(jsonDownloadAnchorElemId);
    if (dlAnchorElem && mrOutputData !== null) {
        // emulate the click action
        dlAnchorElem.click();
    }
}

function reload(newGnHarvesterUUID, newCountryId) {
    let currURL = window.location.href;
    let newURL = currURL;
//    let idealOldGpResNew = geoportalResNewQueryParam + '=' + geoportalResNew;
//    if (currURL.indexOf(idealOldGpResNew) > -1) {
//        // it contains the ideal parameter to replace
//        newURL = newURL.replace(geoportalResNew, geoportalNewSessionId);
//    }
//    let idealOldCountry = geoportalCountryQueryParam + '=' + countryCode;
//    if (currURL.indexOf(idealOldCountry) > -1) {
//        // it contains the ideal parameter to replace
//        newURL = newURL.replace(countryCode, newCountryCode);
//    }
    let idealOldHarvesterUUID = usrGnHarvesterUuidQueryParam + '=' + gnHarvesterUUID;
    if (currURL.indexOf(idealOldHarvesterUUID) > -1) {
        // it contains the ideal parameter to replace
        newURL = newURL.replace(gnHarvesterUUID, newGnHarvesterUUID);
    }
    let idealOldCountryId = usrCountryQueryParam + '=' + countryId;
    if (currURL.indexOf(idealOldCountryId) > -1) {
        // it contains the ideal parameter to replace
        newURL = newURL.replace(countryId, newCountryId);
    }
    if (newURL !== currURL) {
        window.location.assign(newURL);
    } else {
        console.error("Cannot reload the page with the new parameters. Aborting request...");
        errorPopup();
    }
}

function errorPopup() {
    $(htmlElementId_errorModal).modal();
}

//function processCountry() {
//    const callbackName = 'updateOnSolrDataCountry';
//
//    let successCallback = function (response) {
//        updateMemberStateCountryCodeOnSolrData(response);
//    };
//    let errorCallback = function (response) {
//        updateMemberStateCountryCodeOnSolrData(response);
//    };
//
//    let customQParams = [];
//    if (geoportalResNew) {
//        customQParams.push(generateSolrFQParamForId(geoportalResNew));
//    }
//    if (countryCode) {
//        customQParams.push(generateSolrFQParamForCountry(countryCode));
//    }
//
//    let countryCodeSolrFacet = {
//        countryCode: countryCodeSolrFacetFragment,
//    };
//
//    updateStatsPageData(
//            config.backendHostURL,
//            customQParams,
//            countryCodeSolrFacet,
//            callbackName,
//            successCallback,
//            errorCallback);
//}

/*
 * This function prepares the callbacks and generates a series of request,
 * by looping on the collection of IndicatorDefinitions
 */
function processIndicators() {
    const callbackName = 'updateIndicatorsOnEsData';

    var successCallback = function (response, textStatus, jqXHR) {
        updateIndicatorsOnEsData(response);
    };
    var errorCallback = function (jqXHR, textStatus, errorThrown) {
        console.error(textStatus);
        console.error(errorThrown);
        updateIndicatorsOnEsData(null);
    };

    var userQParams = [];


    //DEBUG countryId = 'Malta';
    //DEBUG gnHarvesterUUID = '4b31ba79-6cfc-4c38-ac30-b78458dc6b8a'; // MT

    if (countryId) {
        let countryEsQueryStrElem = generateEsQueryStringElement(countryId, ES_QUERY_FIELD_NAME_COUNTRY);
        userQParams.push(countryEsQueryStrElem);
    }
    if (gnHarvesterUUID) {
        let harvUidEsQueryStrElem = generateEsQueryStringElement(gnHarvesterUUID, ES_QUERY_FIELD_NAME_HUID);
        userQParams.push(harvUidEsQueryStrElem);
    }
    

    const initDelay = 50;
    const delay = 200;
    indicatorDefinitions.forEach(function (item, idx) {
        // initialize with the common params
        let customQParams = userQParams;
        let solrJsonFacet = item.esJsonFilters;

        // merge the item solrQParam with the common
        let itemQParams = item.solrQParams;
        if (itemQParams) {
            if (!Array.isArray(itemQParams)) {
                itemQParams = [].push(itemQParams);
            }
            customQParams = customQParams.concat(itemQParams);
        }

        window.setTimeout(
                updateStatsPageData,
                initDelay + (idx * delay),
                config.backendHostURL,
                customQParams,
                solrJsonFacet,
                callbackName,
                successCallback,
                errorCallback);
    });
}

const starRating_idSuffix = "_rating";
const starRating_faClassFullStar = "fas";
const starRating_faClassEmptyStar = "far";
const starRating_htmlSnippetClassPlaceholderId = "N";
const starRating_htmlSnippetClassPlaceholder = "{starN}";
const starRating_htmlSnippetTemplate = '<div><span class="{star1} fa-star fa-xs text-warning"></span><span class="{star2} fa-star fa-xs text-warning"></span><span class="{star3} fa-star fa-xs text-warning"></span><span class="{star4} fa-star fa-xs text-warning"></span><span class="{star5} fa-star fa-xs text-warning"></span></div>';

function generateHTMLRating(iValue, defaultHtml) {
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
            res = starRating_htmlSnippetTemplate;
            let starSelClass = null;
            for (let i = 0; i < maxStars; i++) {
                if (i < selStars) {
                    starSelClass = starRating_faClassFullStar;
                } else {
                    starSelClass = starRating_faClassEmptyStar;
                }
                let starPlaceholder = starRating_htmlSnippetClassPlaceholder
                        .replace(starRating_htmlSnippetClassPlaceholderId, i + 1);
                res = res.replace(starPlaceholder, starSelClass);
            }
        }
    } else {
        // if null (meaning "not applicable") do nothing?
    }
    return res;
}

/*
 * This function increases the counter of calculated indicators and
 * enable the "download" or "download and mark" buttons
 * if the indicators has been all processed
 */
function handleDownloadButtons() {
    completedIndicators++;

    if (completedIndicators === indicatorsTotalNumber) {
        enableButton($(htmlElementId_download_btn));
    }
}
/*
 * This function removes the 'disabled' class and removes
 * the 'fa-hourglass-half' element
 *
 * @param element the element to be processed
 */
function enableButton(element) {
    element.removeClass('disabled');
    //element.find('.fa-hourglass-half').remove();
}
function disableButton(element) {
    element.addClass('disabled');
    //element.find('.fa-hourglass-half').remove();
}
/**** DOM ready functions ****/
$(document).ready(function () {
    init();

    //if (countryCode !== null || geoportalResNew !== null || geoportalResCur !== null) {
    if (usrCountry !== null || usrGnHarvesterUUID !== null) {
        //DART to retrieve some data to put in the top info box
        //processCountry();
        processUserInputs();

        processIndicators();
    }

    $(htmlElementId_sessionInfo_reload_btn).on(htmlEventName_click, function (e) {
        e.preventDefault();
        e.stopPropagation();

        // take the input text and reload the entire page
        let geoportalNewSessionId = $(htmlElementId_sessionInfo_input).val();
        reload(geoportalNewSessionId, null);
    });
    $(htmlElementId_sessionInfo_input).on(htmlEventName_input, function (e) {
        e.preventDefault();
        e.stopPropagation();

        let geoportalNewSessionId = $(htmlElementId_sessionInfo_input).val();
        if (geoportalNewSessionId !== null && geoportalNewSessionId !== "") {
            enableButton($(htmlElementId_sessionInfo_reload_btn));
        } else {
            disableButton($(htmlElementId_sessionInfo_reload_btn));
        }
    });
    $(htmlElementId_country_reload_btn).on(htmlEventName_click, function (e) {
        e.preventDefault();
        e.stopPropagation();

        // take the input text and reload the entire page
        let newCountry = $(htmlElementId_country_input).val();
        reload(null, newCountry);
    });
    $(htmlElementId_country_input).on(htmlEventName_input, function (e) {
        e.preventDefault();
        e.stopPropagation();

        let newCountry = $(htmlElementId_country_input).val();
        if (newCountry !== null && newCountry !== "") {
            enableButton($(htmlElementId_country_reload_btn));
        } else {
            disableButton($(htmlElementId_country_reload_btn));
        }
    });

    $(htmlElementId_download_btn).on(htmlEventName_click, function (e) {
        e.preventDefault();
        e.stopPropagation();
        downloadIndicators();
    });

    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });
}
);