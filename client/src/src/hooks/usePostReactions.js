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
    const handleReactions = async(effect, action , actionId, stateKey) => {
        try {
            console.log(userId);
            // update reactions to api await sendRequest(`http://localhost:4444/api/action/, 'PUT'`)
            try {
                await sendRequest(`http://localhost:4444/api/${action}/${effect}/`,
                'PUT',
                JSON.stringify({actionId: actionId, userId: userId}),
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