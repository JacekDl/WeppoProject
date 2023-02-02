var http = require('http');
var express = require('express');
var session = require('express-session');
var ejs = require('ejs');
var ash = require('express-async-handler');
const path = require('path');
const { application } = require('express');
var cookieParser = require('cookie-parser');

//passport
var {checksession} = require('./functions/middleware');
var userLogin =require('./functions/userLogin');

//var crypto = require('crypto');
//var sectret = 'Lotr was not The 1!'

//var todoRepo = require('./todos');
//var json = express.json();



var app = express();

app.set('views', './views');
app.set('view engine', 'ejs');
app.disable('etag');

app.use(session({resave:true,saveUninitialized:true,secret: "1 To rule them all!"}))
app.use( express.static(path.join(__dirname,'public')))


app.use(cookieParser('You_shell_not_pass43221'));
app.use(express.urlencoded({extended: true}));

app.use(checksession);
function isUserInRole(userl,role){
	return userl==role
}

function authorize(...roles){
	return function(req,res,next){
		if(req.session.username)
		{
			console.error('coś nie tak');
			console.error(req.session.username);
			let rol = req.session.role;
			if (roles == 0 || roles.some(role => isUserInRole(rol,role))){

				req.user=req.session.userLogin;
				return next();
			}
			
		}
		console.error('redirect');
		res.redirect('/login?returnUrl='+req.url);
	}
}
app.get('/',(req,res)=>{res.render('index');});
app.get('/logout',userLogin.logout);
app.get ('/login',userLogin.getLogin);
app.post('/login',ash(userLogin.postLogin));
app.get( '/admin', authorize('admin'), (req, res) => {
	res.setHeader('Content-type', 'text/html; charset=utf-8');
	res.write('witaj administratorze');
	res.end();
})

/*
app.get( '/login', (req, res) => {
	res.render('login');
});

app.post( '/login', (req, res) => {
	var username = req.body.txtUser;
	var pwd = req.body.txtPwd;
	if ( username == pwd ) {
		// wydanie ciastka
		res.cookie('user', username, { signed: true });
		// przekierowanie
		var returnUrl = req.query.returnUrl;
		res.redirect(returnUrl);
	} else {
		res.render( 'login', { message : "Zła nazwa logowania lub hasło" }
		);
	}
});
*/
app.get('/404',(req,res)=> {
	res.status(404).render('404',{ url : req.query.orgurl });
});

app.get('*',(req,res)=> {
	var string= encodeURIComponent(req.url);
	res.redirect('/404?orgurl='+string);	
});


http.createServer(app).listen(process.env.PORT || 3000);
console.log( 'serwer działa' );
/*
index - cokie - jak przekazać , liste produktów jakoś
basket - cokie - pamiętanmie listy wybranych produktów ( obiekt js ) 
lista - 
*/
//404
//live-server