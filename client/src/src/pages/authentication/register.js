import useForm from "../../hooks/useForm";
import useHttp from "../../hooks/useHttp";
import { appendData } from "../../utils";
import { signUpForm } from "../../utils/formConfig";
import classes from './auth.module.css';

const CreateAccount = () => {
    const {renderInputs, renderValues , isFormValid} = useForm(signUpForm);
    const {sendRequest} = useHttp();
    const formValues = renderValues();
    const formInputs = renderInputs();

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
        } catch(error) {
            alert('Unable to create an account');
        }
    };

    return (<div className={classes.form_container}>
        <form className={classes.form}>
         {formInputs}
        
        <button className={classes.form_btn}
        onClick={handleSubmit}
        disabled={!isFormValid()} >
            Create account
        </button>
        </form>
    </div>
    )
};

export default CreateAccount;