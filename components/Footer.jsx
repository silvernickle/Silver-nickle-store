import React from 'react';
import { AiFillMail, AiFillFacebook } from 'react-icons/ai';

const Footer = () => {
  return (
    <div className='footer-container'>
      <p>2022 Silver Nickle dog breeders All rights reserved</p>
      <p>silvernickledogbreeders@gmail.com</p>
      <p className='icons'>
        <a href="mailto:silvernickledogbreeders@gmail.com?subject=Request for the purchase of a puppy (Pet name)!">
          <AiFillMail />
        </a>

        <a href="https://www.facebook.com/profile.php?id=100015062959048">
          <AiFillFacebook />
        </a>
      </p>
    </div>
  )
}

export default Footer