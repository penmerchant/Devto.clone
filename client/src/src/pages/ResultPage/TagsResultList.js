import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import DropDown from "../../components/FormElements/Dropdown/Dropdown";
import useHttp from "../../hooks/useHttp";
import classes from "./page.module.css";

const TagsResultPage = () => {
    const [post, setPost] = useState([]);
    const [chosenTag, setChosen] = useState('');
    const {sendRequest, isLoading , isError} = useHttp();
    let {tagId} = useParams();

    useEffect(()=>{
        const fetchPost = async () => {
            const response = await sendRequest(`${process.env.REACT_APP_API_URL}/api/posts/tag-search/${tagId}`);
            setPost(response);
        };
        fetchPost();
    },[sendRequest,tagId,setPost]);

    const onChange = useCallback((item)=>{
        setChosen(item);
    },[]);

    const searchByTag = async() => {
        const response = await sendRequest(`${process.env.REACT_APP_API_URL}/api/posts/tag-search/${tagId}`);
        setPost(response);
    }

    return <div className={classes.grid_display}>
        <div className={classes.row}>
            <DropDown type='tag' 
                items={post}
                onChange={onChange} />
            <Button label='Search' onClick={searchByTag}/>
        </div>
    </div>;
};

export default TagsResultPage;