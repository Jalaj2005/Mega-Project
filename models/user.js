const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
});

userSchema.plugin(passportLocalMongoose); 
//automatically implements username, salting, hashing password . 
// No need to build it from scratch.


module.exports = mongoose.model("User",userSchema);
console.log("passportLocalMongoose =", passportLocalMongoose);
