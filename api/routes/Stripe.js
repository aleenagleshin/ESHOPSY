const router = require("express").Router();

const Stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/payment", (req, res) => {
 Stripe.charges.create({
    source: req.body.tokenId,
    amount: req.body.amount,
    currency: "usd",
 })
    .then((charge) => {
      // handle successful charge
      res.status(200).json(charge);
    })
    .catch((err) => {
      // handle error
      res.status(500).json(err);
    });
});

module.exports = router;