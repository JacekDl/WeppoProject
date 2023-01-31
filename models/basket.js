var mongoose = require("mongoose");

var basketSchema = mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    products: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Product"
    }],
    completed: Boolean
});