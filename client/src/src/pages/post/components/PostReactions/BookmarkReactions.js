import {BsBookmark, BsBookmarkFill} from 'react-icons/bs';
import classes from '../../PostDetails.module.css';

const BookmarkReactions = (props) =>{
    const {isBookmarked,
        handleReactions,
        action,
        actionId,
    } = props;
    const effect = isBookmarked? 'unBookmark': 'bookmark';

    const handleAction = () => {
        handleReactions(effect, action, actionId, 'isBookmarked');
    };
    
    return (<div className={classes.icon_wrapper} onClick={handleAction}>
        {isBookmarked? <BsBookmarkFill className={classes.bookmark_icon} />: <BsBookmark />}
    </div>);
};
export default BookmarkReactions;