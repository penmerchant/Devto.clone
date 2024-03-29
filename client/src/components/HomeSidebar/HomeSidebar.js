import HomeLogo  from '../../images/sidebar/home.png';
import ReadingLogo  from '../../images/sidebar/readinglist.png';
import AboutLogo  from '../../images/sidebar/about.png';
import TagLogo from '../../images/sidebar/tags.png';
import classes from './HomeSidebar.module.css';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import AuthContext from '../../context/authContext';
import Button from '../Button/Button';
import ButtonStyle from '../../utils/ButtonStyle';
const HomeSideBar = (props) => {
    const {currentUser} = useContext(AuthContext);
    const [isHover, setHover] = useState(false);

    const navigate = useNavigate();
    const {btn_login, btn_register} = ButtonStyle(isHover);

    const handleMouseLeave = () => {
        setHover(false);
    };

    const handleMouseEnter = () => {
        setHover(true);
    };
    const sidebarMenu = [
        {
            'subject' : 'Home',
            'link': '/',
            'src' : HomeLogo
        },
        {
            'subject' : 'Reading List',
            'link': `/reading-list/${currentUser.data.id}`,
            'src': ReadingLogo
        },
        {
            'subject' : 'About',
            'link': '/about',
            'src': AboutLogo
        },
        {
            'subject': 'Tags',
            'link': '/tags',
            'src': TagLogo
        }
    ];
    
    const cancelSidebar = () => {
        props.onClick(false);
    };

    const navToSignInPage = () => {
        cancelSidebar();
        navigate(`/login`, {replace: true});
        // cancelSideBar();
    }
    const navToRegisterPage = () => {
        cancelSidebar();
        navigate(`/register`, {replace: true});
        // cancelSideBar();
    }

    const navToPage = (page) => {
        // cancelSidebar();
        navigate(`${page}` , {replace: true});
    };

    return <div >
        <div className={classes.box}>
            <div className={classes.container}>
                <div className={classes.txt_wrapper}>
                    <b>DEV Community is a community of 960,002 amazing developers</b>
                    <p>We're a place where coders share, stay up-to-date and grow their careers.</p>
                </div>
                {
                    !currentUser.isLoggedin && <div>
                        <Button label='Create account' 
                            onClick={navToRegisterPage}
                            style={btn_register}
                            onMouseLeave={handleMouseLeave}
                            onMouseEnter={handleMouseEnter}
                            />
                        <Button label='Sign in' 
                            onClick={navToSignInPage}
                            style={btn_login}
                            />
                    </div>
                }
            </div>
        </div>
        {   
            sidebarMenu.map((items,index)=>{
                return <div key={index} className={classes.sidebar}>
                    <div onClick={()=> { navToPage(items.link); cancelSidebar();}} className={classes.sidebar}>
                    <div className={classes.row}>
                        <img src={items.src} className={classes.img} alt='logo'/>
                        <p>{items.subject}</p>
                    </div>
                    </div>
                </div>
            })
        }
    </div>
};

export default HomeSideBar;