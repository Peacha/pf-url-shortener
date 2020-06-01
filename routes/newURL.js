const express = require('express');
const router = express.Router();
const dns = require('dns');
const {shortUrlModel,getLastUrl,getMatchingUrl,createNewShortUrl} = require('../appFunctions');
//this router handles the creation of a new short URL.
router.post("/new",(req,res,next)=>{
	//get the url, checl it is in valid format, then carry out a dns lookup to see if exists.  if it doesnt pass these tests, return invalid.
	//if it does, then we check to see if it has been previously entered and return the previous entry, if not we check the last added value, increment it, add to the database and return the entry to the user.
	url = req.body.url;
	const nsLookup = url.match(/[\w\.-]+(?:\.[\w\.-]+)/g)[0]
	if (url.match(/^(?:http(s)?:\/\/)?[\w\.-]+(?:\.[\w\.-]+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.])+$/g)){
			dns.lookup( nsLookup,(err,resp)=> {err ? res.json({"error":"invalid url"}) : 
				getMatchingUrl(url,(err,data)=>{err ? 
					next(err) : data ? next(res.json({"original_url":data.url,"short_url":data.shortUrl})) :
				getLastUrl((err,data)=>{ err ? console.log(err) : 
					createNewShortUrl(url,++data[0].shortUrl,(err,data)=>{err ? next(err) : next(res.json({"original_url":data.url,"short_url":data.shortUrl}))})
				})})
	})} 
	else{
		res.json({"error":"invalid url"});
	}
});

module.exports = router


