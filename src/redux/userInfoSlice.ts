import { GraphQLResult } from '@aws-amplify/api-graphql';
import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { GetUserCQuery, GetUserCQueryVariables } from '../API';
import { getUserC } from '../graphql/customQueries';
import { UserInfoPayload, UserInfoState } from '../types/state';

const initialUserInfoPayload: UserInfoPayload = {
  email: '',
  firstName: '',
  lastName: '',
  street: '',
  city: '',
  state: '',
  zipcode: '',
  growingSeasonLength: 0,
  firstGdd45: '',
  lastGdd45: '',
  hardinessZone: ''
};

const initialState: UserInfoState = {
  ...initialUserInfoPayload,
  loading: false,
  failed: false
};

const pending: CaseReducer<UserInfoState, PayloadAction<undefined>> = (
  state
) => {
  state.loading = true;
  state.failed = false;
};
const reject: CaseReducer<UserInfoState, PayloadAction<undefined>> = (
  state
) => {
  state.loading = false;
  state.failed = true;
};

const fulfill: CaseReducer<UserInfoState, PayloadAction<UserInfoPayload>> = (
  state
) => {
  state.loading = false;
  state.failed = false;
};

export const getUserInfo = () => {
  return userInfoSlice.actions.GET_USER_INFO(
    new Promise((resolve, reject) => {
      Auth.currentAuthenticatedUser({
        bypassCache: true
      })
        .then(async (res) => {
          const { attributes } = res;
          const currentUseremail = attributes.email;
          const userInfoQuery: GetUserCQueryVariables = {
            email: currentUseremail
          };
          const graphQLResult = (await API.graphql(
            graphqlOperation(getUserC, userInfoQuery)
          )) as GraphQLResult<GetUserCQuery>;

          if (graphQLResult.data?.getUserInfo) {
            const { nativePlants, managementMethods, ...remainingPayload } =
              graphQLResult.data.getUserInfo;

            const methodsDestructured = managementMethods?.items;

            const plantsDestructured = nativePlants?.items;
            resolve({
              ...remainingPayload,
              ...{
                managementMethods: methodsDestructured,
                nativePlants: plantsDestructured
              }
            });
          } else {
            throw new Error('getUserInfo: Unexepcted result from API');
          }
        })
        .catch((err) => reject(err));
    })
  );
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    GET_USER_INFO: (state, action: PayloadAction<Promise<UserInfoPayload>>) => {
      console.log(
        'Is payload a promise? -> ',
        action.payload instanceof Promise
      );
      return state;
    },
    RESET_STORE: () => {
      return initialState;
    },
    ADD_RETRIEVED_INFO: (state, action: PayloadAction<UserInfoPayload>) => {
      return { ...action.payload, loading: false, failed: false };
    }
  },
  extraReducers: {
    GET_USER_INFO_PENDING: (state, action) => {
      pending(state, action);
    },
    GET_USER_INFO_FULFILLED: (state, action) => {
      fulfill(state, action);
    },
    GET_USER_INFO_REJECTED: (state, action) => {
      reject(state, action);
    }
  }
});
export default userInfoSlice;
