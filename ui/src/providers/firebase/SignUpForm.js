import { Button, Form, Input } from "antd";
import { useContext, useState } from "react";
import { createUserEmailAndPassword, linkDefaultLogin } from "../../utils/FirebaseService";
import Firebase from "./FirebaseContext";
import TranslateErrorCodes from "./TranslateErrorCodes";

const SignUpForm = (props) => {
  const { authUser } = useContext(Firebase);

  const [signUp, setSignUp] = useState({});

  const [form] = Form.useForm();

  const signUpValid = (signUp) => signUp.email
    && signUp.password
    && signUp.confirm
    && (signUp.password === signUp.confirm);

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
    if (authUser)
      linkDefaultLogin(authUser, signUp.email, signUp.password)
        .then(props.afterSigning)
        .catch(signUpError)
    else
      createUserEmailAndPassword(signUp.email, signUp.password)
        .then(props.afterSigning)
        .catch(signUpError)
  }

  return (
    <Form form={form} name="signUp" wrapperCol={{ span: 8 }}>
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
      </Form.Item>
    </Form>)
}

export default SignUpForm;
