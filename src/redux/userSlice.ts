import { GraphQLResult } from '@aws-amplify/api-graphql';
import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import {
  DeleteUserCMutation,
  DeleteUserInput,
  GetUserCQuery,
  GetUserCQueryVariables,
  UpdateUserCMutation,
  UpdateUserInput
} from '../API';
import { updateUserC } from '../graphql/customMutations';
import { getUserC } from '../graphql/customQueries';
import { UserState, UserPayload } from '../types/state';

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
    new Promise((resolve, reject) => {
      Auth.currentAuthenticatedUser({
        bypassCache: true
      })
        .then(async (res) => {
          const { attributes } = res;
          const currentUseremail = attributes.email;
          const query: GetUserCQueryVariables = {
            email: currentUseremail
          };
          const graphQLResult = (await API.graphql(
            graphqlOperation(getUserC, query)
          )) as GraphQLResult<GetUserCQuery>;

          if (graphQLResult.data?.getUser) {
            const { __typename, ...noTypeName } = graphQLResult.data.getUser;

            resolve(noTypeName);
          } else {
            throw new Error('getUserInfo: Unexepcted result from API');
          }
        })
        .catch((err) => reject(err));
    })
  );
};
export const updateUser = (userParams: UpdateUserInput) => {
  return userSlice.actions.UPDATE_USER(
    new Promise((resolve, reject) =>
      (
        API.graphql(
          graphqlOperation(updateUserC, { input: userParams })
        ) as Promise<GraphQLResult<UpdateUserCMutation>>
      )
        .then((graphQlResult) => {
          if (graphQlResult.data?.updateUser) {
            const { __typename, ...noTypeName } = graphQlResult.data.updateUser;

            resolve(noTypeName);
          } else {
            reject(new Error('updateUser: Unexepcted result from API'));
          }
        })
        .catch((err) => {
          reject(err);
        })
    )
  );
};
export const deleteUser = (userParams: DeleteUserInput) => {
  return userSlice.actions.DELETE_USER(
    new Promise((resolve, reject) =>
      (
        API.graphql(
          graphqlOperation(updateUserC, { input: userParams })
        ) as Promise<GraphQLResult<DeleteUserCMutation>>
      )
        .then((graphQlResult) => {
          if (graphQlResult.data?.deleteUser) {
            const { __typename, ...noTypeName } = graphQlResult.data.deleteUser;

            resolve(noTypeName);
          } else {
            reject(new Error('deleteUser: Unexepcted result from API'));
          }
        })
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
