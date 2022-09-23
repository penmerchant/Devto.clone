import { Fragment } from "react";
import PostCard from "./PostCard";
import classes from './PostCard.module.css';
const PostList = (props) => {
    console.log(props.post);
    return (
        <div className={classes.container}>
        <Fragment>
        {   
            props.post.map((entry)=>(
                <PostCard post={entry}/>
                ))
            }
        </Fragment>
        </div>
    );
};

export default PostList;