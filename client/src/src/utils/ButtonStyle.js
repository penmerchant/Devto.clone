
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
        background: '#ca4f44',
        color: '#fff',
    };

    const btn_sign_out ={
        background: isHover? '#0f8b0a' : '#1ae811',
        color: '#fff',
        width: '100%',
    };

    const style = {

        btn_follow : {
            background: isHover? '#0a2123' : '#12383B',
            color: '#fff',
            width: '100%',
        },
    };

    const btn_edit = {
        background: isHover? '#191919' : '#000000',
        color : '#fff',
    };

    const btn_login ={
        background: isHover? '#003633' : '#004440',
        color: '#fff',
        width: '100%',
    };

    const btn_register ={
        background: isHover? '#191919' : '#000000',
        color: '#fff',
        width: '100%',
    };

    return {btn_post,
        btn_comment,
        btn_dismiss,
        btn_delete,
        btn_edit,
        btn_sign_out,
        btn_login,
        btn_register,
        style};
};

export default ButtonStyle;