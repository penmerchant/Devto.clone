import { useEffect, useState } from "react";
import PostList from "../components/post/PostList";
import HomeSkeleton from "../components/Skeleton/HomeSkeleton";
import useHttp from "../hooks/useHttp";
const Post = () => {
    const {sendRequest, isError, isLoading} = useHttp();
    const [postData , setPostData] = useState([]);
    

    useEffect(()=> {
        const fetchPost = async()=>{
            try {

                const responseData = await sendRequest(`${process.env.REACT_APP_API_URL}/api/posts/`, 'GET');
                setPostData(responseData);
            } catch (err) {}
        };
        fetchPost();
    }, [sendRequest]);

    if(isLoading) {
        return <div>
            <HomeSkeleton />
        </div>
    }

    if(isError){
        return <div>There is no data</div>
    }
    if(postData || postData > 0){

        return <PostList post={postData} disable={false}/>
        
    }
        
    
    };
export default Post;