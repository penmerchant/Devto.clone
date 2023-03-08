import classes from '../list.module.css';

const TagLabelCard = (props) => {
    return <div className={classes.tagLabelCard}>
        <p>{props.name}</p>
    </div>;
};

export default TagLabelCard;