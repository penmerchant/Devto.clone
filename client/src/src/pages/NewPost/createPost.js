import useForm from "../../hooks/useForm";
import useHttp from "../../hooks/useHttp";
import { appendData } from "../../utils";
import { newPostForm } from "../../utils/formConfig";
import classes from '../NewPost/createPost.module.css';
const NewPost = () =>{
    //render inputs and form values
    const {renderInputs, renderValues , isFormValid} = useForm(newPostForm);
    const {sendRequest} =  useHttp();
    const formInputs = renderInputs();
    const formValues = renderValues();

    //post form to the server
    const handleSubmit = async(e) => {
        e.preventDefault();
        const formData = appendData(formValues);
        console.log(formValues);
        try {
            await sendRequest('http://localhost:4444/api/posts', 'POST' , formData);
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