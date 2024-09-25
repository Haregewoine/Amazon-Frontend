import React from "react";
import classes from "./Payment.module.css";
import Layout from "../../Component/Layout/Layout";
import { DataContext } from "../../Component/DataProvider/DataProvider";
import { useContext } from "react";
import ProductCard from "../../Component/Product/ProductCard";

function Payment() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  //console.log(user);
  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);
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
          <div>
            <div>
              <form action="">

              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;
