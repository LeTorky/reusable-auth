import React from 'react';
import { AuthContextProvider, useAuthContext } from './authProvider/authProvider';
import useAuthFlow from './utils/useAuthFlow';
import useAuthAxios from './utils/useAuthAxios';
import axios from 'axios';
function App() {
  const QuickComp = ()=>{
    const authContext = useAuthContext();
    useAuthFlow(authContext);
    const axiosAuthReady = useAuthAxios(authContext);
    return <div>

      <button onClick={()=>{
        window.location.href = "http://localhost:3000/login"
      }}>Log in</button>

      {
        axiosAuthReady && <button onClick={()=>{
        authContext.logOut()
      }}>Log out</button>
      }

      {
        axiosAuthReady && <button onClick={()=>{
        authContext.refresh()
      }}>Refresh</button>
      }

      {
        axiosAuthReady && <button onClick={()=>{
        axios.get("replace_with_resource_Url")
      }}>Make Request</button>
      }

      <br/>
      <br/>
      <br/>
      <div>
      AccessToken: {authContext.tokens.accessToken}
      </div>

      <br/>
      <br/>
      <br/>
      <div>
      RefreshToken: {authContext.tokens.refreshToken}
      </div>
    </div>
  }

  return (
    <AuthContextProvider>
      <QuickComp/>
    </AuthContextProvider>
  );
  }

export default App;
