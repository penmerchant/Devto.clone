import { Fragment } from "react";
import PostCard from "./PostCard";
const PostList = (props) => {
    const {post} = props;
    return (
        <div>
        <Fragment>
        {   
            post.map((entry, index)=>(
                <PostCard key={index} post={entry} index={index} disable={props.disable}/>
                ))
        }
        </Fragment>
        </div>
    );
};

export default PostList;