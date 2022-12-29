import { GraphQLResult } from '@aws-amplify/api-graphql';
import {
  CaseReducer,
  createAsyncThunk,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
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
import {
  isFulfilledMatcher,
  isPendingMatcher,
  isRejectedMatcher
} from '../utilities';

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

const name = 'userSlice';

export const getUserInfo = createAsyncThunk(`${name}/getUserInfo`, async () => {
  const { attributes } = await Auth.currentAuthenticatedUser({
    bypassCache: true
  });
  const getUserInput: GetUserCQueryVariables = {
    email: attributes.email
  };
  const graphQLResult = await (API.graphql(
    graphqlOperation(getUserC, getUserInput)
  ) as Promise<GraphQLResult<GetUserCQuery>>);
  if (graphQLResult.data?.getUser) {
    const { __typename, ...noTypeName } = graphQLResult.data.getUser;
    return noTypeName;
  } else {
    throw new Error('getUserInfo: Unexpected result from API');
  }
});

export const updateUser = createAsyncThunk(
  `${name}/updateUser`,
  async (userParams: Omit<UpdateUserInput, 'email'>) => {
    const { attributes } = await Auth.currentAuthenticatedUser({
      bypassCache: true
    });
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
      return noTypeName;
    } else {
      throw new Error('updateUser: Unexpected result from API');
    }
  }
);

export const deleteUser = createAsyncThunk(`${name}/deleteUser`, async () => {
  const { attributes } = await Auth.currentAuthenticatedUser({
    bypassCache: true
  });
  const deleteUserInput: DeleteUserCMutationVariables = {
    input: { email: attributes.email }
  };
  const graphQlResult = await (API.graphql(
    graphqlOperation(deleteUserC, deleteUserInput)
  ) as Promise<GraphQLResult<DeleteUserCMutation>>);
  if (graphQlResult.data?.deleteUser) {
    const { __typename, ...noTypeName } = graphQlResult.data.deleteUser;

    if (noTypeName?.managementMethods?.items instanceof Array) {
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
    return noTypeName;
  } else {
    throw new Error('deleteUser: Unexpected result from API');
  }
});

const userSlice = createSlice({
  name,
  initialState,
  reducers: {
    RESET_STORE: () => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher((action) => isPendingMatcher(action, userSlice.name), pending)
      .addMatcher(
        (action) => isFulfilledMatcher(action, userSlice.name),
        fulfill
      )
      .addMatcher(
        (action) => isRejectedMatcher(action, userSlice.name),
        reject
      );
  }
});
export default userSlice;
