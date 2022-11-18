import { GraphQLResult } from '@aws-amplify/api-graphql';
import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import {
  CreateUserManagementMethodInput,
  CreateUserManagementMethodMutation,
  CreateUserNativePlantInput,
  CreateUserNativePlantMutation,
  DeleteUserManagementMethodInput,
  DeleteUserManagementMethodMutation,
  DeleteUserNativePlantInput,
  DeleteUserNativePlantMutation,
  GetUserInfoQuery,
  GetUserInfoQueryVariables,
  UpdateUserNativePlantInput,
  UpdateUserNativePlantMutation
} from '../API';
import {
  deleteUserManagementMethod,
  deleteUserNativePlant
} from '../graphql/mutations';
import { UserInfoPayload, UserInfoState } from '../types';

const initialState: UserInfoState = {
  userId: 0,
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
  hardinessZone: '',
  loading: false,
  failed: false,
  userMethods: [],
  natives: []
};

const pending: CaseReducer<UserInfoState, PayloadAction<undefined>> = (
  state
) => {
  state.loading = true;
  state.failed = false;
};
const reject: CaseReducer<UserInfoState, PayloadAction<undefined>> = (
  state
) => {
  state.loading = false;
  state.failed = true;
};

const fulfill: CaseReducer<UserInfoState, PayloadAction<UserInfoPayload>> = (
  state
) => {
  state.loading = false;
  state.failed = false;
};

export const getUserInfo = () => {
  return {
    type: 'GET_USER_INFO' as const,
    payload: new Promise((resolve, reject) => {
      Auth.currentAuthenticatedUser({
        bypassCache: true
      })
        .then(async (res) => {
          const { attributes } = res;
          const { email } = attributes;
          const userInfoQuery: GetUserInfoQueryVariables = { email };
          const graphQLResult = (await API.graphql(
            graphqlOperation(getUserInfo, userInfoQuery)
          )) as GraphQLResult<GetUserInfoQuery>;
          resolve(graphQLResult.data?.getUserInfo);
        })
        .catch((err) => reject(err));
    })
  };
};

export const toggleUserMethod = (methodID: string) => {
  return {
    type: 'TOGGLE_USER_METHOD',
    payload: new Promise((resolve, reject) => {
      Auth.currentAuthenticatedUser({
        bypassCache: true
      })
        .then(async (res) => {
          const { attributes } = res;
          const { email } = attributes;
          const userInfoQuery: GetUserInfoQueryVariables = { email };
          const graphQLResult = (await API.graphql(
            graphqlOperation(getUserInfo, userInfoQuery)
          )) as GraphQLResult<GetUserInfoQuery>;
          const result =
            graphQLResult.data?.getUserInfo?.managementMethods?.items.some(
              (managementMethod) =>
                managementMethod?.userManagementMethodMethodIdId === methodID
            )
              ? await removeUserMethod(methodID)
              : await adduserMethod(methodID);

          resolve(result);
        })
        .catch((err) => reject(err));
    })
  };
};

