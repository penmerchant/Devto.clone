import Input from "../../../components/FormElements/Input/Input";
import Button from "../../../components/Button/Button";
import useHttp from "../../../hooks/useHttp";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../../context/authContext";
const EditComment = () => {
    const [prefilledComment , setPrefilledComment] = useState({}); 
    const {sendRequest, setError, isError} = useHttp();
    const {commentId} = useParams();
    const {currentUser} = useContext(AuthContext);
    useEffect(()=>{
        const fetchComments = async() => {
            try {

                const response = await sendRequest(`${process.env.REACT_APP_API_URL}/api/comments/getSingleComment/${commentId}`,
                'GET');
                setPrefilledComment(response);
            } catch (error) {}
        };
        fetchComments();
    },[sendRequest, setPrefilledComment, commentId]);
    
    const handleSubmit = async () => {
        try {
            await sendRequest(`${process.env.REACT_APP_API_URL}/api/comments/edit-comment/`,
            'PUT',
            JSON.stringify({commentId: commentId, 
                userId: currentUser.data.id,
                newComment: prefilledComment.comment,
            }),{
                'Content-Type': 'application/json',
            });
            setError(false);
            alert('Succesfully submitted');
        } catch (error) {
            setError(true);
        }
    };
    const onChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setPrefilledComment({...prefilledComment, [name]: value });
        
    };
    if (isError) {
        return <div>An error occurred...</div>
    }
    return <div>
        <Input value={prefilledComment.comment} onChange={onChange} name='comment'/>
        <Button label='Edit' onClick={handleSubmit} />
    </div>
};

export default EditComment;