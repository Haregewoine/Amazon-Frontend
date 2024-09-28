import { useEffect, useState, useContext } from "react";
import Routing from "./Router.jsx";
import { auth } from "./Utility/Fairebase.js";
import { DataContext } from "./Component/DataProvider/DataProvider";
import { Type } from "./utility/action.type.js";

function App() {
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({ type: Type.SET_USER, user: null });
      }
    });
  }, []);
  return (
    <>
      <Routing />
    </>
  );
}

export default App;
