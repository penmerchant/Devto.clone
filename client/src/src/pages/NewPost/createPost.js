import useForm from "../../hooks/useForm";
import useHttp from "../../hooks/useHttp";
import { appendData } from "../../utils";
import { newPostForm } from "../../utils/formConfig";
import classes from '../NewPost/createPost.module.css';
import { useContext } from "react";
import {useNavigate} from 'react-router-dom';
import AuthContext from "../../context/authContext";
const NewPost = () =>{
    //render inputs and form values
    const {renderInputs, renderValues , isFormValid} = useForm(newPostForm);
    const {currentUser} = useContext(AuthContext);
    const {sendRequest} =  useHttp();
    const formValues = renderValues();
    const formInputs = renderInputs();
    const navigate = useNavigate();

    //post form to the server
    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(formValues);
        const formData = appendData(formValues);
        const {data} = currentUser;
        formData.append('author', data.id);
        try {
            await sendRequest('http://localhost:4444/api/posts',
             'POST',
             formData,
            //  {  
            //     Authorization: `Bearer ${data.token}`,
            //  }
             );
             alert('Succesfully submitted the blog');
             navigate('/', {replace:true});  
        } catch (error) {
            alert('Unable to submit the blog');
        }
    }
    
    return <div className={classes.form_container}>

    <form className={classes.form} >
        {formInputs}
        <button className={classes.btn} onClick={handleSubmit} disabled={!isFormValid()}>Submit</button>
    </form>
    </div>;
};

export default NewPost; 