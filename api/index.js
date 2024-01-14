const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const ProductsRoute = require("./routes/Products");
const CartRoute = require("./routes/cart");
const OrderRoute = require("./routes/order");
const StripeRoute=require("./routes/Stripe");
const cors=require("cors");


dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB CONNECTION SUCCESSFUL"))
  .catch((err) => {
    console.log(err);
  });


app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/product", ProductsRoute);
app.use("/api/cart", CartRoute);
app.use("/api/order", OrderRoute);
app.use("/api/checkout",StripeRoute);


app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running ");
});