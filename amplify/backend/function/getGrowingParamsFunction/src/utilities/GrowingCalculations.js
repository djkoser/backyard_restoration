"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.GrowingCalculations = void 0;
var node_fetch_1 = __importDefault(require("node-fetch"));
// import { readFileSync } from 'fs';
// import { join } from 'path';
var GrowingCalculations = /** @class */ (function () {
    /**
     *
     * @param zipcode The User's zipcode
     * @param street The User's street
     * @param city The user's city
     * @param state The user's state
     */
    function GrowingCalculations(zipcode, street, city, state, GOOGLE_API_KEY, NOAA_TOKEN, NOAA_TOKEN_BACKUP) {
        // The number of km to increase the bounding box by with each expanding area search for weather towers with data
        this.boundingBoxGrowFactor = 5;
        // Total number of years of temperature data to work with
        this.numberOfYearsToRetrieve = 15;
        // The side of the bonding box (in km) surrounding the user's location in which to search for weather stations
        this.boundingBoxSide = 10;
        // The number of days to look before and after a date to determine if the date represents a season start or end
        this.leadingLaggingDays = 40;
        // The minimum percentage of leading days with non-zero (season start) or zero (season end) growing degree days in order to qualify it as a season start/end.
        this.minimumSeasonStartQualifierPercentage = 0.9;
        // The minimum percentage of leading days with non-zero (season start) or zero (season end) growing degree days in order to qualify it as a season start/end.
        this.minimumSeasonEndQualifierPercentage = 0.9;
        // The maximum percentage of lagging days with zero (season start) or non-zero (season end) growing degree days in order to qualify it as a season start/end.
        this.maximumLagQualifierPercentage = 0.2;
        this.zipcode = zipcode;
        this.street = street;
        this.city = city;
        this.state = state;
        this.currentDate = new Date();
        this.GOOGLE_API_KEY = GOOGLE_API_KEY;
        this.NOAA_TOKEN = NOAA_TOKEN;
        this.NOAA_TOKEN_BACKUP = NOAA_TOKEN_BACKUP;
    }
    /** An initializer that makes all necessary API calls and calculates all requisite growing parameters pertaining to the user's location*/
    GrowingCalculations.prototype.calculateGrowingParams = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, TMIN, TMAX, TMINAvg, seasonStarts, seasonEnds, dateParser, firstGdd45, lastGdd45;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.retrieveAPIData()];
                    case 1:
                        _a = _b.sent(), TMIN = _a.TMIN, TMAX = _a.TMAX;
                        // writeFileSync(join(__dirname, 'TMIN.json'), JSON.stringify(TMIN));
                        // writeFileSync(join(__dirname, 'TMAX.json'), JSON.stringify(TMAX));
                        // let TMIN = JSON.parse(readFileSync(join(__dirname, 'TMIN.json')).toString());
                        // let TMAX = JSON.parse(readFileSync(join(__dirname, 'TMAX.json')).toString());
                        // Clean the data
                        TMAX = this.selectHighestDuplicates(TMAX);
                        TMIN = this.selectLowestDuplicates(TMIN);
                        this.sortTMINTMAX(TMIN, TMAX);
                        // Create an observation_date -> {TMIN, TMAX, GDD } map using filtered for season starts and ends calculation
                        this.mapTMINTMAX(TMIN, TMAX);
                        TMINAvg = this.getLowestTemperature(TMIN);
                        seasonStarts = this.removeOutliersFromDates(this.gdd45SpringTransitions());
                        seasonEnds = this.removeOutliersFromDates(this.gdd45WinterTransitions());
                        dateParser = /\d\d-\d\d$/;
                        firstGdd45 = this.avgDateString(seasonStarts).match(dateParser)[0];
                        lastGdd45 = this.avgDateString(seasonEnds).match(dateParser)[0];
                        return [2 /*return*/, {
                                hardinessZone: this.hardinessZoneCalculator(TMINAvg),
                                firstGdd45: firstGdd45,
                                lastGdd45: lastGdd45,
                                growingSeasonLength: Math.round(this.averageSeasonLength(lastGdd45, firstGdd45))
                            }];
                }
            });
        });
    };
    GrowingCalculations.prototype.removeOutliersFromDates = function (dates) {
        var values = dates.map(function (dateString) { return new Date(dateString).getTime(); });
        values.sort(function (a, b) { return a - b; });
        /* Then find a generous IQR. This is generous because if (values.length / 4)
         * is not an int, then really you should average the two elements on either
         * side to find q1.
         */
        var q1 = values[Math.floor(values.length / 4)];
        // Likewise for q3.
        var q3 = values[Math.ceil(values.length * (3 / 4))];
        // Then find min and max values
        var maxValue = q3;
        var minValue = q1;
        // Then filter anything beyond or beneath these values.
        return values
            .filter(function (x) {
            return x < maxValue && x > minValue;
        })
            .map(function (number) { return new Date(number); });
    };
    GrowingCalculations.prototype.gdd45SpringTransitions = function () {
        var _this = this;
        var gdd45SpringTransitionDates = [];
        if (this.tminMaxMap)
            this.tminMaxMap.forEach(function (value, key) {
                var lagNonZeroGDDP = value.lagNonZeroGDDP, leadNonZeroGDDP = value.leadNonZeroGDDP, GDD = value.GDD;
                // spring transitions are defined as days of positive GDD in which the percentage of lagging non-zero growing degree days is less than the maximumSeasonStartQualifierPercentage and the percentage of leading non-zero growing degree days is greater than the minimumSeasonStartQualifierPercentage;
                if (lagNonZeroGDDP !== undefined &&
                    leadNonZeroGDDP !== undefined &&
                    GDD !== undefined &&
                    GDD > 0 &&
                    lagNonZeroGDDP <= _this.maximumLagQualifierPercentage &&
                    leadNonZeroGDDP >= _this.minimumSeasonStartQualifierPercentage) {
                    gdd45SpringTransitionDates.push(new Date(key));
                }
            });
        gdd45SpringTransitionDates.forEach(function (date) {
            return date.setFullYear(_this.currentDate.getFullYear());
        });
        return gdd45SpringTransitionDates;
    };
    GrowingCalculations.prototype.gdd45WinterTransitions = function () {
        var _this = this;
        var gdd45WinterTransitions = [];
        if (this.tminMaxMap)
            this.tminMaxMap.forEach(function (value, key) {
                var lagZeroGDDP = value.lagZeroGDDP, leadZeroGDDP = value.leadZeroGDDP, GDD = value.GDD;
                // winter transitions are defined as days of 0 GDD in which the percentage of lagging zero growing degree days is less than the maximumSeasonStartQualifierPercentage and the percentage of leading zero growing degree days is greater than the minimumSeasonStartQualifierPercentage;
                if (lagZeroGDDP !== undefined &&
                    leadZeroGDDP !== undefined &&
                    GDD !== undefined &&
                    GDD > 0 &&
                    lagZeroGDDP <= _this.maximumLagQualifierPercentage &&
                    leadZeroGDDP >= _this.minimumSeasonEndQualifierPercentage) {
                    gdd45WinterTransitions.push(new Date(key));
                }
            });
        gdd45WinterTransitions.forEach(function (date) {
            return date.setFullYear(_this.currentDate.getFullYear());
        });
        return gdd45WinterTransitions;
    };
    /** Determines the average lowest annual temperature */
    GrowingCalculations.prototype.getLowestTemperature = function (TMIN) {
        return TMIN.reduce(function (lowestTemp, tminObs) {
            return tminObs.temperature < lowestTemp ? tminObs.temperature : lowestTemp;
        }, 9999);
    };
    /** Return the GDD values from the leading and lagging observation dates
     * @param observationDate the date in which to determine leading and lagging GDD values
     */
    GrowingCalculations.prototype.getLeadAndLagGDDs = function (observationDate) {
        var _this = this;
        var currentLeadDate = new Date(observationDate);
        var currentLagDate = new Date(observationDate);
        // generate observation dates to search for
        var leadingObservationDates = [];
        var laggingObservationDates = [];
        for (var index = this.leadingLaggingDays; index > 0; index--) {
            currentLeadDate.setDate(currentLeadDate.getDate() + 1);
            currentLagDate.setDate(currentLagDate.getDate() - 1);
            leadingObservationDates.push(this.date2String(currentLeadDate));
            laggingObservationDates.push(this.date2String(currentLagDate));
        }
        return {
            leadGDDs: leadingObservationDates
                .map(function (obsDate) {
                var mapValue = _this.tminMaxMap
                    ? _this.tminMaxMap.get(obsDate)
                    : undefined;
                return mapValue ? mapValue.GDD : undefined;
            })
                .filter(function (gdd) { return typeof gdd === 'number'; }),
            lagGDDs: laggingObservationDates
                .map(function (obsDate) {
                var mapValue = _this.tminMaxMap
                    ? _this.tminMaxMap.get(obsDate)
                    : undefined;
                return mapValue ? mapValue.GDD : undefined;
            })
                .filter(function (gdd) { return typeof gdd === 'number'; })
        };
    };
    /** Maps sorted TMIN and TMAX objects to observation_date map keys, discarding any observation dates that are missing either TMIN or TMAX, calculates the GDD for that day and determines the percentage of leading and lagging days with and without non-zero GDD
     * @param TMIN Minimum temperature data returned from the api calls
     * @param TMAX Maximum temperature data return from the api calls
     */
    GrowingCalculations.prototype.mapTMINTMAX = function (TMIN, TMAX) {
        var _this = this;
        this.tminMaxMap = new Map();
        TMIN.forEach(function (_a) {
            var _b;
            var temperature = _a.temperature, observation_date = _a.observation_date;
            var observationDateParsed = ((_b = observation_date.match(/\d\d\d\d-\d\d-\d\d/)) === null || _b === void 0 ? void 0 : _b[0]) || '';
            if (_this.tminMaxMap)
                _this.tminMaxMap.set(observationDateParsed, { TMIN: temperature });
        });
        TMAX.forEach(function (_a) {
            var _b;
            var temperature = _a.temperature, observation_date = _a.observation_date;
            var observationDateParsed = ((_b = observation_date.match(/\d\d\d\d-\d\d-\d\d/)) === null || _b === void 0 ? void 0 : _b[0]) || '';
            if (_this.tminMaxMap && _this.tminMaxMap.has(observationDateParsed)) {
                var existing = _this.tminMaxMap.get(observationDateParsed);
                existing.TMAX = temperature;
                existing.GDD = _this.calculateGDD45(existing.TMAX, existing.TMIN);
            }
        });
        if (this.tminMaxMap)
            this.tminMaxMap.forEach(function (value, key) {
                var _a = _this.getLeadAndLagGDDs(key), lagGDDs = _a.lagGDDs, leadGDDs = _a.leadGDDs;
                value.lagNonZeroGDDP = lagGDDs.length
                    ? lagGDDs.reduce(function (count, gdd) { return (gdd > 0 ? count + 1 : count); }, 0) /
                        lagGDDs.length
                    : undefined;
                value.lagZeroGDDP = lagGDDs.length
                    ? lagGDDs.reduce(function (count, gdd) { return (gdd <= 0 ? count + 1 : count); }, 0) /
                        lagGDDs.length
                    : undefined;
                value.leadNonZeroGDDP = leadGDDs.length
                    ? leadGDDs.reduce(function (count, gdd) { return (gdd > 0 ? count + 1 : count); }, 0) /
                        leadGDDs.length
                    : undefined;
                value.leadZeroGDDP = leadGDDs.length
                    ? leadGDDs.reduce(function (count, gdd) { return (gdd <= 0 ? count + 1 : count); }, 0) /
                        leadGDDs.length
                    : undefined;
            });
    };
    /** Sorts TMIN and TMAX data ascending by date */
    GrowingCalculations.prototype.sortTMINTMAX = function (TMIN, TMAX) {
        TMAX.sort(function (tempObjectA, tempObjectB) {
            return new Date(tempObjectA.observation_date).getTime() -
                new Date(tempObjectB.observation_date).getTime();
        });
        TMIN.sort(function (tempObjectA, tempObjectB) {
            return new Date(tempObjectA.observation_date).getTime() -
                new Date(tempObjectB.observation_date).getTime();
        });
    };
    /** Utility function to calculate GDD45
     * @param tmax - maximum temperature for that day
     * @param tmin - minimum temperature for that day
     */
    GrowingCalculations.prototype.calculateGDD45 = function (tmax, tmin) {
        return (tmax + tmin) / 2 - 45;
    };
    /** Gets TMIN and TMAX data from the closest weather stations relative to the user's location
     *
     */
    GrowingCalculations.prototype.retrieveAPIData = function () {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var googleResult, googleResults, lat, lng, searchHalfSide, coordinateArray, coordinateString, apiOutputs;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.convertAddressToCoordinate()];
                    case 1:
                        googleResult = _d.sent();
                        googleResults = (_c = (_b = (_a = googleResult.results) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.geometry) === null || _c === void 0 ? void 0 : _c.location;
                        if (googleResults === undefined)
                            throw new Error("retrieveAPIData: lat and lng could not be obtained from the user's address via Google Maps");
                        lat = googleResults.lat, lng = googleResults.lng;
                        searchHalfSide = this.boundingBoxSide / 2;
                        coordinateArray = this.boundingBox(lat, lng, searchHalfSide);
                        coordinateString = coordinateArray.join(',');
                        return [4 /*yield*/, this.returnResultsFromFirstStationWithData(coordinateString)];
                    case 2:
                        apiOutputs = _d.sent();
                        _d.label = 3;
                    case 3:
                        if (!!apiOutputs) return [3 /*break*/, 6];
                        searchHalfSide += this.boundingBoxGrowFactor / 2;
                        coordinateArray = this.boundingBox(lat, lng, searchHalfSide);
                        coordinateString = coordinateArray.join(',');
                        return [4 /*yield*/, this.returnResultsFromFirstStationWithData(coordinateString)];
                    case 4:
                        apiOutputs = _d.sent();
                        return [4 /*yield*/, this.delay(300)];
                    case 5:
                        _d.sent();
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/, apiOutputs.reduce(function (apiOutputAcc, currentOutput) {
                            return {
                                TMIN: __spreadArray(__spreadArray([], apiOutputAcc.TMIN, true), currentOutput.TMIN, true),
                                TMAX: __spreadArray(__spreadArray([], apiOutputAcc.TMAX, true), currentOutput.TMAX, true)
                            };
                        }, { TMIN: [], TMAX: [] })];
                }
            });
        });
    };
    /** Get weather data for the user's location over the prescribed time from from NOAA
     * @param endDate string in YYYY-MM-DD format representing the end time-frame of the weather inquiry
     * @param startDate string in YYYY-MM-DD format representing the start time-frame of the weather data query
     * @param stationID ID of the station to retrieve data from
     */
    GrowingCalculations.prototype.getTMINandTMAXFromNOAA = function (endDate, startDate, stationID) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, TMAX_1, TMIN_1, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, (0, node_fetch_1["default"])("https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&datatypeid=TMIN&datatypeid=TMAX&units=standard&limit=1000&startdate=".concat(startDate, "&enddate=").concat(endDate, "&stationid=").concat(stationID, "&includemetadata=false"), { method: 'get', headers: { token: this.NOAA_TOKEN } })];
                    case 1:
                        response = _b.sent();
                        if (!(response.status === 429)) return [3 /*break*/, 3];
                        console.warn('Exceeded query limit, using backup token');
                        return [4 /*yield*/, (0, node_fetch_1["default"])("https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&datatypeid=TMIN&datatypeid=TMAX&units=standard&limit=1000&startdate=".concat(startDate, "&enddate=").concat(endDate, "&stationid=").concat(stationID, "&includemetadata=false"), {
                                method: 'get',
                                headers: { token: this.NOAA_TOKEN_BACKUP }
                            })];
                    case 2:
                        response = _b.sent();
                        _b.label = 3;
                    case 3: return [4 /*yield*/, response.json()];
                    case 4:
                        data = (_b.sent());
                        TMAX_1 = [];
                        TMIN_1 = [];
                        if (typeof ((_a = data === null || data === void 0 ? void 0 : data.results) === null || _a === void 0 ? void 0 : _a.forEach) === 'function')
                            data.results.forEach(function (el) {
                                if (el.datatype.toLowerCase() === 'tmin') {
                                    TMIN_1.push({ temperature: el.value, observation_date: el.date });
                                }
                                else if (el.datatype.toLocaleLowerCase() === 'tmax') {
                                    TMAX_1.push({ temperature: el.value, observation_date: el.date });
                                }
                            });
                        return [2 /*return*/, { TMIN: TMIN_1, TMAX: TMAX_1 }];
                    case 5:
                        err_1 = _b.sent();
                        console.warn("Unable to get temperature data for start date: ".concat(startDate, " and end date: ").concat(endDate, " due to the following error: ").concat(err_1 instanceof Error ? err_1.message : JSON.stringify(err_1), ", proceeding..."));
                        return [2 /*return*/, { TMIN: [], TMAX: [] }];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /** Gets Stations within a bounding box around the user's location, and returns historical data from the first suitable location or undefined.
     * @param coordinateString WGS84 coordinate string representing the bounding box around the user's location location
     */
    GrowingCalculations.prototype.returnResultsFromFirstStationWithData = function (coordinateString) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var ed, edString, sd, sdString, stationList, stationIndex, tempData, promises, yearIndex;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        ed = new Date(this.currentDate.getFullYear() - 1, 12, 0);
                        edString = this.date2String(ed);
                        sd = this.less1Year(new Date(this.currentDate.getFullYear() - 1, 12, 0));
                        sdString = this.date2String(sd);
                        return [4 /*yield*/, this.getStationList(coordinateString)];
                    case 1:
                        stationList = _c.sent();
                        if (!stationList.results) return [3 /*break*/, 10];
                        stationIndex = 0;
                        _c.label = 2;
                    case 2:
                        if (!(stationIndex < stationList.results.length)) return [3 /*break*/, 10];
                        if (!((_b = (_a = stationList.results) === null || _a === void 0 ? void 0 : _a[stationIndex]) === null || _b === void 0 ? void 0 : _b.id)) {
                            console.warn("returnResultsFromFirstStationWithData: station at index ".concat(stationIndex, " does not contain an ID, continuing to the next ->"));
                            return [3 /*break*/, 9];
                        }
                        return [4 /*yield*/, this.getTMINandTMAXFromNOAA(edString, sdString, stationList.results[stationIndex].id)];
                    case 3:
                        tempData = _c.sent();
                        if (!(tempData.TMAX.length && tempData.TMIN.length)) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.delay(300)];
                    case 4:
                        _c.sent();
                        promises = [];
                        yearIndex = 0;
                        _c.label = 5;
                    case 5:
                        if (!(yearIndex < this.numberOfYearsToRetrieve)) return [3 /*break*/, 8];
                        promises.push(this.getTMINandTMAXFromNOAA(edString, sdString, stationList.results[stationIndex].id));
                        sd = this.less1Year(sd);
                        ed = this.less1Year(ed);
                        ed.setDate(ed.getDate() - 1);
                        edString = this.date2String(ed);
                        sdString = this.date2String(sd);
                        return [4 /*yield*/, this.delay(300)];
                    case 6:
                        _c.sent();
                        _c.label = 7;
                    case 7:
                        yearIndex++;
                        return [3 /*break*/, 5];
                    case 8: return [2 /*return*/, Promise.all(promises)];
                    case 9:
                        stationIndex++;
                        return [3 /*break*/, 2];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Filter out the lower TMAX values (if multiple present on same day) out of the data if present
     * @param TMAX TMAX data returned from the API calls
     */
    GrowingCalculations.prototype.selectHighestDuplicates = function (TMAX) {
        var observationDateMap = {};
        TMAX.forEach(function (obsTmax) {
            var observation_date = obsTmax.observation_date, temperature = obsTmax.temperature;
            if (observationDateMap[observation_date] !== undefined) {
                var existing = observationDateMap[observation_date];
                if (temperature > existing) {
                    observationDateMap[observation_date] = temperature;
                }
            }
            else {
                observationDateMap[observation_date] = temperature;
            }
        });
        // eslint-disable-next-line @typescript-eslint/naming-convention
        return Object.entries(observationDateMap).map(function (_a) {
            var observation_date = _a[0], temperature = _a[1];
            return { observation_date: observation_date, temperature: temperature };
        });
    };
    /**
     * Filter out the the higher TMIN values (if multiple present on same day) out of the data if present
     * @param TMIN TMIN data returned from the API calls
  
     */
    GrowingCalculations.prototype.selectLowestDuplicates = function (TMIN) {
        var observationDateMap = {};
        TMIN.forEach(function (obsTmin) {
            var observation_date = obsTmin.observation_date, temperature = obsTmin.temperature;
            if (observationDateMap[observation_date] !== undefined) {
                var existing = observationDateMap[observation_date];
                if (temperature < existing) {
                    observationDateMap[observation_date] = temperature;
                }
            }
            else {
                observationDateMap[observation_date] = temperature;
            }
        });
        // eslint-disable-next-line @typescript-eslint/naming-convention
        return Object.entries(observationDateMap).map(function (_a) {
            var observation_date = _a[0], temperature = _a[1];
            return { observation_date: observation_date, temperature: temperature };
        });
    };
    /** Get the user's location coordinates via Google maps */
    GrowingCalculations.prototype.convertAddressToCoordinate = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, node_fetch_1["default"])("https://maps.googleapis.com/maps/api/geocode/json?address=".concat(encodeURI(this.street + '+' + this.city + '+' + this.state + '+' + this.zipcode), "&key=").concat(this.GOOGLE_API_KEY), { method: 'get' })];
                    case 1: return [2 /*return*/, (_a.sent()).json()];
                }
            });
        });
    };
    /** Get the list of stations within a prescribed bounding box
     * @param boundingBox a string representing the box from which to pull towers
     */
    GrowingCalculations.prototype.getStationList = function (boundingBox) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, node_fetch_1["default"])("https://www.ncdc.noaa.gov/cdo-web/api/v2/stations?extent=".concat(boundingBox, "&dataset=GHCND&datatypeid=TMIN&datatypeid=TMAX&limit=1000"), { headers: { token: this.NOAA_TOKEN }, method: 'get' })];
                    case 1:
                        response = _a.sent();
                        if (!(response.status === 429)) return [3 /*break*/, 3];
                        console.warn('exceeded query limit, using backup token');
                        return [4 /*yield*/, (0, node_fetch_1["default"])("https://www.ncdc.noaa.gov/cdo-web/api/v2/stations?extent=".concat(boundingBox, "&dataset=GHCND&datatypeid=TMIN&datatypeid=TMAX&limit=1000"), { headers: { token: this.NOAA_TOKEN_BACKUP }, method: 'get' })];
                    case 2:
                        response = _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, response.json()];
                }
            });
        });
    };
    /** Calculate the hardiness revealed by the maximum and minimum temperature data
     * @param averageTMIN the average minimum yearly temperature
     * @param averageTMAX the average maximum yearly temperature
     */
    GrowingCalculations.prototype.hardinessZoneCalculator = function (averageTMIN) {
        var zoneMap = [
            { low: -60, high: -55, zone: '1a' },
            { low: -55, high: -50, zone: '1b' },
            { low: -50, high: -45, zone: '2a' },
            { low: -45, high: -40, zone: '2b' },
            { low: -40, high: -35, zone: '3a' },
            { low: -35, high: -30, zone: '3b' },
            { low: -30, high: -25, zone: '4a' },
            { low: -25, high: -20, zone: '4b' },
            { low: -20, high: -15, zone: '5a' },
            { low: -15, high: -10, zone: '5b' },
            { low: -10, high: -5, zone: '6a' },
            { low: -5, high: 0, zone: '6b' },
            { low: 0, high: 5, zone: '7a' },
            { low: 5, high: 10, zone: '7b' },
            { low: 10, high: 15, zone: '8a' },
            { low: 15, high: 20, zone: '8b' },
            { low: 20, high: 25, zone: '9a' },
            { low: 25, high: 30, zone: '9b' },
            { low: 30, high: 35, zone: '10a' },
            { low: 35, high: 40, zone: '10b' },
            { low: 40, high: 45, zone: '11a' },
            { low: 45, high: 50, zone: '11b' },
            { low: 50, high: 55, zone: '12a' },
            { low: 55, high: 60, zone: '12b' },
            { low: 60, high: 65, zone: '13a' },
            { low: 65, high: 70, zone: '13b' }
        ];
        for (var i = 0; i < zoneMap.length; i++) {
            if (averageTMIN >= zoneMap[i].low && averageTMIN <= zoneMap[i].high) {
                return zoneMap[i].zone;
            }
        }
        return '';
    };
    /** Converts degrees to radians */
    GrowingCalculations.prototype.deg2rad = function (degrees) {
        return (Math.PI * degrees) / 180.0;
    };
    /** converts radians to degrees */
    GrowingCalculations.prototype.rad2deg = function (radians) {
        return (180.0 * radians) / Math.PI;
    };
    /** Determines the Earth's Radius at a given latitude according to WGS84 ellipsoid (what Google Maps uses)
     *
     * @param lat input latitude at which to determine the radius of the earth
     */
    GrowingCalculations.prototype.WGS84EarthRadius = function (lat) {
        // Semi - axes of WGS - 84 geoidal reference # Major semiaxis[m]
        var WGS84_a = 6378137.0;
        var WGS84_b = 6356752.3;
        // # http://en.wikipedia.org/wiki/Earth_radius
        var An = WGS84_a * WGS84_a * Math.cos(lat);
        var Bn = WGS84_b * WGS84_b * Math.sin(lat);
        var Ad = WGS84_a * Math.cos(lat);
        var Bd = WGS84_b * Math.sin(lat);
        return Math.sqrt((An * An + Bn * Bn) / (Ad * Ad + Bd * Bd));
    };
    /**Creates a bounding box from from a lat/long coordinate -> will be used for gathering a list of weather stations surrounding the user's lat-long -> from stack overflow, courtesy of Federico A Rampnoni (converted by me from Python). This assumes assumes local approximation of the Earth surface as a sphere with a radius given by WGS84. The default half side  is set high on purpose due to many stations not making data available on API
     *
     * @param latitudeInDegrees The longitude at the user's location
     * @param longitudeInDegrees The latitude at the user's location
     * @param halfSideInKm The number of kilometers representing half the side of the bounding box -> set high due to many stations keeping data from api
     */
    GrowingCalculations.prototype.boundingBox = function (latitudeInDegrees, longitudeInDegrees, halfSideInKm) {
        var lat = this.deg2rad(latitudeInDegrees);
        var lon = this.deg2rad(longitudeInDegrees);
        var halfSide = 1000 * halfSideInKm;
        // # Radius of Earth at given latitude
        var radius = this.WGS84EarthRadius(lat);
        // # Radius of the parallel at given latitude
        var pradius = radius * Math.cos(lat);
        var latMin = lat - halfSide / radius;
        var latMax = lat + halfSide / radius;
        var lonMin = lon - halfSide / pradius;
        var lonMax = lon + halfSide / pradius;
        return [
            this.rad2deg(latMin),
            this.rad2deg(lonMin),
            this.rad2deg(latMax),
            this.rad2deg(lonMax)
        ];
    };
    /** Stock promisified setTimeout for delaying calls to NOAA
     * @param interval the delay period in ms
     */
    GrowingCalculations.prototype.delay = function (interval) {
        return new Promise(function (resolve) { return setTimeout(resolve, interval); });
    };
    /** Converts date object to yyyy-mm-dd format */
    GrowingCalculations.prototype.date2String = function (dateParam) {
        if (dateParam === void 0) { dateParam = new Date(); }
        return "".concat(dateParam.getFullYear(), "-").concat(('0' +
            (dateParam.getMonth() + 1)).slice(-2), "-").concat(('0' + dateParam.getDate()).slice(-2));
    };
    /** Subtracts one year from the passed-in date and returns a new date object */
    GrowingCalculations.prototype.less1Year = function (dateObject) {
        return new Date(dateObject.setFullYear(dateObject.getFullYear() - 1));
    };
    /** Computes the average date from a list of dates and returns it as YYYY-MM-DD
     * @param seasonStartsEnds an array of Date objects normalized to the current year
     */
    GrowingCalculations.prototype.avgDateString = function (seasonStartsEnds) {
        if (seasonStartsEnds.length) {
            // convert to milliseconds
            var datesAsMs = seasonStartsEnds.map(function (el) { return el.getTime(); });
            // Sum and divide by normalized Dates' length creating a new date
            var averageDate = new Date(datesAsMs.reduce(function (prev, next) { return prev + next; }) / seasonStartsEnds.length);
            return this.date2String(averageDate);
        }
        else {
            throw new Error('avgDateString: seasonStartsEnds must contain at least one Date');
        }
    };
    /** Compute the average season length given start dates and end dates */
    GrowingCalculations.prototype.averageSeasonLength = function (averageSeasonEndString, averageSeasonStartString) {
        return ((new Date(averageSeasonEndString).getTime() -
            new Date(averageSeasonStartString).getTime()) /
            1000 /
            60 /
            60 /
            24);
    };
    return GrowingCalculations;
}());
exports.GrowingCalculations = GrowingCalculations;
