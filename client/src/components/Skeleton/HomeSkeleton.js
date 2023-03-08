import classes from './shimmer.module.css';

//to render list of skeleton
const keys = [1,2,3,4,5];

const HomeSkeleton = () => {
    return keys.map((key) => <div key={key} className={classes.card}>
        <div className={classes.row}>
            <div className={classes.circle}></div>
            <div className={classes.text}></div>
        </div>
        <div className={classes.paragraph}></div>
    </div>);
};

export default HomeSkeleton;