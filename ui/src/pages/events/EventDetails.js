import React from "react";
import { useRequest } from "ahooks";
import { Skeleton } from "antd";
import EventDetailsDone from "./EventDetailsDone";
import EventDetailsUpcoming from "./EventDetailsUpcoming";
import SEO from "../../components/seo/SEO";

const EventDetails = ({ id }) => {
  const { data: event } = useRequest(`/api/v1/events/${id}`);

  return (
    <>
      {event && <SEO title={event.title} description={event.description} />}
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
