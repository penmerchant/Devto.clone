import { useContext } from "react";
import AuthContext from "../../../../context/authContext";
import usePostReactions from "../../../../hooks/usePostReactions";
import LikeReactionButton from "./LikeReactionButton";

const PostReactions = ({likes, bookmarks, postId}) => {
    // get {state, handleReactions} from usePostReaction hooks
    const {currentUser} = useContext(AuthContext);
    const userId = currentUser.data.id;
    const {state, handleReactions} = usePostReactions({likes, bookmarks, userId});
    const {isLiked, isBookmarked} = state;
    return (<>
    <LikeReactionButton handleReactions={handleReactions} isLiked={isLiked} userId={userId} postId={postId}/>
    </>);
}
export default PostReactions;