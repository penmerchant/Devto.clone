import { useParams } from "react-router-dom";
import classes from './PostDetails.module.css';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
// import CommentSection from "../../components/CommentSection/CommentSection";
// // import AuthContext from "../../context/authContext";
const PostDetails = () => {
    // get id of a post
    const {sendRequest, isLoading, isError} = useHttp();
    const [post, setPost] = useState({});
    const [authorDetails, setAuthor] = useState({});
    const [comments, setComments] = useState([]);
    const {postId,} = useParams();

    const { body,
        title,
        imageUrl,
        author} = post;
    // get currentUser id  for commenting the post
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
    useEffect(()=>{
        const fetchComments = async() => {

            try{
                const response = await sendRequest(`http://localhost:4444/api/comments/${postId}`);
                setComments(response);
            } catch(error) {
                console.log('failed');
            }
        }

        fetchComments();

    },[sendRequest,post,postId]);


    useEffect(()=>{
        const getAuthorDetails = async() => {

            try{
                const response = await sendRequest(`http://localhost:4444/api/user/${author}`);
                setAuthor(response);
            } catch(error) {
                console.log('failed');
            }
        }

        getAuthorDetails();

    },[sendRequest,author]);
    // save post 
    // like post
    // go to comment section
    // create a comment

    // sidebar

    const styles = { padding: '30px'};

    if (isLoading) {
        return <div>Loading...</div>
    }
    if(isError) {
        return <>Error</>
    }
    return <div className={classes.container}>
        <div className={classes.sidebar_menu}>Sidebar</div>
        <div className={classes.post_section} >
            {imageUrl? <img src={imageUrl} className={classes.post_img} alt='thumbnail of the post' />: null}
            <h1>{title}</h1>
            <MarkdownPreview source={body} key={post.id} style={styles} />
            {/* <CommentSection comments={comments} /> */}
        </div>
        <div className={classes.profile}>
            <p>{authorDetails.email}</p>
        </div>
    </div>
};

export default PostDetails;