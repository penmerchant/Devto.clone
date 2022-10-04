import useForm from "../../hooks/useForm";
import useHttp from "../../hooks/useHttp";
import { appendData } from "../../utils";
import { newPostForm } from "../../utils/formConfig";
import classes from '../NewPost/createPost.module.css';
import { useContext } from "react";
import AuthContext from "../../context/authContext";
const NewPost = () =>{
    //render inputs and form values
    const {renderInputs, renderValues , isFormValid} = useForm(newPostForm);
    const {currentUser} = useContext(AuthContext);
    const {sendRequest} =  useHttp();
    const formInputs = renderInputs();
    
    //post form to the server
    const handleSubmit = async(e) => {
        e.preventDefault();
        const formValues = renderValues();
        const formData = appendData(formValues);
        const {data} = currentUser;
        console.log(data.id);
        formData.append('author', data.id);
        try {
            await sendRequest('http://localhost:4444/api/posts',
             'POST',
             formData,
             {  Accept: 'multipart/form-data',
                'Acces-Control-Allow-Origin' : '*',
                Authorization: `Bearer ${data.token}`,
             }  
            );
        } catch (error) {

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