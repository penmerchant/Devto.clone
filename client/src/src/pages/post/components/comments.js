import Comment from "./comment"
import classes from '../PostDetails.module.css';

const Comments = (props) => {
    return (<>
    <div className={classes.comment_form}>
        <input type='text'/>
    </div>
        <input type='submit'/>
    {
        props.comments.map((comment)=>(
            <Comment key={props.id} comment={comment}/>
        ))
    }</>)
}

export default Comments;