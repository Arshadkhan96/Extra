import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import './footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className="footer-content">
        <div className="footer-column">
          <h3 className="footer-heading">AbeBooks</h3>
          <p className="footer-text">Premium books & art collectibles</p>
          
          <h3 className="footer-heading">Shopbop</h3>
          <p className="footer-text">Luxury fashion brands</p>
        </div>

        <div className="footer-column">
          <h3 className="footer-heading">Web Services</h3>
          <p className="footer-text">Elite cloud computing solutions</p>
          
          <h3 className="footer-heading">Business</h3>
          <p className="footer-text">Enterprise-grade solutions</p>
        </div>

        <div className="footer-column">
          <h3 className="footer-heading">Prime Now</h3>
          <p className="footer-text">Expedited 2-hour delivery</p>
          
          <h3 className="footer-heading">Prime Music</h3>
          <p className="footer-text">100 million ad-free tracks<br />15+ million podcast episodes</p>
        </div>

        <div className="footer-social">
          <div className="social-icons">
            <a href="#" aria-label="Facebook"><FaFacebook className='icon' /></a>
            <a href="#" aria-label="Instagram"><FaInstagram className='icon' /></a>
            <a href="#" aria-label="Twitter"><FaTwitter className='icon' /></a>
            <a href="#" aria-label="WhatsApp"><FaWhatsapp className='icon' /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedin className='icon' /></a>
          </div>
          <p className="copyright">© 2025 Luxury Brands. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;