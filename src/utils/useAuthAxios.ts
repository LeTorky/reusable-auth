import axios from "axios";
import { useEffect, useState } from "react";
import { IAuthContext } from "src/authProvider/IAuthContext";

const useAuthAxios = (authContext: IAuthContext) => {
  const [axiosAuthReady, setaxiosReady] = useState(false);
  useEffect(() => {
    if (authContext.tokens.accessToken && authContext.tokens.refreshToken) {
      axios.defaults.headers.common["Authorization"] =
        authContext.tokens.accessToken;
      axios.defaults.headers.common["Refresh-Token"] =
        authContext.tokens.refreshToken;
      console.log("Set Token.");
      setaxiosReady(true);
    } else setaxiosReady(false);
  }, [authContext]);
  return axiosAuthReady;
};

export default useAuthAxios;
