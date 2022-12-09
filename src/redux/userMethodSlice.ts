import { GraphQLResult } from '@aws-amplify/api-graphql';
import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import {
  CreateUserManagementMethodCMutation,
  CreateUserManagementMethodCMutationVariables,
  DeleteUserManagementMethodCMutation,
  DeleteUserManagementMethodCMutationVariables,
  GetUserManagementMethodsQuery,
  GetUserManagementMethodsQueryVariables,
  UpdateUserManagementMethodCMutation,
  UpdateUserManagementMethodCMutationVariables,
  UpdateUserManagementMethodInput
} from '../API';
import {
  createUserManagementMethodC,
  deleteUserManagementMethodC,
  updateUserManagementMethodC
} from '../graphql/customMutations';
import { getUserManagementMethods } from '../graphql/customQueries';
import { UserMethodPayload, UserMethodState } from '../types/state';
import { isFulfilled, isPending, isRejected } from '../utilities';

const initialUserMethodsPayload: UserMethodPayload = {
  userMethods: []
};

const initialState: UserMethodState = {
  ...initialUserMethodsPayload,
  loading: false,
  failed: false
};

const pending: CaseReducer<UserMethodState, PayloadAction<undefined>> = (
  state
) => {
  state.loading = true;
  state.failed = false;
};
const reject: CaseReducer<UserMethodState, PayloadAction<undefined>> = (
  state
) => {
  state.loading = false;
  state.failed = true;
};

const fulfill: CaseReducer<
  UserMethodState,
  PayloadAction<UserMethodPayload>
> = (state, action) => {
  console.log(state);
  console.log({ ...action.payload, ...{ loading: false, failed: false } });
  return { ...action.payload, ...{ loading: false, failed: false } };
};

