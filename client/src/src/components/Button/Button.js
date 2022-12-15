import classes from './Button.module.css';
const Button = (props) =>{


    return <button className={classes.btn}
     onSubmit={props.onSubmit}
     onClick={props.onClick}
     style={props.style}
     disabled={!props.valid}
    >{props.label}</button>
}

export default Button;