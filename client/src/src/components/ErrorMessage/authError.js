import classes from './errormessage.module.css';
const ErrorMessage = (prop) =>{
    return (
        <div className={classes.container}>
            <div className={classes.error_content}>
             <p>Unable to {prop.message}</p> 
            </div>
        </div>
    );
};

export default ErrorMessage;