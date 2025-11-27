const mysql = require('mysql2');

const db = mysql.createConnection({
    host: '127.0.0.1',
    user:'root',
    password:'berserk',
    database: 'veterinaria',
    port:3306
});

// verificar la conexion
db.connect(err=>{
    if(err){
        console.error('Error en servidor ',err);
    }else{
        console.log('Conexion con exito :)');
    }
});

module.exports = db;