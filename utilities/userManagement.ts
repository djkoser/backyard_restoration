import { Auth, graphqlOperation, API } from 'aws-amplify';
import { GrowingCalculations } from './growingCalculations';
import { createUserInfo } from '../src/graphql/mutations';
import { CreateUserInfoInput } from '../src/API';

export async function register(userInfo: {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  street?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  hardiness_zone?: string;
  first_gdd45?: string;
  last_gdd45?: string;
  growing_season_length?: number;
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

    let { hardiness_zone, first_gdd45, last_gdd45, growing_season_length } =
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
      !hardiness_zone &&
      !first_gdd45 &&
      !last_gdd45 &&
      !growing_season_length &&
      street &&
      city &&
      state &&
      zipcode
    ) {
      ({ hardiness_zone, first_gdd45, last_gdd45, growing_season_length } =
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
      hardinessZone: hardiness_zone as string,
      firstGdd45: first_gdd45 as string,
      lastGdd45: last_gdd45 as string,
      growingSeasonLength: growing_season_length as number
    };
    await API.graphql(graphqlOperation(createUserInfo, { input }));
    return user;
  } catch (error) {
    console.log('error signing up:', error);
  }
}
