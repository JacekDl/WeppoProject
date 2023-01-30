var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
    name: { type: String, required: true, unique: false },
    description: { type: String },
    price: { type: Number, required: true, unique: false }
});

productSchema.methods.getName = function() {
    return this.name;
}

var Product = mongoose.model("Product", productSchema);

module.exports = Product;