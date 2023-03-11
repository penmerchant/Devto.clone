import classes from './PostCard.module.css';
import {Link, useNavigate} from 'react-router-dom';
import {BsChatLeftText} from 'react-icons/bs';
import {AiFillHeart} from "react-icons/ai";
import {AiOutlineHeart} from "react-icons/ai";
import {countCommentsLength, formatDate} from '../../utils';
import usePostReactions from '../../hooks/usePostReactions';
import { useContext } from 'react';
import AuthContext from '../../context/authContext';
const PostCard = (props) => {
    const navigate = useNavigate();
    
    const {post, index} = props;
    const {currentUser} = useContext(AuthContext);

    const {author,
        likes,
        comments,
        image,
        title,
        _id,
        createdAt,
        disable } = post;
    
    const {state} = usePostReactions({ likes: likes, userId: currentUser.data.id});  
    const {isLiked} = state;  
    const {firstName,
        lastName} = author;
    const fullName = firstName + ' ' + lastName;
    
    const onClick = () => {
        navigate(`/post-details/${_id}`, {replace: true});
    }   
    return (

        <div className={classes.card} 
            // onClick={onClick}
            >
            <Link to={`/post-details`} state={{postId: _id}} >

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
                {
                    isLiked? <AiFillHeart className={classes.icon_hearted}/> : <AiOutlineHeart className={classes.icon}/>
                }
                    {/* <img src={HeartIcon} className={classes.icon} alt='?' /> */}
                </div>
                <div></div>
                <div className={classes.clickable}>
                    <>{countCommentsLength(comments)}</>
                    <BsChatLeftText className={classes.icon}/>
                </div>
            </div>
                </Link>
        </div>
    );
};

export default PostCard;