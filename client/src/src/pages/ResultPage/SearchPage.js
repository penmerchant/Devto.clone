import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import classes from "./page.module.css";
import useHttp from "../../hooks/useHttp";
import HomeSkeleton from "../../components/Skeleton/HomeSkeleton";
import PostCard from "../../components/post/PostCard";

const SearchPage = () => {
    const [post, setPost] = useState([]);
    const {sendRequest, isLoading, isError} = useHttp();
    let {keyword} = useParams();
    useEffect(()=>{
        const fetchPost = async () => {
            const response = await sendRequest(`${process.env.REACT_APP_API_URL}/api/posts/search-post/${keyword}`);
            setPost(response);
        };
        fetchPost();

    },[setPost, sendRequest, keyword]);

    if(isLoading){
        return <HomeSkeleton />
    }
    if(isError) {
        return <div>An error occurred</div>
    }
    return <div className={classes.grid_display}>
        <div>
            {
                post && post.map((entry) => {
                    return <PostCard index={-1} post={entry}/>
                })
            }
        </div>
    </div>;
};

export default SearchPage;