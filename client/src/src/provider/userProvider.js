import { useState } from "react";
import AuthContext from "../context/authContext";

const UserProvider = ({children}) =>{
    //operational error in user setup;
    const [currentUser, setUser] = useState({isLoggedin: false, user: {}});
    const login = (user) =>{
        setUser({ isLoggedin :true , user : user});
    };

    const logout = () =>{
        setUser({isLoggedin :false , user :{}});
    };

    return (
        <AuthContext.Provider value={{currentUser,login,logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserProvider;