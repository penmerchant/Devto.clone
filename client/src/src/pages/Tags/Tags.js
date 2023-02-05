import { useContext, useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import AuthContext from "../../context/authContext";
import useFollow from "../../hooks/useFollow";
import useHttp from "../../hooks/useHttp";
import ButtonStyle from "../../utils/ButtonStyle";
import classes from './Tags.module.css';

const TagsView = () => {
    const [tags, setTags] = useState([]);
    // const [isHover, setHover] = useState(false);
    const {currentUser} = useContext(AuthContext);
    const {sendRequest,setError,isError,isLoading} = useHttp();
    const {state, handleAction} = useFollow({tags:tags, userId: currentUser.data.id});
    // const follow
    const {style} = ButtonStyle();
    const effect = state.isTagFollowed? 'Following' : 'Follow';
    const action = state.isTagFollowed? 'unfollow' : 'follow';
    useEffect(()=>{
        
        const fetchTags = async () => {
            try {
                const response = await sendRequest(`${process.env.REACT_APP_API_URL}/api/tags/`);
                setTags(response);
                setError(false);
            } catch (error) {
                setError(true);
            }
        };

        fetchTags();
    },[setTags, sendRequest,setError]);
    // const handleMouseLeave = (index) => {
    //     setHover(()=>{
    //         isHover = false;
    //     });
    // }
    // const handleMouseEnter = (index) => {
    //     setHover(true);
    // };

    const handleSubmit = (tagId) => {
        if (currentUser.isLoggedin) {
            handleAction('tags', effect, currentUser.data.id, tagId);
        }
    }

    if(isLoading) {
        return <div>Loading ...</div>
    }
    if(isError){
        return <div>An error occurred</div>
    }
    return <div className={classes.container}>
        <div className={classes.grid_tags}>
        { tags && tags.map((tag)=>{
            return <div className={classes.tags_card}>
                <div><b>{tag.name}</b></div>
                    <Button label={action}
                        style={style.btn_follow}
                        onClick={handleSubmit(tag._id)}/>
              
            </div>
        })}
        </div>
    </div>;
};

export default TagsView;