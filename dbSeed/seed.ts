import { readFileSync } from 'fs';
import { join } from 'path';
import {
  CreateManagementMethodInput,
  CreateWeedInput,
  CreateNativePlantInput
} from '../src/API';
import {
  createWeed,
  createManagementMethod,
  createNativePlant
} from './seedMethods';
import { Amplify, API, graphqlOperation } from 'aws-amplify';

Amplify.configure({
  aws_project_region: 'us-east-1',
  aws_appsync_graphqlEndpoint:
    'https://vjfovgdc4zbd5i46vxlmqcy3yq.appsync-api.us-east-1.amazonaws.com/graphql',
  aws_appsync_region: 'us-east-1',
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: 'da2-che22ox5xjbadi4hkgkvdzobie'
});

const nativePlants: CreateNativePlantInput[] = JSON.parse(
  readFileSync(join(__dirname, 'nativePlants.json')).toString()
);

const weedMgmtStrategies: CreateManagementMethodInput[] = JSON.parse(
  readFileSync(join(__dirname, 'weedMgmtStrategies.json')).toString()
);

const weeds: CreateWeedInput[] = JSON.parse(
  readFileSync(join(__dirname, 'weeds.json')).toString()
);

async function seedDB() {
  try {
    for (const input of nativePlants) {
      await API.graphql(graphqlOperation(createNativePlant, { input }));
    }

    for (const input of weeds) {
      await API.graphql(graphqlOperation(createWeed, { input }));
    }

    for (const input of weedMgmtStrategies) {
      await API.graphql(graphqlOperation(createManagementMethod, { input }));
    }
  } catch (err) {
    const errParsed =
      err instanceof Error ? err : new Error(JSON.stringify(err));
    console.error(
      `The following error occured while seeding database: ${errParsed.message}`
    );
    throw errParsed;
  }
}

void seedDB();
