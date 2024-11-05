"use strict";
//*** declaring const and properties ***//
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

/* Boolean values */

/* Request methods */

/* Parameter names constants */

/* ES constants */

/* HTML parameters */

/* HTML elements ids */

/* HTML event */

/* Content type constants */

/* Filename constants */

/* Indicators: formatted value constants */
const IND_FORMATTED_VALUE_DEFAULT_FIXED_DECIMALS = 0;
const IND_FORMATTED_VALUE_PERCENTAGE_FIXED_DECIMALS = 0;
const IND_FORMATTED_VALUE_PERCENTAGE_UNIT = '%';
const IND_FORMATTED_VALUE_NULL_VALUE_EXPLAIN = 'Not available';

/* Total number of indicators */
const indicatorsTotalNumber = 17;

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

///////////////////////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////////////////////

function IndicatorQueryDefinition(id, queryParamCollection, queryFacetCollection) {
    //this.solrQParams = solrQueryParamCollection;
    this.qParamCollection = queryParamCollection;

    //this.facetCollection = solrFacetCollection;
    this.qFacetCollection = queryFacetCollection;

    //this.esJsonFilters = new IndicatorEsJsonFilters(id, solrFacetCollection);
    this.esJsonFilters = new IndicatorEsJsonFilters(id, queryFacetCollection);
}

function IndicatorDefinition(id, format, formulaType, indicatorQueryDefinition) {
    this.id = id;
    this.value = null;
    this.formattedValue = null;
    this.sourceDataCollection = null;
    this.format = format;
    this.formula = formulaType;

    this.queryDefinition = indicatorQueryDefinition;
}

// math refs: dividend / divisor = quotient and remainder
function calculatePercentage(dividend, divisor) {
    let res = null;
    if (divisor !== 0) {
        res = (dividend / divisor) * 100;
    }
    return res;
}

///////////////////////////////////////////////////////////////////////////////

const DSi_1_1 = new IndicatorDefinition(
        DSi_1_1_Id,
        IndicatorValueFormat_integer,
        new Formula(FormulaProcess_identity),
        null);

const DSi_1_2 = new IndicatorDefinition(
        DSi_1_2_Id,
        IndicatorValueFormat_integer,
        new Formula(FormulaProcess_identity),
        null);

const DSi_1_3 = new IndicatorDefinition(
        DSi_1_3_Id,
        IndicatorValueFormat_integer,
        new Formula(FormulaProcess_identity),
        null);

const DSi_1_4 = new IndicatorDefinition(
        DSi_1_4_Id,
        IndicatorValueFormat_integer,
        new Formula(FormulaProcess_identity),
        null);

const DSi_1_5 = new IndicatorDefinition(
        DSi_1_5_Id,
        IndicatorValueFormat_integer,
        new Formula(FormulaProcess_identity),
        null);

///////////////////////////////////////////////////////////////////////////////

const DSi_2_0 = new IndicatorDefinition(
        DSi_2_0_Id,
        IndicatorValueFormat_percentage,
        new Formula(FormulaProcess_simple, DSi_2_0_1_Id, DSi_1_1_Id),
        null);

const DSi_2_1 = new IndicatorDefinition(
        DSi_2_1_Id,
        IndicatorValueFormat_percentage,
        new Formula(FormulaProcess_simple, DSi_2_1_1_Id, DSi_2_1_2_Id),
        null);

const DSi_2_2 = new IndicatorDefinition(
        DSi_2_2_Id,
        IndicatorValueFormat_percentage,
        new Formula(FormulaProcess_simple, DSi_2_2_1_Id, DSi_2_2_2_Id),
        null);

const DSi_2_3 = new IndicatorDefinition(
        DSi_2_3_Id,
        IndicatorValueFormat_percentage,
        new Formula(FormulaProcess_simple, DSi_2_3_1_Id, DSi_2_3_2_Id),
        null);

///////////////////////////////////////////////////////////////////////////////

const NSi_2_0 = new IndicatorDefinition(
        NSi_2_0_Id,
        IndicatorValueFormat_percentage,
        new Formula(FormulaProcess_simple, NSi_2_0_1_Id, DSi_1_1_Id),
        null);

