import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useForm from "../../../hooks/useForm";
import useHttp from "../../../hooks/useHttp";
import { appendData } from "../../../utils";
import { editProfile, prefilledProfile } from "../../../utils/formConfig";
import classes from './EditProfile.module.css';
import Button from "../../../components/Button/Button";
import ButtonStyle from "../../../utils/ButtonStyle";


const EditProfile = () => {
    const {sendRequest} = useHttp();
    const {renderValues, renderInputs, isFormValid, isLoading, setForm} = useForm(editProfile);
    const [userProfile, setUser] = useState({});
    const [isError, setError] = useState(false);
    let {userId} = useParams();

    const formInputs = renderInputs();
    const formValues = renderValues();
    const {btn_edit} = ButtonStyle();

    useEffect(()=>{
        const fetchProfile = async() => {
            try {
                const response = await sendRequest(`${process.env.REACT_APP_API_URL}/api/user/${userId}`);
                setUser(response);
                setError(false);
            } catch (error) {
                setError(true);
            }
        };
        fetchProfile();
    },[setUser, userId, sendRequest]);

    useEffect(()=>{
        prefilledProfile(userProfile);
        setForm(editProfile);
    },[userProfile, setForm]);

    if (isError) {
        return <div>An error occurred</div>
    }

    if(isLoading) {
        return <div>loading...</div>
    }
    const handleSubmit = async() => {
        const formData = appendData(formValues);
        try {
            await sendRequest(`${process.env.REACT_APP_API_URL}/api/user/edit-profile/${userId}`,
                'PUT',
                formData );

            setError(false);
        } catch (error) {
            setError(true);
        }
    }
    return <div className={classes.form}>
            <h2>Edit profile</h2>
            {
                userProfile &&  formInputs 
            }
            <Button label='Edit'
            onClick={handleSubmit}
            style={btn_edit}
            valid={!isFormValid}/>
        </div>
};
export default EditProfile;