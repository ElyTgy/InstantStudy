const express = require("express");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const AppError = require("./utils/ExpressError.js");
const asyncCatch = require("./utils/asyncCatch")
const generateUniqueID = require("generate-unique-id");
const multer = require("multer");
const fcRoute = require("./routes/fcard");
const axios = require("axios");
const fs = require("fs");


//req.params accesses the variable (ex: campground/:id, where id would be the variable)
//req.body would access the information sent with the request in the requests body
//req.queray accesses the query strings

const VIDEO_FOLDER = "uploads/"
const API_TOKEN = "26855332c5a04817a234353737e82b3d";
const PAUSE_INTERVAL = 20000;
const MODEL_UPLOAD = "http://b6ba-34-80-100-6.ngrok.io/text";
const MODEL_FETCH = "http://0d83-34-80-100-6.ngrok.io/summary?id=5551722-f677-48a6-9287-39c0aafd9ac1";

const app = express();
const upload = multer({dest:VIDEO_FOLDER});
const assembly_upload = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
        authorization: API_TOKEN,
        "content-type": "application/json",
        "transfer-encoding": "chunked",
    },
    maxBodyLength: Infinity,
    maxContentLength: Infinity
});
const assembly_transcribe = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
      authorization: API_TOKEN,
      "content-type": "application/json",
    }
  });
const model_upload = {
    url: MODEL_UPLOAD,
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: {
      text: "",
      id: ""
    }
  };


app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
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

async function checkTranscriptionStatus(id){
    console.log("checking status")
    let res = await assembly_transcribe.get(`/transcript/${id}`)
    if(res.data.status === "completed")
    {
        //console.log( res.data );
        //console.log("here");
        return res.data.text;
    }
    else if(res.data.status === "error")
    {
        throw new AppError(500, "Cant trnascribe file")
    }
}

app.post("/upload", upload.single("data"), asyncCatch(async (req, response)=>{
    const file = req.file.filename;
    let id = ""
    fs.readFile(`./${VIDEO_FOLDER}${file}`, (err, data) => {
        if (err) throw new AppError(500, "Couldn't parse the file properly")
        assembly_upload
            .post("/upload", data)
            .then((res)=>{
                console.log("loading")
                assembly_transcribe
                    .post(`/transcript`, {
                        audio_url: res.data.upload_url
                    })
                    .then(async(res) => {
                        console.log("loading")
                        let checkagain = true;
                        id = res.data.id;
                        let transcription;
                        while(checkagain)
                        {
                            await new Promise(r => setTimeout(r, PAUSE_INTERVAL));
                            transcription = await checkTranscriptionStatus(id);
                            if(transcription){checkagain=false;console.log(transcription);}
                        }
                        model_upload["text"] = transcription;
                        model_upload["id"] = id;
                        await axios(model_upload);

                        response.redirect('/summary?text=' + encodeURIComponent(id))
                    })
                    .catch((err) => {console.error(err); console.log("ERROR")});
            })
            .catch((err) => {console.error(err); console.log("ERROR")});
    
    });
}));


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
