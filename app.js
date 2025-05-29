const express = require("express");
const app = express();
const facultys = require("./api/routes/faculty");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const productRoute = require("./api/routes/product");
const home = require("./api/routes/home");
const userRoute = require("./api/routes/user");
const welcome = require("./api/routes/welcome");
const dash = require("./api/routes/dash");

mongoose.connect(
  "mongodb+srv://hemantkumar692:u8G7GR8vq709XaJk@cluster0.z5upxof.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);
mongoose.connection.on("error", (err) => {
  console.log("Error connecting to MongoDB:", err);
});
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

// use body parser to parse incoming request bodies (urlencoded and json) before the routes

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", home);
app.use("/faculty", facultys);
app.use("/product", productRoute);
app.use("/user", userRoute);
app.use("/", welcome);
app.use("/dashboard", dash);

app.use((req, res, next) => {
  res.status(404).json({
    error: "Not found",
  });
});
module.exports = app;
