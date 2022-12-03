import { GraphQLResult } from '@aws-amplify/api-graphql';
import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API, graphqlOperation } from 'aws-amplify';
import {
  CreateUserNativePlantCMutation,
  DeleteUserNativePlantCMutation,
  GetUserNativePlantsQuery,
  UpdateUserNativePlantCMutation,
  UpdateUserNativePlantInput
} from '../API';
import {
  createUserNativePlantC,
  deleteUserNativePlantC,
  updateUserNativePlantC
} from '../graphql/customMutations';
import { getUserNativePlants } from '../graphql/customQueries';
import { UserNativePayload, UserNativeState } from '../types/state';

const initialUserNativesPayload: UserNativePayload = {
  nativePlants: []
};

const initialState: UserNativeState = {
  ...initialUserNativesPayload,
  loading: false,
  failed: false
};

const pending: CaseReducer<UserNativeState, PayloadAction<undefined>> = (
  state
) => {
  state.loading = true;
  state.failed = false;
};
const reject: CaseReducer<UserNativeState, PayloadAction<undefined>> = (
  state
) => {
  state.loading = false;
  state.failed = true;
};

const fulfill: CaseReducer<
  UserNativeState,
  PayloadAction<UserNativePayload>
> = (state, action) => {
  state = { ...action.payload, ...{ loading: false, failed: false } };
};

export const addUserNative = (userNativePlantNativePlantId: string) => {
  return userNativePlantSlice.actions.ADD_USER_NATIVE(
    new Promise((resolve, reject) =>
      (
        API.graphql(
          graphqlOperation(createUserNativePlantC, {
            input: {
              projectNotes: '',
              userNativePlantNativePlantId
            }
          })
        ) as Promise<GraphQLResult<CreateUserNativePlantCMutation>>
      )
        .then((graphQlResult) => {
          if (
            graphQlResult.data?.createUserNativePlant?.user?.nativePlants?.items
              ?.map
          ) {
            const nativePlants =
              graphQlResult.data.createUserNativePlant.user.nativePlants.items.map(
                (nativePlant) => {
                  const { projectNotes, id } = nativePlant || {};
                  if (nativePlant?.nativePlant && projectNotes && id) {
                    const { __typename, ...noTypeName } =
                      nativePlant.nativePlant;
                    return {
                      id,
                      projectNotes,
                      ...noTypeName
                    };
                  } else {
                    throw new Error(
                      'addUserNative: Unexepcted result from API'
                    );
                  }
                }
              );

            resolve({ nativePlants });
          } else {
            reject(new Error('addUserNative: Unexepcted result from API'));
          }
        })
        .catch((err) => reject(err))
    )
  );
};
export const updateUserNative = (
  newUserNativeProperties: UpdateUserNativePlantInput
) => {
  return userNativePlantSlice.actions.UPDATE_PROJECT_NOTES(
    new Promise((resolve, reject) =>
      (
        API.graphql(
          graphqlOperation(updateUserNativePlantC, {
            input: newUserNativeProperties
          })
        ) as Promise<GraphQLResult<UpdateUserNativePlantCMutation>>
      )
        .then((graphQlResult) => {
          if (
            graphQlResult.data?.updateUserNativePlant?.user?.nativePlants?.items
              ?.map
          ) {
            const nativePlants =
              graphQlResult.data.updateUserNativePlant.user.nativePlants.items.map(
                (nativePlant) => {
                  const { id, projectNotes } = nativePlant || {};
                  if (nativePlant?.nativePlant && id && projectNotes) {
                    const { __typename, ...noTypeName } =
                      nativePlant.nativePlant;
                    return {
                      id,
                      projectNotes,
                      ...noTypeName
                    };
                  } else {
                    throw new Error(
                      'updateUserNative: Unexepcted result from API'
                    );
                  }
                }
              );

            resolve({ nativePlants });
          } else {
            reject(new Error('updateUserNative: Unexepcted result from API'));
          }
        })
        .catch((err) => reject(err))
    )
  );
};
export const deleteUserNative = (userNativeId: string) => {
  return userNativePlantSlice.actions.REMOVE_USER_NATIVE(
    new Promise((resolve, reject) =>
      (
        API.graphql(
          graphqlOperation(deleteUserNativePlantC, {
            input: { id: userNativeId }
          })
        ) as Promise<GraphQLResult<DeleteUserNativePlantCMutation>>
      )
        .then((graphQlResult) => {
          if (
            graphQlResult.data?.deleteUserNativePlant?.user?.nativePlants?.items
              ?.map
          ) {
            const nativePlants =
              graphQlResult.data.deleteUserNativePlant.user.nativePlants.items.map(
                (nativePlant) => {
                  const { id, projectNotes } = nativePlant || {};

                  if (nativePlant?.nativePlant && id && projectNotes) {
                    const { __typename, ...noTypeName } =
                      nativePlant.nativePlant;
                    return {
                      id,
                      projectNotes: nativePlant?.projectNotes || '',
                      ...noTypeName
                    };
                  } else {
                    throw new Error(
                      'deleteUserNative: Unexepcted result from API'
                    );
                  }
                }
              );

            resolve({ nativePlants });
          } else {
            reject(new Error('deleteUserNative: Unexepcted result from API'));
          }
        })
        .catch((err) => reject(err))
    )
  );
};
export const getUserNatives = (email: string) => {
  return userNativePlantSlice.actions.GET_USER_NATIVES(
    new Promise((resolve, reject) =>
      (
        API.graphql(
          graphqlOperation(getUserNativePlants, { email })
        ) as Promise<GraphQLResult<GetUserNativePlantsQuery>>
      )
        .then((graphQlResult) => {
          if (graphQlResult.data?.getUser?.nativePlants?.items?.map) {
            const nativePlants =
              graphQlResult.data.getUser.nativePlants.items.map(
                (nativePlant) => {
                  const { id, projectNotes } = nativePlant || {};

                  if (nativePlant?.nativePlant && id && projectNotes) {
                    const { __typename, ...noTypeName } =
                      nativePlant.nativePlant;
                    return {
                      id,
                      projectNotes: nativePlant?.projectNotes || '',
                      ...noTypeName
                    };
                  } else {
                    throw new Error(
                      'getUserNatives: Unexepcted result from API'
                    );
                  }
                }
              );

            resolve({ nativePlants });
          } else {
            reject(new Error('getUserNatives: Unexepcted result from API'));
          }
        })
        .catch((err) => reject(err))
    )
  );
};

