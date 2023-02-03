import { useContext, useState } from 'react';
import classes from './profilemenu.module.css';
import AuthContext from '../../context/authContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import ButtonStyle from '../../utils/ButtonStyle';

const {ProfileMenuItems} = require('./ProfileMenuItems');

const ProfileMenu = () =>{

    const [show, setShow] = useState(false);
    const {logout,currentUser} = useContext(AuthContext);
    const navigate = useNavigate();
    const {btn_post} = ButtonStyle();

    const profilePicture =
    currentUser.data.profilePicture|| 'https://firebasestorage.googleapis.com/v0/b/testing-ba1e7.appspot.com/o/default%2Fdefault_pic.png?alt=media&token=9f6bcb7a-c5df-40e9-af2a-be0808b66b86';
   
    const showMenu = () =>{
        setShow(!show);
    }

    const signout =() =>{
        logout();
        navigate('/', {replace: true});
    }

    return (
        <>
        <img src={profilePicture} onClick={showMenu}  className={classes.img} alt='user'/>

        <ul className={show? classes.dropdown_show :classes.dropdown}>

        {
            ProfileMenuItems.map((menu,index)=>{
                return <>   
                <Link to={menu.url}>
                    <li key={index}
                    className={classes.menu_items}>
                    {menu.title}
                </li>
                </Link>
                </>
            })
        }
        <Button style={btn_post}
            onClick={signout}
            label='Sign Out' />
        </ul>
        </>
    );
};

export default ProfileMenu;