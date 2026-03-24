// Configuracion de la base de datos con pool
const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'mi_base_de_datos',
    user: 'mi_usuario',
    password: 'mi_contraseña',
})

module.exports = pool;