import React from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
const Footer = () => {
  return (
    <div className="footer w-100">
      <h4 className="text-center">All Right Reserved &copy; BigBazaar</h4>
      <p className="text-center mt-3">
        <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
        <Link to="/policy">Privacy Policy</Link>
      </p>
    </div>
  );
};

export default Footer;