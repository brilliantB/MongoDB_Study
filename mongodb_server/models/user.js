const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
        name : {type : String, required: true},
        age : {type : Number, required: true},
        gender : {type: String, enum:["male", "famale"], required: true},
        likes: [String], //["apple", "banana"]
        CreatedDate : {type: Date, default: new Data() },
});

module.exports = mongoose.model("user", userSchema);