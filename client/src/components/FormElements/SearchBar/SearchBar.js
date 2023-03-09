import { useState } from "react";
import classes from "./SearchBar.module.css";
import { useNavigate } from "react-router-dom";
// import {FaSearch} from "react-icons/fa";
import Input from "../Input/Input";
import Button from "../../Button/Button";
import ButtonStyle from "../../../utils/ButtonStyle";

const SearchBar = () =>{
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();
    const {btn_register} = ButtonStyle();

    const onChange = (e) => {
        const {value} = e.target;
        setSearchValue(value);
    }
    // const onChange = useCallback((value)=>{
    //     setSearchValue(value);
    // },[]);

    const handleSubmit = () =>{
        console.log(searchValue);
        navigate(`/search-post/${searchValue}`, {replace: true});
    }
    return <div className={classes.grid_display}>
        <div>
            <Input placeholder='Search post'
            onChange={onChange}/>
        </div>
        <div>
            <Button label='Search'
                style={btn_register}
                onClick={handleSubmit}/>
        </div>
    </div>
};

export default SearchBar;