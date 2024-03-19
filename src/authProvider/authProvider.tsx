import React, { createContext, useContext, useState, ReactElement } from "react";

interface ITokens {
  accessToken: string;
  refreshToken: string;
}

interface IAuthContext {
  tokens: ITokens;
  setTokens: (tokens: ITokens) => void;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
};

export const AuthContextProvider: React.FC<{children?: ReactElement}> = ({ children }) => {
  const [tokens, setTokens] = useState<ITokens>({
    accessToken: "",
    refreshToken: "",
  });

  const contextValue: IAuthContext = {
    tokens,
    setTokens: (newTokens: ITokens) => setTokens(newTokens),
  };

  return (
    <AuthContext.Provider value= {contextValue}>
      {children}
    </AuthContext.Provider>
  )
};