import MarkdownEditor from '@uiw/react-markdown-editor';
import { useEffect, useState } from 'react';

const BodyInput = (props) => {
    const [body, setBody] = useState();
    const [valid, setValid] = useState(false);

    // const valueRef = useRef();
    // valueRef.current = {body, valid};
    // renders an prev value each time this component is being editted
    useEffect(()=>{
        setBody(props.value);
    }, [props.value]);

    //handle any changes of value
    const onChange = (value) => {
        let isValid = false;
        if(value !== '') {
            setBody(value);
            isValid = true;
            setValid(isValid);
        }
        else{
            isValid = false;
            setValid(isValid);
        }
        props.onChange(props.label.toLowerCase(), body, valid);
    };

    return (
    <div >
    <MarkdownEditor
    visible={true}
    height={500}
    onChange={onChange}
    value={body}/>    

    </div>
    )
};
export default BodyInput;