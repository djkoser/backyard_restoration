/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createWeed = /* GraphQL */ `
  mutation CreateWeed(
    $input: CreateWeedInput!
    $condition: ModelWeedConditionInput
  ) {
    createWeed(input: $input, condition: $condition) {
      weedId
    }
  }
`;
export const deleteWeed = /* GraphQL */ `
  mutation DeleteWeed(
    $input: DeleteWeedInput!
    $condition: ModelWeedConditionInput
  ) {
    deleteWeed(input: $input, condition: $condition) {
      weedId
    }
  }
`;
export const createManagementMethod = /* GraphQL */ `
  mutation CreateManagementMethod(
    $input: CreateManagementMethodInput!
    $condition: ModelManagementMethodConditionInput
  ) {
    createManagementMethod(input: $input, condition: $condition) {
      methodId
    }
  }
`;
export const deleteManagementMethod = /* GraphQL */ `
  mutation DeleteManagementMethod(
    $input: DeleteManagementMethodInput!
    $condition: ModelManagementMethodConditionInput
  ) {
    deleteManagementMethod(input: $input, condition: $condition) {
      methodId
    }
  }
`;
export const createNativePlant = /* GraphQL */ `
  mutation CreateNativePlant(
    $input: CreateNativePlantInput!
    $condition: ModelNativePlantConditionInput
  ) {
    createNativePlant(input: $input, condition: $condition) {
      nativeId
    }
  }
`;
export const deleteNativePlant = /* GraphQL */ `
  mutation DeleteNativePlant(
    $input: DeleteNativePlantInput!
    $condition: ModelNativePlantConditionInput
  ) {
    deleteNativePlant(input: $input, condition: $condition) {
      nativeId
    }
  }
`;
export const createUserInfo = /* GraphQL */ `
  mutation CreateUserInfo(
    $input: CreateUserInfoInput!
    $condition: ModelUserInfoConditionInput
  ) {
    createUserInfo(input: $input, condition: $condition) {
      email
      firstName
      lastName
      street
      city
      state
      zipcode
      growingSeasonLength
      firstGdd45
      lastGdd45
      hardinessZone
      managementMethods {
        nextToken
      }
      nativePlants {
        nextToken
      }
    }
  }
`;
export const updateUserInfo = /* GraphQL */ `
  mutation UpdateUserInfo(
    $input: UpdateUserInfoInput!
    $condition: ModelUserInfoConditionInput
  ) {
    updateUserInfo(input: $input, condition: $condition) {
      email
      firstName
      lastName
      street
      city
      state
      zipcode
      growingSeasonLength
      firstGdd45
      lastGdd45
      hardinessZone
      managementMethods {
        nextToken
      }
      nativePlants {
        nextToken
      }
    }
  }
`;
export const deleteUserInfo = /* GraphQL */ `
  mutation DeleteUserInfo(
    $input: DeleteUserInfoInput!
    $condition: ModelUserInfoConditionInput
  ) {
    deleteUserInfo(input: $input, condition: $condition) {
      email
    }
  }
`;
export const createUserNativePlant = /* GraphQL */ `
  mutation CreateUserNativePlant(
    $input: CreateUserNativePlantInput!
    $condition: ModelUserNativePlantConditionInput
  ) {
    createUserNativePlant(input: $input, condition: $condition) {
      userId {
        email
        firstName
        lastName
        street
        city
        state
        zipcode
        growingSeasonLength
        firstGdd45
        lastGdd45
        hardinessZone
        managementMethods {
          nextToken
        }
        nativePlants {
          nextToken
        }
      }
    }
  }
`;
export const updateUserNativePlant = /* GraphQL */ `
  mutation UpdateUserNativePlant(
    $input: UpdateUserNativePlantInput!
    $condition: ModelUserNativePlantConditionInput
  ) {
    updateUserNativePlant(input: $input, condition: $condition) {
      userId {
        email
        firstName
        lastName
        street
        city
        state
        zipcode
        growingSeasonLength
        firstGdd45
        lastGdd45
        hardinessZone
        managementMethods {
          nextToken
        }
        nativePlants {
          nextToken
        }
      }
    }
  }
`;
export const deleteUserNativePlant = /* GraphQL */ `
  mutation DeleteUserNativePlant(
    $input: DeleteUserNativePlantInput!
    $condition: ModelUserNativePlantConditionInput
  ) {
    deleteUserNativePlant(input: $input, condition: $condition) {
      userId {
        email
        firstName
        lastName
        street
        city
        state
        zipcode
        growingSeasonLength
        firstGdd45
        lastGdd45
        hardinessZone
        managementMethods {
          nextToken
        }
        nativePlants {
          nextToken
        }
      }
    }
  }
`;
export const createUserManagementMethod = /* GraphQL */ `
  mutation CreateUserManagementMethod(
    $input: CreateUserManagementMethodInput!
    $condition: ModelUserManagementMethodConditionInput
  ) {
    createUserManagementMethod(input: $input, condition: $condition) {
      userId {
        email
        firstName
        lastName
        street
        city
        state
        zipcode
        growingSeasonLength
        firstGdd45
        lastGdd45
        hardinessZone
        managementMethods {
          nextToken
        }
        nativePlants {
          nextToken
        }
      }
    }
  }
`;
export const deleteUserManagementMethod = /* GraphQL */ `
  mutation DeleteUserManagementMethod(
    $input: DeleteUserManagementMethodInput!
    $condition: ModelUserManagementMethodConditionInput
  ) {
    deleteUserManagementMethod(input: $input, condition: $condition) {
      userId {
        email
        firstName
        lastName
        street
        city
        state
        zipcode
        growingSeasonLength
        firstGdd45
        lastGdd45
        hardinessZone
        managementMethods {
          nextToken
        }
        nativePlants {
          nextToken
        }
      }
    }
  }
`;
