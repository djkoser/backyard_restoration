/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUserC = /* GraphQL */ `
  mutation CreateUserC(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      email
    }
  }
`;
export const updateUserC = /* GraphQL */ `
  mutation UpdateUserC(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
    }
  }
`;
export const deleteUserC = /* GraphQL */ `
  mutation DeleteUserC(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      email
    }
  }
`;
export const createUserNativePlantC = /* GraphQL */ `
  mutation CreateUserNativePlantC(
    $input: CreateUserNativePlantInput!
    $condition: ModelUserNativePlantConditionInput
  ) {
    createUserNativePlant(input: $input, condition: $condition) {
      user {
        nativePlants {
          items {
            id
            projectNotes
            nativePlant {
              nativeId
              botanicalName
              commonName
              moisture
              sun
              height
              bloomTime
              src
            }
          }
          nextToken
        }
      }
    }
  }
`;
export const updateUserNativePlantC = /* GraphQL */ `
  mutation UpdateUserNativePlantC(
    $input: UpdateUserNativePlantInput!
    $condition: ModelUserNativePlantConditionInput
  ) {
    updateUserNativePlant(input: $input, condition: $condition) {
      user {
        nativePlants {
          items {
            id
            projectNotes
            nativePlant {
              nativeId
              botanicalName
              commonName
              moisture
              sun
              height
              bloomTime
              src
            }
          }
          nextToken
        }
      }
    }
  }
`;
export const deleteUserNativePlantC = /* GraphQL */ `
  mutation DeleteUserNativePlantC(
    $input: DeleteUserNativePlantInput!
    $condition: ModelUserNativePlantConditionInput
  ) {
    deleteUserNativePlant(input: $input, condition: $condition) {
      user {
        nativePlants {
          items {
            id
            projectNotes
            nativePlant {
              nativeId
              botanicalName
              commonName
              moisture
              sun
              height
              bloomTime
              src
            }
          }
          nextToken
        }
      }
    }
  }
`;
export const createUserManagementMethodC = /* GraphQL */ `
  mutation CreateUserManagementMethodC(
    $input: CreateUserManagementMethodInput!
    $condition: ModelUserManagementMethodConditionInput
  ) {
    createUserManagementMethod(input: $input, condition: $condition) {
      user {
        managementMethods {
          items {
            id
            projectNotes
            managementMethod {
              methodId
              name
              description
              january
              february
              march
              april
              may
              june
              july
              august
              september
              october
              november
              december
              weed {
                commonName
              }
            }
          }
          nextToken
        }
      }
    }
  }
`;
export const updateUserManagementMethodC = /* GraphQL */ `
  mutation UpdateUserManagementMethodC(
    $input: UpdateUserManagementMethodInput!
    $condition: ModelUserManagementMethodConditionInput
  ) {
    updateUserManagementMethod(input: $input, condition: $condition) {
      user {
        managementMethods {
          items {
            id
            projectNotes
            managementMethod {
              methodId
              name
              description
              january
              february
              march
              april
              may
              june
              july
              august
              september
              october
              november
              december
              weed {
                commonName
              }
            }
          }
          nextToken
        }
      }
    }
  }
`;

export const deleteUserManagementMethodC = /* GraphQL */ `
  mutation DeleteUserManagementMethodC(
    $input: DeleteUserManagementMethodInput!
    $condition: ModelUserManagementMethodConditionInput
  ) {
    deleteUserManagementMethod(input: $input, condition: $condition) {
      user {
        managementMethods {
          items {
            id
            projectNotes
            managementMethod {
              methodId
              name
              description
              january
              february
              march
              april
              may
              june
              july
              august
              september
              october
              november
              december
              weed {
                commonName
              }
            }
          }
          nextToken
        }
      }
    }
  }
`;

export const createWeedC = /* GraphQL */ `
  mutation CreateWeedC(
    $input: CreateWeedInput!
    $condition: ModelWeedConditionInput
  ) {
    createWeed(input: $input, condition: $condition) {
      weedId
    }
  }
`;

export const deleteWeedC = /* GraphQL */ `
  mutation DeleteWeedC(
    $input: DeleteWeedInput!
    $condition: ModelWeedConditionInput
  ) {
    deleteWeed(input: $input, condition: $condition) {
      weedId
    }
  }
`;

export const createManagementMethodC = /* GraphQL */ `
  mutation CreateManagementMethodC(
    $input: CreateManagementMethodInput!
    $condition: ModelManagementMethodConditionInput
  ) {
    createManagementMethod(input: $input, condition: $condition) {
      methodId
    }
  }
`;

export const deleteManagementMethodC = /* GraphQL */ `
  mutation DeleteManagementMethodC(
    $input: DeleteManagementMethodInput!
    $condition: ModelManagementMethodConditionInput
  ) {
    deleteManagementMethod(input: $input, condition: $condition) {
      methodId
    }
  }
`;
export const createNativePlantC = /* GraphQL */ `
  mutation CreateNativePlantC(
    $input: CreateNativePlantInput!
    $condition: ModelNativePlantConditionInput
  ) {
    createNativePlant(input: $input, condition: $condition) {
      nativeId
    }
  }
`;

export const deleteNativePlantC = /* GraphQL */ `
  mutation DeleteNativePlantC(
    $input: DeleteNativePlantInput!
    $condition: ModelNativePlantConditionInput
  ) {
    deleteNativePlant(input: $input, condition: $condition) {
      nativeId
    }
  }
`;
