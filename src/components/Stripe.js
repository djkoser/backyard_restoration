import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';


const { REACT_APP_STRIPE_PUBLISHABLE_KEY } = process.env;

const stripePromise = loadStripe(REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Stripe = () => {
  const [donationAmount, setDonationAmount] = useState("0.00");

  const toPaymentPage = async () => {
    if (donationAmount.match(/\d*.\d{2}/) && donationAmount.match(/\d*.\d{2}/)[0] === donationAmount && Number.parseFloat(donationAmount) >= 1) {
      const stripe = await stripePromise;
      axios.post('/api/donate', { donationAmount: (Number.parseFloat(donationAmount) * 100).toString() })
        .then(async res => {
          await stripe.redirectToCheckout({
            sessionId: res.data.id
          })
        })
        .catch(() => toast.error("Unfortunately, your donation did not process successfully. Please inform us of this issue by contacting us at thebackyardrestorationist@gmail.com, and we will work to resolve it as quickly as possible. Thank you for your attempted donation!"))
    } else {
      toast.warn('Please enter a value greater than 1 dollar in the format "0.00". Thank you!')
    }
  }

  return (
    <>
      <ToastContainer />
      <div>
        <span id='donationSpan'>$<input value={donationAmount} onChange={(e) => setDonationAmount(e.target.value)} type='text' id='donationInput' onFocus={() => setDonationAmount("")} /></span>
        <button role="link" onClick={() => toPaymentPage()} >
          Proceed to Payment
        </button >
      </div>
      <Link to="/">Back to Login</Link>
    </>
  )
}

export default Stripe