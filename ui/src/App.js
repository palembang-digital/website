import React from "react";
import loadable from "@loadable/component";
import { LocationProvider, Router, createHistory } from "@reach/router";
import ReactGA from "react-ga";
import { Helmet } from "react-helmet";

import Home from "./Home";

const Team = loadable(() => import("./Team"));
const Admin = loadable(() => import("./pages").then((c) => c.Admin));

ReactGA.initialize("UA-169186060-1");

const history = createHistory(window);

const App = () => {
  history.listen((window) => {
    ReactGA.pageview(window.location.pathname + window.location.search);
    console.log("PATH", window.location.pathname);
  });

  return (
    <>
      <Helmet
        defaultTitle="Palembang Digital"
        titleTemplate="%s · Palembang Digital"
      />

      <LocationProvider history={history}>
        <Router>
          <Home path="/" />
          <Team path="/patal-team" />

          <Admin path="/admin/*" />
        </Router>
      </LocationProvider>
    </>
  );
};

export default App;
