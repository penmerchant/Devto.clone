import ReactJsAlert from 'reactjs-alert';
const DialogBox = (props) => {
    return <ReactJsAlert
    status={props.status}   // true or false
    type={props.type}   // success, warning, error, info
    title={props.title}
    quotes={false}
    quote={props.quote}   // title you want to display
    Close={() => props.setStatus(false)}   // callback method for hide
/>
};

export default DialogBox;