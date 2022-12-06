import { GraphQLResult } from '@aws-amplify/api-graphql';
import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import {
  DeleteUserCMutation,
  GetUserCQuery,
  UpdateUserCMutation,
  UpdateUserInput
} from '../API';
import { deleteUserC, updateUserC } from '../graphql/customMutations';
import { getUserC } from '../graphql/customQueries';
import { UserPayload, UserState } from '../types/state';

const initialUserInfoPayload: UserPayload = {
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

const initialState: UserState = {
  ...initialUserInfoPayload,
  loading: false,
  failed: false
};

const pending: CaseReducer<UserState, PayloadAction<undefined>> = (state) => {
  state.loading = true;
  state.failed = false;
};
const reject: CaseReducer<UserState, PayloadAction<undefined>> = (state) => {
  state.loading = false;
  state.failed = true;
};

const fulfill: CaseReducer<UserState, PayloadAction<UserPayload>> = (
  state,
  action
) => {
  state = { ...action.payload, ...{ loading: false, failed: false } };
};

export const getUserInfo = () => {
  return userSlice.actions.GET_USER(
    new Promise((resolve, reject) =>
      Auth.currentAuthenticatedUser({
        bypassCache: true
      })
        .then(({ attributes }) =>
          (
            API.graphql(
              graphqlOperation(getUserC, { input: { email: attributes.email } })
            ) as Promise<GraphQLResult<GetUserCQuery>>
          ).then((graphQLResult) => {
            if (graphQLResult.data?.getUser) {
              const { __typename, ...noTypeName } = graphQLResult.data.getUser;
              resolve(noTypeName);
            } else {
              reject(new Error('getUserInfo: Unexepcted result from API'));
            }
          })
        )
        .catch((err) => reject(err))
    )
  );
};
export const updateUser = (userParams: Omit<UpdateUserInput, 'email'>) => {
  return userSlice.actions.UPDATE_USER(
    new Promise((resolve, reject) =>
      Auth.currentAuthenticatedUser({
        bypassCache: true
      })
        .then(({ attributes }) =>
          (
            API.graphql(
              graphqlOperation(updateUserC, {
                input: { email: attributes.email, ...userParams }
              })
            ) as Promise<GraphQLResult<UpdateUserCMutation>>
          ).then((graphQlResult) => {
            if (graphQlResult.data?.updateUser) {
              const { __typename, ...noTypeName } =
                graphQlResult.data.updateUser;
              resolve(noTypeName);
            } else {
              reject(new Error('updateUser: Unexepcted result from API'));
            }
          })
        )
        .catch((err) => {
          reject(err);
        })
    )
  );
};
export const deleteUser = () => {
  return userSlice.actions.DELETE_USER(
    new Promise((resolve, reject) =>
      Auth.currentAuthenticatedUser({
        bypassCache: true
      })
        .then(async (user) =>
          (
            API.graphql(
              graphqlOperation(deleteUserC, {
                input: { email: user.attributes.email }
              })
            ) as Promise<GraphQLResult<DeleteUserCMutation>>
          ).then((graphQlResult) => {
            if (graphQlResult.data?.deleteUser) {
              const { __typename, ...noTypeName } =
                graphQlResult.data.deleteUser;
              void Auth.deleteUser();
              resolve(noTypeName);
            } else {
              reject(new Error('deleteUser: Unexepcted result from API'));
            }
          })
        )
        .catch((err) => reject(err))
    )
  );
};

const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    GET_USER: (state, action: PayloadAction<Promise<UserPayload>>) => {
      console.log(
        'Is payload a promise? -> ',
        action.payload instanceof Promise
      );
      return state;
    },
    UPDATE_USER: (state, action: PayloadAction<Promise<UserPayload>>) => {
      console.log(
        'Is payload a promise? -> ',
        action.payload instanceof Promise
      );
      return state;
    },
    DELETE_USER: (state, action: PayloadAction<Promise<{ email: string }>>) => {
      console.log(
        'Is payload a promise? -> ',
        action.payload instanceof Promise
      );
      return state;
    },
    RESET_STORE: () => {
      return initialState;
    },
    ADD_RETRIEVED: (state, action: PayloadAction<UserPayload>) => {
      return { ...action.payload, loading: false, failed: false };
    }
  },
  extraReducers: {
    GET_USER_PENDING: (state, action) => {
      pending(state, action);
    },
    GET_USER_FULFILLED: (state, action) => {
      fulfill(state, action);
    },
    GET_USER_REJECTED: (state, action) => {
      reject(state, action);
    },
    UPDATE_USER_PENDING: (state, action) => {
      pending(state, action);
    },
    UPDATE_USER_FULFILLED: (state, action) => {
      fulfill(state, action);
    },
    UPDATE_USER_REJECTED: (state, action) => {
      reject(state, action);
    },
    DELETE_USER_PENDING: (state, action) => {
      pending(state, action);
    },
    DELETE_USER_FULFILLED: (state) => {
      state = { ...initialState };
      state.loading = false;
      state.failed = false;
    },
    DELETE_USER_REJECTED: (state, action) => {
      reject(state, action);
    }
  }
});
export default userSlice;
