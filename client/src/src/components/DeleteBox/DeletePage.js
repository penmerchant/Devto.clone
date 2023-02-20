import classes from './DeleteBox.module.css';
import Button from '../Button/Button';
import ButtonStyle from '../../utils/ButtonStyle';
import { useNavigate, useParams } from 'react-router-dom';
import useHttp from '../../hooks/useHttp';

const DeletePage = (props) => {
    const {sendRequest, isError} = useHttp();
    const {btn_delete} = ButtonStyle();
    const navigate = useNavigate();
    let {id,type} = useParams();

    const revertToPrevPage = () =>{
        navigate(`/post-details/${id}`, {replace: true});
    };

    const handleDelete = async () => {
        try {
            if ( type === 'post'){
                await sendRequest(`${process.env.REACT_APP_API_URL}/api/posts/delete`,
                'DELETE',
                {},);
            }
            else await sendRequest(`${process.env.REACT_APP_API_URL}/api/comment/delete`,
                'DELETE',
                {},
            );
        } catch(error){

        }
    };

    return <div className={classes.container}>
        <div className={classes.box}>
            <p>Are you sure to delete this {type}?</p>
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