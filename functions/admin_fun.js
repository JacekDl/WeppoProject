const { render } = require('ejs');
var db = require('../db/db_services');

async function users(req,res){
	let list = await db.give_all_users();
	res.render('users', {users: list});
}

async function orders(req,res){
	let list = await db.give_all_orders();
	res.render('orders',{orders:list}); // depends on vies implemented
}

// async function chenge_o_status(req,res){
// //	let id = await db.give_all_orders.id(req.params.id); //how implemented
// 	let id = req.body.id;
// 	let status = req.body.newstatus; // how we do this
// 	var success = await db.chenge_o_status(id,status);
// 	if(success){
// 		req.session.customAlert= {type: 'success', message: 'Zmieniono status'};
// 	}else{
// 		req.session.customAlert= {type: 'denger',message: 'Błąd Zmiany statusu'};
// 	}
// 	res.render('/admin',);

// }
async function goods_get(req,res){
	let list = await db.give_all_users();
	res.render('goods', {products: list});
}

module.exports = {
	users,
	orders,
	//chenge_o_status,
	goods_get
}