const NSi_2_1 = new IndicatorDefinition(
        NSi_2_1_Id,
        IndicatorValueFormat_percentage,
        new Formula(FormulaProcess_simple, NSi_2_1_1_Id, DSi_1_1_Id),
        null);

const NSi_2_2 = new IndicatorDefinition(
        NSi_2_2_Id,
        IndicatorValueFormat_percentage,
        new Formula(FormulaProcess_simple, NSi_2_2_1_Id, DSi_1_1_Id),
        null);

///////////////////////////////////////////////////////////////////////////////

const calculate_NSi_4_0_dividend = function (dataResult) {
    let res = null;
    if (dataResult
            && dataResult[NSi_4_1_1_Id] !== null
            && dataResult[NSi_4_2_1_Id] !== null
            && dataResult[NSi_4_3_1_Id] !== null
            && dataResult[NSi_4_4_1_Id] !== null
            ) {
        res =
                dataResult[NSi_4_1_1_Id].doc_count +
                dataResult[NSi_4_2_1_Id].doc_count +
                dataResult[NSi_4_3_1_Id].doc_count +
                dataResult[NSi_4_4_1_Id].doc_count;
    }
    return res;
};
const calculate_NSi_4_0_divisor = function (dataResult) {
    let res = null;
    if (dataResult
            && dataResult[NSi_4_1_2_Id] !== null
            && dataResult[NSi_4_2_2_Id] !== null
            && dataResult[NSi_4_3_2_Id] !== null
            && dataResult[NSi_4_4_2_Id] !== null
            ) {
        res =
                dataResult[NSi_4_1_2_Id].doc_count +
                dataResult[NSi_4_2_2_Id].doc_count +
                dataResult[NSi_4_3_2_Id].doc_count +
                dataResult[NSi_4_4_2_Id].doc_count;
    }
    return res;
};

const NSi_4_0 = new IndicatorDefinition(
        NSi_4_0_Id,
        IndicatorValueFormat_percentage,
        new Formula(FormulaProcess_complex, null, null, calculate_NSi_4_0_dividend, calculate_NSi_4_0_divisor),
        null);

const NSi_4_1 = new IndicatorDefinition(
        NSi_4_1_Id,
        IndicatorValueFormat_percentage,
        new Formula(FormulaProcess_simple, NSi_4_1_1_Id, NSi_4_1_2_Id),
        null);

const NSi_4_2 = new IndicatorDefinition(
        NSi_4_2_Id,
        IndicatorValueFormat_percentage,
        new Formula(FormulaProcess_simple, NSi_4_2_1_Id, NSi_4_2_2_Id),
        null);

const NSi_4_3 = new IndicatorDefinition(
        NSi_4_3_Id,
        IndicatorValueFormat_percentage,
        new Formula(FormulaProcess_simple, NSi_4_3_1_Id, NSi_4_3_2_Id),
        null);

const NSi_4_4 = new IndicatorDefinition(
        NSi_4_4_Id,
        IndicatorValueFormat_percentage,
        new Formula(FormulaProcess_simple, NSi_4_4_1_Id, NSi_4_4_2_Id),
        null);

///////////////////////////////////////////////////////////////////////////////

const MDi_1_1 = new IndicatorDefinition(
        MDi_1_1_Id,
        IndicatorValueFormat_percentage,
        new Formula(FormulaProcess_simple, MDi_1_1_1_Id, DSi_1_1_Id),
        null);
const MDi_1_2 = new IndicatorDefinition(
        MDi_1_2_Id,
        IndicatorValueFormat_percentage,
        new Formula(FormulaProcess_simple, MDi_1_2_1_Id, DSi_1_2_Id),
        null);

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
    MDi_1_1,
    MDi_1_2,
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

///////////////////////////////////////////////////////////////////////////////

function MROfficialData(id, sessionId, url, countryCode, countryName, dumpDate, indicatorCollection) {
    this['id'] = id;
    this['sessionid'] = sessionId;
    this['url'] = url;
    this['countrycode'] = countryCode;
    this['countryname'] = countryName;
    this['dumpdate'] = dumpDate;
    this['indicators'] = indicatorCollection;
    this['validatorData'] = null;
}

