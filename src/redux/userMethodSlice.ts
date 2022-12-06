import { GraphQLResult } from '@aws-amplify/api-graphql';
import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import {
  CreateUserManagementMethodCMutation,
  DeleteUserManagementMethodCMutation,
  GetUserManagementMethodsQuery,
  UpdateUserManagementMethodCMutation,
  UpdateUserManagementMethodInput
} from '../API';
import {
  createUserManagementMethodC,
  deleteUserManagementMethodC,
  updateUserManagementMethodC
} from '../graphql/customMutations';
import { getUserManagementMethods } from '../graphql/customQueries';
import { UserMethodPayload, UserMethodState } from '../types/state';

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
  state = { ...action.payload, ...{ loading: false, failed: false } };
};

export const addUserManagementMethod = (
  userManagementMethodManagementMethodId: string
) => {
  return userMethodSlice.actions.ADD_USER_METHOD(
    new Promise((resolve, reject) =>
      (
        API.graphql(
          graphqlOperation(createUserManagementMethodC, {
            input: {
              projectNotes: '',
              userManagementMethodManagementMethodId
            }
          })
        ) as Promise<GraphQLResult<CreateUserManagementMethodCMutation>>
      )
        .then((graphQlResult) => {
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
                    projectNotes &&
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
                      'addUserManagementMethod: Unexepcted result from API'
                    );
                  }
                }
              );

            resolve({ userMethods });
          } else {
            reject(
              new Error('addUserManagementMethod: Unexepcted result from API')
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
    new Promise((resolve, reject) =>
      (
        API.graphql(
          graphqlOperation(updateUserManagementMethodC, {
            input: newUserMethodProperties
          })
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
                    projectNotes
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
                      'updateUserMethod: Unexepcted result from API'
                    );
                  }
                }
              );

            resolve({ userMethods });
          } else {
            reject(new Error('updateUserMethod: Unexepcted result from API'));
          }
        })
        .catch((err) => reject(err))
    )
  );
};
export const deleteUserManagementMethod = (userMethodId: string) => {
  return userMethodSlice.actions.REMOVE_USER_METHOD(
    new Promise((resolve, reject) =>
      (
        API.graphql(
          graphqlOperation(deleteUserManagementMethodC, {
            input: { id: userMethodId }
          })
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
                    projectNotes
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
                      'deleteUserManagementMethod: Unexepcted result from API'
                    );
                  }
                }
              );

            resolve({ userMethods });
          } else {
            reject(
              new Error(
                'deleteUserManagementMethod: Unexepcted result from API'
              )
            );
          }
        })
        .catch((err) => reject(err))
    )
  );
};
export const getUserMethods = () => {
  return userMethodSlice.actions.GET_USER_METHODS(
    new Promise((resolve, reject) =>
      Auth.currentAuthenticatedUser({
        bypassCache: true
      })
        .then(({ attributes }) =>
          (
            API.graphql(
              graphqlOperation(getUserManagementMethods, {
                email: attributes.email
              })
            ) as Promise<GraphQLResult<GetUserManagementMethodsQuery>>
          ).then((graphQlResult) => {
            if (graphQlResult.data?.getUser?.managementMethods?.items?.map) {
              const userMethods =
                graphQlResult.data.getUser.managementMethods.items.map(
                  (userManagementMethod) => {
                    const { id, projectNotes } = userManagementMethod || {};

                    if (
                      userManagementMethod?.managementMethod &&
                      id &&
                      projectNotes
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
                        'getUserMethods: Unexepcted result from API'
                      );
                    }
                  }
                );

              resolve({ userMethods });
            } else {
              reject(new Error('getUserMethods: Unexepcted result from API'));
            }
          })
        )
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
  extraReducers: {
    ADD_USER_METHOD_PENDING: (state, action) => {
      pending(state, action);
    },
    ADD_USER_METHOD_FULFILLED: (
      state,
      action: PayloadAction<UserMethodPayload>
    ) => {
      fulfill(state, action);
    },
    ADD_USER_METHOD_REJECTED: (state, action) => {
      reject(state, action);
    },
    REMOVE_USER_METHOD_PENDING: (state, action) => {
      pending(state, action);
    },
    REMOVE_USER_METHOD_FULFILLED: (
      state,
      action: PayloadAction<UserMethodPayload>
    ) => {
      fulfill(state, action);
    },
    REMOVE_USER_METHOD_REJECTED: (state, action) => {
      reject(state, action);
    },
    GET_USER_METHODS_PENDING: (state, action) => {
      pending(state, action);
    },
    GET_USER_METHODS_FULFILLED: (
      state,
      action: PayloadAction<UserMethodPayload>
    ) => {
      fulfill(state, action);
    },
    GET_USER_METHODS_REJECTED: (state, action) => {
      reject(state, action);
    },
    UPDATE_USER_METHODS_PENDING: (state, action) => {
      pending(state, action);
    },
    UPDATE_USER_METHODS_FULFILLED: (
      state,
      action: PayloadAction<UserMethodPayload>
    ) => {
      fulfill(state, action);
    },
    UPDATE_USER_METHODS_REJECTED: (state, action) => {
      reject(state, action);
    }
  }
});

export default userMethodSlice;
