import useForm from "../../hooks/useForm";
import useHttp from "../../hooks/useHttp";
import { appendData } from "../../utils";
import { newPostForm } from "../../utils/formConfig";
import classes from '../NewPost/createPost.module.css';
import { useContext, useState } from "react";
import {useNavigate} from 'react-router-dom';
import AuthContext from "../../context/authContext";
const NewPost = () =>{
    //render inputs and form values
    const {renderInputs, renderValues , isFormValid} = useForm(newPostForm);
    const {currentUser} = useContext(AuthContext);
    const {sendRequest} =  useHttp();
    const [isPermitted, setPermission] = useState(true);
    const formValues = renderValues();
    const formInputs = renderInputs();
    const navigate = useNavigate();

    //post form to the server
    const handleSubmit = async(e) => {
        e.preventDefault();
        const formData = appendData(formValues);
        const {data} = currentUser;
        formData.append('author', data.id);
        if ( currentUser.isLoggedin ) {
            try {

                await sendRequest(`${process.env.REACT_APP_API_URL}/api/posts`,
                'POST',
                formData,
                //  {  
                    //     Authorization: `Bearer ${data.token}`,
                    //  }
                    );
                alert('Succesfully submitted the blog');
                setPermission(true);
                navigate('/', {replace:true});  
            } catch (error) {
                alert('Unable to submit the blog');
            }
        } else {
            setPermission(false);
        }
    }
    if (!isPermitted) {
        return <div>You need to sign in before creating a thread</div>
    }
    return <>

    <form>
        {formInputs}
        <button className={classes.btn} onClick={handleSubmit} disabled={!isFormValid()}>Submit</button>
    </form>
    </>;
};

export default NewPost; 