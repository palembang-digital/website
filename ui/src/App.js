import React from "react";
import { Router } from "@reach/router";
import Home from "./Home";
import Team from "./Team";

export default () => (
  <>
    <Router>
      <Home path="/" />
      <Team path="/patal-team" />
    </Router>
  </>
);
