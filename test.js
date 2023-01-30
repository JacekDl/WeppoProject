const mongoose = require('mongoose');
const Product = require('./models/product');
const User = require('./models/user');

mongoose.connect("mongodb://127.0.0.1:27017/product");

const apple = new Product({ name: "Apple", description: "Jonagold", price: 2.50});

apple.save();

const apple_2 = new Product({ name: "Apple", description: "Other", price: 1.50});

apple_2.save();

// const krzych = new User( { username: "Krzych", password: "password"});

// krzych.save();