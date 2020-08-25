import React, { useState } from "react";
import { navigate } from "@reach/router";
import { useRequest } from "ahooks";
import { Helmet } from "react-helmet";
import { CloudinaryContext } from "cloudinary-react";
import { Avatar, Button, Form, Input, Modal, Space, Typography } from "antd";

import { openUploadWidget } from "../../../utils/CloudinaryService";

const { Title } = Typography;

const CreateEvent = () => {
  const [event, setEvent] = useState({});

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
          setEvent({ ...event, image_url: result.info.secure_url });
        }
      } else {
        alert(error);
      }
    });
  };

  const { run: createEvent } = useRequest(
    (event) => ({
      url: "/api/v1/events",
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    }),
    {
      manual: true,
      onSuccess: (data) => {
        data.id && navigate("/admin/events");
      },
      onError: (error) => {
        Modal.error({ content: error.message });
      },
    }
  );

  const eventValid = (event) => {
    return event.title && event.image_url;
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
          <Title level={3}>Create event</Title>
        </Form.Item>

        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input
            onChange={(e) => setEvent({ ...event, title: e.target.value })}
          />
        </Form.Item>

        <Form.Item
          label="Registration URL"
          name="registration_url"
          rules={[
            { required: true, message: "Please input the registration URL!" },
          ]}
        >
          <Input
            onChange={(e) =>
              setEvent({ ...event, registration_url: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item label="Image" name="image">
          <Space size="middle">
            <Avatar shape="square" size={128} src={event.image_url} />

            <Button onClick={() => beginUpload()}>Upload Image</Button>
          </Space>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4 }}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => eventValid(event) && createEvent(event)}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateEvent;
