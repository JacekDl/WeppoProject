var mongoose = require("mongoose");

var cartSchema = mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    products: [{
        type: mongoose.SchemaType.ObjectId,
        ref: "Product"
    }],
    completed: Boolean
});