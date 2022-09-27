import { useState } from "react";
import classes from './SearchBar.module.css';
import { useNavigate } from "react-router-dom";
const SearchBar = () =>{
    const [searchValue, setSearchValue] = useState();
    const navigate = useNavigate();

    const onChange = (e) => {
        const {value} = e.target;
        setSearchValue(value);
    }

    const handleSubmit = () =>{
        navigate(`/searchResult/${searchValue}`);
    }
    return (
        <div className={classes.search_container}>
            <input type='text'
            placeholder='Search'
            onChange={onChange} />

            <span className={classes.search_btn} onClick={handleSubmit}>click</span>
        </div>
    );
};

export default SearchBar;