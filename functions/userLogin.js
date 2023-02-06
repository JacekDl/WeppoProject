//var mongoose = require('mongoose');
//mongoose.connect('mongodb://127.0.0.1:27017/test');
const db = require('../db/db_services');
const bcrypt = require('bcrypt-nodejs');

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
			console.log('nienienieneinei');
			req.session.username = user.username;
			req.session.userid = user.id;
			req.session.logged = true;
			req.session.role = user.role;
			req.session.successLogin = true;
			var redirect = '/';
			if (req.query.redirect) {
				redirect = req.query.redirect;
			}
			res.redirect(redirect);
		} else {
			//console.error('login error');
			//console.error(err);
			console.log("aaaaaaaaaaaanienkfnsdkfhs");
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
module.exports = {
	getLogin,
	postLogin,
	logout
}