import { Fragment } from "react";
import CommentsCards from "./CommentsCards";

const CommentList = (props) => {
    const {comments, user} = props;
    return <div>
        <Fragment>
            {
                comments && comments.map((comment)=>{
                    return <CommentsCards comment={comment} user={user}/>
                })
            }
        </Fragment>
    </div>
}; 

export default CommentList;