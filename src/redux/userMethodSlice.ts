import { GraphQLResult } from '@aws-amplify/api-graphql';
import {
  CaseReducer,
  createSlice,
  PayloadAction,
  createAsyncThunk
} from '@reduxjs/toolkit';
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
import {
  isFulfilledMatcher,
  isPendingMatcher,
  isRejectedMatcher
} from '../utilities';

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
  return { ...action.payload, ...{ loading: false, failed: false } };
};

const name = 'userMethodSlice';

export const addUserManagementMethod = createAsyncThunk(
  `${name}/addUserManagementMethod`,
  async (userManagementMethodManagementMethodMethodId: string) => {
    const { attributes } = await Auth.currentAuthenticatedUser({
      bypassCache: true
    });

    const createUserManagementMethodInput: CreateUserManagementMethodCMutationVariables =
      {
        input: {
          projectNotes: '',
          userManagementMethodsEmail: attributes.email,
          userManagementMethodManagementMethodMethodId
        }
      };

    const graphQlResult = await (API.graphql(
      graphqlOperation(
        createUserManagementMethodC,
        createUserManagementMethodInput
      )
    ) as Promise<GraphQLResult<CreateUserManagementMethodCMutation>>);

    if (
      graphQlResult.data?.createUserManagementMethod?.user?.managementMethods
        ?.items?.map
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
      return { userMethods };
    } else {
      throw new Error('addUserManagementMethod: Unexpected result from API');
    }
  }
);

export const updateUserMethod = createAsyncThunk(
  `${name}/updateUserMethod`,
  async (newUserMethodProperties: UpdateUserManagementMethodInput) => {
    const updateUserManagementMethodInput: UpdateUserManagementMethodCMutationVariables =
      {
        input: newUserMethodProperties
      };

    const graphQLResult = (await API.graphql(
      graphqlOperation(
        updateUserManagementMethodC,
        updateUserManagementMethodInput
      )
    )) as Awaited<Promise<GraphQLResult<UpdateUserManagementMethodCMutation>>>;

    if (
      graphQLResult.data?.updateUserManagementMethod?.user?.managementMethods
        ?.items?.map
    ) {
      const userMethods =
        graphQLResult.data.updateUserManagementMethod.user.managementMethods.items.map(
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
              throw new Error('updateUserMethod: Unexpected result from API');
            }
          }
        );

      return { userMethods };
    } else {
      throw new Error('updateUserMethod: Unexpected result from API');
    }
  }
);

export const deleteUserManagementMethod = createAsyncThunk(
  `${name}/deleteUserManagementMethod`,
  async (userMethodId: string) => {
    const deleteUserManagementMethodInput: DeleteUserManagementMethodCMutationVariables =
      {
        input: { id: userMethodId }
      };
    const graphQLResult = (await API.graphql(
      graphqlOperation(
        deleteUserManagementMethodC,
        deleteUserManagementMethodInput
      )
    )) as Awaited<Promise<GraphQLResult<DeleteUserManagementMethodCMutation>>>;

    if (
      graphQLResult.data?.deleteUserManagementMethod?.user?.managementMethods
        ?.items?.map
    ) {
      const userMethods =
        graphQLResult.data.deleteUserManagementMethod.user.managementMethods.items.map(
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

      return { userMethods };
    } else {
      throw new Error('deleteUserManagementMethod: Unexpected result from API');
    }
  }
);

export const getUserMethods = createAsyncThunk(
  `${name}/getUserMethods`,
  async () => {
    const { attributes } = await Auth.currentAuthenticatedUser({
      bypassCache: true
    });
    const getUserManagementMethodsInput: GetUserManagementMethodsQueryVariables =
      {
        email: attributes.email
      };
    const graphQlResult = (await API.graphql(
      graphqlOperation(getUserManagementMethods, getUserManagementMethodsInput)
    )) as Awaited<Promise<GraphQLResult<GetUserManagementMethodsQuery>>>;

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
              throw new Error('getUserMethods: Unexpected result from API');
            }
          }
        );

      return { userMethods };
    } else {
      throw new Error('getUserMethods: Unexpected result from API');
    }
  }
);

const userMethodSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => isPendingMatcher(action, userMethodSlice.name),
        pending
      )
      .addMatcher(
        (action) => isFulfilledMatcher(action, userMethodSlice.name),
        fulfill
      )
      .addMatcher(
        (action) => isRejectedMatcher(action, userMethodSlice.name),
        reject
      );
  }
});

export default userMethodSlice;
