import { createContext, useState } from 'react';

const AuthContext = createContext();

function AuthProvider(props) {
  const [userInfo, setUserInfo] = useState({});
  return <AuthContext.Provider value={{ userInfo, setUserInfo }} {...props}></AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
