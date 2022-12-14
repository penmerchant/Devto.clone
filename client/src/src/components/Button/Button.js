import classes from './Button.module.css';
const Button = (props) =>{


    return <button className={classes.btn}
     onClick={props.onClick}
     style={props.style}
     disabled={!props.valid}
    >
    {props.label}
    </button>
}

export default Button;