import classes from '../PostDetails.module.css';
import {useContext, useState} from 'react';
import Replies from './replies';
import useForm from '../../../hooks/useForm';
import useHttp from '../../../hooks/useHttp';
import { CommentForm } from '../../../utils/formConfig';
import { appendData } from '../../../utils';
import AuthContext from '../../../context/authContext';
import Button from '../../../components/Button/Button';
const Comment = (props) => {
    const [isReplying, setReplying] = useState(false);
    const {currentUser} = useContext(AuthContext);
    const {sendRequest} = useHttp();
    const {renderInputs, renderValues, isFormValid} = useForm(CommentForm);
    const formInputs = renderInputs();
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
        formData.append('post', props.post);

        if(currentUser.isLoggedin) {
            try{
                await sendRequest('http://localhost:4444/api/comments/',
                    'POST',
                    formData
                );
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
                <Button onClick={toggleReply} label='Reply' disabled={true}/>
                </div>
            }
            {isReplying && 
            <>
            {formInputs}
            <Button onClick={dissmissReply} label='Dismiss' disabled={true}/>
            <Button onClick={submitComment} label='Submit' disabled={isFormValid}/>
            </>
}
            { props.comment.replies && <Replies replies={props.comment.replies} post={props.post}/> }
        </div>
    )
}

export default Comment;