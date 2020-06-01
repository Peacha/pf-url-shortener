const express = require('express');
const router = express.Router();
const dns = require('dns');
const {shortUrlModel,getLastUrl,getMatchingUrl,createNewShortUrl} = require('../appFunctions');
//this router handles the creation of a new short URL.
router.post("/new",(req,res,next)=>{
	url = req.body.url;
	const nsLookup = url.match(/[\w\.-]+(?:\.[\w\.-]+)/g)[0]
	if (url.match(/^(?:http(s)?:\/\/)?[\w\.-]+(?:\.[\w\.-]+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.])+$/g)){
			dns.lookup( nsLookup,(err,resp)=> {err ? res.json({"error":"invalid url"}) : 
				getMatchingUrl(url,(err,data)=>{err ? res.json({"error":"an error has occured"}) : data ? next(res.json({"original_url":data.url,"short_url":data.shortUrl})) :
				getLastUrl((err,data)=>{ err ? console.log(err) : 
					createNewShortUrl(url,++data[0].shortUrl,(err,data)=>{err ? res.json({"error":"an error has occured"}) : next(res.json({"original_url":data.url,"short_url":data.shortUrl}))})
				})})
	})} 
	else{
		res.json({"error":"invalid url"});
	}
});

module.exports = router


