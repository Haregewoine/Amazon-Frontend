import React from "react";
import classes from "./Signup.module.css";
import { Link } from "@mui/material";
import { auth } from "../../utility/Fairebase";
function Auth() {
  
  return (
    <section className={classes.login}>
      {/* logo */}

      <Link>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt="amazon logo"
        />
      </Link>

      {/* form */}
      <div className={classes.login__container}>
        <h1>Sign In</h1>
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
            <div></div>
            <label htmlFor="password">Password</label>
            <input type="password" id="Password" />
          </div>

          <button className="login__signInButton"> sign In</button>
        </form>
        {/* agreement */}
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <button > Create your Amazon Account</button>
      </div>
    </section>
  );
}

export default Auth;
