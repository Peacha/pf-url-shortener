const express = require('express');
const app = express();
app.use(express.static(__dirname+"/public"));



app.route("/").get((req,res)=>{
	res.sendfile(__dirname+"/views/index.html")
});


app.listen(3000,()=>console.log("URL Shortener Service is Listening....."))