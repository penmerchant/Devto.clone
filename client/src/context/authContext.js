import { createContext } from "react";

const AuthContext = createContext({
    isLoggedin : false,
    user : {},
});

export default AuthContext;
