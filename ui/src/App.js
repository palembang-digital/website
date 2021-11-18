import React from "react";
import loadable from "@loadable/component";
import { Location, LocationProvider, Router } from "@reach/router";
import ReactGA from "react-ga";
import { Helmet } from "react-helmet";

import PublicLayout from "./components/layouts/PublicLayout";

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
      >
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://palembangdigital.org/" />
        <meta property="og:title" content="Palembang Digital" />
        <meta
          property="og:description"
          content="Platform komunitas digital pertama dari dan untuk seluruh masyarakat Sumatera Selatan."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/patal/image/upload/v1635217848/patal/events/logo_patal_512_ddkjd7.png"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://palembangdigital.org/" />
        <meta property="twitter:title" content="Palembang Digital" />
        <meta
          property="twitter:description"
          content="Platform komunitas digital pertama dari dan untuk seluruh masyarakat Sumatera Selatan."
        />
        <meta
          property="twitter:image"
          content="https://res.cloudinary.com/patal/image/upload/v1635217848/patal/events/logo_patal_512_ddkjd7.png"
        />
      </Helmet>

      <LocationProvider>
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

        <Location children={(context) => trackPageView(context.location)} />
      </LocationProvider>
    </>
  );
};

export default App;
