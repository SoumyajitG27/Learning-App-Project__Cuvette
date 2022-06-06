import { Email } from "@mui/icons-material";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext } from "react";
import { auth } from "../firebase";


export const UserAuth = createContext()

export const AuthContextProvider = ({ children }) => {

    const createUser = (email, pass) => {
        return createUserWithEmailAndPassword(auth, email, pass)
    }

    const signIn = (email, pass) => {
        return signInWithEmailAndPassword(auth, email, pass)
    }

    const logOut = () => {
        return signOut(auth)
    }

    return <UserAuth.Provider value={{ createUser, signIn, logOut }}>
        {children}
    </UserAuth.Provider>

}