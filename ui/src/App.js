import React, { Suspense } from "react";
import loadable from "@loadable/component";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";

const Team = loadable(() => import("./Team"));
const Admin = loadable(() => import("./pages").then((c) => c.Admin));

export default () => (
  <>
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/patal-team" component={Team} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </Suspense>
    </Router>
  </>
);
