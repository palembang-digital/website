import React from "react";
import { Carousel } from "antd";
import CarouselContent from "./EventCarouselContent";

const EventsCarousel = ({ events }) => {
  return (
    <div className="container">
      <Carousel className="test" autoplay>
        {events
          .sort(
            (a, b) =>
              Date.now() -
              new Date(a.scheduled_start) -
              (Date.now() - new Date(b.scheduled_start))
          )
          .slice(0, 5)
          .map((event, index) => (
            <div key={index}>
              <CarouselContent event={event} />
            </div>
          ))}
      </Carousel>
    </div>
  );
};

export default EventsCarousel;
