import HomeSideBar from '../../components/HomeSidebar/HomeSidebar';
import Post from '../posts';
import classes from './home.module.css';

const Home = () =>{
    return <div className={classes.container}>

    <div className={classes.grid}>
        <div className={classes.sidebar}>
            <HomeSideBar />
        </div>
        <div className={classes.post_section}>
            <Post/>
        </div>
        <div className={classes.tag_section}>Tag listing</div>
    </div> 
    </div>
};

export default Home;