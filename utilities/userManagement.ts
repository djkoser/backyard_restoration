import { API, Auth, graphqlOperation } from 'aws-amplify';
import { CreateUserInfoInput } from '../src/API';
import { createUserInfo } from '../src/graphql/mutations';
import { GrowingCalculations } from './growingCalculations';

export async function register(userInfo: {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  street?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  hardinessZone?: string;
  firstGdd45?: string;
  lastGdd45?: string;
  growingSeasonLength?: number;
}) {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      street,
      city,
      state,
      zipcode,
      ...userInfoLet
    } = userInfo;

    let { hardinessZone, firstGdd45, lastGdd45, growingSeasonLength } =
      userInfoLet;

    const { user } = await Auth.signUp({
      username: email,
      password,
      autoSignIn: {
        // optional - enables auto sign in after user is confirmed
        enabled: true
      },
      attributes: {
        email
      }
    });
    console.log(user);
    if (
      !hardinessZone &&
      !firstGdd45 &&
      !lastGdd45 &&
      !growingSeasonLength &&
      street &&
      city &&
      state &&
      zipcode
    ) {
      ({ hardinessZone, firstGdd45, lastGdd45, growingSeasonLength } =
        await new GrowingCalculations(
          zipcode,
          street,
          city,
          state
        ).calculateGrowingParams());
    }
    const input: CreateUserInfoInput = {
      email,
      firstName,
      lastName,
      street,
      city,
      state,
      zipcode,
      hardinessZone: hardinessZone as string,
      firstGdd45: firstGdd45 as string,
      lastGdd45: lastGdd45 as string,
      growingSeasonLength: growingSeasonLength as number
    };
    await API.graphql(graphqlOperation(createUserInfo, { input }));
    return user;
  } catch (error) {
    console.log('error signing up:', error);
  }
}
