import Comment from "./comment"

const Replies = (props) => {
    const style = { marginLeft: '2rem'};
    return (
        <div>
        {
            props.replies.map((reply)=>(
                <Comment comment={reply} key={props.id} replies={null} style={style} post={props.post} />
                ))
            }
        </div>
    )
}

export default Replies;