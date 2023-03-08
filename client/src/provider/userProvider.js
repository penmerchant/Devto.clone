import { useState, useEffect } from "react";
import AuthContext from "../context/authContext";

const UserProvider = ({children}) =>{
    //operational error in user setup;
    const [currentUser, setUser] = useState({isLoggedin: false, data: {}});

    // to keep data persistency
    useEffect(()=>{
        try {
            const localUser = JSON.parse(localStorage.getItem('currentuser'));
            setUser({data: localUser.data, isLoggedin: localUser.isLoggedin}); 
        } catch(error) {
            console.log('User has already logged out');
        }
    //    console.log(localUser);
    },[]);

    const setUserPersistency = (user) =>{
        window.localStorage.setItem('currentuser', JSON.stringify(user));
    };

    const login = (user) =>{
        const data = {...currentUser, isLoggedin: true, data: user};
        // setUser({isLoggedin: true, data: user});
        setUser(data);
        setUserPersistency(data);
    };

    const logout = () =>{
        setUser({isLoggedin :false , data :{}});
        localStorage.removeItem('currentuser');    
    };
    
    return (
        <AuthContext.Provider value={{currentUser,login,logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserProvider;