const mongoose = require("mongoose");

var schema = mongoose.Schema;

var definitionSchema = new schema({
authorName: {type: String, required: true},
dateCreated: {type : Date, required : true, default : Date.now},
definition : { type : String, required : true},
quality : { type : Number, default :0},
likes : { type : Number, default : 0}
})

module.exports = definitionSchema;