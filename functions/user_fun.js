const db = require('../db/db_services');

async function give_all_product(req,res){
	let list = await db.give_all_product();
	res.locals.products = true;
	res.render = ('/',{products:list}); // depends on vies implemented
}

module.exports = {
	give_all_product
}