import { useContext, useEffect, useState } from "react";
import {useNavigate, useParams} from 'react-router-dom';
import classes from './EditPost.module.css';
import AuthContext from "../../../context/authContext";
import useForm from "../../../hooks/useForm";
import useHttp from "../../../hooks/useHttp";
import { appendData } from "../../../utils";
import { editPostForm, prefillEditPostForm } from "../../../utils/formConfig";
import Button from "../../../components/Button/Button";
import ButtonStyle from "../../../utils/ButtonStyle";

const EditPost = () => {
    const [loadedPost , setLoaded] = useState({});
    const [isError, setError] = useState(false);
    const [isPermitted, setPermission] = useState(true);
    const {renderInputs, renderValues, setForm, isFormValid} = useForm(editPostForm);
    const {sendRequest, isLoading} = useHttp();
    const {currentUser} = useContext(AuthContext);
    const formInputs = renderInputs();
    const formValues = renderValues();
    const {btn_edit} = ButtonStyle();
    const navigate = useNavigate();

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
            prefillEditPostForm(loadedPost);
            setForm(editPostForm);
        } catch (error) {
            setError(true);
        }
    },[loadedPost,setForm]);
    
    const submitHandler = async(e) => {
        e.preventDefault();
        const formData = appendData(formValues);
        if( currentUser.data.id === loadedPost.author._id) {
            try {
                await sendRequest(`${process.env.REACT_APP_API_URL}/api/posts/edit-post/${postId}`,
                    'PUT',
                    formData
                );
                setError(false);
                alert('succesfully editted the post');
                navigate(`/post-details/${postId}`, {replace: true});
            } catch (error) {
                setError(true);
                alert('fail');
            }
        }
        else {
            setPermission(false);
        }
    };

    if (isLoading) {
        return <div>Loading ... </div>
    }
    if (isError) {
        return <div> An error occurred</div>
    }
    if (!isPermitted) {
        return <div>You have no access to edit the post</div>
    }
    return <div>{
            loadedPost && 
            <div className={classes.form}>
                { formInputs }
                <Button onClick={submitHandler}
                label='Edit'
                style={btn_edit}
                valid={!isFormValid}/>
            </div>
        }</div>

};
export default EditPost;