import React from 'react';
import { AuthContextProvider, useAuthContext } from './authProvider/authProvider';
import useAuthFlow from './utils/useAuthFlow';
function App() {
  const QuickComp = ()=>{
    const authContext = useAuthContext();
    useAuthFlow(authContext); 
    return <div/>
  }

  return (
    <AuthContextProvider>
      <QuickComp/>
    </AuthContextProvider>
  );
  }

export default App;
