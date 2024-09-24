import React, { useEffect,useContext } from "react";
import Routing from "./Router.jsx";
//import { DataContext } from "./utility/DataProvider.jsx";
import { Type } from "./utility/action.type.jsx";
import { auth } from "./utility/Fairebase.jsx";
import { DataContext } from "./Component/DataProvider/DataProvider.jsx";


function App() {
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // console.log(authUser);
        dispatch({
          type: Type.set_user,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.set_user,
          user: null,
        });
      }
    });
  }, []);

  return <Routing />;
}

export default App;

