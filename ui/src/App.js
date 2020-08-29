import React from "react";
import loadable from "@loadable/component";
import { Router } from "@reach/router";

const Home = loadable(() => import("./Home"));
const Team = loadable(() => import("./Team"));
const Admin = loadable(() => import("./pages").then((c) => c.Admin));

export default () => (
  <>
    <Router>
      <Home path="/" />
      <Team path="/patal-team" />
      <Admin path="/admin/*" />
    </Router>
  </>
);
