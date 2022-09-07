import React, { useState } from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import Cart from './Cart';
import { useStateContext } from '../context/StateContext';
import { SearchBar, Login } from '../components/index';
import { TiThMenu } from 'react-icons/ti';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities, active, setActive } = useStateContext();
  //const [active, setActive] = useState(false)

  // return (
  //   <nav className='navbar-container'>
  //     <p className='logo'>
  //       <Link className='link' href='/'>Silver Nickle</Link>
  //     </p>

  //     <TiThMenu className='menu-icon' />

  //     <p className='logo'>
  //       <Link className='link' href='/breeds'>Breeds</Link>
  //     </p>

  //     <SearchBar />

  //     {/* <p className='logo'>
  //       <Link className='link' href='/auth/login'>
  //         Login
  //       </Link>
  //     </p> */}
  //     <Login />

  //     <button type='button' className='cart-icon' onClick={() => setShowCart(true)}>
  //       <AiOutlineShopping />
  //       <span className='cart-item-qty'>{totalQuantities}</span>
  //     </button>

  //     {showCart && <Cart />}
  //   </nav>
  // )

  return (
	<nav className="navigation">
		<Link href="/">
			<p className="brand-name">Silver Nickle</p>
		</Link>

		<button className='menu-icon' onClick={() => {setActive(!active)}}> 
			{/* onClick={() => {setIsNavExpanded(!isNavExpanded)}}> */}
				<TiThMenu />
		</button>
		
		<div className={active ? 'navigation-menu' : 'navigation-menu-close'}>
			<ul>
				<li>
					<Link href="/" className='a-tag'>
						<p>Home</p>
					</Link>
				</li>
				<li>
					<Link href="/breeds">
						<p>Breeds</p>
					</Link>
				</li>
				<li>
					<SearchBar />
				</li>
				<li>
					<Login />
				</li>
				{/* <li>
					<button type='button' className='cart-icon' onClick={() => setShowCart(true)}>
						<AiOutlineShopping />
						<span className='cart-item-qty'>{totalQuantities}</span>
					</button>

					{showCart && <Cart />}
				</li> */}
			</ul>
		</div>
		<button type='button' className='cart-icon' onClick={() => setShowCart(true)}>
			<AiOutlineShopping />
			<span className='cart-item-qty'>{totalQuantities}</span>
		</button>

		{showCart && <Cart />}
	</nav>
  );

}

export default Navbar