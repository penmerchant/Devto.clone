import { useEffect, useState } from "react";
import classes from './TagsInput.module.css';

const TagsInput = (props) => {
    const [tags, setTags] = useState([]);
    const [valid , setValid] = useState(false);
    
    console.log(props.tags);

    useEffect(()=>{
        setTags(props.tags);
    },[props.tags]);

    const onKeyPress = (e) => {
        
        const tag = e.target.value;
        if(!tag.trim()) return;
        if(e.key === 'Enter'){
            setTags([...tags, tag]);
            e.target.value = '';
            setValid(true);
        }
        if(tags.length === 0){
            setValid(false);
        }
        props.onChange(props.label.toLowerCase(), [...tags, tag], valid);
    };

    const removeTags = (removedIndex) =>{
        const removedTag = tags[removedIndex];
        const updatedTags = tags.filter((tag) => tag !== removedTag);
        setTags(updatedTags);

        props.onChange(props.label.toLowerCase(), [tags], true);
    };


    return <>
    { <p>{props.label}</p>}
    <div className={classes.container}>
    {   
        tags && tags.map((tag,index)=>{
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