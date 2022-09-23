import classes from './Button.module.css';
const Button = (props) =>{
    return <button className={classes.btn}>{props.label}</button>
}

export default Button;