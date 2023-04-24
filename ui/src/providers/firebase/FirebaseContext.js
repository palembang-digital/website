import { navigate } from "@reach/router";
import { useRequest } from "ahooks";
import { Modal } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { emailProvider, onAuthListener } from "../../utils/FirebaseService";

const Firebase = React.createContext({
  authUser: null,
  userInfo: null,
  isEmailVerified: false,
  accessToken: '',
  isUserInfoLoading: false,
  setUserInfo: () => null,
});

export default Firebase;

export const withFirebase = Component => props => {
  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('authUser')));
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')));
  const [accessToken, setAccessToken] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const [isUserInfoLoading, setIsUserInfoLoading] = useState(false);

  const { run: getUserInfo } = useRequest((auth, token) => {
    setIsUserInfoLoading(true);
    return {
      url: `/api/v1/users/${auth.uid}`,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  }, {
    manual: true,
    onSuccess: (data) => {
      if (data.uid) {
        localStorage.setItem('userInfo', JSON.stringify(authUser));
        setUserInfo(data);
      }
      setIsUserInfoLoading(false);
    },
    onError: (error) => {
      // Modal.error({ content: error.message });
      console.log(error);
      setIsUserInfoLoading(false);
    }
  });

  useEffect(() => onAuthListener(
    (authUser, token) => {
      localStorage.setItem('authUser', JSON.stringify(authUser));
      setAuthUser(authUser);
      setAccessToken(token);
    },
    error => {
      localStorage.removeItem('authUser');
      localStorage.removeItem('userInfo');
      setAuthUser(null);
      setUserInfo(null);
      if (error) {
        Modal.error({ content: error.message });
      }
      setIsUserInfoLoading(false);
    }
  ), []);

  useEffect(() => {
    if (authUser && accessToken) {
      getUserInfo(authUser, accessToken);
    }
    if (authUser) {
      const hasEmailProvider = authUser.providerData
        .map(provider => provider.providerId)
        .includes(emailProvider.providerId);
      setIsEmailVerified(
        (authUser.emailVerified && hasEmailProvider) || !hasEmailProvider
      )
    }
  }, [getUserInfo, authUser, accessToken])

  return (<Firebase.Provider value={{
    authUser,
    userInfo,
    isEmailVerified,
    accessToken,
    isUserInfoLoading,
    setUserInfo,
  }}>
    <Component {...props} />
  </Firebase.Provider>);
}

export const withAuthorized = Component => props => {
  const { authUser } = useContext(Firebase);
  if (!authUser) {
    navigate('/');
  }
  return authUser && <Component {...props} />
}
