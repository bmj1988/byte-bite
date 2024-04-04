import { useState } from 'react';
import { FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('')

    const searchRestaurants = async (e) => {
        e.preventDefault();
        const params = `search=${search}`
        navigate(`search?${params}`)
    }

    return (<div className='searchBar'>
        <FaSearch style={{ margin: '10px' }} onClick={(e) => searchRestaurants(e)} />
        <input type='search' placeholder='Food, groceries, drinks, etc' onChange={(e) => setSearch(e.target.value)} onsubmit={(e) => searchRestaurants(e)} />
    </div>)
}

export default SearchBar
