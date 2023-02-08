
const ButtonStyle = (isHover) =>{
    const btn_post = {
        background: isHover? '#113a86 ':'#1D61E0',
        color: '#fff',
    };
    
    const btn_comment = {
        background: '#51098A',
        color: '#fff',
        
    };

    const btn_dismiss = {
        background: '#85959A',
        color: '#fff',

    };

    const btn_delete = {

    };
    const style = {

        btn_follow : {
            background: isHover? '#0a2123' : '#12383B',
            color: '#fff',
            width: '100%',
        },
    };

    const btn_edit = {
        background: '#000000',
        color : '#fff',
    };

    return {btn_post,
        btn_comment,
        btn_dismiss,
        btn_delete,
        btn_edit,
        style};
};

export default ButtonStyle;