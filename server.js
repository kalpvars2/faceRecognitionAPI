const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin'); 
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.01',
		user: 'kalp',
		password: 'Ubu@1234',
		database: 'facerecognition'
	}
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.json("Success!");
})

app.post('/signin', signin.handleSignIn(db, bcrypt));

app.post('/register', register.handleRegister(db, bcrypt) );

app.get('/profile/:id', profile.handleProfileGet(db));

app.put('/image', image.handleImage(db));

app.post('/imageurl', image.handleAPICall);

app.listen(3000, () => {
	console.log("App is running on port : 3000.");
});