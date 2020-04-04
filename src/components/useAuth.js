import React, { useContext, useEffect } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../firebase.config";
import { useState, createContext } from "react";
import { Route, Redirect } from 'react-router-dom'

firebase.initializeApp(firebaseConfig);

const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const auth = Auth();
    return (<AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>)
}

const useAuth = () => useContext(AuthContext);

export { AuthContextProvider, useAuth }

export const PrivateRoute = ({ children, ...rest }) => {
    const auth = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.user ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
}
const getUserInfo = (user) => {
    const { displayName, email, photoURL } = user;
    return { name: displayName, email, photo: photoURL }
}

const Auth = () => {

    const [user, setUser] = useState(null)

    const provider = new firebase.auth.GoogleAuthProvider();

    const signInWithGoogle = () => {
        return firebase.auth().signInWithPopup(provider)
            .then(res => {
                const signedInUser = getUserInfo(res.user);
                setUser(signedInUser)
                return res.user;
            })
            .catch(error => {
                setUser(null)
                return error.message
            })
    }

    const signOut = () => {
        return firebase.auth().signOut().then(function () {
            setUser(null)
        }).catch(function (error) {
            // An error happened.
        });
    }


    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (usr) {
            if (usr) {
                const currentUser = getUserInfo(usr)
                setUser(currentUser)
                //console.log(currentUser)
            } else {
                // No user is signed in.
            }
        });

    }, [])
    return {
        signInWithGoogle,
        user,
        signOut
    }
}

export default Auth;