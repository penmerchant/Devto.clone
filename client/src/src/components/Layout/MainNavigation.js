import classes from './MainNavigation.module.css';
import {NavLink} from 'react-router-dom';
import AuthContext from '../../context/authContext';
import {useContext, useState} from 'react';
import logo from '../../images/devto.png';
import Button from '../Button/Button';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import SearchBar from '../FormElements/SearchBar/SearchBar';
import ButtonStyle from '../../utils/ButtonStyle';
import {AiOutlineBars} from 'react-icons/ai';
import HomeSideBar from '../HomeSidebar/HomeSidebar';
// import HomeSideBar from '../HomeSidebar/HomeSidebar';

const MainNavigation = () => {
    //get user provider
    const [isHover, setHover] = useState(false);
    const [isToggle, setToggle] = useState(false);
    const { currentUser} = useContext(AuthContext);
    const {isLoggedin} = currentUser;
    const {btn_post} = ButtonStyle(isHover);


    const handleMouseLeave = () => {
        setHover(false);
    };

    const handleMouseEnter = () => {
        setHover(true);
    };

    const toggleSideBar = () =>{
        setToggle(!isToggle);
    };

    if(!isLoggedin){

        return (
            <>
        <div className={classes.header}>
          <div className={classes.nav}>
        <div >
        <div className={classes.menu_bar} onClick={toggleSideBar}>
            <AiOutlineBars />
        </div>
        </div>
        <div>
         <li>
           <NavLink to='/'>
            <img className={classes.img} src={logo} alt='png'/>
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
        <li className={classes.item}> 
             <NavLink to='/register'>
                    <Button label='Create account' style={btn_post}
                     onMouseEnter={handleMouseEnter}
                     onMouseLeave={handleMouseLeave}
                     />
             </NavLink>
            
        </li>
        </ul>
         <ul>
         <li className={classes.item}>
                
             <NavLink to='/login'>Sign In</NavLink>
            
            </li>
            </ul>
            </div>
            
            </div> 
            <div className={isToggle? classes.sidebar_active: classes.sidebar}>
                        <HomeSideBar />
                    </div>
            </>);

        } else{

              
            return  (<>
                 <div className={classes.header}>
                <div className={classes.nav}>
                    <div className={classes.menu_bar} onClick={toggleSideBar}>
                        <AiOutlineBars />
                    </div>
                <div>
                <li>
                <NavLink to='/'>
                <img className={classes.img} src={logo} alt='png'/>
                </NavLink>
                </li>
                </div>
                <ul>
                <li>Search bar</li>
                </ul>
                </div>
                <div className={classes.nav}>
                <ul>
                <li className={classes.item}> 
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
                    <div className={isToggle? classes.sidebar_active: classes.sidebar}>
                        <HomeSideBar />
                    </div>
                     </>
            );
        }
    };

export default MainNavigation;