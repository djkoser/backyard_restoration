import { GraphQLResult } from '@aws-amplify/api-graphql';
import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API, graphqlOperation } from 'aws-amplify';
import {
  DeleteUserManagementMethodInput,
  CreateUserManagementMethodInput,
  DeleteUserManagementMethodCMutation,
  CreateUserManagementMethodCMutation
} from '../API';
import { UserMethodPayload, UserMethodState } from '../types/state';
import {
  deleteUserManagementMethodC,
  createUserManagementMethodC
} from '../graphql/customMutations';

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
> = (state) => {
  state.loading = false;
  state.failed = false;
};

export const removeUserMethod = (methodID: string) => {
  return userMethodSlice.actions.REMOVE_USER_METHOD(
    new Promise((resolve, reject) => {
      const removeMethodQuery: DeleteUserManagementMethodInput = {
        id: methodID
      };
      (
        API.graphql(
          graphqlOperation(deleteUserManagementMethodC, removeMethodQuery)
        ) as Promise<GraphQLResult<DeleteUserManagementMethodCMutation>>
      )
        .then((res) => {
          resolve(res.data?.deleteUserManagementMethod?.userId);
        })
        .catch((err) => {
          reject(err);
        });
    })
  );
};

export const adduserMethod = (methodID: string) => {
  return userMethodSlice.actions.ADD_USER_METHOD(
    new Promise((resolve, reject) => {
      const addMethodQuery: CreateUserManagementMethodInput = {
        userManagementMethodsId: methodID,
        projectNotes: ''
      };
      (
        API.graphql(
          graphqlOperation(createUserManagementMethodC, addMethodQuery)
        ) as Promise<GraphQLResult<CreateUserManagementMethodCMutation>>
      )
        .then((res) => {
          resolve(res.data?.createUserManagementMethod?.userId);
        })
        .catch((err) => {
          reject(err);
        });
    })
  );
};

const userMethodSlice = createSlice({
  reducers: {
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
    ADD_USER_METHOD: (
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
    }
  },
  name: 'userMethodSlice',
  initialState
});

export default userMethodSlice;
