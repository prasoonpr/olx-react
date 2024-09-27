
import { useState,useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../../store/firebaseContext';
import {signInWithEmailAndPassword} from 'firebase/auth'
import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const {auth}=useContext(FirebaseContext)
  const navigate=useNavigate()
  const handleLogin= async (e)=>{
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth,email,password)
      await navigate('/')
    } catch (error) {
      alert(error.message)
    }
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            id="fname"
            name="email"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            id="lname"
            name="password"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
}

export default Login;
