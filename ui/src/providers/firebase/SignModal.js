import { Modal, Button } from "antd";
import { useContext, useState } from "react";
import { navigate } from "@reach/router";
import Firebase from "./FirebaseContext";
import { signInWithFacebook, signInWithGoogle } from "../../utils/FirebaseService";
import TranslateErrorCodes from "./TranslateErrorCodes";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

const SignModal = () => {
  const { isSignModalVisible, setIsSignModalVisible } = useContext(Firebase);
  const [isSignUp, setIsSignUp] = useState(false);

  const afterSigning = (additionalUserInfo) => {
    setIsSignModalVisible(false);
    if (additionalUserInfo) {
      additionalUserInfo.isNewUser && navigate('/registration');
    }
  }

  return <Modal title={isSignUp ? 'Sign Up with' : 'Sign In with'} visible={isSignModalVisible} onCancel={() => setIsSignModalVisible(false)} footer={null}>

    <Button onClick={() =>
      signInWithGoogle()
        .then(afterSigning)
        .catch(error => {
          const translate = TranslateErrorCodes(error.code, error.message);
          if (typeof translate === 'string')
            console.log(translate);
        })
    }>Google</Button>
    <Button onClick={() =>
      signInWithFacebook()
        .then(afterSigning)
        .catch(error => {
          const translate = TranslateErrorCodes(error.code, error.message);
          if (typeof translate === 'string')
            console.log(translate);
        })
    }>Facebook</Button>

    {
      isSignUp
        ? <SignUpForm afterSigning={afterSigning}/>
        : <SignInForm afterSigning={afterSigning}/>
    }

    <>
      <Button
        type="primary"
        htmlType="button"
        onClick={() => setIsSignUp(!isSignUp)}
      >
        {isSignUp ? 'I Have Account' : 'Create Account'}
      </Button>
    </>
  </Modal>
}

export default SignModal;