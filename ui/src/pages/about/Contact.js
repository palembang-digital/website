import React from "react";
import { Col, Row, Typography } from "antd";

import Title from "../../components/title/Title";

import email from "../../assets/icons/email.svg";
import instagram from "../../assets/icons/instagram.svg";
import whatsapp from "../../assets/icons/whatsapp.svg";

const { Paragraph } = Typography;

const Contact = () => {
  const contacts = [
    {
      label: "0822-8251-2539",
      href: "https://api.whatsapp.com/send?phone=+6282282512539",
      icon: whatsapp,
      iconWidth: 22,
    },
    {
      label: "palembang_digital",
      href: "https://instagram.com/palembang_digital",
      icon: instagram,
      iconWidth: 18,
    },
    {
      label: "palembangdigital01@gmail.com",
      href: "mailto:palembangdigital01@gmail.com",
      icon: email,
      iconWidth: 18,
    },
  ];

  return (
    <Row
      align="middle"
      justify="space-around"
      style={{
        background: "#FFFFFF",
        borderRadius: 20,
        marginBottom: 160,
        marginTop: 80,
        padding: "80px 20px 80px 20px",
      }}>
      <Col>
        <Title title="Hubungi kami" titleLevel={3} />
        <Paragraph style={{ color: "#9D9D9D" }}>
          Silahkan hubungi kami untuk kerjasama dan pertanyaan lain
        </Paragraph>
        {contacts.map((contact, idx) => (
          <Paragraph key={idx}>
            <a
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(0, 0, 0, 0.85)" }}>
              <img
                src={contact.icon}
                alt={contact.icon}
                width={contact.iconWidth}
                style={{ marginRight: 10 }}
              />
              {contact.label}
            </a>
          </Paragraph>
        ))}
      </Col>
      <Col>
        <img
          alt="Palembang Digital"
          src="https://res.cloudinary.com/patal/image/upload/v1622083241/patal/events/Artboard_1_300x_1_gz2rjw.png"
          style={{ maxWidth: 280 }}
        />
      </Col>
    </Row>
  );
};

export default Contact;
