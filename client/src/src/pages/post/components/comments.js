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
    const {renderInputs, renderValues} = useForm(CommentForm);
    const formInputs = renderInputs();
    const {btn_comment} = ButtonStyle();

    const submitComment = async(e) => {
        e.preventDefault();
        const formValue = renderValues();
        const formData = appendData(formValue);
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

    return (<>
    <div className={classes.comment_form}>
        {formInputs}
    </div>
        <Button onSubmit={submitComment} label='Submit' disabled={true} style={btn_comment}/>
    {
        props.comments.map((comment)=>(
            <Comment key={props.id} comment={comment} post={props.post}/>
        ))
    }</>)
}

export default Comments;