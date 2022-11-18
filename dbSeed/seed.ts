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
} from '../src/graphql/mutations';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import awsMobile from '../src/aws-exports';

Amplify.configure(awsMobile);

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
      const createNativePlantInput: { input: CreateNativePlantInput } = {
        input
      };
      await API.graphql(
        graphqlOperation(createNativePlant, createNativePlantInput)
      );
    }

    for (const input of weeds) {
      const createWeedInput: { input: CreateWeedInput } = { input };
      await API.graphql(graphqlOperation(createWeed, createWeedInput));
    }

    for (const input of weedMgmtStrategies) {
      const createManagementMethodInput: {
        input: CreateManagementMethodInput;
      } = {
        input
      };
      await API.graphql(
        graphqlOperation(createManagementMethod, createManagementMethodInput)
      );
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
