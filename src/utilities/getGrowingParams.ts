const { REST_ENDPOINT } = process.env;
export async function getGrowingParams(
  zipcode: string,
  street: string,
  city: string,
  state: string
) {
  return fetch(encodeURI(`${REST_ENDPOINT}/growingParams`), {
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
  }).then(async (res) => {
    const params = await res.json();
    return params as {
      hardinessZone: string;
      firstGdd45: string;
      lastGdd45: string;
      growingSeasonLength: number;
    };
  });
}
