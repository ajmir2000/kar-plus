import React from 'react'
import "./Footer.css"

export default function Footer() {
  return (
    <div>Footer</div>
  )
}
import React from "react";
import "./Footer.css";
import { Button } from "react-bootstrap";
import { LiaFacebook } from "react-icons/lia";
import { SiGithub } from "react-icons/si";
import { FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

export default function Footer() {
  const items = [
    "Overview",
    "Feature",
    "Pricing",
    "Careers",
    "Help",
    "Privcy Policy",
  ];

  return (
    <div className="w-full mt-24 text-light--300 py-y px-2 mt-4 ">
      <div className="foter-items">
        <div>
          <h3 className="text-light">kar+</h3>
        </div>
        <div className="footer-items-1">
          {items.map((item, index) => (
            <div key={index}>
              <h6>{item}</h6>
            </div>
          ))}
        </div>
        <div className="social-media-icons">
          <a href="www.linkedin.com/">
            <FaLinkedinIn />
          </a>
          <a href="www.github.com/">
            <SiGithub />
          </a>
          <a href="www.x.com">
            <FaXTwitter />
          </a>
          <a href="www.facebook.com">
            <LiaFacebook />
          </a>
        </div>
      </div>
      <div className="subscription">
        <div className="mail-icon">
          <p>
            <span>
              <IoMdMail />
            </span>
            Subscribe Our Newslater
          </p>
        </div>
        <div className="input-button-container">
          <input
            className="text-light"
            type="email"
            placeholder="Enter your email.."
          />
          <Button className="text-success" variant="light">
            Subscribe
          </Button>{" "}
        </div>
      </div>
    </div>
  );
}
