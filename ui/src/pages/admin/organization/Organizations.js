import React from "react";
import { Link } from "@reach/router";
import { useRequest } from "ahooks";
import axios from "axios";
import { Avatar, Button, Divider, Modal, Space, Table } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const moment = require("moment");

const { confirm } = Modal;

const Organizations = () => {
  const { data: organizations, run: getOrganizations } = useRequest(
    "/api/v1/organizations"
  );

  const { run: deleteOrganization } = useRequest(
    (organization) => ({
      url: `/api/v1/organizations/${organization.id}`,
      method: "delete",
    }),
    {
      manual: true,
      requestMethod: (service) => {
        return axios({ ...service, responseType: "text" });
      },
      onSuccess: () => {
        getOrganizations();
      },
      onError: (error) => {
        Modal.error({ content: error.message });
      },
    }
  );

  const showDeleteConfirm = (organization) => {
    confirm({
      title: (
        <p>
          Are you sure to delete <b>{organization.title}</b> organization?
        </p>
      ),
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        deleteOrganization(organization);
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
        <Link to="/admin/organizations/create">Create organization</Link>
      </Button>
      <Divider />
      <Table rowKey="id" dataSource={organizations} columns={columns} />
    </>
  );
};

export default Organizations;
