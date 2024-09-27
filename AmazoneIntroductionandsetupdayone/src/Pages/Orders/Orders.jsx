
import React, { useContext, useState, useEffect } from "react";
import Layout from "../../Component/Layout/Layout";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import classes from "./Orders.module.css";
import { db } from "../../utility/Fairebase";
import { DataContext } from "../../Component/DataProvider/DataProvider";
import ProductCard from "../../Component/Product/ProductCard";

function Orders() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [Orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      
      db.collection("users").doc(user.uid).collection("Orders").orderBy("created", "desc").onSnapshot((snapshot) => 
        {setOrders(snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });

      // Cleanup subscription on unmount
      return () => unsubscribe();
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.Orders__container}>
          <h2>Your Orders</h2>

          {/* Render ordered items */}
          {Orders.length > 0 ? (
            Orders.map((eachOrder, i) => (
              <div key={eachOrder.id}>
                <hr />
                <p>Order ID: {eachOrder?.id}</p>
                <div>
                  {eachOrder?.data?.basket?.map((orderItem) => (
                    <ProductCard
                      flex={true}
                      product={orderItem}
                      key={orderItem.id}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>No Orders found.</p>
          )}
        </div>
      </section>
    </Layout>
  );
}

export default Orders;







































// import React,{useContext,useState,useEffect} from 'react'
// import Layout from '../../Component/Layout/Layout'
// //import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
// import classes from './Orders.module.css'
// import { db } from '../../utility/Fairebase'
// import { DataContext } from '../../Component/DataProvider/DataProvider'
// import ProductCard from '../../Component/Product/ProductCard';

// function Orders() {
//   const[{user},dispatch]=useContext(DataContext)
//   const [Orders,setOrders]=useState([])

//    useEffect(() => {
//   if(user){
// // const unsubscribe = 
//        db.collection("users")
// .doc(user.uid)
// .collection("Orders")
// .orderBy("created","desc")
// .onSnapshot((snapshot)=>{
//   console.log(snapshot);
//         setOrders(snapshot.docs.map((doc)=>({
//           id:doc.id,
//           data:doc.data(),
//         }))
//       );
//       })

//     }else{
//       setOrders([]);
//     }
//   }, []);

//   return (
//     <Layout>
//       <section className={classes.container}>
//       <div className={ classes.Orders__container}>
//         <h2>your Orders</h2>
//          {/* ordered items  */}
        
//           {Orders?.length == 0 && (
//             <div style={{ padding: "20px" }}>you don't have Orders yet.</div>
//           )} 
//           <div>
//           {Orders?.map((eachOrder, i)=>{
//             return(
//               <div key={i}>
// <hr/>
// <p>Order ID:{eachOrder?.id}</p>
// {eachOrder?.data?.basket?.map((order)=>
// (
//     <ProductCard  
//     flex={true}
//      product={order} 
//      key={order.id}/>
    
//   ))}

// </div>
//   );
// })}
//     </div>
// </div>
//   </section>
//     </Layout>
//   );
// }
// export default Orders
