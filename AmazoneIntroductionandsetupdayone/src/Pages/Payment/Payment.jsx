import React from "react";
import classes from "./Payment.module.css";
import Layout from "../../Component/Layout/Layout";

import { DataContext } from "../../Component/DataProvider/DataProvider";
import { useContext, useState } from "react";
import ProductCard from "../../Component/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

function Payment() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  //console.log(user);
  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);

const total = basket.reduce((amount, item) => {
  return item.price * item.amount + amount;
}, 0);




  const [cardError, setCardError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (e) => {
    console.log(e);
    e?.error?.message?.setCardError(e?.error?.message);
    setCardError(null);
  };

  return (
    <Layout>
      {/* header */}
      <div className={classes.payment__header}>checkout({totalItem})items</div>
      {/* payment method*/}

      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery address</h3>
          <div>
            <div>makeda@email.com</div>
            <div>123 React Lane</div>
            <div>virginia</div>
          </div>
        </div>
        <hr />
        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment method</h3>
          <div className={classes.payment__card__container}>
            <div className={classes.payment__details}>
              <form action="">
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* card element */}
                <CardElement onChange={handleChange} />

                {/* price */}
                <div className={classes.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order |</p> <currencyFormat amount={total} />
                    </span>
                  </div>

                  <button>pay Now</button>
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
