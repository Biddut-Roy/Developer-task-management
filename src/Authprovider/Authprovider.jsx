
import PropTypes from 'prop-types';
import auth from "../Firebase/Firebase.init";
import { GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { createContext, useEffect, useState } from 'react';


export const AuthContext = createContext(null)
const Authprovider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const googleEntry = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const githubEntry = () => {
        setLoading(true)
        return signInWithPopup(auth, githubProvider)
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false)

        })
        return () => {
            unsubscribe();
        }

    }, [])

    const info = {
        user,
        loading,
        logOut,
        googleEntry,
        githubEntry
    }

    return (

        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>

    );
};

Authprovider.propTypes = {
    children: PropTypes.node.isRequired,
};



export default Authprovider;