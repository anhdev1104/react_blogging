import { auth } from '@/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

function AuthProvider(props) {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUserInfo(user);
    });
  }, []);

  return <AuthContext.Provider value={{ userInfo, setUserInfo }} {...props}></AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
