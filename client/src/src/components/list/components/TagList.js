import {useContext, useEffect, useState} from 'react';
import useHttp from '../../../hooks/useHttp';
import AuthContext from '../../../context/authContext';
import TagsCard from './TagCard';
import classes from '../list.module.css';
import { shortenString } from '../../../utils';
import { Link } from 'react-router-dom';

const TagsList = () => {
    const [tags, setTags] = useState();
    const {sendRequest} = useHttp();
    const {currentUser} = useContext(AuthContext);
    useEffect(()=>{
        const fetchTags = async() => {
            let response = [];
            try {
                if (currentUser.isLoggedin) {
                    response = await sendRequest(`${process.env.REACT_APP_API_URL}/api/tags//tag-related-post/${currentUser.data.id}/`,
                    'GET'
                    );

                }else {
                    response = await sendRequest(`${process.env.REACT_APP_API_URL}/api/tags/tags-related-post/`);
                    
                }
                setTags(response);
            } catch (error) {}
        };
        fetchTags();
    },[sendRequest,setTags,currentUser]);
    return <>
            {tags && tags.map((tag)=>{
                return <div>
                {tag.posts.length !== 0 && <div className={classes.card}>
                   <div className={classes.text_wrapper}>
                        <Link to={`/tag-result/${tag._id}`}> 
                            <h2>{tag.name}</h2>
                        </Link>
                   </div>
                    
                {tag.posts.map((tg)=>{
                    return <TagsCard id={tg._id} title={shortenString(tg.title)} comments={tg.comments}/>;
                })}
                    </div>
                }
                </div>
            })}
        </>;
};

export default TagsList;