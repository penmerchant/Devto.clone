import classes from '../profile_section.module.css';
import {FaBirthdayCake} from 'react-icons/fa';
import {FaInstagram} from 'react-icons/fa';
import {FaGithub} from 'react-icons/fa';
import { useContext, useEffect, useState } from 'react';
import { formatDate } from '../../../utils';
import {BsThreeDotsVertical} from 'react-icons/bs';
import AuthContext from '../../../context/authContext';
import { Link } from 'react-router-dom';

const BioSection = (props) => {
    const [date, setDate] = useState();
    const [isToggle, setToggle] = useState(false);
    const {currentUser} = useContext(AuthContext);
    useEffect(()=>{
        const newDate = formatDate(props.createdAt);
        setDate(newDate);
    },[setDate, props.createdAt]);

    const toggleDropdown = () => {
        if( isToggle) setToggle(false);
        else setToggle(true);
    }
    return <div className={classes.content_center}>
        <div className={classes.action_btn}>
            { currentUser.data.id === props.userId && <div onClick={toggleDropdown}> 
                <BsThreeDotsVertical /> 
                <div className={isToggle? classes.dropdown_show: classes.dropdown}>
                    <Link to={`/edit-profile/${props.userId}`}>Edit Profile</Link>
                </div>
                </div> 
            }
        </div>
        <div className={classes.img_wrapper}>
           { props.profilePicture && <img className={classes.circle} src={props.profilePicture} alt='User Profile'/>}
        </div>
        <div>
            {props.firstName && <h2 className={classes.text_center}>{props.firstName + ' ' + props.lastName}</h2> }
        </div>
        <div className={classes.text_center}>
            {props.bio? <p>{props.bio}</p> : <p>User hasn't updated bio yet</p>}
        </div>
        <div className={classes.link_wrapper}>

        <div className={classes.row}>
            <div className={classes.social_link_wrapper}>
                {props.instagram && <a href={props.instagram}> <FaInstagram className={classes.link}/> </a>}
                    
            </div>
            <div className={classes.social_link_wrapper}>
                <FaBirthdayCake/>
                <b> Joined on {date} </b>
            </div>
            <div className={classes.social_link_wrapper}>
                {
                    props.github &&
                    <a href={props.github} className={classes.link}>
                        <FaGithub />
                    </a>
                }
            </div>
            </div>
        </div>
    </div>
};
export default BioSection;