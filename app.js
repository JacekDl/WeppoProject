var http = require('http');
var express = require('express');
var session = require('express-session');
var ejs = require('ejs');
const path = require('path');
//var todoRepo = require('./todos');
const { application } = require('express');

var cookieParser = require('cookie-parser');

//var crypto = require('crypto');
//var sectret = 'Lotr was not The 1!'

//var json = express.json();

function authorize(req, res, next) {
	if ( req.signedCookies.user ) {
		req.user = req.signedCookies.user;
		next();
	} else {
		res.redirect('/login?returnUrl='+req.url);
	}
}

var app = express();
var {checksession} = require('./functions/middleware')

app.set('views', './views');
app.set('view engine', 'ejs');
app.disable('etag');

app.use(session({resave:true,saveUninitialized:true,secret: "1 To rule them all!"}))
app.use( express.static(path.join(__dirname,'public')))


app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

app.get('/',(req,res) => {
	var cookieValue;
	if(!req.cookies.cookie){
		cookieValue = new Date().toString();
		res.cookie('cookie',cookieValue);
	} else{
		cookieValue= req.cookies.cookie;
	}
	res.render('index',{username: 'admin',cookieValue: cookieValue});
});
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
app.get('/404',(req,res)=> {
	res.status(404).render('404',{ url : req.query.orgurl });
});

app.get('*',(req,res)=> {
	var string= encodeURIComponent(req.url);
	res.redirect('/404?orgurl='+string);	
});
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

http.createServer(app).listen(process.env.PORT || 3000);
console.log( 'serwer działa' );
