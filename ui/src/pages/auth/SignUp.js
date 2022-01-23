import { Button, Form, Input } from "antd";
import { useState } from "react";
import { createUserEmailAndPassword } from "../../utils/FirebaseService";
import TranslateErrorCodes from "../../providers/firebase/TranslateErrorCodes";
import { navigate } from "@reach/router";
import SocialAuth from "./SocialAuth";

const SignUp = () => {
  const [signUp, setSignUp] = useState({});

  const [form] = Form.useForm();

  const signUpValid = (signUp) => signUp.email
    && signUp.password
    && signUp.confirm
    && (signUp.password === signUp.confirm);

  const afterSignUp = () => navigate('/');

  const signUpError = error => {
    console.log({ ...error })

    const translate = TranslateErrorCodes(error.code, error.message);
    if (typeof translate === 'string')
      console.log(translate);
    else
      form.setFields([
        { ...translate, name: translate.name }
      ])
  };

  const signUpUser = (signUp) => {
    createUserEmailAndPassword(signUp.email, signUp.password)
      .then(afterSignUp)
      .catch(signUpError)
  }

  return (
    <Form form={form} name="signUp" wrapperCol={{ span: 8 }}>
      <SocialAuth/>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
        initialValue={signUp.email}
      >
        <Input
          value={signUp.email}
          onChange={(e) => setSignUp({ ...signUp, email: e.target.value })}
        />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
        initialValue={signUp.password}
      >
        <Input.Password
          value={signUp.password}
          onChange={(e) => setSignUp({ ...signUp, password: e.target.value })}
        />
      </Form.Item>
      <Form.Item
        label="Confirm Password"
        name="confirm"
        dependencies={['password']}
        hasFeedback
        rules={[
          { required: true, message: "Please retype your password!" },
          ({ getFieldValue }) => ({
            async validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return;
              }
              throw new Error('Password tidak sama');
            }
          })
        ]}
        initialValue={signUp.confirm}
      >
        <Input.Password
          value={signUp.confirm}
          onChange={(e) => setSignUp({ ...signUp, confirm: e.target.value })}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4 }}>
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => signUpValid(signUp) && signUpUser(signUp)}
        >
          Sign Up
        </Button>
        <Button
          type="text"
          onClick={() => navigate('/login')}>
          ada akun?
        </Button>
      </Form.Item>
    </Form>)
}

export default SignUp;
