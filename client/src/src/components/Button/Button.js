import classes from './Button.module.css';
const Button = (props) =>{


    return <button className={classes.btn}
     onClick={props.onClick}
     onSubmit={props.onSubmit}
     style={props.style}
     disabled={props.valid}
    //  onMouseLeave={props.onMouseLeave}
    //  onMouseEnter={props.onMouseEnter}
    >{props.label}</button>
}

export default Button;