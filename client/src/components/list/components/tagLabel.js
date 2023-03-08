import classes from '../list.module.css';
import TagLabelCard from './TagLabelCard';

const TagLabel = (props) => {
    return <div className={classes.tagLabel_container}>
        { 
            props.tags.map((tag)=>{
                return <TagLabelCard name={tag.name}/>
            })
        }
    </div>;
};



export default TagLabel;