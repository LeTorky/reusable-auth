import { useEffect } from "react";
import axios from "axios";
import { IAuthContext } from "../authProvider/IAuthContext";

const SSO_ENDPOINT =
  "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=f801c87d-d572-4b64-8aa7-5dcd20e0af7b&response_type=code&redirect_uri=http://localhost:3000&scope=openid";
const TOKEN_EXCHANGE = "https://margy-auth.onrender.com/token/exchange";

const useAuthFlow = (authContext: IAuthContext) => {
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    if (!params.code && !authContext.tokens.accessToken)
      window.location.href = SSO_ENDPOINT;
    if (params.code && !authContext.tokens.accessToken) {
      console.log("Fetching Token...");
      axios
        .post(TOKEN_EXCHANGE, {
          code: params.code,
        })
        .then((response) => {
          authContext.setTokens({
            accessToken: response.headers["authorization"],
            refreshToken: response.headers["refresh-token"],
          });
          console.log("Fetched Token.");
        })
        .catch((error) => console.log(error));
    } else {
      console.log("Set Token.");
      axios.defaults.headers.common["Authorization"] =
        authContext.tokens.accessToken;
      axios.defaults.headers.common["Refresh-Token"] =
        authContext.tokens.refreshToken;
    }
  }, [authContext]);
};

export default useAuthFlow;
