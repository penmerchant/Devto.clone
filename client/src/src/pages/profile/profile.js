import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useHttp from '../../hooks/useHttp';
import ActivitySection from './components/ActivitySection';
import BioSection from './components/PersonalInfoSection';
import RecentActivities from './components/RecentActivities';
import classes from './profile_section.module.css';
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

    console.log(userProfile.follower);

    return <div className={classes.container}>{
            userProfile && <BioSection profilePicture={userProfile.profilePicture}
                bio={userProfile.bio} 
                github={userProfile.github}
                instagram={userProfile.instagram} 
                firstName={userProfile.firstName}
                lastName={userProfile.lastName}
                createdAt={userProfile.createdAt} />
        }
        <div className={classes.grid_display}>
            <div>
                <ActivitySection post={userProfile.post}
                    comments={userProfile.comments}
                    tags={userProfile.followedTags}/>
            </div>
            <div> <RecentActivities userId={userId} /></div>
        </div>
        </div>;
}

export default Profile;