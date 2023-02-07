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
	let list = await db.give_all_product();
	res.render('goods', {products: list});
}
async function goods_add(req,res){
	let name = req.body.Name;
	let price = req.body.Price;
	let des = req.body.Description;
	await db.add_product(name,des,price);
	res.redirect('/goods');

}
async function goods_delete(req,res){
	let name = String(req.params.id);
	let product = await db.find_by_name(name);
	if(product){
		let del =db.delete_product(product[0].id);
		//res.json({ success: "Updated Successfully", status: 200, productName: req.session.basketinfo[id].name });
		req.session.customAlert = { type: 'success', message: 'Usunięto produkt '+name };
		res.redirect('/goods');}
 	   else{res.redirect('/haha_bardzo_smieszne_NAPRAWDE!!!');}

}
async function goods_change(req,res){
	let id= req.body.ID;
	let name=req.body.Name;
	let des=req.body.Description;
	let p = req.body.Price;
	await db.update_product(id,des,p);
	req.session.customAlert = { type: 'success', message: 'Zmieniono produkt '+name };
	res.redirect('/goods');
	/*
   	let product = await db.find_by_name(name);
    	if(product){
		if(name==product[0].name){
			await db.update_product(id,des,p,name);
			res.redirect('/goods');
		}
		else{
			req.session.customAlert = { type: 'denger', message: 'Nazwa jużistnieje' };
			res.redirect('/goods');
			//res.redirect('/haha_bardzo_smieszne_Czy_to_się_nie_nudzi???_brak_slow');}
	}
   	else{
	await db.update_product(id,des,p,name);
	req.session.customAlert = { type: 'success', message: 'Zmieniono produkt '+name };
	res.redirect('/goods');}

	*/


}
async function goods_change_get(req,res){
	let name = String(req.params.id);
   	let product = await db.find_by_name(name);
    	if(product){
		res.render('changeGood',{product:product[0]});
		
	}
    else{res.redirect('/haha_bardzo_smieszne_Czy_to_się_nie_nudzi???');}
}
module.exports = {
	users,
	orders,
	//chenge_o_status,
	goods_get,
	goods_add,
	goods_delete,
	goods_change_get,
	goods_change
}