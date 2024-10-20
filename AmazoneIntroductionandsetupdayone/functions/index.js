const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();

// CORS middleware to allow all origins (you can restrict this in production)
app.use(cors({ origin: true }));

// Middleware to parse JSON bodies
app.use(express.json());

// Simple GET route for testing
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Success!",
  });
});

// POST route to create a payment
app.post("/payment/create", async (req, res) => {
  const total = parseInt(req.query.total);

  try {
    // Ensure the total is a valid number and greater than 0
    if (total > 0) {
      // Stripe requires the amount to be in cents for USD
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // Ensure total is in cents for USD
        currency: "usd",
      });

      // Return the client secret for the payment intent
      res.status(201).json({
        clientSecret: paymentIntent.client_secret,
      });
    } else {
      res.status(403).json({
        message: "Total must be greater than 0",
      });
    }
  } catch (error) {
    logger.error("Error creating payment intent:", error);
    res.status(500).json({
      message: "Payment failed",
      error: error.message,
    });
  }
});

// Export the API function to Firebase Functions
exports.api = onRequest(app);

// const { onRequest } = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// dotenv.config();
// const stripe = require("stripe")(process.env.STRIPE_KEY);

// const app = express();
// app.use(cors({ origin: true }));

// app.use(express.json());
// app.get("/", (req, res) => {
//   res.status(200).json({
//     message: "Success!",
//   });
// });

// app.post("/payment/create", async (req, res) => {
//   const total = parseInt(req.query.total);

//   if (total > 0) {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: total,
//       currency: "usd",
//     });

//     res.status(201).json({
//       clientSecret:paymentIntent.client_secret
//     }
//     );

//   } else {

//     res.status(403).json({
//       message: "total must be greater than 0",
//     });
//   }
// });
// exports.api = onRequest(app);
