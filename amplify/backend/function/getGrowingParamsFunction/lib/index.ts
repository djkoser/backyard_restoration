import awsServerlessExpress from 'aws-serverless-express';
import app from './app';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';

const server = awsServerlessExpress.createServer(app);

export const handler = (event: APIGatewayProxyEvent, context: Context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
};
