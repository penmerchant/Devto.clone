import { useState } from "react";
import AuthContext from "../context/authContext";

const UserProvider = ({children}) =>{
    const [user, setUser] = useState({isLoggedIn: false, user: {}});

    const login = (user) =>{
        setUser({
            isLoggedIn: true,
            user : user,
        });
    };

    const logout = () =>{
        setUser({
            isLoggedIn: false,
            user : {},
        });
    };

    return (
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserProvider;