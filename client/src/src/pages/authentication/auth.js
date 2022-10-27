// import { useState } from "react";
// import useHttp from "../hooks/useHttp";
import { useState, useContext } from 'react';
import classes from './auth.module.css';
import {useNavigate} from 'react-router-dom';
import useHttp from '../../hooks/useHttp';
import AuthContext from '../../context/authContext';
import useForm from '../../hooks/useForm';
import { loginForm } from '../../utils/formConfig';
// import { appendData } from '../../utils';
// import ErrorMessage from '../../components/ErrorMessage/authError';

const Auth = () =>{

  
  const [currentUser , setUser] = useState();
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
      const responseData = await sendRequest('http://localhost:4444/api/user/login', 
       'POST' ,
        JSON.stringify(formValues),
        {
          'Content-Type' : 'application/json',
          // 'Acces-Control-Allow-Origin' : '*',
          Accept: 'application/json'
        }  
      );
      setUser(responseData);
      console.log(currentUser.email);
      login(currentUser);
      alert('Welcome')
      navigate('/home', {replace: true});
    } catch(error) {
      alert('Unable to login')
    }   
  };

  // const onChange = (e) => {
  //   const {name, value} = e.target;
  //   setValues({ ...values, [name]: value });
  // };
  
  return (
    <>
    {/* {
      isError && <ErrorMessage message="login"/> 
    } */}
    <div className={classes.form_container}>
      <form  className={classes.form}>
        <h1>Login</h1>
        {/* {inputs.map((input) => (
          <input
          key={input.id}
          {...input}
          value={values[input.name]}
          onChange={onChange}
          />
          ))} */}
          {formInputs}
        <button className={classes.form_btn} onClick={handleSubmit} disabled={!isFormValid()}>Submit</button>
      </form>
    </div>
    </>
  );
};

export default Auth;