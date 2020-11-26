import React from "react";
import { Link } from "@reach/router";
import { useRequest } from "ahooks";
import axios from "axios";
import { Avatar, Button, Divider, Modal, Space, Table } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const moment = require("moment");

const { confirm } = Modal;

const Startups = () => {
  const { data: startups, run: getStartups } = useRequest("/api/v1/startups");

  const { run: deleteStartup } = useRequest(
    (startup) => ({
      url: `/api/v1/startups/${startup.id}`,
      method: "delete",
    }),
    {
      manual: true,
      requestMethod: (service) => {
        return axios({ ...service, responseType: "text" });
      },
      onSuccess: () => {
        getStartups();
      },
      onError: (error) => {
        Modal.error({ content: error.message });
      },
    }
  );

  const showDeleteConfirm = (startup) => {
    confirm({
      title: (
        <p>
          Are you sure to delete <b>{startup.title}</b> startup?
        </p>
      ),
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        deleteStartup(startup);
      },
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Image",
      dataIndex: "image_url",
      render: (text) => <Avatar shape="square" size={128} src={text} />,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      render: (text) => text && moment(text, "YYYY-MM-DDTHH:mm.SSZ").fromNow(),
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      render: (text) => text && moment(text, "YYYY-MM-DDTHH:mm.SSZ").fromNow(),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => showDeleteConfirm(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button type="link">
        <Link to="/admin/startups/create">Create startup</Link>
      </Button>
      <Divider />
      <Table rowKey="id" dataSource={startups} columns={columns} />
    </>
  );
};

export default Startups;
