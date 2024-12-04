
const { onRequest } = require('firebase-functions/v2/https');
//const logger = require("firebase-functions/logger");
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { setGlobalOptions } = require('firebase-functions');
dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_KEY);

setGlobalOptions({maxInstances:10})

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Define routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "Success!" });
});

app.post("/payment/create", async (req, res) => {
  const total = parseInt(req.query.total);

  // Validate that 'total' is greater than 0
  if (total > 0) {
    try {
      // Create a payment intent using Stripe
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd", // Correct property name
      });
      // Respond with the created payment intent
      res.status(201).json({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      // Handle errors from Stripe API
      console.error("Error creating payment intent:", error);
      res.status(500).json({ error: "Failed to create payment intent." });
    }
  } else {
    // If 'total' is not valid
    res.status(403).json({
      message: "Total must be greater than 0",
    });
  }
});

// Export the app for Firebase Functions
exports.api = onRequest(app);





/*import { onRequest } from "firebase-functions/v2/https"; // Updated Firebase Functions import
import { error as _error } from "firebase-functions/logger";
import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";
import { setGlobalOptions } from "firebase-functions";
// Load environment variables
config();
setGlobalOptions ({maxInstances:10})


// Validate Stripe API key
if (!process.env.STRIPE_KEY) {
throw new Error("STRIPE_KEY is missing in the environment variables.");
// }
const stripe = require("stripe")(process.env.STRIPE_KEY);

// Initialize Express app
const app = express();
app.use(cors({ origin: process.env.ALLOWED_ORIGINS?.split(",") || "*" }));
app.use(json());

// Define routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "Success!" });
});

app.post("/payment/create", async (req, res) => {
  const total = parseInt(req.query.total, 10);

  // Validate 'total'
  if (isNaN(total) || total <= 0) {
    return res
      .status(400)
      .json({ message: "Invalid or missing 'total' query parameter." });
  }

  try {
    // Create a payment intent using Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });

    // Respond with the created payment intent
    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    // Handle errors from Stripe API
    error("Error creating payment intent:", error);
    res.status(500).json({ error: "Failed to create payment intent." });
  }
});

export const api = onRequest(app); */

