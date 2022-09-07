import React from 'react';
import { AiFillInstagram, AiOutlineTwitter, AiFillMail } from 'react-icons/ai';

const Footer = () => {
  return (
    <div className='footer-container'>
      <p>2022 Silver Nickle dog breeders All rights reserved</p>
      <p>silvernickledogbreeders@gmail.com</p>
      <p className='icons'>
        <AiFillInstagram />
        <AiOutlineTwitter />
        <a href="mailto:silvernickledogbreeders@gmail.com?subject=Request for the purchase of a puppy (Pet name)!">
          <AiFillMail />
        </a>
      </p>
    </div>
  )
}

export default Footer