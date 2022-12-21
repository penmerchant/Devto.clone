import classes from '../../PostDetails.module.css';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
const LikeReactionButton = (props) => {
    const {isLiked, handleReactions} = props;
    const handleClick = () => {
        handleReactions('likes', props.postId, 'isLiked')
    }
    return (<div className={classes.icon_wrapper} onClick={handleClick}>
        {isLiked? <AiFillHeart />: <AiOutlineHeart className={classes.heart_icon}/>}
    </div>);
}

export default LikeReactionButton;