import { GraphQLResult } from '@aws-amplify/api-graphql';
import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import {
  DeleteUserCMutation,
  DeleteUserCMutationVariables,
  DeleteUserManagementMethodCMutationVariables,
  DeleteUserNativePlantCMutationVariables,
  GetUserCQuery,
  GetUserCQueryVariables,
  UpdateUserCMutation,
  UpdateUserCMutationVariables,
  UpdateUserInput
} from '../API';
import {
  deleteUserC,
  deleteUserManagementMethodC,
  deleteUserNativePlantC,
  updateUserC
} from '../graphql/customMutations';
import { getUserC } from '../graphql/customQueries';
import { UserPayload, UserState } from '../types/state';
import { isFulfilled, isPending, isRejected } from '../utilities';

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
  return { ...action.payload, ...{ loading: false, failed: false } };
};

export const getUserInfo = () => {
  return userSlice.actions.GET_USER(
    new Promise((resolve, reject) =>
      Auth.currentAuthenticatedUser({
        bypassCache: true
      })
        .then(async ({ attributes }) => {
          const getUserInput: GetUserCQueryVariables = {
            email: attributes.email
          };
          const graphQLResult = await (API.graphql(
            graphqlOperation(getUserC, getUserInput)
          ) as Promise<GraphQLResult<GetUserCQuery>>);
          if (graphQLResult.data?.getUser) {
            const { __typename, ...noTypeName } = graphQLResult.data.getUser;
            resolve(noTypeName);
          } else {
            reject(new Error('getUserInfo: Unexpected result from API'));
          }
        })
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
        .then(async ({ attributes }) => {
          const updateUserInput: UpdateUserCMutationVariables = {
            input: {
              email: attributes.email,
              ...userParams
            }
          };
          const graphQlResult = await (API.graphql(
            graphqlOperation(updateUserC, updateUserInput)
          ) as Promise<GraphQLResult<UpdateUserCMutation>>);
          if (graphQlResult.data?.updateUser) {
            const { __typename, ...noTypeName } = graphQlResult.data.updateUser;
            resolve(noTypeName);
          } else {
            reject(new Error('updateUser: Unexpected result from API'));
          }
        })
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
        .then(async ({ attributes }) => {
          const deleteUserInput: DeleteUserCMutationVariables = {
            input: { email: attributes.email }
          };
          const graphQlResult = await (API.graphql(
            graphqlOperation(deleteUserC, deleteUserInput)
          ) as Promise<GraphQLResult<DeleteUserCMutation>>);
          if (graphQlResult.data?.deleteUser) {
            const { __typename, ...noTypeName } = graphQlResult.data.deleteUser;

            if (noTypeName?.managementMethods?.items instanceof Array) {
              console.log(noTypeName.managementMethods.items);
              for (const item of noTypeName.managementMethods.items) {
                if (item) {
                  const deleteUserManagementMethodsInput: DeleteUserManagementMethodCMutationVariables =
                    {
                      input: { id: item.id }
                    };
                  await API.graphql(
                    graphqlOperation(
                      deleteUserManagementMethodC,
                      deleteUserManagementMethodsInput
                    )
                  );
                }
              }
            }

            if (noTypeName?.nativePlants?.items instanceof Array) {
              console.log(noTypeName.nativePlants.items);
              for (const item of noTypeName.nativePlants.items) {
                if (item) {
                  const deleteUserNativePlantsInput: DeleteUserNativePlantCMutationVariables =
                    {
                      input: { id: item.id }
                    };
                  await API.graphql(
                    graphqlOperation(
                      deleteUserNativePlantC,
                      deleteUserNativePlantsInput
                    )
                  );
                }
              }
            }
            await Auth.deleteUser();
            resolve(noTypeName);
          } else {
            reject(new Error('deleteUser: Unexpected result from API'));
          }
        })
        .catch((err) => reject(err))
    )
  );
};

const userSlice = createSlice({
  name: 'userSlice',
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
  extraReducers: (builder) => {
    builder
      .addMatcher((action) => isPending(action, userSlice.name), pending)
      .addMatcher((action) => isFulfilled(action, userSlice.name), fulfill)
      .addMatcher((action) => isRejected(action, userSlice.name), reject);
  }
});
export default userSlice;
