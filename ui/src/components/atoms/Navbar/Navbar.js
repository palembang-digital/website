import React, { useState, useEffect } from "react";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from "reactstrap";
import { Link } from "react-scroll";
import { Link as RouterLink } from "@reach/router";

import s from "./Navbar.module.scss";
import logo from "../../../assets/logo.png";

const NavbarDefault = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, [currentPath]);

  return (
    <div id={s["topNav"]}>
      <Navbar color="light" className={s["topNav"]} light expand="md">
        <RouterLink to="/">
          <img alt="Palembang Digital" src={logo} width="50px" />
        </RouterLink>

        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem className={s["nav-item"]}>
              {!currentPath.startsWith("/patal-team") ? (
                <Link
                  to={`events`}
                  smooth={true}
                  duration={1000}
                  className={s["NavLink"]}
                >
                  Acara
                </Link>
              ) : (
                <RouterLink to="/#events" className={s["NavLink"]}>
                  Acara
                </RouterLink>
              )}
            </NavItem>
            <NavItem className={s["nav-item"]}>
              {!currentPath.startsWith("/patal-team") ? (
                <Link
                  to={`tentang`}
                  smooth={true}
                  duration={1000}
                  className={s["NavLink"]}
                >
                  Tentang
                </Link>
              ) : (
                <RouterLink to="/#tentang" className={s["NavLink"]}>
                  Tentang
                </RouterLink>
              )}
            </NavItem>
            <NavItem className={s["nav-item"]}>
              {!currentPath.startsWith("/patal-team") ? (
                <Link
                  to={`footer`}
                  smooth={true}
                  duration={1000}
                  className={s["NavLink"]}
                >
                  Kontak
                </Link>
              ) : (
                <RouterLink to="/#footer" className={s["NavLink"]}>
                  Kontak
                </RouterLink>
              )}
            </NavItem>
            <NavItem
              className={`${s["nav-item"]} ${
                currentPath.startsWith("/patal-team") ? s["active"] : ""
              }`}
            >
              <RouterLink to="/patal-team" className={s["NavLink"]}>
                Tim
              </RouterLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarDefault;
