// client/src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  // Check if a token exists in local storage to determine if the user is logged in
  const token = localStorage.getItem("token");

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-container">
          <div className="footer-column">
            <h3>GramSeva</h3>
            <p>
              Empowering rural communities by providing easy access to essential
              goods and services through technology.
            </p>
          </div>
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul>
              {/* These links now point to the homepage first, so they work from any page */}
              <li>
                <a href="/#services">Services</a>
              </li>
              <li>
                <a href="/#products">Products</a>
              </li>

              {/* This link is now dynamic */}
              {token ? (
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              ) : (
                <li>
                  <Link to="/login">Login</Link>
                </li>
              )}
            </ul>
          </div>
          <div className="footer-column">
            <h3>Contact Us</h3>
            <p>
              Village Center, Kurnool
              <br />
              Andhra Pradesh, India
            </p>
            <p>helpline@gramseva.com</p>
            <p>+91-1800-123-4567</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} GramSeva. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
