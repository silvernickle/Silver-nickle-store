import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import { useState } from 'react';
import { useStateContext } from '../context/StateContext';

const Layout = ({ children }) => {
  const { active } = useStateContext();

  return (
    <div className='layout'>
      <Head>
        <title>Silver Nickle</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className={active ? 'main-container': 'main-container-space'}>
        {children}      
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout