import { FaSearch } from 'react-icons/fa'


const SearchBar = () => {
    return (<div className='searchBar' onClick={() => alert('Feature coming soon!')}>
        <FaSearch style={{margin: '10px'}}/>
        {'Food, groceries, drinks, etc'}
    </div>)
}

export default SearchBar
