const FormInput = (props) =>{
    if(props.label === 'body') {
        return <textarea></textarea>
    }
    else{
        return <input />
    }
};

export default FormInput;