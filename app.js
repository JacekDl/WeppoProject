const http = require('http');
const express = require('express');
const session = require('express-session');
const ejs = require('ejs');
const ash = require('express-async-handler');
const path = require('path');
const { application } = require('express');
const cookieParser = require('cookie-parser');

//passport
const {checksession} = require('./functions/middleware');
const userLogin =require('./functions/userLogin');
const validate = require('./functions/verify');
const admin_fun= require('./functions/admin_fun');
const user_fun = require('./functions/user_fun');
const sbasket = require('./functions/basket_fun');
const { rootCertificates } = require('tls');
//var crypto = require('crypto');
//var sectret = 'Lotr was not The 1!'

//var todoRepo = require('./todos');
//var json = express.json();



const app = express();
app.use('/images',express.static('images'));

app.set('views', './views');
app.set('view engine', 'ejs');
app.disable('etag');

app.use(session({resave:true,saveUninitialized:true,secret: "1 To rule them all!"}))
app.use( express.static(path.join(__dirname,'public')))


app.use(cookieParser('You_shell_not_pass43221'));
app.use(express.urlencoded({extended: true}));

app.use(checksession);

//app.get('/',(req,res)=>{res.render('index');});
app.get('/',user_fun.give_all_product);

app.get( '/admin', validate.vadmin, (req, res) => {
	res.setHeader('Content-type', 'text/html; charset=utf-8');
	res.write('witaj administratorze');
	res.end();
});
//app.get('/admin/users',)
//logowanie i rejestr
app.get('/register',(req,res)=> {res.render('register');});
app.post('/register',ash(userLogin.postRegister));

app.get('/logout',userLogin.logout);
app.get ('/login',userLogin.getLogin);
app.post('/login',ash(userLogin.postLogin));

app.get('/orders',validate.vadmin,ash(admin_fun.orders));
//basket
app.get('/basket',validate.vuser,sbasket.get);
app.get('/basket/:id',validate.vuser,ash(sbasket.add));
app.get('/checkout',validate.vuser,ash(sbasket.order_post));
app.get('/users',validate.vadmin,ash(admin_fun.users));


app.get('/goods',validate.vadmin,ash(admin_fun.goods_get));
app.get('/addGood',validate.vadmin,(req,res) => {res.render('addGood');});
app.post('/addGood',validate.vadmin,ash(admin_fun.goods_add));
app.get('/changeGood/:id',validate.vadmin,ash(admin_fun.goods_change_get));
app.post('/changeGood',validate.vadmin,ash(admin_fun.goods_change)); //how to use put
app.post('/admin/products/:id',validate.vadmin,ash(admin_fun.goods_delete)); //how to use delete
app.post('/index/find',ash(user_fun.find));

/*
app.get( '/login', (req, res) => {
	res.render('login');
})

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