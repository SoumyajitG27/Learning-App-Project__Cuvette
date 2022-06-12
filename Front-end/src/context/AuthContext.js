import { Email } from "@mui/icons-material";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { auth } from "../firebase";


export const UserAuth = createContext()

// const intitialUserState = {
//     user: localStorage.getItem('userInfo')
//         ? JSON.parse(localStorage.getItem('userInfo'))
//         : null
// }

// function reducer(state, action) {
//     // const auth = getAuth();
//     switch (action.type) {
//         case 'LOG_IN_USER':
//             onAuthStateChanged(auth, (user) => {
//                 console.log(user);
//                 localStorage.setItem('userInfo', JSON.stringify(user))
//                 return { ...state, user }
//             })
//         case 'LOG_OUT_USER':
//             onAuthStateChanged(auth, (user) => {
//                 console.log(user);
//                 localStorage.removeItem('userInfo')
//                 return { ...state, user }
//             })
//     }
// }

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
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log(currentUser);
        })
        // const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        //     console.log(currentUser);
        //     setUser(currentUser)
        // })
        // unsubscribe()
    }, [])
    //     const auth = getAuth();
    //     onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             // User is signed in, see docs for a list of available properties
    //             // https://firebase.google.com/docs/reference/js/firebase.User
    //             const uid = user.uid;
    //             setUser(user);
    //             console.log(user);
    //             // ...
    //         } else {
    //             // User is signed out
    //             // ...
    //             console.log(user);
    //         }
    //     })
    // }, [])

    // const [state, dispatch] = useReducer(reducer, intitialUserState);
    return (<UserAuth.Provider value={{ createUser, signIn, logOut, user }}>
        {children}
    </UserAuth.Provider>)

}

// export const useUserAuth = (() => useContext(UserAuth))