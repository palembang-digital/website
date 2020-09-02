import React from "react";
import loadable from "@loadable/component";
import { Location, LocationProvider, Router } from "@reach/router";
import ReactGA from "react-ga";
import { Helmet } from "react-helmet";

import Home from "./Home";

const Team = loadable(() => import("./Team"));
const Admin = loadable(() => import("./pages").then((c) => c.Admin));

const App = () => {
  ReactGA.initialize("UA-169186060-1");

  const trackPageView = (location) => {
    ReactGA.pageview(location.pathname + location.search);
  };

  return (
    <>
      <Helmet
        defaultTitle="Palembang Digital"
        titleTemplate="%s · Palembang Digital"
      />

      <LocationProvider>
        <Router>
          <Home path="/" />
          <Team path="/patal-team" />

          <Admin path="/admin/*" />
        </Router>

        <Location children={(context) => trackPageView(context.location)} />
      </LocationProvider>
    </>
  );
};

export default App;
