const mongoose = require('mongoose');
const Product = require('./models/product');
const User = require('./models/user');

mongoose.connect("mongodb://127.0.0.1:27017/product");

run()
async function run() {
    await Product.remove();
    await User.remove();

    await Product.create({name: "apple", description: "jonagold", price: 1.5});
    await Product.create({name: "apple", description: "gala", price: 2.5});
    await Product.create({name: "orange", price: 3});
    await Product.create({name: "watermelon", description: "fresh and juicy", price: 6});
    await Product.create({name: "banana", description: "long and yellow", price: 5});

    await User.create({username: "Krzych", password: "weppo"});
    await User.create({username: "Szymon", password: "password"});
    await User.create({username: "Jacek", password: "abc"});
    await User.create({username: "admin", password: "admin", role: "admin"});
    await User.create({username: "user", password: "user"});
}