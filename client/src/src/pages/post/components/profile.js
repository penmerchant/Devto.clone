import { useContext, useState } from 'react';
import AuthContext from '../../../context/authContext';
import useHttp from '../../../hooks/useHttp';
import classes from '../PostDetails.module.css';

const AuthorsProfile = (props) => {
    const {currentUser} = useContext(AuthContext);
    const [isLogin, setLogin] = useState(false);
    const {sendRequest} = useHttp();
    const followUser = async() => {
        if(currentUser.isLoggedin){
            setLogin(true);
            try {
                await sendRequest(`http://localhost:4444/api/user/${currentUser.data.id}/${props._id}`,
                'POST');
            
            } catch(error) {
                setLogin(false);
            }
        }
    }
    
    if(isLogin) {
        return <>error</>
    }

    return <div className={classes.card}>
        <div className={classes.top_color}></div>
        <div className={classes.row}>
            <img src={props.author.profilePicture} className={classes.circle} alt='profile'/>
            <div className={classes.wrapper}>
                { props.author.firstName && <b>{props.author.firstName}</b>}
            </div>
        </div>
        <div className={classes.text_wrapper}>
            {props.author.bio && <p>{props.author.bio}</p>}
        </div>
        <div>
            <button className={classes.btn} onClick={followUser}>Follow</button>
        </div>
    </div>;
}

export default AuthorsProfile;