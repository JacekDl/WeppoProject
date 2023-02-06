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
    let list = req.session.basket;
    list.push(product);
    req.session.basket=list;
    let total=req.session.basketinfo;
    total+=product.price;
    req.session.basket=total;
    //res.json({ success: "Updated Successfully", status: 200, productName: req.session.basketinfo[id].name });
    req.session.customAlert = { type: 'success', message: 'Dodano produkt '+name };
    res.render('index')
  }

function remove(req, res) {
    var id = parseInt(req.params.id);
    if (req.session.basket && req.session.basket[id]) {
        req.session.basketlength -= 1;
        req.session.basket[id].amount -= 1;
        if (req.session.basket[id].amount < 1) {
            delete req.session.basket[id];
            delete req.session.basketinfo[id];
        }
    }
    res.redirect('/index');
}

function clear(req, res) {
    delete req.session.basket;
    delete req.session.basketinfo;
    res.redirect('/');
}

async function checkout_get(req, res) {
    if(req.session.basketlength == 0) {
      res.redirect('/');
    } else {
      let sum = 0;
      let bi = req.session.basketinfo;
      let b = req.session.basket;
      Object.keys(bi).map((key) => {
        sum += bi[key].price;
      })
      sum = Math.round(sum*100) / 100;
      res.render('checkout', {sum: sum});
    }
}

async function checkout_post(req, res) {
    if(req.body.payment_method == 0) {
      req.session.customAlert = { type: 'danger', message: 'Wybierz formę płatności' };
      res.redirect('/checkout');
    } else {
      if(req.session.logged) {
        var userid = req.session.userid;
      } else {
        userid = 1;
      }
      //let id = await db.add_purchase(userid, 1);
      let bi = req.session.basketinfo;
      let b = req.session.basket;
      Object.keys(bi).map(async (key) => {
          await db.add_sold_product(id, bi[key].id,  b[key].amount);
      })
      // Do something with shipping information
      req.session.customAlert = { type: 'success', message: 'Dziękujemy za zakupy!' };
      clear(req, res);
    }
}

module.exports = {
    get,
    add,
    remove,
    clear,
    checkout_post,
    checkout_get
}