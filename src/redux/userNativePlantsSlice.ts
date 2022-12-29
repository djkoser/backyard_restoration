import { GraphQLResult } from '@aws-amplify/api-graphql';
import {
  CaseReducer,
  createAsyncThunk,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
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
import {
  isFulfilledMatcher,
  isPendingMatcher,
  isRejectedMatcher
} from '../utilities';

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

const name = 'userNativePlantSlice';

export const addUserNative = createAsyncThunk(
  `${name}/addUserNative`,
  async (userNativePlantNativePlantNativeId: string) => {
    const { attributes } = await Auth.currentAuthenticatedUser();
    const createUserNativePlantInput: CreateUserNativePlantCMutationVariables =
      {
        input: {
          projectNotes: '',
          userNativePlantsEmail: attributes.email,
          userNativePlantNativePlantNativeId
        }
      };
    const graphQlResult = (await API.graphql(
      graphqlOperation(createUserNativePlantC, createUserNativePlantInput)
    )) as Awaited<Promise<GraphQLResult<CreateUserNativePlantCMutation>>>;

    if (
      graphQlResult.data?.createUserNativePlant?.user?.nativePlants?.items?.map
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
              const { __typename, ...noTypeName } = nativePlant.nativePlant;
              return {
                id,
                projectNotes,
                ...noTypeName
              };
            } else {
              throw new Error('addUserNative: Unexpected result from API');
            }
          }
        );

      return { nativePlants };
    } else {
      throw new Error('addUserNative: Unexpected result from API');
    }
  }
);

export const updateUserNative = createAsyncThunk(
  `${name}/updateUserNative`,
  async (newUserNativeProperties: UpdateUserNativePlantInput) => {
    const updateUserNativePlantInput: UpdateUserNativePlantCMutationVariables =
      {
        input: newUserNativeProperties
      };
    const graphQLResult = (await API.graphql(
      graphqlOperation(updateUserNativePlantC, updateUserNativePlantInput)
    )) as Awaited<Promise<GraphQLResult<UpdateUserNativePlantCMutation>>>;

    if (
      graphQLResult.data?.updateUserNativePlant?.user?.nativePlants?.items?.map
    ) {
      const nativePlants =
        graphQLResult.data.updateUserNativePlant.user.nativePlants.items.map(
          (nativePlant) => {
            const { id, projectNotes } = nativePlant || {};
            if (
              nativePlant?.nativePlant &&
              id &&
              typeof projectNotes === 'string'
            ) {
              const { __typename, ...noTypeName } = nativePlant.nativePlant;
              return {
                id,
                projectNotes,
                ...noTypeName
              };
            } else {
              throw new Error('updateUserNative: Unexpected result from API');
            }
          }
        );
      return { nativePlants };
    } else {
      throw new Error('updateUserNative: Unexpected result from API');
    }
  }
);

export const deleteUserNative = createAsyncThunk(
  `${name}/deleteUserNative`,
  async (userNativeId: string) => {
    const deleteUserNativePlantInput: DeleteUserNativePlantCMutationVariables =
      {
        input: { id: userNativeId }
      };
    const graphQLResult = (await API.graphql(
      graphqlOperation(deleteUserNativePlantC, deleteUserNativePlantInput)
    )) as Awaited<Promise<GraphQLResult<DeleteUserNativePlantCMutation>>>;

    if (
      graphQLResult.data?.deleteUserNativePlant?.user?.nativePlants?.items?.map
    ) {
      const nativePlants =
        graphQLResult.data.deleteUserNativePlant.user.nativePlants.items.map(
          (nativePlant) => {
            const { id, projectNotes } = nativePlant || {};

            if (
              nativePlant?.nativePlant &&
              id &&
              typeof projectNotes === 'string'
            ) {
              const { __typename, ...noTypeName } = nativePlant.nativePlant;
              return {
                id,
                projectNotes: nativePlant?.projectNotes || '',
                ...noTypeName
              };
            } else {
              throw new Error('deleteUserNative: Unexpected result from API');
            }
          }
        );

      return { nativePlants };
    } else {
      throw new Error('deleteUserNative: Unexpected result from API');
    }
  }
);

export const getUserNatives = createAsyncThunk(
  `${name}/getUserNatives`,
  async () => {
    const { attributes } = await Auth.currentAuthenticatedUser({
      bypassCache: true
    });
    const getUserNativePlantsInput: GetUserNativePlantsQueryVariables = {
      email: attributes.email
    };
    const graphQlResult = await (API.graphql(
      graphqlOperation(getUserNativePlants, getUserNativePlantsInput)
    ) as Promise<GraphQLResult<GetUserNativePlantsQuery>>);
    if (graphQlResult.data?.getUser?.nativePlants?.items?.map) {
      const nativePlants = graphQlResult.data.getUser.nativePlants.items.map(
        (nativePlant) => {
          const { id, projectNotes } = nativePlant || {};

          if (
            nativePlant?.nativePlant &&
            id &&
            typeof projectNotes === 'string'
          ) {
            const { __typename, ...noTypeName } = nativePlant.nativePlant;
            return {
              id,
              projectNotes: nativePlant?.projectNotes || '',
              ...noTypeName
            };
          } else {
            throw new Error('getUserNatives: Unexpected result from API');
          }
        }
      );

      return { nativePlants };
    } else {
      throw new Error('getUserNatives: Unexpected result from API');
    }
  }
);

const userNativePlantSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => isPendingMatcher(action, userNativePlantSlice.name),
        pending
      )
      .addMatcher(
        (action) => isFulfilledMatcher(action, userNativePlantSlice.name),
        fulfill
      )
      .addMatcher(
        (action) => isRejectedMatcher(action, userNativePlantSlice.name),
        reject
      );
  }
});

export default userNativePlantSlice;
