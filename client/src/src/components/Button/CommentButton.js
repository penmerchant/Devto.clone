import CommentIcon from '../../images/card/comment-pen.svg';
import classes from './Button.module.css';

const CommentButton = (props) => {
   
    if(props.mode === false) {
        return <div className={classes.btn_wrapper}>
        <div className={classes.row} onClick={props.onClick}>
        <div className={classes.icon_wrapper}>
            <img src={CommentIcon} className={classes.icon_wrapper} alt='comment icon'/>
        </div>
        </div>
        </div> 
    }

    return <div className={classes.btn_wrapper}>
    <div className={classes.row} onClick={props.onClick}>
        <div className={classes.icon_wrapper}>
            <img src={CommentIcon} alt='comment icon' className={classes.icon_wrapper} />
        </div>
        <div className={classes.text_wrapper}>
            <p>{props.action}</p>
        </div>
        </div>        
    </div>
};

export default CommentButton;