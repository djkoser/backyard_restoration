/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getWeed = /* GraphQL */ `
  query GetWeed($weedId: ID!) {
    getWeed(weedId: $weedId) {
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
export const listWeeds = /* GraphQL */ `
  query ListWeeds(
    $weedId: ID
    $filter: ModelWeedFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listWeeds(
      weedId: $weedId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getManagementMethod = /* GraphQL */ `
  query GetManagementMethod($methodId: ID!) {
    getManagementMethod(methodId: $methodId) {
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
      managementMethodWeedIdId
    }
  }
`;
export const listManagementMethods = /* GraphQL */ `
  query ListManagementMethods(
    $methodId: ID
    $filter: ModelManagementMethodFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listManagementMethods(
      methodId: $methodId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        methodId
        weedId {
          weedId
          vegetationType
          commonName
          botanicalName
          annualPerennialBiennial
          description
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
        managementMethodWeedIdId
      }
      nextToken
    }
  }
`;
export const getNativePlant = /* GraphQL */ `
  query GetNativePlant($nativeId: ID!) {
    getNativePlant(nativeId: $nativeId) {
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
    }
  }
`;
export const listNativePlants = /* GraphQL */ `
  query ListNativePlants(
    $nativeId: ID
    $filter: ModelNativePlantFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listNativePlants(
      nativeId: $nativeId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
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
      }
      nextToken
    }
  }
`;
export const weedByVegetationType = /* GraphQL */ `
  query WeedByVegetationType(
    $vegetationType: String!
    $sortDirection: ModelSortDirection
    $filter: ModelWeedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    weedByVegetationType(
      vegetationType: $vegetationType
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const weedByCommonName = /* GraphQL */ `
  query WeedByCommonName(
    $commonName: String!
    $sortDirection: ModelSortDirection
    $filter: ModelWeedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    weedByCommonName(
      commonName: $commonName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const weedByBotanicalName = /* GraphQL */ `
  query WeedByBotanicalName(
    $botanicalName: String!
    $sortDirection: ModelSortDirection
    $filter: ModelWeedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    weedByBotanicalName(
      botanicalName: $botanicalName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const nativePlantByBotanicalName = /* GraphQL */ `
  query NativePlantByBotanicalName(
    $botanicalName: String!
    $sunHeightBloomTimeMoisture: ModelNativePlantByBotanicalNameAndGrowingParamsCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNativePlantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    nativePlantByBotanicalName(
      botanicalName: $botanicalName
      sunHeightBloomTimeMoisture: $sunHeightBloomTimeMoisture
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      }
      nextToken
    }
  }
`;
export const nativePlantByCommonName = /* GraphQL */ `
  query NativePlantByCommonName(
    $commonName: String!
    $sunHeightBloomTimeMoisture: ModelNativePlantByCommonNameAndGrowingParamsCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNativePlantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    nativePlantByCommonName(
      commonName: $commonName
      sunHeightBloomTimeMoisture: $sunHeightBloomTimeMoisture
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      }
      nextToken
    }
  }
`;
export const getUserInfo = /* GraphQL */ `
  query GetUserInfo($email: ID!) {
    getUserInfo(email: $email) {
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
          id
          owner
          createdAt
          updatedAt
          userInfoManagementMethodsId
          userManagementMethodUserIdId
          userManagementMethodMethodIdId
        }
        nextToken
      }
      nativePlants {
        items {
          id
          projectNotes
          owner
          createdAt
          updatedAt
          userInfoNativePlantsId
          userNativePlantUserIdId
          userNativePlantNativeIdId
        }
        nextToken
      }
      owner
      createdAt
      updatedAt
    }
  }
`;
export const listUserInfos = /* GraphQL */ `
  query ListUserInfos(
    $email: ID
    $filter: ModelUserInfoFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUserInfos(
      email: $email
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserNativePlant = /* GraphQL */ `
  query GetUserNativePlant($id: ID!) {
    getUserNativePlant(id: $id) {
      id
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
        owner
        createdAt
        updatedAt
      }
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
      }
      projectNotes
      owner
      createdAt
      updatedAt
      userInfoNativePlantsId
      userNativePlantUserIdId
      userNativePlantNativeIdId
    }
  }
`;
export const listUserNativePlants = /* GraphQL */ `
  query ListUserNativePlants(
    $filter: ModelUserNativePlantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserNativePlants(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
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
          owner
          createdAt
          updatedAt
        }
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
        }
        projectNotes
        owner
        createdAt
        updatedAt
        userInfoNativePlantsId
        userNativePlantUserIdId
        userNativePlantNativeIdId
      }
      nextToken
    }
  }
`;
export const getUserManagementMethod = /* GraphQL */ `
  query GetUserManagementMethod($id: ID!) {
    getUserManagementMethod(id: $id) {
      id
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
        owner
        createdAt
        updatedAt
      }
      methodId {
        methodId
        weedId {
          weedId
          vegetationType
          commonName
          botanicalName
          annualPerennialBiennial
          description
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
        managementMethodWeedIdId
      }
      owner
      createdAt
      updatedAt
      userInfoManagementMethodsId
      userManagementMethodUserIdId
      userManagementMethodMethodIdId
    }
  }
`;
export const listUserManagementMethods = /* GraphQL */ `
  query ListUserManagementMethods(
    $filter: ModelUserManagementMethodFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserManagementMethods(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
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
          owner
          createdAt
          updatedAt
        }
        methodId {
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
          managementMethodWeedIdId
        }
        owner
        createdAt
        updatedAt
        userInfoManagementMethodsId
        userManagementMethodUserIdId
        userManagementMethodMethodIdId
      }
      nextToken
    }
  }
`;
