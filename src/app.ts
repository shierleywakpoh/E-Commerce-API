import express from "express";
import cors from "cors";
import routes from "./routes/customer.route";
import Aroutes from "./routes/admin.route";
import products from "./routes/products.router";
import cart from "./routes/cart.route";
import payment from "./routes/payment.route";
import path from "path";
import transaction from "./routes/transaction.route";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(express.static(path.join(__dirname, "../public")));
//console.log(path.join(__dirname, "../uploads"));

app.use("/customerRegister", routes);
app.use("/adminRegister", Aroutes);
app.use("/product", products);
app.use("/cart", cart);
app.use("/payment", payment);
app.use("/transaction", transaction);

app.get("/a", (req, res) => {
  res.send("anjm");
});
app.get("/success/:id", (req, res) => {
  const { id } = req.params;
  console.log("iddd", id);
  res.send("your payment is successfully");
});
app.get("/cancel", (req, res) => {
  res.send("Something went wrong with your transaction");
});

app.get("/test-image", (req, res) => {
  res.sendFile(path.join(__dirname, "../uploads/1772895519543-670696643.png"));
});

export default app;
