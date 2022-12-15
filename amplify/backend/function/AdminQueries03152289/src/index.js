"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var aws_serverless_express_1 = __importDefault(require("aws-serverless-express"));
var app_1 = __importDefault(require("./app"));
var server = aws_serverless_express_1["default"].createServer(app_1["default"]);
exports.handler = function (event, context) {
    console.log("EVENT: ".concat(JSON.stringify(event)));
    aws_serverless_express_1["default"].proxy(server, event, context);
};
