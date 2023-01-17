import classes from '../list.module.css';
import {formatDate} from '../../../utils/index';
import { BsChatRight } from "react-icons/bs";
import {Link} from 'react-router-dom';

const PostCards = (props) => {
    console.log()
    return <>
    <Link to={`/post-details/${props.post._id}`} className={classes.link}>
    <div className={classes.card}>
        <div className={classes.row} >
            <img src={props.user.profilePicture} 
            alt='user profile'
            className={classes.circle}/>
            <p>{props.user.firstName + ' ' + props.user.lastName}</p>
            <p>({formatDate(props.post.createdAt)})</p>
        </div>
        <div className={classes.align_item}>
            <h2>{props.post.title}</h2>
        </div>
        <div className={classes.align_item}>
            <div className={classes.row}>
                <BsChatRight />
                <p> Add Comment</p>
            </div>
        </div>
       
    </div>
    </Link>
    </> 
};

export default PostCards;