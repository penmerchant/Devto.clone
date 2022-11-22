import { Fragment } from "react";
import PostCard from "./PostCard";
import classes from './PostCard.module.css';
const PostList = (props) => {
    const {post} = props;
    return (
        <div className={classes.container}>
        <Fragment>
        {   
            post.map((entry, index)=>(
                <PostCard post={entry} index={index}/>
                ))
        }
        </Fragment>
        </div>
    );
};

export default PostList;