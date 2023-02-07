import classes from './PostCard.module.css';
import { useNavigate } from 'react-router-dom';
import  HeartIcon  from  '../../images/card/heart.svg';
import CommentIcon from '../../images/card/comment-pen.svg';
import { countCommentsLength, formatDate } from '../../utils';
const PostCard = (props) => {
    const navigate = useNavigate();
    
    const {post, index} = props;
    
    const {author,
        likes,
        comments,
        image,
        title,
        _id,
        createdAt,
        disable } = post;
    

    const {firstName,
        lastName} = author;
    const fullName = firstName + ' ' + lastName;
    
    const onClick = () => {
        navigate(`/post-details/${_id}`, {replace: true});
    }   
    return (
        <div className={classes.card} onClick={onClick}>
            {index === 0 && !disable ? <img src={image} className={classes.img} alt='url'/>: null}
            <div className={classes.row}>
                <img src={author.profilePicture} alt='user profile' className={classes.profile_picture}/>
                <p>{fullName}</p>
                <b>{formatDate(createdAt)}</b>
            </div>
            <h1 className={classes.card_title}>{title}</h1>
            <div className={classes.row}>
                <div className={classes.clickable}>
                {likes.length} 
                    <img src={HeartIcon} className={classes.icon} alt='?' />
                </div>
                <div></div>
                <div className={classes.clickable}>
                    <>{countCommentsLength(comments)}</>
                    <img src={CommentIcon} className={classes.icon} alt='?' />
                </div>
            </div>
        </div>
    );
};

export default PostCard;