import { Link, useParams } from "react-router-dom";
import classes from './PostDetails.module.css';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
// import CommentSection from "../../components/CommentSection/CommentSection";
// // import AuthContext from "../../context/authContext";
const PostDetails = () => {
    // get id of a post
    const {sendRequest, isError,setError} = useHttp();
    const [isLoading, setLoading] = useState(true);
    const [post, setPost] = useState({});
    const [fullName, setName] = useState({});
    const [authorDetails, setAuthor] = useState({});
    const [comments, setComments] = useState([]);
    const {postId,} = useParams();

    const { body,
        title,
        imageUrl,
        author} = post;
    // get currentUser id  for commenting the post
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
    },[sendRequest, setLoading, postId]);
    // const body = post.body;
    useEffect(()=>{
        let isCancelled = false;
        const fetchComments = async() => {
            if(!isCancelled){
                try{
                    const response = await sendRequest(`http://localhost:4444/api/comments/${postId}`);
                    setComments(response);
                } catch(error) {
                    console.log('failed');
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
                    console.log('failed');
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
    // save post 
    // like post
    // go to comment section
    // create a comment

    // sidebar

    const styles = { padding: '30px'};
    if (isLoading) {
        return <div>Loading...</div>
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
            {/* <CommentSection comments={comments} /> */}
        </div>
        <div className={classes.profile}>
                <Link to='/' className={classes.row}>
                    <img src={authorDetails.profilePicture} className={classes.circle} alt='profile'/>
                    <div className={classes.text_wrapper}>
                        {fullName}
                    </div>
                </Link>
                <div>
                {
                    authorDetails.bio !== null? authorDetails.bio: null
                }
                <div className={classes.btn_wrapper}>
                    <button className={classes.btn}>Follow</button>
                </div>
                </div>
        </div>
    </div>
};

export default PostDetails;