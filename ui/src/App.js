import React from "react";
import { Router } from "@reach/router";
import Home from "./Home";
import Team from "./Team";
import { Admin } from "./pages";
import PatalTv from "./Pataltv";

export default () => (
  <>
    <Router>
      <Home path="/" />
      <Team path="/patal-team" />
      <Admin path="/admin/*" />
      <PatalTv path="/patal-tv" />
    </Router>
  </>
);
