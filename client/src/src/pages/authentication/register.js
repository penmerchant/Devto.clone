import useForm from "../../hooks/useForm";
import useHttp from "../../hooks/useHttp";
import { appendData } from "../../utils";
import { signUpForm } from "../../utils/formConfig";
import { useNavigate } from "react-router-dom";
import classes from './auth.module.css';

const CreateAccount = () => {
    const {renderInputs, renderValues , isFormValid} = useForm(signUpForm);
    const {sendRequest} = useHttp();
    const formValues = renderValues();
    const formInputs = renderInputs();
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        
        e.preventDefault();
        const formData = appendData(formValues);
        // console.log(...formData);
        // let currentUser;
        try {
            await sendRequest('http://localhost:4444/api/user/register/',
            'POST',
            formData,
            // JSON.stringify(formValues),
            // {
            //     'Content-Type' : 'application/json',
            //     'Accept': 'application/json',
            // }
            );
            alert('Succesfully created an account');
            navigate('/login', {replace: true});
        } catch(error) {
            alert('Unable to create an account');
        }
    };

    return (
    <div>

    <div className={classes.form_container}>
        
        <form className={classes.form}>
        <div className={classes.text_wrapper}>
            <h1>
DEV Community is a community of 972,161 amazing developers
    Welcome to DEV Community 
    </h1>
</div>
         {formInputs}
        
        <button className={classes.form_btn}
        onClick={handleSubmit}
        disabled={!isFormValid()} >
            Create account
        </button>
        </form>
    </div>
    </div>
    )
};

export default CreateAccount;