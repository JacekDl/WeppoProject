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
}//może być po prostu jason ze wszystkim
async function add_user(){}

async function give_all_product(){
	const products = await Product.find();
	return products;
}



async function find_by_name(name){}
async function give_all_users(){}
async function add_product(name,description,price){}
async function delete_product(name){}
async function update_product(name, description,price){}

async function give_all_orders(){}
async function add_order(name,date,order,closed){} //order:jason{list[product]},closed:Boolean
async function update_order(id_order,closed){}


module.exports = {
	login_user,
	give_all_product
}
//index - cokie - jak przekazać , liste produktów jakoś
//basket - cokie - pamiętanmie listy wybranych produktów ( obiekt js ) 
//lista 