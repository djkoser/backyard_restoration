export type AmplifyDependentResourcesAttributes = {
  api: {
    backyardrestoration: {
      GraphQLAPIIdOutput: 'string';
      GraphQLAPIEndpointOutput: 'string';
    };
    stripeEndpoint: {
      RootUrl: 'string';
      ApiName: 'string';
      ApiId: 'string';
    };
  };
  auth: {
    backyardrestoration385e5c12: {
      IdentityPoolId: 'string';
      IdentityPoolName: 'string';
      UserPoolId: 'string';
      UserPoolArn: 'string';
      UserPoolName: 'string';
      AppClientIDWeb: 'string';
      AppClientID: 'string';
    };
  };
  function: {
    stripeCheckout: {
      Name: 'string';
      Arn: 'string';
      Region: 'string';
      LambdaExecutionRole: 'string';
    };
  };
};
