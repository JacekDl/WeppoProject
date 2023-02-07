//var mongoose = require('mongoose');
//mongoose.connect('mongodb://127.0.0.1:27017/test');
const db = require('../db/db_services');
const bcrypt = require('bcrypt-nodejs');
const { render } = require('ejs');

function getLogin(req, res) {
	if (req.session.logged) {
		res.redirect('/');
	} else {
		res.render('login');
	}
}
async function postLogin(req, res) {
	var username = req.body.Login;
	var password = req.body.Password;
	var user = await db.find_user_by_name(username);
	//console.error(username);
	//console.error(password);
	//var user = await
	//var userid = 1;
	//var user = 
	if(user){
		bcrypt.compare(password,user.password, function (err,isValid)	{if (isValid) {
			//	console.error('user found');
			
			req.session.username = user.username;
			req.session.userid = user.id;
			req.session.logged = true;
			req.session.role = user.role;
			req.session.successLogin = true;
			req.session.basketlen =0;
			req.session.basketinfo =0;
			req.session.basket = [];
			var redirect = '/';
			if (req.query.redirect) {
				redirect = req.query.redirect;
			}
			res.redirect(redirect);
		} else {
			//console.error('login error');
			//console.error(err);
			res.render('login', { alert: { type: 'warning', message: 'Nieprawidłowe hasło' } });
		}});
	}else {
			//console.error('login error');
			//console.error(err);
			
			res.render('login', { alert: { type: 'warning', message: 'Nieprawidłowy login' } });
		}
}

function logout(req, res) {
	delete req.session.logged;
	delete req.session.userid;
	delete req.session.username;
	delete req.session.isadmin;
	delete req.session.role;
	req.session.logout = true;
	res.redirect('/');
}
async function postRegister(req,res){
	var username = req.body.Register;
	var password = req.body.Password;
	var password2 = req.body.Password2;
	var user = await db.find_user_by_name(username);
	if(!user){
		if (password==password2 && password != ''){
			await db.add_user(username,password);
			res.render('index',{alert: {type: 'success', message: 'Rejsttacja się powiodła'}});
		}
		else {res.render('register', { alert: { type: 'warning', message: 'Hasła są różne' } });}
	}else{
		res.render('register', { alert: { type: 'warning', message: 'Nieprawidłowy login' } });
	}

}
module.exports = {
	getLogin,
	postLogin,
	logout,
	postRegister
}