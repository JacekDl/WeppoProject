function vuser(req,res,next){
	if(req.session.logged){
		next();
	}else{
		req.session.customAlert = {type: 'danger', message:'Wymagane logowanie. '};
		res.redirect('/login?redirect=' + req.url);
	}
}
function vadmin(req,res,next){
	if(req.session.logged && req.session.role == 'admin'){
		next();
	}else {
		req.session.customAlert = {type: 'denger', message: 'You shell not pass. My minions shell be logged!'};
		res.redirect('/login?redirect=' + req.url);
	}
}

module.exports = {
	vuser,
	vadmin
}