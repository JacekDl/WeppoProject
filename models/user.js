var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { default: "user"}
});

userSchema.methods.name = function() {
    return this.username;
}

var User = mongoose.model("User", userSchema);

module.exports = User;