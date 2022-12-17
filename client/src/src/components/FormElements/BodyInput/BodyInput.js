import MarkdownEditor from '@uiw/react-markdown-editor';
import { useEffect, useRef, useState } from 'react';

const BodyInput = (props) => {
    const [body, setBody] = useState();
    const [valid, setValid] = useState(false);

    const valueRef = useRef();
    valueRef.current = {body, valid};
    // renders an empty value each time this component is being called
    useEffect(()=>{
        setBody(props.value);
    }, [props.value]);

    //handle any changes of value
    const onChange = (value) => {
        let isValid = false;
        setBody(value);
        if(valueRef.current.body !== '') {
            isValid = true;
            setValid(isValid);
        }
        else{
            isValid = false;
            setValid(isValid);
        }
        props.onChange(props.label.toLowerCase(), body, valueRef.current.valid);
    };

    return (
    <div >
    <MarkdownEditor
    visible={true}
    height={500}
    onChange={onChange}
    />    

    </div>
    )
};
export default BodyInput;