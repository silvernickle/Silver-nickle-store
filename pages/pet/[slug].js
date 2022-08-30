import React, { useState } from 'react';
import { urlFor, client } from '../../lib/client';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Pet } from '../../components';
import { useStateContext } from '../../context/StateContext'

const PetDetails = ({ pet, pets }) => {
    const { image, name, details, price } = pet;
    const [index, setIndex] = useState(0);
    const { decreaseQty, increaseQty, qty, onAdd, setShowCart } = useStateContext();

    const handleBuyNow = () => {
        onAdd(pet, qty);
        setShowCart(true);
    }

  return (
    <div>
        <div className='product-detail-container'>
            <div>
                <div className='image-container'>
                    <img 
                        src={urlFor(image && image[index])} 
                        className='product-detail-image' //makes all images the same size
                    />
                </div>
                <div className='small-images-container'>
                    {image.map((item, i) => (
                        <img 
                            key={i}
                            src={urlFor(item)}
                            className={i === index ?
                            'small-image selected-image' :
                            'small-image'} //this is a dynamic className that changes based on the conditions provided
                            onMouseEnter={() => setIndex(i)} //will let the small image selected from the carousel display on the bigger image
                        />
                    ))}
                </div>
            </div>

            <div className='product-detail-desc'>
                <h1>{name}</h1>
                <div className='reviews'>
                    <div>
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiOutlineStar />
                    </div>
                    <p>(20)</p>
                </div>
                <h4>Details: </h4>
                <p>{details}</p>
                <p className='price'>${price}</p>
                <div className='quantity'>
                    <h3>Quantity:</h3>
                    <p className='quantity-desc'>
                        <span className='minus' onClick={decreaseQty}>
                            <AiOutlineMinus />
                        </span>
                        <span className='num'>
                            {qty}
                        </span>
                        <span className='plus' onClick={increaseQty}>
                            <AiOutlinePlus />
                        </span>
                    </p>
                </div>

                <div className='buttons'>
                    <button 
                        type='button' 
                        className='add-to-cart' 
                        onClick={() => onAdd(pet, qty)}
                    >
                        Add to Cart
                    </button>
                    <button 
                        type='button' 
                        className='buy-now' 
                        onClick={handleBuyNow}
                    >
                        Buy Now
                    </button>
                </div>
            </div>
        </div>

        <div className='maylike-products-wrapper'>
            <h2>You may also like</h2>
            <div className='marquee'>
                <div className='maylike-products-container track'> {/* adding track makes the products move */}
                    {pets.map((item) => (
                        <Pet key={item._id} pet={item} />
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

//it is preferable to use getStaticProps when you need pre-built pages that don't change often
//params: { slug } reads the unique slug of each indvidual product and passes it to the function
export const getStaticProps = async ({ params: { slug } }) => {
    const query = `*[_type == "pet" && slug.current == '${slug}'][0]`; //this query searches for pets that match the slug being passed as a param and get's the 1st value i.e [0]
    //the below query fetches similar pets
    const petsQuery = `*[_type == "pet"]`

    const pet = await client.fetch(query);
    const pets = await client.fetch(petsQuery);    

    return {
        props: { pet, pets }
    }
}

//getStaticPaths is used when a page uses dynamic routes and getStaticProps, it defines a list of paths to be pre-rendered/statically generated
//it doesn't work with getServerSideProps
export const getStaticPaths = async () => {
    const query = `*[_type == "pet"] {
        slug {
            current
        }
    }` //this query only returns the current slug

    const pets = await client.fetch(query);
    const paths = pets.map((pet) => ({
        params: {
            slug: pet.slug.current
        }
    }));

    return { paths, fallback: 'blocking' }
}

export default PetDetails;