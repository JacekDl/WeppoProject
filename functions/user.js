function getLogin(req,res){
	if(req.session.logged){
		res.redirect('/');
	}else{
		res.render('login');
	}
}
async function postLogin(req,res){
	var username = req.body.username;
	var password = req.body.password;
	//var userid = await
	//var user = await
}

function logout(req,res){
	delete req.session.logged;
	delete req.session.userid;
	delete req.session.username;
	delete req.session.isadmin;
	req.session.logout=true;
	res.redirect('/');
}
module.exports = {
	getLogin,
	postLogin,
	logout
}