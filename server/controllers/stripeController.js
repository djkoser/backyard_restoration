//@ts-nocheck
// eslint-disable-next-line no-undef
const { STRIPE_SECRET_KEY } = process.env;

// eslint-disable-next-line no-undef
const stripe = require("stripe")(STRIPE_SECRET_KEY);

// eslint-disable-next-line no-undef
module.exports = {
  checkout: async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.create({
        submit_type: "donate",
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "donation",
              },
              unit_amount_decimal: Number.parseInt(req.body.donationAmount),
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: "https://backyardrestoration.net/#/donation/success",
        cancel_url: "https://backyardrestoration.net/#/"
      });
      res.status(200).send({ id: session.id });
    } catch (err) { console.log(err); }
  }
};
