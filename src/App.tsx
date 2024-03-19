import React from 'react';
import { AuthContextProvider, useAuthContext } from './authProvider/authProvider';
import useAuthFlow from './utils/useAuthFlow';
function App() {
  const QuickComp = ()=>{
    const authContext = useAuthContext();
    useAuthFlow(authContext)
    return <div>
      <button onClick={()=>{
        authContext.logOut()
      }}>Log out</button>
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
