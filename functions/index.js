const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
app.use(cors({ origin: true }));

app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Success!",
  });
});

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;

  if (total > 0) {
    console.log("payment received", total);
    res.send(total);

    // const paymentIntent = await stripe.paymentIntents.create({
    //     amount: total, // subunits of the currency
    //     currency: "usd",
    // });
    // res.status(201).send({
    //     clientSecret: paymentIntent.client_secret,
    // });
  }
});
exports.api = onRequest(app);
