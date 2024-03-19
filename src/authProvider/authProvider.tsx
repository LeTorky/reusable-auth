import React, { createContext, useContext, useState, ReactElement, useCallback } from "react";
import { IAuthContext, ITokens } from "./IAuthContext";
import axios from "axios";

const TOKEN_LOGOUT = "https://margy-auth.onrender.com/token/logout";
const TOKEN_REFRESH = "https://margy-auth.onrender.com/token/refresh";

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

  const logOut = useCallback(()=>{
    axios.post(TOKEN_LOGOUT).then(
      response=>{
        setTokens({accessToken: "", refreshToken: ""})
        window.location.href = "https://login.microsoftonline.com/f801c87d-d572-4b64-8aa7-5dcd20e0af7b/oauth2/v2.0/logout?post_logout_redirect_uri=http://localhost:3000/logout/"
      }
    );
  }, [setTokens])

  const refresh = useCallback(()=>{
    axios.post(TOKEN_REFRESH).then(
      response=>{
        setTokens(oldToken=>({accessToken: response.headers["authorization"], refreshToken: oldToken.refreshToken}))
      }
    )
  }, [setTokens])

  const contextValue: IAuthContext = {
    tokens,
    setTokens: (newTokens: ITokens) => setTokens(newTokens),
    logOut,
    refresh
  };

  return (
    <AuthContext.Provider value= {contextValue}>
      {children}
    </AuthContext.Provider>
  )
};
