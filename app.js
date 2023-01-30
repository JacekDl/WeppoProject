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
var user =require('./functions/user');

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

function isUserInRole(user,role){
	return user==role
}
function authorize(...roles) {
	return function(req, res, next) {
		if ( req.signedCookies.user ) {
			let user = req.signedCookies.user;
		if ( roles.length == 0 ||
		roles.some( role => isUserInRole( user, role ) )) {
			req.user = user;
			return next();
		}
		}
		// fallback na brak autoryzacji
		res.redirect('/login?returnUrl='+req.url);
	}
}

/*app.get('/',authorize(),(req,res) => {
	var cookieValue;
	if(!req.cookies.cookie){
		cookieValue = new Date().toString();
		res.cookie('cookie',cookieValue);
	} else{
		cookieValue= req.cookies.cookie;
	}
	res.render('index',{username: req.user,cookieValue: cookieValue});
});

app.get( '/logout', authorize(), (req, res) => {
	res.cookie('user', '', { maxAge: -1 } );
	res.redirect('/')
});
*/
app.get('/',(req,res)=>{res.render('index');});
app.get('/logout',user.logout);
app.get ('/login',user.getLogin);
app.post('/login',ash(user.postLogin));
app.get( '/admin', authorize('admin'), (req, res) => {
	res.setHeader('Content-type', 'text/html; charset=utf-8');
	res.write('witaj administratorze');
	res.end();
})
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
app.get('/404',(req,res)=> {
	res.status(404).render('404',{ url : req.query.orgurl });
});

app.get('*',(req,res)=> {
	var string= encodeURIComponent(req.url);
	res.redirect('/404?orgurl='+string);	
});


http.createServer(app).listen(process.env.PORT || 3000);
console.log( 'serwer działa' );
/* response
app.use((req,res)=> {
	var p = req.query.p;
	res.render('index',{username:'admin'});
	res.end(`p: ${p}`)
});
*/
/*
app.get( '/api/todo', (req, res) => {
	res.json( todoRepo.getTodos() );
});

	app.post( '/api/todo', json, (req, res) => {
	// middleware json od razu parsuje request
	var todo = req.body;
	var description = todo.description;
	// dodawanie
	var todo = todoRepo.addTodo(description);
	// zwrócenie do klienta
	res.json( todo );
});
app.put( '/api/todo/:id', json, (req, res) => {
	// middleware json od razu parsuje request
	var todo = req.body;
	// powinna być walidacja!
	// modyfikacja
	var id = req.params.id;
	todo = todoRepo.updateTodo(id, todo.description);
	// zwrócenie do klienta
	res.json(todo);
})
app.delete( '/api/todo/:id', (req, res) => {
	// usuwanie
	var id = req.params.id;
	todoRepo.removeTodo(id);
	res.status(200);
	res.end();
});
app.get( '/', (req, res) => {
	res.render( 'app' );	
})
*/
//404