import classes from '../../PostDetails.module.css';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
const LikeReactionButton = (props) => {
    const {isLiked, handleReactions} = props;
    const effect = isLiked? 'unlike' : 'like';
    const handleClick = () => {
        handleReactions(effect, props.action, props.actionId, 'isLiked');
    }
    return (<div className={classes.icon_wrapper} onClick={handleClick}>
        {isLiked? <AiFillHeart className={classes.heart_icon} />: <AiOutlineHeart className={classes.heart_reaction}/>}
    </div>);
}

export default LikeReactionButton;