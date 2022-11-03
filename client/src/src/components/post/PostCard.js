import classes from './PostCard.module.css';
import { useNavigate } from 'react-router-dom';
const PostCard = (props) => {
    const navigate = useNavigate();
    
    const {post, index} = props;
    const {author,
        likes,
        comments,
        imageUrl,
        title,
        _id } = post;

    const {firstName,
        lastName} = author;
    const fullName = firstName + ' ' + lastName;

    const onClick = () => {
        navigate(`/post-details/${title}/${_id}`);
    }

    return (
        <div className={classes.card} onClick={onClick}>
            {index === 0? <img src={imageUrl} className={classes.img} alt='url'/>: null}
            <div className={classes.row}>
                <img src={author.profilePicture} alt='user profile' className={classes.profile_picture}/>
                <p>{fullName}</p>
            </div>
            <h1 className={classes.card_title}>{title}</h1>
            <div className={classes.row}>
                <p>{likes.length} likes</p>
                <p>{comments.length} comments</p>
            </div>
        </div>
    );
};

export default PostCard;