import {Link, useNavigate, useParams } from "react-router-dom";
import classes from './PostDetails.module.css';
import MarkdownPreview from '@uiw/react-markdown-preview';
import {useContext, useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import PostDetailsSkeleton from "../../components/Skeleton/PostDetailsSkeleton";
import Comments from "./components/comments";
import AuthorsProfile from "./components/profile";
import PostReactions from "./components/PostReactions/PostReaction";
import { countCommentsLength, formatDate } from "../../utils";
import {BsThreeDotsVertical} from 'react-icons/bs';
import AuthContext from "../../context/authContext";
import TagLabel from "../../components/list/components/tagLabel";
// import ReactJsAlert from 'reactjs-alert';
const PostDetails = () => {
    // get id of a post
    const {sendRequest, setError} = useHttp();
    const {currentUser} = useContext(AuthContext);
    const [isLoading, setLoading] = useState(true);
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [isToggled, setToggle] = useState(false);
    const {postId} = useParams();
    const navigate = useNavigate();

    const { body,
        title,
        image,
        author,
        createdAt,
        tags } = post;
    // reset input 
    const type = 'post';
    useEffect(()=>{
        let isCancelled = false;
        const fetchPost = async() => {
            if(!isCancelled){
                try{
                    const response = await sendRequest(`${process.env.REACT_APP_API_URL}/api/posts/${postId}`);
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
                const response = await sendRequest(`${process.env.REACT_APP_API_URL}/api/comments/${postId}`);
                setComments(response);
            } catch(error) {
            }
            
        }

        fetchComments();
      
    },[sendRequest,post,postId]);

    const navigateToProfile = (userId) => {
        navigate(`/profile/${userId}`, {replace: true});
    }

    const toggleSettings = () => {
        if(isToggled){
            setToggle(false);
        }else{
            setToggle(true);
        }
    }

    const styles = { padding: '30px', background: '#fff'};
    if (isLoading) {
        return <div> <PostDetailsSkeleton /> </div>
    }
    // if(isError) {
    //     return <>Error</>
    // }
    return <div className={classes.container}>
        <div className={classes.sidebar_menu}>
            <PostReactions likes={post.likes} bookmarked={post.bookmarked} postId={postId}  />
        </div>
       
        <div className={classes.post_section} >
                    
                    {image && <img src={image} className={classes.post_img} alt='thumbnail of the post' />}
                    { currentUser.data.id === author._id &&
                        <div className={classes.align_right}>
                            <div onClick={toggleSettings} className={classes.toggle_setting}>
                                <BsThreeDotsVertical />
                                <ul className={isToggled? classes.dropdown_show: classes.dropdown}>
                                    <div><Link to={`/edit-post/${postId}`}>Edit</Link></div>
                                    <div><Link to={`/delete-page/${type}/${postId}`}>Delete</Link></div>
                                </ul>
                            </div>
                        </div> 
                    }
                    <div onClick={()=> navigateToProfile(author._id)} className={classes.row}>
                        <img className={classes.circle} 
                            alt='profile'
                            src={author.profilePicture}/>
                            <p>{author.firstName + author.lastName}</p>
                    </div>
                    <h1>{title}</h1>
                    <b>{formatDate(createdAt)}</b>
                    { tags && <TagLabel tags={tags}/> }
                    
            <MarkdownPreview source={body} key={post.id} style={styles} />
            <div className={classes.comment_form}>
                <h2>Comments ({countCommentsLength(comments)})</h2>
                <Comments comments={comments} post={postId}/>
            </div>
        </div>
        <div className={classes.profile}>
            <AuthorsProfile author={author}/>
        </div>
    </div>
};

export default PostDetails;