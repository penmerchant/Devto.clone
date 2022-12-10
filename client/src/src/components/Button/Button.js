import classes from './Button.module.css';
const Button = (props) =>{


    return <button className={classes.btn}
     onClick={props.onClick}
     style={props.style}
    >
    {props.label}
    </button>
}

export default Button;