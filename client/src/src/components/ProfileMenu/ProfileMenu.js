import { useState } from 'react';
import classes from './profilemenu.module.css';
import { Link } from 'react-router-dom';

const {ProfileMenuItems} = require('./ProfileMenuItems');
const ProfileMenu = () =>{
    const [show, setShow] = useState(false);

    const showMenu = () =>{
        setShow(!show);
    }
    
    // const closeMenu = () => {
    //     setShow(false);
    // }

    return (
        <>
        <button onClick={showMenu}  className={classes.btn}>Profile</button>

        <ul className={show? classes.dropdown_show :classes.dropdown}>

        {
            ProfileMenuItems.map((menu)=>{
                return <Link to={menu.url}>
                    <li className={classes.menu_items}>
                    {menu.title}
                </li>
                </Link>
            })
        }
        </ul>
        </>
    );
};

export default ProfileMenu;