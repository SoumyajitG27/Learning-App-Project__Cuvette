import { Email } from "@mui/icons-material";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";


export const UserAuth = createContext()

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null)

    const createUser = (email, pass) => {
        return createUserWithEmailAndPassword(auth, email, pass)
    }

    const signIn = (email, pass) => {
        return signInWithEmailAndPassword(auth, email, pass)
    }

    const logOut = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser);
            setUser(currentUser)
        })
        unsubscribe()
    }, [])

    return <UserAuth.Provider value={{ createUser, signIn, logOut, user }}>
        {children}
    </UserAuth.Provider>

}