const userNativePlantSlice = createSlice({
  name: 'userNativePlantSlice',
  initialState,
  reducers: {
    ADD_USER_NATIVE: (
      state,
      action: PayloadAction<Promise<UserNativePayload>>
    ) => {
      console.log(
        'Is payload a promise? -> ',
        action.payload instanceof Promise
      );
      return state;
    },
    UPDATE_PROJECT_NOTES: (
      state,
      action: PayloadAction<Promise<UserNativePayload>>
    ) => {
      console.log(
        'Is payload a promise? -> ',
        action.payload instanceof Promise
      );
      return state;
    },
    REMOVE_USER_NATIVE: (
      state,
      action: PayloadAction<Promise<UserNativePayload>>
    ) => {
      console.log(
        'Is payload a promise? -> ',
        action.payload instanceof Promise
      );
      return state;
    },
    GET_USER_NATIVES: (
      state,
      action: PayloadAction<Promise<UserNativePayload>>
    ) => {
      console.log(
        'Is payload a promise? -> ',
        action.payload instanceof Promise
      );
      return state;
    }
  },
  extraReducers: {
    ADD_USER_NATIVE_PENDING: (state, action) => {
      pending(state, action);
    },
    ADD_USER_NATIVE_FULFILLED: (
      state,
      action: PayloadAction<UserNativePayload>
    ) => {
      fulfill(state, action);
    },
    ADD_USER_NATIVE_REJECTED: (state, action) => {
      reject(state, action);
    },
    UPDATE_PROJECT_NOTES_PENDING: (state, action) => {
      pending(state, action);
    },
    UPDATE_PROJECT_NOTES_FULFILLED: (
      state,
      action: PayloadAction<UserNativePayload>
    ) => {
      fulfill(state, action);
    },
    UPDATE_PROJECT_NOTES_REJECTED: (state, action) => {
      reject(state, action);
    },
    REMOVE_USER_NATIVE_PENDING: (state, action) => {
      pending(state, action);
    },
    REMOVE_USER_NATIVE_FULFILLED: (
      state,
      action: PayloadAction<UserNativePayload>
    ) => {
      fulfill(state, action);
    },
    REMOVE_USER_NATIVE_REJECTED: (state, action) => {
      reject(state, action);
    },
    GET_USER_NATIVES_PENDING: (state, action) => {
      pending(state, action);
    },
    GET_USER_NATIVES_FULFILLED: (
      state,
      action: PayloadAction<UserNativePayload>
    ) => {
      fulfill(state, action);
    },
    GET_USER_NATIVES_REJECTED: (state, action) => {
      reject(state, action);
    }
  }
});

export default userNativePlantSlice;
