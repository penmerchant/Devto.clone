import { useState } from "react";
import classes from './SearchBar.module.css';
import { useNavigate } from "react-router-dom";
import {FaSearch} from "react-icons/fa";

const SearchBar = () =>{
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    const onChange = (e) => {
        const {value} = e.target;
        setSearchValue(value);
    }

    const handleSubmit = () =>{
        console.log(searchValue);
        navigate(`/search-post/${searchValue}`, {replace: true});
    }
    return (
        <div className={classes.input}>
        <div className={classes.row}>
            <div>
                <input type='text'
                placeholder='Search'
                onChange={onChange} 
                className={classes.input_bar}/>
            </div>
            {/* <Button label='Search'/> */}
            <span onClick={handleSubmit}
                className={classes.icon_btn}>
                    <FaSearch />
            </span>
        </div>
        </div>
    );
};

export default SearchBar;