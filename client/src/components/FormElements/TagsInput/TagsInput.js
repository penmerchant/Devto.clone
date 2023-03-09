import { useEffect, useState } from "react";
import classes from "./TagsInput.module.css";

const TagsInput = (props) => {
    const [tags, setTags] = useState([]);
    const [valid , setValid] = useState(false);
    
    useEffect(()=>{
        setTags(props.tags);
    },[props.tags, setTags]);
    
    const onChange = (e) => {
        
        const tag = e.target.value;
        if(!tag.trim()) return;
        if(e.key === 'Enter'){
            setTags((tags)=>[...tags, tag]);
            e.target.value = '';
            setValid(true);
            props.onChange(props.label.toLowerCase(), [...tags, tag], valid);
        }
        if(tags.length === 0){
            setValid(false);
        }
    };

    const removeTags = (removedIndex) =>{
        const removedTag = tags[removedIndex];
        const updatedTags = tags.filter((tag) => tag !== removedTag);
        setTags(updatedTags);

        props.onChange(props.label.toLowerCase(), updatedTags, true);
    };


    return <>
    { <b>{props.label}  (Press 'Enter' to add tag)</b>}
    <div className={classes.container}>
        <div className={classes.grid_tags}>

    {   
        tags && tags.map((tag,index)=>{
            return <div>
                <div className={classes.tags}>
                    <p>{tag}</p>
                    <span onClick={()=>removeTags(index)} className={classes.btn}>x</span>
                </div>
            </div>
        })
    }
    </div>
    <div>
        <input id={props.id}
            className={classes.input}
            type={props.text}
            onKeyDown={onChange}
            placeholder={props.placeholder}/> 
        </div>
    </div>
    </>
};

export default TagsInput;