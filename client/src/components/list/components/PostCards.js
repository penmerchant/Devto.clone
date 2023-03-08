import classes from '../list.module.css';
import {formatDate, shortenString} from '../../../utils/index';
import { BsChatRight } from "react-icons/bs";
import {useNavigate} from 'react-router-dom';

const PostCards = (props) => {
    const navigate = useNavigate();

    const navigateToPost = () => {
        navigate(`/post-details/${props.post._id}`, {replace: true});
    };
    return <>
    <div className={classes.card} onClick={navigateToPost}>
        <div className={classes.row} >
            <img src={props.user.profilePicture} 
            alt='user profile'
            className={classes.circle}/>
            <p>{props.user.firstName + ' ' + props.user.lastName}</p>
            <p className={classes.date}>({formatDate(props.post.createdAt)})</p>
        </div>
        <div className={classes.align_item}>
            <div className={classes.link}>
            <h3>{shortenString(props.post.title)}</h3>
            </div>
        </div>
        <div className={classes.align_item}>
            <div className={classes.row}>
                <BsChatRight />
                <p> Add Comment</p>
            </div>
        </div>
       
    </div>
    </> 
};

export default PostCards;