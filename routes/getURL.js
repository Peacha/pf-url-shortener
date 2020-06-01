const express = require('express');
const router = express.Router();
const {getLongUrlfromShortUrl} = require('../appFunctions');
//this router handles gets for existing URLs
router.get("/:urlID",(req,res)=>{
	//from the provided shorturl, return the long input.  If nothing was found return a 404 else redirect to the webpage.
	getLongUrlfromShortUrl(req.params.urlID,(err,data,next)=>{err ? res.json({"error":"an error has occured"}) : data.url === "not found" ? 
		res.sendStatus(404) : data.url.match(/^(?:http(s)?:\/\/)/g) ? res.status(301).redirect(data.url) : res.status(301).redirect(`http://${data.url}`)
	});
});

module.exports = router