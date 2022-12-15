"use strict";
/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["GOOGLE_API_KEY","NOAA_TOKEN","NOAA_TOKEN_BACKUP"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var middleware_1 = __importDefault(require("aws-serverless-express/middleware"));
var AWS = __importStar(require("aws-sdk"));
var GrowingCalculations_1 = require("./utilities/GrowingCalculations");
// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
// declare a new express app
var app = (0, express_1["default"])();
app.use(body_parser_1["default"].json());
app.use(middleware_1["default"].eventContext());
// Enable CORS for all methods
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept'
    ]);
    next();
});
app.post('/growingParams', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var Parameters, GOOGLE_API_KEY, NOAA_TOKEN, NOAA_TOKEN_BACKUP, _a, zipcode, street, city, state, _b, hardinessZone, firstGdd45, lastGdd45, growingSeasonLength, err_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, new AWS.SSM({ region: 'us-east-1' })
                            .getParameters({
                            Names: ['GOOGLE_API_KEY', 'NOAA_TOKEN', 'NOAA_TOKEN_BACKUP'].map(function (secretName) { return process.env[secretName]; }),
                            WithDecryption: true
                        })
                            .promise()];
                case 1:
                    Parameters = (_c.sent()).Parameters;
                    GOOGLE_API_KEY = Parameters[0], NOAA_TOKEN = Parameters[1], NOAA_TOKEN_BACKUP = Parameters[2];
                    _a = req.body, zipcode = _a.zipcode, street = _a.street, city = _a.city, state = _a.state;
                    return [4 /*yield*/, new GrowingCalculations_1.GrowingCalculations(zipcode, street, city, state, GOOGLE_API_KEY.Value, NOAA_TOKEN.Value, NOAA_TOKEN_BACKUP.Value).calculateGrowingParams()];
                case 2:
                    _b = _c.sent(), hardinessZone = _b.hardinessZone, firstGdd45 = _b.firstGdd45, lastGdd45 = _b.lastGdd45, growingSeasonLength = _b.growingSeasonLength;
                    // Add your code here
                    res.status(200).send({
                        hardinessZone: hardinessZone,
                        firstGdd45: firstGdd45,
                        lastGdd45: lastGdd45,
                        growingSeasonLength: growingSeasonLength
                    });
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _c.sent();
                    next(err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
});
// Error middleware must be defined last
app.use(function (err, _req, res, _next) {
    console.error(err.message);
    if (!err.statusCode)
        err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
    res.status(err.statusCode).json({ message: err.message }).end();
});
app.listen(3000, function () {
    console.log('App started');
});
exports["default"] = app;
