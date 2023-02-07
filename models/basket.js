var mongoose = require("mongoose");

var basketSchema = mongoose.Schema({
    user: { type: String, required: true, unique: false },
    products: [String],
    price: Number,
    completed: { type: Boolean, default: true }
});

module.exports = mongoose.model('Basket', basketSchema);