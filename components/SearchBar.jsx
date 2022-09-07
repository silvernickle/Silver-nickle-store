import Router from 'next/router';
import React from 'react';
import { BiSearch } from 'react-icons/bi'
import { useStateContext } from '../context/StateContext';
import { useRouter } from 'next/router';

const SearchBar = () => {
    const { searchInput, setSearchInput } = useStateContext();

    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();

        if (searchInput) {
            router.push(`/search/${searchInput}`);
        }
    }

  return (
    <div className='search-container'>
        <form onSubmit={handleSearch}>
            <input 
                type="text" 
                className='searchbar' 
                placeholder="Search.."
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
            />
                {/* <button type="button" onClick={handleSearch}>
                    <BiSearch />
                </button> */}
        </form>
    </div>
  )
}

export default SearchBar