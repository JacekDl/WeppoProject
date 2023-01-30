const mongoose = require('mongoose');
const Product = require('./models/product');
const User = require('./models/user');

mongoose.connect("mongodb://127.0.0.1:27017/product");

// dodawanie produktu
// const fruit = new Product({ name: "Watermelon", description: "Fresh and juicy", price: 6.0});
// fruit.save();

// dodawanie użytkownika
// const krzych = new User( { username: "Krzych", password: "password"});
// krzych.save();

// wyszukanie produktu po nazwie
// Product.find({ name: 'Apple' }, function(err, docs) {
//     if (err) {
//         console.log("Product not found in database");
//         return;
//     }
//     console.log(docs);
// });


// funkcje await wewnątrz funkcji async
main();
async function main() {
    await Product.deleteMany({name: "Watermelon"});
    const fruit = new Product({ name: "Watermelon", description: "Fresh and juicy", price: 6.0});
    await fruit.save();
}