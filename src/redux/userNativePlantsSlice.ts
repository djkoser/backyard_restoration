import { GraphQLResult } from '@aws-amplify/api-graphql';
import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API, graphqlOperation } from 'aws-amplify';
import {
  CreateUserNativePlantInput,
  DeleteUserNativePlantInput,
  UpdateUserNativePlantInput,
  UpdateUserNativePlantCMutation,
  DeleteUserNativePlantCMutation,
  CreateUserNativePlantCMutation
} from '../API';
import {
  createUserNativePlantC,
  updateUserNativePlantC,
  deleteUserNativePlantC
} from '../graphql/customMutations';
import { UserNativePayload, UserNativePlantState } from '../types/state';

const initialUserNativesPayload: UserNativePayload = {
  userNatives: []
};

const initialState: UserNativePlantState = {
  ...initialUserNativesPayload,
  loading: false,
  failed: false
};

const pending: CaseReducer<UserNativePlantState, PayloadAction<undefined>> = (
  state
) => {
  state.loading = true;
  state.failed = false;
};
const reject: CaseReducer<UserNativePlantState, PayloadAction<undefined>> = (
  state
) => {
  state.loading = false;
  state.failed = true;
};

const fulfill: CaseReducer<
  UserNativePlantState,
  PayloadAction<UserNativePayload>
> = (state) => {
  state.loading = false;
  state.failed = false;
};

export const addUserNative = (nativeID: string) => {
  return userNativePlantSlice.actions.ADD_USER_NATIVE(
    new Promise((resolve, reject) => {
      const addNativeQuery: CreateUserNativePlantInput = {
        projectNotes: '',
        userNativePlantNativeIdId: nativeID
      };
      (
        API.graphql(
          graphqlOperation(createUserNativePlantC, addNativeQuery)
        ) as Promise<GraphQLResult<CreateUserNativePlantCMutation>>
      )
        .then((res) => {
          resolve(res.data?.createUserNativePlant?.user);
        })
        .catch((err) => {
          reject(err);
        });
    })
  );
};

export const updateProjectNotes = (id: string, projectNotes: string) => {
  return userNativePlantSlice.actions.UPDATE_PROJECT_NOTES(
    new Promise((resolve, reject) => {
      const updateProjectNotesQuery: UpdateUserNativePlantInput = {
        id,
        projectNotes
      };
      (
        API.graphql(
          graphqlOperation(updateUserNativePlantC, updateProjectNotesQuery)
        ) as Promise<GraphQLResult<UpdateUserNativePlantCMutation>>
      )
        .then((res) => {
          resolve(res.data?.updateUserNativePlant?.user);
        })
        .catch((err) => {
          reject(err);
        });
    })
  );
};

export const removeUserNative = (id: string) => {
  return userNativePlantSlice.actions.REMOVE_USER_NATIVE(
    new Promise((resolve, reject) => {
      const removeNativeQuery: DeleteUserNativePlantInput = { id };
      (
        API.graphql(
          graphqlOperation(deleteUserNativePlantC, removeNativeQuery)
        ) as Promise<GraphQLResult<DeleteUserNativePlantCMutation>>
      )
        .then((res) => {
          resolve(res.data?.deleteUserNativePlant?.userId);
        })
        .catch((err) => {
          reject(err);
        });
    })
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
    }
  }
});

export default userNativePlantSlice;
