import express from 'express';
import bodyParser from 'body-parser';
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';
import * as AWS from 'aws-sdk';

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.put('/donate', async (req, res, next) => {
  try {
    const { Parameters } = await new AWS.SSM({ region: 'us-east-1' })
      .getParameters({
        Names: [process.env['STRIPE_SECRET_KEY']!],
        WithDecryption: true
      })
      .promise();
    const stripe = require('stripe')(Parameters![0].Value);
    const session = await stripe.checkout.sessions.create({
      submit_type: 'donate',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'donation'
            },
            unit_amount_decimal: Number.parseInt(req.body.donationAmount)
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: 'https://backyardrestoration.net/donation/success',
      cancel_url: 'https://backyardrestoration.net/'
    });
    res.status(200).send({ id: session.id });
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
