import { useContext, useState } from 'react';
import Button from '../../components/Button/Button';
import AuthContext from '../../context/authContext';
import useFollow from '../../hooks/useFollow';
import ButtonStyle from '../../utils/ButtonStyle';
import classes from './Tags.module.css';
const TagCard = (props) => {
    const [isHover, setHover] = useState(false);
    const {currentUser} = useContext(AuthContext);
    const {tag} = props;
    const {state, handleAction, isError} = useFollow({followers:tag.followers, userId: currentUser.data.id,});
    const {style} = ButtonStyle(isHover);
    const label = state.isTagFollowed? 'Following' : 'Follow';
    const action = state.isTagFollowed? 'unfollow' : 'follow';

    const handleMouseLeave = (index) => {
        setHover(false);
    }
    const handleMouseEnter = (index) => {
        setHover(true);
    };

    const handleSubmit = (tagId) => {
        if (currentUser.isLoggedin) {
            handleAction('tags', action, currentUser.data.id, tagId, 'isTagFollowed');
        }
    }
    if (isError) return <div>An error occurred</div>

    return <div className={classes.tags_card}>
    <div><b>{tag.name}</b></div>
        <Button label={label}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            style={style.btn_follow}
            onClick={()=> handleSubmit(tag._id)}/>
  
</div>
};

export default TagCard;