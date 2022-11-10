/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateWeed = /* GraphQL */ `
  subscription OnCreateWeed($filter: ModelSubscriptionWeedFilterInput) {
    onCreateWeed(filter: $filter) {
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
export const onUpdateWeed = /* GraphQL */ `
  subscription OnUpdateWeed($filter: ModelSubscriptionWeedFilterInput) {
    onUpdateWeed(filter: $filter) {
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
export const onDeleteWeed = /* GraphQL */ `
  subscription OnDeleteWeed($filter: ModelSubscriptionWeedFilterInput) {
    onDeleteWeed(filter: $filter) {
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
export const onCreateUserInfo = /* GraphQL */ `
  subscription OnCreateUserInfo($filter: ModelSubscriptionUserInfoFilterInput) {
    onCreateUserInfo(filter: $filter) {
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
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUserInfo = /* GraphQL */ `
  subscription OnUpdateUserInfo($filter: ModelSubscriptionUserInfoFilterInput) {
    onUpdateUserInfo(filter: $filter) {
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
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUserInfo = /* GraphQL */ `
  subscription OnDeleteUserInfo($filter: ModelSubscriptionUserInfoFilterInput) {
    onDeleteUserInfo(filter: $filter) {
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
      createdAt
      updatedAt
    }
  }
`;
export const onCreateManagementMethod = /* GraphQL */ `
  subscription OnCreateManagementMethod(
    $filter: ModelSubscriptionManagementMethodFilterInput
  ) {
    onCreateManagementMethod(filter: $filter) {
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
export const onUpdateManagementMethod = /* GraphQL */ `
  subscription OnUpdateManagementMethod(
    $filter: ModelSubscriptionManagementMethodFilterInput
  ) {
    onUpdateManagementMethod(filter: $filter) {
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
export const onDeleteManagementMethod = /* GraphQL */ `
  subscription OnDeleteManagementMethod(
    $filter: ModelSubscriptionManagementMethodFilterInput
  ) {
    onDeleteManagementMethod(filter: $filter) {
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
export const onCreateNativePlant = /* GraphQL */ `
  subscription OnCreateNativePlant(
    $filter: ModelSubscriptionNativePlantFilterInput
  ) {
    onCreateNativePlant(filter: $filter) {
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
export const onUpdateNativePlant = /* GraphQL */ `
  subscription OnUpdateNativePlant(
    $filter: ModelSubscriptionNativePlantFilterInput
  ) {
    onUpdateNativePlant(filter: $filter) {
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
export const onDeleteNativePlant = /* GraphQL */ `
  subscription OnDeleteNativePlant(
    $filter: ModelSubscriptionNativePlantFilterInput
  ) {
    onDeleteNativePlant(filter: $filter) {
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
export const onCreateUserNativePlant = /* GraphQL */ `
  subscription OnCreateUserNativePlant(
    $filter: ModelSubscriptionUserNativePlantFilterInput
  ) {
    onCreateUserNativePlant(filter: $filter) {
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
      createdAt
      updatedAt
      userNativePlantNativeIdId
    }
  }
`;
export const onUpdateUserNativePlant = /* GraphQL */ `
  subscription OnUpdateUserNativePlant(
    $filter: ModelSubscriptionUserNativePlantFilterInput
  ) {
    onUpdateUserNativePlant(filter: $filter) {
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
      createdAt
      updatedAt
      userNativePlantNativeIdId
    }
  }
`;
export const onDeleteUserNativePlant = /* GraphQL */ `
  subscription OnDeleteUserNativePlant(
    $filter: ModelSubscriptionUserNativePlantFilterInput
  ) {
    onDeleteUserNativePlant(filter: $filter) {
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
      createdAt
      updatedAt
      userNativePlantNativeIdId
    }
  }
`;
