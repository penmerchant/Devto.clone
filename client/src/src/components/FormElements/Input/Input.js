import classes from './Input.module.css';
const Input = (props) => {
    const {value,
        name,
        type,
        label,
        onChange} = props;
        
    return (<>
    <b>{props.label}</b>
    <input className={classes.input}
    name={name}
    value={value} 
    label={label} 
    type={type} 
    onChange={onChange}
    placeholder={props.placeholder}
    required />
    </>
    );
};

export default Input;