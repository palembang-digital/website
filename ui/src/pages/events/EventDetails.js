import React from "react";
import { useRequest } from "ahooks";
import { Skeleton } from "antd";
import EventDetailsDone from "./EventDetailsDone";
import EventDetailsUpcoming from "./EventDetailsUpcoming";
import { Helmet } from "react-helmet";

const EventDetails = ({ id }) => {
  const { data: event } = useRequest(`/api/v1/events/${id}`);

  return (
    <>
      {event && (
        <Helmet>
          <title>{event.title}</title>

          <meta property="og:description" content={event.description} />
          <meta property="og:image" content={event.image_url} />

          <meta property="twitter:description" content={event.description} />
          <meta property="twitter:image" content={event.image_url} />
        </Helmet>
      )}
      <div className="container">
        {event ? (
          new Date(event.scheduled_start) > Date.now() ? (
            <EventDetailsUpcoming event={event} />
          ) : (
            <EventDetailsDone event={event} />
          )
        ) : (
          <Skeleton active />
        )}
      </div>
    </>
  );
};

export default EventDetails;
