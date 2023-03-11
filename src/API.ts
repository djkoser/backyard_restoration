/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
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

export type ModelUserConditionInput = {
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
  and?: Array<ModelUserConditionInput | null> | null;
  or?: Array<ModelUserConditionInput | null> | null;
  not?: ModelUserConditionInput | null;
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

export type User = {
  __typename: 'User';
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
  user?: User | null;
  managementMethod?: ManagementMethod | null;
  projectNotes: string;
  owner?: string | null;
  createdAt: string;
  updatedAt: string;
  userManagementMethodsEmail?: string | null;
  userManagementMethodManagementMethodMethodId?: string | null;
};

export type ManagementMethod = {
  __typename: 'ManagementMethod';
  methodId: string;
  weed: Weed;
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
  weedManagementMethodsWeedId?: string | null;
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

export type ModelUserNativePlantConnection = {
  __typename: 'ModelUserNativePlantConnection';
  items: Array<UserNativePlant | null>;
  nextToken?: string | null;
};

export type UserNativePlant = {
  __typename: 'UserNativePlant';
  id: string;
  user?: User | null;
  nativePlant?: NativePlant | null;
  projectNotes: string;
  owner?: string | null;
  createdAt: string;
  updatedAt: string;
  userNativePlantsEmail?: string | null;
  userNativePlantNativePlantNativeId?: string | null;
};

export type NativePlant = {
  __typename: 'NativePlant';
  nativeId: string;
  botanicalName: string;
  commonName: string;
  moisture: string;
  sun: string;
  height: number;
  bloomTime: string;
  src: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdateUserInput = {
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

export type DeleteUserInput = {
  email: string;
};

export type CreateUserNativePlantInput = {
  id?: string | null;
  projectNotes: string;
  owner?: string | null;
  userNativePlantsEmail?: string | null;
  userNativePlantNativePlantNativeId?: string | null;
};

export type ModelUserNativePlantConditionInput = {
  projectNotes?: ModelStringInput | null;
  owner?: ModelStringInput | null;
  and?: Array<ModelUserNativePlantConditionInput | null> | null;
  or?: Array<ModelUserNativePlantConditionInput | null> | null;
  not?: ModelUserNativePlantConditionInput | null;
  userNativePlantsEmail?: ModelStringInput | null;
  userNativePlantNativePlantNativeId?: ModelStringInput | null;
};

export type UpdateUserNativePlantInput = {
  id: string;
  projectNotes?: string | null;
  owner?: string | null;
  userNativePlantsEmail?: string | null;
  userNativePlantNativePlantNativeId?: string | null;
};

export type DeleteUserNativePlantInput = {
  id: string;
};

export type CreateUserManagementMethodInput = {
  id?: string | null;
  projectNotes: string;
  owner?: string | null;
  userManagementMethodsEmail?: string | null;
  userManagementMethodManagementMethodMethodId?: string | null;
};

export type ModelUserManagementMethodConditionInput = {
  projectNotes?: ModelStringInput | null;
  owner?: ModelStringInput | null;
  and?: Array<ModelUserManagementMethodConditionInput | null> | null;
  or?: Array<ModelUserManagementMethodConditionInput | null> | null;
  not?: ModelUserManagementMethodConditionInput | null;
  userManagementMethodsEmail?: ModelStringInput | null;
  userManagementMethodManagementMethodMethodId?: ModelStringInput | null;
};

export type UpdateUserManagementMethodInput = {
  id: string;
  projectNotes?: string | null;
  owner?: string | null;
  userManagementMethodsEmail?: string | null;
  userManagementMethodManagementMethodMethodId?: string | null;
};

export type DeleteUserManagementMethodInput = {
  id: string;
};

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
  weedManagementMethodsWeedId?: string | null;
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
  weedManagementMethodsWeedId?: ModelStringInput | null;
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
  height: number;
  bloomTime: string;
  src: string;
};

export type ModelNativePlantConditionInput = {
  botanicalName?: ModelStringInput | null;
  commonName?: ModelStringInput | null;
  moisture?: ModelStringInput | null;
  sun?: ModelStringInput | null;
  height?: ModelIntInput | null;
  bloomTime?: ModelStringInput | null;
  src?: ModelStringInput | null;
  and?: Array<ModelNativePlantConditionInput | null> | null;
  or?: Array<ModelNativePlantConditionInput | null> | null;
  not?: ModelNativePlantConditionInput | null;
};

export type DeleteNativePlantInput = {
  nativeId: string;
};

export enum ModelSortDirection {
  ASC = 'ASC',
  DESC = 'DESC'
}

export type ModelWeedFilterInput = {
  weedId?: ModelStringInput | null;
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

export type ModelWeedConnection = {
  __typename: 'ModelWeedConnection';
  items: Array<Weed | null>;
  nextToken?: string | null;
};

export type ModelNativePlantFilterInput = {
  nativeId?: ModelStringInput | null;
  botanicalName?: ModelStringInput | null;
  commonName?: ModelStringInput | null;
  moisture?: ModelStringInput | null;
  sun?: ModelStringInput | null;
  height?: ModelIntInput | null;
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

export type CreateUserCMutationVariables = {
  input: CreateUserInput;
  condition?: ModelUserConditionInput | null;
};

export type CreateUserCMutation = {
  createUser?: {
    __typename: 'User';
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
  } | null;
};

export type UpdateUserCMutationVariables = {
  input: UpdateUserInput;
  condition?: ModelUserConditionInput | null;
};

export type UpdateUserCMutation = {
  updateUser?: {
    __typename: 'User';
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
  } | null;
};

export type DeleteUserCMutationVariables = {
  input: DeleteUserInput;
  condition?: ModelUserConditionInput | null;
};

export type DeleteUserCMutation = {
  deleteUser?: {
    __typename: 'User';
    email: string;
    nativePlants?: {
      __typename: 'ModelUserNativePlantConnection';
      items: Array<{
        __typename: 'UserNativePlant';
        id: string;
      } | null>;
      nextToken?: string | null;
    } | null;
    managementMethods?: {
      __typename: 'ModelUserManagementMethodConnection';
      items: Array<{
        __typename: 'UserManagementMethod';
        id: string;
      } | null>;
      nextToken?: string | null;
    } | null;
  } | null;
};

export type CreateUserNativePlantCMutationVariables = {
  input: CreateUserNativePlantInput;
  condition?: ModelUserNativePlantConditionInput | null;
};

export type CreateUserNativePlantCMutation = {
  createUserNativePlant?: {
    __typename: 'UserNativePlant';
    user?: {
      __typename: 'User';
      nativePlants?: {
        __typename: 'ModelUserNativePlantConnection';
        items: Array<{
          __typename: 'UserNativePlant';
          id: string;
          projectNotes: string;
          nativePlant?: {
            __typename: 'NativePlant';
            nativeId: string;
            botanicalName: string;
            commonName: string;
            moisture: string;
            sun: string;
            height: number;
            bloomTime: string;
            src: string;
          } | null;
        } | null>;
        nextToken?: string | null;
      } | null;
    } | null;
  } | null;
};

export type UpdateUserNativePlantCMutationVariables = {
  input: UpdateUserNativePlantInput;
  condition?: ModelUserNativePlantConditionInput | null;
};

export type UpdateUserNativePlantCMutation = {
  updateUserNativePlant?: {
    __typename: 'UserNativePlant';
    user?: {
      __typename: 'User';
      nativePlants?: {
        __typename: 'ModelUserNativePlantConnection';
        items: Array<{
          __typename: 'UserNativePlant';
          id: string;
          projectNotes: string;
          nativePlant?: {
            __typename: 'NativePlant';
            nativeId: string;
            botanicalName: string;
            commonName: string;
            moisture: string;
            sun: string;
            height: number;
            bloomTime: string;
            src: string;
          } | null;
        } | null>;
        nextToken?: string | null;
      } | null;
    } | null;
  } | null;
};

export type DeleteUserNativePlantCMutationVariables = {
  input: DeleteUserNativePlantInput;
  condition?: ModelUserNativePlantConditionInput | null;
};

export type DeleteUserNativePlantCMutation = {
  deleteUserNativePlant?: {
    __typename: 'UserNativePlant';
    user?: {
      __typename: 'User';
      nativePlants?: {
        __typename: 'ModelUserNativePlantConnection';
        items: Array<{
          __typename: 'UserNativePlant';
          id: string;
          projectNotes: string;
          nativePlant?: {
            __typename: 'NativePlant';
            nativeId: string;
            botanicalName: string;
            commonName: string;
            moisture: string;
            sun: string;
            height: number;
            bloomTime: string;
            src: string;
          } | null;
        } | null>;
        nextToken?: string | null;
      } | null;
    } | null;
  } | null;
};

export type CreateUserManagementMethodCMutationVariables = {
  input: CreateUserManagementMethodInput;
  condition?: ModelUserManagementMethodConditionInput | null;
};

export type CreateUserManagementMethodCMutation = {
  createUserManagementMethod?: {
    __typename: 'UserManagementMethod';
    user?: {
      __typename: 'User';
      managementMethods?: {
        __typename: 'ModelUserManagementMethodConnection';
        items: Array<{
          __typename: 'UserManagementMethod';
          id: string;
          projectNotes: string;
          managementMethod?: {
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
            weed: {
              __typename: 'Weed';
              commonName: string;
            };
          } | null;
        } | null>;
        nextToken?: string | null;
      } | null;
    } | null;
  } | null;
};

export type UpdateUserManagementMethodCMutationVariables = {
  input: UpdateUserManagementMethodInput;
  condition?: ModelUserManagementMethodConditionInput | null;
};

export type UpdateUserManagementMethodCMutation = {
  updateUserManagementMethod?: {
    __typename: 'UserManagementMethod';
    user?: {
      __typename: 'User';
      managementMethods?: {
        __typename: 'ModelUserManagementMethodConnection';
        items: Array<{
          __typename: 'UserManagementMethod';
          id: string;
          projectNotes: string;
          managementMethod?: {
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
            weed: {
              __typename: 'Weed';
              commonName: string;
            };
          } | null;
        } | null>;
        nextToken?: string | null;
      } | null;
    } | null;
  } | null;
};

export type DeleteUserManagementMethodCMutationVariables = {
  input: DeleteUserManagementMethodInput;
  condition?: ModelUserManagementMethodConditionInput | null;
};

export type DeleteUserManagementMethodCMutation = {
  deleteUserManagementMethod?: {
    __typename: 'UserManagementMethod';
    user?: {
      __typename: 'User';
      managementMethods?: {
        __typename: 'ModelUserManagementMethodConnection';
        items: Array<{
          __typename: 'UserManagementMethod';
          id: string;
          projectNotes: string;
          managementMethod?: {
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
            weed: {
              __typename: 'Weed';
              commonName: string;
            };
          } | null;
        } | null>;
        nextToken?: string | null;
      } | null;
    } | null;
  } | null;
};

export type CreateWeedCMutationVariables = {
  input: CreateWeedInput;
  condition?: ModelWeedConditionInput | null;
};

export type CreateWeedCMutation = {
  createWeed?: {
    __typename: 'Weed';
    weedId: string;
  } | null;
};

export type DeleteWeedCMutationVariables = {
  input: DeleteWeedInput;
  condition?: ModelWeedConditionInput | null;
};

export type DeleteWeedCMutation = {
  deleteWeed?: {
    __typename: 'Weed';
    weedId: string;
  } | null;
};

export type CreateManagementMethodCMutationVariables = {
  input: CreateManagementMethodInput;
  condition?: ModelManagementMethodConditionInput | null;
};

export type CreateManagementMethodCMutation = {
  createManagementMethod?: {
    __typename: 'ManagementMethod';
    methodId: string;
  } | null;
};

export type DeleteManagementMethodCMutationVariables = {
  input: DeleteManagementMethodInput;
  condition?: ModelManagementMethodConditionInput | null;
};

export type DeleteManagementMethodCMutation = {
  deleteManagementMethod?: {
    __typename: 'ManagementMethod';
    methodId: string;
  } | null;
};

export type CreateNativePlantCMutationVariables = {
  input: CreateNativePlantInput;
  condition?: ModelNativePlantConditionInput | null;
};

export type CreateNativePlantCMutation = {
  createNativePlant?: {
    __typename: 'NativePlant';
    nativeId: string;
  } | null;
};

export type DeleteNativePlantCMutationVariables = {
  input: DeleteNativePlantInput;
  condition?: ModelNativePlantConditionInput | null;
};

export type DeleteNativePlantCMutation = {
  deleteNativePlant?: {
    __typename: 'NativePlant';
    nativeId: string;
  } | null;
};

export type GetWeedCQueryVariables = {
  weedId: string;
};

export type GetWeedCQuery = {
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
      } | null>;
      nextToken?: string | null;
    } | null;
    src: string;
  } | null;
};

export type GetUserCQueryVariables = {
  email: string;
};

export type GetUserCQuery = {
  getUser?: {
    __typename: 'User';
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
  } | null;
};

export type GetNativePlantCQueryVariables = {
  nativeId: string;
};

export type GetNativePlantCQuery = {
  getNativePlant?: {
    __typename: 'NativePlant';
    nativeId: string;
    botanicalName: string;
    commonName: string;
    moisture: string;
    sun: string;
    height: number;
    bloomTime: string;
    src: string;
  } | null;
};

export type WeedByVegetationTypeCQueryVariables = {
  vegetationType: string;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelWeedFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type WeedByVegetationTypeCQuery = {
  weedByVegetationType?: {
    __typename: 'ModelWeedConnection';
    items: Array<{
      __typename: 'Weed';
      weedId: string;
      vegetationType: string;
      commonName: string;
      botanicalName: string;
      annualPerennialBiennial: string;
      src: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type GetUserManagementMethodsQueryVariables = {
  email: string;
};

export type GetUserManagementMethodsQuery = {
  getUser?: {
    __typename: 'User';
    managementMethods?: {
      __typename: 'ModelUserManagementMethodConnection';
      items: Array<{
        __typename: 'UserManagementMethod';
        id: string;
        projectNotes: string;
        managementMethod?: {
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
          weed: {
            __typename: 'Weed';
            commonName: string;
          };
        } | null;
      } | null>;
      nextToken?: string | null;
    } | null;
  } | null;
};

export type GetUserNativePlantsQueryVariables = {
  email: string;
};

export type GetUserNativePlantsQuery = {
  getUser?: {
    __typename: 'User';
    nativePlants?: {
      __typename: 'ModelUserNativePlantConnection';
      items: Array<{
        __typename: 'UserNativePlant';
        id: string;
        projectNotes: string;
        nativePlant?: {
          __typename: 'NativePlant';
          nativeId: string;
          botanicalName: string;
          commonName: string;
          moisture: string;
          sun: string;
          height: number;
          bloomTime: string;
          src: string;
        } | null;
      } | null>;
      nextToken?: string | null;
    } | null;
  } | null;
};

export type ListNativePlantsCQueryVariables = {
  nativeId?: string | null;
  filter?: ModelNativePlantFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  sortDirection?: ModelSortDirection | null;
};

export type ListNativePlantsCQuery = {
  listNativePlants?: {
    __typename: 'ModelNativePlantConnection';
    items: Array<{
      __typename: 'NativePlant';
      nativeId: string;
      botanicalName: string;
      commonName: string;
      moisture: string;
      sun: string;
      height: number;
      bloomTime: string;
      src: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};
