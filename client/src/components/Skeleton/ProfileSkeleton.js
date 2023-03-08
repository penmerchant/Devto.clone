import classes from "./shimmer.module.css";

const ProfileSkeleton = () => {
    const items = [1,2,3,4,5];

    return <div className={classes.profile_grid}>
        <div className={classes.grid1}>
            <div className={classes.card}>
                <div>
                    <div className={classes.circle}></div>
                    <div className={classes.text}></div>
                    <div className={classes.paragraph}></div>
                </div>
            </div>
        </div>
        <div className={classes.grid2}>
            <div className={classes.card}>
                <div className={classes.text}></div>
                <div className={classes.text}></div>
                <div className={classes.text}></div>
            </div>
            {
                items.map((item) => {

                  return  <div className={classes.card}>
                    <div className={classes.row}>
                    <div className={classes.circle}></div>
                    <div className={classes.text}></div>
                    </div>
                    <div className={classes.title}></div>
                    </div>
                })
            }
        </div>
    </div>
};

export default ProfileSkeleton;