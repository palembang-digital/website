import { Button, Form, Input } from "antd";
import { useState } from "react";
import { signInEmailAndPassword } from "../../utils/FirebaseService";
import TranslateErrorCodes from "./TranslateErrorCodes";

const SignInForm = (props) => {
  const [signIn, setSignIn] = useState({});

  const [form] = Form.useForm();

  const signInValid = (signIn) => signIn.email && signIn.password;

  const signInUser = (signIn) => {
    signInEmailAndPassword(signIn.email, signIn.password)
      .then(props.afterSigning)
      .catch(error => {
        console.log({ ...error })

        const translate = TranslateErrorCodes(error.code, error.message);
        if (typeof translate === 'string')
          console.log(translate);
        else
          form.setFields([
            { ...translate, name: translate.name }
          ])
      })
  }

  return (
    <Form form={form} name="signIn" wrapperCol={{ span: 8 }}>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
        initialValue={signIn.email}
      >
        <Input
          onChange={(e) => setSignIn({ ...signIn, email: e.target.value })}
        />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
        initialValue={signIn.password}
      >
        <Input.Password
          onChange={(e) => setSignIn({ ...signIn, password: e.target.value })}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4 }}>
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => signInValid(signIn) && signInUser(signIn)}
        >
          Sign In
        </Button>
      </Form.Item>
    </Form>)
}

export default SignInForm;
