/* eslint-disable react/prop-types */
import { useQuery } from '@apollo/client';
import { createContext, useEffect, useState } from 'react'
import { authQueries } from '../../graphql/AuthQueries';
import { mfaMethods } from '../../Utils/data';
import { _reload } from '../../Utils/functions';

export const AuthContext = createContext();

function AuthContextProvider(props) {
  const [ selectedMFAMehtod, setSelectedMFAMethod ] = useState(null);
  const [ auth, setAuth ] = useState(null);
  const [ user, setUser ] = useState(null);
  // const [ loading, setLoading ] = useState(false);
  const [ mfaSetup, setMfaSetup ] = useState(false);
  const [ authAlert, setAuthAlert ] = useState(null);
  const [ authError, setAuthError ] = useState(null);
  const [ authStage, setAuthStage ] = useState('signin');
  const [ activeMFAs, setActiveMFAs ] = useState([]);
  
  const { data, error, loading } = useQuery(authQueries.GET_CURRENT_USER, {
    pollInterval: auth && auth.mfaEnabled && !auth.mfaComplete ? 1000 : undefined
  });

  useEffect(() => {
    // TODO: FIND A WAY TO SAVE THE MFA COMPLETE JWT TOKEN
    // setLoading(fetching)
    if(data){
      const _user = data.getCurrentUser
      console.log(_user);
      setAuth(_user)
      setUser(_user)
      setAuthStage('signin')

      // // Set active MFA Methods
      // if(_user.mfaEnabled){
      //   const _actMfas = [];
      //   if(_user.mfaEmail.enabled) _actMfas.push(mfaMethods[0]);
      //   if(_user.mfaSMSOTP.enabled) _actMfas.push(mfaMethods[1]);
      //   if(_user.mfaFingerprint.enabled || _user.mfaPhoneOTP.enabled) _actMfas.push(mfaMethods[2]);
      //   setActiveMFAs(_actMfas);
      //   return;
      // }
      // setActiveMFAs(mfaMethods);
    }
  }, [data]);

  useEffect(() => {
    if(error){
      console.log({...error})
      if( error && error.networkError && error.networkError.statusCode === 401){
        console.log({...error.networkError})
        setAuth(null);
        localStorage.removeItem('token');
        return;
      }
      // if(auth && auth.mfaEnabled && !auth.mfaComplete) {
      //   logout();
      //   return
      // }
    }
  }, [error, auth])

  useEffect(() => {
    if(authError){
      if(authError.name === "ApolloError"){
        setAuthAlert({
          type: 'error',
          description: "Server down, try again later.",
          title: 'Server down.!'
        });
        return;
      }
      if(authError.networkError && authError.networkError.statusCode === 401){
        setAuth(null);
        setAuthAlert({
          type: 'error',
          description: "Session expired, Please login again.",
          title: 'Session Expired!'
        });
        localStorage.removeItem('token');
        setAuthStage('signin')
      }
      
    }
  }, [ authError ]);

  useEffect(() => {
    if(auth){
      if(!auth.isEmailVerified){
        setAuthStage('email_verification');
        return;
      }

      // Set active MFA Methods
      if(auth.mfaEnabled){
        const _actMfas = [];
        if(auth.mfaEmail.enabled) _actMfas.push(mfaMethods[0]);
        if(auth.mfaSMSOTP.enabled) _actMfas.push(mfaMethods[1]);
        if(auth.mfaFingerprint.enabled || auth.mfaPhoneOTP.enabled) _actMfas.push(mfaMethods[2]);
        setActiveMFAs(_actMfas);
        return;
      }
      setActiveMFAs(mfaMethods);
      // Anything else that needs auth === true...
    }
  }, [auth])

  const logout = () => {
    setAuth(null);
    setAuthStage('signin');
    localStorage.removeItem('token');
    _reload();
  }

  return (
    <AuthContext.Provider value={{
      auth, setAuth,
      user, setUser,
      // loading, setLoading,
      loading,
      authAlert, setAuthAlert,
      authStage, setAuthStage,
      logout,
      authError, setAuthError,
      activeMFAs,
      selectedMFAMehtod, setSelectedMFAMethod,
      mfaSetup, setMfaSetup,
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider