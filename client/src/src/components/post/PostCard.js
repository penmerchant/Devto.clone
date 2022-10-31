import classes from './PostCard.module.css';
import { useNavigate } from 'react-router-dom';
const PostCard = (props) => {
    const navigate = useNavigate();

    const onClick = () => {
        navigate(`/post-details/${props.post.title}/${props.post._id}`);
    }
    const {author} = props.post;
    const fullName = author.firstName + ' ' + author.lastName; 

    return (
        <div className={classes.card} onClick={onClick}>
            {props.index === 0? <img src={props.post.imageUrl} className={classes.img} alt='url'/>: null}
            <div className={classes.row}>
                <img src={author.profilePicture} alt='user profile' className={classes.profile_picture}/>
                <p>{fullName}</p>
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