/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getWeedC = /* GraphQL */ `
  query GetWeedC($weedId: ID!) {
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
        }
        nextToken
      }
      src
    }
  }
`;

export const getUserC = /* GraphQL */ `
  query GetUserC($email: ID!) {
    getUser(email: $email) {
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

export const getNativePlantC = /* GraphQL */ `
  query GetNativePlantC($nativeId: ID!) {
    getNativePlant(nativeId: $nativeId) {
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
`;

export const weedByVegetationTypeC = /* GraphQL */ `
  query WeedByVegetationTypeC(
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
        src
      }
      nextToken
    }
  }
`;
export const weedByCommonNameC = /* GraphQL */ `
  query WeedByCommonNameC(
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
        src
      }
      nextToken
    }
  }
`;

export const weedByBotanicalNameC = /* GraphQL */ `
  query WeedByBotanicalNameC(
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
        src
      }
      nextToken
    }
  }
`;
export const nativePlantByBotanicalNameC = /* GraphQL */ `
  query NativePlantByBotanicalNameC(
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
      }
      nextToken
    }
  }
`;
export const nativePlantByCommonNameC = /* GraphQL */ `
  query NativePlantByCommonNameC(
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
      }
      nextToken
    }
  }
`;

export const getUserManagementMethods = /* GraphQL */ `
  query GetUserManagementMethods($email: ID!) {
    getUser(email: $email) {
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
`;

export const getUserNativePlants = /* GraphQL */ `
  query GetUserNativePlants($email: ID!) {
    getUser(email: $email) {
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
`;
