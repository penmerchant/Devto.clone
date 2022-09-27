import BodyInput from "../components/FormElements/BodyInput/BodyInput";
import InputImage from "../components/FormElements/ImageInput/ImageInput";
import Input from "../components/FormElements/Input/Input";
import TagsInput from "../components/FormElements/TagsInput/TagsInput";

const createForm = (
    type,
    name,
    label,
    placeholder,
    defaultValue = '') =>{
    return {
        renderInput : (onInputChange, value , valid ,label, onCustomInputChange) =>{
            if(label==='Image') {
                return  <InputImage key={name} label={label} onInput={onCustomInputChange} file={value}/>
            }
            if(label === 'Body'){
                return <BodyInput label={label} onChange={onCustomInputChange} value={value}/>
            }
            if(label === 'Tags'){
                return <TagsInput type={type} label={label} onChange={onCustomInputChange} placeholder={placeholder}/>
            }           
            return <Input name={name} label={label} type={type} onChange={onInputChange} placeholder={placeholder}/>
            
        },
        label,
        errorMessage : '',
        valid : false,
        value: defaultValue,
        touched : false,
    };
}; //render inputs

export const loginForm = {
    email: {
        ...createForm('email', 'email' , '' , 'Please enter an email'),
    },
    password: {
        ...createForm('password', 'password' , '', 'Please enter password'),
    },
};

export const signUpForm = {
    email: {
        ...createForm('email', 'email' , '' , 'Please enter an email'),
    },
    password: {
        ...createForm('password', 'password' , '', 'Please enter password'),
    },
    // confirmPassword: {
    //     ...createForm('password', 'password' , 'Confirm password', 'Confirm password'),
    // },
    firstName: {
        ...createForm('text', 'firstName' , '' , 'First name'),
    },
    lastName: {
        ...createForm('text', 'lastName' , '', 'Last name'),
    },
};

export const newPostForm = {
    title: {
     ...createForm('text', 'title', 'Title' ,'Please enter a title'),

     key: '1',
    },
    tags: {
        ...createForm('text', 'tags', 'Tags', '#npm...'),
        key: '2',
    },
    image: {
        ...createForm('file' , 'image' , 'Image'),
        key: '3',
    },
    body: {
        ...createForm('text', 'body', 'Body'),
        key: '4',
    },
};// values of input