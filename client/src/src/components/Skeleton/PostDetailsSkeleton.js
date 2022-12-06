import classes from './shimmer.module.css';

const PostDetailsSkeleton = () =>{
    return( <div className={classes.container}>
        <div className={classes.grid1}>
            <div className={classes.sidebar}>
            <div className={classes.circle}></div>
            <div className={classes.circle}></div>
            <div className={classes.circle}></div>
            </div>
        </div>
        <div className={classes.grid2}>
            <div className={classes.post_card}>
                <div className={classes.image_shimmer}></div>
                <div className={classes.row}>
                    <div className={classes.circle}></div>
                    <div className={classes.text}></div>
                </div>
                <div className={classes.title_shimmer}></div>
            </div>
        </div>
        <div className={classes.grid3}>
            <div className={classes.card}>
                <div className={classes.row}>
                    <div className={classes.circle}></div>
                    <div className={classes.text}></div>
                </div>
                <div className={classes.paragraph}></div>
            </div>
        </div>
    </div>);
};

export default PostDetailsSkeleton;