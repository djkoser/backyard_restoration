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

export const weedByVegetationType = /* GraphQL */ `
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
      nextToken
    }
  }
`;
export const weedByCommonName = /* GraphQL */ `
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
      nextToken
    }
  }
`;
export const weedByBotanicalName = /* GraphQL */ `
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
        }
        src
      }
      nextToken
    }
  }
`;
export const nativePlantByBotanicalName = /* GraphQL */ `
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
export const nativePlantByCommonName = /* GraphQL */ `
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
