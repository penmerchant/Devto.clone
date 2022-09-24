import MarkdownEditor from '@uiw/react-markdown-editor';

import { useEffect, useState } from 'react';

const BodyInput = (props) => {
    const [value, setValue] = useState();
    const [valid, setValid] = useState(false);

    // renders an empty value each time this component is being called
    useEffect(()=>{
        setValue(props.value);
    }, [props.value]);

    //handle any changes of value
    const onChange = (data) => {
        let isValid = false;
        if(data.length !== 0) {
            isValid = true;
            setValue(data);
            setValid(isValid);
        }
        else{
            isValid = false;
            setValid(isValid);
        }
        props.onChange(props.label.toLowerCase(), value, valid);
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