import { useContext, useEffect, useRef, useState} from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../../context/authContext';
import useHttp from '../../../hooks/useHttp';
import { checkFollow } from '../../../utils';
import classes from '../PostDetails.module.css';

const AuthorsProfile = (props) => { 
    const {currentUser} = useContext(AuthContext);
    const [isFollowed, setFollow] = useState(false);
    const state = useRef(null);
    const {sendRequest} = useHttp();
    
    useEffect(()=>{
        if(checkFollow(props.author.follower, currentUser.data.id)){
            setFollow(true);
        }else{
            setFollow(false);
        }
        state.current = isFollowed? 'unfollow': 'follow'
    },[props.author, currentUser,isFollowed]);
    
    const followUser = async() => {
        if(currentUser.isLoggedin){
            try {
                await sendRequest(`${process.env.REACT_APP_API_URL}/api/user/${state.current}/${currentUser.data.id}/${props.author._id}`,
                'PUT');
                setFollow(!isFollowed);
            } catch(error) {
            }
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
                    <b>{props.author.firstName}</b>
            
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
                    { isFollowed? 'Following' : 'Follow'}
                </button>
        </div>
    </div>;
}

export default AuthorsProfile;