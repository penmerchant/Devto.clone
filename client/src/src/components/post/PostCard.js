import classes from './PostCard.module.css';
const PostCard = (props) => {
    return (
        <div className={classes.card}>
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