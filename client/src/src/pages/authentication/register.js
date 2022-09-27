import useForm from "../../hooks/useForm";
import useHttp from "../../hooks/useHttp";
import { appendData } from "../../utils";
import { signUpForm } from "../../utils/formConfig";
import classes from './auth.module.css';

const CreateAccount = () => {
    const {renderInputs, renderValues , isFormValid} = useForm(signUpForm);
    const {sendRequest} = useHttp();
    const formInputs = renderInputs();

    const handleSubmit = async(e) => {
        
        e.preventDefault();
        const formValues = renderValues();

        try {
            const formData = appendData(formValues);
            await sendRequest('http://localhost:4444/api/user/register',
            'POST',
            JSON.stringify(formData),
            {
              'Content-Type' : 'application/json'
            }  
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