import { navigate } from "@reach/router";
import { Button, Form, Input } from "antd";
import { useContext, useState } from "react";
import { linkDefaultLogin } from "../../utils/FirebaseService";
import Firebase from "./FirebaseContext";
import TranslateErrorCodes from "./TranslateErrorCodes";

const LinkEmail = () => {
  const { authUser } = useContext(Firebase);

  const [link, setLink] = useState({});

  const [form] = Form.useForm();

  const linkValid = (link) => link.email
    && link.password
    && link.confirm
    && (link.password === link.confirm);

  const afterLink = () => navigate('/');

  const linkError = error => {
    console.log({ ...error })

    const translate = TranslateErrorCodes(error.code, error.message);
    if (typeof translate === 'string')
      console.log(translate);
    else
      form.setFields([
        { ...translate, name: translate.name }
      ])
  };

  const linkUser = (link) => {
    if (authUser)
      linkDefaultLogin(authUser, link.email, link.password)
        .then(afterLink)
        .catch(linkError)
  }

  return (
    <Form form={form} name="link" wrapperCol={{ span: 8 }}>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
        initialValue={link.email}
      >
        <Input
          value={link.email}
          onChange={(e) => setLink({ ...link, email: e.target.value })}
        />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
        initialValue={link.password}
      >
        <Input.Password
          value={link.password}
          onChange={(e) => setLink({ ...link, password: e.target.value })}
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
        initialValue={link.confirm}
      >
        <Input.Password
          value={link.confirm}
          onChange={(e) => setLink({ ...link, confirm: e.target.value })}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4 }}>
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => linkValid(link) && linkUser(link)}
        >
          Sign Up
        </Button>
      </Form.Item>
    </Form>)
}

export default LinkEmail;
