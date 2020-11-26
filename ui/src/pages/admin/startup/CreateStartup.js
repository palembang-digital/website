import React, { useState } from "react";
import { navigate } from "@reach/router";
import { useRequest } from "ahooks";
import { Helmet } from "react-helmet";
import { CloudinaryContext } from "cloudinary-react";
import { Avatar, Button, Form, Input, Modal, Space, Typography } from "antd";

import { openUploadWidget } from "../../../utils/CloudinaryService";

const { Title } = Typography;

const CreateStartup = () => {
  const [request, setRequest] = useState({});

  const isRequestValid = (request) => {
    return request.name && request.image_url;
  };

  const { run: createStartup } = useRequest(
    (request) => ({
      url: "/api/v1/startups",
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    }),
    {
      manual: true,
      onSuccess: (data) => {
        data.id && navigate("/admin/startups");
      },
      onError: (error) => {
        Modal.error({ content: error.message });
      },
    }
  );

  const beginUpload = (tag) => {
    const uploadOptions = {
      cloudName: "patal",
      tags: [tag],
      uploadPreset: "patal_unsigned_preset",
      maxFiles: 1,
    };

    openUploadWidget(uploadOptions, (error, result) => {
      if (!error) {
        if (result.event === "success") {
          setRequest({ ...request, image_url: result.info.secure_url });
        }
      } else {
        alert(error);
      }
    });
  };

  return (
    <>
      <Helmet>
        <script
          src="https://widget.cloudinary.com/v2.0/global/all.js"
          type="text/javascript"
        ></script>
      </Helmet>

      <CloudinaryContext cloudName="patal"></CloudinaryContext>

      <Form name="basic" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
        <Form.Item>
          <Title level={3}>Create startup</Title>
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input the name!" }]}
        >
          <Input
            onChange={(e) => setRequest({ ...request, name: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="Image" name="image">
          <Space size="middle">
            <Avatar shape="square" size={128} src={request.image_url} />

            <Button onClick={() => beginUpload()}>Upload Image</Button>
          </Space>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4 }}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => isRequestValid(request) && createStartup(request)}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateStartup;
