import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Nav from './Nav';


const { REACT_APP_STRIPE_PUBLISHABLE_KEY } = process.env;

const stripePromise = loadStripe(REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Stripe = () => {
  const [donationAmount, setDonationAmount] = useState("$0.00");

  const toPaymentPage = async () => {
    if (donationAmount.match(/\d*.\d{2}/) && donationAmount.match(/\d*.\d{2}/)[0] === donationAmount && Number.parseFloat(donationAmount) >= 1) {
      const stripe = await stripePromise;
      axios.post('/api/donate', { donationAmount: (Number.parseFloat(donationAmount) * 100).toString() })
        .then(async res => {
          await stripe.redirectToCheckout({
            sessionId: res.data.id
          })
        })
        .catch(() => toast.error("Unfortunately, your donation did not process successfully. Please inform us of this issue by contacting us at BackyardRestorationNet@gmail.com, and we will work to resolve it as quickly as possible. Thank you for your attempted donation!"))
    } else {
      toast.warn('Please enter a value greater than 1 dollar in the format "0.00". Thank you!')
    }
  }

  return (
    <>
      <Nav />
      <ToastContainer />
      <div id="donationBox">
        <h2>Thank you for your donation!</h2>
        <h4>Please enter your preferred donation amount in the box provided using the format "0.00". Due to service charges, we are only accepting donations greater than $1.00.</h4>
        <div id="donationInput">
          <input value={donationAmount} onChange={(e) => setDonationAmount(e.target.value)} type='text' id='donationInput' onFocus={() => setDonationAmount("")} onBlur={() => setTimeout(() => setDonationAmount("$0.00"), 250)} />
          <button role="link" onClick={() => toPaymentPage()} >
            Proceed to Payment
        </button >
        </div>
      </div>
      <Link to="/dash">Back to Dashboard</Link>
    </>
  )
}

export default Stripe