import { useContext, useEffect, useState } from "react";
import {useParams} from 'react-router-dom';
import classes from './EditPost.module.css';
import AuthContext from "../../../context/authContext";
import useForm from "../../../hooks/useForm";
import useHttp from "../../../hooks/useHttp";
import { appendData } from "../../../utils";
import { editPostForm, prefillEditPostForm } from "../../../utils/formConfig";

const EditPost = () => {
    const [loadedPost , setLoaded] = useState({});
    const [isError, setError] = useState(false);
    const {renderInputs, renderValues, setForm} = useForm(editPostForm);
    const {sendRequest, isLoading} = useHttp();
    const {currentUser} = useContext(AuthContext);
    const formInputs = renderInputs();
    const formValues = renderValues();

    let {postId} = useParams();
    useEffect(()=>{
        const fetchPost = async() => {
            try {
                const response = await sendRequest(`${process.env.REACT_APP_API_URL}/api/posts/${postId}`);
                setLoaded(response);
            } catch (error) {
                setError(true);
            }
        };
        fetchPost();
    },[setLoaded, postId, sendRequest,setForm]);
    
    useEffect(()=>{
        try {
            // if author.id === currentUser.id
            prefillEditPostForm(loadedPost);
            setForm(editPostForm);
        } catch (error) {
            setError(true);
        }
    },[loadedPost,setForm]);
    
    const submitHandler = async(e) => {
        e.preventDefault();
        const formData = appendData(formValues);
        if( currentUser.data.id === loadedPost.author) {
            try {
                await sendRequest(`${process.env.REACT_APP_API_URL}/api/posts/edit-post/${postId}`,
                    'PUT',
                    formData
                );
                setError(false);
            } catch (error) {
                setError(true);
            }
        }
    };

    if (isLoading) {
        return <div>Loading ... </div>
    }
    if (isError) {
        return <div> An error occurred</div>
    }
    return <div>{
            loadedPost && 
            <div className={classes.form}>
                { formInputs }
            </div>
        }</div>

};
export default EditPost;