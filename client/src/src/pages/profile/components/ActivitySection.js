import {AiOutlineFile} from 'react-icons/ai';
import {AiOutlineTags} from 'react-icons/ai';
import {BiCommentDetail} from 'react-icons/bi';
import { countArrayLength } from '../../../utils';

import classes from '../profile_section.module.css';

const ActivitySection = (props) => {


    return <div className={classes.info_wrapper}>
        
        <div className={classes.row}>
            <AiOutlineFile />
            <p>{countArrayLength(props.post)} posts published</p>
        </div>
        <div className={classes.row}>
            <BiCommentDetail />
            <p>{countArrayLength(props.comments)} comments written</p>
        </div>
        <div className={classes.row}>
            <AiOutlineTags />
            <p>{countArrayLength(props.tags)} tags followed</p>
        </div>
    </div>
};

export default ActivitySection