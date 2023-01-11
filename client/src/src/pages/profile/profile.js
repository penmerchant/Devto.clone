import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useHttp from '../../hooks/useHttp';
// import classes from './profile_section.module.css';
// require('dotenv').config();
const API_URL = process.env.REACT_APP_API_URL;
const Profile = () => {
    const [userProfile , setProfile] = useState({});
    const {sendRequest} = useHttp();
    let {userId} = useParams();
    // get user profile
    useEffect(()=>{
        const fetchProfile = async() => {
            const response = await sendRequest(`${API_URL}/api/user/${userId}`);
            setProfile(response);
        }

        fetchProfile();
        
    },[setProfile, sendRequest, userId]);
    
    return <div></div>;
}

export default Profile;