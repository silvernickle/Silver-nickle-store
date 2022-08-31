import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Web3Modal from "web3modal";
import { useStateContext } from '../context/StateContext';
import axios from 'axios';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

const checkout = () => {

    const { data, status } = useSession();

    const router = useRouter();
    const { totalPrice, setCartRedirect, setShowCart } = useStateContext();
    setShowCart(false);

    //console.log(totalPrice)
    //console.log(account)
    const recipient = process.env.NEXT_PUBLIC_ETH_ADDRESS; //'0x70997970C51812dc3A010C7d01b50e0d17dc79C8';

    const [ fullName, setFullName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ shippingAddress, setShippingAddress ] = useState('');
    const [ city, setCity ] = useState('');
    const [ state, setState ] = useState('');
    const [ country, setCountry ] = useState('');
    const [ zipCode, setZipCode ] = useState('');



    const submitHandler = async (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append('name', fullName);
        form.append('email', email);
        form.append('shippingAddress', shippingAddress);
        form.append('city', city);
        form.append('state', state);
        form.append('country', country);
        form.append('zipCode', zipCode);

        // for (const value of form.values()) {
        //     console.log(value);
        // }
        //todo setup a database for checkout on sanity and update it after a successful transaction //finish authorization with cookies before continuing

        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();

            //if (!connection) alert('No ETH brower extension detected.');
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const accounts = await provider.listAccounts();
            const { chainId } = await provider.getNetwork();
            //console.log(typeof(chainId)); 

            if (accounts) {
                if (chainId !== 1) {        //1 reps ethereum mainnets chain id and 5 reps goereli
                    alert('Please ensure you set your network to Ethereum Mainnet and try again!')
                } else {
                    if (accounts) { 
                        const ethUSDPrice = await axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD');
                        //dollarPrice / ethUSDPrice.data['USD']
                        const ether = totalPrice / ethUSDPrice.data['USD'];
                        const eth = ether.toString()
                        //console.log(eth)
        
                        //const amount = ethers.utils.parseEther(eth)
                        const amount = ethers.utils.parseUnits(eth, 'ether')  //.from(eth.toString()).toHexString();
                        
                        const tx = await signer.sendTransaction({
                            to: recipient,
                            value: amount //used this amount to test //if value is <= to zero the transaction won't work 
                        });
                        console.log(tx.hash);
                        setCartRedirect(true)
                        router.push('/success');
                    }
                }
            }  else {
                alert('No Ethereum wallet detected.');
            }

        } catch (error) {
            //alert('No Ethereum wallet detected or insufficient funds! Please check your wallet and try again.');
            //console.error(error.message)
            if (error.message === undefined) {
                alert('No Ethereum wallet detected!');
            } else{
                alert('Insufficient funds!');
            }
        }
    }

    useEffect(() => {
        if (!data?.user) {
            router.push('/auth/login');
        }

        toast.dismiss()
    }, [])

    if (status === 'loading') return <p>Loading.....</p>

  return (
    <div className="checkout-wrapper">
        <div className="checkout-title">
            Checkout
        </div>

        <form method="POST">
            <div className="checkout-form">
                <div className="checkout-inputfield">
                    <label className='label-check'>Full Name:</label>
                    <input type="text" className="checkout-input" onChange={e => setFullName(e.target.value)} placeholder='John Doe' />
                </div>  
                <div className="checkout-inputfield">
                    <label className='label-check'>Email:</label>
                    <input type="email" className="checkout-input" onChange={e => setEmail(e.target.value)} placeholder='john@mail.com' />
                </div>  
                <div className="checkout-inputfield">
                    <label className='label-check'>Shipping Address:</label>
                    <input type="text" className="checkout-input" onChange={e => setShippingAddress(e.target.value)} />
                </div> 
                    <div className="checkout-inputfield">
                    <label className='label-check'>City:</label>
                    <input type="text" className="checkout-input" onChange={e => setCity(e.target.value)} />
                </div>
                <div className="checkout-inputfield">
                    <label className='label-check'>State:</label>
                    <input type="text" className="checkout-input" onChange={e => setState(e.target.value)} />
                </div>
                <div className="checkout-inputfield">
                    <label className='label-check'>Country:</label>
                    <input type="text" className="checkout-input" onChange={e => setCountry(e.target.value)} />
                </div>
                <div className="checkout-inputfield">
                    <label className='label-check'>Zip Code:</label>
                    <input type="text" className="checkout-input" onChange={e => setZipCode(e.target.value)} placeholder='123 456' />
                </div> 
                <div className="checkout-inputfield terms">
                    <label className="checkout-check">
                        <input type="checkbox" required />
                        <span className="checkout-checkmark"></span>
                    </label>
                    <p>Shipping fee $50</p>
                </div> 
                <div className="checkout-inputfield">
                    {/* <input type="button" value="Pay" className="checkout-btn" onSubmit={submitHandler} /> */}
                    <button type="button" className="checkout-btn" onClick={submitHandler}>Pay</button>
                </div>
            </div>
        </form>
    </div>
  )
}

export default checkout