import LikeIcon from '../../images/card/heart.svg';
import classes from './Button.module.css';

const LikeButton = (props) => {
    if(props.mode === false) {
        return <div className={classes.btn_wrapper}>
        <div className={classes.row} onClick={props.onClick}>
        <div className={classes.img_wrapper}>
            <img src={LikeIcon} alt='like icon' className={classes.icon_wrapper} />
        </div>
        </div>
        </div>
    }
    
    return <div className={classes.btn_wrapper}>
    <div className={classes.row} onClick={props.onClick}>
        <div className={classes.icon_wrapper}>
            <img src={LikeIcon} alt='like icon' className={classes.icon_wrapper} />
        </div>
        <div className={classes.text_wrapper}>
            <p> Like</p>
        </div>
        </div>        
    </div>
};

export default LikeButton;