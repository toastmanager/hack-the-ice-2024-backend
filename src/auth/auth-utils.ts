import { Token } from './auth.service';

export const createTokenObject = (
  access_token: string,
  refresh_token: string,
): Token => {
  return {
    access_token: access_token,
    refresh_token: refresh_token,
    token_type: 'Bearer',
  };
};
