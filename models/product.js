var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
    name: { type: String, required: true, unique: false },
    description: { type: String },
    price: { type: Number, required: true, min:  0.01}
});

productSchema.methods.getName = function() {
    return this.name;
}

productSchema.statics.findByName = function(name) {
    return this.find({name: new RegExp(`^${name}`, 'i')});
}

productSchema.statics.findByDescription = function(description) {
    return this.find({description: new RegExp(`${description}`, 'i')});
}

var Product = mongoose.model("Product", productSchema);

module.exports = Product;