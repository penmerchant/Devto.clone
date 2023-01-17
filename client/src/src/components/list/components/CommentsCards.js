import { Link } from 'react-router-dom';
import { formatDate } from '../../../utils';
import classes from '../list.module.css';

const CommentsCards = (props) => {
    const {comment, user} = props;
    const {post} = comment;
    // user var is for deleting comments
    return <div className={classes.card}>
            <div className={classes.text_wrapper}>
            <Link className={classes.link} to={`/post-details/${post._id}`}>
                <h2>{comment.post.title}</h2>
             </Link>
                <div className={classes.row}>
                    <p className={classes.text_comment}>{comment.comment}</p>
                    <p className={classes.date}>{formatDate(comment.createdAt)}</p>
                </div>
            </div>
    </div>
};

export default CommentsCards;