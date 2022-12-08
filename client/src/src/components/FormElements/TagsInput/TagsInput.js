import { useState } from "react";
import classes from './TagsInput.module.css';

const TagsInput = (props) => {
    const [tags, setTags] = useState([]);
    const [valid , setValid] = useState(false);
    
    const onKeyPress = (e) => {
        
        const value = e.target.value;
        if(!value.trim()) return;
        if(e.key === 'Enter'){
            setTags([...tags, value]);
            setValid(true);
            e.target.value = null;
        }
        if(tags.length === 0){
            setValid(false);
        }
        props.onChange(props.label.toLowerCase(), tags, valid);
    };

    const removeTags = (removedIndex) =>{
        const removedTag = tags[removedIndex];
        const updatedTags = tags.filter((tag) => tag !== removedTag);
        setTags(updatedTags);

        props.onChange(props.label.toLowerCase(), tags, true);
    };


    return <>
    { <p>{props.label}</p>}
    <div className={classes.container}>
    {   
        tags.map((tag,index)=>{
            return <>
                <div className={classes.tags}>
                    <p>{tag}</p>
                    <span onClick={()=>removeTags(index)} className={classes.btn}>x</span>
                </div>
            </>
        })
    }
    <input id={props.id}
    className={classes.input}
    type={props.text}
    onKeyDown={onKeyPress}
    placeholder={props.placeholder}/> 
    </div>
    </>
};

export default TagsInput;