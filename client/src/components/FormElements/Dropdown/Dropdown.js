import classes from './dropdown.module.css';


const DropDown = ({items, type, onChange}) => {
    
    const handleChanges = (e) => {
        // console.log(e.target.value);
        let {value} = e.target;
        onChange(value);
    };

    
    return <div className={classes.container}>
            <b>Select {type}</b>
            <select name="item" className={classes.list} onChange={handleChanges}>
                <option value="">--Please choose an option--</option>
                { items && items.map((item)=>{
                    return <option className={classes.options} value={item._id}>{item.name}</option>
                })
            }
        </select>
        </div>
};

export default DropDown;