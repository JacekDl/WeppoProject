const db = require('../db/db_services');
const basket = require('../models/basket');


function get(req, res) {
  if(req.session.basketlength==0){ 
    req.session.customAlert = { type: 'danger', message: 'Koszyk jest PUSTY.' };
    res.render('basket',{products:{},total:0});
  } else
    {
    let b = req.session.basket;
    let tot = req.session.basketinfo;
   
    res.render('basket', { products: b,total:tot });
  }
}


async function add(req, res) {
    let name = String(req.params.id);
    req.session.basketlength += 1;
    let product = await db.find_by_name(name);
    if(product){var list = [];
      list = list.concat(req.session.basket);
      list.push(product[0]);
      req.session.basket=list;
      var total= 0 + req.session.basketinfo;
      total+=product[0].price;
      req.session.basketinfo=total;
      //res.json({ success: "Updated Successfully", status: 200, productName: req.session.basketinfo[id].name });
      req.session.customAlert = { type: 'success', message: 'Dodano produkt '+name };
      res.redirect('/');}
    else{res.redirect('/haha_bardzo_smieszne');}
  }

function clear(req, res) {
    delete req.session.basket;
    delete req.session.basketinfo;
    res.redirect('/');
}
async function order_post(req, res) {
    let posted = await db.add_order(req.session.username,req.session.basket);
      req.session.customAlert = { type: 'success', message: 'Dziękujemy za zakupy!' };
      clear(req, res);
  }


module.exports = {
    get,
    add,
    clear,
    order_post
}