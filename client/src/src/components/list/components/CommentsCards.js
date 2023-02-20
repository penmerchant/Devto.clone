import { formatDate } from '../../../utils';
import classes from '../list.module.css';

const CommentsCards = (props) => {
    const {comment} = props;
    // for updating and deleting comment on certain post
    const {post} = comment;
    // user var is for deleting comments
    return <div className={classes.card}>
            <div className={classes.text_wrapper}>
                <div className={classes.row}>
                    <p className={classes.text_comment}>{comment.comment}</p>
                    <p className={classes.date}>{formatDate(comment.createdAt)}</p>
                </div>
            </div>
    </div>
};

export default CommentsCards;