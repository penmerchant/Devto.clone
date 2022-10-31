import HomeSideBar from '../../components/HomeSidebar/HomeSidebar';
import Post from '../posts';
import classes from './home.module.css';
// import MarkdownPreview from '@uiw/react-markdown-preview';

// const source = `
// ## MarkdownPreview

// > todo: React component preview markdown text.
// `;

const Home = () =>{
    return <div className={classes.grid}>
        <div className={classes.sidebar}>
            <HomeSideBar />
        </div>
        <div className={classes.post_section}>
            <Post/>
        </div>
        <div className={classes.tag_section}>Tag listing</div>
    </div> 
};

export default Home;