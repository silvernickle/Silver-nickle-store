import React from 'react';
import { useStateContext } from '../../context/StateContext';
import { urlFor } from '../../lib/client';
import { useRouter } from 'next/dist/client/router';
import axios from 'axios';
import Link from 'next/link';
import { TbSearchOff } from 'react-icons/tb';

const search = ({ searchResult }) => {
    const { searchInput } = useStateContext();
    // const { asPath } = useRouter()
    // console.log(asPath.split('/')[2])
    //console.log(searchResult);

  return (
    <>
      <div className='info-heading'>
        <h2>Search Results</h2>
      </div>

      {searchResult.length ? (
        <div className='products-container'>
          {
          searchResult.map((result, i) => (
              <div key={i}>
                  <Link href={`/breeds/${result.slug.current}`}>
                      <div className='product-card'>
                          <img 
                              src={urlFor(result.image && result.image[0])}
                              width={250}
                              height={250}
                              className='product-image'
                          />
                          <p className='product-name'>{result.title}</p>
                          {/* <p className='product-price'>${price}</p> */}
                      </div>
                  </Link>
              </div>
          ))
          }
        </div>
      ) : (
        <div className='products-container'>
          <h3>No results found! Try something else.</h3>
          <div className='no-result'>
            <p>
            <TbSearchOff />
            </p>
          </div>
        </div>
      )
      }
    </>
  )
}

export default search

export const getServerSideProps = async ({ params: { searchInput } }) => {
  //const res = await axios.get(`http://localhost:3000/api/search/${searchInput}`);
  const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/search/${searchInput}`);

  return {
    props: {searchResult: res.data}
  }
}