
import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Landing from './pages/Landing/Landing';
import Payment from './pages/Payment/Payment';
import Orders from './pages/Orders/Orders';
import Cart from './pages/Cart/Cart';
import Results from './pages/Results/Results';
import ProductDetail from './pages/ProductDetail/ProductDetail'
import Auth from './pages/Auth/Auth';
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

 const stripePromise = loadStripe( "pk_test_51QOuWQG6PqXQt872rwZ3JX9IeNCM5mYr8nrzwnEVxsdPLzmQQlen2uklli9MXUCSkKWyaL52f2jMSjIpJoRTVEHn002gYkM5wH" );
  
const Routering = () => {

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/payments"
        element={
          <ProtectedRoute msg={"You should login to pay"} redirect={"/payments"}>
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute msg={"You should login to access your orders"} redirect={"/orders"}>
            <Orders />
          </ProtectedRoute>
        }
      />
      <Route path="/Category/:categoryName" element={<Results />} />
      <Route path="/products/:productId" element={<ProductDetail />} />
      <Route path="/Cart" element={<Cart />} />
    </Routes>
  );
}

export default Routering;