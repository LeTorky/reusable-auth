import React from 'react';
import { AuthContextProvider, useAuthContext } from './authProvider/authProvider';
import useAuthFlow from './utils/useAuthFlow';
function App() {
  const QuickComp = ()=>{
    const authContext = useAuthContext();
    useAuthFlow(authContext)
    return <div>
      <button onClick={()=>{
        window.location.href = "http://localhost:3000/login"
      }}>Log in</button>
      <button onClick={()=>{
        authContext.logOut()
      }}>Log out</button>
      <button onClick={()=>{
        authContext.refresh()
      }}>Refresh</button>
      {authContext.tokens.accessToken}
      {authContext.tokens.refreshToken}
    </div>
  }

  return (
    <AuthContextProvider>
      <QuickComp/>
    </AuthContextProvider>
  );
  }

export default App;
