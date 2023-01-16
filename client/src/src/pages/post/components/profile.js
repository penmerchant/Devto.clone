import { useContext} from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../../context/authContext';
import useHttp from '../../../hooks/useHttp';
import classes from '../PostDetails.module.css';

const AuthorsProfile = (props) => { 
    const {currentUser} = useContext(AuthContext);
    const {sendRequest} = useHttp();
    const followUser = async() => {
        if(currentUser.isLoggedin){
            try {
                await sendRequest(`${process.env.REACT_APP_API_URL}/api/user/${currentUser.data.id}/${props.author._id}`,
                'POST');
                alert('you have followed this user');
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
            <button className={currentUser.data.id === props.author._id? classes.btn_disabled : classes.btn} onClick={followUser} disabled={currentUser.data.id === props.author._id? true : false}>Follow</button>
        </div>
    </div>;
}

export default AuthorsProfile;