import React, { useState } from "react";
import { navigate } from "@reach/router";
import { useRequest } from "ahooks";
import {
  Button,
  Form,
  Input,
  Modal,
  Space,
  Typography,
} from "antd";
import BannerTextEditor from "./BannerTextEditor";

const { TextArea } = Input;

const { Title } = Typography;

const CreateBanner = () => {
  const [banner, setBanner] = useState({});

  const bannerValid = (banner) => {
    return banner.text;
  };

  const { run: createBanner } = useRequest(
    (banner) => ({
      url: "/api/v1/banners",
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(banner),
    }),
    {
      manual: true,
      onSuccess: (data) => {
        data.id && navigate("/admin/banners");
      },
      onError: (error) => {
        Modal.error({ content: error.message });
      },
    }
  );

  return (
    <>
      <Form name="basic" labelCol={{ span: 4 }} wrapperCol={{ span: 12 }}>
        <Form.Item>
          <Title level={3}>Create banner</Title>
        </Form.Item>

        <Form.Item
          label="Text"
          name="text"
          rules={[{ required: true, message: "Please input the text!" }]}
        >
          <BannerTextEditor onChange={content => { setBanner({ ...banner, text: content }) }} />
          <div>{banner.text}</div>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4 }}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => bannerValid(banner) && createBanner(banner)}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateBanner;
