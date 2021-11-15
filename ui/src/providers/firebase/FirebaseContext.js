import { navigate } from "@reach/router";
import { useRequest } from "ahooks";
import { Modal, Button } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { signInWithFacebook, signInWithGoogle, onAuthListener } from "../../utils/FirebaseService";

const Firebase = React.createContext({
  authUser: null,
  userInfo: null,
  isUserInfoLoading: false,
  setUserInfo: () => null,
  setIsSignInModalVisible: () => null,
});

export default Firebase;

export const withFirebase = Component => props => {
  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('authUser')));
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')));
  const [isSignInModalVisible, setIsSignInModalVisible] = useState(false);

  const [isUserInfoLoading, setIsUserInfoLoading] = useState(false);

  const { run: getUserInfo } = useRequest((auth) => {
    setIsUserInfoLoading(true);
    return {
      url: `/api/v1/users/${auth.uid}`,
      headers: {
        'Authorization': `Bearer ${auth.getIdToken()}`,
      },
    }
  }, {
    manual: true,
    onSuccess: (data) => {
      if (data.id) {
        localStorage.setItem('userInfo', JSON.stringify(authUser));
        setUserInfo(data);
      }
      setIsUserInfoLoading(false);
    },
    onError: (error) => {
      Modal.error({ content: error.message });
      setIsUserInfoLoading(false);
    }
  });

  useEffect(() => onAuthListener(
    (authUser) => {
      localStorage.setItem('authUser', JSON.stringify(authUser));
      setAuthUser(authUser);
      getUserInfo(authUser);
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
  ), [getUserInfo]);

  const afterSignUp = (additionalUserInfo) => {
    setIsSignInModalVisible(false);
    if (additionalUserInfo) {
      additionalUserInfo.isNewUser && navigate('/registration');
    }
  }

  return (<Firebase.Provider value={{
    authUser,
    userInfo,
    isUserInfoLoading,
    setUserInfo,
    setIsSignInModalVisible,
  }}>
    <Component {...props} />
    <Modal title="Sign In with" visible={isSignInModalVisible} onCancel={() => setIsSignInModalVisible(false)} footer={null}>
      <Button onClick={() => signInWithGoogle(afterSignUp)}>Google</Button>
      <Button onClick={() => signInWithFacebook(afterSignUp)}>Facebook</Button>
    </Modal>
  </Firebase.Provider>);
}

export const withAuthorized = Component => props => {
  const { authUser } = useContext(Firebase);
  if (!authUser) {
    navigate('/');
  }
  return authUser && <Component {...props} />
}
