const db = require('../db/db_services');

async function give_all_product(req,res){
	
	let list = await db.give_all_product();
	//res.locals.products = true;
	//console.log(list);
	res.render('index',{products:list}); // depends on vies implemented

}
async function find(req,res){
	var n=req.body.search;
	console.log(n);
	var list=await db.find_by_name(n);
	console.log(list);
	list = list.concat(await db.find_by_description(n));
	console.log('to jest ostatnia');
	console.log(list);
	res.render('index',{products:list});
}

module.exports = {
	give_all_product,
	find
}