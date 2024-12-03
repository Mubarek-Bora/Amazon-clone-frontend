import React, { useState } from 'react'
import classes from './Auth.module.css'
import { Link, useNavigate,useLocation } from 'react-router-dom';
import {auth} from '../../Utility/firebase'
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth'
import { useContext } from 'react';
import { DataContext } from '../../components/DataProvider/DataProvider';
import { Type } from '../../Utility/action.type';
import {ClipLoader}  from 'react-spinners'

const Auth = () => {
const[email,setEmail]=useState("")
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const[{user}, dispatch] = useContext(DataContext)
const[loading,setLoading]=useState({
  signIn:false,
  signup:false,
})
const navigate = useNavigate();
const navStateData = useLocation();
 console.log(navStateData);

const authHandler= async(e)=>{
   e.preventDefault();
  console.log(e.target.name);
  if(e.target.name=="Signin") {
 //firebase auth
 setLoading({...loading,signIn:true})
signInWithEmailAndPassword(auth,email,password).then((userInfo)=>{
  console.log(userInfo);
  dispatch({
    type:Type.SET_USER,
    user:userInfo.user
  })
  setLoading({...loading,signIn:false})
  navigate (navStateData?.state?.redirect || "/")
})
.catch((err)=>{
  setError(err.message);
  setLoading({ ...loading, signIn: false });
})
  } else {
setLoading({...loading,signup:true})
createUserWithEmailAndPassword(auth,email,password)
.then((userInfo)=>{

dispatch({
    type:Type.SET_USER,
    user:userInfo.user
  })
setLoading({ ...loading, signup: false });
navigate(navStateData?.state?.redirect || "/");
})
.catch((err)=>{
  setError(err.message);
  setLoading({ ...loading, signup: false });
});
  }

};

//console.log(email,password)
  return (
    <section className={classes.login}>
      {/* <logo/> */}
      <Link to="/">
        <img
          src="https://en.wikichip.org/w/images/a/a9/Amazon_logo.svg"
          alt="Amazon logo"
        />
      </Link>
      {/* <form/> */}
      <div className={classes.login_container}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}

        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            name="Signin"
            type="submit"
            onClick={authHandler}
            className={classes.login_signInButton}
          >
            {loading.signIn ? <ClipLoader color="#000" size={15} /> : "Sign In"}
          </button>
        </form>
        {/* <agreement/> */}
        <p>
          <p>
            By signing in, you agree to the{" "}
            <span style={{ color: "blue", fontWeight: "bold" }}>
              AMAZON CLONE
            </span>{" "}
            Conditions of Use & Sale. Please see our Privacy Notice, Cookies
            Notice, and Interest-Based Ads Notice.
          </p>
        </p>

        {/* <creat account btn/> */}
        <button
          name="signup"
          type="submit"
          onClick={authHandler}
          className={classes.login_registerButton}
        >
          {loading.signup ? <ClipLoader color="#000" size={15} /> : "Sign up"}
          Creat Your Amazon Account
        </button>
        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;