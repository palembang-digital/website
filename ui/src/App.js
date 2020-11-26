import React from "react";
import loadable from "@loadable/component";
import { Location, LocationProvider, Router } from "@reach/router";
import ReactGA from "react-ga";
import { Helmet } from "react-helmet";

import Home from "./Home";
import { PublicLayout } from "./PublicLayout";
import { Startup } from "./pages";

const Team = loadable(() => import("./Team"));
const Admin = loadable(() => import("./pages").then((c) => c.Admin));
const Organization = loadable(() =>
  import("./pages").then((c) => c.Organization)
);

ReactGA.initialize("UA-169186060-1", {
  testMode: process.env.NODE_ENV === "test",
});

const PublicRoute = ({ render, ...props }) => {
  return render(props);
};

const App = () => {
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
        <Router primary={false}>
          <Home path="/" />
          <Team path="/patal-team" />

          <Admin path="/admin/*" />

          <PublicRoute
            path="/organizations"
            render={PublicLayout(Organization)}
          />

          <PublicRoute path="/startups" render={PublicLayout(Startup)} />
        </Router>

        <Location children={(context) => trackPageView(context.location)} />
      </LocationProvider>
    </>
  );
};

export default App;
