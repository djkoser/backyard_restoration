const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const aws = require('aws-sdk');

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

app.put('/api/donate', async (req, res, next) => {
  try {
    const { Parameters } = await new aws.SSM({ region: 'us-east-1' })
      .getParameters({
        Names: ['STRIPE_SECRET_KEY'].map(
          (secretName) => process.env[secretName]
        ),
        WithDecryption: true
      })
      .promise();
    const stripe = require('stripe')(Parameters[0].Value);
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

app.listen(3000, function () {
  console.log('App started');
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
