import React from "react";
// import { Skeleton } from "antd";
import { useRequest } from "ahooks";
import EventRoute from "./EventRoute";

const EventsDetail = () => {
  const { data: events } = useRequest("api/v1/events");

  if (events == null) {
    return 'loading...'
  }

  return (
    <div className="container">
      <p>Events page</p>
      {/* <Skeleton active /> */}
      <ul>
        {events.map((event) => {
          return <EventRoute key={event.id} id={event.id} title={event.title} scheduled_end={event.scheduled_end}/>
        })}
      </ul>
    </div>
  );
};

export default EventsDetail
