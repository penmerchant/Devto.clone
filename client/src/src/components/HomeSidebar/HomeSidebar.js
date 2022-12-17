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
            'link': '/',
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
    return <div>
        <div className={classes.box}>
            <div className={classes.container}>
                <div className={classes.txt_wrapper}>
                    <b>DEV Community is a community of 960,002 amazing developers</b>
                    <p>We're a place where coders share, stay up-to-date and grow their careers.</p>
                </div>
            </div>
        </div>
        {   
            sidebarMenu.map((items,index)=>{
                return <div key={index} className={classes.sidebar}>
                <NavLink to={items.link} className={classes.sidebar} >
                        <img src={items.src} className={classes.img} alt='logo'/>
                        <p>{items.subject}</p>
                </NavLink>
                </div>
            })
        }
    </div>
};

export default HomeSideBar;