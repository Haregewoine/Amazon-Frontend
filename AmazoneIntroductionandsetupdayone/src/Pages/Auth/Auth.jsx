import React ,{ useState,useContext }from "react";
import classes from "./Signup.module.css";
// import { Link } from "@mui/material";
import { Link , useNavigate } from "react-router-dom";
import { auth } from "../../utility/Fairebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { ClipLoader } from "react-spinners";  
import { DataContext } from "../../Component/DataProvider/DataProvider";

function Auth() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

const [Loding,setLoding]=useState({
  signIn:false,
  signup:false})

  const [{user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  //console.log(user);
  const authHandler = async (e) => {
    e.preventDefault(); // Fixing the typo
    console.log(e.target.name);

    if (e.target.name === "signIn") {
setLoding({...Loding, signIn:true })
      // Sign In with Firebase Auth
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
     dispatch({
            type: Type.set_user,
            user: userInfo.user,
          });
setLoding({...Loding,signIn:false})
navigate("/");

        })
        .catch((err) => {
          setError(err.message);
          setLoding({ ...Loding, signIn: false });
        });
    } else {
      // Sign Up with Firebase Auth
      setLoding({ ...Loding,signup:true})
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
       dispatch({
            type: Type.set_user,
            user: userInfo.user,
          });
          setLoding({ ...Loding, signup: false });

          navigate("/");
        })
          
      
        .catch((err) => {
        
          setError(err.message);
          setLoding({ ...Loding, signup: false });
        });
    }
  };
// **********************************************************
  return (
    <section className={classes.login}>
      {/* logo */}
      <Link to={"/"} >
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
            {Loding.signIn ? <ClipLoader color="white" size={20} /> : "Sign In"}
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
          {Loding.signup ? (
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












// import React from "react";
// import classes from "./Signup.module.css";
// import { Link } from "@mui/material";
// import { auth } from "../../utility/Fairebase";
// import{signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"

// function Auth() {

//   const [email, setEmail] = React.useState("");
//   const [password, setPassword] = React.useState("");
//   const[error, setError] = React.useState("");

// const authHandler = async(e) => {
// e.preventDefualt();
// console.log(e.target.name);

// }
// if(email.target.name === "signin"){

//   //firebase auth
//   signInWithEmailAndPassword(auth, email, password).then((userInfo) => {
//     // Signed in
//     console.log(userInfo);
//   }).catch((err) => {
//     console.log(err);

// });

// }
// else {
//   createUserWithEmailAndPassword(auth, email, password).then((userInfo) => {
//     console.log(userInfo);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// }

//   return (
//     <section className={classes.login}>
//       {/* logo */}

//       <Link>
//         <img
//           src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
//           alt="amazon logo"
//         />
//       </Link>

//       {/* form */}
//       <div className={classes.login__container}>
//         <h1>Sign In</h1>
//         <form action="">
//           <div>
//             <label htmlFor="email">Email</label>
//             <input value={email}
//              on change = {(e)=>setEmail(e.target.value)}
//              type="email"
//              id="email" />
//             <div></div>
//             <label htmlFor="password">Password</label>
//             <input value={password} on change = {(e)=>setPassword(e.target.value)} type="password" id="Password" />
//           </div>

//           <button type="submit" onClick={authHandler}
//           name="signIn"
//           className="login__signInButton"> sign In</button>
//         </form>
//         {/* agreement */}
//         <p>
//           By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
//           Sale. Please see our Privacy Notice, our Cookies Notice and our
//           Interest-Based Ads Notice.
//         </p>
//       <button type="submit" onClick={authHandler}
//       name="signup"
//       className={classes.login__registerButton}> Create your Amazon Account</button>
//       </div>
//     </section>
//   );
// }

// export default Auth;
