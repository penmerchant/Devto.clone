import { Fragment } from "react";
import PostCards from "./PostCards";

const PostLists = (props) => {
    const {posts, user} = props;
    return <div>
        <Fragment>
            { posts && posts.map((post)=>{
                return <PostCards user={user} post={post}/>
            })}
        </Fragment>
    </div>
};

export default PostLists;