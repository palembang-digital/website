import React, { useState } from "react";
import { navigate } from "@reach/router";
import { useRequest } from "ahooks";
import { Button, Form, Input, Modal, Typography } from "antd";

const { Title } = Typography;

const CreateEvent = () => {
  const [event, setEvent] = useState({});

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
        label="Image URL"
        name="image_url"
        rules={[{ required: true, message: "Please input the image URL!" }]}
      >
        <Input
          onChange={(e) => setEvent({ ...event, image_url: e.target.value })}
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
  );
};

export default CreateEvent;
