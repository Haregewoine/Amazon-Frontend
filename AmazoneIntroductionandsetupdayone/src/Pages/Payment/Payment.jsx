import React from "react";
import classes from "./Payment.module.css";
import Layout from "../../Component/Layout/Layout";

import { DataContext } from "../../Component/DataProvider/DataProvider";
import { useContext, useState } from "react";
import ProductCard from "../../Component/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { axiosInstance } from "../../Api/axios.jsx";
import { ClipLoader } from "react-spinners";
import { db } from "../../utility/Fairebase.jsx";
import { useNavigate } from "react-router-dom";
function Payment() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  //console.log(user);
  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setprocessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    // console.log(e);
    e?.error?.message?.setCardError(e?.error?.message);
    setCardError("");
  };

  const handlepayment = async (e) => {
    e.preventDefault();
    try {
      setprocessing(true);
      // backend call to get client secret
      const response = await axiosInstance({
        method: "post",
        url: `/payments/create?total=${total * 100}`,
      });

      // console.log(response.data);
      const clientSecret = response.data?.clientSecret;

      // //2.clinet side (react side confirmation

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      // console.log(paymentIntent);
      // //3. after the the confirmation ---->order firestore database save,clear basket);
      await db
        .collection("users")
        .doc(user?.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
      // empity the basket
      dispatch({
        type: Type.EMPTY_BASKET,
      });

      setprocessing(false);
      navigate("/orders", { state: { msg: "you have placed new order" } });
    } catch (error) {
      console.error(error);
      setprocessing(false);
    }
  };

  // The Payment function continues below

  return (
    <Layout>
      {/* header */}
      <div className={classes.payment__header}>
        checkout ({totalItem}) items
      </div>
      {/* payment method */}
      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery address</h3>
          <div>
            <div>makeda@email.com</div>
            <div>123 React Lane</div>
            <div>Virginia</div>
          </div>
        </div>
        <hr />
        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard key={item.id} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment method</h3>
          <div className={classes.payment__card__container}>
            <div className={classes.payment__details}>
              <form onSubmit={handlepayment}>
                {/* error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* card element */}
                <CardElement onChange={handleChange} />
                {/* price */}
                <div className={classes.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order |</p>
                      <span>
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(total)}
                      </span>
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div classesName={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <P>please wait...</P>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;

//   const handleChange = (e) => {
//     console.log(e);
//     e?.error?.message?.setCardError(e?.error?.message);
//     setCardError("");
//   };
//   const handlepayment = async (e) => {
// e.preventDefault();
// try {
//  // backend|| function-->contact to the client secret
//   const response = await axiosInstance({
//     method:"post",
//     url: `/payments/create?total =>${total}`,
//   });

//   console.log(response.data)

// } catch (error) {

// }

// }

// //2.clinet side (react side confirmation

// // after the the confirmation ---->order firestore database save,clear basket);

//   };

//   return (
//     <Layout>
//       {/* header */}
//       <div className={classes.payment__header}>checkout ({totalItem})items</div>
//       {/* payment method*/}

//       <section className={classes.payment}>
//         {/* address */}
//         <div className={classes.flex}>
//           <h3>Delivery address</h3>
//           <div>
//             <div>makeda@email.com</div>
//             <div>123 React Lane</div>
//             <div>virginia</div>
//           </div>
//         </div>
//         <hr />
//         {/* product */}
//         <div className={classes.flex}>
//           <h3>Review items and delivery</h3>
//           <div>
//             {basket?.map((item) => (
//               <ProductCard product={item} flex={true} />
//             ))}
//           </div>
//         </div>
//         <hr />
//         {/* card form */}
//         <div className={classes.flex}>
//           <h3>Payment method</h3>
//           <div className={classes.payment__card__container}>
//             <div className={classes.payment__details}>
//               <form onSubmit={handlepayment}>
//                 {/* error */}
//                 {cardError && (
//                   <small style={{ color: "red" }}>{cardError}</small>
//                 )}
//                 {/* card element */}
//                 <CardElement onChange={handleChange} />

//                 {/* price */}
//                 <div className={classes.payment__price}>
//                   <div>
//                     <span style={{ display: "flex", gap: "10px" }}>
//                       <p>Total Order |</p> <currencyFormat amount={total} />
//                     </span>
//                   </div>

//                   <button type="submit">pay Now</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//     </Layout>
//   );

// export default Payment;
