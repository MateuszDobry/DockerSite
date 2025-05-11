const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const PORT = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); 
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.redirect('/login');
}

// Routing
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/mian.html'); 
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log("Email:", email);
    console.log("Hasło:", password);

    try {
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
        if (rows.length > 0) {
            req.session.user = email;
            res.redirect('/main');
        } else {
            res.send('Błędna nazwa użytkownika lub hasło.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Błąd serwera');
    }
});


app.get('/main', isAuthenticated, (req, res) => {
    res.sendFile(__dirname + '/public/main.html'); 
});

const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'pass',
    database: process.env.DB_NAME || 'usersdb'
});



app.listen(PORT, '0.0.0.0', () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
});
