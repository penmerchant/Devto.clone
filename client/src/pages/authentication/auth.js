// import { useState } from "react";
// import useHttp from "../hooks/useHttp";
import {useContext} from 'react';
import classes from './auth.module.css';
import {useNavigate} from 'react-router-dom';
import useHttp from '../../hooks/useHttp';
import AuthContext from '../../context/authContext';
import useForm from '../../hooks/useForm';
import { loginForm } from '../../utils/formConfig';
// import { appendData } from '../../utils';
// import ErrorMessage from '../../components/ErrorMessage/authError';

const Auth = () =>{

  
  // const [currentUser , setUser] = useState({});
  const {sendRequest} = useHttp();
  const {renderInputs , renderValues, isFormValid} = useForm(loginForm); 
  const navigate = useNavigate();
  const {login} = useContext(AuthContext);
  const formValues = renderValues();
  const formInputs = renderInputs();
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      // const formData = appendData(formValues);
      const responseData = await sendRequest(`${process.env.REACT_APP_API_URL}/api/user/login`, 
       'POST' ,
        JSON.stringify(formValues),
        {
          'Content-Type' : 'application/json',
        }  
      );
      login(responseData);
      alert('Welcome');
      navigate('/', {replace: true});
    } catch(error) {
      alert('Unable to login');
    }   
  };

  return (
    <>
    {/* {
      isError && <ErrorMessage message="login"/> 
    } */}
    <div className={classes.form_container}>
      <form  className={classes.form}>
        <div className={classes.text_wrapper}>
          <h1>Welcome to DEV Community DEV Community is a community of 972,161 amazing developers</h1>
        </div>
          {formInputs}
        <button className={classes.form_btn} onClick={handleSubmit} disabled={!isFormValid()}>Login</button>
      </form>
    </div>
    </>
  );
};

export default Auth;