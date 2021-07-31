import React from "react";
import { useRequest } from "ahooks";
import { Alert, Carousel } from "antd";
import "./Banner.scss";

const Banner = () => {
  const { data: banners } = useRequest("/api/v1/banners");

  return (
    banners && banners.length > 0 ?
    <Carousel autoplay dots={false}>
      {banners.map(banner => (
        <div key={banner.id}>
          <Alert
            banner
            type="info"
            showIcon={false}
            message={
              <center>
                <div class="alert-banner-message-div" dangerouslySetInnerHTML={{ __html: banner.text }}/>
              </center>
            }
          />
        </div>
      ))}
    </Carousel>
    : <></>
  );
}

export default Banner;
