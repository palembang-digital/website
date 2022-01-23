import React, { useContext, useEffect, useState } from "react";
import { Button, Popover, Skeleton, Modal } from "antd";
import Firebase from "../../providers/firebase/FirebaseContext";
import { signOut, linkSocialLogin, fetchSignInMethods, googleProvider, unlinkLogin, facebookProvider, emailProvider } from "../../utils/FirebaseService";
import LinkEmail from "../../providers/firebase/LinkEmail";
import { navigate } from "@reach/router";
import "./ProfileButton.scss";

const ProfileButton = () => {
  const { authUser } = useContext(Firebase);

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
        <svg id='profilePicture' style={{width: '79%'}} viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
          <path fill='#ffffff' d="M1536 1399q0 109-62.5 187t-150.5 78h-854q-88 0-150.5-78t-62.5-187q0-85 8.5-160.5t31.5-152 58.5-131 94-89 134.5-34.5q131 128 313 128t313-128q76 0 134.5 34.5t94 89 58.5 131 31.5 152 8.5 160.5zm-256-887q0 159-112.5 271.5t-271.5 112.5-271.5-112.5-112.5-271.5 112.5-271.5 271.5-112.5 271.5 112.5 112.5 271.5z" />
        </svg>
      </Button>
    </Popover>
    :
    <Button onClick={() => navigate('/login')} type='primary' shape='circle' size='large' style={{ marginLeft: '20px' }}>
      <svg id='profilePicture' style={{width: '79%'}} viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
        <path fill='#ffffff' d="M1536 1399q0 109-62.5 187t-150.5 78h-854q-88 0-150.5-78t-62.5-187q0-85 8.5-160.5t31.5-152 58.5-131 94-89 134.5-34.5q131 128 313 128t313-128q76 0 134.5 34.5t94 89 58.5 131 31.5 152 8.5 160.5zm-256-887q0 159-112.5 271.5t-271.5 112.5-271.5-112.5-112.5-271.5 112.5-271.5 271.5-112.5 271.5 112.5 112.5 271.5z" />
      </svg>
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
      <LinkEmail />
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
