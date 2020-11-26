import React, { useState, useEffect } from "react";
import loadable from "@loadable/component";
import { Link } from "@reach/router";

import s from "./Navbar.module.scss";

const Collapse = loadable(() => import("reactstrap/es/Collapse"));
const Navbar = loadable(() => import("reactstrap/es/Navbar"));
const NavbarToggler = loadable(() => import("reactstrap/es/NavbarToggler"));
const Nav = loadable(() => import("reactstrap/es/Nav"));
const NavItem = loadable(() => import("reactstrap/es/NavItem"));

const NavbarDefault = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentHref, setCurrentHref] = useState("");

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentHref(window.location.href);
    }
  }, [currentHref]);

  return (
    <div id={s["topNav"]}>
      <Navbar color="light" className={s["topNav"]} light expand="md">
        <Link to="/">
          <img
            alt="Palembang Digital"
            src={`https://res.cloudinary.com/dmtvswpik/image/upload/c_scale,h_50/v1598693277/patal-assets/logo_iapkkg.png`}
            width="50px"
          />
        </Link>

        <NavbarToggler onClick={toggle} />

        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem className={s["nav-item"]}>
              <a href="/#events" className={s["NavLink"]}>
                Acara
              </a>
            </NavItem>

            <NavItem className={s["nav-item"]}>
              <a href="/#tentang" className={s["NavLink"]}>
                Tentang
              </a>
            </NavItem>

            <NavItem className={s["nav-item"]}>
              <a href="/#footer" className={s["NavLink"]}>
                Kontak
              </a>
            </NavItem>

            <NavItem
              className={`${s["nav-item"]} ${
                currentHref.includes("/organizations") ? s["active"] : ""
              }`}
            >
              <Link to="/organizations" className={s["NavLink"]}>
                Organisasi
              </Link>
            </NavItem>

            <NavItem
              className={`${s["nav-item"]} ${
                currentHref.includes("/patal-team") ? s["active"] : ""
              }`}
            >
              <Link to="/patal-team" className={s["NavLink"]}>
                Tim
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarDefault;
