import React from "react";
import { Router, Link } from "@reach/router";
import "antd/dist/antd.css";
import { Layout, Menu, Breadcrumb } from "antd";

import Events from "./event/Events";
import CreateEvent from "./event/CreateEvent";
import Organizations from "./organization/Organizations";
import CreateOrganization from "./organization/CreateOrganization";
import Startups from "./startup/Startups";
import CreateStartup from "./startup/CreateStartup";
import Banners from "./banner/Banners";
import CreateBanner from "./banner/CreateBanner";

const { Header, Content, Footer } = Layout;

const Admin = () => {
  const menuItems = [
    {
      label: "Banners",
      listPage: "/admin/banners",
      routes: [
        <Banners path="/banners" />,
        <CreateBanner path="/banners/create" />,
      ]
    },
    {
      label: "Events",
      listPage: "/admin/events",
      routes: [
        <Events path="/events" />,
        <CreateEvent path="/events/create" />,
      ]
    },
    {
      label: "Organizations",
      listPage: "/admin/organizations",
      routes: [
        <Organizations path="/organizations" />,
        <CreateOrganization path="/organizations/create" />,
      ]
    },
    {
      label: "Startup",
      listPage: "/admin/startups",
      routes: [
        <Startups path="/startups" />,
        <CreateStartup path="/startups/create" />,
      ]
    },
  ]
  return (
    <Layout theme="light">
      <Header>
        <Menu theme="dark" mode="horizontal">
          {menuItems.map((item, idx) => (
            <Menu.Item key={idx}>
              <Link to={`${item.listPage}`}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Header>

      <Content style={{ padding: "0 50px" }}>
        {/* TODO: dynamically change breadcrumb items */}
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
        </Breadcrumb>

        <Layout
          style={{ background: "#fff", padding: "24px", minHeight: "280px" }}
        >
          <Router>
            {menuItems.map(item => (
              item.routes && item.routes.map(route => (
                route
              ))
            ))}
          </Router>
        </Layout>
      </Content>

      <Footer />
    </Layout>
  );
};

export default Admin;
