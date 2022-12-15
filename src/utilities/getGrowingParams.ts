import { API } from 'aws-amplify';
export async function getGrowingParams(
  zipcode: string,
  street: string,
  city: string,
  state: string
) {
  return API.post('backyardRestorationREST', '/growingParams', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      zipcode,
      street,
      city,
      state
    })
  }) as Promise<{
    hardinessZone: string;
    firstGdd45: string;
    lastGdd45: string;
    growingSeasonLength: number;
  }>;
}
