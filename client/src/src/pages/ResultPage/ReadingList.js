import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import DropDown from '../../components/FormElements/Dropdown/Dropdown';
import PostCards from '../../components/list/components/PostCards'
import HomeSkeleton from '../../components/Skeleton/HomeSkeleton';
import AuthContext from '../../context/authContext';
import useHttp from '../../hooks/useHttp';
import classes from './page.module.css';
import Button from '../../components/Button/Button';
const ReadingList = () => {
    const [post, setSavedPosts] = useState([]);
    const [allPost , setAllPost] = useState([]);
    const [tags, settags] = useState([]);
    const [chosenItem, setChosen] = useState('');
    const {isLoggedin, currentUser} = useContext(AuthContext);
    const {sendRequest, isLoading, isError} = useHttp();

    useMemo(()=>{
        // if(!isLoggedin){

        // }
        const fetchSavedPosts = async () => {
            try {
                const response = await sendRequest(`${process.env.REACT_APP_API_URL}/api/user/saved-posts/${currentUser.data.id}`);
                setSavedPosts(response.savedPost);
                settags(response.followedTags);
                setAllPost(response.savedPost);
            } catch (error){

            }
        };

        fetchSavedPosts();
        // setAllPost(post);
    },[setSavedPosts,currentUser,sendRequest,settags,setAllPost]);

    const onChange = useCallback((item)=>{
        setChosen(item);
    },[setChosen]);

    // const handleChosenItem = useMemo(()=>{
    //     setSavedPosts();
    // },[setSavedPosts]);

    const fetchSortedPost = () =>{
        const sortedTagsPost = allPost.filter(found=> {
            return found.tags.find(elem => elem.name === chosenItem);
        }); 
        setSavedPosts(sortedTagsPost);
    };

    if(isLoading){
        return <HomeSkeleton />;
    }
    if(isError) {
        return <div>An error occurred </div>
    }
    return <div className={classes.grid_display}>
        <div className={classes.row}>
            <DropDown type='tags' items={tags} onChange={onChange}/>
            <Button label='Choose' onClick={fetchSortedPost}/>
        </div>
        <div >
            {
                post? post.map((ps)=>{
                    return <PostCards post={ps} user={ps.author}/>
                }) : 'Found no result'
            }
        </div>
    </div>
};

export default ReadingList;