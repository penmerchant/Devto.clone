import HomeLogo  from '../../images/sidebar/home.png';
import ContactLogo  from '../../images/sidebar/contact.png';
import ReadingLogo  from '../../images/sidebar/readinglist.png';
import AboutLogo  from '../../images/sidebar/about.png';
import classes from './HomeSidebar.module.css';
import { NavLink } from 'react-router-dom';
const HomeSideBar = () => {

    const sidebarMenu = [
        {
            'subject' : 'Home',
            'link': '/home',
            'src' : HomeLogo
        },
        {
            'subject' : 'Reading List',
            'link': '/ReadingList',
            'src': ReadingLogo
        },
        {
            'subject' : 'About',
            'link': '/about',
            'src': AboutLogo
        },
        {
            'subject' : 'Contact',
            'link': '/contact',
            'src': ContactLogo
        },
    ];
    console.log(sidebarMenu);
    return <div className={classes.container}>
        {
            sidebarMenu.map((items)=>{
                return <div className={classes.sidebar}>
                <NavLink to={items.link} className={classes.sidebar}>
                        <img src={items.src} className={classes.img} alt='logo'/>
                        <p>{items.subject}</p>
                </NavLink>
                </div>
            })
        }
    </div>
};

export default HomeSideBar;