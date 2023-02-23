import classes from '../list.module.css';

const TagsCard = (props) => {
    return <div className={classes.tag_link} >
        <div className={classes.text_wrapper}>
            <h3>{props.title}</h3>
            <p>{props.comments.length} comments</p>
        </div>
    </div>;
};

export default TagsCard;