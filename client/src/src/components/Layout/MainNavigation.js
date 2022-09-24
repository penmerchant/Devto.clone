import classes from './MainNavigation.module.css';
import {NavLink} from 'react-router-dom';
import AuthContext from '../../context/authContext';
import { useContext } from 'react';
import logo from '../../images/devto.png';
import Button from '../Button/Button';
import ProfileMenu from '../ProfileMenu/ProfileMenu';

const MainNavigation = () => {
    //get user provider
    const { currentUser, isLoggedIn} = useContext(AuthContext);
    const {isLoggedin} = currentUser;
    console.log(isLoggedin);
    if(!isLoggedin){

        return (
            
            <div className={classes.header}>
        <div className={classes.nav}>
        <div>
        <li>
        <NavLink to='/home'>
        <img src={logo} alt='png'/>
        </NavLink>
        </li>
        </div>
        <ul>
        <li>Search bar</li>
        </ul>
        </div>
        <div className={classes.nav}>
        <ul>
        <li> 
             <NavLink to='/register'>
                    <Button label='Create account'/>
             </NavLink>
            
            </li>
            </ul>
            <ul>
            <li>
                
             <NavLink to='/login'>Sign In</NavLink>
            
            </li>
            </ul>
            </div>
            
            </div> );

        } else{

            
            return  ( <div className={classes.header}>
                <div className={classes.nav}>
                <div>
                <li>
                <NavLink to='/home'>
                <img src={logo} alt='png'/>
                </NavLink>
                </li>
                </div>
                <ul>
                <li>Search bar</li>
                </ul>
                </div>
                <div className={classes.nav}>
                <ul>
                <li> 
                    <NavLink to='/newPost'> 
                    <Button label='Create Post'/>
                    </NavLink> 
                    
                    </li>
                    </ul>
                    <ul>
                    <li>
                        
                         <ProfileMenu /> 
                    
                    </li>
                    </ul>
                    </div>
                    
                    </div>
            
            );
        }
    };

export default MainNavigation;