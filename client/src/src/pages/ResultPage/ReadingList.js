import { useCallback, useContext, useMemo, useState } from 'react';
import DropDown from '../../components/FormElements/Dropdown/Dropdown';
import PostCards from '../../components/list/components/PostCards'
import HomeSkeleton from '../../components/Skeleton/HomeSkeleton';
import AuthContext from '../../context/authContext';
import useHttp from '../../hooks/useHttp';
import classes from './page.module.css';
import Button from '../../components/Button/Button';
import ButtonStyle from '../../utils/ButtonStyle';
const ReadingList = () => {
    const [post, setSavedPosts] = useState([]);
    const [allPost , setAllPost] = useState([]);
    const [tags, settags] = useState([]);
    const [chosenItem, setChosen] = useState('');
    const [isHover, setHover] = useState(false);
    const { currentUser} = useContext(AuthContext);
    const {sendRequest, isLoading, setLoading,isError} = useHttp();
    const {btn_post} = ButtonStyle(isHover);


    useMemo(()=>{
        const fetchTags = async () => {
            const response = await sendRequest(`${process.env.REACT_APP_API_URL}/api/tags/`);
            settags(response);
        }

        fetchTags();
        
    },[settags, sendRequest]);

    useMemo(()=>{
        // if(!isLoggedin){

        // }
        const fetchSavedPosts = async () => {
            try {
                const response = await sendRequest(`${process.env.REACT_APP_API_URL}/api/user/saved-posts/${currentUser.data.id}`);
                setSavedPosts(response.savedPost);
                // settags(response.followedTags);
                setAllPost(response.savedPost);
            } catch (error){
            }
        };


        fetchSavedPosts();
        setTimeout(()=> setLoading(false), "1000");
        // setAllPost(post);
    },[setSavedPosts,currentUser,sendRequest, setAllPost,setLoading]);

    const onChange = useCallback((item)=>{
        setChosen(item);
    },[setChosen]);

    // const handleChosenItem = useMemo(()=>{
    //     setSavedPosts();
    // },[setSavedPosts]);
    const handleMouseLeave = () => {
        setHover(false);
    };

    const handleMouseEnter = () => {
        setHover(true);
    };

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
    // if(!currentUser) {
    //     return <div> Please login first</div>
    // }
    return <div className={classes.grid_display}>
        <div className={classes.row}>
            <DropDown type='tags' items={tags} onChange={onChange}/>
            <Button label='Choose' 
                onClick={fetchSortedPost}
                style={btn_post}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}/>
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