///////////////////////////////////////////////////////////////////////////////

function MRValidatorSourceDataTypeStats() {
    this.dataset = null;
    this.series = null;
    this.service = null;
    this.unknown = null;
    this.missing = null;
    this.duplicate = null;
}
function MRValidatorSourceDataIdStats() {
    this.unknown = null;
    this.missing = null;
    this.duplicate = null;
}
function MRValidatorSourceDataValidationSummary() {
    this.pass = null;
    this.fail = null;
}
function MRValidatorSourceDataValidationStats() {
    this.dataset = new MRValidatorSourceDataValidationSummary();
    this.services = new MRValidatorSourceDataValidationSummary();
}
function MRValidatorSourceData() {
    this.id = null;
    this.type_count = new MRValidatorSourceDataTypeStats();
    this.type_ids = new MRValidatorSourceDataIdStats();
    this.validation = new MRValidatorSourceDataValidationStats();
}

///////////////////////////////////////////////////////////////////////////////

function produceIndicatorsAggregatedData(countryData, mrDataContainer) {
    let res = false;
    // initialise the main indicators aggregated data object
    let indAggregatedData = new MROfficialData();
    indAggregatedData.indicators = [];
    // initialize the sub validator aggregated data object
    indAggregatedData.validatorData = new MRValidatorSourceData();
    indAggregatedData.validatorData.id = null;

    // check availability of mrCountryData
    if (countryData && countryData.endpoints) {
        // cycle over the endpoints to extract data
        for (let endpointItem of countryData.endpoints) {
            if (endpointItem.currentEvaluationData !== null) {
                // get the already calculated indicators and aggregate
                if (endpointItem.currentEvaluationData.data !== null) {
                    let endpointData = endpointItem.currentEvaluationData.data;
                    for (let indDefItem of indicatorDefinitions) {
                        // scroll through our internal Indicator Definition ids, and check our aggregated data collection
                        // if id found, take the source data and increase the value of the sub-indicators
                        // if not found, it means it's the first time, so just add it
                        let indDefId = indDefItem.id;
                        let srcFoundInd = endpointData.indicators.find(({id}) => id === indDefId);
                        let dstFoundInd = indAggregatedData.indicators.find(({ id }) => id === indDefId);
                        if (srcFoundInd) {
                            if (dstFoundInd) {
                                // go to the source data, iterate and add the matching values
                                for (let srcDataItem in srcFoundInd.sourceData) {
                                    //console.log(srcDataItem);
                                    if (srcFoundInd.sourceData[srcDataItem]) {
                                        let endpointSubIndVal = srcFoundInd.sourceData[srcDataItem].doc_count;
                                        if (endpointSubIndVal !== undefined && endpointSubIndVal !== null) {
                                            dstFoundInd.sourceData[srcDataItem].doc_count += endpointSubIndVal;
                                        }
                                    }
                                }
                            } else {
                                // create a new indicator as cloned obj
                                let clonedIndDataObj = JSON.parse(JSON.stringify(srcFoundInd));
                                // clean up some value to default
                                clonedIndDataObj.formattedData = null;
                                clonedIndDataObj.formattedValue = null;
                                clonedIndDataObj.value = null;
                                // push
                                indAggregatedData.indicators.push(clonedIndDataObj);
                            }
                        } else {
                            console.warning("Cannot retrieve source data for the following indicator: " + indDefId);
                        }
                    }
                }

                // then get also the validator source data and aggregate
                if (endpointItem.currentEvaluationData.valDataSource) {
                    let srcValData = endpointItem.currentEvaluationData.valDataSource;
                    let dstValData = indAggregatedData.validatorData;
                    if (srcValData.type_count){
                        if (srcValData.type_count.dataset !== null) {
                            dstValData.type_count.dataset += srcValData.type_count.dataset;
                        }
                        if (srcValData.type_count.series !== null) {
                            dstValData.type_count.series += srcValData.type_count.series;
                        }
                        if (srcValData.type_count.service !== null) {
                            dstValData.type_count.service += srcValData.type_count.service;
                        }
                        // TODO for now, skipping unused values
                    }
                    if (srcValData.type_ids) {
                        // TODO for now, skipping unused values
                    }
                    if (srcValData.validation
                            && srcValData.validation.dataset
                            && srcValData.validation.services) {
                        dstValData.validation.dataset.pass += srcValData.validation.dataset.pass;
                        dstValData.validation.dataset.fail += srcValData.validation.dataset.fail;
                        dstValData.validation.services.pass += srcValData.validation.services.pass;
                        dstValData.validation.services.fail += srcValData.validation.services.fail;
                    }
                }
            }
        }

        if (indAggregatedData.indicators.length > 0) {
            // something has been collected, need to be processed and accumulated in the definitions
            processIndicatorsAggregatedData(indAggregatedData);
            // transform back from the definition to the results
            indAggregatedData.indicators = generateResultsData();
            // then store in the container
            mrDataContainer.data = indAggregatedData;
            res = true;
        }
    }

    return res;
}

