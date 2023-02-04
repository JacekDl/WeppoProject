const mongoose = require('mongoose');
const Product = require('../models/product');
const User = require('../models/user');

async function login_user(username,password){
	if(username == password){
		if(username == 'admin' || username == 'sauron'||username == 'saruman')
		{
			return { username: username,userid: 1,role: 'admin'};
		}
		return { username: username,userid: 2,role: 'user'};
	} else {
		return null;
	}
}

//może być po prostu jason ze wszystkim
async function add_user(){}


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


async function add_product(name, description, price){
	const product = await Product.create({name: `${name}`, description: `${description}`, price: `${price}`});
}

async function delete_product(name){}
async function update_product(name, description,price){}

async function give_all_orders(){}
async function add_order(name,date,order,closed){} //order:jason{list[product]},closed:Boolean
async function update_order(id_order,closed){}


module.exports = {
	login_user,
	give_all_product,
	find_by_name,
	give_all_users,
	add_product
}
//index - cokie - jak przekazać , liste produktów jakoś
//basket - cokie - pamiętanmie listy wybranych produktów ( obiekt js ) 
//lista 