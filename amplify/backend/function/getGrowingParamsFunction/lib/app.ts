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

import express from 'express';
import bodyParser from 'body-parser';
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';
import * as AWS from 'aws-sdk';
import { GrowingCalculations } from './utilities/GrowingCalculations';

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (request, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', '*');
  //intercept the OPTIONS call so we don't double up on calls to the integration
  if ('OPTIONS' === request.method) {
    res.send(200);
  } else {
    next();
  }
});

app.post('/growingParams', async function (req, res, next) {
  try {
    const { Parameters } = await new AWS.SSM({ region: 'us-east-1' })
      .getParameters({
        Names: ['GOOGLE_API_KEY', 'NOAA_TOKEN', 'NOAA_TOKEN_BACKUP'].map(
          (secretName) => process.env![secretName]!
        ),
        WithDecryption: true
      })
      .promise();
    const [GOOGLE_API_KEY, NOAA_TOKEN, NOAA_TOKEN_BACKUP] = Parameters;
    const { zipcode, street, city, state } = req.body;
    const { hardinessZone, firstGdd45, lastGdd45, growingSeasonLength } =
      await new GrowingCalculations(
        zipcode,
        street,
        city,
        state,
        GOOGLE_API_KEY.Value,
        NOAA_TOKEN.Value,
        NOAA_TOKEN_BACKUP.Value
      ).calculateGrowingParams();
    // Add your code here
    res.status(200).send({
      hardinessZone,
      firstGdd45,
      lastGdd45,
      growingSeasonLength
    });
  } catch (err) {
    next(err);
  }
});

// Error middleware must be defined last
app.use((err, _req, res, _next) => {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).json({ message: err.message }).end();
});

app.listen(3000, function () {
  console.log('App started');
});

export default app;
