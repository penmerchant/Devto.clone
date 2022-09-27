import { useEffect, useState } from "react";
import PostList from "../components/post/PostList";
import useHttp from "../hooks/useHttp";

const Post = () => {
    const {sendRequest, isError, isLoading} = useHttp();
    const [postData , setPostData] = useState([]);
    
    const BASE_URL = 'http://localhost:4444';

    useEffect(()=> {
        const fetchPost = async()=>{
            try {

                const responseData = await sendRequest(`${BASE_URL}/api/posts/`, 'GET');
                setPostData(responseData);
            } catch (err) {}
        };
        fetchPost();
    }, [sendRequest]);
    if(isLoading) {
        return <div>Loading...</div>
    }
    if(isError){
        return <div>There is no data</div>
    }
    if(postData || postData > 0){

        return (
                
             <PostList post={postData}/>
            ) ;
    }
        
    
    };
export default Post;