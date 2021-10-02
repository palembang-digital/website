import React from "react";
import loadable from "@loadable/component";
import { Location, LocationProvider, Router } from "@reach/router";
import ReactGA from "react-ga";
import { Helmet } from "react-helmet";

import PublicLayout from "./components/layouts/PublicLayout";
import { About, Events, Landing, Organizations, Startups, DetailEvent } from "./pages";

const Admin = loadable(() => import("./pages").then(c => c.Admin));

ReactGA.initialize("UA-169186060-1", {
  testMode: process.env.NODE_ENV === "test",
});

const PublicRoute = ({ render, ...props }) => {
  return render(props);
};

const trackPageView = (location) => {
  ReactGA.pageview(location.pathname + location.search);
};

const App = () => {
  return (
    <>
      <Helmet
        defaultTitle="Palembang Digital"
        titleTemplate="%s · Palembang Digital"
      />

      <LocationProvider>
        <Router>
          <PublicRoute path="/" render={PublicLayout(Landing)} />
          <PublicRoute path="/events" render={PublicLayout(Events)} />
          <PublicRoute path="/events/detail" render={PublicLayout(DetailEvent)} />
          <PublicRoute path="/startups" render={PublicLayout(Startups)} />
          <PublicRoute path="/organizations" render={PublicLayout(Organizations)} />
          <PublicRoute path="/about" render={PublicLayout(About)} />

          <Admin path="/admin/*" />
        </Router>

        <Location children={(context) => trackPageView(context.location)} />
      </LocationProvider>
    </>
  );
};

export default App;
