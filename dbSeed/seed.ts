import { Amplify, API, graphqlOperation } from 'aws-amplify';
import { readFileSync } from 'fs';
import { join } from 'path';
import type {
  CreateManagementMethodInput,
  CreateNativePlantInput,
  CreateWeedInput
} from '../src/API';
import awsMobile from '../src/aws-exports';
import {
  createManagementMethodC,
  createNativePlantC,
  createWeedC
} from '../src/graphql/customMutations';

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
        graphqlOperation(createNativePlantC, createNativePlantInput)
      );
    }

    for (const input of weeds) {
      const createWeedInput: { input: CreateWeedInput } = { input };
      await API.graphql(graphqlOperation(createWeedC, createWeedInput));
    }

    for (const input of weedMgmtStrategies) {
      const createManagementMethodInput: {
        input: CreateManagementMethodInput;
      } = {
        input
      };
      await API.graphql(
        graphqlOperation(createManagementMethodC, createManagementMethodInput)
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
