import {useParams } from "react-router-dom";
import classes from './PostDetails.module.css';
import MarkdownPreview from '@uiw/react-markdown-preview';
import {useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import PostDetailsSkeleton from "../../components/Skeleton/PostDetailsSkeleton";
import Comments from "./components/comments";
import AuthorsProfile from "./components/profile";

const PostDetails = () => {
    // get id of a post
    const {sendRequest, setError} = useHttp();
    const [isLoading, setLoading] = useState(true);
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const {postId} = useParams();
    const { body,
        title,
        imageUrl,
        author,
        createdAt} = post;

    // reset input 
    useEffect(()=>{
        let isCancelled = false;
        const fetchPost = async() => {
            if(!isCancelled){
                try{
                    const response = await sendRequest(`http://localhost:4444/api/posts/${postId}`);
                    setPost(response);
                    setLoading(false);
                } catch(error) {
                    setError(true);
                }
            }
        }

        fetchPost();
        return () => {
            isCancelled = true;
        }
    },[sendRequest, setLoading, setError ,postId]);
    // const body = post.body;
    useEffect(()=>{
        const fetchComments = async() => {
           
            try{
                const response = await sendRequest(`http://localhost:4444/api/comments/${postId}`);
                setComments(response);
            } catch(error) {
            }
            
        }

        fetchComments();
      
    },[sendRequest,post,postId]);

    const styles = { padding: '30px', background: '#fff'};
    if (isLoading) {
        return <div> <PostDetailsSkeleton /> </div>
    }
    // if(isError) {
    //     return <>Error</>
    // }
    
    return <div className={classes.container}>
        <div className={classes.sidebar_menu}>Sidebar</div>
        <div className={classes.post_section} >
            {imageUrl && <img src={imageUrl} className={classes.post_img} alt='thumbnail of the post' />}
            <h1>{title}</h1>
            <b>{createdAt}</b>
            <MarkdownPreview source={body} key={post.id} style={styles} />
            <div className={classes.comment_form}>
                <h2>Comments ({comments.length})</h2>
                <Comments comments={comments} post={postId}/>
            </div>
        </div>
        <div className={classes.profile}>
            <AuthorsProfile author={author}/>
        </div>
    </div>
};

export default PostDetails;