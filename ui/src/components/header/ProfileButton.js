import React, { useContext, useEffect, useState } from "react";
import { Button, Popover, Skeleton } from "antd";
import Firebase from "../../providers/firebase/FirebaseContext";
import { signOut, linkSocialLogin, fetchSignInMethods, googleProvider, unlinkSocialLogin, facebookProvider } from "../../utils/FirebaseService";

const ProfileButton = () => {
  const { setIsSignInModalVisible, authUser } = useContext(Firebase);

  return (authUser ?
    <Popover
      trigger="click"
      arrowPointAtCenter
      placement="bottomRight"
      content={
        <>
          <p>{authUser.displayName}</p>
          <Button onClick={signOut}>Sign Out</Button>
          <SocialLoginLinkList />
        </>
      }>
      <Button type='primary' shape='circle' size='large' style={{ marginLeft: '20px' }}>
        L
      </Button>
    </Popover>
    :
    <Button onClick={() => setIsSignInModalVisible(true)} type='primary' shape='circle' size='large' style={{ marginLeft: '20px' }}>
      A
    </Button>
  );
};

const SocialLoginLinkList = () => {
  const { authUser } = useContext(Firebase);
  const [activeSignInMethods, setActiveSignInMethods] = useState([]);
  const [fetchSignInMethodsLoading, setfetchSignInMethodsLoading] = useState(true);

  const fetchSignIn = () => {
    if (authUser.email) {
      setfetchSignInMethodsLoading(true);
      fetchSignInMethods(authUser.email)
        .then(setActiveSignInMethods)
        .catch()
        .finally(() => setfetchSignInMethodsLoading(false));
    }
  }

  useEffect(fetchSignIn, [authUser])

  const onlyOneLeft = activeSignInMethods.length === 1;

  return (<>
    {!fetchSignInMethodsLoading ? (
      <>
        <GoogleLoginLink
          activeSignInMethods={activeSignInMethods}
          fetchSignIn={fetchSignIn}
          onlyOneLeft={onlyOneLeft}
        />
        <FacebookLoginLink
          activeSignInMethods={activeSignInMethods}
          fetchSignIn={fetchSignIn}
          onlyOneLeft={onlyOneLeft}
        />
      </>
    ) : <Skeleton active />}
  </>);
}

const GoogleLoginLink = ({ activeSignInMethods, fetchSignIn, onlyOneLeft }) => {
  const { authUser } = useContext(Firebase);
  const isEnabled = activeSignInMethods.includes(
    googleProvider.providerId,
  );
  return isEnabled
    ? <Button disabled={onlyOneLeft} onClick={
      () => unlinkSocialLogin(authUser, googleProvider)
        .then(fetchSignIn)
    }>Unlink Google</Button>
    : <Button onClick={
      () => linkSocialLogin(authUser, googleProvider)
        .then(fetchSignIn)
    }>Link Google</Button>
}

const FacebookLoginLink = ({ activeSignInMethods, fetchSignIn, onlyOneLeft }) => {
  const { authUser } = useContext(Firebase);
  const isEnabled = activeSignInMethods.includes(
    facebookProvider.providerId,
  );
  return isEnabled
    ? <Button disabled={onlyOneLeft} onClick={
      () => unlinkSocialLogin(authUser, facebookProvider)
        .then(fetchSignIn)
    }>Unlink Facebook</Button>
    : <Button onClick={
      () => linkSocialLogin(authUser, facebookProvider)
        .then(fetchSignIn)
    }>Link Facebook</Button>
}

export default ProfileButton;
