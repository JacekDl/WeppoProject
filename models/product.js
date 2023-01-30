var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
    name: { type: String, required: true, unique: false },
    description: { type: String },
    price: { type: Number, required: true, unique: false }
});

productSchema.methods.getName = function() {
    return this.name;
}

// to nie działa
// productSchema.methods.findByName = function(desc) {
//     Product.find( `{name: ${desc}}`, function(err, docs) {
//         if (err) {
//             console.log("Product not found in database");
//             return;
//         }
//         console.log(docs);
//     });
// }

var Product = mongoose.model("Product", productSchema);

module.exports = Product;