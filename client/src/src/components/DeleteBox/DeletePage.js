import { useContext } from 'react';
import classes from './DeleteBox.module.css';
import Button from '../Button/Button';
import ButtonStyle from '../../utils/ButtonStyle';
import { useNavigate, useParams } from 'react-router-dom';
import useHttp from '../../hooks/useHttp';
import AuthContext from '../../context/authContext';

const DeletePage = () => {
    const {sendRequest, isError} = useHttp();
    const {currentUser} = useContext(AuthContext);
    const {btn_delete} = ButtonStyle();
    const navigate = useNavigate();
    let {id,type} = useParams();

    const revertToPrevPage = () =>{
        navigate(`/post-details/${id}`, {replace: true});
    };
    const handleDelete = async () => {
        if ( type === 'post'){
            try{
                await sendRequest(`${process.env.REACT_APP_API_URL}/api/posts/delete/`,
                'DELETE',
                JSON.stringify({postId: id, userId: currentUser.data.id}),
                {
                    'Content-Type': 'application/json',
                });
                alert('Succesfully deleted');
            } catch (error){}
        }
        else await sendRequest(`${process.env.REACT_APP_API_URL}/api/comments/delete/`,
            'DELETE',
            JSON.stringify({commentId: id, userId: currentUser.data.id}),
            {
                'Content-Type': 'application/json',
            }
        );
       
    };
    if(isError) {
        return <>An error occurred...</>
    }
    return <div className={classes.container}>
        <div className={classes.box}>
            <p>Are you sure to delete this {type}?</p>
            <div>
                <Button label='Delete'
                style={btn_delete}
                onClick={handleDelete}/>

                <Button label='Cancel'
                onClick={revertToPrevPage}/>
            </div>
        </div>
    </div>
};

export default DeletePage;