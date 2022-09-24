// import { useState } from "react";
// import useHttp from "../hooks/useHttp";
import { useState, useContext } from 'react';
import classes from './auth.module.css';
import {useNavigate} from 'react-router-dom';
import useHttp from '../../hooks/useHttp';
import AuthContext from '../../context/authContext';
import ErrorMessage from '../../components/ErrorMessage/authError';

const Auth = () =>{
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [currentUser , setUser] = useState({});
  const {sendRequest, isError, setError} = useHttp();
  const navigate = useNavigate();
  const {login} = useContext(AuthContext);
  const inputs = [
        
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
   
  ];

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const responseData = await sendRequest('http://localhost:4444/api/user/login', 
       'POST' ,
        JSON.stringify(values),
        {
          'Content-Type' : 'application/json'
        }  
      );
      setUser({...responseData});
      console.log(currentUser);
      login(currentUser);
      console.log( responseData);
      navigate('/home', {replace: true});
    } catch(error) {
      setError(true);
    }   
  };

  const onChange = (e) => {
    const {name, value} = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <>
    {
      isError && <ErrorMessage message="login"/> 
    }
    <div className={classes.form_container}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <h1>Login</h1>
        {inputs.map((input) => (
          <input
          key={input.id}
          {...input}
          value={values[input.name]}
          onChange={onChange}
          />
          ))}
        <button className={classes.form_btn}>Submit</button>
      </form>
    </div>
    </>
  );
};

export default Auth;