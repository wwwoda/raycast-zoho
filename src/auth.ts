import { LocalStorage } from '@raycast/api';
import got from 'got';
import getPreferences from './preferences';

const KEY_ACCESS_TOKEN = 'accessToken';
const KEY_ACCESS_TOKEN_EXPIRATION = 'accessTokenExpirationDate';

// interface AccessToken {
//   accessToken?: string;
//   expiresInSeconds?: number;
//   error?: string;
// }

export const getAccessToken = async (): Promise<string> => {
  const storedAccessToken = await LocalStorage.getItem<string>(KEY_ACCESS_TOKEN);
  const accessTokenExpirationTimeStamp = await LocalStorage.getItem<number>(KEY_ACCESS_TOKEN_EXPIRATION);

  if (!accessTokenExpirationTimeStamp || accessTokenExpirationTimeStamp < new Date().getTime()) {
    const newAccessToken = await fetchNewAccessToken();
    return newAccessToken;
  }

  return storedAccessToken || '';
};

export const fetchNewAccessToken = async (): Promise<string> => {
  const { clientId, clientSecret, refreshToken } = await getPreferences();

  const response = await got
    .post('https://accounts.zoho.com/oauth/v2/token', {
      form: {
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'refresh_token',
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    })
    .json<Record<string, any>>();

  if (response?.access_token) {
    const expirationDate = new Date(new Date().getTime() + response.expires_in * 1000).getTime();
    await LocalStorage.setItem(KEY_ACCESS_TOKEN, response.access_token as string);
    await LocalStorage.setItem(KEY_ACCESS_TOKEN_EXPIRATION, expirationDate);
    return response.access_token as string;
  }

  return 'error';
};
