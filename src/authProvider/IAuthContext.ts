export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthContext {
  tokens: ITokens;
  setTokens: (tokens: ITokens) => void;
}
