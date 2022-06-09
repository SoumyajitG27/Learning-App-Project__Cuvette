import { Email } from "@mui/icons-material";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";


export const UserAuth = createContext()

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(
        localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null
    )

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
        // onAuthStateChanged(auth, (currentUser) => {
        //     if (currentUser) {
        //         setUser(currentUser);
        //         console.log(currentUser);
        //     }
        //     else {
        //         setUser(null)
        //     }
        // })
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser);
            setUser(currentUser)
        })
        return () => {
            unsubscribe()
        }
    }, [])

    return (<UserAuth.Provider value={{ createUser, signIn, logOut, user, setUser }}>
        {children}
    </UserAuth.Provider>)

}