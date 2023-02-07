const mongoose = require('mongoose');
const Product = require('../models/product');
const User = require('../models/user');
const Basket = require('../models/basket');
const bcrypt = require('bcrypt');

mongoose.connect("mongodb+srv://weppo:VfJ8CpO55Oj8QFwp@cluster0.xrcaeau.mongodb.net/?retryWrites=true&w=majority");


// async function login_user(username,password){
// 	if(username == password){
// 		if(username == 'admin' || username == 'sauron'||username == 'saruman')
// 		{
// 			return { username: username,userid: 1,role: 'admin'};
// 		}
// 		return { username: username,userid: 2,role: 'user'};
// 	} else {
// 		return null;
// 	}
// }


// TODO: to trzeba będzie zaimplementować z poziomu backendu - do compare trzeba dodać callback
async function login_user(username, guess) {
	const user = await User.findOne({username: `${username}`});
	console.log(user.username);
	console.log(user.password);

	// generuje inne hash'e
	// const salt = bcrypt.genSaltSync(10);
	// const hash = bcrypt.hashSync(guess, salt);
	// console.log(hash);

	// const answer = await user.checkPassword(guess, function(err, isMatch) {
    //     if (err) throw err;
    //     console.log(isMatch);
    // });	

	// const ans = await bcrypt
	// 	.compare(guess, user.password)
	// 	.then( res => { 
	// 		console.log(res) 
	// 	})
	// 	.catch(err => console.log(err.message));

	// console.log(ans);
	// return ans;

}

// zapisuje obiekt do bazy danych
// jeśli username się powtarza wypisuje błąd na konsoli
// przykład użycia await add_user("User1", "password1")
async function add_user(name, password){
	await User.create({username: name, password: password}, err => console.log(err.message));
}

// zwraca obiekt użytkownika lub null jeśli użytkownik nie został znaleziony
async function find_user_by_name(name){
	const user = User.findOne({username: name});
	return user;
}

// zwraca listę obiektów produktów
// przykład użycia: const pr = await services.give_all_product();
async function give_all_product(){
	const products = await Product.find();
	return products;
}

// zwraca listę obiektów produktów rozpoczynających się od name
// przykład użycia: const pr_name = await services.find_by_name("app");
async function find_by_name(name){
	const products = await Product.findByName(name);
	return products;
}

// zwraca listę obiektów, w których opisie występuje fragment descripiton
// przykład użycia: const products = await services.find_by_description("and");
async function find_by_description(description) {
	const products = await Product.findByDescription(description);
	return products;
}

// przykład użycia: const all_us = await services.give_all_users();
async function give_all_users(){
	const users = await User.find();
	return users;
}

// przykład użycia: await services.add_product("plum", "best in Wroclaw", "6.5");
async function add_product(name, description, price){
	const product = await Product.create({name: `${name}`, description: `${description}`, price: `${price}`});
}


// przykład użycia: const user = await services.find_user_by_name("Krzych");
async function find_user_by_name(name) {
	const user = await User.findOne({username: `${name}`});
	return user;
}

// TODO: kasować produkt po nazwie (nieunikalna) czy po _id (unikalne)
async function delete_product(id){
	await Product.deleteOne({_id: `${id}`});
}

// przykład użycia:
// const prod3 = await Product.findOne({name: "apple"});
// await services.update_product(prod3._id, "apples 1kg", "best in Wroclaw", 6.5);
async function update_product(id, name, description, price){
	await Product.updateOne({_id: `${id}`}, {name: name, description: description, price: price});
}

// TODO: na razie tylko działa dla _id - może lepiej byłoby dla name?
async function give_all_orders(){
	const orders = await Basket.find();
	return orders;
}

// TODO: potrzeba _id usera i tablicy z _id produktów
async function add_order(userName, products, completed) {
	var sum = 0;
	var productName = [];
	for (let product of products) {
		sum += product.price;
		productName.push(product.name);
	}
	console.log(sum, productName);

	await Basket.create({user: userName, products: productName, price: sum});
}

// TODO: czy admin może mieć możliwość zmiany zamówienia?
async function update_order(id_order,closed){}


module.exports = {
	give_all_product,
	find_by_name,
	give_all_users,
	add_product,
	add_user,
	find_user_by_name,
	give_all_orders,
	delete_product,
	update_product,
	add_order,
	find_by_description
}


//index - cokie - jak przekazać , liste produktów jakoś
//basket - cokie - pamiętanmie listy wybranych produktów ( obiekt js ) 
//lista 