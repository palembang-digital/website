import React from "react";
import { Link } from "@reach/router";

import "./Logo.scss";

const Logo = () => (
  <Link to="/" id="logo">
    <img
      alt="Palembang Digital"
      src="https://res.cloudinary.com/dmtvswpik/image/upload/c_scale,h_80/v1598693277/patal-assets/logo_iapkkg.png"
      height={40}
      width={40}
    />
  </Link>
);

export default Logo;
