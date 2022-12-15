import { Link, useParams } from "react-router-dom";
import classes from './PostDetails.module.css';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { useContext, useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import AuthContext from "../../context/authContext";
import PostDetailsSkeleton from "../../components/Skeleton/PostDetailsSkeleton";
import Comments from "./components/comments";

const PostDetails = () => {
    // get id of a post
    const { currentUser } = useContext(AuthContext);
    const {sendRequest, isError,setError} = useHttp();
    const [isLoading, setLoading] = useState(true);
    const [post, setPost] = useState({});
    const [fullName, setName] = useState({});
    const [authorDetails, setAuthor] = useState({});
    const [comments, setComments] = useState([]);
    const {postId} = useParams();
    const { body,
        title,
        imageUrl,
        author} = post;

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
        let isCancelled = false;
        const fetchComments = async() => {
            if(!isCancelled){
                try{
                    const response = await sendRequest(`http://localhost:4444/api/comments/${postId}`);
                    setComments(response);
                } catch(error) {
                }
            }
        }

        fetchComments();
        return () =>{
            isCancelled = true;
        };
    },[sendRequest,post,postId]);


    useEffect(()=>{
        const getAuthorDetails = async() => {
            if(!isError){
                try{
                    const response = await sendRequest(`http://localhost:4444/api/user/${author}`);
                    setAuthor(response);
                } catch(error) {
                }
            }
        }
        
        getAuthorDetails();
        return () =>{
            const {firstName, lastName} = authorDetails;
            const fullName = firstName + ' ' + lastName;
            setName(fullName);
        };
    },[sendRequest,isError,setName,authorDetails, author]);
  
   
    // go to comment section
    // create a comment
    
   

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
            {imageUrl? <img src={imageUrl} className={classes.post_img} alt='thumbnail of the post' />: null}
            <h1>{title}</h1>
            <MarkdownPreview source={body} key={post.id} style={styles} />
            <div className={classes.comment_form}>
                <h2>Comments ({comments.length})</h2>
                <Comments comments={comments}/>
            </div>
        </div>
        <div className={classes.profile}>
                
        </div>
    </div>
};

export default PostDetails;