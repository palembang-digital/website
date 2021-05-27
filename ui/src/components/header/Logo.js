import React from "react";
import { Link } from "@reach/router";

import "./Logo.scss";

const Logo = () => (
  <Link to="/" id="logo">
    <img
      alt="Palembang Digital"
      src="https://res.cloudinary.com/dmtvswpik/image/upload/c_scale,h_50/v1598693277/patal-assets/logo_iapkkg.png"
    />
  </Link>
);

export default Logo;
