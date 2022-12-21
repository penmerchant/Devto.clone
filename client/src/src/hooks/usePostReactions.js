import useHttp from "./useHttp";

const { useState } = require("react");
const { checkInArray } = require("../utils");

const usePostReactions = ({likes, bookmarks, userId}) => {
    const [state, setState] = useState({
        isLiked: checkInArray(likes, userId),
        isBookmarked: checkInArray(bookmarks, userId)});
    const {sendRequest} = useHttp();
    // interact with user actions for their activity
    // function receives userId, actionId , action and stateKey
    // action -> likes, comments, posts
    const handleReactions = async(action, actionId, stateKey) => {
        try {
            // update reactions to api await sendRequest(`http://localhost:4444/api/action/, 'PUT'`)
            try {
                await sendRequest(`http://localhost:4444/api/posts/${action}/`,
                'PUT',
                JSON.stringify({postId: actionId, userId: userId}),
                {
                    'Content-Type': 'application/json',
                }
                );
                setState({...state, [stateKey]: !state[stateKey]});
            } catch (error) {}
            // JSON.stringify({postId:})

        } catch (error) {}
    }
    // updating reactions -> change state and save new state into backend
    // const updateReactions = (stateKey) => {
    // }
    return {state, handleReactions};
}

export default usePostReactions;