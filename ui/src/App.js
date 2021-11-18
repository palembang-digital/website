import React from "react";
import ReactGA from "react-ga";
import loadable from "@loadable/component";
import { Location, LocationProvider, Router } from "@reach/router";

import PublicLayout from "./components/layouts/PublicLayout";
import SEO from "./components/seo/SEO";

import {
  About,
  Events,
  EventDetails,
  Landing,
  Organizations,
  Startups,
  StartupDetails,
} from "./pages";

const Admin = loadable(() => import("./pages").then((c) => c.Admin));

const PublicRoute = ({ render, ...props }) => {
  return render(props);
};

ReactGA.initialize("UA-169186060-1", {
  testMode: process.env.NODE_ENV === "test",
});

const App = () => {
  return (
    <>
      {/* <Helmet
        titleTemplate={`%s · ${websiteConfig.title}`}
        defaultTitle={websiteConfig.title}
      /> */}

      <LocationProvider>
        <Location>
          {({ location }) => <SEO path={location.pathname + location.search} />}
        </Location>

        <Router>
          <PublicRoute path="/" render={PublicLayout(Landing)} />
          <PublicRoute path="/events" render={PublicLayout(Events)} />
          <PublicRoute path="/events/:id" render={PublicLayout(EventDetails)} />
          <PublicRoute path="/startups" render={PublicLayout(Startups)} />
          <PublicRoute
            path="/startups/:startupSlug"
            render={PublicLayout(StartupDetails)}
          />

          <PublicRoute
            path="/organizations"
            render={PublicLayout(Organizations)}
          />

          <PublicRoute path="/about" render={PublicLayout(About)} />

          <Admin path="/admin/*" />
        </Router>
      </LocationProvider>
    </>
  );
};

export default App;
