/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getWeedC = /* GraphQL */ `
  query GetWeedC($weedId: String!) {
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
  query GetUserC($email: String!) {
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
  query GetNativePlantC($nativeId: String!) {
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

export const getUserManagementMethods = /* GraphQL */ `
  query GetUserManagementMethods($email: String!) {
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
  query GetUserNativePlants($email: String!) {
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

export const listNativePlantsC = /* GraphQL */ `
  query ListNativePlantsC(
    $nativeId: String
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
      }
      nextToken
    }
  }
`;
