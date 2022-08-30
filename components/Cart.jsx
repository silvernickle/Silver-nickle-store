import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const Cart = () => {
  const router = useRouter();

  const { data } = useSession();
  //console.log(data)

  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, togglecartItemsQuantity, onRemove, setCartRedirect } = useStateContext();

  const handleCheckout = async () => {

    if (!data?.user) {
      setShowCart(false);
      router.push('/auth/login');
    } else {

      const response = await axios.post('http://localhost:3000/api/cart/redirect', cartItems[0]);

      if (response.status === 500) return;

      //const data = await response.json(); //let data contain._id of the cart and then check against it on redirect
      //console.log(response.data)
      
      if (response.status === 200) {
        toast.loading('Redirecting...');
        setCartRedirect(true);
        router.push(`/checkout`);
      }
    }
  }

  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button
          type='button'
          className='cart-heading'
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href='/'>
              <button
                type='button'
                onClick={() => setShowCart(false)}
                className='btn'
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className='product-container'>
          {cartItems.length >= 1 && cartItems.map((item, index) => (
            <div className='product' key={item._id}>
              <img src={urlFor(item?.image[0])} className='cart-product-image' />
              <div  className='item-desc'>
                <div className='flex top'>
                  <h5>{item.name}</h5>
                  <h4>${item.price}</h4>
                </div>
                <div className='flex bottom'>
                  <div>
                    <p className='quantity-desc'>
                      <span className='minus' onClick={() => togglecartItemsQuantity(item._id, 'dec')}>
                        <AiOutlineMinus />
                      </span>
                      <span className='num'>
                        {item.quantity}
                      </span>
                      <span className='plus' onClick={() => togglecartItemsQuantity(item._id, 'inc')}>
                        <AiOutlinePlus />
                      </span>
                    </p>
                  </div>
                  <button
                    type='button'
                    className='remove-item'
                    onClick={() => onRemove(item)}
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length >= 1 && (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>Subtotal</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className='btn-container'>
              <button
                type='button'
                className='btn'
                onClick={handleCheckout} //replace with a function that let's you pay with ETH
              >
                Pay with Ethereum
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


export default Cart