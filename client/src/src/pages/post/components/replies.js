import Comment from "./comment"

const Replies = (props) => {
    const style = { marginLeft: '2rem'};
    return (
        <>
        {
            props.replies.map((reply)=>(
                <Comment comment={reply} replies={null} style={style}/>
                ))
            }
        </>
    )
}

export default Replies;