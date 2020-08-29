import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Events from "./event/Events";
import CreateEvent from "./event/CreateEvent";
import "antd/dist/antd.css";
import { Layout, Menu, Breadcrumb } from "antd";

const { Header, Content, Footer } = Layout;

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
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route exact path="/admin/events" component={Events} />
                <Route
                  exact
                  path="/admin/events/create"
                  component={CreateEvent}
                />
              </Switch>
            </Suspense>
          </Router>
        </Layout>
      </Content>

      <Footer />
    </Layout>
  );
};

export default Admin;