export const addUserManagementMethod = (
  userManagementMethodManagementMethodId: string
) => {
  return userMethodSlice.actions.ADD_USER_METHOD(
    new Promise((resolve, reject) =>
      Auth.currentAuthenticatedUser({
        bypassCache: true
      })
        .then(async ({ attributes }) => {
          const createUserManagementMethodInput: CreateUserManagementMethodCMutationVariables =
            {
              input: {
                projectNotes: '',
                userManagementMethodsId: attributes.email,
                userManagementMethodManagementMethodId
              }
            };
          const graphQlResult = await (API.graphql(
            graphqlOperation(
              createUserManagementMethodC,
              createUserManagementMethodInput
            )
          ) as Promise<GraphQLResult<CreateUserManagementMethodCMutation>>);
          if (
            graphQlResult.data?.createUserManagementMethod?.user
              ?.managementMethods?.items?.map
          ) {
            const userMethods =
              graphQlResult.data.createUserManagementMethod.user.managementMethods.items.map(
                (userManagementMethod) => {
                  const { projectNotes, id } = userManagementMethod || {};
                  if (
                    userManagementMethod?.managementMethod &&
                    typeof projectNotes === 'string' &&
                    id
                  ) {
                    const { __typename, weed, ...noTypeName } =
                      userManagementMethod.managementMethod;
                    return {
                      id,
                      projectNotes,
                      commonName: weed.commonName,
                      ...noTypeName
                    };
                  } else {
                    throw new Error(
                      'addUserManagementMethod: Unexpected result from API'
                    );
                  }
                }
              );
            resolve({ userMethods });
          } else {
            throw new Error(
              'addUserManagementMethod: Unexpected result from API'
            );
          }
        })
        .catch((err) => reject(err))
    )
  );
};
export const updateUserMethod = (
  newUserMethodProperties: UpdateUserManagementMethodInput
) => {
  return userMethodSlice.actions.UPDATE_USER_METHOD(
    new Promise((resolve, reject) => {
      const updateUserManagementMethodInput: UpdateUserManagementMethodCMutationVariables =
        {
          input: newUserMethodProperties
        };
      return (
        API.graphql(
          graphqlOperation(
            updateUserManagementMethodC,
            updateUserManagementMethodInput
          )
        ) as Promise<GraphQLResult<UpdateUserManagementMethodCMutation>>
      )
        .then((graphQlResult) => {
          if (
            graphQlResult.data?.updateUserManagementMethod?.user
              ?.managementMethods?.items?.map
          ) {
            const userMethods =
              graphQlResult.data.updateUserManagementMethod.user.managementMethods.items.map(
                (userManagementMethod) => {
                  const { id, projectNotes } = userManagementMethod || {};
                  if (
                    userManagementMethod?.managementMethod &&
                    id &&
                    typeof projectNotes === 'string'
                  ) {
                    const { __typename, weed, ...noTypeName } =
                      userManagementMethod.managementMethod;
                    return {
                      id,
                      commonName: weed.commonName,
                      projectNotes,
                      ...noTypeName
                    };
                  } else {
                    throw new Error(
                      'updateUserMethod: Unexpected result from API'
                    );
                  }
                }
              );

            resolve({ userMethods });
          } else {
            reject(new Error('updateUserMethod: Unexpected result from API'));
          }
        })
        .catch((err) => reject(err));
    })
  );
};
export const deleteUserManagementMethod = (userMethodId: string) => {
  return userMethodSlice.actions.REMOVE_USER_METHOD(
    new Promise((resolve, reject) => {
      const deleteUserManagementMethodInput: DeleteUserManagementMethodCMutationVariables =
        {
          input: { id: userMethodId }
        };
      return (
        API.graphql(
          graphqlOperation(
            deleteUserManagementMethodC,
            deleteUserManagementMethodInput
          )
        ) as Promise<GraphQLResult<DeleteUserManagementMethodCMutation>>
      )
        .then((graphQlResult) => {
          if (
            graphQlResult.data?.deleteUserManagementMethod?.user
              ?.managementMethods?.items?.map
          ) {
            const userMethods =
              graphQlResult.data.deleteUserManagementMethod.user.managementMethods.items.map(
                (userManagementMethod) => {
                  const { id, projectNotes } = userManagementMethod || {};

                  if (
                    userManagementMethod?.managementMethod &&
                    id &&
                    typeof projectNotes === 'string'
                  ) {
                    const { __typename, weed, ...noTypeName } =
                      userManagementMethod.managementMethod;
                    return {
                      id,
                      commonName: weed.commonName,
                      projectNotes: userManagementMethod?.projectNotes || '',
                      ...noTypeName
                    };
                  } else {
                    throw new Error(
                      'deleteUserManagementMethod: Unexpected result from API'
                    );
                  }
                }
              );

            resolve({ userMethods });
          } else {
            reject(
              new Error(
                'deleteUserManagementMethod: Unexpected result from API'
              )
            );
          }
        })
        .catch((err) => reject(err));
    })
  );
};
export const getUserMethods = () => {
  return userMethodSlice.actions.GET_USER_METHODS(
    new Promise((resolve, reject) =>
      Auth.currentAuthenticatedUser({
        bypassCache: true
      })
        .then(async ({ attributes }) => {
          const getUserManagementMethodsInput: GetUserManagementMethodsQueryVariables =
            {
              email: attributes.email
            };
          const graphQlResult = await (API.graphql(
            graphqlOperation(
              getUserManagementMethods,
              getUserManagementMethodsInput
            )
          ) as Promise<GraphQLResult<GetUserManagementMethodsQuery>>);
          if (graphQlResult.data?.getUser?.managementMethods?.items?.map) {
            const userMethods =
              graphQlResult.data.getUser.managementMethods.items.map(
                (userManagementMethod) => {
                  const { id, projectNotes } = userManagementMethod || {};

                  if (
                    userManagementMethod?.managementMethod &&
                    id &&
                    typeof projectNotes === 'string'
                  ) {
                    const { __typename, weed, ...noTypeName } =
                      userManagementMethod.managementMethod;
                    return {
                      id,
                      commonName: weed.commonName,
                      projectNotes: userManagementMethod?.projectNotes || '',
                      ...noTypeName
                    };
                  } else {
                    throw new Error(
                      'getUserMethods: Unexpected result from API'
                    );
                  }
                }
              );

            resolve({ userMethods });
          } else {
            reject(new Error('getUserMethods: Unexpected result from API'));
          }
        })
        .catch((err) => reject(err))
    )
  );
};

const userMethodSlice = createSlice({
  name: 'userMethodSlice',
  initialState,
  reducers: {
    ADD_USER_METHOD: (
      state,
      action: PayloadAction<Promise<UserMethodPayload>>
    ) => {
      console.log(
        'Is payload a promise? -> ',
        action.payload instanceof Promise
      );
      return state;
    },
    UPDATE_USER_METHOD: (
      state,
      action: PayloadAction<Promise<UserMethodPayload>>
    ) => {
      console.log(
        'Is payload a promise? -> ',
        action.payload instanceof Promise
      );
      return state;
    },
    REMOVE_USER_METHOD: (
      state,
      action: PayloadAction<Promise<UserMethodPayload>>
    ) => {
      console.log(
        'Is payload a promise? -> ',
        action.payload instanceof Promise
      );
      return state;
    },
    GET_USER_METHODS: (
      state,
      action: PayloadAction<Promise<UserMethodPayload>>
    ) => {
      console.log(
        'Is payload a promise? -> ',
        action.payload instanceof Promise
      );
      return state;
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher((action) => isPending(action, userMethodSlice.name), pending)
      .addMatcher(
        (action) => isFulfilled(action, userMethodSlice.name),
        fulfill
      )
      .addMatcher((action) => isRejected(action, userMethodSlice.name), reject);
  }
});

export default userMethodSlice;
