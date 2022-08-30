import React, { useEffect, useState } from 'react';
import { useStateContext } from '../context/StateContext';

const Web3Login = () => {

    const { user, connectWallet, setAccount, account } = useStateContext();

    // const providerOptions = {
    //     /* See Provider Options Section */
    //   };
      
    //   const web3Modal = new Web3Modal({
    //   //   network: "mainnet", // optional
    //   //   cacheProvider: true, // optional
    //   //   providerOptions // required
    //   });
      
    //   const provider = await web3Modal.connect();
      
    //   const web3 = new Web3(provider);

    console.log(user)

  return (
    <div>
        <button className='auth-btn-2' onClick={connectWallet}>Connect Wallet</button>
        <div>
          {account ? account : setAccount("No ETH brower extension detected.")}
        </div>
    </div>
  )
}

export default Web3Login