const removeUserMethod = (methodID: string) => {
  return new Promise((resolve, reject) => {
    const removeMethodQuery: DeleteUserManagementMethodInput = {
      id: methodID
    };
    (
      API.graphql(
        graphqlOperation(deleteUserManagementMethod, removeMethodQuery)
      ) as Promise<GraphQLResult<DeleteUserManagementMethodMutation>>
    )
      .then((res) => {
        resolve(res.data?.deleteUserManagementMethod?.userId);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const adduserMethod = (methodID: string) => {
  return new Promise((resolve, reject) => {
    const addMethodQuery: CreateUserManagementMethodInput = {
      userManagementMethodMethodIdId: methodID
    };
    (
      API.graphql(graphqlOperation(adduserMethod, addMethodQuery)) as Promise<
        GraphQLResult<CreateUserManagementMethodMutation>
      >
    )
      .then((res) => {
        resolve(res.data?.createUserManagementMethod?.userId);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const addUserNative = (nativeID: string) => {
  return {
    type: 'ADD_USER_NATIVE' as const,
    payload: new Promise((resolve, reject) => {
      const addNativeQuery: CreateUserNativePlantInput = {
        projectNotes: '',
        userNativePlantNativeIdId: nativeID
      };
      (
        API.graphql(graphqlOperation(addUserNative, addNativeQuery)) as Promise<
          GraphQLResult<CreateUserNativePlantMutation>
        >
      )
        .then((res) => {
          resolve(res.data?.createUserNativePlant?.userId);
        })
        .catch((err) => {
          reject(err);
        });
    })
  };
};

export const updateProjectNotes = (id: string, projectNotes: string) => {
  return {
    type: 'UPDATE_PROJECT_NOTES' as const,
    payload: new Promise((resolve, reject) => {
      const updateProjectNotesQuery: UpdateUserNativePlantInput = {
        id,
        projectNotes
      };
      (
        API.graphql(
          graphqlOperation(deleteUserNativePlant, updateProjectNotesQuery)
        ) as Promise<GraphQLResult<UpdateUserNativePlantMutation>>
      )
        .then((res) => {
          resolve(res.data?.updateUserNativePlant?.userId);
        })
        .catch((err) => {
          reject(err);
        });
    })
  };
};

export const removeUserNative = (id: string) => {
  return {
    type: 'REMOVE_USER_NATIVE' as const,
    payload: new Promise((resolve, reject) => {
      const removeNativeQuery: DeleteUserNativePlantInput = { id };
      (
        API.graphql(
          graphqlOperation(deleteUserNativePlant, removeNativeQuery)
        ) as Promise<GraphQLResult<DeleteUserNativePlantMutation>>
      )
        .then((res) => {
          resolve(res.data?.deleteUserNativePlant?.userId);
        })
        .catch((err) => {
          reject(err);
        });
    })
  };
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    GET_USER_INFO: (state, action: PayloadAction<Promise<UserInfoPayload>>) => {
      console.log(
        'Is payload a promise? -> ',
        action.payload instanceof Promise
      );
      return state;
    },
    TOGGLE_USER_METHOD: (
      state,
      action: PayloadAction<Promise<UserInfoPayload>>
    ) => {
      console.log(
        'Is payload a promise? -> ',
        action.payload instanceof Promise
      );
      return state;
    },
    ADD_USER_NATIVE: (
      state,
      action: PayloadAction<Promise<UserInfoPayload>>
    ) => {
      console.log(
        'Is payload a promise? -> ',
        action.payload instanceof Promise
      );
      return state;
    },
    UPDATE_PROJECT_NOTES: (
      state,
      action: PayloadAction<Promise<UserInfoPayload>>
    ) => {
      console.log(
        'Is payload a promise? -> ',
        action.payload instanceof Promise
      );
      return state;
    },
    REMOVE_USER_NATIVE: (
      state,
      action: PayloadAction<Promise<UserInfoPayload>>
    ) => {
      console.log(
        'Is payload a promise? -> ',
        action.payload instanceof Promise
      );
      return state;
    },
    RESET_STORE: () => {
      return initialState;
    }
  },
  extraReducers: {
    GET_USER_INFO_PENDING: (state, action) => {
      pending(state, action);
    },
    GET_USER_INFO_FULFILLED: (state, action) => {
      fulfill(state, action);
    },
    GET_USER_INFO_REJECTED: (state, action) => {
      reject(state, action);
    },
    TOGGLE_USER_METHOD_PENDING: (state, action) => {
      pending(state, action);
    },
    TOGGLE_USER_METHOD_FULFILLED: (
      state,
      action: PayloadAction<UserInfoPayload>
    ) => {
      fulfill(state, action);
    },
    TOGGLE_USER_METHOD_REJECTED: (state, action) => {
      reject(state, action);
    },
    ADD_USER_NATIVE_PENDING: (state, action) => {
      pending(state, action);
    },
    ADD_USER_NATIVE_FULFILLED: (
      state,
      action: PayloadAction<UserInfoPayload>
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
      action: PayloadAction<UserInfoPayload>
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
      action: PayloadAction<UserInfoPayload>
    ) => {
      fulfill(state, action);
    },
    REMOVE_USER_NATIVE_REJECTED: (state, action) => {
      reject(state, action);
    }
  }
});

export default userInfoSlice;
