import React from "react";
import { Link } from "@reach/router";
import { useRequest } from "ahooks";
import axios from "axios";
import { Avatar, Button, Divider, Modal, Space, Table } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const moment = require("moment");

const { confirm } = Modal;

const Events = () => {
  const { data: events, run: getEvents } = useRequest("/api/v1/events");

  const { run: deleteEvent } = useRequest(
    (event) => ({
      url: `/api/v1/events/${event.id}`,
      method: "delete",
    }),
    {
      manual: true,
      requestMethod: (service) => {
        return axios({ ...service, responseType: "text" });
      },
      onSuccess: () => {
        getEvents();
      },
      onError: (error) => {
        Modal.error({ content: error.message });
      },
    }
  );

  const showDeleteConfirm = (event) => {
    confirm({
      title: (
        <p>
          Are you sure to delete <b>{event.title}</b> event?
        </p>
      ),
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        deleteEvent(event);
      },
    });
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Image",
      dataIndex: "image_url",
      render: (text) => <Avatar shape="square" size={128} src={text} />,
    },
    {
      title: "Registration",
      dataIndex: "registration_url",
      render: (text) => (
        <Button type="link" href={text} target="_blank">
          {text}
        </Button>
      ),
    },
    {
      title: "Upcoming / Past",
      dataIndex: "id",
      filters: [
        {
          text: "Upcoming",
          value: "Upcoming",
        },
        {
          text: "Past",
          value: "Past",
        },
      ],
      onFilter: (value, record) => {
        if (value === "Upcoming")
          return Date.now() < new Date(record.scheduled_start);
        if (value === "Past")
          return Date.now() > new Date(record.scheduled_start);
      },
      render: (text, record) =>
        Date.now() < new Date(record.scheduled_start) ? "Upcoming" : "Past",
    },
    {
      title: "Scheduled Time",
      dataIndex: "id",
      defaultSortOrder: "ascend",
      sorter: (a, b) =>
        Date.now() -
        new Date(a.scheduled_start) -
        (Date.now() - new Date(b.scheduled_start)),
      render: (text, record) => (
        <ul>
          <li>
            Countdown:{" "}
            {moment(record.scheduled_start, "YYYY-MM-DDTHH:mm.SSZ").fromNow()}
          </li>
          <li>
            Start: {moment(record.scheduled_start).format("YYYY-MM-DD HH:mm")}
          </li>
          <li>
            End: {moment(record.scheduled_end).format("YYYY-MM-DD HH:mm")}
          </li>
        </ul>
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
        <Link to="/admin/events/create">Create event</Link>
      </Button>
      <Divider />
      <Table rowKey="id" dataSource={events} columns={columns} />
    </>
  );
};

export default Events;
