import classes from './Footer.module.css';

const Footer = () => {
    return <div className={classes.footer}>
        <div className={classes.txt_wrapper}>
       <p>
        <a href='https://dev.to/'> DEV Community</a>  👩‍💻👨‍💻 — A constructive and inclusive social network for software developers. With you every step of your journey.
        </p> 

    <p>
        Built on <a href='https://www.forem.com/'>Forem </a> — the <a href='https://dev.to/t/opensource'>open source </a> software that powers DEV and other inclusive communities.
    </p>
    
    <p>
        Made with love and <a href='https://dev.to/t/rails'>Ruby on Rails. </a> DEV Community 👩‍💻👨‍💻 © 2016 - 2022.
    </p>
        </div>
    </div>;
};

export default Footer;