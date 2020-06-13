const mongoose = require("mongoose");
const definitionSchema = require("./msc-definition.js");
var schema = mongoose.Schema;

var termsEnglishSchema = new schema({
wordEnglish: {type: String, required: true, unique : true},
wordNonEnglish: {type : String, default: ''},
wordExpanded : { type: String, default: ''},
languageCode : { type : String, required : true},
image : { type : String,default: ''},
imageType : { type : String,default: ''},
audio : { type : String,default: ''},
audioType : { type : String,default: ''},
linkAuthoritative : { type : String,default: ''},
linkWikipedia : { type : String ,default: ''},
linkYouTube : { type : String,default: ''},
authorName : { type : String, required : true},
dateCreated : { type : Date, required : true},
dateRevised : { type : Date, required : true},
fieldOfStudy : { type : String, default : ''},
helpYes : { type : Number, default :0},
helpNo : { type : Number, default :0},
definitions : [definitionSchema]
})

module.exports = termsEnglishSchema;
