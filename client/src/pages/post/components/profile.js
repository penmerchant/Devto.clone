import {useContext} from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../../context/authContext';
import useFollow from '../../../hooks/useFollow';
import classes from '../PostDetails.module.css';

const AuthorsProfile = (props) => { 
    const {currentUser} = useContext(AuthContext);
    const {state, handleAction} = useFollow({followers: props.author.follower, userId: currentUser.data.id});
    const effect = state.isFollowed? 'unfollow' : 'follow';
    const label = state.isFollowed? 'Following' : 'Follow';
    // useEffect(()=>{
    //     if(checkFollow(props.author.follower, currentUser.data.id)){
    //         setFollow(true);
    //     }else{
    //         setFollow(false);
    //     }
    //     state.current = isFollowed? 'unfollow': 'follow'
    // },[props.author, currentUser,isFollowed]);
    
    const followUser = async() => {
        if(currentUser.isLoggedin){
            handleAction('user', effect, currentUser.data.id, props.author._id, 'isFollowed')
        }else{
            alert('Please login first');
        }
    }
    
    return <div className={classes.card}>
        <div className={classes.top_color}></div>
        <div className={classes.row}>
            <img src={props.author.profilePicture} className={classes.circle} alt='profile'/>
            <div className={classes.wrapper}>
                { props.author.firstName && <Link to={`/profile/${props.author._id}`}>
                    <b>{props.author.firstName + ' ' +props.author.lastName}</b>
            
                </Link>
                }
            </div>
        </div>
        <div className={classes.text_wrapper}>
            {props.author.bio && <p>{props.author.bio}</p>}
        </div>
        <div>
            <button className={currentUser.data.id === props.author._id? classes.btn_disabled : classes.btn} 
                onClick={followUser} 
                disabled={currentUser.data.id === props.author._id? true : false}>
                    {label}
                </button>
        </div>
    </div>;
}

export default AuthorsProfile;