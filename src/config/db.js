const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fast_request'
})

db.connect((error) => {
    if (error) {
        throw error; // Si hay un error al conectar, detener el programa
    }
    console.log("Conectado a la base de datos"); // Mensaje de éxito al conectar
});


module.exports = db;