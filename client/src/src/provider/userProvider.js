import { useState } from "react";
import AuthContext from "../context/authContext";

const UserProvider = ({children}) =>{
    //operational error in user setup;
    const [currentUser, setUser] = useState({isLoggedin: false, data: {}});

    //to keep data persistency
    // useEffect(()=>{
    //     const localUser = window.localStorage.getItem('currentUser');
    //    setUser(JSON.stringify(localUser)); 
    //    console.log(localUser);
    // },[]);

    // const setUserPersistency = (user) =>{
    //     window.localStorage.setItem('currentuser', JSON.stringify(user));
    // };

    const login = (user) =>{
        const data = {...currentUser, isLoggedin: true, data: user};
        // setUser({isLoggedin: true, data: user});
        setUser(data);
        // setUserPersistency(data);
    };

    const logout = () =>{
        setUser({isLoggedin :false , data :{}});    
    };
    
    return (
        <AuthContext.Provider value={{currentUser,login,logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserProvider;