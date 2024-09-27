// import React from 'react';

import { useState,useContext } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/firebaseContext';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {collection,addDoc} from 'firebase/firestore'

export default function Signup() {
  const [username,setUsername]=useState('')
  const [email,setEmail]=useState('')
  const [phone,setPhone]=useState('')
  const [password,setPassword]=useState('')
  const navigate=useNavigate()
  const {auth, db }=useContext(FirebaseContext)
  const handleDetails=async(e)=>{
    e.preventDefault();
   try {
    const userCredential=await createUserWithEmailAndPassword(auth,email,password)
    const user=userCredential.user
     await updateProfile(user,{
      displayName:username
     });
    await addDoc(collection(db,'users'),{
      username,
      email,
      phone,
      uid:user.uid
    })
    await navigate('/login')
    
   } catch (error) {
    console.log(error);
    
    alert(error.message)
   }
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleDetails}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={username}
            onChange={(e)=>{setUsername(e.target.value)}}
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            value={phone}
            onChange={(e)=>{setPhone(e.target.value)}}
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
