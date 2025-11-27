const express = require('express');
const bodyParser = require('body-parser');
const database = require('./db/database');
const session = require('express-session');

const app = express();

// solicitudes de http
app.use(bodyParser.urlencoded({extended: false}));

// configuracion de sesiones
app.use(session({
    secret: 'mi_secreto_veterinaria',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// configuracion de el motor de plantillas
app.set('view engine','ejs');

const port = 3000;
app.listen(port,()=>{
    console.log(`Server http://localhost:${port}`);
});

// Middleware para verificar si el usuario está logueado
const requireLogin = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

// Ruta de login
app.get('/login', (req, res) => {
    res.render('login', { error: null });
});

// Procesar login
app.post('/login', (req, res) => {
    const { nombre, password } = req.body;

    const consulta = 'SELECT * FROM usuarios WHERE nombre = ? AND password = ?';
    
    database.query(consulta, [nombre, password], (err, results) => {
        if (err) {
            console.error('Error en login', err);
            res.render('login', { error: 'Error en el servidor' });
        } else {
            if (results.length > 0) {
                req.session.user = results[0];
                res.redirect('/');
            } else {
                res.render('login', { error: 'Usuario o contraseña incorrectos' });
            }
        }
    });
});

// Registrar usuario
app.post('/register', (req, res) => {
    const { nombre, password } = req.body;

    const consulta = 'INSERT INTO usuarios (nombre, password) VALUES (?, ?)';
    
    database.query(consulta, [nombre, password], (err, results) => {
        if (err) {
            console.error('Error al registrar usuario:', err);
            if (err.code === 'ER_DUP_ENTRY') {
                res.render('login', { error: 'El usuario ya existe' });
            } else {
                res.render('login', { error: 'Error al registrar usuario' });
            }
        } else {
            res.render('login', { error: 'Usuario registrado exitosamente. Ahora puedes iniciar sesión.' });
        }
    });
});

// Ruta de logout
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

// Ruta principal - requiere login
app.get('/', requireLogin, (req, res) => {
    const consulta = 'SELECT * FROM animales';

    database.query(consulta, (err, results) => {
        if (err) {
            console.error('Error en recuperar datos', err);
            res.send('Error, no se recuperan datos');
        } else {
            res.render('index', { 
                animales: results,
                user: req.session.user 
            });
        }
    });
});

// agregar animal - requiere login
app.post('/add', requireLogin, (req, res) => {
    const {nombre, especie, raza, edad, propietario, email_propietario} = req.body;

    const consulta = 'INSERT INTO animales (nombre, especie, raza, edad, propietario, email_propietario) VALUES(?,?,?,?,?,?)';

    database.query(consulta,[nombre, especie, raza, edad, propietario, email_propietario],(err)=>{
        if(err){
            console.error('Error al agregar animal',err);
            res.send('Error al agregar animal');
        }else{
            res.redirect('/');
        }
    });
});

// editar animal - requiere login (CORREGIDO)
app.get('/edit/:id', requireLogin, (req, res) => {
    const {id} = req.params;
    const consultaId='SELECT * FROM animales WHERE id =?';

    database.query(consultaId,[id],(err,results)=>{
        if(err){
            console.error('Error a la peticion de datos',err);
            res.send('Error');
        }else{
            res.render('edit',{
                animal: results[0],
                user: req.session.user  // ← AGREGAR ESTA LÍNEA
            });
        }
    });
});

// Actualizar - requiere login
app.post('/update/:id', requireLogin, (req, res) => {
    const {id}=req.params;
    const {nombre, especie, raza, edad, propietario, email_propietario} = req.body;
    const consultaUpdate='UPDATE animales SET nombre = ?, especie = ?, raza = ?, edad = ?, propietario = ?, email_propietario = ? WHERE id=?';
    database.query(consultaUpdate,[nombre, especie, raza, edad, propietario, email_propietario, id],(err)=>{
        if(err){
            console.error('Error',err);
            res.send('Error al actualizar');
        }else{
            res.redirect('/');
        }
    });
});

// eliminar - requiere login
app.get('/delete/:id', requireLogin, (req, res) => {
    const {id}= req.params;
    const consultaElimina = 'DELETE FROM animales WHERE id =?';
    database.query(consultaElimina,[id],(err)=>{
        if(err){
            console.error('Error',err);
            res.send('Error');
        }else{
            res.redirect('/');
        }
    });
});

app.use(express.static('public'));