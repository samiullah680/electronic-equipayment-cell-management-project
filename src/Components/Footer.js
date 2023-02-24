import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import './Footer.css';

const Footer = () => {
  return (
      <div className="finalFooter">
        <span>
          e-mail us{" "}
          <span style={{ textDecoration: "underline" }}>
            @consumerSupport@funcorpIndia.in
          </span>
        </span>
        <span>©FUN CORP 2022. All Rights Reserved</span>
      </div>
  )
}

export default Footer