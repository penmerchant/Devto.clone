import { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import classes from './Tags.module.css';
import TagCard from "./TagsCard";

const TagsView = () => {
    const [tags, setTags] = useState([]);
    const {sendRequest,setError,isError, isLoading} = useHttp();
 
    useEffect(()=>{
        
        const fetchTags = async () => {
            try {
                const response = await sendRequest(`${process.env.REACT_APP_API_URL}/api/tags/`);
                setTags(response);
                setError(false);
            } catch (error) {
                setError(true);
            }
        };

        fetchTags();
    },[setTags, sendRequest,setError]);
 

    

    if(isLoading) {
        return <div>Loading ...</div>
    }
    if(isError){
        return <div>An error occurred</div>
    }
    return <div className={classes.container}>
        <div className={classes.grid_tags}>
        { tags && tags.map((tag)=>{
            return <TagCard tag={tag}/>
        })}
        </div>
    </div>;
};

export default TagsView;