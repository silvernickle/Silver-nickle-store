import React, { useState } from 'react';
import { client, urlFor } from '../../lib/client';
import Link from 'next/link';
import Image from 'next/image';
import { HeroBanner } from '../../components/index';


const breeds = ({ dogBreeds, bannerData }) => {
    //console.log(dogBreeds)

    return (
    <>
    

        <div className='footer-banner-container'>
            <div className='banner-desc'>
                <div className='left'>
                    {/* <p>{discount}</p> */}
                    <h3>Explore</h3>
                    <h3>by Breed</h3>
                    {/* <p>{saleTime}</p> */}
                </div>
                <div className='right'>
                    {/* <p>{smallText}</p> */}
                    <h3>Shiba Inu</h3>
                    <p>The Shiba Inu is a breed of hunting dog from Japan.</p>
                    {/* <Link href={`/product/${petName}`}>
                        <button type='button'>{buttonText}</button>
                    </Link> */}
                </div>

                <img src={urlFor(bannerData[0].image)} alt="breed-sample"  className='footer-banner-image' />
            </div>
        </div>
        
        <div className='products-container'>
            {
            dogBreeds.map((dogBreed, i) => (
                <div key={i}>
                    <Link href={`/breeds/${dogBreed.slug.current}`}>
                        <div className='product-card'>
                            <img 
                                src={urlFor(dogBreed.image && dogBreed.image[0])}
                                width={250}
                                height={250}
                                className='product-image'
                            />
                            <p className='product-name'>{dogBreed.title}</p>
                            {/* <p className='product-price'>${price}</p> */}
                        </div>
                    </Link>
                </div>
            ))
            }
        </div>
    </>
    )
}


export const getServerSideProps = async () => {
    const query = '*[_type == "breed"]'; //this query grabs all the breed from the database //* means all _type specifies the type of field
    const dogBreeds = await client.fetch(query);

    const bannerQuery = '*[_type == "banner"]'; 
    const bannerData = await client.fetch(bannerQuery);
  
    return {
      props: { dogBreeds, bannerData }
    } //whatever props are returned by getServerSideProps are accessable in all functions on this page
  
}

export default breeds;
