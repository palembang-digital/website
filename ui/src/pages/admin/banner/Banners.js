import React from "react";
import { Link } from "@reach/router";
import { useRequest } from "ahooks";
import axios from "axios";
import { Button, Divider, Modal, Space, Table } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const moment = require("moment");

const { confirm } = Modal;

const Banners = () => {
  const { data: banners, run: getBanners } = useRequest("/api/v1/banners");

  const { run: deleteBanner } = useRequest(
    (banner) => ({
      url: `/api/v1/banners/${banner.id}`,
      method: "delete",
    }),
    {
      manual: true,
      requestMethod: (service) => {
        return axios({ ...service, responseType: "text" });
      },
      onSuccess: () => {
        getBanners();
      },
      onError: (error) => {
        Modal.error({ content: error.message });
      },
    }
  );

  const showDeleteConfirm = (banner) => {
    confirm({
      title: (
        <p>
          Are you sure to delete <b>{banner.title}</b> banner?
        </p>
      ),
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        deleteBanner(banner);
      },
    });
  };

  const columns = [
    {
      title: "Text",
      dataIndex: "text",
      render: (text) => (
        <div dangerouslySetInnerHTML={{ __html: text }}/>
      ),
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
        <Link to="/admin/banners/create">Create banner</Link>
      </Button>
      <Divider />
      <Table rowKey="id" dataSource={banners} columns={columns} />
    </>
  );
};

export default Banners;
