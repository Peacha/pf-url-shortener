const mongoose = require('mongoose');
const MONGO_URI = 'mongodb+srv://theoraclemdb:n9hgeIsJ0dTZxqRf@cluster0-mbaut.gcp.mongodb.net/url-shortener?retryWrites=true&w=majority'
mongoose.connect(MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true})
const Schema = mongoose.Schema
const ShortUrlSchema = new Schema(
	{
		url:{
			required:true,
			type: String,
			lowercase:true
		},	
		shortUrl: {
			type:  Number,
		}
	}
)

const ShortUrl = mongoose.model("ShortUrl",ShortUrlSchema);

//get last entry so can be incremented

const getLastUrl = (done)=>{
	ShortUrl.find({}).sort({shortUrl:'desc'}).limit(1).exec((err,data)=>err ? done(err) : done(null,data));
}

//get matching entry for a long url.  If the url has been added then we'll return its existing shorturl

const getMatchingUrl = (findUrl,done)=>{
	ShortUrl.findOne({url:findUrl},(err,data)=> {err ? done(err) : done(null,data);})
}

//get matching entry for a short url for redirection

const getLongUrlfromShortUrl = (findUrl,done)=>{
	ShortUrl.findOne({shortUrl:findUrl},(err,data)=> {err ? done(err) : data  ? done(null,{"url":data.url}) : done(null,{"url":"not found"});})
}


//create new entry

const createNewShortUrl = (longUrl,val,done)=>{
	const newEntry = new ShortUrl({url:longUrl,shortUrl:val});
	newEntry.save((err,data)=>err ? done(err) : done(null,data)); 
}

exports.shortUrlModel = ShortUrl;
exports.getLastUrl = getLastUrl;
exports.getMatchingUrl = getMatchingUrl;
exports.createNewShortUrl = createNewShortUrl;
exports.getLongUrlfromShortUrl = getLongUrlfromShortUrl;

