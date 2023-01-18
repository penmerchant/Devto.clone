import { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';
import useForm from "../../../hooks/useForm";
import useHttp from "../../../hooks/useHttp";
import { editPostForm, prefillEditPostForm } from "../../../utils/formConfig";

const EditPost = () => {
    const [loadedPost , setLoaded] = useState({});
    const [isError, setError] = useState(false);
    const {renderInputs, renderValues, setForm} = useForm(editPostForm);
    const {sendRequest, isLoading} = useHttp();
    const formInputs = renderInputs();
    const formValues = renderValues();

    let {postId} = useParams();
    useEffect(()=>{
        const fetchPost = async() => {
            try {
                const response = await sendRequest(`${process.env.REACT_APP_API_URL}/api/posts/${postId}`);
                setLoaded(response);
                prefillEditPostForm(response);
            } catch (error) {
                setError(true);
            }
        };
        fetchPost();
        setForm(editPostForm);
    },[setLoaded, postId, sendRequest,setForm]);
    
    // useEffect(()=>{
    //     try {
    //         // if author.id === currentUser.id
    //         prefillEditPostForm(loadedPost);
    //         setForm(editPostForm);
    //     } catch (error) {
    //         // setError(true);
    //     }
    // },[loadedPost,setForm]);

    if (isLoading) {
        return <div>Loading ... </div>
    }
    if (isError) {
        return <div> An error occurred</div>
    }
    return <div>{
            loadedPost && formInputs
        }</div>

};
export default EditPost;