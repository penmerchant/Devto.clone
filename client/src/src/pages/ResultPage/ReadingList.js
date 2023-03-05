import { useCallback, useContext, useEffect, useState } from 'react';
import DropDown from '../../components/FormElements/Dropdown/Dropdown';
import PostCards from '../../components/list/components/PostCards'
import HomeSkeleton from '../../components/Skeleton/HomeSkeleton';
import AuthContext from '../../context/authContext';
import useHttp from '../../hooks/useHttp';
import classes from './page.module.css';
import Button from '../../components/Button/Button';
const ReadingList = () => {
    const [post, setSavedPosts] = useState([]);
    const [tags, setTags] = useState([]);
    const [chosenItem, setChosen] = useState('');
    const {isLoggedin, currentUser} = useContext(AuthContext);
    const {sendRequest, isLoading, isError} = useHttp();

    useEffect(()=>{
        // if(!isLoggedin){

        // }
        const fetchSavedPosts = async () => {
            try {
                const response = await sendRequest(`${process.env.REACT_APP_API_URL}/api/user/saved-posts/${currentUser.data.id}`);
                setSavedPosts(response.savedPost);
                setTags(response.followedTags);
            } catch (error){

            }
        };

        fetchSavedPosts();
    },[setSavedPosts,currentUser,sendRequest]);

    const onChange = useCallback((item)=>{
        setChosen(item);
    },[setChosen]);

    const handleChosenItem = () => {
        console.log(chosenItem);
    };
    if(isLoading){
        return <HomeSkeleton />;
    }
    return <div className={classes.grid_display}>
        <div className={classes.row}>
            <DropDown type='tags' items={tags} onChange={onChange}/>
            <Button label='Choose' onClick={()=> handleChosenItem}/>
        </div>
        <div >
            {
                post && post.map((ps)=>{
                    return <PostCards post={ps} user={ps.author}/>
                })
            }
        </div>
    </div>
};

export default ReadingList;