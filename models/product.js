var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    price: Number
});

productSchema.methods.name = function() {
    return this.name;
}

var Product = mongoose.model("Product", productSchema);

module.exports = Product;