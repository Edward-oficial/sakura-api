require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');

const loadRoutes = require('./utils/loadRoutes');
const requireSession = require('./middleware/requireSession');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'cambia_esto_por_algo_secreto',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
    }
}));

// Solo css/js son públicos sin sesión (login/register los necesitan para verse bien)
app.use('/css', express.static(path.join(__dirname, 'public', 'css')));
app.use('/js', express.static(path.join(__dirname, 'public', 'js')));

// Login y registro: si ya hay sesión, mándalo directo al inicio
app.get('/login', (req, res) => {
    if (req.session && req.session.user) return res.redirect('/');
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/register', (req, res) => {
    if (req.session && req.session.user) return res.redirect('/');
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/logout', (req, res) => {
    req.session.destroy(() => res.redirect('/login'));
});

// Login/registro forzoso: sin sesión no se puede ver ninguna página de contenido
app.get('/', requireSession, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/ejemplo', requireSession, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'ejemplo.html'));
});

// Monta automáticamente todo lo que haya en /endpoints
loadRoutes(app, path.join(__dirname, 'endpoints'));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
