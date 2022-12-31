import { useContext } from "react";
import AuthContext from "../../../../context/authContext";
import usePostReactions from "../../../../hooks/usePostReactions";
import BookmarkReactions from "./BookmarkReactionsButton";
import LikeReactionButton from "./LikeReactionButton";

const PostReactions = ({likes, bookmarked, postId}) => {
    // get {state, handleReactions} from usePostReaction hooks
    const {currentUser} = useContext(AuthContext);
    const userId = currentUser.data.id;
    const {state, handleReactions} = usePostReactions({likes, bookmarked, userId});
    const {isLiked, isBookmarked} = state;
    return (<>
    <LikeReactionButton handleReactions={handleReactions} action='posts' isLiked={isLiked} userId={userId} actionId={postId}/>
    <BookmarkReactions handleReactions={handleReactions} action='posts' isBookmarked={isBookmarked} userId={userId} actionId={postId}/>
    </>);
}
export default PostReactions;