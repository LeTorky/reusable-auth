export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface setTokens {
  (tokens: ITokens): void;
}

export interface logOut {
  (): void;
}

export interface IAuthContext {
  tokens: ITokens;
  setTokens: setTokens;
  logOut: logOut;
}
