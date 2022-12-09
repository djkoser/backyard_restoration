import { GraphQLResult } from '@aws-amplify/api-graphql';
import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import {
  CreateUserNativePlantCMutation,
  CreateUserNativePlantCMutationVariables,
  DeleteUserNativePlantCMutation,
  DeleteUserNativePlantCMutationVariables,
  GetUserNativePlantsQuery,
  GetUserNativePlantsQueryVariables,
  UpdateUserNativePlantCMutation,
  UpdateUserNativePlantCMutationVariables,
  UpdateUserNativePlantInput
} from '../API';
import {
  createUserNativePlantC,
  deleteUserNativePlantC,
  updateUserNativePlantC
} from '../graphql/customMutations';
import { getUserNativePlants } from '../graphql/customQueries';
import { UserNativePayload, UserNativeState } from '../types/state';
import { isFulfilled, isPending, isRejected } from '../utilities';

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
  return { ...action.payload, ...{ loading: false, failed: false } };
};

export const addUserNative = (userNativePlantNativePlantId: string) => {
  return userNativePlantSlice.actions.ADD_USER_NATIVE(
    new Promise((resolve, reject) =>
      Auth.currentAuthenticatedUser()
        .then(async ({ attributes }) => {
          const createUserNativePlantInput: CreateUserNativePlantCMutationVariables =
            {
              input: {
                projectNotes: '',
                userNativePlantsId: attributes.email,
                userNativePlantNativePlantId
              }
            };
          const graphQlResult = await (API.graphql(
            graphqlOperation(createUserNativePlantC, createUserNativePlantInput)
          ) as Promise<GraphQLResult<CreateUserNativePlantCMutation>>);
          if (
            graphQlResult.data?.createUserNativePlant?.user?.nativePlants?.items
              ?.map
          ) {
            const nativePlants =
              graphQlResult.data.createUserNativePlant.user.nativePlants.items.map(
                (nativePlant) => {
                  const { projectNotes, id } = nativePlant || {};
                  if (
                    nativePlant?.nativePlant &&
                    typeof projectNotes === 'string' &&
                    id
                  ) {
                    const { __typename, ...noTypeName } =
                      nativePlant.nativePlant;
                    return {
                      id,
                      projectNotes,
                      ...noTypeName
                    };
                  } else {
                    throw new Error(
                      'addUserNative: Unexpected result from API'
                    );
                  }
                }
              );

            resolve({ nativePlants });
          } else {
            throw new Error('addUserNative: Unexpected result from API');
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
    new Promise((resolve, reject) => {
      const updateUserNativePlantInput: UpdateUserNativePlantCMutationVariables =
        {
          input: newUserNativeProperties
        };
      return (
        API.graphql(
          graphqlOperation(updateUserNativePlantC, updateUserNativePlantInput)
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
                  if (
                    nativePlant?.nativePlant &&
                    id &&
                    typeof projectNotes === 'string'
                  ) {
                    const { __typename, ...noTypeName } =
                      nativePlant.nativePlant;
                    return {
                      id,
                      projectNotes,
                      ...noTypeName
                    };
                  } else {
                    throw new Error(
                      'updateUserNative: Unexpected result from API'
                    );
                  }
                }
              );
            resolve({ nativePlants });
          } else {
            reject(new Error('updateUserNative: Unexpected result from API'));
          }
        })
        .catch((err) => reject(err));
    })
  );
};
export const deleteUserNative = (userNativeId: string) => {
  return userNativePlantSlice.actions.REMOVE_USER_NATIVE(
    new Promise((resolve, reject) => {
      const deleteUserNativePlantInput: DeleteUserNativePlantCMutationVariables =
        {
          input: { id: userNativeId }
        };
      return (
        API.graphql(
          graphqlOperation(deleteUserNativePlantC, deleteUserNativePlantInput)
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

                  if (
                    nativePlant?.nativePlant &&
                    id &&
                    typeof projectNotes === 'string'
                  ) {
                    const { __typename, ...noTypeName } =
                      nativePlant.nativePlant;
                    return {
                      id,
                      projectNotes: nativePlant?.projectNotes || '',
                      ...noTypeName
                    };
                  } else {
                    throw new Error(
                      'deleteUserNative: Unexpected result from API'
                    );
                  }
                }
              );

            resolve({ nativePlants });
          } else {
            reject(new Error('deleteUserNative: Unexpected result from API'));
          }
        })
        .catch((err) => reject(err));
    })
  );
};
export const getUserNatives = () => {
  return userNativePlantSlice.actions.GET_USER_NATIVES(
    new Promise((resolve, reject) =>
      Auth.currentAuthenticatedUser({
        bypassCache: true
      })
        .then(async ({ attributes }) => {
          const getUserNativePlantsInput: GetUserNativePlantsQueryVariables = {
            email: attributes.email
          };
          const graphQlResult = await (API.graphql(
            graphqlOperation(getUserNativePlants, getUserNativePlantsInput)
          ) as Promise<GraphQLResult<GetUserNativePlantsQuery>>);
          if (graphQlResult.data?.getUser?.nativePlants?.items?.map) {
            const nativePlants =
              graphQlResult.data.getUser.nativePlants.items.map(
                (nativePlant) => {
                  const { id, projectNotes } = nativePlant || {};

                  if (
                    nativePlant?.nativePlant &&
                    id &&
                    typeof projectNotes === 'string'
                  ) {
                    const { __typename, ...noTypeName } =
                      nativePlant.nativePlant;
                    return {
                      id,
                      projectNotes: nativePlant?.projectNotes || '',
                      ...noTypeName
                    };
                  } else {
                    throw new Error(
                      'getUserNatives: Unexpected result from API'
                    );
                  }
                }
              );

            resolve({ nativePlants });
          } else {
            reject(new Error('getUserNatives: Unexpected result from API'));
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
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => isPending(action, userNativePlantSlice.name),
        pending
      )
      .addMatcher(
        (action) => isFulfilled(action, userNativePlantSlice.name),
        fulfill
      )
      .addMatcher(
        (action) => isRejected(action, userNativePlantSlice.name),
        reject
      );
  }
});

export default userNativePlantSlice;
