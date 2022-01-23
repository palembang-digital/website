import { Button } from "antd";
import { signInWithGoogle, signInWithFacebook } from "../../utils/FirebaseService";
import TranslateErrorCodes from "../../providers/firebase/TranslateErrorCodes";
import { navigate } from "@reach/router";

const SocialAuth = () => {
  const afterSignIn = () => navigate('/');

  return <>
    <Button onClick={() =>
      signInWithGoogle()
        .then(afterSignIn)
        .catch(error => {
          const translate = TranslateErrorCodes(error.code, error.message);
          if (typeof translate === 'string')
            console.log(translate);
        })
    }>Google</Button>
    <Button onClick={() =>
      signInWithFacebook()
        .then(afterSignIn)
        .catch(error => {
          const translate = TranslateErrorCodes(error.code, error.message);
          if (typeof translate === 'string')
            console.log(translate);
        })
    }>Facebook</Button>
  </>
}

export default SocialAuth;
