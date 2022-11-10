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
