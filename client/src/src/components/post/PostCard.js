import classes from './PostCard.module.css';
import { useNavigate } from 'react-router-dom';
const PostCard = (props) => {
    const navigate = useNavigate();

    const onClick = () => {
        navigate(`/post-details/${props.post.title}/${props.post._id}`);
    }

    return (
        <div className={classes.card} onClick={onClick}>
            <div className={classes.row}>
                <p>Picture</p>
                <p>username</p>
            </div>
            <h1 className={classes.card_title}>{props.post.title}</h1>
            <div className={classes.row}>
                <p>{props.post.likes.length} likes</p>
                <p>{props.post.comments.length}comments</p>
            </div>
        </div>
    );
};

export default PostCard;