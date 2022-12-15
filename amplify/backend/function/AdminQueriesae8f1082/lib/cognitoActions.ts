import { CognitoIdentityServiceProvider } from 'aws-sdk';

const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();
const userPoolId = process.env.USERPOOL;

export async function deleteUserIfUnconfirmed(username: string) {
  const params = {
    UserPoolId: userPoolId || '',
    Username: username
  };

  console.log(`Attempting to delete user ${username} only if unconfirmed`);
  try {
    const result = await cognitoIdentityServiceProvider
      .adminGetUser(params)
      .promise();
    if (result.UserStatus === 'UNCONFIRMED') {
      console.log('User unconfirmed, disabling...');
      await cognitoIdentityServiceProvider.adminDisableUser(params).promise();
      console.log('User disabled, deleting...');
      await cognitoIdentityServiceProvider
        .adminDeleteUser(params, undefined)
        .promise();
    }
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
