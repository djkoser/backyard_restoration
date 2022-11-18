/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateWeedInput = {
  weedId: string;
  vegetationType: string;
  commonName: string;
  botanicalName: string;
  annualPerennialBiennial: string;
  description: string;
  src: string;
};

export type ModelWeedConditionInput = {
  vegetationType?: ModelStringInput | null;
  commonName?: ModelStringInput | null;
  botanicalName?: ModelStringInput | null;
  annualPerennialBiennial?: ModelStringInput | null;
  description?: ModelStringInput | null;
  src?: ModelStringInput | null;
  and?: Array<ModelWeedConditionInput | null> | null;
  or?: Array<ModelWeedConditionInput | null> | null;
  not?: ModelWeedConditionInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = 'binary',
  binarySet = 'binarySet',
  bool = 'bool',
  list = 'list',
  map = 'map',
  number = 'number',
  numberSet = 'numberSet',
  string = 'string',
  stringSet = 'stringSet',
  _null = '_null'
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type Weed = {
  __typename: 'Weed';
  weedId: string;
  vegetationType: string;
  commonName: string;
  botanicalName: string;
  annualPerennialBiennial: string;
  description: string;
  managementMethods?: ModelManagementMethodConnection | null;
  src: string;
  createdAt: string;
  updatedAt: string;
};

export type ModelManagementMethodConnection = {
  __typename: 'ModelManagementMethodConnection';
  items: Array<ManagementMethod | null>;
  nextToken?: string | null;
};

export type ManagementMethod = {
  __typename: 'ManagementMethod';
  methodId: string;
  weedId: Weed;
  name: string;
  description: string;
  january: number;
  february: number;
  march: number;
  april: number;
  may: number;
  june: number;
  july: number;
  august: number;
  september: number;
  october: number;
  november: number;
  december: number;
  createdAt: string;
  updatedAt: string;
  weedManagementMethodsId?: string | null;
  managementMethodWeedIdId: string;
};

export type DeleteWeedInput = {
  weedId: string;
};

export type CreateManagementMethodInput = {
  methodId: string;
  name: string;
  description: string;
  january: number;
  february: number;
  march: number;
  april: number;
  may: number;
  june: number;
  july: number;
  august: number;
  september: number;
  october: number;
  november: number;
  december: number;
  weedManagementMethodsId?: string | null;
  managementMethodWeedIdId: string;
};

export type ModelManagementMethodConditionInput = {
  name?: ModelStringInput | null;
  description?: ModelStringInput | null;
  january?: ModelIntInput | null;
  february?: ModelIntInput | null;
  march?: ModelIntInput | null;
  april?: ModelIntInput | null;
  may?: ModelIntInput | null;
  june?: ModelIntInput | null;
  july?: ModelIntInput | null;
  august?: ModelIntInput | null;
  september?: ModelIntInput | null;
  october?: ModelIntInput | null;
  november?: ModelIntInput | null;
  december?: ModelIntInput | null;
  and?: Array<ModelManagementMethodConditionInput | null> | null;
  or?: Array<ModelManagementMethodConditionInput | null> | null;
  not?: ModelManagementMethodConditionInput | null;
  weedManagementMethodsId?: ModelIDInput | null;
  managementMethodWeedIdId?: ModelIDInput | null;
};

export type ModelIntInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type DeleteManagementMethodInput = {
  methodId: string;
};

export type CreateNativePlantInput = {
  nativeId: string;
  botanicalName: string;
  commonName: string;
  moisture: string;
  sun: string;
  height: string;
  bloomTime: string;
  src: string;
};

export type ModelNativePlantConditionInput = {
  botanicalName?: ModelStringInput | null;
  commonName?: ModelStringInput | null;
  moisture?: ModelStringInput | null;
  sun?: ModelStringInput | null;
  height?: ModelStringInput | null;
  bloomTime?: ModelStringInput | null;
  src?: ModelStringInput | null;
  and?: Array<ModelNativePlantConditionInput | null> | null;
  or?: Array<ModelNativePlantConditionInput | null> | null;
  not?: ModelNativePlantConditionInput | null;
};

export type NativePlant = {
  __typename: 'NativePlant';
  nativeId: string;
  botanicalName: string;
  commonName: string;
  moisture: string;
  sun: string;
  height: string;
  bloomTime: string;
  src: string;
  createdAt: string;
  updatedAt: string;
};

export type DeleteNativePlantInput = {
  nativeId: string;
};

export type CreateUserInfoInput = {
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  street?: string | null;
  city?: string | null;
  state?: string | null;
  zipcode?: string | null;
  growingSeasonLength: number;
  firstGdd45: string;
  lastGdd45: string;
  hardinessZone: string;
  owner?: string | null;
};

export type ModelUserInfoConditionInput = {
  firstName?: ModelStringInput | null;
  lastName?: ModelStringInput | null;
  street?: ModelStringInput | null;
  city?: ModelStringInput | null;
  state?: ModelStringInput | null;
  zipcode?: ModelStringInput | null;
  growingSeasonLength?: ModelIntInput | null;
  firstGdd45?: ModelStringInput | null;
  lastGdd45?: ModelStringInput | null;
  hardinessZone?: ModelStringInput | null;
  owner?: ModelStringInput | null;
  and?: Array<ModelUserInfoConditionInput | null> | null;
  or?: Array<ModelUserInfoConditionInput | null> | null;
  not?: ModelUserInfoConditionInput | null;
};

export type UserInfo = {
  __typename: 'UserInfo';
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  street?: string | null;
  city?: string | null;
  state?: string | null;
  zipcode?: string | null;
  growingSeasonLength: number;
  firstGdd45: string;
  lastGdd45: string;
  hardinessZone: string;
  managementMethods?: ModelUserManagementMethodConnection | null;
  nativePlants?: ModelUserNativePlantConnection | null;
  owner?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ModelUserManagementMethodConnection = {
  __typename: 'ModelUserManagementMethodConnection';
  items: Array<UserManagementMethod | null>;
  nextToken?: string | null;
};

export type UserManagementMethod = {
  __typename: 'UserManagementMethod';
  id: string;
  userId?: UserInfo | null;
  methodId?: ManagementMethod | null;
  owner?: string | null;
  createdAt: string;
  updatedAt: string;
  userInfoManagementMethodsId?: string | null;
  userManagementMethodUserIdId?: string | null;
  userManagementMethodMethodIdId?: string | null;
};

export type ModelUserNativePlantConnection = {
  __typename: 'ModelUserNativePlantConnection';
  items: Array<UserNativePlant | null>;
  nextToken?: string | null;
};

export type UserNativePlant = {
  __typename: 'UserNativePlant';
  id: string;
  userId?: UserInfo | null;
  nativeId?: NativePlant | null;
  projectNotes: string;
  owner?: string | null;
  createdAt: string;
  updatedAt: string;
  userInfoNativePlantsId?: string | null;
  userNativePlantUserIdId?: string | null;
  userNativePlantNativeIdId?: string | null;
};

export type UpdateUserInfoInput = {
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  street?: string | null;
  city?: string | null;
  state?: string | null;
  zipcode?: string | null;
  growingSeasonLength?: number | null;
  firstGdd45?: string | null;
  lastGdd45?: string | null;
  hardinessZone?: string | null;
  owner?: string | null;
};

export type DeleteUserInfoInput = {
  email: string;
};

export type CreateUserNativePlantInput = {
  id?: string | null;
  projectNotes: string;
  owner?: string | null;
  userInfoNativePlantsId?: string | null;
  userNativePlantUserIdId?: string | null;
  userNativePlantNativeIdId?: string | null;
};

export type ModelUserNativePlantConditionInput = {
  projectNotes?: ModelStringInput | null;
  owner?: ModelStringInput | null;
  and?: Array<ModelUserNativePlantConditionInput | null> | null;
  or?: Array<ModelUserNativePlantConditionInput | null> | null;
  not?: ModelUserNativePlantConditionInput | null;
  userInfoNativePlantsId?: ModelIDInput | null;
  userNativePlantUserIdId?: ModelIDInput | null;
  userNativePlantNativeIdId?: ModelIDInput | null;
};

export type UpdateUserNativePlantInput = {
  id: string;
  projectNotes?: string | null;
  owner?: string | null;
  userInfoNativePlantsId?: string | null;
  userNativePlantUserIdId?: string | null;
  userNativePlantNativeIdId?: string | null;
};

export type DeleteUserNativePlantInput = {
  id: string;
};

export type CreateUserManagementMethodInput = {
  id?: string | null;
  owner?: string | null;
  userInfoManagementMethodsId?: string | null;
  userManagementMethodUserIdId?: string | null;
  userManagementMethodMethodIdId?: string | null;
};

export type ModelUserManagementMethodConditionInput = {
  owner?: ModelStringInput | null;
  and?: Array<ModelUserManagementMethodConditionInput | null> | null;
  or?: Array<ModelUserManagementMethodConditionInput | null> | null;
  not?: ModelUserManagementMethodConditionInput | null;
  userInfoManagementMethodsId?: ModelIDInput | null;
  userManagementMethodUserIdId?: ModelIDInput | null;
  userManagementMethodMethodIdId?: ModelIDInput | null;
};

export type DeleteUserManagementMethodInput = {
  id: string;
};

export type ModelWeedFilterInput = {
  weedId?: ModelIDInput | null;
  vegetationType?: ModelStringInput | null;
  commonName?: ModelStringInput | null;
  botanicalName?: ModelStringInput | null;
  annualPerennialBiennial?: ModelStringInput | null;
  description?: ModelStringInput | null;
  src?: ModelStringInput | null;
  and?: Array<ModelWeedFilterInput | null> | null;
  or?: Array<ModelWeedFilterInput | null> | null;
  not?: ModelWeedFilterInput | null;
};

export enum ModelSortDirection {
  ASC = 'ASC',
  DESC = 'DESC'
}

export type ModelWeedConnection = {
  __typename: 'ModelWeedConnection';
  items: Array<Weed | null>;
  nextToken?: string | null;
};

export type ModelManagementMethodFilterInput = {
  methodId?: ModelIDInput | null;
  name?: ModelStringInput | null;
  description?: ModelStringInput | null;
  january?: ModelIntInput | null;
  february?: ModelIntInput | null;
  march?: ModelIntInput | null;
  april?: ModelIntInput | null;
  may?: ModelIntInput | null;
  june?: ModelIntInput | null;
  july?: ModelIntInput | null;
  august?: ModelIntInput | null;
  september?: ModelIntInput | null;
  october?: ModelIntInput | null;
  november?: ModelIntInput | null;
  december?: ModelIntInput | null;
  and?: Array<ModelManagementMethodFilterInput | null> | null;
  or?: Array<ModelManagementMethodFilterInput | null> | null;
  not?: ModelManagementMethodFilterInput | null;
  weedManagementMethodsId?: ModelIDInput | null;
  managementMethodWeedIdId?: ModelIDInput | null;
};

export type ModelNativePlantFilterInput = {
  nativeId?: ModelIDInput | null;
  botanicalName?: ModelStringInput | null;
  commonName?: ModelStringInput | null;
  moisture?: ModelStringInput | null;
  sun?: ModelStringInput | null;
  height?: ModelStringInput | null;
  bloomTime?: ModelStringInput | null;
  src?: ModelStringInput | null;
  and?: Array<ModelNativePlantFilterInput | null> | null;
  or?: Array<ModelNativePlantFilterInput | null> | null;
  not?: ModelNativePlantFilterInput | null;
};

export type ModelNativePlantConnection = {
  __typename: 'ModelNativePlantConnection';
  items: Array<NativePlant | null>;
  nextToken?: string | null;
};

export type ModelNativePlantByBotanicalNameAndGrowingParamsCompositeKeyConditionInput =
  {
    eq?: ModelNativePlantByBotanicalNameAndGrowingParamsCompositeKeyInput | null;
    le?: ModelNativePlantByBotanicalNameAndGrowingParamsCompositeKeyInput | null;
    lt?: ModelNativePlantByBotanicalNameAndGrowingParamsCompositeKeyInput | null;
    ge?: ModelNativePlantByBotanicalNameAndGrowingParamsCompositeKeyInput | null;
    gt?: ModelNativePlantByBotanicalNameAndGrowingParamsCompositeKeyInput | null;
    between?: Array<ModelNativePlantByBotanicalNameAndGrowingParamsCompositeKeyInput | null> | null;
    beginsWith?: ModelNativePlantByBotanicalNameAndGrowingParamsCompositeKeyInput | null;
  };

export type ModelNativePlantByBotanicalNameAndGrowingParamsCompositeKeyInput = {
  sun?: string | null;
  height?: string | null;
  bloomTime?: string | null;
  moisture?: string | null;
};

export type ModelNativePlantByCommonNameAndGrowingParamsCompositeKeyConditionInput =
  {
    eq?: ModelNativePlantByCommonNameAndGrowingParamsCompositeKeyInput | null;
    le?: ModelNativePlantByCommonNameAndGrowingParamsCompositeKeyInput | null;
    lt?: ModelNativePlantByCommonNameAndGrowingParamsCompositeKeyInput | null;
    ge?: ModelNativePlantByCommonNameAndGrowingParamsCompositeKeyInput | null;
    gt?: ModelNativePlantByCommonNameAndGrowingParamsCompositeKeyInput | null;
    between?: Array<ModelNativePlantByCommonNameAndGrowingParamsCompositeKeyInput | null> | null;
    beginsWith?: ModelNativePlantByCommonNameAndGrowingParamsCompositeKeyInput | null;
  };

export type ModelNativePlantByCommonNameAndGrowingParamsCompositeKeyInput = {
  sun?: string | null;
  height?: string | null;
  bloomTime?: string | null;
  moisture?: string | null;
};

export type ModelUserInfoFilterInput = {
  email?: ModelIDInput | null;
  firstName?: ModelStringInput | null;
  lastName?: ModelStringInput | null;
  street?: ModelStringInput | null;
  city?: ModelStringInput | null;
  state?: ModelStringInput | null;
  zipcode?: ModelStringInput | null;
  growingSeasonLength?: ModelIntInput | null;
  firstGdd45?: ModelStringInput | null;
  lastGdd45?: ModelStringInput | null;
  hardinessZone?: ModelStringInput | null;
  owner?: ModelStringInput | null;
  and?: Array<ModelUserInfoFilterInput | null> | null;
  or?: Array<ModelUserInfoFilterInput | null> | null;
  not?: ModelUserInfoFilterInput | null;
};

export type ModelUserInfoConnection = {
  __typename: 'ModelUserInfoConnection';
  items: Array<UserInfo | null>;
  nextToken?: string | null;
};

export type ModelUserNativePlantFilterInput = {
  id?: ModelIDInput | null;
  projectNotes?: ModelStringInput | null;
  owner?: ModelStringInput | null;
  and?: Array<ModelUserNativePlantFilterInput | null> | null;
  or?: Array<ModelUserNativePlantFilterInput | null> | null;
  not?: ModelUserNativePlantFilterInput | null;
  userInfoNativePlantsId?: ModelIDInput | null;
  userNativePlantUserIdId?: ModelIDInput | null;
  userNativePlantNativeIdId?: ModelIDInput | null;
};

export type ModelUserManagementMethodFilterInput = {
  id?: ModelIDInput | null;
  owner?: ModelStringInput | null;
  and?: Array<ModelUserManagementMethodFilterInput | null> | null;
  or?: Array<ModelUserManagementMethodFilterInput | null> | null;
  not?: ModelUserManagementMethodFilterInput | null;
  userInfoManagementMethodsId?: ModelIDInput | null;
  userManagementMethodUserIdId?: ModelIDInput | null;
  userManagementMethodMethodIdId?: ModelIDInput | null;
};

export type CreateWeedMutationVariables = {
  input: CreateWeedInput;
  condition?: ModelWeedConditionInput | null;
};

export type CreateWeedMutation = {
  createWeed?: {
    __typename: 'Weed';
    weedId: string;
  } | null;
};

export type DeleteWeedMutationVariables = {
  input: DeleteWeedInput;
  condition?: ModelWeedConditionInput | null;
};

export type DeleteWeedMutation = {
  deleteWeed?: {
    __typename: 'Weed';
    weedId: string;
  } | null;
};

export type CreateManagementMethodMutationVariables = {
  input: CreateManagementMethodInput;
  condition?: ModelManagementMethodConditionInput | null;
};

export type CreateManagementMethodMutation = {
  createManagementMethod?: {
    __typename: 'ManagementMethod';
    methodId: string;
  } | null;
};

export type DeleteManagementMethodMutationVariables = {
  input: DeleteManagementMethodInput;
  condition?: ModelManagementMethodConditionInput | null;
};

export type DeleteManagementMethodMutation = {
  deleteManagementMethod?: {
    __typename: 'ManagementMethod';
    methodId: string;
  } | null;
};

export type CreateNativePlantMutationVariables = {
  input: CreateNativePlantInput;
  condition?: ModelNativePlantConditionInput | null;
};

export type CreateNativePlantMutation = {
  createNativePlant?: {
    __typename: 'NativePlant';
    nativeId: string;
  } | null;
};

export type DeleteNativePlantMutationVariables = {
  input: DeleteNativePlantInput;
  condition?: ModelNativePlantConditionInput | null;
};

export type DeleteNativePlantMutation = {
  deleteNativePlant?: {
    __typename: 'NativePlant';
    nativeId: string;
  } | null;
};

export type CreateUserInfoMutationVariables = {
  input: CreateUserInfoInput;
  condition?: ModelUserInfoConditionInput | null;
};

export type CreateUserInfoMutation = {
  createUserInfo?: {
    __typename: 'UserInfo';
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    street?: string | null;
    city?: string | null;
    state?: string | null;
    zipcode?: string | null;
    growingSeasonLength: number;
    firstGdd45: string;
    lastGdd45: string;
    hardinessZone: string;
    managementMethods?: {
      __typename: 'ModelUserManagementMethodConnection';
      nextToken?: string | null;
    } | null;
    nativePlants?: {
      __typename: 'ModelUserNativePlantConnection';
      nextToken?: string | null;
    } | null;
  } | null;
};

export type UpdateUserInfoMutationVariables = {
  input: UpdateUserInfoInput;
  condition?: ModelUserInfoConditionInput | null;
};

export type UpdateUserInfoMutation = {
  updateUserInfo?: {
    __typename: 'UserInfo';
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    street?: string | null;
    city?: string | null;
    state?: string | null;
    zipcode?: string | null;
    growingSeasonLength: number;
    firstGdd45: string;
    lastGdd45: string;
    hardinessZone: string;
    managementMethods?: {
      __typename: 'ModelUserManagementMethodConnection';
      nextToken?: string | null;
    } | null;
    nativePlants?: {
      __typename: 'ModelUserNativePlantConnection';
      nextToken?: string | null;
    } | null;
  } | null;
};

export type DeleteUserInfoMutationVariables = {
  input: DeleteUserInfoInput;
  condition?: ModelUserInfoConditionInput | null;
};

export type DeleteUserInfoMutation = {
  deleteUserInfo?: {
    __typename: 'UserInfo';
    email: string;
  } | null;
};

export type CreateUserNativePlantMutationVariables = {
  input: CreateUserNativePlantInput;
  condition?: ModelUserNativePlantConditionInput | null;
};

export type CreateUserNativePlantMutation = {
  createUserNativePlant?: {
    __typename: 'UserNativePlant';
    userId?: {
      __typename: 'UserInfo';
      email: string;
      firstName?: string | null;
      lastName?: string | null;
      street?: string | null;
      city?: string | null;
      state?: string | null;
      zipcode?: string | null;
      growingSeasonLength: number;
      firstGdd45: string;
      lastGdd45: string;
      hardinessZone: string;
      managementMethods?: {
        __typename: 'ModelUserManagementMethodConnection';
        nextToken?: string | null;
      } | null;
      nativePlants?: {
        __typename: 'ModelUserNativePlantConnection';
        nextToken?: string | null;
      } | null;
    } | null;
  } | null;
};

export type UpdateUserNativePlantMutationVariables = {
  input: UpdateUserNativePlantInput;
  condition?: ModelUserNativePlantConditionInput | null;
};

export type UpdateUserNativePlantMutation = {
  updateUserNativePlant?: {
    __typename: 'UserNativePlant';
    userId?: {
      __typename: 'UserInfo';
      email: string;
      firstName?: string | null;
      lastName?: string | null;
      street?: string | null;
      city?: string | null;
      state?: string | null;
      zipcode?: string | null;
      growingSeasonLength: number;
      firstGdd45: string;
      lastGdd45: string;
      hardinessZone: string;
      managementMethods?: {
        __typename: 'ModelUserManagementMethodConnection';
        nextToken?: string | null;
      } | null;
      nativePlants?: {
        __typename: 'ModelUserNativePlantConnection';
        nextToken?: string | null;
      } | null;
    } | null;
  } | null;
};

export type DeleteUserNativePlantMutationVariables = {
  input: DeleteUserNativePlantInput;
  condition?: ModelUserNativePlantConditionInput | null;
};

export type DeleteUserNativePlantMutation = {
  deleteUserNativePlant?: {
    __typename: 'UserNativePlant';
    userId?: {
      __typename: 'UserInfo';
      email: string;
      firstName?: string | null;
      lastName?: string | null;
      street?: string | null;
      city?: string | null;
      state?: string | null;
      zipcode?: string | null;
      growingSeasonLength: number;
      firstGdd45: string;
      lastGdd45: string;
      hardinessZone: string;
      managementMethods?: {
        __typename: 'ModelUserManagementMethodConnection';
        nextToken?: string | null;
      } | null;
      nativePlants?: {
        __typename: 'ModelUserNativePlantConnection';
        nextToken?: string | null;
      } | null;
    } | null;
  } | null;
};

export type CreateUserManagementMethodMutationVariables = {
  input: CreateUserManagementMethodInput;
  condition?: ModelUserManagementMethodConditionInput | null;
};

export type CreateUserManagementMethodMutation = {
  createUserManagementMethod?: {
    __typename: 'UserManagementMethod';
    userId?: {
      __typename: 'UserInfo';
      email: string;
      firstName?: string | null;
      lastName?: string | null;
      street?: string | null;
      city?: string | null;
      state?: string | null;
      zipcode?: string | null;
      growingSeasonLength: number;
      firstGdd45: string;
      lastGdd45: string;
      hardinessZone: string;
      managementMethods?: {
        __typename: 'ModelUserManagementMethodConnection';
        nextToken?: string | null;
      } | null;
      nativePlants?: {
        __typename: 'ModelUserNativePlantConnection';
        nextToken?: string | null;
      } | null;
    } | null;
  } | null;
};

export type DeleteUserManagementMethodMutationVariables = {
  input: DeleteUserManagementMethodInput;
  condition?: ModelUserManagementMethodConditionInput | null;
};

export type DeleteUserManagementMethodMutation = {
  deleteUserManagementMethod?: {
    __typename: 'UserManagementMethod';
    userId?: {
      __typename: 'UserInfo';
      email: string;
      firstName?: string | null;
      lastName?: string | null;
      street?: string | null;
      city?: string | null;
      state?: string | null;
      zipcode?: string | null;
      growingSeasonLength: number;
      firstGdd45: string;
      lastGdd45: string;
      hardinessZone: string;
      managementMethods?: {
        __typename: 'ModelUserManagementMethodConnection';
        nextToken?: string | null;
      } | null;
      nativePlants?: {
        __typename: 'ModelUserNativePlantConnection';
        nextToken?: string | null;
      } | null;
    } | null;
  } | null;
};

export type GetWeedQueryVariables = {
  weedId: string;
};

export type GetWeedQuery = {
  getWeed?: {
    __typename: 'Weed';
    weedId: string;
    vegetationType: string;
    commonName: string;
    botanicalName: string;
    annualPerennialBiennial: string;
    description: string;
    managementMethods?: {
      __typename: 'ModelManagementMethodConnection';
      items: Array<{
        __typename: 'ManagementMethod';
        methodId: string;
        name: string;
        description: string;
        january: number;
        february: number;
        march: number;
        april: number;
        may: number;
        june: number;
        july: number;
        august: number;
        september: number;
        october: number;
        november: number;
        december: number;
        createdAt: string;
        updatedAt: string;
        weedManagementMethodsId?: string | null;
        managementMethodWeedIdId: string;
      } | null>;
      nextToken?: string | null;
    } | null;
    src: string;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type ListWeedsQueryVariables = {
  weedId?: string | null;
  filter?: ModelWeedFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  sortDirection?: ModelSortDirection | null;
};

export type ListWeedsQuery = {
  listWeeds?: {
    __typename: 'ModelWeedConnection';
    items: Array<{
      __typename: 'Weed';
      weedId: string;
      vegetationType: string;
      commonName: string;
      botanicalName: string;
      annualPerennialBiennial: string;
      description: string;
      managementMethods?: {
        __typename: 'ModelManagementMethodConnection';
        nextToken?: string | null;
      } | null;
      src: string;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type GetManagementMethodQueryVariables = {
  methodId: string;
};

export type GetManagementMethodQuery = {
  getManagementMethod?: {
    __typename: 'ManagementMethod';
    methodId: string;
    weedId: {
      __typename: 'Weed';
      weedId: string;
      vegetationType: string;
      commonName: string;
      botanicalName: string;
      annualPerennialBiennial: string;
      description: string;
      managementMethods?: {
        __typename: 'ModelManagementMethodConnection';
        nextToken?: string | null;
      } | null;
      src: string;
      createdAt: string;
      updatedAt: string;
    };
    name: string;
    description: string;
    january: number;
    february: number;
    march: number;
    april: number;
    may: number;
    june: number;
    july: number;
    august: number;
    september: number;
    october: number;
    november: number;
    december: number;
    createdAt: string;
    updatedAt: string;
    weedManagementMethodsId?: string | null;
    managementMethodWeedIdId: string;
  } | null;
};

export type ListManagementMethodsQueryVariables = {
  methodId?: string | null;
  filter?: ModelManagementMethodFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  sortDirection?: ModelSortDirection | null;
};

export type ListManagementMethodsQuery = {
  listManagementMethods?: {
    __typename: 'ModelManagementMethodConnection';
    items: Array<{
      __typename: 'ManagementMethod';
      methodId: string;
      weedId: {
        __typename: 'Weed';
        weedId: string;
        vegetationType: string;
        commonName: string;
        botanicalName: string;
        annualPerennialBiennial: string;
        description: string;
        src: string;
        createdAt: string;
        updatedAt: string;
      };
      name: string;
      description: string;
      january: number;
      february: number;
      march: number;
      april: number;
      may: number;
      june: number;
      july: number;
      august: number;
      september: number;
      october: number;
      november: number;
      december: number;
      createdAt: string;
      updatedAt: string;
      weedManagementMethodsId?: string | null;
      managementMethodWeedIdId: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type GetNativePlantQueryVariables = {
  nativeId: string;
};

export type GetNativePlantQuery = {
  getNativePlant?: {
    __typename: 'NativePlant';
    nativeId: string;
    botanicalName: string;
    commonName: string;
    moisture: string;
    sun: string;
    height: string;
    bloomTime: string;
    src: string;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type ListNativePlantsQueryVariables = {
  nativeId?: string | null;
  filter?: ModelNativePlantFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  sortDirection?: ModelSortDirection | null;
};

export type ListNativePlantsQuery = {
  listNativePlants?: {
    __typename: 'ModelNativePlantConnection';
    items: Array<{
      __typename: 'NativePlant';
      nativeId: string;
      botanicalName: string;
      commonName: string;
      moisture: string;
      sun: string;
      height: string;
      bloomTime: string;
      src: string;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type WeedByVegetationTypeQueryVariables = {
  vegetationType: string;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelWeedFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type WeedByVegetationTypeQuery = {
  weedByVegetationType?: {
    __typename: 'ModelWeedConnection';
    items: Array<{
      __typename: 'Weed';
      weedId: string;
      vegetationType: string;
      commonName: string;
      botanicalName: string;
      annualPerennialBiennial: string;
      description: string;
      managementMethods?: {
        __typename: 'ModelManagementMethodConnection';
        nextToken?: string | null;
      } | null;
      src: string;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type WeedByCommonNameQueryVariables = {
  commonName: string;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelWeedFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type WeedByCommonNameQuery = {
  weedByCommonName?: {
    __typename: 'ModelWeedConnection';
    items: Array<{
      __typename: 'Weed';
      weedId: string;
      vegetationType: string;
      commonName: string;
      botanicalName: string;
      annualPerennialBiennial: string;
      description: string;
      managementMethods?: {
        __typename: 'ModelManagementMethodConnection';
        nextToken?: string | null;
      } | null;
      src: string;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type WeedByBotanicalNameQueryVariables = {
  botanicalName: string;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelWeedFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type WeedByBotanicalNameQuery = {
  weedByBotanicalName?: {
    __typename: 'ModelWeedConnection';
    items: Array<{
      __typename: 'Weed';
      weedId: string;
      vegetationType: string;
      commonName: string;
      botanicalName: string;
      annualPerennialBiennial: string;
      description: string;
      managementMethods?: {
        __typename: 'ModelManagementMethodConnection';
        nextToken?: string | null;
      } | null;
      src: string;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type NativePlantByBotanicalNameQueryVariables = {
  botanicalName: string;
  sunHeightBloomTimeMoisture?: ModelNativePlantByBotanicalNameAndGrowingParamsCompositeKeyConditionInput | null;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelNativePlantFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type NativePlantByBotanicalNameQuery = {
  nativePlantByBotanicalName?: {
    __typename: 'ModelNativePlantConnection';
    items: Array<{
      __typename: 'NativePlant';
      nativeId: string;
      botanicalName: string;
      commonName: string;
      moisture: string;
      sun: string;
      height: string;
      bloomTime: string;
      src: string;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type NativePlantByCommonNameQueryVariables = {
  commonName: string;
  sunHeightBloomTimeMoisture?: ModelNativePlantByCommonNameAndGrowingParamsCompositeKeyConditionInput | null;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelNativePlantFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type NativePlantByCommonNameQuery = {
  nativePlantByCommonName?: {
    __typename: 'ModelNativePlantConnection';
    items: Array<{
      __typename: 'NativePlant';
      nativeId: string;
      botanicalName: string;
      commonName: string;
      moisture: string;
      sun: string;
      height: string;
      bloomTime: string;
      src: string;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type GetUserInfoQueryVariables = {
  email: string;
};

export type GetUserInfoQuery = {
  getUserInfo?: {
    __typename: 'UserInfo';
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    street?: string | null;
    city?: string | null;
    state?: string | null;
    zipcode?: string | null;
    growingSeasonLength: number;
    firstGdd45: string;
    lastGdd45: string;
    hardinessZone: string;
    managementMethods?: {
      __typename: 'ModelUserManagementMethodConnection';
      items: Array<{
        __typename: 'UserManagementMethod';
        id: string;
        owner?: string | null;
        createdAt: string;
        updatedAt: string;
        userInfoManagementMethodsId?: string | null;
        userManagementMethodUserIdId?: string | null;
        userManagementMethodMethodIdId?: string | null;
      } | null>;
      nextToken?: string | null;
    } | null;
    nativePlants?: {
      __typename: 'ModelUserNativePlantConnection';
      items: Array<{
        __typename: 'UserNativePlant';
        id: string;
        projectNotes: string;
        owner?: string | null;
        createdAt: string;
        updatedAt: string;
        userInfoNativePlantsId?: string | null;
        userNativePlantUserIdId?: string | null;
        userNativePlantNativeIdId?: string | null;
      } | null>;
      nextToken?: string | null;
    } | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type ListUserInfosQueryVariables = {
  email?: string | null;
  filter?: ModelUserInfoFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  sortDirection?: ModelSortDirection | null;
};

export type ListUserInfosQuery = {
  listUserInfos?: {
    __typename: 'ModelUserInfoConnection';
    items: Array<{
      __typename: 'UserInfo';
      email: string;
      firstName?: string | null;
      lastName?: string | null;
      street?: string | null;
      city?: string | null;
      state?: string | null;
      zipcode?: string | null;
      growingSeasonLength: number;
      firstGdd45: string;
      lastGdd45: string;
      hardinessZone: string;
      managementMethods?: {
        __typename: 'ModelUserManagementMethodConnection';
        nextToken?: string | null;
      } | null;
      nativePlants?: {
        __typename: 'ModelUserNativePlantConnection';
        nextToken?: string | null;
      } | null;
      owner?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type GetUserNativePlantQueryVariables = {
  id: string;
};

export type GetUserNativePlantQuery = {
  getUserNativePlant?: {
    __typename: 'UserNativePlant';
    id: string;
    userId?: {
      __typename: 'UserInfo';
      email: string;
      firstName?: string | null;
      lastName?: string | null;
      street?: string | null;
      city?: string | null;
      state?: string | null;
      zipcode?: string | null;
      growingSeasonLength: number;
      firstGdd45: string;
      lastGdd45: string;
      hardinessZone: string;
      managementMethods?: {
        __typename: 'ModelUserManagementMethodConnection';
        nextToken?: string | null;
      } | null;
      nativePlants?: {
        __typename: 'ModelUserNativePlantConnection';
        nextToken?: string | null;
      } | null;
      owner?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    nativeId?: {
      __typename: 'NativePlant';
      nativeId: string;
      botanicalName: string;
      commonName: string;
      moisture: string;
      sun: string;
      height: string;
      bloomTime: string;
      src: string;
      createdAt: string;
      updatedAt: string;
    } | null;
    projectNotes: string;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    userInfoNativePlantsId?: string | null;
    userNativePlantUserIdId?: string | null;
    userNativePlantNativeIdId?: string | null;
  } | null;
};

export type ListUserNativePlantsQueryVariables = {
  filter?: ModelUserNativePlantFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListUserNativePlantsQuery = {
  listUserNativePlants?: {
    __typename: 'ModelUserNativePlantConnection';
    items: Array<{
      __typename: 'UserNativePlant';
      id: string;
      userId?: {
        __typename: 'UserInfo';
        email: string;
        firstName?: string | null;
        lastName?: string | null;
        street?: string | null;
        city?: string | null;
        state?: string | null;
        zipcode?: string | null;
        growingSeasonLength: number;
        firstGdd45: string;
        lastGdd45: string;
        hardinessZone: string;
        owner?: string | null;
        createdAt: string;
        updatedAt: string;
      } | null;
      nativeId?: {
        __typename: 'NativePlant';
        nativeId: string;
        botanicalName: string;
        commonName: string;
        moisture: string;
        sun: string;
        height: string;
        bloomTime: string;
        src: string;
        createdAt: string;
        updatedAt: string;
      } | null;
      projectNotes: string;
      owner?: string | null;
      createdAt: string;
      updatedAt: string;
      userInfoNativePlantsId?: string | null;
      userNativePlantUserIdId?: string | null;
      userNativePlantNativeIdId?: string | null;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type GetUserManagementMethodQueryVariables = {
  id: string;
};

export type GetUserManagementMethodQuery = {
  getUserManagementMethod?: {
    __typename: 'UserManagementMethod';
    id: string;
    userId?: {
      __typename: 'UserInfo';
      email: string;
      firstName?: string | null;
      lastName?: string | null;
      street?: string | null;
      city?: string | null;
      state?: string | null;
      zipcode?: string | null;
      growingSeasonLength: number;
      firstGdd45: string;
      lastGdd45: string;
      hardinessZone: string;
      managementMethods?: {
        __typename: 'ModelUserManagementMethodConnection';
        nextToken?: string | null;
      } | null;
      nativePlants?: {
        __typename: 'ModelUserNativePlantConnection';
        nextToken?: string | null;
      } | null;
      owner?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    methodId?: {
      __typename: 'ManagementMethod';
      methodId: string;
      weedId: {
        __typename: 'Weed';
        weedId: string;
        vegetationType: string;
        commonName: string;
        botanicalName: string;
        annualPerennialBiennial: string;
        description: string;
        src: string;
        createdAt: string;
        updatedAt: string;
      };
      name: string;
      description: string;
      january: number;
      february: number;
      march: number;
      april: number;
      may: number;
      june: number;
      july: number;
      august: number;
      september: number;
      october: number;
      november: number;
      december: number;
      createdAt: string;
      updatedAt: string;
      weedManagementMethodsId?: string | null;
      managementMethodWeedIdId: string;
    } | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    userInfoManagementMethodsId?: string | null;
    userManagementMethodUserIdId?: string | null;
    userManagementMethodMethodIdId?: string | null;
  } | null;
};

export type ListUserManagementMethodsQueryVariables = {
  filter?: ModelUserManagementMethodFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListUserManagementMethodsQuery = {
  listUserManagementMethods?: {
    __typename: 'ModelUserManagementMethodConnection';
    items: Array<{
      __typename: 'UserManagementMethod';
      id: string;
      userId?: {
        __typename: 'UserInfo';
        email: string;
        firstName?: string | null;
        lastName?: string | null;
        street?: string | null;
        city?: string | null;
        state?: string | null;
        zipcode?: string | null;
        growingSeasonLength: number;
        firstGdd45: string;
        lastGdd45: string;
        hardinessZone: string;
        owner?: string | null;
        createdAt: string;
        updatedAt: string;
      } | null;
      methodId?: {
        __typename: 'ManagementMethod';
        methodId: string;
        name: string;
        description: string;
        january: number;
        february: number;
        march: number;
        april: number;
        may: number;
        june: number;
        july: number;
        august: number;
        september: number;
        october: number;
        november: number;
        december: number;
        createdAt: string;
        updatedAt: string;
        weedManagementMethodsId?: string | null;
        managementMethodWeedIdId: string;
      } | null;
      owner?: string | null;
      createdAt: string;
      updatedAt: string;
      userInfoManagementMethodsId?: string | null;
      userManagementMethodUserIdId?: string | null;
      userManagementMethodMethodIdId?: string | null;
    } | null>;
    nextToken?: string | null;
  } | null;
};
