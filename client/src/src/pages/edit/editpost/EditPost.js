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
    const {renderInputs, renderValues, setForm, isFormValid} = useForm(editPostForm);
    const {sendRequest, isLoading} = useHttp();
    const {currentUser} = useContext(AuthContext);
    const formInputs = renderInputs();
    const formValues = renderValues();
    const {btn_edit} = ButtonStyle();
    // const navigate = useNavigate();

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
        if( currentUser.data.id === loadedPost.author._id) {
            try {
                console.log(1);
                await sendRequest(`${process.env.REACT_APP_API_URL}/api/posts/edit-post/${postId}`,
                    'PUT',
                    formData
                );
                setError(false);
                alert('succesfully editted the post');
                // navigate(to: '/edit-post/${postId}');
            } catch (error) {
                setError(true);
                alert('fail');
            }
        }
        else {
            alert('youre not logged in!');
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
                <Button onClick={submitHandler}
                label='Edit'
                style={btn_edit}
                valid={isFormValid}/>
            </div>
        }</div>

};
export default EditPost;