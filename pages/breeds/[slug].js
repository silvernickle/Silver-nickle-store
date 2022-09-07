//get all pet's with the same breed name
import React, { useState } from 'react';
import { urlFor, client } from '../../lib/client';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Pet } from '../../components';
import { useStateContext } from '../../context/StateContext'

const BreedDetails = ({ pet, breed }) => {
    //console.log(breed[0].title)

    return (
        <>
            
            <div className='info-heading'>
                <h2>Explore our varieties of {breed[0].title + 's'} </h2>
            </div>

            <div className='products-container'> {/* adding track makes the products move */}
                {pet.map((item) => (
                    <Pet key={item._id} pet={item} />
                ))}
            </div>
        </>
    )
}

//it is preferable to use getStaticProps when you need pre-built pages that don't change often
//params: { slug } reads the unique slug of each indvidual product and passes it to the function
export const getStaticProps = async ({ params: { slug } }) => {
    const query = `*[_type == "breed" && slug.current == '${slug}']`; //this query searches for pets that match the slug being passed as a param and get's the 1st value i.e [0]
    const breed = await client.fetch(query);

    const query2 = `*[_type=='pet' && references('${breed[0]?._id}')]`;
    const pet = await client.fetch(query2)

    return {
        props: { pet, breed }
    }
}

//getStaticPaths is used when a page uses dynamic routes and getStaticProps, it defines a list of paths to be pre-rendered/statically generated
//it doesn't work with getServerSideProps
export const getStaticPaths = async () => {
    const query = `*[_type == "breed"] {
        slug {
            current
        }
    }` //this query only returns the current slug

    const breeds = await client.fetch(query);
    const paths = breeds.map((breed) => ({
        params: {
            slug: breed.slug.current
        }
    })); //map through each breed and get the slug which will be used for the path

    return { paths, fallback: 'blocking' }
}

export default BreedDetails;