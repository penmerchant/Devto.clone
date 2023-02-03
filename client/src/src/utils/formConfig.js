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
                return <TagsInput type={type} label={label} onChange={onCustomInputChange} placeholder={placeholder} tags={value}/>
            }      
            return <Input name={name} label={label} value={value} type={type} onChange={onInputChange} placeholder={placeholder}/>
            
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
        key: '1',
    },
    password: {
        ...createForm('password', 'password' , '', 'Please enter password'),
        key: '2',
    },

};

export const signUpForm = {
    email: {
        ...createForm('email', 'email' , '' , 'Please enter an email'),
        key: '1',
    },
    password: {
        ...createForm('password', 'password' , '', 'Please enter password'),
        key: '2',
    },
    // confirmPassword: {
    //     ...createForm('password', 'password' , 'Confirm password', 'Confirm password'),
    // },
    firstName: {
        ...createForm('text', 'firstName' , '' , 'First name'),
        key: '3',
    },
    lastName: {
        ...createForm('text', 'lastName' , '', 'Last name'),
        key: '4',
    },
    image: {
        ...createForm('file', 'image', 'Image'),
        key: '5',
    },
};

export const newPostForm = {
    title: {
     ...createForm('text', 'title', 'Title' ,'Please enter a title'),

     key: '1',
    },
    body: {
        ...createForm('text', 'body', 'Body'),
        key: '2',
    },
    tags: {
        ...createForm('text', 'tags', 'Tags', '#npm...'),
        key: '3',
    },
    image: {
        ...createForm('file' , 'image' , 'Image'),
        key: '4',
    },
};// values of input

export let editPostForm = {
    title: {
     ...createForm('text', 'title', 'Title' ,'Please enter a title'),

    },
    body: {
        ...createForm('text', 'body', 'Body'),
    },
    tags: {
        ...createForm('text', 'tags', 'Tags', '#npm...'),
    },
    image: {
        ...createForm('file' , 'image' , 'Image'),
    },
};

export let editProfile = {

    firstName: {
        ...createForm('text', 'firstName' , 'First name' , 'First name'),
        key: '1',
    },
    lastName: {
        ...createForm('text', 'lastName' , 'Last name', 'Last name'),
        key: '2',
    },
    bio: {
        ...createForm('text', 'bio', 'Bio', 'Write about yourself'),
        key: '3',
    },
    github: {
        ...createForm('text', 'github', 'Github', 'Your github account'),
        key: '4',
    },
    instagram: {
        ...createForm('text', 'instagram', 'Instagram', 'Your instagram account'),
        key: '5',
    },
    profilePicture: {
        ...createForm('file', 'image',  'Image'),
        key: '6',
    },
};

export const prefillEditPostForm = (data) => {
    for (let [key, value] of Object.entries(data)){
        if(key in editPostForm){
            if (key === 'tags') {
                let tags = [];
                data[key].forEach((tag) => {
                  tags.push(tag.name);
                });
                editPostForm = {
                  ...editPostForm,
                  [key]: { ...editPostForm[key], value: tags, valid: true },
                };
              } 
            else {editPostForm = { ...editPostForm,
                [key] : {...editPostForm[key], value, valid: true}
                };
            }
        }
    }
    
};

export const prefilledProfile = (data) => {
    for (let [key, value] of Object.entries(data)){
        if(key in editProfile){
             editProfile = { ...editProfile,
                [key] : {...editProfile[key], value, valid: true}
                };
        }
    }
    
};

export const CommentForm = {
    comment: {
        ...createForm('text', 'comment', 'Comment', 'Write a comment'),
        key: '1',
    },
};