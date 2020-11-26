import React from "react";
import { Router, Link } from "@reach/router";
import "antd/dist/antd.css";
import { Layout, Menu, Breadcrumb } from "antd";

import Events from "./event/Events";
import CreateEvent from "./event/CreateEvent";
import Organizations from "./organization/Organizations";
import CreateOrganization from "./organization/CreateOrganization";

const { Header, Content, Footer } = Layout;

const Admin = () => {
  return (
    <Layout theme="light">
      <Header>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1">
            <Link to="/admin/events">Events</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/admin/organizations">Organizations</Link>
          </Menu.Item>
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
            <Events path="/events" />
            <CreateEvent path="/events/create" />
          </Router>

          <Router>
            <Organizations path="/organizations" />
            <CreateOrganization path="/organizations/create" />
          </Router>
        </Layout>
      </Content>

      <Footer />
    </Layout>
  );
};

export default Admin;
