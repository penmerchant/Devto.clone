import classes from './MainNavigation.module.css';
import {NavLink} from 'react-router-dom';
import AuthContext from '../../context/authContext';
import {useContext, useState} from 'react';
import logo from '../../images/devto.png';
import Button from '../Button/Button';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import ButtonStyle from '../../utils/ButtonStyle';
import {AiOutlineBars} from 'react-icons/ai';
import HomeSideBar from '../HomeSidebar/HomeSidebar';
import SearchBar from '../FormElements/SearchBar/SearchBar';
import {FaSearch} from "react-icons/fa";
import {MdCancel} from "react-icons/md";

const MainNavigation = () => {
    //get user provider
    const [isHover, setHover] = useState(false);
    const [isToggle, setToggle] = useState(false);
    const [isSearched, setSearch] = useState(false);
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

    const toggleSearch = () =>{
        setSearch(true);
    };

    const cancelSearch = () => {
        setSearch(false);
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
        {isSearched? <MdCancel onClick={cancelSearch}/> : <FaSearch onClick={toggleSearch}/> }

        <ul>
         <li>
            {/* <SearchBar /> */}
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
            <div>
                { isSearched && <SearchBar />}
            </div>
            </>);

        } else{

              
            return  (<>
                 <div className={classes.header}>
                <div className={classes.nav}>
                    <div className={classes.menu_bar} onClick={toggleSideBar}>
                        <AiOutlineBars />
                    </div>
                <li>
                <NavLink to='/'>
                <img className={classes.img} src={logo} alt='png'/>
                </NavLink>
                </li>
                    {isSearched? <MdCancel onClick={cancelSearch}/> : <FaSearch onClick={toggleSearch}/> }
                </div>
                <div className={classes.nav}>

                <li className={classes.item}> 
                    <NavLink to='/newPost'> 
                    <Button label='Create Post' style={btn_post} 
                     onMouseEnter={handleMouseEnter}
                     onMouseLeave={handleMouseLeave}/>
                    </NavLink> 
                    
                    </li>
                   
                    <ProfileMenu /> 
                </div>
                    
                    </div>
                    <div className={isToggle? classes.sidebar_active: classes.sidebar}>
                        <HomeSideBar />
                    </div>
                    <div>
                        { isSearched && <SearchBar />}
                    </div>
                     </>
            );
        }
    };

export default MainNavigation;