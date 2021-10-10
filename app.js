const express = require("express");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const AppError = require("./utils/ExpressError.js");

//req.params accesses the variable (ex: campground/:id, where id would be the variable)
//req.body would access the information sent with the request in the requests body
//req.queray accesses the query strings

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
const axios = require("axios");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));

const fcRoute = require("./routes/fcard");
app.use("/fcards", fcRoute);

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("upload", (req, res) => {});

app.post("upload", (req, res) => {});

app.post("summary", (req, res) => {});

app.get("/fcard", (req, res) => {
  res.render("fcards");
});

app.all("*", (req, res, next) => {
  next(new AppError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Internal Server Error" } = err;
  res.status(status);
  res.render("error.ejs", { message: message, status: status, err: err });
});

app.listen(3000, () => {
  console.log("Connected");
});
