import React, { useState } from 'react';
import LayOut from '../../components/LayOut/LayOut';
import classes from './Payment.module.css'
import { DataContext } from '../../components/DataProvider/DataProvider';
import { useContext } from 'react';
import  ProductCard from '../../components/Product/ProductCard';
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { colors } from '@mui/material';
import { red } from '@mui/material/colors';
import CurrencyFormat from '../../components/CurrencyFormat/CurrencyFormat';
import { axiosInstance } from '../../Api/axios';
import {ClipLoader} from 'react-spinners';
import { db } from '../../Utility/firebase';
import { useNavigate } from 'react-router-dom';
import { Type } from '../../Utility/action.type';

const Payment = () => {
  const [{user,basket},dispatch] = useContext(DataContext);
  console.log(user)


   const totalItem = basket?.reduce((amount, item) => {
     return item.amount + amount;
   }, 0);
   const total = basket.reduce((amount, item) => {
     return item.price * item.amount + amount;
   }, 0);

         const [cardError,setCardError]=useState("")
         const [processing ,setProcessing]=useState(false)
         const stripe = useStripe();
         const elements = useElements();
         const navigate= useNavigate()
         
         const handlechange=(e)=>{
          //console.log(e)
          e?.error?.message ? setCardError(e.error.message) : setCardError("");
         };

         const handlePayment= async(e)=>{
          e.preventDefault()
          try {
            setProcessing(true)
            //1. backend || function ---> contact to the client secret
            const response = await axiosInstance({
              method: "POST",
              url: `/payment/create?total=${total}`,
           });
            // const response = await axios.post(
            //   `https://amazon-api-deploy-1en6.onrender.com/payment/create?total=${total}`
            // );
           // console.log(response.data);
            const clientSecret = response.data?.clientSecret;
            //2. client side (react side confirmation )
            const {paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
              payment_method: {
                card: elements.getElement(CardElement),
              },
            });
            //console.log({paymentIntent);
            //3. after confirmation ---> order firestore database save , clear basket
           await db.collection("users").doc(user.uid).collection("orders").doc(paymentIntent.id).set({
            basket:basket,
            amount:paymentIntent.amount,
            created:paymentIntent.created
           })
       // empty the basket!!
    dispatch ({type:Type.EMPTY_BASKET});

          setProcessing(false);
         navigate("/orders", { state: { msg: "you have placed new order" } });

          } catch (error) {
            console.log(error)
            setProcessing(false)
          }


         }
 
  return (
    <LayOut>
      {/* <Header/> */}
      <div className={classes.payment_header}>Checkout ({totalItem}) items</div>
      {/* <payment method /> */}
      <section className={classes.payment}>
        {/* <address/> */}
        <div className={classes.card__flex}>
          <h3>Delivery Address </h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Seattle,Wa</div>
          </div>
        </div>
        <hr />
        {/* < product/> */}
        <div className={classes.card__flex}>
          <h3>Review Items & Delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* <card form/> */}
        <div className={classes.card__flex}>
          <h3>Payment Method</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_detail}>
              <form onSubmit={handlePayment}>
                {/* <error/> */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* <card element/> */}
                <CardElement onChange={handlechange} />
                {/* <price/> */}
                <div className={classes.payment_prise}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p> Total order |</p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {
                      processing? (
                        <div className={classes.loading}>
                        <ClipLoader color="gray" size={12}/>
                        <p>Please wait ...</p>
                        </div>

                      ):" Pay Now"
                    } 
                    </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;