import classes from '../profile_section.module.css';
import {FaBirthdayCake} from 'react-icons/fa';
import {FaInstagram} from 'react-icons/fa';
import {FaGithub} from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { formatDate } from '../../../utils';
import {BsThreeDotsVertical} from 'react-icons/bs';

const BioSection = (props) => {
    const [date, setDate] = useState();
    useEffect(()=>{
        const newDate = formatDate(props.createdAt);
        setDate(newDate);
    },[setDate, props.createdAt]);
    return <div className={classes.content_center}>
        <div className={classes.action_btn}>
            <BsThreeDotsVertical />
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
                {props.instagram && <FaInstagram className={classes.link}/>}
                    
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