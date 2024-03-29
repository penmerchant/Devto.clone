import { useNavigate } from 'react-router-dom';
import { countCommentsLength } from '../../../utils';
import classes from '../list.module.css';

const TagsCard = (props) => {
    const navigate = useNavigate();

    const navigateToPost = () => {
        navigate(`/post-details/${props.id}`, {replace: true});
    }
    return <div >
    <div onClick={navigateToPost} className={classes.tag_link} >
        <div className={classes.text_wrapper}>
            <h3>
                {props.title}
            </h3>
            <p>{countCommentsLength(props.comments)} comments</p>
        </div>
    </div>
    </div>;
};

export default TagsCard;