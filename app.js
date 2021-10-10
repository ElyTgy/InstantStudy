const express = require("express");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const AppError = require("./utils/ExpressError.js");
const generateUniqueID = require("generate-unique-id");
const multer = require("multer");
const fcRoute = require("./routes/fcard");
const axios = require("axios");

//req.params accesses the variable (ex: campground/:id, where id would be the variable)
//req.body would access the information sent with the request in the requests body
//req.queray accesses the query strings

const VIDEO_FOLDER = "uploads/"
const app = express();
const upload = multer({dest:VIDEO_FOLDER});

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
const axios = require("axios");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(express.static(__dirname + '/public'));

app.use("/fcards", fcRoute);

app.get("/", (req,res)=>{
    res.render("home.ejs")
})

app.get("/upload", (req, res)=>{
    res.render("upload.ejs")
    //in upload.ejs file, after clicking the sumit button add an element with the text "loading"
})

app.post("/upload", upload.single("data"), (req, res)=>{
    const filename = req.file.filename;

    //const data = req.body;
    //const id = generateUniqueID({length:5, useLetters:false, useNumbers:true});
    //TODO: Send data to model API. in requests body send id and data.
    //res.redirect("/summary?id=" + encodeURIComponent(id));
})

app.get("/summary", (req, res)=>{
    id = req.query.id;
    text = ""//TODO: Fetch text data from model with id
    res.render("summary.ejs", text); //pass in text data to summary
})

app.all('*', (req, res, next)=>{
    next(new AppError(404, "Page Not Found"))
})

app.use((err, req, res, next)=>{
    const {status = 500, message="Internal Server Error"} = err
    res.status(status)
    res.render("error.ejs",{message:message, status:status, err:err});
})

app.listen(3000, ()=>{
    console.log("Connected")
})
