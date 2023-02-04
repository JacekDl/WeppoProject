const mongoose = require('mongoose');
const Product = require('./models/product');
const User = require('./models/user');
const services = require('./db/db_services');

// mongoose.connect("mongodb://127.0.0.1:27017/product");
mongoose.connect("mongodb+srv://weppo:VfJ8CpO55Oj8QFwp@cluster0.xrcaeau.mongodb.net/?retryWrites=true&w=majority");

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
    // await Product.deleteMany({name: "Watermelon"});
    // const fruit = new Product({ name: "Watermelon", description: "Fresh and juicy", price: 6.0});
    // await fruit.save();
    // const fruits = await Product.find();
    // console.log(fruits);
    // const app = await Product.findByName("wa");
    // console.log(app);
    // const desc = await Product.findByDescription("gold");
    // console.log(desc);
    // const pro = await Product.findOne({name: "Apple"});
    // console.log(pro._id);
    // await Product.deleteOne({_id: pro._id});

    //to działa:
    // const user = await User.findOne({username: "Jacek"});
    // console.log(user.username);
    // user.checkPassword("abc", function(err, isMatch) {
    //     if (err) throw err;
    //     console.log("abc: ", isMatch);
    // });
    // user.checkPassword("def", function(err, isMatch) {
    //     if (err) throw err;
    //     console.log("def: ", isMatch);
    // });
    
    //OK:
    // const all_pr = await services.give_all_product();
    // console.log(all_pr);

    //OK:
    // const pr_name = await services.find_by_name("app");
    // console.log(pr_name);
    
    //OK:
    // const all_us = await services.give_all_users();
    // console.log(all_us);

    //OK:
    // await services.add_product("plum", "best in Wroclaw", "6.5");

    //OK:
    // await services.add_user("Zdzisław", "zpl");

    const right_pass = await services.login_user("Krzych", "weppo");
    console.log(right_pass);

    const wrong_pass = await services.login_user("Krzych", "kck");
    console.log(wrong_pass);
}