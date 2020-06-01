const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(express.static(__dirname+"/public"));
app.use(cors({optionSuccessStatus:200}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.route("/").get((req,res)=>{
	res.sendFile(__dirname+"/views/index.html")
});

app.use("/api/shorturl",require('./routes/getURL.js'));
app.use("/api/shorturl",require('./routes/newURL.js'));


app.listen(process.env.PORT,()=>console.log("URL Shortener Service is Listening....."))