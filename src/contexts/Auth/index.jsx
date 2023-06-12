/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'

export const AuthContext = createContext();

function AuthContextProvider(props) {
  const [ auth, setAuth ] = useState(null);
  return (
    <AuthContext.Provider value={{
      auth, setAuth,
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider