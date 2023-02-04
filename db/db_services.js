const mongoose = require('mongoose');
const Product = require('../models/product');
const User = require('../models/user');
const bcrypt = require('bcrypt-nodejs');

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
// async function login_user(username, guess) {
// 	const user = await User.findOne({username: `${username}`});
// 	console.log(user.username);
// 	console.log(user.password);
	
// 	const match = await bcrypt.compare(guess, user.passwordHash, function(err, isMatch) {
// 		if (err) throw err;
// 		console.log(isMatch);
// 	});
	
// }

//może być po prostu jason ze wszystkim
// przykład użycia await add_user("Zdzisław", "zpl")
async function add_user(name, password){
	await User.create({username: `${name}`, password: `${password}`});
}

// przykład użycia: const pr = await services.give_all_product();
async function give_all_product(){
	const products = await Product.find();
	return products;
}

// przykład użycia: const pr_name = await services.find_by_name("app");
async function find_by_name(name){
	const products = await Product.findByName(name);
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

// TODO: kasować produkt po nazwie (nieunikalna) czy po _id (unikalne)
async function delete_product(name){}

// TODO: updatować produkt raczej po _id niż name (nieunikalna)
async function update_product(name, description, price){}

// TODO: ?
async function give_all_orders(){}

// TODO: potrzeba _id usera i tablicy z _id produktów
async function add_order(name,date,order,closed){} //order:jason{list[product]},closed:Boolean

// TODO: czy admin może mieć możliwość zmiany zamówienia?
async function update_order(id_order,closed){}


module.exports = {
	login_user,
	give_all_product,
	find_by_name,
	give_all_users,
	add_product,
	add_user,
	login_user
}


//index - cokie - jak przekazać , liste produktów jakoś
//basket - cokie - pamiętanmie listy wybranych produktów ( obiekt js ) 
//lista 