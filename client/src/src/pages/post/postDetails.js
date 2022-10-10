import { useParams } from "react-router-dom";
import classes from './PostDetails.module.css';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
const PostDetails = () => {
    // get id of a post
    const {sendRequest} = useHttp();
    const [post, setPost] = useState({});
    const {postId} = useParams();
   
    useEffect(()=>{
        const fetchPost = async() => {

            try{
                const response = await sendRequest(`http://localhost:4444/api/posts/${postId}`);
                setPost(response);
            } catch(error) {
                console.log('failed');
            }
        }

        fetchPost();

    },[sendRequest,postId]);
    // const body = post.body;
    const {body} = post;
    return <div className={classes.container}>
        <div className={classes.sidebar_menu}>sidebar</div>
        <div className={classes.post_section}>
            <MarkdownPreview source={body} key={post.id} />
        </div>
        <div className={classes.profile}>author's profile</div>
    </div>
};

export default PostDetails;