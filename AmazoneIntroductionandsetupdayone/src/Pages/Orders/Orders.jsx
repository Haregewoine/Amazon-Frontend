import React, { useContext, useState, useEffect } from "react";
import Layout from "../../Component/Layout/Layout";
import classes from "./Orders.module.css";
import { db } from "../../utility/Fairebase";
import { DataContext } from "../../Component/DataProvider/DataProvider";
import ProductCard from "../../Component/Product/ProductCard";

function Orders() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("Orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          console.log(snapshot);
          console.log(snapshot.docs);
          console.log(user);
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, []);

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.orders__container}>
          <h2>Your Orders</h2>
          {orders?.length == 0 && (
            <div style={{ padding: "20px" }}>you don't have orders yet.</div>
          )}
          {/* ordered items */}
          <div>
            {orders?.map((eachOrder, i) => {
              return (
                <div key={i}>
                  <hr />
                  <p>Order ID: {eachOrder?.id}</p>
                  {eachOrder?.data?.basket?.map((order) => (
                    <ProductCard flex={true} product={order} key={order.id} renderAdd={false} />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Orders;



// import React, { useContext, useState, useEffect } from "react";
// import Layout from "../../Component/Layout/Layout";
// import classes from "./Orders.module.css";
// import { db } from "../../utility/Fairebase";
// import { DataContext } from "../../Component/DataProvider/DataProvider";
// import ProductCard from "../../Component/Product/ProductCard";

// function Orders() {
//   const [{ user }, dispatch] = useContext(DataContext);
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
    // console.log("Current user:", user); // Logs user
//     if (user) {
//       db.collection("users")
//         .doc(user.uid)
//         .collection("orders")
//         .orderBy("created", "desc")
//         .onSnapshot((snapshot) => {
//           console.log(snapshot);
//           setOrders(
//             snapshot.docs.map((doc) => ({
//               id: doc.id,
//               data: doc.data(),
//             }))
//           );
//           {console.log(orders)}
//         });
//     } else {
//       setOrders([]);
//     }
//   }, []);
//   return (
//     <Layout>
//       <section className={classes.container}>
//         <div className={classes.orders__container}>
//           <h2>Your Orders</h2>
//           {orders?.length == 0 && (
//             <div style={{ padding: "20px" }}>you don't have orders yet.</div>
//           )}
//           {/* ordered items */}
//           <div>
//             {orders?.map((eachOrder, i) => {
//               return (
//                 <div key={i}>
//                   <hr />
//                   <p>Order ID: {eachOrder?.id}</p>
//                   {eachOrder?.data?.basket?.map((order) => (
//                     <ProductCard flex={true} product={order} key={order.id} />
//                   ))}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>
//     </Layout>
//   );
// }

// export default Orders;
