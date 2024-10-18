import React from "react";
import classes from "./Payment.module.css";
import Layout from "../../Component/Layout/Layout";

import { DataContext } from "../../Component/DataProvider/DataProvider";
import { useContext, useState } from "react";
import ProductCard from "../../Component/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../utility/Fairebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../utility/action.type";
function Payment() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  //console.log(user);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket?.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setprocessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    // console.log(e);
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlepayment = async (e) => {
    e.preventDefault();
    try {
      setprocessing(true);
      // backend call to get client secret
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
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
        // .collection("users").doc(user?.uid)
        .collection("users")
        .doc(user.uid)
        .collection("Orders")
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
      navigate("/Orders", { state: { msg: "you have placed new order" } });
    } catch (error) {
      console.log(error);
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
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>please wait...</p>
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
