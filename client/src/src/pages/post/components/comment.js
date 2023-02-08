import classes from '../PostDetails.module.css';
import {useContext, useState} from 'react';
import Replies from './replies';
import useForm from '../../../hooks/useForm';
import useHttp from '../../../hooks/useHttp';
import { CommentForm } from '../../../utils/formConfig';
import { appendData } from '../../../utils';
import AuthContext from '../../../context/authContext';
import Button from '../../../components/Button/Button';
import usePostReactions from '../../../hooks/usePostReactions';
import LikeReactionButton from './PostReactions/LikeReactionButton';
import ButtonStyle from '../../../utils/ButtonStyle';

const Comment = (props) => {
    const [isReplying, setReplying] = useState(false);
    const {currentUser} = useContext(AuthContext);
    const {sendRequest} = useHttp();
    const {renderInputs, renderValues, isFormValid, setForm} = useForm(CommentForm);
    const formInputs = renderInputs();

    const {userId, comment} = props;
    const {likes , replies} = comment;
    const {btn_comment, btn_dismiss} = ButtonStyle();
    const {handleReactions, state} = usePostReactions({likes, userId});
    const style = {marginLeft: '2rem', width: '100%'};
    let postId = props.post;

    const submitComment = async(e) => {
        e.preventDefault();
        const formValue = renderValues();
        const formData = appendData(formValue);
        let commentId = props.comment.parentComment;
        
        if(commentId === null ) {
            commentId = props.comment._id;
        }

        formData.append('parentComment', commentId);
        formData.append('author', currentUser.data.id);
        formData.append('post', postId);

        if(currentUser.isLoggedin) {
            try{
                await sendRequest(`${process.env.REACT_APP_API_URL}/api/comments/`,
                    'POST',
                    formData
                );
                setForm(CommentForm);
                alert('submitted the comment')
            } catch(error) {
                alert('unable to submit comment')
            }
        }
        else alert('please login first');
    };

    const toggleReply = () => {
        setReplying(true);
    }

    const dissmissReply = () =>{
        setReplying(false);
    }
    return (
        <div>
            <div className={classes.row} style={props.style}>
                <img src={props.comment.author.profilePicture} className={classes.circle} alt='profilePicture'/>
                <div className={classes.comment_box}>
                    <b>{props.comment.author.firstName}</b>
                    <div className={classes.text_wrapper}>
                        <p>{props.comment.comment}</p>
                    </div>
                </div>
            </div>{
                !isReplying &&
                <div className={classes.align_right}>
                <div className={classes.row}>
                <LikeReactionButton isLiked={state.isLiked} 
                 handleReactions={handleReactions}
                 action='comments'
                 userId={currentUser.data.id}
                 actionId={props.comment._id}
                 /> 
                 { likes.length }
                 {  likes.length > 1 ? ' likes': ' like' }
                 </div> 
                <Button onClick={toggleReply} label='Reply' disabled={true} style={btn_comment}/>
                </div>
            }
            {isReplying && 
            <div className={classes.comment_form} style={style}>
            {formInputs}
            <div>
                <Button onClick={dissmissReply} label='Dismiss' disabled={true} style={btn_comment}/>
                <Button onClick={submitComment} label='Submit' disabled={isFormValid} style={btn_dismiss}/>
            </div>
            </div>
            }
            { replies && <Replies replies={replies} post={props.post}/> }
        </div>
    )
}

export default Comment;