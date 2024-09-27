/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import {firebaseApp,auth, db, storage} from '../firebase/config'

export const FirebaseContext=createContext(null);
export const AuthContext=createContext(null)

const FirebaseProvider=({children})=>{
    return(
        <FirebaseContext.Provider value={{firebaseApp,auth,db,storage}}>
            {children}
        </FirebaseContext.Provider>
    )
}
const UserDetails=({children})=>{
    const [user,setUser]=useState(null)
    return(
        <AuthContext.Provider value={{user,setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export  {FirebaseProvider,UserDetails};
