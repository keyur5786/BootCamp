// STEP - 1
//importing modules
var express = require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var cors = require("cors");
var path = require("path");
var multer = require("multer");
var LocalStorage = require('node-localstorage');

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// })
//
// var upload = multer({ storage: storage })

var app = express();

// Define Port
const port = 3000;

app.listen(port,()=>{
console.log("Server Started At PORT : "+port);
});

// Static file path which run on front-end angular project
app.use(express.static(path.join(__dirname,'public'))); //__dirname returns current directory name
app.use(express.static(path.join(__dirname, 'dist')));


// headers and content type
app.use(function(req, res, next) { //allow cross origin requests
        res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
        res.header("Access-Control-Allow-Origin", "http://localhost:3000");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Credentials", true);
        next();
    });

// Define Home Page Route
app.get("/",(req,res)=>{
res.send("Home Route Run Successfull");
});
// Run URL In Your Browser : localhost:3000

// STEP - 2
// Store path of route.js in variable
const route = require('./routes/route');

// Use bodyparser to convert response in JSON format
// Body Parse should be come before forwarding api
app.use(bodyparser.json());

// Add middleware cors to avoid cross-platform communication in single site
// Hear Node server run on 3000 port & Angular run on 4200 port
// Both will be run on localhost so to avoid error we must call middleware cors
app.use(cors());

// Forward all route  which prefix with /api to the route.js file for match route
app.use('/api',route);

// app.post('/api/imageupload', upload.single('myFile'), function (req, res, next) {
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
//   console.log("upload");
//   var myFile=req.File;
//   var ogirinalName=myFile.originalname;
//   var fileName = myFile.filename;
//   var path = myFile.path;
//   var destination = myFile.destination;
//   var size = myFile.size;
//   var mimetype = myFile.mimetype;
//
//   res.send(myFile);
// })

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bootcamp');

mongoose.connection.on("connected",()=>{
console.log("MongoDB Connection Done On PORT 27017");
});

mongoose.connection.on("error",(err)=>{
if(err){
console.log("MongoDB Connection Error : "+err);
}
});
