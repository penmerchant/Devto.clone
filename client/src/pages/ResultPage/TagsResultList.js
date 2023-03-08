import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import DropDown from "../../components/FormElements/Dropdown/Dropdown";
import HomeSkeleton from "../../components/Skeleton/HomeSkeleton";
import useHttp from "../../hooks/useHttp";
import classes from "./page.module.css";
import PostCard from "../../components/post/PostCard";
import ButtonStyle from "../../utils/ButtonStyle";

const TagsResultPage = () => {
    const [post, setPost] = useState([]);
    const [tags, setTags] = useState([]);
    const [chosenTag, setChosen] = useState('');
    const {sendRequest, isLoading , isError} = useHttp();
    let {tagId} = useParams();
    const {btn_post} = ButtonStyle();

    useEffect(()=>{
        const fetchTags = async () => {
            const response = await sendRequest(`${process.env.REACT_APP_API_URL}/api/tags/`);
            setTags(response);
        }

        fetchTags();
        
    },[setTags, sendRequest]);

    useEffect(()=>{
        const fetchPost = async () => {
            const response = await sendRequest(`${process.env.REACT_APP_API_URL}/api/posts/tag-search/${tagId}`);
            setPost(response);
        };
        fetchPost();
    },[sendRequest,tagId,setPost]);

    const onChange = useCallback((item)=>{
        setChosen(item);
    },[setChosen]);

    const searchByTag = async() => {
        const response = await sendRequest(`${process.env.REACT_APP_API_URL}/api/posts/tag-search/${chosenTag}`);
        setPost(response);
    }
    if(isLoading) {
        return <HomeSkeleton />
    }
    if(isError) {
        return <div> An errro occurred</div>
    }
    return <div className={classes.grid_display}>
        <div className={classes.row}>
            <DropDown type='tag' 
                items={tags}
                onChange={onChange} />
            <Button label='Search' onClick={searchByTag}
                style={btn_post} />
        </div>
        <div>
            {
                post && post.map((entry)=>{
                    return <PostCard post={entry} index={-1} disable={false}/>
                })
            }
        </div>
    </div>;
};

export default TagsResultPage;