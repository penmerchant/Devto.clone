import { useRef, useState } from "react";
import classes from './CommentInput.module.css';

const CommentInput = (props) => {
    const [comment , setComment] = useState();
    const [valid , setValid] = useState(false);

    const valueRef = useRef();
    valueRef.current = {comment, valid};
    // this will update everytime user keys in an input
    // const onChange = (e) => {
    //     const value = e.target.value;
    //     setComment(value);
    //     if(valueRef.current.comment !== '') {
    //         setValid(true);
    //     }
    //     else {
    //         setValid(false);
    //     }
    //     // console.log(comment);    
    //     // the value of input will be put into useCallback 
    //     // console.log();
    //     props.onChange(props.label.toLowerCase(), comment, valid);
    // };
    
    return <div className='comment-wrapper'>
        <input placeholder='Write a comment' onChange={props.onChange} type={props.type} className={classes.input_comment}/>
    </div>
};
export default CommentInput;