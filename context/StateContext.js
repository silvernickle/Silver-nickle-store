import { useState, createContext, useContext } from 'react';
import { toast } from 'react-hot-toast';
import { ethers, Signer } from 'ethers';
import Web3Modal from "web3modal";
import { client, urlFor } from '../lib/client';

export const Context = createContext();

export const StateContext = ({ children }) => {

    const [user, setUser] = useState();
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);
    const [ searchInput, setSearchInput ] = useState();
    const [cartRedirect, setCartRedirect] = useState(false);

    let foundPet;
    let index;

    const [connection, setConnection] = useState();
    const [provider, setProvider] = useState();
    const [account, setAccount] = useState();
    const [network, setNetwork] = useState();
    const [signer, setSigner] = useState();

    const connectWallet = async () => {
        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();

            //if (!connection) return alert('No ETH brower extension detected.');
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const accounts = await provider.listAccounts();
            const network = await provider.getNetwork();
            
            if (accounts) { 
                setAccount(accounts[0]);

                const userInfo = {
                    _id: accounts[0],
                    _type: 'blockUser',
                    id: accounts[0], //reps the id used as a field name for sanity
                    userName: 'Incognito',
                    image: '/assets/incognito.jpg'
                }
                setUser(userInfo)
            } else {
                setUser();
            }
            // console.log(account)
            // console.log(network)
        } catch (error) {
            alert('No Ethereum wallet detected.');
            console.error(error.message)
        }
    }

    const increaseQty = () => {
        setQty((prevQty) => prevQty + 1);
    }

    const decreaseQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;
            
            return prevQty - 1;
        });
    }

    const onAdd = (pet, quantity) => {
        setTotalPrice((prevTotalPrice) => prevTotalPrice + pet.price * quantity); //updates the totalPrice 
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

        const checkPetInCart = cartItems.find((item) => item._id === pet._id) //uses the cartItems state to check if an item is already in the cart
        if (checkPetInCart) {
            const updatedCartItems = cartItems.map((cartItem) => {
                if (cartItem._id === pet._id) return {
                    ...cartItem,
                    quantity: cartItem.quantity + quantity
                } 
            }); //The above will add cart items of the same type to the quantity of a pet instead of having multiple cart items of the same type
            setCartItems(updatedCartItems);
        } else {
            pet.quantity = quantity;
            setCartItems([...cartItems, {...pet}])
        }
        
        toast.success(`${qty} ${pet.name} added to the cart.`);
    }

    const onRemove = (pet) => {
        foundPet = cartItems.find((item) => item._id === pet._id);
        const newCartItems = cartItems.filter((item) => item._id !== pet._id);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundPet.price * foundPet.quantity)
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundPet.quantity);
        setCartItems(newCartItems);
    }

    const togglecartItemsQuantity = (id, value) => {
        foundPet = cartItems.find((item) => item._id === id);
        index = cartItems.findIndex((item) => item._id === id);
        const newCartItems = cartItems.filter((item) => item._id !== id) //removes the item we are currently updating through it's index so an updated version can be added below

        if (value === 'inc') {
            setCartItems([...newCartItems, { ...foundPet, quantity: foundPet.quantity + 1 }]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundPet.price)
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1)
        } else if (value === 'dec') {
            if (foundPet.quantity > 1) {
                setCartItems([...newCartItems, { ...foundPet, quantity: foundPet.quantity - 1 }]);
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundPet.price)
                setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1)
            }
        }
    }


    return (
        <Context.Provider 
            value={{
                user,
                setUser,
                showCart,
                setShowCart,
                cartItems,
                setCartItems,
                totalQuantities,
                setTotalQuantities,
                totalPrice,
                setTotalPrice,
                qty,
                increaseQty,
                decreaseQty,
                onAdd,
                togglecartItemsQuantity,
                onRemove,
                searchInput,
                setSearchInput,
                connectWallet,
                setAccount,
                account,
                signer,
                cartRedirect,
                setCartRedirect
            }}
        >
            {children}
        </Context.Provider>
    )

}

export const useStateContext = () => useContext(Context);

