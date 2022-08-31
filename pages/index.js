import React, { useState, useEffect } from 'react';
import { FooterBanner, HeroBanner, Pet, Web3Login } from '../components/index';
import { client } from '../lib/client';
import ReactPaginate from 'react-paginate';
import { useStateContext } from '../context/StateContext';

const Home = ({ pets, bannerData }) => {

  const { setCartRedirect } = useStateContext();
  setCartRedirect(false);

  return (
    <>
      {/* {console.log(bannerData)} */}
      <HeroBanner heroBanner={bannerData?.length && bannerData[0]} />

      <div className='products-heading'>
        <h2>Best Selling Puppies</h2>
        <p>Different Breeds of Dogs</p>
      </div>

      {/* <div className='products-container'>
        {
          pets?.map((pet) => <Pet key={pet._id} pet={pet} />)
        }
      </div> */}
      <PaginatedItems pets={pets} />

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  )
}

//the below function is used to implement the pagination for react-paginate
const PaginatedItems = ({ pets }) => {

  const itemsPerPage = 8;

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(pets?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(pets?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, pets]);

  // Invoke when user click to request another page.
  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % pets?.length;
    // console.log(
    //   `User requested page number ${e.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };

  return (
    <>
      {/* <Items currentItems={currentItems} /> */}
      <div className='products-container'>
        {
          currentItems?.map((item) => <Pet key={item._id} pet={item} />)
        }
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName='page-num'
        previousLinkClassName='page-num'
        nextLinkClassName='page-num'
        activeLinkClassName='active-num'
      />
    </>
  );

}

//in nextjs it's preferrable to use getServerSideProps whenever you want to fetch data that changes often from an api 
export const getServerSideProps = async () => {
  const query = '*[_type == "pet"]'; //this query grabs all the pets from the database //* means all _type specifies the type of field 
  const pets = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]'; 
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { pets, bannerData }
  } //whatever props are returned by getServerSideProps are accessable in all functions on this page

}

export default Home