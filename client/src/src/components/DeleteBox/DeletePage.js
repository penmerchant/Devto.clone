import classes from './DeleteBox.module.css';
import Button from '../Button/Button';
import ButtonStyle from '../../utils/ButtonStyle';
import { useNavigate, useParams } from 'react-router-dom';

const DeletePage = (props) => {
    const {btn_delete} = ButtonStyle();
    const navigate = useNavigate();
    let {id} = useParams();

    const revertToPrevPage = () =>{
        navigate(`/post-details/${id}`, {replace: true});
    };


    return <div className={classes.container}>
        <div className={classes.box}>
            <p>Are you sure to delete this {props.deleteType}</p>
            <div>
                <Button label='delete'
                style={btn_delete}
                onClick={props.onClick}/>
                <Button label='Cancel'
                onClick={revertToPrevPage}/>
            </div>
        </div>
    </div>
};

export default DeletePage;