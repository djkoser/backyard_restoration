import express from 'express';
import bodyParser from 'body-parser';
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';

import { deleteUserIfUnconfirmed } from './cognitoActions';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Only perform tasks if the user is in a specific group
const allowedGroup = process.env.GROUP;

const checkGroup = function (req, _res, next) {
  if (req.path == '/signUserOut') {
    return next();
  }

  if (typeof allowedGroup === 'undefined' || allowedGroup === 'NONE') {
    return next();
  }

  // Fail if group enforcement is being used
  if (req.apiGateway.event.requestContext.authorizer.claims['cognito:groups']) {
    const groups =
      req.apiGateway.event.requestContext.authorizer.claims[
        'cognito:groups'
      ].split(',');
    if (!(allowedGroup && groups.indexOf(allowedGroup) > -1)) {
      const err = new Error(
        `User does not have permissions to perform administrative tasks`
      );
      next(err);
    }
  } else {
    const err = {
      ...new Error(
        `User does not have permissions to perform administrative tasks`
      ),
      statusCode: 403
    };
    next(err);
  }
  next();
};

app.all('*', checkGroup);

app.delete('/deleteUserIfUnconfirmed', async (req, res, next) => {
  if (!req.body.username) {
    const err = {
      ...new Error('username is required in within request body'),
      statusCode: 400
    };
    return next(err);
  }
  try {
    const response = await deleteUserIfUnconfirmed(req.body.username);
    res.status(200).json(response);
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

app.listen(3000, () => {
  console.log('App started');
});

export default app;
