const express = require('express');

const app = express();

app.get('/login', user.getLogin);

app.post('/login', ash(user.postLogin));

app.get('/register', user.getRegister);

app.post('/register', ash(user.postRegister));

app.get('/logout', user.logout);

