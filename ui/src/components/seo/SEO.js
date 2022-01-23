import React, { useEffect } from "react";
import { Location } from "@reach/router";
import ReactGA from "react-ga";
import { Helmet } from "react-helmet";
import { websiteConfig } from "../../config";

const trackPageView = (path) => {
  console.log("trackPageView", path);
  ReactGA.pageview(path);
};

const SEO = ({ title, description, image, path }) => {
  const _title = title
    ? `${title} · ${websiteConfig.title}`
    : websiteConfig.title;
  const _description = description ? description : websiteConfig.description;
  const _image = image ? image : websiteConfig.logo;

  useEffect(() => {
    if (path) {
      trackPageView(path);
    }
  }, [path]);

  return (
    <Location>
      {({ location }) => (
        <Helmet
          titleTemplate={`%s · ${websiteConfig.title}`}
          defaultTitle={websiteConfig.title}
        >
          <title>{title}</title>

          <meta name="title" content={_title} />
          <meta name="description" content={_description} />

          <meta property="og:type" content="website" />
          <meta property="og:title" content={_title} />
          <meta property="og:description" content={_description} />
          <meta
            property="og:url"
            content={
              websiteConfig.siteUrl + location.pathname + location.search
            }
          />
          <meta property="og:image" content={_image} />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:title" content={_title} />
          <meta property="twitter:description" content={_description} />
          <meta
            property="twitter:url"
            content={
              websiteConfig.siteUrl + location.pathname + location.search
            }
          />
          <meta property="twitter:image" content={_image} />
        </Helmet>
      )}
    </Location>
  );
};

export default SEO;
