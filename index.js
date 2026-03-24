// aplicacion principal

const pool = require('./pool');

// consultas con callback|
function obtenerUsuariosCallback(){
    pool.query('SELECT * FROM usuarios', (error, resultados) => {
        if (error) {
            console.error('Error al obtener usuarios:', error.message);
            return;
        }
        console.log('Usuarios obtenidos (callback):');
        console.table(resultados.rows);
    });
}

// consultas parametrizadas con id 
// protege cons SQL Injection

async function obtenerUsuarioPorId(id) {
    //pool.query(`SELECT * FROM usuarios WHERE id = ${id})
    //es inseguro no usar la línea anterior, ya que permite SQL Injection

    //consulta segura usando parámetros
    const query = 'SELECT * FROM usuarios WHERE id = $1';
    const values = [id];

    const cliente = await cliente.connect();
    try{
        const resultado = await cliente.query(query, values);
        
        if(resultado.rows.length === 0){
            console.log(`No se encontró ningún usuario con id ${id}`);
        } else {
            console.log(`Usuario con id ${id}:`);
            console.table(resultado.rows);
        } 
    }catch (error) {
        console.error('Error al obtener usuario por id:', error.message);
    } finally {
        cliente.release();
    }
}


// consultas con async/await
async function main(){
    try{
        //verificar conexion
        await pool.query('SELECT NOW()');
        console.log('Conexión a la base de datos exitosa');

        //obtener usuarios con callback
        obtenerUsuariosCallback();

        //promesa
        await new Promise(resolve => setTimeout(resolve, 500)); //esperar 1 segundo para que se muestre el resultado del callback

        await obtenerUsuarioPorId(1); //reemplaza 1 con el id que quieras consultar
        await obtenerUsuarioPorId(999); //id que no existe para probar el mensaje de no encontrado
    } catch (error) {
        //maneja errores de conexion
        console.error('Error en la aplicación:', error.message);

    } finally {        //cerrar pool al finalizar
        await pool.end();
        console.log('Pool de conexiones cerrado');
    }
}
main();