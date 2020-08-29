import React from "react";
import loadable from "@loadable/component";
import { Router, Link } from "@reach/router";
import Events from "./event/Events";
import CreateEvent from "./event/CreateEvent";
import "antd/dist/antd.css";
// import { Layout, Menu, Breadcrumb } from "antd";
const Layout = loadable(() => import("antd/es/layout"));
const Menu = loadable(() => import("antd/es/menu"));
const Breadcrumb = loadable(() => import("antd/es/breadcrumb"));

// const { Header, Content, Footer } = Layout;
const Header = loadable(() => import("antd/es/layout").then((c) => c.Header));
const Content = loadable(() => import("antd/es/layout").then((c) => c.Content));
const Footer = loadable(() => import("antd/es/layout").then((c) => c.Footer));

const Admin = () => {
  return (
    <Layout theme="light">
      <Header>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1">
            <Link to="/admin/events">Events</Link>
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
        </Layout>
      </Content>

      <Footer />
    </Layout>
  );
};

export default Admin;
