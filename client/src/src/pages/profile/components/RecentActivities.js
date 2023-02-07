import { useEffect, useState } from 'react';
import CommentList from '../../../components/list/components/CommentList';
import PostLists from '../../../components/list/components/PostList';
import useHttp from '../../../hooks/useHttp';
import classes from '../profile_section.module.css';

const RecentActivities = ({userId}) => {
    const [recentPosts, setPost] = useState([]);
    const [recentComments, setComments] = useState([]);
    const {sendRequest,isLoading} = useHttp();
    const [errorPost, setErrorPost] = useState(false);
    const [errorComments, setErrorComments] = useState(false);

    useEffect(()=>{
        const fetchPost = async() => {
            try {
                const response = await sendRequest(`${process.env.REACT_APP_API_URL}/api/user/recentPosts/${userId}`);
                setPost(response);
            } catch (error) {
                setErrorPost(true);
            }
        };
        const fetchComments = async() => {
            try {
                const response = await sendRequest(`${process.env.REACT_APP_API_URL}/api/user/recentComments/${userId}`);
                setComments(response);
            } catch (error) {
                setErrorComments(true);
            }
        };
        
        fetchPost();
        fetchComments();
       

    },[setPost, setComments, userId, sendRequest]);
    if(isLoading) {
        return <div>Loading...</div>
    }
    return <div>
        <div>
            <b>Recent posts</b>
            {recentPosts && <PostLists user={recentPosts} posts={recentPosts.post}/>}
            {errorPost && <div>An error occurred</div>}
        </div>
        <br></br>
        <div className={classes.info_wrapper}>
            <b>Recent comments</b>
            {errorComments && <div>An error occurred</div>}
            {recentComments && <CommentList comments={recentComments.comments} user={recentComments}/>}
        </div>
    </div>;
};

export default RecentActivities;