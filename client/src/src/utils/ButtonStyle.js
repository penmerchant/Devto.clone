
const ButtonStyle = () =>{
    const btn_post = {
        background: '#1D61E0',
        color: '#fff',
    };
    
    const btn_comment = {
        background: '#51098A',
        color: '#fff',
    };

    const btn_dismiss = {
        background: '#85959A',
        color: '#353A3B',

    };

    const btn_delete = {

    };
    const btn_follow = {
        background: '#12383B',
        color: '#fff',
        width: '100%',
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
        btn_follow};
};

export default ButtonStyle;