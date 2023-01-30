function checksession(req,res,next){
	res.locals.logged = req.session.logged;
	res.locals.isadmin = req.session.isadmin;
	if(!req.session.basket){
		req.session.basket={};
		req.session.basketinfo ={};
		req.session.basketlen=0;
	}
	res.locals.basketlen = req.session.basketlen;

	if(req.session.successLogin){
		res.locals.alert = {type: 'success', message : 'Zalogowano poprawnie'};
		delete req.session.successLogin;
	}
	if(req.session.successRegister){
		res.locals.alert = {type: 'success',message :'Zarejestrowano Poprawnie'};
		delete req.session.successRegister;
	}
	if(req.session.logout){
		res.locals.alert = {type: 'success',message :'Wylogowano Prawidłowo'};
		delete req.session.logout;
	}
	if(req.session.customAlert){
		res.locals.alert =req.session.customAlert;
		delete req.session.customAlert;
	}
	next();
}
module.exports={
	checksession
}