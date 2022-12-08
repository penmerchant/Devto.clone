import { useState } from "react";
import classes from './CommentInput.module.css';

const CommentInput = (props) => {
    const [comment , setComment] = useState();
    const [valid , setValid] = useState(false);

    // this will update everytime user keys in an input
    const onChange = (e) => {
        const value = e.target.value;
        if(value.length !== 0) {
            setComment(value);
            setValid(true);
            // console.log(comment);
        }
        // else {
        //     setValid(false);
        // }
        // console.log(comment);    
        // the value of input will be put into useCallback 
        // console.log();
        props.onChange(props.label.toLowerCase(), comment, valid);
    };
    
    return <div className='comment-wrapper'>
        <input placeholder='Write a comment' onChange={onChange} type={props.type} className={classes.input_comment}/>
    </div>
};
export default CommentInput;