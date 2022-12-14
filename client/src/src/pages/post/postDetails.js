import { Link, useParams } from "react-router-dom";
import classes from './PostDetails.module.css';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { useContext, useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import AuthContext from "../../context/authContext";
import PostDetailsSkeleton from "../../components/Skeleton/PostDetailsSkeleton";
import useForm from "../../hooks/useForm";
import { CommentForm } from "../../utils/formConfig";
import Button from "../../components/Button/Button";
import { appendData } from "../../utils";
import LikeButton from "../../components/Button/LikeButton";
import CommentButton from "../../components/Button/CommentButton";
import ButtonStyle from "../../utils/ButtonStyle";
import CommentSection from "../../components/CommentSection/CommentSection";

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
    const {renderInputs , renderValues, isFormValid, setForm} = useForm(CommentForm);
    const formInputs = renderInputs();
    const [isReplying, setReplying] = useState(false);
    const { body,
        title,
        imageUrl,
        author} = post;

    const {btn_comment, btn_dismiss} = ButtonStyle();
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
    // save post 
    // const savePost = () => {
    //     if(currentUser.isLoggedIn){
    //         try {

    //         } catch (error) {
    //             // setError()
    //         }
    //     }
    // }
    // like post
    // follow user
    const followUser = () =>{
        // console.log(isFormValid());
        // setForm(CommentForm);
        if(currentUser.isLoggedin) {
        }
        else alert('Please login');
    }
    // go to comment section
    // create a comment
    const submitComment = async(e) =>{
        e.preventDefault()
        const formValues = renderValues();
        const formData = appendData(formValues);
        // {comment, parentComment, author, post}
        formData.append('parentComment', null);
        formData.append('author', currentUser.data.id);
        formData.append('post', postId);
        //get author id
        if(currentUser.isLoggedin){
            try{
                await sendRequest('http://localhost:4444/api/comments',
                'POST',
                formData);
                setForm(CommentForm);
                alert('submitted comment');
            }catch(error){
                alert('failed to submit comment');
            }
        }
        else alert('Please login first');
    };
    const submitReply = async(reply) => {
        // e.preventDefault()
        let commentId = reply.parentComment;

        const formValues = renderValues();

        if (!commentId) {
            commentId = reply._id;
            console.log(reply.parentComment);
        }
        const formData = appendData(formValues);
        // {comment, parentComment, author, post}
        formData.append('parentComment', commentId);
        formData.append('author', currentUser.data.id);
        formData.append('post', reply.post);
        //get author id
        if(currentUser.isLoggedin){
            try{
                await sendRequest('http://localhost:4444/api/comments',
                'POST',
                formData);
                setForm(CommentForm);
            }catch(error){
                alert('failed to submit comment');
            }
            alert('submitted comment');
        }
        else alert('Please login first');
        
    };
    const toggleReply = () => {
        setReplying(true);
    };

    const dissmissReply = () => {
        setReplying(false);
    };

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
                { formInputs }
                <Button label='Comment' style={btn_comment} onClick={submitComment} valid={isFormValid()}/>
            </div>
            {
                comments.map((comment)=>(
                    <div>
                    <CommentSection comments={comment} />
                    <div className={classes.align_right}>
                    {
                     !isReplying && <div className={classes.row}>
                    <LikeButton onClick={followUser} mode={true}/>
                    <CommentButton onClick={toggleReply} action='Reply' mode={true}/>
                    </div>
                    
                    }
                    </div>
                    {
                        isReplying && <>
                            {formInputs}
                            <div className={classes.row}>
                                <div className={classes.align_right}>
                                    <Button label='Dismiss' style={btn_dismiss} onClick={dissmissReply} valid={true}/>
                                    <Button label='Submit' style={btn_comment} onClick={() => submitReply(comment)} valid={isFormValid()}/>
                                </div>
                            </div>
                        </>
                    }
                    {
                        comment.replies && comment.replies.map((reply)=>(
                            <div className={classes.reply_section}>
                                <CommentSection comments={reply}/>
                                <div className={classes.align_right}>
                    {
                     !isReplying && <div className={classes.row}>
                    <LikeButton onClick={followUser} mode={true}/>
                    <CommentButton onClick={toggleReply} action='Reply' mode={true}/>
                    </div>
                    
                    }
                    </div>
                            </div>
                        )) 
                    }
                    </div>
                ))
            }
        </div>
        <div className={classes.profile}>
                <div className={classes.top_border}></div>
                <Link to='/' className={classes.row}>
                    <img src={authorDetails.profilePicture} className={classes.circle} alt='profile'/>
                    <div className={classes.text_wrapper}>
                        {fullName}
                    </div>
                </Link>
                <div>
                { authorDetails.bio && authorDetails.bio }
                <div className={classes.btn_wrapper}>
                    {
                        authorDetails._id !== currentUser.data.id? <button className={classes.btn} onClick={followUser}>Follow</button> :
                       <button className={classes.btn_disabled} disabled>Follow</button>

                    }
                </div>
                </div>
                
        </div>
    </div>
};

export default PostDetails;