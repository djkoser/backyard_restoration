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
      vegetationType
      commonName
      botanicalName
      annualPerennialBiennial
      description
      managementMethods {
        items {
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
          createdAt
          updatedAt
          weedManagementMethodsId
          userInfoManagementMethodsId
          managementMethodWeedIdId
        }
        nextToken
      }
      src
      createdAt
      updatedAt
    }
  }
`;
export const updateWeed = /* GraphQL */ `
  mutation UpdateWeed(
    $input: UpdateWeedInput!
    $condition: ModelWeedConditionInput
  ) {
    updateWeed(input: $input, condition: $condition) {
      weedId
      vegetationType
      commonName
      botanicalName
      annualPerennialBiennial
      description
      managementMethods {
        items {
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
          createdAt
          updatedAt
          weedManagementMethodsId
          userInfoManagementMethodsId
          managementMethodWeedIdId
        }
        nextToken
      }
      src
      createdAt
      updatedAt
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
      vegetationType
      commonName
      botanicalName
      annualPerennialBiennial
      description
      managementMethods {
        items {
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
          createdAt
          updatedAt
          weedManagementMethodsId
          userInfoManagementMethodsId
          managementMethodWeedIdId
        }
        nextToken
      }
      src
      createdAt
      updatedAt
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
      weedId {
        weedId
        vegetationType
        commonName
        botanicalName
        annualPerennialBiennial
        description
        managementMethods {
          nextToken
        }
        src
        createdAt
        updatedAt
      }
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
      createdAt
      updatedAt
      weedManagementMethodsId
      userInfoManagementMethodsId
      managementMethodWeedIdId
    }
  }
`;
export const updateManagementMethod = /* GraphQL */ `
  mutation UpdateManagementMethod(
    $input: UpdateManagementMethodInput!
    $condition: ModelManagementMethodConditionInput
  ) {
    updateManagementMethod(input: $input, condition: $condition) {
      methodId
      weedId {
        weedId
        vegetationType
        commonName
        botanicalName
        annualPerennialBiennial
        description
        managementMethods {
          nextToken
        }
        src
        createdAt
        updatedAt
      }
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
      createdAt
      updatedAt
      weedManagementMethodsId
      userInfoManagementMethodsId
      managementMethodWeedIdId
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
      weedId {
        weedId
        vegetationType
        commonName
        botanicalName
        annualPerennialBiennial
        description
        managementMethods {
          nextToken
        }
        src
        createdAt
        updatedAt
      }
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
      createdAt
      updatedAt
      weedManagementMethodsId
      userInfoManagementMethodsId
      managementMethodWeedIdId
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
      botanicalName
      commonName
      moisture
      sun
      height
      bloomTime
      src
      createdAt
      updatedAt
      userInfoNativePlantsId
    }
  }
`;
export const updateNativePlant = /* GraphQL */ `
  mutation UpdateNativePlant(
    $input: UpdateNativePlantInput!
    $condition: ModelNativePlantConditionInput
  ) {
    updateNativePlant(input: $input, condition: $condition) {
      nativeId
      botanicalName
      commonName
      moisture
      sun
      height
      bloomTime
      src
      createdAt
      updatedAt
      userInfoNativePlantsId
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
      botanicalName
      commonName
      moisture
      sun
      height
      bloomTime
      src
      createdAt
      updatedAt
      userInfoNativePlantsId
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
        items {
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
          createdAt
          updatedAt
          weedManagementMethodsId
          userInfoManagementMethodsId
          managementMethodWeedIdId
        }
        nextToken
      }
      nativePlants {
        items {
          nativeId
          botanicalName
          commonName
          moisture
          sun
          height
          bloomTime
          src
          createdAt
          updatedAt
          userInfoNativePlantsId
        }
        nextToken
      }
      owner
      createdAt
      updatedAt
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
        items {
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
          createdAt
          updatedAt
          weedManagementMethodsId
          userInfoManagementMethodsId
          managementMethodWeedIdId
        }
        nextToken
      }
      nativePlants {
        items {
          nativeId
          botanicalName
          commonName
          moisture
          sun
          height
          bloomTime
          src
          createdAt
          updatedAt
          userInfoNativePlantsId
        }
        nextToken
      }
      owner
      createdAt
      updatedAt
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
        items {
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
          createdAt
          updatedAt
          weedManagementMethodsId
          userInfoManagementMethodsId
          managementMethodWeedIdId
        }
        nextToken
      }
      nativePlants {
        items {
          nativeId
          botanicalName
          commonName
          moisture
          sun
          height
          bloomTime
          src
          createdAt
          updatedAt
          userInfoNativePlantsId
        }
        nextToken
      }
      owner
      createdAt
      updatedAt
    }
  }
`;
export const createUserNativePlant = /* GraphQL */ `
  mutation CreateUserNativePlant(
    $input: CreateUserNativePlantInput!
    $condition: ModelUserNativePlantConditionInput
  ) {
    createUserNativePlant(input: $input, condition: $condition) {
      id
      nativeId {
        nativeId
        botanicalName
        commonName
        moisture
        sun
        height
        bloomTime
        src
        createdAt
        updatedAt
        userInfoNativePlantsId
      }
      projectNotes
      owner
      createdAt
      updatedAt
      userNativePlantNativeIdId
    }
  }
`;
export const updateUserNativePlant = /* GraphQL */ `
  mutation UpdateUserNativePlant(
    $input: UpdateUserNativePlantInput!
    $condition: ModelUserNativePlantConditionInput
  ) {
    updateUserNativePlant(input: $input, condition: $condition) {
      id
      nativeId {
        nativeId
        botanicalName
        commonName
        moisture
        sun
        height
        bloomTime
        src
        createdAt
        updatedAt
        userInfoNativePlantsId
      }
      projectNotes
      owner
      createdAt
      updatedAt
      userNativePlantNativeIdId
    }
  }
`;
export const deleteUserNativePlant = /* GraphQL */ `
  mutation DeleteUserNativePlant(
    $input: DeleteUserNativePlantInput!
    $condition: ModelUserNativePlantConditionInput
  ) {
    deleteUserNativePlant(input: $input, condition: $condition) {
      id
      nativeId {
        nativeId
        botanicalName
        commonName
        moisture
        sun
        height
        bloomTime
        src
        createdAt
        updatedAt
        userInfoNativePlantsId
      }
      projectNotes
      owner
      createdAt
      updatedAt
      userNativePlantNativeIdId
    }
  }
`;