function processIndicatorsAggregatedData(indAggregatedData) {
    if (indAggregatedData && indAggregatedData.indicators) {
        for (let indDefItem of indicatorDefinitions) {
            let indDefId = indDefItem.id;
            let foundIndData = indAggregatedData.indicators.find(({ id }) => id === indDefId);

            processIndicator(indDefItem, foundIndData.sourceData);
        }
    }
}

function processIndicator(indicatorDef, dataBucket) {
    if (indicatorDef) {
        let iId = indicatorDef.id;
//        let iIdRating = indicatorDef.id + starRating_idSuffix;
        // retrieve the subfacet elements
//        let subBucket = dataBucket[iId].buckets; // TO FIX if null?
        let subBucket = dataBucket;

        let srcXValue = null;
        let srcYValue = null;
        let computedValue = null;
        let computedUnit = '';
        let computedValueFixed = IND_FORMATTED_VALUE_DEFAULT_FIXED_DECIMALS;

        if (indicatorDef.formula && indicatorDef.formula.type) {
            switch (indicatorDef.formula.type) {
                case FormulaProcess_identity:
                    // take directly the subfacet item
                    if (subBucket && subBucket[iId]) {
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

                    if (subBucket && xId && yId && subBucket[xId] && subBucket[yId]) {
                        //srcXValue = subBucket[xId].count;
                        //srcYValue = subBucket[yId].count;
                        srcXValue = subBucket[xId].doc_count;
                        srcYValue = subBucket[yId].doc_count;
                        if (indicatorDef.format === IndicatorValueFormat_percentage) {
                            computedValue = calculatePercentage(srcXValue, srcYValue);
                            // enable it to manage null values, replaced with 0
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
                            // enable it to manage null values, replaced with 0
                            //computedValue = (computedValue === null) ? 0 : computedValue;
                            computedUnit = IND_FORMATTED_VALUE_PERCENTAGE_UNIT;
                            computedValueFixed = IND_FORMATTED_VALUE_PERCENTAGE_FIXED_DECIMALS;
                        }
                    }
                    break;
            }
        }

        indicatorDef.value = computedValue;
        // store also source data
        indicatorDef.sourceDataCollection = subBucket;

        // generated formatted value from a valid number
        if (computedValue !== null && computedValue !== undefined) {
            indicatorDef.formattedValue = computedValue.toFixed(computedValueFixed) + computedUnit;
        } else {
            indicatorDef.formattedValue = IND_FORMATTED_VALUE_NULL_VALUE_EXPLAIN;
        }
//
//        // write results on page
//        if (indicatorDef.formattedValue) {
//            let htmlRating = generateHTMLRating(computedValue, indicatorDef.formattedValue);
//            $("#" + iId).html(indicatorDef.formattedValue);
//            $("#" + iIdRating).html(htmlRating);
//        }
//        // Increase the counter of calculated indicators and
//        // check if the download buttons can be enabled
//        handleDownloadButtons();
    }
}


function generateResultsData() {
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

    return resultCollection;
}
