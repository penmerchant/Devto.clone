import { useState } from "react";
import { checkInArray } from "../utils";
import useHttp from "./useHttp";

const useFollow = ({ followedUsers, followers,userId}) => {
    const [state, setState] = useState({
        isTagFollowed: checkInArray(followers, userId),
        isFollowed: checkInArray(followers, userId),
        isFollowing: checkInArray(followedUsers, userId),
    });
    const [isError, setError] = useState(false);
    const {sendRequest} = useHttp();

    const handleAction = async (route, action, userId, targetId, stateKey) => {
        // targetId is being used to follow and unfollow tags and users
        try {
            await sendRequest(`${process.env.REACT_APP_API_URL}/api/${route}/${action}`, 'PUT', 
            JSON.stringify({userId: userId, targetId: targetId}), {
                'Content-Type': 'application/json',
            });
            // setState
            setState({...state, [stateKey]: !state[stateKey]});
        } catch (error) {
            setError(true);
        }
    };

    return {state, handleAction, isError};
};

export default useFollow;