import React, { useContext, useEffect, useState } from "react";
import { Button, Popover, Skeleton, Modal } from "antd";
import Firebase from "../../providers/firebase/FirebaseContext";
import { signOut, linkSocialLogin, fetchSignInMethods, googleProvider, unlinkLogin, facebookProvider, emailProvider } from "../../utils/FirebaseService";
import SignUpForm from "../../providers/firebase/SignUpForm";

const ProfileButton = () => {
  const { setIsSignModalVisible, authUser } = useContext(Firebase);

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
    <Button onClick={() => setIsSignModalVisible(true)} type='primary' shape='circle' size='large' style={{ marginLeft: '20px' }}>
      A
    </Button>
  );
};

const SocialLoginLinkList = () => {
  const { authUser, isEmailVerified } = useContext(Firebase);
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
    <p>{isEmailVerified ? 'email is verified' : 'email is not verified!'}</p>
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
        <PasswordLoginLink
          activeSignInMethods={activeSignInMethods}
          fetchSignIn={fetchSignIn}
          onlyOneLeft={onlyOneLeft}
        />
      </>
    ) : <Skeleton active />}
  </>);
}

const PasswordLoginLink = ({ activeSignInMethods, fetchSignIn, onlyOneLeft }) => {
  const { authUser } = useContext(Firebase);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isEnabled = activeSignInMethods.includes(
    emailProvider.providerId,
  );
  return (<>
    {isEnabled
      ? <Button disabled={onlyOneLeft} onClick={
        () => unlinkLogin(authUser, emailProvider.providerId)
          .then(fetchSignIn)
      }>Unlink Password Login</Button>
      : <Button onClick={() => setIsModalVisible(true)}>Link Password Login</Button>
    }
    <Modal title='Link Password Login' visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
      <SignUpForm afterSigning={fetchSignIn}/>
    </Modal>
    </>)
}

const GoogleLoginLink = ({ activeSignInMethods, fetchSignIn, onlyOneLeft }) => {
  const { authUser } = useContext(Firebase);
  const isEnabled = activeSignInMethods.includes(
    googleProvider.providerId,
  );
  return isEnabled
    ? <Button disabled={onlyOneLeft} onClick={
      () => unlinkLogin(authUser, googleProvider.providerId)
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
      () => unlinkLogin(authUser, facebookProvider.providerId)
        .then(fetchSignIn)
    }>Unlink Facebook</Button>
    : <Button onClick={
      () => linkSocialLogin(authUser, facebookProvider)
        .then(fetchSignIn)
    }>Link Facebook</Button>
}

export default ProfileButton;
