import classes from './about.module.css';

const About = () => {
    return <div className={classes.body}>
        <div className={classes.container}>
            <h1>About DEV</h1>
            <p>DEV is a community of software developers getting together to help one another out. The software industry relies on 
                collaboration and networked learning. We provide a place for that to happen.</p>
               <p>
                DEV is built on Forem: open source software designed to empower communities.
                Because our application is open source, you can inspect every little detail of the code, or chip in yourself!
                Forem is available for anyone interested in creating similar communities in any niche or passion. Visit our meta Forem, forem.dev for more information.
                </p>
                <p>We believe in transparency and adding value to the ecosystem. We hope you enjoy poking around and participating!</p> 
                <p>Our team is distributed around the world. We have no office, but we come together online each day to build community and improve the software careers of millions.

Happy coding ❤️</p>
        </div>
    </div>
};

export default About;