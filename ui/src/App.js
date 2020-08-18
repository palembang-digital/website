import React from "react";
import { Router } from "@reach/router";
import Home from "./Home";

export default () => (
  <>
    <Router>
      <Home path="/" />
    </Router>
  </>
);
