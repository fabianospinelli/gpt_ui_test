"use strict";

///////
function EsQueryElement(qQueryDSL, qDefaultField) {
    this.query = qQueryDSL;
    if (qDefaultField) {
        this.default_field = qDefaultField;
    }
}
function EsQueryStringElement(esQueryElement) {
    this.query_string = esQueryElement;
}

function EsQueryMustFilter() {
    this.must = [];
}
function EsQueryBoolFilter(boolFilter) {
    this.bool = boolFilter;
}
function EsQueryFunctionScore(esQueryFunctionElem, esFilterFunctionElem) {
    this.query = esQueryFunctionElem;
    if (esFilterFunctionElem) {
        this.filter = esFilterFunctionElem;
    }
}
function EsQuery(esFunctionScoreElem) {
    this.function_score = esFunctionScoreElem;
}
////////
function EsAggregationMeta(fieldName, fieldValue) {
    var self = this;
    if (fieldName) {
        self[fieldName] = fieldValue;
    }
}
function EsAggregationTerms(fieldName) {
    this.field = fieldName;
}
function EsAggregationFilters(esFilterQueryElem) {
    this.filters = esFilterQueryElem;
}
function EsAggregation(selfName, metaElem, aggsTermsElem, aggsFiltersElem, nestedAggsElem) {
    // inject the indicator name as field
    var self = this;
    if (selfName) {
        let aggsObj = {};        

        // fill the obj optional fields
        if (metaElem) {
            aggsObj.meta = metaElem;
        }
        
        if (aggsTermsElem) {
            aggsObj.terms = aggsTermsElem;
        }
        if (aggsFiltersElem) {
            aggsObj.filters = aggsFiltersElem;
        }
        if (nestedAggsElem) {
            aggsObj.aggs = nestedAggsElem;
        }

        self[selfName] = aggsObj;
    }
}

//////////////
function buildDefaultEsSearchSort() {
    return [
        {
            "resourceTitleObject.default.keyword": "asc"
        },
        "_score"
    ];
}
function buildDefaultEsSearchMainAggregation(metaName) {
    let selfName = 'resources';
    let metaElem = new EsAggregationMeta('id', metaName);
    let termsElem = new EsAggregationTerms('docType');
    // no nested aggs or filters
    return new EsAggregation(selfName, metaElem, termsElem, null, null);
}
function getDefaultEsMustConditions() {
    return [
        {
            terms: {
                isTemplate: [ "n" ]
            }
        }
    ];
}
//////////////

function DefaultEsSearch() {
    this.size = 0;
    this.track_total_hits = false;

    //this.sort = buildDefaultEsSearchSort();
    
    this.aggs = null; //buildDefaultEsSearchMainAggregation();
    
    let esQMust = new EsQueryMustFilter();
    let esQBool = new EsQueryBoolFilter(esQMust);
    let esQFScore = new EsQueryFunctionScore(esQBool, null);

    this.query = new EsQuery(esQFScore);
    
//    // include already the default must conditions
//    let defaultMustCondList = getDefaultEsMustConditions();
//    this.query.function_score.query.bool.must.concat(defaultMustCondList);
}