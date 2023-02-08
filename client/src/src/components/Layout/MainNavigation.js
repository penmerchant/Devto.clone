import classes from './MainNavigation.module.css';
import {NavLink} from 'react-router-dom';
import AuthContext from '../../context/authContext';
import {useContext, useState} from 'react';
import logo from '../../images/devto.png';
import Button from '../Button/Button';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import SearchBar from '../FormElements/SearchBar/SearchBar';
import ButtonStyle from '../../utils/ButtonStyle';

const MainNavigation = () => {
    //get user provider
    const [isHover, setHover] = useState(false);
    const { currentUser} = useContext(AuthContext);
    const {isLoggedin} = currentUser;
    const {btn_post} = ButtonStyle(isHover);

    const handleMouseLeave = () => {
        setHover(false);
    };

    const handleMouseEnter = () => {
        setHover(true);
    };

    if(!isLoggedin){

        return (
            
        <div className={classes.header}>
          <div className={classes.nav}>
        
        <div>
         <li>
           <NavLink to='/'>
            <img src={logo} alt='png'/>
           </NavLink>
          </li>
        </div>
        
        <ul>
         <li>
            <SearchBar />
         </li>
        </ul>
        </div>
        <div className={classes.nav}>
        <ul>
        <li> 
             <NavLink to='/register'>
                    <Button label='Create account' style={btn_post}
                     onMouseEnter={handleMouseEnter}
                     onMouseLeave={handleMouseLeave}
                    />
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
                <NavLink to='/'>
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
                    <Button label='Create Post' style={btn_post} 
                     onMouseEnter={handleMouseEnter}
                     onMouseLeave={handleMouseLeave}/>
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