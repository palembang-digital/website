import React, { Component } from "react";
import { useRequest } from "ahooks";
import { Skeleton, Pagination } from "antd";
import EventsCarousel from "./components/EventsCarousel";
import EventCards from "./components/landing/EventCards";
import Grid from "antd/lib/card/Grid";
import SEO from "../../components/seo/SEO";

const Events = () => {
  const { data: events } = useRequest("/api/v1/events");

  return (
    <>
      <SEO title="Events" description="Kegiatan-kegiatan Palembang Digital" />

      <div className="main">
        {events && events.length > 0 ? (
          <>
            <EventsCarousel events={events} />
            <div className="container text">
              <h1>Yang Telah Terlaksana</h1>
              <h3>Kamu ketinggalan mendaftar acara sebelumnya?</h3>
              <h3>
                Yuk, tonton lagi acara kami melalui Youtube channel{" "}
                <span>Palembang Digital!</span>
              </h3>
            </div>
            <EventCards events={events} />
          </>
        ) : (
          <div className="container">
            <Skeleton active />
          </div>
        )}
        {/* <div
        className="container"
        style={{
          marginTop: "3rem",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Pagination />
      </div> */}
      </div>
    </>
  );
};

export default Events;
