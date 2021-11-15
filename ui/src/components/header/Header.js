import React, { useContext, useMemo } from "react";
import { Link } from "@reach/router";
import { MenuOutlined } from "@ant-design/icons";
import { Col, Menu, Popover, Row } from "antd";

import Logo from "./Logo";
import SiteContext from "../../providers/site/SiteContext";

import "./Header.scss";
import Banner from "./Banner";
import ProfileButton from "./ProfileButton";

const Header = () => {
  const { isMobile } = useContext(SiteContext);
  const menuMode = isMobile ? "inline" : "horizontal";

  const menuItems = useMemo(() => [
    {
      title: "Belajar",
      href: "https://belajar.palembangdigital.org",
      externalLink: true,
    },
    {
      title: "Startup",
      href: "/startups",
    },
    {
      title: "Organisasi",
      href: "/organizations",
    },
    {
      title: "Tentang",
      href: "/about",
    },
    {
      title: "Dukung Kami",
      href: "https://saweria.co/palembangdigital",
      externalLink: true,
    },
  ], []);

  const selectedKeys = useMemo(() => {
    if (typeof window !== "undefined") {
      const pathname = window.location.pathname;
      const menuIndex = menuItems.findIndex((item) => item.href === pathname);
      return [menuIndex.toString()];
    }
  }, [menuItems]);

  const navigation = (
    <Menu mode={menuMode} disabledOverflow={true} className="header-menu" selectedKeys={selectedKeys}>
      {menuItems.map((item, idx) => (
        <Menu.Item key={idx}>
          {item.externalLink ? (
            <a href={item.href} target="_blank" rel="noopener noreferrer">
              {item.title}
            </a>
          ) : (
            <Link to={item.href}>{item.title}</Link>
          )}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <>
      <Banner />

      <header id="header" className="container">
        <Row
          align="middle"
          justify="space-between"
          style={{ flexFlow: "nowrap", height: 96 }}>
          <Col>
            <Logo />
          </Col>

          <Col>
            <Row align="middle" justify="space-between" wrap={false}>

          <Col>
            {isMobile ? (
              <Popover
                overlayClassName="popover-menu"
                placement="bottomRight"
                trigger="click"
                content={navigation}
                arrowPointAtCenter>
                <MenuOutlined style={{ fontSize: "20px" }} />
              </Popover>
            ) : (
              navigation
            )}
          </Col>

              <Col>
                <ProfileButton/>
              </Col>
            </Row>
          </Col>
        </Row>
      </header>
    </>
  );
};

export default Header;
