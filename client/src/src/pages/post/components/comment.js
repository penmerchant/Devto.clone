import classes from '../PostDetails.module.css';
import {useState} from 'react';
import Replies from './replies';

const Comment = (props) => {
    const [isReplying, setReplying] = useState(false);
    
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
                <button onClick={toggleReply}>reply</button>
                </div>
            }
            {isReplying && 
            <>
            <textarea></textarea>
            <button onClick={dissmissReply}>dismiss</button>
            </>
}
            { props.comment.replies && <Replies replies={props.comment.replies}/> }
        </div>
    )
}

export default Comment;