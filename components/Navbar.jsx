import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import Cart from './Cart';
import { useStateContext } from '../context/StateContext';
import { SearchBar, Login } from '../components/index';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link className='link' href='/'>Silver Nickle</Link>
      </p>

      <p className='logo'>
        <Link className='link' href='/breeds'>Breeds</Link>
      </p>

      <SearchBar />

      {/* <p className='logo'>
        <Link className='link' href='/auth/login'>
          Login
        </Link>
      </p> */}
      <Login />

      <button type='button' className='cart-icon' onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className='cart-item-qty'>{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar