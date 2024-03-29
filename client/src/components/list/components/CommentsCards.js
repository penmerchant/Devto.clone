import { formatDate } from '../../../utils';
import {BsThreeDotsVertical} from 'react-icons/bs';
import classes from '../list.module.css';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../../context/authContext';

const CommentsCards = (props) => {
    const {currentUser} = useContext(AuthContext);
    const {comment} = props;
    const [isToggled, setToggle] = useState(false);
    // for updating and deleting comment on certain post
    const type = 'comment';
    const toggleSettings = () => {
        if(isToggled){
            setToggle(false);
        }else{
            setToggle(true);
        }
    }
    // user var is for deleting comments
    return <div className={classes.card}>
            <div className={classes.text_wrapper}>
                { currentUser.data.id === comment.author &&
                <div className={classes.align_right}>
                        <div onClick={toggleSettings} className={classes.toggle_setting}>
                                <BsThreeDotsVertical />
                                <ul className={isToggled? classes.dropdown_show: classes.dropdown}>
                                    <div><Link to={`/edit-comment/${comment._id}`} state={{userId: currentUser.data.id}} >Edit</Link></div>
                                    <div><Link to={`/delete-page/${type}/${comment._id}`} state={{userId: currentUser.data.id}}>Delete</Link></div>
                                </ul>
                            </div>
                </div>
                }
                <div className={classes.row}>
                    <p className={classes.text_comment}>{comment.comment}</p>
                    <p className={classes.date}>{formatDate(comment.createdAt)}</p>
                </div>
            </div>
    </div>
};

export default CommentsCards;