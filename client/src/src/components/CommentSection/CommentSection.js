import classes from './CommentSection.module.css';

const CommentSection = (props) => {
    const {comments} = props; 
    return  <>
            <div className={classes.row}>
                <img src={comments.author.profilePicture} alt='profile' className={classes.circle}/>
            <div className={classes.comment_box}>
            <div className={classes.profile_name_wrapper}>
                {comments.author.firstName}
            </div>
            <div className={classes.text_wrapper}>
                {comments.comment}
            </div>
            </div>
            </div>
            <div className={classes.align_right}>
            {/* {
             !isReplying && <div className={classes.row}>
            <LikeButton onClick={followUser} mode={true}/>
            <CommentButton onClick={toggleReply} action='Reply' mode={true}/>
            </div>
            
            } */}
            </div>
            </>
  
};

export default CommentSection;