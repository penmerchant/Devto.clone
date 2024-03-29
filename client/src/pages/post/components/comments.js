import Comment from "./comment"
import classes from '../PostDetails.module.css';
import useHttp from "../../../hooks/useHttp";
import useForm from "../../../hooks/useForm";
import { CommentForm } from "../../../utils/formConfig";
import { appendData } from "../../../utils";
import AuthContext from "../../../context/authContext";
import { useContext } from "react";
import Button from "../../../components/Button/Button";
import ButtonStyle from "../../../utils/ButtonStyle";

const Comments = (props) => {
    const {currentUser} = useContext(AuthContext);
    const {sendRequest} = useHttp();
    const {renderInputs, renderValues, isFormValid, setForm} = useForm(CommentForm);
    const formValue = renderValues();
    const formInputs = renderInputs();
    const {btn_comment} = ButtonStyle();
    let postId = props.post;

    const submitComment = async(e) => {
        e.preventDefault();
        const formData = appendData(formValue);
        formData.append('author', currentUser.data.id);
        formData.append('post', postId);
        if(currentUser.isLoggedin) {
            try{
                await sendRequest(`${process.env.REACT_APP_API_URL}/api/comments/`,
                    'POST',
                    formData
                );
                setForm(CommentForm);
                alert('submitted the comment');
            } catch(error) {
                alert('unable to submit comment')
            }
        }
        else alert('please login first');
    };

    return (<>
    <div className={classes.comment_form}>
        {formInputs}
    </div>
    <Button onClick={submitComment} label='Submit' valid={!isFormValid} style={btn_comment}/>
    {
        props.comments.map((comment,index)=>(
            <Comment key={index} comment={comment} post={postId} userId={currentUser.data.id}/>
        ))
    }</>)
}

export default Comments;