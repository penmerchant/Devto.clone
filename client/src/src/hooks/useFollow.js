import { useState } from "react";
import { checkInArray } from "../utils";
import useHttp from "./useHttp";

const useFollow = ({tags, followedUsers, followers,userId}) => {
    const [state, setState] = useState({
        isTagFollowed: checkInArray(tags, userId),
        isFollowed: checkInArray(followers, userId),
        isFollowing: checkInArray(followedUsers, userId),
    });
    const {sendRequest} = useHttp();

    const handleAction = async ({route, effect, userId, targetId}) => {
        // targetId is being used to follow and unfollow tags and users
        // await sendRequest('url/api/route/action', 'PUT', 
        // {userId: userId, targetId: targetId});
        // setState
    };

    return {state, handleAction};
};

export default useFollow;