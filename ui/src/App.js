import React from "react";
import { Router } from "@reach/router";
import Home from "./Home";
import Team from "./Team";
import { Admin } from "./pages";

export default () => (
  <>
    <Router>
      <Home path="/" />
      <Team path="/patal-team" />

      <Admin path="/admin/*" />
    </Router>
  </>
);
