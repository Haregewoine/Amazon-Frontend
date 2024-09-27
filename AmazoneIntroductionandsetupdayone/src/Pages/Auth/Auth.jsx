import React, { useState, useContext } from "react";
import classes from "./Signup.module.css";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { auth } from "../../utility/Fairebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { ClipLoader } from "react-spinners";
import { DataContext } from "../../Component/DataProvider/DataProvider";
import { Type } from "../../utility/action.type";
function Auth() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const [Loading, setLoading] = useState({
    signIn: false,
    signup: false,
  });

  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();

  const navStateData = useLocation();
    
  // console.log(navStateData);
  const authHandler = async (e) => {
    e.preventDefault(); // Fixing the typo
    //  console.log(e.target.name);

    if (e.target.name === "signIn") {
      setLoading({ ...Loading, signIn: true });
      // Sign In with Firebase Auth
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...Loading, signIn: false });
          navigate(navStateData?.state?.redirect ||"/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...Loading, signIn: false });
        });
    } else {
      // Sign Up with Firebase Auth
      setLoading({ ...Loading, signup: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...Loading, signup: false });

           navigate(navStateData?.state?.redirect ||"/");
        })

        .catch((err) => {
          setError(err.message);
          setLoading({ ...Loading, signup: false });
        });
    }
  };
  // **********************************************************
  return (
    <section className={classes.login}>
      {/* logo */}
      <Link to={"/"}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt="amazon logo"
        />
      </Link>

      {/* form */}
      <div className={classes.login__container}>
        <h1> Sign In</h1>

        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData.state.msg}
          </small>
        )}

        {/* form */}
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Fixed onChange
              type="email"
              id="email"
            />
            <div></div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Fixed onChange
              type="password"
              id="password"
            />
          </div>

          <button
            type="submit"
            onClick={authHandler}
            name="signIn" // This is for the sign-in action
            className={classes.login__signInButton}
          >
            {Loading.signIn ? (
              <ClipLoader color="white" size={20} />
            ) : (
              "Sign In"
            )}
            {/* Sign In */}
          </button>
        </form>
        {/* agreement */}
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <button
          type="submit"
          onClick={authHandler}
          name="signup" // This is for the sign-up action
          className={classes.login__registerButton}
        >
          {Loading.signup ? (
            <ClipLoader color="white" size={20} />
          ) : (
            "Create your Amazon Account"
          )}
        </button>

        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;

