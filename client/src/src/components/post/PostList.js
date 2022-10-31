import { Fragment } from "react";
import PostCard from "./PostCard";
import classes from './PostCard.module.css';
const PostList = (props) => {
    return (
        <div className={classes.container}>
        <Fragment>
        {   
            props.post.map((entry, index)=>(
                <PostCard post={entry} key={entry.id} index={index}/>
                ))
        }
        </Fragment>
        </div>
    );
};

export default PostList;